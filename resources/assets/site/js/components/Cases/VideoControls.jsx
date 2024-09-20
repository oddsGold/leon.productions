import React, {useEffect, useRef, useState} from 'react';
import {IoMdPlay} from "react-icons/io";
import {IoPauseSharp} from "react-icons/io5";
import {IoMdVolumeOff} from "react-icons/io";
import {IoVolumeHigh} from "react-icons/io5";
import {MdCloseFullscreen} from "react-icons/md";
import {MdClose} from "react-icons/md";

export default function VideoControls({
                                          videoPlayer,
                                          videoPlayerMobileFs,
                                          handleHideOverlay,
                                          selectedData,
                                          description
                                      }) {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [info, setInfo] = useState(false);
    const [videoDuration, setVideoDuration] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const controlsRef = useRef(null);

    useEffect(() => {
        const handleOrientationChange = () => {
            const orientation = window.screen.orientation.angle;
            const isPortrait = window.screen.width < window.screen.height;

            if (controlsRef.current) {
                if (orientation === 90) {
                    controlsRef.current.classList.add('orientation-270');
                } else if (orientation === -90 || orientation === 270) {
                    controlsRef.current.classList.add('orientation');
                } else {
                    controlsRef.current.classList.remove('orientation');
                    controlsRef.current.classList.remove('orientation-270');
                }
            }
        };

        handleOrientationChange();

        window.screen.orientation.addEventListener('change', handleOrientationChange);

        return () => {
            window.screen.orientation.removeEventListener('change', handleOrientationChange);
        };
    }, []);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };

    const isMobile = () => {
        return window.innerWidth <= 1023;
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const initializePlayer = async () => {
            const player = videoPlayer?.current?.[selectedData.id];
            if (player) {
                try {
                    const duration = await player.getDuration();
                    setVideoDuration(duration);
                } catch (error) {}
            }
        };

        const timer = setTimeout(initializePlayer, 500);

        return () => clearTimeout(timer);
    }, [videoPlayer, selectedData.id]);

    useEffect(() => {
        const initializeListener = () => {
            if(isMobile()){
                const player = videoPlayer?.current?.[selectedData.id];
                const playerMobileFs = videoPlayerMobileFs?.current?.[selectedData.id];
                if(playerMobileFs && player){
                    playerMobileFs.off('fullscreenchange');
                    playerMobileFs.on('fullscreenchange', (e) => {
                        if(!e.fullscreen){
                            try {
                                player.getPaused().then(function(paused) {
                                    setIsPlaying(paused);
                                });
                                playerMobileFs.getCurrentTime().then((currentTime) => {
                                    player.setCurrentTime(currentTime).then(() => {
                                        if(isPlaying){
                                            player.play();
                                        }else{
                                            player.pause();
                                        }
                                    });
                                });
                            }catch (e) {}
                        }
                    })
                }
            }
        };
        const timer = setTimeout(initializeListener, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [videoPlayer, videoPlayerMobileFs, selectedData.id]);


    const handleInfoClick = () => {
        setInfo(prevInfo => !prevInfo);
    };

    const handlePlayClick = () => {
        setIsPlaying(true);
        videoPlayer?.current[selectedData.id].play().catch(e => {});
    };

    const handlePauseClick = () => {
        setIsPlaying(false);
        videoPlayer?.current[selectedData.id].pause().catch(e => {});
    };

    const handlePlayPauseToggle = () => {
        const newValue = !isPlaying;
        setIsPlaying(newValue);
        if (newValue) {
            videoPlayer?.current[selectedData.id].play().catch(e => {});
        } else {
            videoPlayer?.current[selectedData.id].pause().catch(e => {});
        }
    }

    const handleMuteClick = () => {
        setIsMuted(!isMuted);
        videoPlayer?.current[selectedData.id].getMuted().then(muted => {
            videoPlayer.current[selectedData.id].setMuted(!muted);
        });
    };

    const handleFullscreenClick = () => {
        setIsFullscreen(!isFullscreen);

        if(isMobile()){
            const player = videoPlayer?.current?.[selectedData.id];
            const playerMobileFs = videoPlayerMobileFs?.current?.[selectedData.id];
            try {
                if(player && playerMobileFs){
                    Promise.all([
                        player.getCurrentTime(),
                        player.getMuted()
                    ]).then(function(dimensions) {
                        playerMobileFs.setCurrentTime(dimensions[0]);
                        playerMobileFs.setMuted(dimensions[1]);
                        playerMobileFs.play();
                        player.setMuted(true);
                        setIsMuted(true);
                    });
                }

            }catch (e) {
                console.log(e);
            }
        }else{
            const overlayElement = document.querySelector('.overlay-content');
            if (overlayElement) {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } else {
                    if (overlayElement.requestFullscreen) {
                        overlayElement.requestFullscreen();
                    } else if (overlayElement.mozRequestFullScreen) {
                        overlayElement.mozRequestFullScreen();
                    } else if (overlayElement.webkitRequestFullscreen) {
                        overlayElement.webkitRequestFullscreen();
                    } else if (overlayElement.msRequestFullscreen) {
                        overlayElement.msRequestFullscreen();
                    }
                }
            }
        }
    };

    return (
        <>
            <div className="play-pause-button" onClick={handlePlayPauseToggle}></div>
            <div
                ref={controlsRef}
                className="controls-row"
                style={{
                    minWidth: windowWidth <= 1023 ? `100vh` : null,
                    maxWidth: windowWidth <= 1023 ? `100vh` : null
                }}
            >
                <div className="play-pause-button" onClick={handlePlayPauseToggle}></div>
                <div className="controls">
                    <button className={`play ${isPlaying ? 'active' : ''}`} onClick={handlePlayClick}>
                        <IoMdPlay/>
                    </button>
                    <button className={`pause ${!isPlaying ? 'active' : ''}`} onClick={handlePauseClick}>
                        <IoPauseSharp/>
                    </button>
                    <button className="mute" onClick={handleMuteClick}>
                        {!isMuted ? <IoVolumeHigh/> : <IoMdVolumeOff style={{color: '#f3a407'}}/>}
                    </button>
                    <div className="info-container">
                        <button className={`info ${info ? 'active' : ''}`} onClick={handleInfoClick}>
                            <span>i</span>
                        </button>

                        <div className="info-text">
                            <p>{description}</p>
                        </div>

                    </div>
                    <div className="video-duration">
                        <p>
                            {videoDuration > 0
                                ? `${Math.floor(videoDuration / 60).toString().padStart(2, '0')}:${Math.floor(videoDuration % 60).toString().padStart(2, '0')}`
                                : ''}
                        </p>
                    </div>
                    <button className="fullscreen" onClick={handleFullscreenClick}>
                        <MdCloseFullscreen/>
                    </button>
                    <button className="close" onClick={handleHideOverlay}>
                        <MdClose/>
                    </button>
                    <div className="progress-bar">
                        <progress className={`progress-bar-point-${selectedData.id} point`} value="0" min="0"
                                  max={videoDuration}></progress>
                        <input className={`progress-bar-range-${selectedData.id} range`} min="0" type="range"
                               step="0.0001" max={videoDuration}/>
                        <div className="progress-bar-timeline"></div>
                        <div className={`progress-bar-filled-${selectedData.id} filled-wrapper`}>
                            <div className="filled"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

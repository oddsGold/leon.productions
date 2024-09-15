import React, {useEffect, useRef, useState} from 'react';
import { IoMdPlay } from "react-icons/io";
import { IoPauseSharp } from "react-icons/io5";
import { IoMdVolumeOff } from "react-icons/io";
import { IoVolumeHigh } from "react-icons/io5";
import { MdCloseFullscreen } from "react-icons/md";
import { MdClose } from "react-icons/md";

export default function VideoControls({
                                          videoPlayer,
                                          handleHideOverlay,
                                          handleRangeChange,
                                          currentTime,
                                          selectedData,
                                          description
                                      }) {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [info, setInfo] = useState(false);
    const [videoDuration, setVideoDuration] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
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


    const handleInfoClick = () => {
        setInfo(prevInfo => !prevInfo);
    };

    const handlePlayClick = () => {
        setIsPlaying(true);
        videoPlayer?.current[selectedData.id].play();
    };

    const handlePauseClick = () => {
        setIsPlaying(false);
        videoPlayer?.current[selectedData.id].pause();
    };

    const handleMuteClick = () => {
        setIsMuted(!isMuted);
        videoPlayer?.current[selectedData.id].getMuted().then(muted => {
            videoPlayer.current[selectedData.id].setMuted(!muted);
        });
    };

    const handleFullscreenClick = () => {
        setIsFullscreen(!isFullscreen);
        const overlayElement = document.querySelector('.overlay-content');

        if (overlayElement) {
            if (!document.fullscreenElement) {
                overlayElement.requestFullscreen().catch(err => {});
            } else {
                document.exitFullscreen();
            }
        }
    };
    
    return (
        <div
            className="controls-row"
            style={{
                minWidth: windowWidth <= 1023 ? `${windowHeight}px` : null,
                maxWidth: windowWidth <= 1023 ? `${windowHeight}px` : null
            }}
        >
            <div className="controls">
                <button className={`play ${isPlaying ? 'active' : ''}`} onClick={handlePlayClick}>
                    <IoMdPlay/>
                </button>
                <button className={`pause ${!isPlaying ? 'active' : ''}`} onClick={handlePauseClick}>
                    <IoPauseSharp/>
                </button>
                <button className="mute" onClick={handleMuteClick}>
                    {isMuted ? <IoVolumeHigh/> : <IoMdVolumeOff style={{color: '#f3a407'}}/>}
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
                    <progress className={`point`} value={currentTime} min="0" max={videoDuration}></progress>
                    <input className={`range`} value={currentTime} min="0"
                           type="range" step="0.0001" max={videoDuration} onChange={handleRangeChange}/>
                    <div className={`progress-bar-filled-${selectedData.id} filled-wrapper`}>
                        <div className="filled"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

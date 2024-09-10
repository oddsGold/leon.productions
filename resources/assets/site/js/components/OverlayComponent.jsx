import React from 'react';
import Description from "./Description";
import { useVimeoPlayersFull } from "../hooks/useVimeoPlayersFull";

export default function OverlayComponent({ handleHideOverlay, selectedData }) {
    const videoRefs = useVimeoPlayersFull([selectedData]);

    const handleRangeChange = (event) => {
        const value = event.target.value;
        const filled = document.querySelector(`.progress-bar-filled-${selectedData.id}`);
        if (videoRefs.current[selectedData.id]) {
            videoRefs.current[selectedData.id].setCurrentTime(value);
            if (filled) {
                const duration = event.target.max;
                filled.style.width = `${(value / duration) * 100}%`;
            }
        }
    };

    const handlePlayClick = () => {
        if (videoRefs.current[selectedData.id]) {
            videoRefs.current[selectedData.id].play();
        }
    };

    const handlePauseClick = () => {
        if (videoRefs.current[selectedData.id]) {
            videoRefs.current[selectedData.id].pause();
        }
    };

    const handleMuteClick = () => {
        if (videoRefs.current[selectedData.id]) {
            videoRefs.current[selectedData.id].getMuted().then((muted) => {
                videoRefs.current[selectedData.id].setMuted(!muted);
            });
        }
    };

    const handleFullscreenClick = () => {
        const videoElement = document.querySelector(`.vimeo-${selectedData.id}`);
        if (videoElement) {
            if (!document.fullscreenElement) {
                videoElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        }
    };

    return (
        <div className="overlay-content">
            <div className="home-grid__item home-grid__item__overlay home-grid__item__full">
                <div className="video-container">
                    <div className={`vimeo-player vimeo-${selectedData.id}`}></div>
                </div>
                <Description description={selectedData.description} />
            </div>

            <div className="video-player">
                <div className="controls">
                    <button className="play" onClick={handlePlayClick}>
                        <i className="fa-solid fa-play"></i>
                    </button>
                    <button className="pause" onClick={handlePauseClick}>
                        <i className="fa-sharp fa-solid fa-pause"></i>
                    </button>
                    <button className="mute" onClick={handleMuteClick}>
                        <i className="fa-solid fa-volume-xmark"></i>
                    </button>
                    <button className="fullscreen" onClick={handleFullscreenClick}>
                        <i className="fa-solid fa-down-left-and-up-right-to-center"></i>
                    </button>
                    <button className="close" onClick={handleHideOverlay}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <div className="progress-bar">
                        <progress className={`point`} value="0" min="0" max="0"></progress>
                        <input className={`range`} value="0" min="0"
                               type="range" step="0.0001" max="0" onChange={handleRangeChange} />
                        <div className={`progress-bar-filled-${selectedData.id} filled-wrapper`}>
                            <div className="filled"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React, { useEffect } from 'react';
import { useVimeoPlayersFull } from "../hooks/useVimeoPlayersFull";
import VideoControls from "./Cases/VideoControls";

export default function OverlayComponent({ handleHideOverlay, selectedData }) {
    const videoRefs = useVimeoPlayersFull([selectedData]);

    return (
        <div className="overlay-content">
            <div className="home-grid__item home-grid__item__full">
                <div className="video-container">
                    <div className={`vimeo-player vimeo-${selectedData.id}`}></div>
                </div>
            </div>

            <div className="overlay-logo" onClick={handleHideOverlay}>
                <img src="/images/Logo.png" alt=""/>
            </div>

            <VideoControls
                videoPlayer={videoRefs}
                handleHideOverlay={handleHideOverlay}
                selectedData={selectedData}
                description={selectedData.description}
            />
        </div>
    );
}

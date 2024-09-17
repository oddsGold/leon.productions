import React, { useEffect } from 'react';
import { useVimeoPlayersFull } from "../hooks/useVimeoPlayersFull";
import VideoControls from "./Cases/VideoControls";
import {useVimeoPlayersFullMobileFs} from "../hooks/useVimeoPlayersFullMobileFs";

export default function OverlayComponent({ handleHideOverlay, selectedData }) {
    const videoRefs = useVimeoPlayersFull([selectedData]);
    const videoMobileFsRefs = useVimeoPlayersFullMobileFs([selectedData]);

    return (
        <div className="overlay-content">
            <div className="home-grid__item home-grid__item__full">
                <div className="video-container">
                    <div className={`vimeo-player-mobile-fs vimeo-mobile-fs-${selectedData.id}`}></div>
                    <div className={`vimeo-player vimeo-${selectedData.id}`}></div>
                </div>
            </div>

            <div className="overlay-logo" onClick={handleHideOverlay}>
                <img src="/images/Logo.png" alt=""/>
            </div>

            <VideoControls
                videoPlayer={videoRefs}
                videoPlayerMobileFs={videoMobileFsRefs}
                handleHideOverlay={handleHideOverlay}
                selectedData={selectedData}
                description={selectedData.description}
            />
        </div>
    );
}

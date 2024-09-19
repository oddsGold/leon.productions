import React, {useEffect, useRef, useState} from 'react';
import {useVimeoPlayersFull} from "../hooks/useVimeoPlayersFull";
import VideoControls from "./Cases/VideoControls";
import {useVimeoPlayersFullMobileFs} from "../hooks/useVimeoPlayersFullMobileFs";

export default function OverlayComponent({handleHideOverlay, selectedData}) {
    const videoRefs = useVimeoPlayersFull([selectedData]);
    const videoMobileFsRefs = useVimeoPlayersFullMobileFs([selectedData]);
    const vimeoPlayerRef = useRef(null);

    useEffect(() => {
        const handleOrientationChange = () => {
            const orientation = window.screen.orientation.angle;
            const isPortrait = window.screen.width < window.screen.height;

            if (vimeoPlayerRef.current) {
                if (orientation === 90 && !isPortrait) {
                    vimeoPlayerRef.current.classList.add('orientation-270');
                } else if ((orientation === -90 || orientation === 270) && !isPortrait) {
                    vimeoPlayerRef.current.classList.add('orientation');
                } else {
                    vimeoPlayerRef.current.classList.remove('orientation');
                    vimeoPlayerRef.current.classList.remove('orientation-270');
                }
            }
        };

        handleOrientationChange();

        window.screen.orientation.addEventListener('change', handleOrientationChange);

        return () => {
            window.screen.orientation.removeEventListener('change', handleOrientationChange);
        };
    }, []);

    return (
        <div className="overlay-content">
            <div className="home-grid__item home-grid__item__full">
                <div className="video-container">
                    <div className={`vimeo-player-mobile-fs vimeo-mobile-fs-${selectedData.id}`}></div>
                    <div ref={vimeoPlayerRef} className={`vimeo-player vimeo-${selectedData.id}`}></div>
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

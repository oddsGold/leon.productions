import React, {useCallback, useEffect, useState} from 'react';
import { useVimeoPlayersFull } from "../hooks/useVimeoPlayersFull";
import VideoControls from "./Cases/VideoControls";

export default function OverlayComponent({ handleHideOverlay, selectedData }) {
    const videoRefs = useVimeoPlayersFull([selectedData]);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const videoPlayer = videoRefs.current[selectedData.id];

        if (videoPlayer) {
            videoPlayer.ready().then(() => {}).catch(error => {});
        }
    }, []);

    const handleRangeChange = useCallback((event) => {
        const value = event.target.value;
        setCurrentTime(value);

        if (videoRefs.current[selectedData.id]) {
            videoRefs.current[selectedData.id].setCurrentTime(value);
        }
    }, [selectedData.id, videoRefs]);

    return (
        <div className="overlay-content">
            <div className="home-grid__item home-grid__item__full">
                <div className="video-container">
                    <div className={`vimeo-player vimeo-${selectedData.id}`}></div>
                </div>
            </div>

            <div className="overlay-logo">
                <img src="/images/Logo.png" alt=""/>
            </div>

            <VideoControls
                videoPlayer={videoRefs}
                handleHideOverlay={handleHideOverlay}
                currentTime={currentTime}
                handleRangeChange={handleRangeChange}
                selectedData={selectedData}
                description={selectedData.description}
            />
        </div>
    );
}

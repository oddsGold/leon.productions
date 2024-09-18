import React, {useEffect} from 'react';
import Description from "../Description";
import {useVimeoPlayersWithDelay} from "../../hooks/useVimeoPlayersWithDelay";

export default function RemainingCases({cases, handleShowOverlay}) {
    useVimeoPlayersWithDelay(cases);

    return (
        <div className="row no-gutters">
            {cases.map((video, index) => (
                <div key={video.id} className={`${index % 3 === 0 ? 'col-xl-12' : 'col-xl-6'}`}>
                    <div
                        className={`home-grid__item home-grid__item__overlay ${index % 3 === 0 ? 'home-grid__item_full-width' : ''}`}
                        onClick={() => handleShowOverlay(video)}
                    >
                        <div className="video-container">
                            <div id={`vimeo-${video.id}`}
                                 className={`vimeo-player ${index % 3 === 0 ? 'vimeo-player-top' : ''}`}></div>
                        </div>
                        <Description description={video.description}/>
                    </div>
                </div>
            ))}
        </div>
    );
}

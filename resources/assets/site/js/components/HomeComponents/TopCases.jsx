import React from 'react';
import Talk from "./Talk";
import Description from "../Description";
import {useVimeoPlayers} from "../../hooks/useVimeoPlayers";
import {useEffect} from "react";

export default function TopCases({ cases, handleShowModal }) {
    useVimeoPlayers(cases);

    useEffect(() => {
        console.log('TopCases mounted');
        return () => {
            console.log('TopCases unmounted');
        };
    }, []);

    return (
        <>
            {cases.length > 0 && (
                <div
                    className="home-grid__item home-grid__item--first d-flex flex-column justify-content-center align-items-center">
                    <div className="video-container">
                        <div id={`vimeo-${cases[0].id}`} className="vimeo-player"></div>
                    </div>
                    <Description description={cases[0].description}/>
                </div>
            )}

            <div className="row no-gutters">
                {cases.slice(1).map((video) => (
                    <div key={video.id} className="col-xl-6">
                        <div className="home-grid__item">
                            <div className="video-container">
                                <div id={`vimeo-${video.id}`} className="vimeo-player"></div>
                            </div>
                            <Description description={video.description}/>
                        </div>
                    </div>
                ))}

                <div className="col-xl-6">
                    <div className="home-grid__item">
                        <Talk handleShowModal={handleShowModal}/>
                    </div>
                </div>
            </div>
        </>
    );
};

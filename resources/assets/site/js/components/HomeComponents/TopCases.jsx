import Talk from "./Talk";
import Description from "../Description";
import {useEffect, useRef} from "react";
import Player from '@vimeo/player';

export default function TopCases({cases, handleShowModal}) {
    const videoRefs = useRef({});

    useEffect(() => {
        if (cases) {
            cases.forEach((video) => {
                if (!videoRefs.current[video.id]) {
                    videoRefs.current[video.id] = new Player(`vimeo-${video.id}`, {
                        url: video.preview_url,
                        controls: false,
                        loop: true,
                        muted: true
                    });

                    const videoElement = document.querySelector(`#vimeo-${video.id}`).parentElement;
                    videoElement.addEventListener('mouseover', () => {
                        videoElement.classList.add('play');
                        videoRefs.current[video.id].play();
                    });

                    videoElement.addEventListener('mouseout', () => {
                        videoElement.classList.remove('play');
                        videoRefs.current[video.id].pause();
                    });
                }
            });
        }
    }, [cases]);


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
                    <div key={video.id} className="col-lg-6">
                        <div className="home-grid__item">
                            <div className="video-container">
                                <div id={`vimeo-${video.id}`} className="vimeo-player"></div>
                            </div>
                            <Description description={video.description}/>
                        </div>
                    </div>
                ))}

                <div className="col-lg-6">
                    <div className="home-grid__item">
                        <Talk handleShowModal={handleShowModal}/>
                    </div>
                </div>
            </div>
        </>
    );
}

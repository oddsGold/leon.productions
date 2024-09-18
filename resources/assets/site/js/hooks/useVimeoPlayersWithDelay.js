import { useEffect, useRef } from 'react';
import Player from '@vimeo/player';

export const useVimeoPlayersWithDelay = (cases) => {
    const videoRefs = useRef({});

    useEffect(() => {
        setTimeout(() => {
            if (cases) {
                cases.forEach((video) => {
                    if (!videoRefs.current[video.id]) {
                        videoRefs.current[video.id] = new Player(`vimeo-${video.id}`, {
                            url: video.preview_url,
                            controls: false,
                            loop: true,
                            muted: true,
                            autopause: false
                        });

                        videoRefs.current[video.id].ready().then(() => {
                            videoRefs.current[video.id].play().then(() => {
                                videoRefs.current[video.id].pause();
                            }).catch(e => {});
                        });

                        const videoElement = document.querySelector(`#vimeo-${video.id}`).closest('.home-grid__item');
                        let isPlaying = false;

                        videoElement.addEventListener('mouseover', () => {
                            if (!isPlaying) {
                                videoElement.classList.add('play');
                                videoRefs.current[video.id].play().then(() => {
                                    isPlaying = true;
                                }).catch(() => {});
                            }
                        });

                        videoElement.addEventListener('mouseout', (paused) => {
                            videoRefs.current[video.id].getPaused().then((paused) => {
                                if(!paused){
                                    videoElement.classList.remove('play');
                                    videoRefs.current[video.id].pause().then(() => {
                                        isPlaying = false;
                                    }).catch(() => {});
                                }
                            }).catch(function(error) {})
                        });
                    }
                });
            }
        }, 3000);
    }, [cases]);

    return videoRefs;
};

import { useEffect, useRef } from 'react';
import Player from '@vimeo/player';

export const useVimeoPlayersFullMobileFs = (cases) => {
    const videoRefs = useRef({});

    useEffect(() => {
        cases.forEach((video) => {
            const videoClass = `vimeo-mobile-fs-${video.id}`;
            if (!videoRefs.current[video.id] && window.innerWidth <= 1023) {
                const videoElement = document.querySelector(`.${videoClass}`);
                if (videoElement) {
                    videoRefs.current[video.id] = new Player(videoElement, {
                        url: video.main_url,
                        controls: false,
                        loop: true,
                        muted: true,
                        playsinline: false
                    });
                }
            }
        });

        return () => {
            cases.forEach((video) => {
                const player = videoRefs.current[video.id];
                if (player) {
                    player.destroy().then(() => {
                        delete videoRefs.current[video.id];
                    }).catch(error => console.error("Error destroying player:", error));
                }
            });
        };
    }, [cases]);

    return videoRefs;
};

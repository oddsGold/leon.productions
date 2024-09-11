import { useEffect, useRef } from 'react';
import Player from '@vimeo/player';

export const useVimeoPlayersFull = (cases) => {
    const videoRefs = useRef({});
    const progressBarPointRefs = useRef({});
    const progressBarRangeRefs = useRef({});
    const progressBarFilledRefs = useRef({});
    const intervalRefs = useRef({});
    const durationRefs = useRef({});

    useEffect(() => {
        cases.forEach((video) => {
            const videoClass = `vimeo-${video.id}`;

            if (!videoRefs.current[video.id]) {
                const videoElement = document.querySelector(`.${videoClass}`);
                const progressBarPoint = document.querySelector(`.progress-bar-point-${video.id}`);
                const progressBarRange = document.querySelector(`.progress-bar-range-${video.id}`);
                const progressBarFilled = document.querySelector(`.progress-bar-filled-${video.id}`);

                if (videoElement) {
                    videoRefs.current[video.id] = new Player(videoElement, {
                        url: video.main_url,
                        controls: false,
                        loop: true,
                        muted: true,
                    });

                    progressBarPointRefs.current[video.id] = progressBarPoint;
                    progressBarRangeRefs.current[video.id] = progressBarRange;
                    progressBarFilledRefs.current[video.id] = progressBarFilled;

                    const vimeoPlayer = videoRefs.current[video.id];

                    vimeoPlayer.ready().then(() => {
                        return vimeoPlayer.getDuration();
                    }).then((duration) => {
                        durationRefs.current[video.id] = duration;
                        if (progressBarPointRefs.current[video.id]) {
                            progressBarPointRefs.current[video.id].max = duration;
                        }
                        if (progressBarRangeRefs.current[video.id]) {
                            progressBarRangeRefs.current[video.id].max = duration;
                        }

                        return vimeoPlayer.play();
                    }).then(() => {
                        vimeoPlayer.on('play', () => {
                            intervalRefs.current[video.id] = setInterval(() => {
                                vimeoPlayer.getCurrentTime().then((seconds) => {
                                    const duration = durationRefs.current[video.id];
                                    if (progressBarPointRefs.current[video.id]) {
                                        progressBarPointRefs.current[video.id].value = seconds;
                                    }
                                    if (progressBarFilledRefs.current[video.id]) {
                                        progressBarFilledRefs.current[video.id].style.width = `${(seconds / duration) * 100}%`;
                                    }
                                }).catch(error => console.error("Error getting current time:", error));
                            }, 100);
                        });

                        vimeoPlayer.on('pause', () => {
                            if (intervalRefs.current[video.id]) {
                                clearInterval(intervalRefs.current[video.id]);
                            }
                        });

                        vimeoPlayer.on('ended', () => {
                            if (intervalRefs.current[video.id]) {
                                clearInterval(intervalRefs.current[video.id]);
                            }
                        });

                    }).catch(error => console.error("Error initializing player:", error));

                    if (progressBarRange) {
                        progressBarRange.addEventListener('input', (e) => {
                            const currentTime = e.currentTarget.value;
                            vimeoPlayer.setCurrentTime(currentTime).catch(error => console.error("Error setting current time:", error));
                            if (progressBarPointRefs.current[video.id]) {
                                progressBarPointRefs.current[video.id].value = currentTime;
                            }
                            if (progressBarFilledRefs.current[video.id]) {
                                const duration = durationRefs.current[video.id]; // Используйте значение из durationRefs
                                progressBarFilledRefs.current[video.id].style.width = `${(currentTime * 100) / duration}%`;
                            }
                        });
                    }
                }
            }
        });

        return () => {
            cases.forEach((video) => {
                const player = videoRefs.current[video.id];
                if (player) {
                    player.destroy().then(() => {
                        delete videoRefs.current[video.id];
                        delete progressBarPointRefs.current[video.id];
                        delete progressBarRangeRefs.current[video.id];
                        delete progressBarFilledRefs.current[video.id];
                        if (intervalRefs.current[video.id]) {
                            clearInterval(intervalRefs.current[video.id]);
                        }
                    }).catch(error => console.error("Error destroying player:", error));
                }
            });
        };
    }, [cases]);

    return videoRefs;
};

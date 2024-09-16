import { useEffect, useRef } from 'react';
import Player from '@vimeo/player';

export const useVimeoPlayersFull = (cases) => {
    const videoRefs = useRef({});
    const progressBarPointRefs = useRef({});
    const progressBarRangeRefs = useRef({});
    const progressBarFilledRefs = useRef({});
    const requestAnimationFrameRefs = useRef({});
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
                        playsinline: false
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
                    }).catch(error => console.error("Error initializing player:", error));


                    const animateProgressBar = () => {
                        const duration = durationRefs.current[video.id];
                        const animationStepCallback = (currentFrameSec) => {
                            vimeoPlayer.getCurrentTime().then((currentVideoSec) =>  {

                                if (progressBarPointRefs.current[video.id]) {
                                    progressBarPointRefs.current[video.id].value = currentVideoSec;
                                }
                                if (progressBarFilledRefs.current[video.id]) {
                                    progressBarFilledRefs.current[video.id].style.width = `${(currentVideoSec / duration) * 100}%`;
                                }

                            }).catch((e) => {});
                            requestAnimationFrameRefs.current[video.id] = window.requestAnimationFrame(animationStepCallback)
                        };
                        requestAnimationFrameRefs.current[video.id] = window.requestAnimationFrame(animationStepCallback)
                    };

                    vimeoPlayer.on('play', () => {
                        animateProgressBar();
                    });

                    vimeoPlayer.on('pause', () => {
                        if (requestAnimationFrameRefs.current[video.id]) {
                            window.cancelAnimationFrame(requestAnimationFrameRefs.current[video.id]);
                        }
                    });

                    if (progressBarRangeRefs.current[video.id]) {
                        progressBarRangeRefs.current[video.id].addEventListener('input', (e) => {
                            if (requestAnimationFrameRefs.current[video.id]) {
                                window.cancelAnimationFrame(requestAnimationFrameRefs.current[video.id]);
                            }
                            const currentTime = e.currentTarget.value;
                            if (progressBarPointRefs.current[video.id]) {
                                progressBarPointRefs.current[video.id].value = currentTime;
                            }
                            if (progressBarFilledRefs.current[video.id]) {
                                const duration = durationRefs.current[video.id];
                                progressBarFilledRefs.current[video.id].style.width = `${(currentTime * 100) / duration}%`;
                            }
                        });
                        progressBarRangeRefs.current[video.id].addEventListener('change', (e) => {

                            if (requestAnimationFrameRefs.current[video.id]) {
                                window.cancelAnimationFrame(requestAnimationFrameRefs.current[video.id]);
                            }

                            const currentTime = e.currentTarget.value;
                            vimeoPlayer.setCurrentTime(currentTime).then(() => {
                                vimeoPlayer.getPaused().then(function(paused) {
                                    if(!paused){
                                        animateProgressBar();
                                    }
                                }).catch(function(error) {});
                            }).catch(error => console.error("Error setting current time:", error));

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
                        if (requestAnimationFrameRefs.current[video.id]) {
                            window.cancelAnimationFrame(requestAnimationFrameRefs.current[video.id]);
                        }
                    }).catch(error => console.error("Error destroying player:", error));
                }
            });
        };
    }, [cases]);

    return videoRefs;
};

import React, {useEffect, useRef} from "react";
import Player from '@vimeo/player';

export default function VideoPlayerPreview({link}){

    const videoPlayer = useRef(null);
    const timeout = useRef(null);
    const randomId = useRef(Math.floor(Math.random() * 100000));

    const isVimeoLink = (link) => {
        const urlPattern = /https:\/\/vimeo\.com\/[\d]{5,15}/i;
        return urlPattern.test(link);
    };

    const isPlayer = (player) => {
        return player && player instanceof Player;
    }

    useEffect(() => {
        if(timeout.current){
            clearInterval(timeout.current);
        }

        timeout.current = setTimeout(() => {
            if(isPlayer(videoPlayer.current)){
                videoPlayer.current.destroy().catch(() => {});
            }
            if(link && isVimeoLink(link)){
                try {
                    videoPlayer.current = new Player(
                        `video-player-preview-vimeo-root-${randomId.current}`,
                        {
                            url: link,
                            controls: false,
                            muted: true,
                            loop: true,
                            width: 200
                        }
                    );
                    //videoPlayer.current.play()
                }catch (e) {
                    //console.log(e);
                }

            }
        }, 800);

    }, [link]);


    return (
        <div className={`video-player-preview ${isPlayer(videoPlayer.current) ? 'show': ''}`}>
            <i className="fa-solid fa-video-slash icon" />
            <div className="frame-root" id={`video-player-preview-vimeo-root-${randomId.current}`}></div>
        </div>
    );
}

import {useParams} from "react-router-dom";
import {useEffect} from "react";

export default function ShowReel({handleShowOverlay}) {

    const video = {id:1, main_url: 'https://vimeo.com/1006643418', slug: 'showreel'};
    const {slug} = useParams();

    useEffect(() => {
        if(slug && slug === video.slug){
            handleShowOverlay(video);
        }
    }, []);

    return (
        <span className="site-menu-link" onClick={() => {handleShowOverlay(video)}}>Showreel</span>
    );
}

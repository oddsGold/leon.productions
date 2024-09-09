import Description from "../Description";
import {useVimeoPlayers} from "../../hooks/useVimeoPlayers";

export default function RemainingCases({cases}) {
    useVimeoPlayers(cases);

    return (
        <div className="row no-gutters">
            {cases.map((video, index) => (
                <div key={video.id} className={`${index % 3 === 0 ? 'col-xl-12' : 'col-xl-6'}`}>
                    <div className="home-grid__item">
                        <div className="video-container">
                            <div id={`vimeo-${video.id}`} className={`vimeo-player ${index % 3 === 0 ? 'vimeo-player-top' : ''}`}></div>
                        </div>
                        <Description description={video.description}/>
                    </div>
                </div>
            ))}
        </div>
    );
}

import {useDispatch} from "react-redux";
import {toggleAbout} from "../../redux/about/slice";
import ShowReel from "./ShowReel";

export default function Navigation({handleShowModal, handleShowOverlay}) {
    const dispatch = useDispatch();

    const handleToggleAbout = () => {
        dispatch(toggleAbout());
    };

    return (
        <nav className="site-menu">
            <div>
                <span className="site-menu-link" onClick={handleToggleAbout}>About</span>
                <ShowReel handleShowOverlay={handleShowOverlay} />
                <button className="site-menu-link site-menu-link__bg" onClick={handleShowModal}>Contact</button>
            </div>
        </nav>
    )
}

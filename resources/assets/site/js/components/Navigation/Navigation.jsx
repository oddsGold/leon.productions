import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {showAbout} from "../../redux/about/slice";

export default function Navigation({handleShowModal}) {
    const dispatch = useDispatch();

    const handleShowAbout = () => {
        dispatch(showAbout());
    };

    return (
        <nav className="site-menu">
            <div>
                <span className="site-menu-link" onClick={handleShowAbout}>About</span>
                <NavLink to="/test" className="site-menu-link">Showreel</NavLink>
                <button className="site-menu-link site-menu-link__bg" onClick={handleShowModal}>Contact</button>
            </div>
        </nav>
    )
}

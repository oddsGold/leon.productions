import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {toggleAbout} from "../../redux/about/slice";

export default function Navigation({handleShowModal}) {
    const dispatch = useDispatch();

    const handleToggleAbout = () => {
        dispatch(toggleAbout());
    };

    return (
        <nav className="site-menu">
            <div>
                <span className="site-menu-link" onClick={handleToggleAbout}>About</span>
                <NavLink to="/test" className="site-menu-link">Showreel</NavLink>
                <button className="site-menu-link site-menu-link__bg" onClick={handleShowModal}>Contact</button>
            </div>
        </nav>
    )
}

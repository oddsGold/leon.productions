import {NavLink} from "react-router-dom";

export default function Navigation({handleShowModal}) {
    return (
        <nav className="site-menu">
            <NavLink to="/test" className="site-menu-link">About</NavLink>
            <NavLink to="/test" className="site-menu-link">Showreel</NavLink>
            <button className="site-menu-link site-menu-link__bg" onClick={handleShowModal}>Contact</button>
        </nav>
    )
}

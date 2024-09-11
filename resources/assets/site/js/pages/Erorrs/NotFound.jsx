import {NavLink} from "react-router-dom";

export default function NotFound() {
    return (
        <div className="error-page">
            <section className="error">
                <div className="container">
                    <div className="error-content">
                        <p>O<span>o</span>ps</p>
                        <h1>404 - page not found</h1>
                        <p className="error-info">The page you are looking for might have been removed had its name
                            changed or is temporarily unavailable.</p>
                        <NavLink to="/">go to homepage</NavLink>
                    </div>
                </div>
            </section>
        </div>
    )
}

import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer d-flex flex-column align-items-center">
            <div className="contact">
                <a href="mailto:info@leon.productions">info@leon.productions</a>
                <p>+380674533225</p>
            </div>
            <div className="contact-social">
                <Link to="">
                    <img src="/images/viber-icon.png" alt="viber"/>
                </Link>
                <Link to="">
                    <img src="/images/telegram-icon.png" alt="telegram"/>
                </Link>
            </div>
        </footer>
    )
}

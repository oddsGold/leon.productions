import React from "react";

export default function Footer({footerData}) {
    return (
        <footer className="footer d-flex flex-column align-items-center">
            <div className="contact">
                <a href={`mailto:${footerData.contact.email}`}>{footerData.contact.email}</a>
                <p>{footerData.contact.phone}</p>
            </div>
            <div className="contact-social">
                <a href={footerData.contact.whatsapp}>
                    <img src="/images/viber-icon.png" alt="Whatsapp icon"/>
                </a>
                <a href={footerData.contact.telegram}>
                    <img src="/images/telegram-icon.png" alt="telegram"/>
                </a>
            </div>
        </footer>
    )
}

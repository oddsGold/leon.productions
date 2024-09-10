import React from "react";

export default function AboutContent({aboutData, handleClose}) {
    return (
        <div className={`about-content`}>
            <span className="about-content-btn" onClick={handleClose}>&#10006;</span>
            <div className="about-content-title">
                <h3>about</h3>
            </div>
            <div className="about-content-row">
                <div className="about-content-row-item">
                    <div className="about-content-row-title">
                        <p>LEON POST PRODUCTION</p>
                    </div>
                    <div className="about-content-row-text">
                        <div dangerouslySetInnerHTML={{__html: aboutData.description}}/>
                    </div>
                </div>
                <div className="about-content-row-item about-content-row-item__padding">
                    <div className="about-content-row-title">
                        <p>SERVICES</p>
                    </div>
                    <div className="about-content-row-grid">
                        {aboutData.services.map((service, index) => (
                            <div className="grid-item" key={index}>
                                <img src="/images/about-arrow.svg" alt="errow"/>
                                <p>{service.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="about-content-contacts">
                <a href={`mailto:${aboutData.contacts.email}`}>{aboutData.contacts.email}</a>
                <p className="about-content-contacts__padding">
                    <a href={aboutData.contacts.whatsapp}>Whatsapp</a> | <a
                    href={aboutData.contacts.telegram}>Telegram</a>
                </p>
                <p>{aboutData.contacts.phone}</p>
            </div>
            <div className="about-content-social">
                {aboutData.socials.map((social, index) => (
                    <a href={social.link} key={index}>
                        <img src={social.icon} alt={social.icon.split('/').pop()} />
                    </a>
                ))}
            </div>
        </div>
    )
}

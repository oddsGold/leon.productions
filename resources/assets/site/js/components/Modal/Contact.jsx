import React, { useState, useEffect } from 'react';

const Contact = ({ contactsData, title, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsVisible(true);
        }, 10);
    }, []);

    useEffect(() => {
        if (!isVisible) {
            const timer = setTimeout(onClose, 800);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    return (
        <div
            className={`contact-modal modal-overlay ${isVisible ? 'show' : 'hide'}`}
            onClick={() => setIsVisible(false)}
        >
            <div
                className={`modal-content ${isVisible ? 'show' : 'hide'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <button type="button" className="btn-close__mobile" onClick={() => setIsVisible(false)}
                        aria-label="Close">
                    <img src="/images/close-icon-contact.png" alt="icon-close"/>
                </button>
                <div className="modal-header">
                    <h5 className="modal-title">{title}</h5>
                    <button type="button" className="btn-close" onClick={() => setIsVisible(false)}
                            aria-label="Close">&#10006;</button>
                </div>
                <div className="modal-body">
                    <div className="modal-body-description">
                        <div dangerouslySetInnerHTML={{__html: contactsData.description}}/>
                    </div>
                    <div className="modal-body-info">
                        <a href={`mailto:${contactsData.contacts.email}`}>{contactsData.contacts.email}</a>
                        <p className="modal-body-info__padding">
                            <a href={contactsData.contacts.whatsapp}>Whatsapp</a> | <a
                            href={contactsData.contacts.telegram}>Telegram</a>
                        </p>
                        <p>{contactsData.contacts.phone}</p>
                    </div>
                    <div className="modal-body-social">
                        {contactsData.socials.map((social, index) => (
                            <a href={social.link} key={index}>
                                <img src={social.icon} alt={social.icon.split('/').pop()}/>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

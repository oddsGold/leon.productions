import React, { useState, useEffect } from 'react';

const Contact = ({ title, body, onClose }) => {
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
                        <p>VFX, CGI and even more</p>
                        <p>Let’s talk about it.</p>
                    </div>
                    <div className="modal-body-info">
                        <a href="mailto:info@leon.productions">info@leon.productions</a>
                        <p className="modal-body-info__padding">Whatsapp | Telegram</p>
                        <p>+380674533225</p>
                    </div>
                    <div className="modal-body-social">
                        <a href="">
                            <img src="/images/instagram.svg" alt="instagram"/>
                        </a>
                        <a href="">
                            <img src="/images/fb.svg" alt="fb"/>
                        </a>
                        <a href="">
                            <img src="/images/yt.svg" alt="yt"/>
                        </a>
                        <a href="">
                            <img src="/images/linkedin.svg" alt="linkedin"/>
                        </a>
                        <a href="">
                            <img src="/images/v.svg" alt="v"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

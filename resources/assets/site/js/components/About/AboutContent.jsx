import React from "react";

export default function AboutContent({handleClose}) {
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
                        <p>
                            We are a post-production company based in Kyiv, Ukraine, specializing in commercials,
                            movies, and design. Our focus is on producing post-production and visual effects
                            projects of any complexity.
                        </p>
                        <p>
                            Our services encompass the entire post-production process, from pre-production
                            supervision and management to final project mastering, including all stages of editing,
                            animation, VFX, and final grading.
                        </p>
                        <p>
                            Founded in late 2023, our team comprises experienced and passionate professionals united
                            by a common goal: to deliver exceptional results for our clients.
                        </p>
                    </div>
                </div>
                <div className="about-content-row-item about-content-row-item__padding">
                    <div className="about-content-row-title">
                        <p>SERVICES</p>
                    </div>
                    <div className="about-content-row-grid">
                        <div className="grid-item">
                            <img src="/images/about-arrow.svg" alt="errow"/>
                            <p>Compositing, keying, camera tracking, matchmoving, rotoscoping</p>
                        </div>
                        <div className="grid-item">
                            <img src="/images/about-arrow.svg" alt="errow"/>
                            <p>Matte painting and set extension</p>
                        </div>
                        <div className="grid-item">
                            <img src="/images/about-arrow.svg" alt="errow"/>
                            <p>Motion and Cartoon animation</p>
                        </div>
                        <div className="grid-item">
                            <img src="/images/about-arrow.svg" alt="errow"/>
                            <p>3D modeling, lighting and shading</p>
                        </div>
                        <div className="grid-item">
                            <img src="/images/about-arrow.svg" alt="errow"/>
                            <p>Rigging and characters animation</p>
                        </div>
                        <div className="grid-item">
                            <img src="/images/about-arrow.svg" alt="errow"/>
                            <p>Grooming and simulations</p>
                        </div>
                        <div className="grid-item">
                            <img src="/images/about-arrow.svg" alt="errow"/>
                            <p>Editing and Grading</p>
                        </div>
                        <div className="grid-item">
                            <img src="/images/about-arrow.svg" alt="errow"/>
                            <p>AR/VR content</p>
                        </div>
                        <div className="grid-item">
                            <img src="/images/about-arrow.svg" alt="errow"/>
                            <p>Sound (mixing, mastering, musician)</p>
                        </div>
                        <div className="grid-item">
                            <img src="/images/about-arrow.svg" alt="errow"/>
                            <p>Creative and concept arts</p>
                        </div>
                        <div className="grid-item">
                            <img src="/images/about-arrow.svg" alt="errow"/>
                            <p>UX/UI design</p>
                        </div>
                        <div className="grid-item">
                            <img src="/images/about-arrow.svg" alt="errow"/>
                            <p>2D design key-visuals and banners</p>
                        </div>
                        <div className="grid-item">
                            <img src="/images/about-arrow.svg" alt="errow"/>
                            <p>Illustrations and iconographic</p>
                        </div>
                        <div className="grid-item">
                            <img src="/images/about-arrow.svg" alt="errow"/>
                            <p>HTML5 banners</p>
                        </div>
                        <div className="grid-item">
                            <img src="/images/about-arrow.svg" alt="errow"/>
                            <p>2D design key-visuals and banners</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="about-content-contacts">
                <a href="mailto:info@leon.productions">info@leon.productions</a>
                <p className="about-content-contacts__padding">Whatsapp | Telegram</p>
                <p>+380674533225</p>
            </div>
            <div className="about-content-social">
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
    )
}

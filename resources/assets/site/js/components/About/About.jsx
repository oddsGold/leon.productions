import React, {useEffect, useRef, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectVisible } from '../../redux/about/selectors';
import { hideAbout } from '../../redux/about/slice';

const About = () => {
    const isVisible = useSelector(selectVisible);
    const dispatch = useDispatch();
    const [aboutHeight, setAboutHeight] = useState(0);
    const [isRendered, setIsRendered] = useState(false);
    const aboutRef = useRef(null);

    useEffect(() => {
        const handleVisibilityChange = () => {
            const aboutElement = aboutRef.current;
            const logoElement = document.querySelector('.logo');
            const menuElement = document.querySelector('.site-menu');

            if (aboutElement) setAboutHeight(aboutElement.offsetHeight);

            if (isVisible) {
                setTimeout(() => setIsRendered(true), 10);
                document.body.classList.add('no-scroll');
                if (logoElement) logoElement.style.bottom = `-${aboutHeight}px`;
                if (menuElement) {
                    const currentTop = parseInt(window.getComputedStyle(menuElement).top, 10) || 0;
                    menuElement.style.top = `${currentTop + aboutHeight}px`;
                }
                document.body.style.paddingTop = `${aboutHeight}px`;
            } else {
                setIsRendered(false);
                document.body.style.paddingTop = '0px';
                if (logoElement) logoElement.style.bottom = '97px';
                if (menuElement) menuElement.style.top = '30px';
                setTimeout(() => document.body.classList.remove('no-scroll'), 500);
            }
        };

        handleVisibilityChange();
    }, [isVisible, aboutHeight]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (aboutRef.current && !aboutRef.current.contains(event.target)) {
                dispatch(hideAbout());
            }
        };

        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible, dispatch]);

    const handleClose = () => {
        dispatch(hideAbout());
    };

    return (
        <div className={`about ${isRendered ? 'about-visible' : 'about-hidden'}`} ref={aboutRef}>
            <div className={`about-content`}>
                <span className="about-content-btn" onClick={handleClose}>&#10006;</span>
                <div className="about-content-title">
                    <h3>about</h3>
                </div>
                <div className="about-content-row">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="about-content-row-title">
                                <p>LEON POST PRODUCTION</p>
                            </div>
                            <div className="about-content-row-text">
                                <p>
                                    We are a post-production company based in Kyiv, Ukraine, specializing in commercials, movies, and design. Our focus is on producing post-production and visual effects projects of any complexity.
                                </p>
                                <p>
                                    Our services encompass the entire post-production process, from pre-production supervision and management to final project mastering, including all stages of editing, animation, VFX, and final grading.
                                </p>
                                <p>
                                    Founded in late 2023, our team comprises experienced and passionate professionals united by a common goal: to deliver exceptional results for our clients.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-7 offset-lg-1">
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
                </div>
            </div>
        </div>
    );
};

export default About;

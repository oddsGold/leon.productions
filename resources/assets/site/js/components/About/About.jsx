import React, {useEffect, useRef, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectVisible } from '../../redux/about/selectors';
import { hideAbout } from '../../redux/about/slice';
import AboutContent from "./AboutContent";

const About = () => {
    const isVisible = useSelector(selectVisible);
    const dispatch = useDispatch();
    const [aboutHeight, setAboutHeight] = useState(0);
    const [isRendered, setIsRendered] = useState(false);
    const aboutRef = useRef(null);
    const isMobile = window.innerWidth <= 991;

    const updateAboutHeight = () => {
        const aboutElement = aboutRef.current;
        const logoElement = document.querySelector('.logo');
        const menuElement = document.querySelector('.site-menu');

        if (aboutElement) setAboutHeight(aboutElement.offsetHeight);

        if (isVisible) {
            setTimeout(() => setIsRendered(true), 10);
            document.body.classList.add('no-scroll');

            if (logoElement) {
                if (isMobile) {
                    logoElement.style.top = `${aboutHeight}px`;
                } else {
                    logoElement.style.bottom = `-${aboutHeight}px`;
                }
            }

            if (menuElement) {
                const currentTop = parseInt(window.getComputedStyle(menuElement).top, 10) || 0;
                if (isMobile) {
                    const currentBottom = parseInt(window.getComputedStyle(menuElement).bottom, 10) || 0;
                    menuElement.style.bottom = `-${currentBottom + aboutHeight}px`;
                } else {
                    menuElement.style.top = `${currentTop + aboutHeight}px`;
                }
            }

            document.body.style.paddingTop = `${aboutHeight}px`;
        } else {
            setIsRendered(false);
            document.body.style.paddingTop = '0px';

            if (logoElement) {
                if (isMobile) {
                    logoElement.style.top = '30px';
                } else {
                    logoElement.style.bottom = '97px';
                }
            }

            if (menuElement) {
                if (isMobile) {
                    menuElement.style.bottom = '52px';
                } else {
                    menuElement.style.top = '30px';
                }
            }

            setTimeout(() => document.body.classList.remove('no-scroll'), 500);
        }
    }


    useEffect(() => {
        updateAboutHeight();

        window.addEventListener('resize', updateAboutHeight);

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
            window.removeEventListener('resize', updateAboutHeight);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible, aboutHeight, isMobile, dispatch]);

    const handleClose = () => {
        dispatch(hideAbout());
    };

    return (
        <div className={`about ${isRendered ? 'about-visible' : 'about-hidden'}`} ref={aboutRef}>
           <AboutContent handleClose={handleClose} />
        </div>
    );
};

export default About;

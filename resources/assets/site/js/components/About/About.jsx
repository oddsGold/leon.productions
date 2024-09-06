import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectVisible } from '../../redux/about/selectors';
import { hideAbout } from '../../redux/about/slice';

const About = () => {
    const isVisible = useSelector(selectVisible);
    const dispatch = useDispatch();
    const [aboutHeight, setAboutHeight] = useState(0);
    const [isRendered, setIsRendered] = useState(false);

    useEffect(() => {
        const handleVisibilityChange = () => {
            const aboutElement = document.querySelector('.about');
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
                setTimeout(() => document.body.classList.remove('no-scroll'), 800);
            }
        };

        handleVisibilityChange();

    }, [isVisible, aboutHeight]);

    const handleClose = () => {
        dispatch(hideAbout());
    };

    return (
        <div className={`about ${isRendered ? 'about--visible' : 'about--hidden'}`}>
            <div className={`about__content`}>
                <button onClick={handleClose}>Close</button>
                <p>This is the About content.</p>
                <p>This is the About content.</p>
                <p>This is the About content.</p>
                <p>This is the About content.</p>
                <p>This is the About content.</p>
                <p>This is the About content.</p>
                <p>This is the About content.</p>
                <p>This is the About content.</p>
                <p>This is the About content.</p>
                <p>This is the About content.</p>
                <p>This is the About content.</p>
                <p>This is the About content.</p>
                <p>This is the About content.</p>
                <p>This is the About content.</p>
                <p>This is the About content.</p>
                <p>This is the About content.</p>
                <p>This is the About content.</p>
                <p>This is the About content.</p>
                <p>This is the About content.</p>
                <p>This is the About content.</p>
                <p>This is the About content.</p>
                <p>This is the About content.</p>
            </div>
        </div>
    );
};

export default About;

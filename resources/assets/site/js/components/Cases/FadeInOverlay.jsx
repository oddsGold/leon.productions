import React, { useEffect, useState } from 'react';

const FadeInOverlay = ({ isVisible, onAnimationEnd }) => {
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setFadeIn(true);
        } else {
            setFadeIn(false);
        }
    }, [isVisible]);

    return (
        <div
            className={`fade-in ${fadeIn ? 'visible' : ''}`}
            onAnimationEnd={onAnimationEnd}
        >
        </div>
    );
};

export default FadeInOverlay;

import React, { useEffect, useState } from 'react';

const FadeInOverlay = ({ onAnimationEnd, returnFadeInVisibleSetter }) => {
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        returnFadeInVisibleSetter && returnFadeInVisibleSetter(setFadeIn);
    });

    return (
        <div
            className={`fade-in ${fadeIn ? 'visible' : ''}`}
            onAnimationEnd={onAnimationEnd}
        >
        </div>
    );
};

export default FadeInOverlay;

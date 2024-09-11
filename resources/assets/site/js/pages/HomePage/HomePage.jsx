import React, { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TopCases from '../../components/HomeComponents/TopCases';
import RemainingCases from '../../components/HomeComponents/RemainingCases';
import Contact from '../../components/Modal/Contact';
import Navigation from '../../components/Navigation/Navigation';
import { useVideoQuery } from '../../redux/cases/casesApiSlice';
import NoDataPage from '../NoDataPage/NoDataPage';
import Loader from '../../components/Loader/Loader';
import { useContactsQuery } from '../../redux/contacts/contactsApiSlice';
import OverlayComponent from "../../components/OverlayComponent";
import FadeInOverlay from "../../components/Cases/FadeInOverlay";

export default function HomePage() {
    const { data: videos, error: isVideosError, isLoading: isVideosLoading } = useVideoQuery();
    const { data: contactsData, error: isContactsError, isLoading: isContactsLoading } = useContactsQuery();
    const [showModal, setShowModal] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [fadeIn, setFadeIn] = useState(false);
    const location = useLocation();

    const handleShowModal = useCallback(() => setShowModal(true), []);
    const handleCloseModal = useCallback(() => setShowModal(false), []);
    const handleShowOverlay = useCallback((data) => {
        setSelectedData(data);
        setFadeIn(true);
        setTimeout(() => {
            setShowOverlay(true);
            setFadeIn(false);
        }, 1500);
    }, []);
    const handleHideOverlay = useCallback(() => {
        setSelectedData(null);
        setShowOverlay(false);
    }, []);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const slugFromUrl = queryParams.get('slug');

        if (slugFromUrl && videos) {
            const foundVideo = videos.find(video => video.slug === slugFromUrl);
            if (foundVideo) {
                setSelectedData(foundVideo);
                setShowOverlay(true);
            }
        }
    }, [location.search, videos]);

    useEffect(() => {
        if (showOverlay) {
            window.history.pushState({}, '', `?slug=${selectedData?.slug}`);
            document.body.classList.add('no-scroll');
        } else {
            window.history.pushState({}, '', window.location.pathname);
            document.body.classList.remove('no-scroll');
        }
    }, [showOverlay, selectedData]);

    if (isVideosLoading) return <Loader />;
    if (isVideosError || !videos || videos.length === 0) return <NoDataPage />;

    const topCasesData = videos.slice(0, 4);
    const remainingCasesData = videos.slice(4);

    return (
        <>
            <Navigation handleShowModal={handleShowModal} />
            <TopCases
                cases={topCasesData}
                handleShowModal={handleShowModal}
                handleShowOverlay={handleShowOverlay}
            />
            {remainingCasesData.length > 0 && (
                <RemainingCases
                    cases={remainingCasesData}
                    handleShowOverlay={handleShowOverlay}
                />
            )}
            <FadeInOverlay isVisible={fadeIn} />
            {showOverlay && (
                <div className="overlay">
                    <OverlayComponent
                        handleHideOverlay={handleHideOverlay}
                        selectedData={selectedData}
                    />
                </div>
            )}
            {showModal && !isContactsLoading && !isContactsError && (
                <Contact contactsData={contactsData} title="Contact" onClose={handleCloseModal} />
            )}
        </>
    );
}

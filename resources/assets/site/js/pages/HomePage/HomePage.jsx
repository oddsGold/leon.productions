import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
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
    const setFadeInVisibleRef = useRef(null);
    const urlParams = useParams();

    const handleShowModal = useCallback(() => setShowModal(true), []);
    const handleCloseModal = useCallback(() => setShowModal(false), []);
    const handleShowOverlay = useCallback((data) => {
        setSelectedData(data);
        setFadeInVisibleRef.current && setFadeInVisibleRef.current(true);
        setTimeout(() => {
            setShowOverlay(true);
        }, 1100);
        setTimeout(() => {
            setFadeInVisibleRef.current && setFadeInVisibleRef.current(false);
        }, 1500);
    }, []);
    const returnFadeInVisibleSetter = (setter) => {
        setFadeInVisibleRef.current = setter;
    };
    const handleHideOverlay = useCallback(() => {
        setFadeInVisibleRef.current && setFadeInVisibleRef.current(true);
        setTimeout(() => {
            setShowOverlay(false);
            setSelectedData(null);
        }, 1000);
        setTimeout(() => {
            setFadeInVisibleRef.current && setFadeInVisibleRef.current(false);
        }, 1500);
    }, []);

    useEffect(() => {
        if (urlParams.slug && videos) {
            const foundVideo = videos.find(video => video.slug === urlParams.slug);
            if (foundVideo) {
                setSelectedData(foundVideo);
                setShowOverlay(true);
            }
        }
    }, [videos]);

    useEffect(() => {
        if (showOverlay) {
            window.history.pushState({}, '', `/cases/${selectedData?.slug}`);
            document.body.classList.add('no-scroll');
        } else {
            window.history.pushState({}, '', '/');
            document.body.classList.remove('no-scroll');
        }
    }, [showOverlay, selectedData]);

    if (isVideosLoading) return <Loader />;
    if (isVideosError || !videos || videos.length === 0) return <NoDataPage />;

    const topCasesData = videos.slice(0, 4);
    const remainingCasesData = videos.slice(4);

    return (
        <>
            <Navigation
                handleShowModal={handleShowModal}
                handleShowOverlay={handleShowOverlay}
            />
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
            <FadeInOverlay selectedData={selectedData} returnFadeInVisibleSetter={returnFadeInVisibleSetter} />
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

import React, {useState, useCallback, useEffect} from 'react';
import TopCases from '../../components/HomeComponents/TopCases';
import RemainingCases from '../../components/HomeComponents/RemainingCases';
import Contact from '../../components/Modal/Contact';
import Navigation from '../../components/Navigation/Navigation';
import {useVideoQuery} from '../../redux/cases/casesApiSlice';
import NoDataPage from '../NoDataPage/NoDataPage';
import Loader from '../../components/Loader/Loader';
import {useContactsQuery} from '../../redux/contacts/contactsApiSlice';
import OverlayComponent from "../../components/OverlayComponent";

export default function HomePage() {
    const {data: videos, error: isVideosError, isLoading: isVideosLoading} = useVideoQuery();
    const {data: contactsData, error: isContactsError, isLoading: isContactsLoading} = useContactsQuery();
    const [showModal, setShowModal] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const handleShowModal = useCallback(() => setShowModal(true), []);
    const handleCloseModal = useCallback(() => setShowModal(false), []);
    const handleShowOverlay = useCallback((data) => {
        setSelectedData(data);
        setShowOverlay(true);
    }, []);
    const handleHideOverlay = useCallback(() => {
        setSelectedData(null);
        setShowOverlay(false);
    }, []);

    useEffect(() => {
        if (showOverlay) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [showOverlay]);

    if (isVideosLoading) return <Loader/>;
    if (isVideosError || !videos || videos.length === 0) return <NoDataPage/>;

    const topCasesData = videos.slice(0, 4);
    const remainingCasesData = videos.slice(4);

    return (
        <>
            <Navigation handleShowModal={handleShowModal}/>
            <TopCases
                cases={topCasesData}
                handleShowModal={handleShowModal}
                handleShowOverlay={handleShowOverlay}
            />
            {remainingCasesData.length > 0 && (
                <RemainingCases
                    cases={remainingCasesData}
                />
            )}
            {showOverlay && (
                <div className="overlay">
                    <OverlayComponent
                        handleHideOverlay={handleHideOverlay}
                        selectedData={selectedData}
                    />
                </div>
            )}
            {showModal && !isContactsLoading && !isContactsError && (
                <Contact contactsData={contactsData} title="Contact" onClose={handleCloseModal}/>
            )}
        </>
    );
}

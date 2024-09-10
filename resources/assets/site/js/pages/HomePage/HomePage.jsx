import TopCases from "../../components/HomeComponents/TopCases";
import RemainingCases from "../../components/HomeComponents/RemainingCases";
import {useCallback, useState} from "react";
import Contact from "../../components/Modal/Contact";
import Navigation from "../../components/Navigation/Navigation";
import {useVideoQuery} from "../../redux/cases/casesApiSlice";
import NoDataPage from "../NoDataPage/NoDataPage";
import Loader from "../../components/Loader/Loader";

export default function HomePage() {
    const {data: videos, error: isVideosError, isLoading: isVideosLoading} = useVideoQuery();
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = useCallback(() => setShowModal(true), []);
    const handleCloseModal = useCallback(() => setShowModal(false), []);

    if (isVideosLoading) return <Loader />;
    if (isVideosError || !videos || videos.length === 0) return <NoDataPage />;

    const topCasesData = videos.slice(0, 4);
    const remainingCasesData = videos.slice(4);

    return (
        <>
            <Navigation handleShowModal={handleShowModal}/>
            <TopCases cases={topCasesData} handleShowModal={handleShowModal}/>
            {remainingCasesData.length > 0 && (
                <RemainingCases cases={remainingCasesData}/>
            )}
            {showModal && (
                <Contact
                    title="Contact"
                    body="Modal body text goes here."
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
}

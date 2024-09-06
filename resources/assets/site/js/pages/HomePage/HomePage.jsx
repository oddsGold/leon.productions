import TopCases from "../../components/HomeComponents/TopCases";
import RemainingCases from "../../components/HomeComponents/RemainingCases";
import {useUsersQuery} from "../../redux/cases/casesApiSlice";
import {useCallback, useState} from "react";
import Contact from "../../components/Modal/Contact";
import Navigation from "../../components/Navigation/Navigation";

export default function HomePage() {
    const {data: users, error: isUsersError, isLoading: isUsersLoading} = useUsersQuery()
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = useCallback(() => setShowModal(true), []);
    const handleCloseModal = useCallback(() => setShowModal(false), []);

    if (isUsersLoading) {
        return <p>Loading...</p>;
    }

    if (isUsersError) {
        return <p>Failed to load data. Please try again later.</p>;
    }

    if (!users || users.length === 0) {
        return <p>No data available.</p>;
    }

    const topCasesData = users.slice(0, 4);
    const remainingCasesData = users.slice(4);

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

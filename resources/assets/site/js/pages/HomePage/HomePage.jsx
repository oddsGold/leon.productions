import TopCases from "../../components/HomeComponents/TopCases";
import RemainingCases from "../../components/HomeComponents/RemainingCases";
import { useUsersQuery } from "../../redux/cases/casesApiSlice";
import {NavLink} from "react-router-dom";

export default function HomePage() {
    const { data: users, error: isUsersError, isLoading: isUsersLoading } = useUsersQuery();

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
            <nav className="site-menu">
                <NavLink to="/test">Test</NavLink>
            </nav>
            <TopCases cases={topCasesData}/>
            {remainingCasesData.length > 0 && (
                <RemainingCases cases={remainingCasesData}/>
            )}
        </>
    );
}

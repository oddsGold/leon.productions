import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage/HomePage";
import TestPage from "./pages/TestPage";

export default function App() {


    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<HomePage/>}/>
                <Route path="/test" element={<TestPage/>}/>
            </Route>
        </Routes>
    );
}

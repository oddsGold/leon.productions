import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage/HomePage";
import TestPage from "./pages/TestPage";
import NotFound from "./pages/Erorrs/NotFound";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<HomePage/>}/>
                <Route path="/cases/:slug" element={<HomePage/>}/>
            </Route>
            <Route path="*" element={<NotFound />}/>
        </Routes>
    );
}

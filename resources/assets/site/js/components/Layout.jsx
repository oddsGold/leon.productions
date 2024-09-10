import {Outlet} from "react-router-dom";
import Logo from "./Logo";
import Footer from "./Footer/Footer";
import About from "./About/About";
import {useAboutQuery} from "../redux/about/aboutApiSlice";

const Layout = () => {
    const {data: aboutData, error: isAboutError, isLoading: isAboutLoading} = useAboutQuery();

    return (<div className="wrapper">
        {!isAboutLoading && !isAboutError && <About aboutData={aboutData}/>}
        <main className="site-main">
            <div className="home-grid grid grid--no-margin flex flex-wrap">
                <Outlet/>
            </div>
        </main>
        <Logo/>
        <Footer/>
    </div>)
}
export default Layout;

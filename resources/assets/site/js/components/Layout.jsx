import {Outlet} from "react-router-dom";
import Logo from "./Logo";
import Footer from "./Footer/Footer";
import About from "./About/About";

const Layout = () => {
    return (
        <div className="wrapper">
            <About />
            <main className="site-main">
                <div className="home-grid grid grid--no-margin flex flex-wrap">
                    <Outlet/>
                </div>
            </main>
            <Logo/>
            <Footer/>
        </div>
    )
}
export default Layout;

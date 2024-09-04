import {Outlet} from "react-router-dom";
import Logo from "./Logo";
import Footer from "./Footer/Footer";

const Layout = () => {

    return (
        <div className="wrapper">
            <main className="site-main">
                <div className="home-grid grid grid--no-margin flex flex-wrap">
                    <Outlet />
                </div>
                <Logo />
            </main>
            <Footer />
        </div>
    )
}
export default Layout;

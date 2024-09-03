import {NavLink, Outlet} from "react-router-dom";

const Layout = () => {

    return (
        <div className="wrapper">
            <main className="site-main">
                <div className="home-grid grid grid--no-margin flex flex-wrap">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
export default Layout;

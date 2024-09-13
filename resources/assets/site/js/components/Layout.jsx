import {Outlet, useParams} from "react-router-dom";
import {useRef, useEffect, useState} from "react";
import Logo from "./Logo";
import Footer from "./Footer/Footer";
import About from "./About/About";
import Loader from "../components/Loader/Loader";
import {useAboutQuery} from "../redux/about/aboutApiSlice";
import {useFooterContactsQuery} from "../redux/contacts/contactsApiSlice";

const Layout = () => {
    const {data: aboutData, error: isAboutError, isLoading: isAboutLoading} = useAboutQuery();
    const {data: footerData, error: isFooterError, isLoading: isFooterLoading} = useFooterContactsQuery();
    const loaderRef = useRef(null);
    const urlParams = useParams();

    useEffect(() => {
        let timer;

        document.body.classList.add('no-scroll');

        timer = setTimeout(() => {
            if (loaderRef.current) {
                loaderRef.current.classList.add('none');
                if(!urlParams.slug) {
                    document.body.classList.remove('no-scroll');
                }
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div className="loader-bg" ref={loaderRef}>
                <Loader/>
            </div>
            <div className="wrapper">
                {!isAboutLoading && !isAboutError && <About aboutData={aboutData}/>}
                <main className="site-main">
                    <div className="home-grid grid grid--no-margin flex flex-wrap">
                        <Outlet/>
                    </div>
                </main>
                <Logo/>
                {!isFooterLoading && !isFooterError && <Footer footerData={footerData}/>}
            </div>
        </>
    );
};

export default Layout;

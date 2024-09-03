import React from 'react';
import {Routes, Route, Outlet} from "react-router-dom";
import routes from "../../routes";


export default function Main() {

    const createRouteCallback = (route, index) => {
        return <Route
            key={index}
            path={route.path}
            exact={route.exact}
            element={((route.children && Object.keys(route.children).length > 0) || !route.element) ? <Outlet /> : route.element}
        >
            {route.element && (route.children && Object.keys(route.children).length > 0) && <Route key={'index'} index element={route.element}/>}
            {route.children && Object.values(route.children).map(createRouteCallback)}
        </Route>;
    };


    return (
        <div className="main">
            <div className="container">
                <Routes>
                    {Object.values(routes).map(createRouteCallback)}
                </Routes>
            </div>
        </div>
    );
}

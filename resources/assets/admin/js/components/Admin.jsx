import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {ReactNotifications} from "react-notifications-component";
import store from "../redux/store";
import {Provider} from "react-redux";
import Content from "./layouts/components/Content";
import Sidebar from "./layouts/components/Sidebar";
import Guard from "../utils/Guard";
import Loading from "./layouts/components/Loading";

export default function Admin() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <ReactNotifications />
                <Guard>
                    <div className="admin">
                        <Loading />
                        <Sidebar/>
                        <Content/>
                    </div>
                </Guard>

            </BrowserRouter>
        </Provider>
    );
}

import React from "react";
import {connect} from "react-redux";
import SidebarMenu from "../menu/components/Menu";
import Loading from "../menu/components/Loading";


const Sidebar = () => {
    return (
        <nav className="sidebar">
            <div className="sidebar-header">
                <h3>Admin</h3>
            </div>
            <div className="sidebar-container">
                <Loading />
                <SidebarMenu />
            </div>
        </nav>
    );
};

export default connect()(Sidebar);

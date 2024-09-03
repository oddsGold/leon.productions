import React from "react";
import {connect} from "react-redux";
import Login from "../components/auth/Login";
import {fetchUser, refreshAuthentication} from "../components/auth/redux/actions";

const Guard = ({authenticated, triedToRefreshAuthenticated, children, refreshAuthentication, fetchUser}) => {

    // const {authenticated, triedToRefreshAuthenticated, login, email, role} = user;
    // const {fetching} = settings;

    if(!authenticated && !triedToRefreshAuthenticated){
        refreshAuthentication();
    }

    if(authenticated && triedToRefreshAuthenticated){
        fetchUser();
    }


    // if(authenticated && !fetching && !login && !email){
    //     //debugger;
    //     fetchUser();
    // }

    return (
        authenticated ? children : <Login />
    );

};

export default connect(
    state => ({
        authenticated: state.auth.authenticated,
        triedToRefreshAuthenticated: state.auth.triedToRefreshAuthenticated,

    }), ({refreshAuthentication, fetchUser})
)(Guard);

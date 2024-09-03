import React from "react";
import {connect} from "react-redux";
import LoadingGeneric from "../../../generic/Loading";

const Loading = ({fetching}) => {

    return (fetching && <LoadingGeneric />);

};

export default connect(state => ({fetching: state.user.role.fetching}))(Loading);

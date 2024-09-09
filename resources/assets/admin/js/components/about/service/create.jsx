import React from "react";
import {connect} from "react-redux";
import {Navigate, generatePath} from 'react-router-dom'
import Loading from "./components/Loading";
import {createItemAndSetCurrent} from "./redux/actions";
import routes from '../../routes';
import FormTitle from "../../generic/FormTitle";
import Form from "./components/Form";

const Create = ({current, createItemAndSetCurrent}) => {

    if(current){
        return <Navigate to={generatePath(routes.about.children.services.children.edit.absolute, {id: current.id})} />;
    }

    return (
        <div className="create-page about-services">
            <Loading />
            <FormTitle title={"Добавить услугу"} backLinkPath={routes.about.children.services.absolute} />
            <Form current={current} actionOnSubmit={createItemAndSetCurrent} />
        </div>
    );
};

export default connect(
    state => ({
        current: state.about.service.current,
    }), ({createItemAndSetCurrent})
)(Create);

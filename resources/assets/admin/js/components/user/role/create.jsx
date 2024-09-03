import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Navigate, generatePath} from 'react-router-dom'
import Loading from "./components/Loading";
import {createItemAndSetCurrent, fetchResources} from "./redux/actions";
import routes from '../../routes';
import FormTitle from "../../generic/FormTitle";
import Form from "./components/Form";

const Create = ({current, resources, createItemAndSetCurrent, fetchResources}) => {

    if(current){
        return <Navigate to={generatePath(routes.roles.children.edit.absolute, {id: current.id})} />;
    }

    useEffect(() => {
        if(!resources && !Array.isArray(resources)){
            fetchResources();
        }
    }, []);

    return (
        <div className="create-page roles">
            <Loading />
            <FormTitle title={"Добавить роль пользователя"} backLinkPath={routes.roles.absolute} />
            <Form current={current} actionOnSubmit={createItemAndSetCurrent} resources={resources} />
        </div>
    );
};

export default connect(
    state => ({
        current: state.user.role.current,
        resources: state.user.role.resources,
    }), ({createItemAndSetCurrent, fetchResources})
)(Create);

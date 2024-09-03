import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Navigate, generatePath} from 'react-router-dom'
import Loading from "./components/Loading";
import {createItemAndSetCurrent, clearRoles, fetchRoles} from "./redux/actions";
import routes from '../../routes';
import FormTitle from "../../generic/FormTitle";
import Form from "./components/Form";

const Create = ({current, roles, createItemAndSetCurrent, clearRoles, fetchRoles}) => {

    if(current){
        return <Navigate to={generatePath(routes.users.children.edit.absolute, {id: current.id})} />;
    }

    useEffect(() => {
        if(!roles && !Array.isArray(roles)){
            fetchRoles();
        }
    }, []);

    useEffect(() => {
        return () => {
            clearRoles();
        }
    }, []);

    return (
        <div className="create-page users">
            <Loading />
            <FormTitle title={"Добавить пользователя"} backLinkPath={routes.users.absolute} />
            <Form current={current} actionOnSubmit={createItemAndSetCurrent} roles={roles} />
        </div>
    );
};

export default connect(
    state => ({
        current: state.user.user.current,
        roles: state.user.user.roles,
    }), ({createItemAndSetCurrent, clearRoles, fetchRoles})
)(Create);

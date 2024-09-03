import React, {useEffect} from "react";
import {connect} from "react-redux";
import {useParams} from 'react-router-dom';
import {fetchItemByIdAndSetCurrent, clearCurrentItem, updateItemAndSetCurrent, clearRoles, fetchRoles} from "./redux/actions";
import routes from '../../routes';
import Loading from "./components/Loading";
import FormTitle from "../../generic/FormTitle";
import Form from "./components/Form";

const Edit = ({current, fetching, roles, fetchItemByIdAndSetCurrent, clearCurrentItem, updateItemAndSetCurrent, clearRoles, fetchRoles}) => {

    const {id} = useParams();

    useEffect(() => {
        if(
            (!current && parseInt(id) > 0) ||
            (
                current && Object.prototype.toString.call(current) === '[object Object]' &&
                current.hasOwnProperty('id') && parseInt(id) !== parseInt(current.id)
            )
        ){
            fetchItemByIdAndSetCurrent(id);
        }
    }, []);

    useEffect(() => {
        if(!roles && !Array.isArray(roles)){
            fetchRoles();
        }
    },[]);

    useEffect(() => {
        return () => {
            clearCurrentItem();
            clearRoles()
        };
    }, []);

    return (
        <div className="edit-page users">
            <Loading />
            <FormTitle title={"Редактировать пользователя"} backLinkPath={routes.users.absolute} />
            <Form
                current={current ? {
                    ...current,
                    password: '',
                    password_confirmation: '',
                    role: current.role.id
                } : null}
                actionOnSubmit={updateItemAndSetCurrent}
                roles={roles}
            />
        </div>
    );
};

export default connect(
    state => ({
        current: state.user.user.current,
        fetching: state.user.user.fetching,
        roles: state.user.user.roles
    }),({fetchItemByIdAndSetCurrent, clearCurrentItem, updateItemAndSetCurrent, clearRoles, fetchRoles})
)(Edit);

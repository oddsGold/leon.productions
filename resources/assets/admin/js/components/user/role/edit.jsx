import React, {useEffect} from "react";
import {connect} from "react-redux";
import {useParams} from 'react-router-dom';
import {fetchItemByIdAndSetCurrent, clearCurrentItem, updateItemAndSetCurrent, fetchResources} from "./redux/actions";
import routes from '../../routes';
import Loading from "./components/Loading";
import FormTitle from "../../generic/FormTitle";
import Form from "./components/Form";

const Edit = ({current, fetching, resources, fetchItemByIdAndSetCurrent, clearCurrentItem, updateItemAndSetCurrent, fetchResources}) => {

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
        if(!resources && !Array.isArray(resources)){
            fetchResources();
        }
    }, []);

    useEffect(() => {
        return () => {
            clearCurrentItem();
        };
    }, []);

    return (
        <div className="edit-page roles">
            <Loading />
            <FormTitle title={"Редактировать роль пользователя"} backLinkPath={routes.roles.absolute} />
            <Form current={current} actionOnSubmit={updateItemAndSetCurrent} resources={resources} />
        </div>
    );
};

export default connect(
    state => ({
        current: state.user.role.current,
        fetching: state.user.role.fetching,
        resources: state.user.role.resources
    }),({fetchItemByIdAndSetCurrent, clearCurrentItem, updateItemAndSetCurrent, fetchResources})
)(Edit);

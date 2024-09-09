import React, {useEffect} from "react";
import {connect} from "react-redux";
import {useParams} from 'react-router-dom';
import {
    fetchItemByIdAndSetCurrent,
    updateItemAndSetCurrent,
    clearCurrentItem
} from "./redux/actions";
import routes from '../routes';
import Loading from "./components/Loading";
import FormTitle from "../generic/FormTitle";
import Form from "./components/Form";

const Edit = ({current, fetching, fetchItemByIdAndSetCurrent, updateItemAndSetCurrent, clearCurrentItem}) => {

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
        return () => {
            clearCurrentItem();
        };
    }, []);

    return (
        <div className="edit-page cases">
            <Loading />
            <FormTitle title={"Редактировать кейс"} backLinkPath={routes.cases.absolute} />
            <Form current={current} actionOnSubmit={updateItemAndSetCurrent} />
        </div>
    );
};

export default connect(
    state => ({
        current: state.case.current,
        fetching: state.case.fetching
    }),({fetchItemByIdAndSetCurrent, updateItemAndSetCurrent, clearCurrentItem})
)(Edit);

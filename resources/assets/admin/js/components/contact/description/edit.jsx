import React, {useEffect} from "react";
import {connect} from "react-redux";
import * as Yup from 'yup';
import {
    fetchItemAndSetCurrent,
    updateItemAndSetCurrent,
    clearCurrentItem
} from "./redux/actions";
import LoadingGeneric from "../../generic/Loading";
import GenericForm from "../../generic/form/Form";
import Editor from "../../generic/form/Editor";

const Edit = ({current, fetching, fetchItemAndSetCurrent, updateItemAndSetCurrent, clearCurrentItem}) => {

    useEffect(() => {
        if(!current && !fetching){
            fetchItemAndSetCurrent();
        }
    }, []);

    useEffect(() => {
        return () => {
            clearCurrentItem();
        };
    }, []);


    return (
        <div className="edit-page contact-description">
            {fetching && <LoadingGeneric />}
            <div className="row mb-3">
                <div className="col">
                    <div className="h3 title">
                        Редактировать описание попап contact
                    </div>
                </div>
            </div>
            <GenericForm
                current={current}
                defaultCurrent={{
                    description: '',
                }}
                onSubmit={updateItemAndSetCurrent}
                validation={Yup.object({
                    description: Yup.string().nullable(),
                })}
            >

                <Editor
                    name={"description"}
                    title={"Описание"}
                    height={"500"}
                />

            </GenericForm>
        </div>
    );

};

export default connect(
    state => ({
        current: state.contact.description.current,
        fetching: state.contact.description.fetching
    }), ({fetchItemAndSetCurrent, updateItemAndSetCurrent, clearCurrentItem})
)(Edit)

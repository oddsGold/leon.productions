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
import Text from "../../generic/form/Text";

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
        <div className="edit-page about-contacts">
            {fetching && <LoadingGeneric />}
            <div className="row mb-3">
                <div className="col">
                    <div className="h3 title">
                        Редактировать контакты попап about
                    </div>
                </div>
            </div>
            <GenericForm
                current={current}
                defaultCurrent={{
                    email: '',
                    whatsapp: '',
                    telegram: '',
                    phone: ''
                }}
                onSubmit={updateItemAndSetCurrent}
                validation={Yup.object({
                    email: Yup.string()
                        .max(150, 'Максимально допустиммо 150 символов')
                        .nullable(),
                    whatsapp: Yup.string()
                        .max(255, 'Максимально допустиммо 255 символов')
                        .nullable(),
                    telegram: Yup.string()
                        .max(255, 'Максимально допустиммо 255 символов')
                        .nullable(),
                    phone: Yup.string()
                        .max(255, 'Максимально допустиммо 255 символов')
                        .nullable(),
                })}
            >
                <Text
                    name={"phone"}
                    title={"Телефон"}
                    helper={"Введите номер телефона"}
                />

                <Text
                    name={"email"}
                    title={"Email"}
                    helper={"Введите email"}
                />

                <Text
                    name={"whatsapp"}
                    title={"Whatsapp"}
                    helper={"Введите ссылку на whatsapp"}
                />

                <Text
                    name={"telegram"}
                    title={"Telegram"}
                    helper={"Введите ссылку на telegram"}
                />
            </GenericForm>
        </div>
    );

};

export default connect(
    state => ({
        current: state.about.contact.current,
        fetching: state.about.contact.fetching
    }), ({fetchItemAndSetCurrent, updateItemAndSetCurrent, clearCurrentItem})
)(Edit)

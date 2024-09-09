import React from "react";
import * as Yup from 'yup';
import Text from "../../../generic/form/Text";
import GenericForm from "../../../generic/form/Form";

export default function Form ({current = null, actionOnSubmit}){

    return (
        <GenericForm
            current={current}
            defaultCurrent={{
                name: '',
            }}
            onSubmit={actionOnSubmit}
            validation={Yup.object({
                name: Yup.string()
                    .max(255, 'Максимально допустиммо 255 символов')
                    .min(3, 'Минимально 3 символа')
                    .required('Поле обезательное к заполнение'),
            })}
        >
            <Text
                name={"name"}
                title={"Наименование"}
                helper={"Введите наименование"}
                required={true}
            />

        </GenericForm>
    );
}

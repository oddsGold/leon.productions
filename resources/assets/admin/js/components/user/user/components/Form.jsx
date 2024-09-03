import React from "react";
import * as Yup from 'yup';
import GenericForm from "../../../generic/form/Form";
import Text from "../../../generic/form/Text";
import Select from "../../../generic/form/Select";
import Check from "../../../generic/form/Check";

export default function Form ({current = null, actionOnSubmit, roles = []}){

    return (
        <GenericForm
            current={current}
            defaultCurrent={{
                login: '',
                email: '',
                role: null,
                password: '',
                password_confirmation: '',
                tfa: true,
            }}
            onSubmit={actionOnSubmit}
            validation={Yup.object({
                login: Yup.string()
                    .max(255, 'Максимально допустиммо 180 символов')
                    .min(4, 'Минимально 4 символа')
                    .required('Поле обезательное к заполнение'),
                email: Yup.string().min(6, 'Емейл не може бути менше 6 символів')
                    .max(150, 'Емейл не може бути більше 150 символів')
                    .email('Недійсна електронна адреса')
                    .required('Поле обезательное к заполнение'),
                role: Yup.mixed().required('Поле обезательное к заполнение'),
                password: Yup.string()
                    .max(255, 'Максимально допустиммо 180 символов')
                    .min(8, 'Минимально 8 символа')
                    .nullable('Поле обезательное к заполнение'),
                password_confirmation: Yup.string()
                    .oneOf([Yup.ref('password')], 'Пароли не совпадают')
                    .nullable('Поле обезательное к заполнение')
            })}
        >

            <Text
                name={"login"}
                title={"Логин"}
                required={true}
            />

            <Text
                name={"email"}
                title={"Емейл"}
                required={true}
            />

            <Select
                name={"role"}
                title={"Роль"}
                options={roles ? roles.map(r => ({value: r.id, label: r.name})) : []}
                required={true}
            />

            <Text
                name={"password"}
                title={"Пароль"}
            />

            <Text
                name={"password_confirmation"}
                title={"Подтверждения пароля"}
            />

            <Check
                name={"tfa"}
                title={"Включить двухфакторную аутентификацию"}
            />

        </GenericForm>
    );


}

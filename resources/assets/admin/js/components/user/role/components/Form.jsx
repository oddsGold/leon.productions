import React from "react";
import * as Yup from 'yup';
import GenericForm from "../../../generic/form/Form";
import Text from "../../../generic/form/Text";
import MultiSelect from "../../../generic/form/MultiSelect";

export default function Form ({current = null, actionOnSubmit, resources = []}){

    return (
        <GenericForm
            current={current}
            defaultCurrent={{
                label: '',
                resources: [],
            }}
            onSubmit={actionOnSubmit}
            validation={Yup.object({
                label: Yup.string()
                    .max(255, 'Максимально допустиммо 180 символов')
                    .min(3, 'Минимально 3 символа')
                    .required('Поле обезательное к заполнение'),
                resources: Yup.array().of(Yup.mixed()).min(1, 'Выберите ресурс').required('Поле обезательное к заполнение')
            })}
        >

            <Text
                name={"label"}
                title={"Наименование"}
                required={true}
            />

            <MultiSelect
                name={"resources"}
                title={"Категории"}
                options={resources ? resources.map(r => ({value: r.id, label: r.label})) : []}
                required={true}
            />


        </GenericForm>
    );


}

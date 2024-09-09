import React from "react";
import * as Yup from 'yup';
import Text from "../../generic/form/Text";
import GenericForm from "../../generic/form/Form";
import TextArea from "../../generic/form/TextArea";
import Image from "../../generic/form/Image";
import CheckDateFromTo from "../../generic/form/CheckDateFromTo";

export default function Form ({current = null, actionOnSubmit}){


    return (
        <GenericForm
            current={current}
            defaultCurrent={{
                description: '',
                preview_url: '',
                main_url: '',
                image: null,
                published: false,
                published_at: '',
                published_to: ''
            }}
            onSubmit={actionOnSubmit}
            validation={Yup.object({
                description: Yup.string()
                    .max(255, 'Максимально допустиммо 255 символов')
                    .min(3, 'Минимально 3 символа')
                    .required('Поле обезательное к заполнение'),
                preview_url: Yup.string().nullable(),
                main_url: Yup.string()
                    .max(150, 'Максимально допустиммо 150 символов')
                    .required('Поле обезательное к заполнение'),
                image: Yup.mixed().nullable(),
            })}
        >

            <TextArea
                name={"description"}
                title={"Описание"}
                helper={"Введите описание"}
                required={true}
            />

            <Text
                name={"preview_url"}
                title={"Preview url vimeo"}
                helper={"Ссылка на превью видео на сервисе вимео"}
            />

            <Text
                name={"main_url"}
                title={"Main url vimeo"}
                helper={"Ссылка на основное видео на сервисе вимео"}
                required={true}
            />


            <Image
                name={"image"}
                title={"Превью картинка"}
            />

            <CheckDateFromTo
                title={"Опубликовать"}
                nameCheck={"published"}
                nameDateFrom={"published_at"}
                nameDateTo={"published_to"}
            />

        </GenericForm>
    );


}

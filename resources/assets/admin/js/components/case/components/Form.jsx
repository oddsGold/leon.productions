import React from "react";
import * as Yup from 'yup';
import {Form as FormikForm} from "formik";
import Text from "../../generic/form/Text";
import GenericForm from "../../generic/form/Form";
import TextArea from "../../generic/form/TextArea";
import Image from "../../generic/form/Image";
import CheckDateFromTo from "../../generic/form/CheckDateFromTo";
import VideoPlayerPreview from "./VideoPlayerPreview";

export default function Form ({current = null, actionOnSubmit}){


    return (
        <GenericForm
            current={current}
            defaultCurrent={{
                slug: '',
                description: '',
                preview_url: '',
                main_url: '',
                image: null,
                published: false,
                published_at: '',
                published_to: ''
            }}
            onSubmit={actionOnSubmit}
            withoutForm={true}
            validation={Yup.object({
                slug: Yup.string()
                    .max(255, 'Максимально допустиммо 255 символов')
                    .min(3, 'Минимально 3 символа')
                    .required('Поле обезательное к заполнение'),
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

            {({ isSubmitting, values}) => (
                <FormikForm>

                    <Text
                        name={"slug"}
                        title={"ЧПУ"}
                        helper={"Ссылка на этот кейс в урле"}
                        required={true}
                    />

                    <TextArea
                        name={"description"}
                        title={"Описание"}
                        helper={"Введите описание"}
                        required={true}
                    />

                    <div className="case-video-element">
                        <Text
                            name={"preview_url"}
                            title={"Preview url vimeo"}
                            helper={"Ссылка на превью видео на сервисе вимео (slug)"}
                        />
                        <div className="case-video-preview-wrapper">
                            <VideoPlayerPreview
                                link={values.preview_url}
                            />
                        </div>
                    </div>

                    <div className="case-video-element">
                        <Text
                            name={"main_url"}
                            title={"Main url vimeo"}
                            helper={"Ссылка на основное видео на сервисе вимео"}
                            required={true}
                        />
                        <div className="case-video-preview-wrapper">
                            <VideoPlayerPreview
                                link={values.main_url}
                            />
                        </div>
                    </div>

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

                    <div>
                        <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                            Сохранить
                        </button>
                    </div>
                </FormikForm>
            )}

        </GenericForm>
    );

}

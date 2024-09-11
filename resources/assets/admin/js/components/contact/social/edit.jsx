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
import Check from "../../generic/form/Check";
import Text from "../../generic/form/Text";
import {Form} from "formik";

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
        <div className="edit-page contact-socials">
            {fetching && <LoadingGeneric />}
            <div className="row mb-3">
                <div className="col">
                    <div className="h3 title">
                        Редактировать иконки социальных сетей попап contact
                    </div>
                </div>
            </div>
            <GenericForm
                current={current}
                defaultCurrent={{
                    instagram_link: '',
                    instagram_published: true,
                    facebook_link: '',
                    facebook_published: true,
                    youtube_link: '',
                    youtube_published: true,
                    linkedin_link: '',
                    linkedin_published: true,
                    vimeo_link: '',
                    vimeo_published: true,
                }}
                onSubmit={updateItemAndSetCurrent}
                withoutForm={true}
                validation={Yup.object({
                    instagram_link: Yup.string().max(400, 'Максимально допустиммо 400 символов').nullable(),
                    facebook_link: Yup.string().max(400, 'Максимально допустиммо 400 символов').nullable(),
                    youtube_link: Yup.string().max(400, 'Максимально допустиммо 400 символов').nullable(),
                    linkedin_link: Yup.string().max(400, 'Максимально допустиммо 400 символов').nullable(),
                    vimeo_link: Yup.string().max(400, 'Максимально допустиммо 400 символов').nullable(),
                })}
            >

                {({ isSubmitting, values}) => (
                    <Form>

                        <div className="row mb-3">
                            <div className="col">
                                <div className="social-element">
                                    <div className="check-wrapper">
                                        <Check
                                            name={"instagram_published"}
                                            title={"Показывать на сайте"}
                                        />
                                    </div>
                                    <Text
                                        name={"instagram_link"}
                                        title={"Ссылка на instagram"}
                                        disabled={!values.instagram_published}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col">
                                <div className="social-element">
                                    <div className="check-wrapper">
                                        <Check
                                            name={"facebook_published"}
                                            title={"Показывать на сайте"}
                                        />
                                    </div>
                                    <Text
                                        name={"facebook_link"}
                                        title={"Ссылка на facebook"}
                                        disabled={!values.facebook_published}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col">
                                <div className="social-element">
                                    <div className="check-wrapper">
                                        <Check
                                            name={"youtube_published"}
                                            title={"Показывать на сайте"}
                                        />
                                    </div>
                                    <Text
                                        name={"youtube_link"}
                                        title={"Ссылка на youtube"}
                                        disabled={!values.youtube_published}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col">
                                <div className="social-element">
                                    <div className="check-wrapper">
                                        <Check
                                            name={"linkedin_published"}
                                            title={"Показывать на сайте"}
                                        />
                                    </div>
                                    <Text
                                        name={"linkedin_link"}
                                        title={"Ссылка на linkedin"}
                                        disabled={!values.linkedin_published}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col">
                                <div className="social-element">
                                    <div className="check-wrapper">
                                        <Check
                                            name={"vimeo_published"}
                                            title={"Показывать на сайте"}
                                        />
                                    </div>
                                    <Text
                                        name={"vimeo_link"}
                                        title={"Ссылка на vimeo"}
                                        disabled={!values.vimeo_published}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                                Сохранить
                            </button>
                        </div>
                    </Form>
                )}

            </GenericForm>
        </div>
    );

};

export default connect(
    state => ({
        current: state.contact.social.current,
        fetching: state.contact.social.fetching
    }), ({fetchItemAndSetCurrent, updateItemAndSetCurrent, clearCurrentItem})
)(Edit)

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
                validation={Yup.object({
                    instagram_link: Yup.string().max(400, 'Максимально допустиммо 400 символов').nullable(),
                    facebook_link: Yup.string().max(400, 'Максимально допустиммо 400 символов').nullable(),
                    youtube_link: Yup.string().max(400, 'Максимально допустиммо 400 символов').nullable(),
                    linkedin_link: Yup.string().max(400, 'Максимально допустиммо 400 символов').nullable(),
                    vimeo_link: Yup.string().max(400, 'Максимально допустиммо 400 символов').nullable(),
                })}
            >

                <div className="row mb-3">
                    <div className="col-md-4">
                        <Check
                            name={"instagram_published"}
                            title={"Опубликовать"}
                        />
                    </div>
                    <div className="col-md-8">
                        <Text
                            name={"instagram_link"}
                            title={"Ссылка на instagram"}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-4">
                        <Check
                            name={"facebook_published"}
                            title={"Опубликовать"}
                        />
                    </div>
                    <div className="col-md-8">
                        <Text
                            name={"facebook_link"}
                            title={"Ссылка на facebook"}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-4">
                        <Check
                            name={"youtube_published"}
                            title={"Опубликовать"}
                        />
                    </div>
                    <div className="col-md-8">
                        <Text
                            name={"youtube_link"}
                            title={"Ссылка на youtube"}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-4">
                        <Check
                            name={"linkedin_published"}
                            title={"Опубликовать"}
                        />
                    </div>
                    <div className="col-md-8">
                        <Text
                            name={"linkedin_link"}
                            title={"Ссылка на linkedin"}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-4">
                        <Check
                            name={"vimeo_published"}
                            title={"Опубликовать"}
                        />
                    </div>
                    <div className="col-md-8">
                        <Text
                            name={"vimeo_link"}
                            title={"Ссылка на vimeo"}
                        />
                    </div>
                </div>

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

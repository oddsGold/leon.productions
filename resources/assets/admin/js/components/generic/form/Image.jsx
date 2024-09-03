import React, {useEffect, useRef, useState} from "react";
import {ErrorMessage, useField, useFormikContext} from "formik";
import {connect} from "react-redux";
import {createItemAndSetCurrent, clearCurrentItem, fetchItemsByCurrentPagination, setCurrentItem} from "../../image/redux/actions";
import Loading from "../Loading";
import MoreImagesModal from "../MoreImagesModal";

const Image = ({
   name, title, helper, current, fetching, images, createItemAndSetCurrent, clearCurrentItem, fetchItemsByCurrentPagination,
   setCurrentItem, required = false
}) => {

    const [field, meta, helpers] = useField(name);
    const {setFieldValue, validateField} = useFormikContext();
    const dropAreaRef = useRef(null);
    const [showMoreImagesModal, setShowMoreImagesModal] = useState(false);


    const handleFileUpload = (e) => {
        if(e.currentTarget.files.length > 0){
            createItemAndSetCurrent(e.currentTarget.files[0], false);
        }
        e.currentTarget.value = '';
        e.currentTarget.blur();
    };

    const handleClose = (e) => {
        setFieldValue(name, null);
    };

    const preventDefaults = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleHoverDragArea = (e) => {
        dropAreaRef.current.classList.add('active')
    }

    const handleUnHoverDragArea = (e) => {
        dropAreaRef.current.classList.remove('active')
    }

    const handleDrop = (e) => {
        if(e.dataTransfer.files.length > 0){
            createItemAndSetCurrent(e.dataTransfer.files[0], false);
        }
    };

    useEffect(() => {
        if(images.length === 0){
            fetchItemsByCurrentPagination();
        }

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropAreaRef.current.addEventListener(eventName, preventDefaults, false);
            document.body.addEventListener(eventName, preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropAreaRef.current.addEventListener(eventName, handleHoverDragArea, false)
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropAreaRef.current.addEventListener(eventName, handleUnHoverDragArea, false)
        })

        dropAreaRef.current.addEventListener('drop', handleDrop, false);
    }, []);

    useEffect(() => {
        if(current){
            setFieldValue(name,current);
            validateField(name);
        }
    }, [current]);

    useEffect(() => {
        return () => {
            clearCurrentItem();
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                dropAreaRef.current && dropAreaRef.current.removeEventListener(eventName);
                document.body.removeEventListener(eventName, preventDefaults);
            });

        };
    }, []);


    return (
        <div className="mb-3 custom-input-group">
            {fetching && !showMoreImagesModal && <Loading />}
            {showMoreImagesModal &&  <MoreImagesModal handleClose={() => {setShowMoreImagesModal(false)}} />}

            <label htmlFor={name} className="form-label">
                {title}
                {required && <span className="required">*</span>}
            </label>
            <div className={'custom-image-input ' + (meta.error && meta.touched ? 'error' : '')}>
                <div className="row flex-nowrap">
                    <div className="col-3">
                        <div
                            ref={dropAreaRef}
                            className={`upload-preview-image ${field.value ? 'current' : ''}`}
                        >
                            {!field.value &&  <div className="block-button">
                                <i className="fas fa-upload"/>
                                загрузить
                            </div>}
                            {!field.value && <label className="cover" htmlFor={name} />}
                            <input
                                id={name}
                                type="file"
                                onChange={handleFileUpload}
                            />

                            {field.value && <div className="preview-block">
                                <a target="_blank" href={field.value.url}>
                                    <img src={field.value.url} alt="upload-image" />
                                </a>
                                <div className="close" onClick={handleClose} title="Удалить">
                                    <i className="fas fa-times"/>
                                </div>
                                <label htmlFor={name} className="re-upload" title="Загрузить другое изображение" >
                                    <i className="fas fa-cloud-arrow-up"></i>
                                </label>
                            </div>}
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="choice-preview">
                            <div className="title">
                                Выбрать среди загруженных ранее:
                            </div>
                            <div className="images">
                                {images && images.length > 0 && images.map((img, inx) => {
                                    return <img
                                        onClick={() => {setCurrentItem(img)}}
                                        src={img.url}
                                        key={inx}
                                        alt=""
                                    />
                                })}
                                {((images && images.length === 0) || !images) && <div className="not-found">
                                    <i className="fas fa-xmark"/>
                                    изображений не найденно
                                </div>}
                            </div>
                            {images && images.length > 0 && <div onClick={() => {setShowMoreImagesModal(true)}} className="more">
                                еще
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
            <ErrorMessage component="div" className="error form-text" name={name} />
            {helper && <div id={name + '-help'} className="form-text">{helper}</div>}
        </div>
    );
}

export default connect(
    state => ({
        current: state.image.current,
        fetching: state.image.fetching,
        images: state.image.data
    }), ({createItemAndSetCurrent, clearCurrentItem, fetchItemsByCurrentPagination, setCurrentItem})
)(Image)

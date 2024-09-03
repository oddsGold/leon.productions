import React, {useEffect, useRef, useState} from "react";
import {ErrorMessage, useField, useFormikContext} from "formik";
import {connect} from "react-redux";
import {createItemAndSetCurrent, clearCurrentItem, fetchItemsByCurrentPagination} from "../../file/redux/actions";
import Loading from "../Loading";

const File = ({
    name, title, files, helper, current, createItemAndSetCurrent, fetching, clearCurrentItem, required = false,
    fetchItemsByCurrentPagination
}) => {

    const [field, meta, helpers] = useField(name);
    const {setFieldValue, validateField} = useFormikContext();
    const dropAreaRef = useRef(null);


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

    const handleFileName = (name) => {
        if(name.length > 44){
            name = name.substr(0,22) + ' ... ' + name.substr(-21);
        }
        return name;
    };

    useEffect(() => {
        if(files.length === 0){
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
    },[]);


    return (
        <div className="mb-3 custom-input-group">
            {fetching && <Loading />}
            <label htmlFor={name} className="form-label">
                {title}
                {required && <span className="required">*</span>}
            </label>

            <div className={"custom-file-input " + (meta.error && meta.touched ? 'error' : '')}>
                <div className="row flex-nowrap">
                    <div className="col-6">
                        <div
                            ref={dropAreaRef}
                            className={`upload-preview-file ${field.value ? 'current' : ''}`}
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
                                <div className="file">
                                    {(() => {
                                        switch (field.value.type) {
                                            case 'application/pdf':
                                                return <i className="far fa-file-pdf" />
                                            case 'application/msword':
                                            case 'application/rtf':
                                            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                                                return <i className="far fa-file-word" />
                                            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                                            case 'application/vnd.ms-excel.sheet.binary.macroEnabled.12':
                                            case 'application/vnd.ms-excel':
                                                return <i className="far fa-file-excel" />
                                            case 'application/java-archive':
                                            case 'application/vnd.rar':
                                            case 'application/x-tar':
                                            case 'application/zip':
                                            case 'application/x-7z-compressed':
                                                return <i className="far fa-file-zipper" />
                                            default:
                                                return <i className="far fa-file-lines" />
                                        }
                                    })()}
                                    <div className="name-original">
                                        original: {handleFileName(field.value.origin)}
                                    </div>
                                    <div className="name-current">
                                        current: {field.value.name}
                                    </div>
                                    <div className="time">
                                        {field.value.created_at}
                                    </div>
                                </div>
                                <div className="close" onClick={handleClose} title="Удалить">
                                    <i className="fas fa-times"/>
                                </div>
                                <label htmlFor={name} className="re-upload" title="Загрузить другой файл" >
                                    <i className="fas fa-cloud-arrow-up"></i>
                                </label>
                                <a href={field.value.url} target="_blank" title="Открыть в новом окне" className="link">
                                    <i className="fas fa-arrow-up-right-from-square"/>
                                </a>
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
        current: state.file.current,
        files: state.file.data,
        fetching: state.file.fetching
    }), ({createItemAndSetCurrent, clearCurrentItem, fetchItemsByCurrentPagination})
)(File);

import React, {useEffect, useRef} from 'react';
import {createItemAndAddToItems, changeLimitAndFetchItems, incrementPageAndFetchItems, deleteItem, clearItems} from "./redux/actions";
import {connect} from "react-redux";
import Loading from "../generic/Loading";

const File = ({
   current, fetching, files, createItemAndAddToItems, changeLimitAndFetchItems, incrementPageAndFetchItems, deleteItem, clearItems
}) => {

    const dropAreaRef = useRef(null);
    const imagesPerPage = 30;


    const handleScroll = (e) => {
        if (
            ((e.currentTarget.scrollTop + document.documentElement.scrollHeight)
                >= e.currentTarget.scrollHeight - 50)
        ){
            incrementPageAndFetchItems();
        }
    };

    const handleFileUpload = (e) => {
        if(e.currentTarget.files.length > 0){
            createItemAndAddToItems(e.currentTarget.files[0], false);
        }
        e.currentTarget.value = '';
        e.currentTarget.blur();
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
            createItemAndAddToItems(e.dataTransfer.files[0], false);
        }
    };

    const handleFileName = (name) => {
        if(name.length > 44){
            name = name.substr(0,22) + ' ... ' + name.substr(-21);
        }
        return name;
    };

    useEffect(() => {
        //clearItems();
        if(files.length === 0){
            changeLimitAndFetchItems(imagesPerPage);
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
        });

        dropAreaRef.current.addEventListener('drop', handleDrop, false);
        document.getElementById('root').addEventListener("scroll", handleScroll, false);
    }, []);

    useEffect(() => {
        return () => {
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                dropAreaRef.current && dropAreaRef.current.removeEventListener(eventName);
                document.body.removeEventListener(eventName, preventDefaults);
            });
            document.getElementById('root').removeEventListener("scroll", handleScroll, false);
        };
    }, []);


    return (
        <div className="files-page">
            {fetching && <Loading />}
            <div className="row mb-3 mt-4">
                <div className="col">
                    <div className="h3 title">
                        Загрузка файлов
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div ref={dropAreaRef} className="upload-area">
                        <div className="block-button">
                            <i className="fas fa-upload"/>
                            загрузить
                        </div>
                        <label className="cover" htmlFor="upload-file" />
                        <input
                            id="upload-file"
                            type="file"
                            onChange={handleFileUpload}
                        />
                    </div>
                </div>
            </div>
            <div className="rol scroll-wrapper">
                <div className="col">
                    {files.map((file, index) => {
                        return <div
                            key={index}
                            className="file-row"
                        >
                            <div className="row">
                                <div className="col-2 text-center">
                                    <a target="_blank" href={file.url} className="preview-link">
                                        {(() => {
                                            switch (file.type) {
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
                                    </a>
                                </div>
                                <div className="col-10">
                                    <div className="name-original">
                                        <b>Оригинальное имя:</b> {handleFileName(file.origin)}
                                    </div>
                                    <div className="name-current">
                                        <b>URL адрес:</b> {file.url}
                                    </div>
                                    <div className="time">
                                        <b>Дата загрузки:</b> {file.created_at}
                                    </div>
                                </div>
                            </div>

                            <div className="delete" onClick={() => {deleteItem(file)}} title="Удалить">
                                <i className="far fa-trash-alt"/>
                            </div>
                            <a href={file.url} target="_blank" title="Открыть в новом окне" className="link">
                                <i className="fas fa-arrow-up-right-from-square"/>
                            </a>

                        </div>
                    })}
                </div>
            </div>
        </div>
    );

};

export default connect(
    state => ({
        current: state.file.current,
        fetching: state.file.fetching,
        files: state.file.data
    }),
    ({createItemAndAddToItems, changeLimitAndFetchItems, incrementPageAndFetchItems, deleteItem, clearItems})
)(File);

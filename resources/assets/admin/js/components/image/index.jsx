import React, {useEffect, useRef} from 'react';
import {
    createItemAndAddToItems,
    changeLimitAndFetchItems,
    incrementPageAndFetchItems,
    deleteItem,
    clearItems
} from "./redux/actions";
import {connect} from "react-redux";
import Loading from "../generic/Loading";

const Image = ({
   current, fetching, images, createItemAndAddToItems, changeLimitAndFetchItems, incrementPageAndFetchItems, deleteItem, clearItems
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
        if(images.length === 0){
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
        <div className="images-page">
            {fetching && <Loading />}
            <div className="row mb-3 mt-4">
                <div className="col">
                    <div className="h3 title">
                        Загрузка изображений
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
                    {images.map((image, index) => {
                        return <div
                            key={index}
                            className="image-row"
                        >
                            <div className="row">
                                <div className="col-3 text-center">
                                    <a target="_blank" href={image.url} className="preview-link">
                                        <img src={image.url} className="preview"  alt=""/>
                                    </a>
                                </div>
                                <div className="col-9">
                                    <div className="name-original">
                                        <b>Оригинальное имя:</b> {handleFileName(image.origin)}
                                    </div>
                                    <div className="name-current">
                                        <b>Текущее имя:</b> {image.name}
                                    </div>
                                    <div className="time">
                                        <b>Дата загрузки:</b> {image.created_at}
                                    </div>
                                </div>
                            </div>
                            <div className="delete" onClick={() => {deleteItem(image)}} title="Удалить">
                                <i className="far fa-trash-alt"/>
                            </div>
                            <a href={image.url} target="_blank" title="Открыть в новом окне" className="link">
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
        current: state.image.current,
        fetching: state.image.fetching,
        images: state.image.data
    }),
    ({createItemAndAddToItems, changeLimitAndFetchItems, incrementPageAndFetchItems, deleteItem, clearItems})
)(Image);

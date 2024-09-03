import React, {useEffect, useRef, useState} from "react";
import {ErrorMessage, useField, useFormikContext} from "formik";
import {connect} from "react-redux";
import {changeLimitAndFetchItems, setCurrentItem, clearItems, incrementPageAndFetchItems} from "../image/redux/actions";
import Loading from "./Loading";

const MoreImagesModal = ({
    current, fetching, images, changeLimitAndFetchItems, clearItems, setCurrentItem, handleClose, incrementPageAndFetchItems
}) => {

    const wrapperRef = useRef(null);
    const imagesPerPage = 30;
    const imagesColumns = useRef([[], [], [], []]);

    const handleScroll = (e) => {
        if (
            ((wrapperRef.current.scrollTop + document.documentElement.scrollHeight)
            >= wrapperRef.current.scrollHeight - 10)
        ){
            incrementPageAndFetchItems();
        }
    };

    useEffect(() => {
        //clearItems();
        if(images.length === 0){
            changeLimitAndFetchItems(imagesPerPage);
        }
        wrapperRef.current.addEventListener("scroll", handleScroll, false);
    }, []);

    useEffect(() => {
        return () => {
            wrapperRef.current && wrapperRef.current.removeEventListener("scroll", handleScroll, false);
        };
    }, []);

    // useEffect(() => {
    //     imagesColumns.current = [[], [], [], []];
    //     for(let i = 0, c = 0; i < images.length; i++){
    //         if(c === 4)c = 0;
    //         imagesColumns.current[c].push(images[i]);
    //         c++;
    //     }
    // }, [images]);
    imagesColumns.current = [[], [], [], []];
    for(let i = 0, c = 0; i < images.length; i++){
        if(c === 4)c = 0;
        imagesColumns.current[c].push(images[i]);
        c++;
    }


    return (<div className="more-image-modal" onClick={() => {handleClose()}}>
        <div className="cover" />
        <div className="close">
            <i className="fas fa-times"/>
        </div>
        {fetching && <Loading />}
        <div ref={wrapperRef} className="scroll-wrapper">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-2">
                        <div className="images">
                            {imagesColumns.current[0].map((image, index) => {
                                return <div
                                    key={index}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentItem(image);
                                        handleClose();
                                    }}
                                    className="image-frame"
                                >
                                    <img src={image.url} alt=""/>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="images">
                            {imagesColumns.current[1].map((image, index) => {
                                return <div
                                    key={index}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentItem(image);
                                        handleClose();
                                    }}
                                    className="image-frame"
                                >
                                    <img src={image.url} alt=""/>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="images">
                            {imagesColumns.current[2].map((image, index) => {
                                return <div
                                    key={index}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentItem(image);
                                        handleClose();
                                    }}
                                    className="image-frame"
                                >
                                    <img src={image.url} alt=""/>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="images">
                            {imagesColumns.current[3].map((image, index) => {
                                return <div
                                    key={index}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentItem(image);
                                        handleClose();
                                    }}
                                    className="image-frame"
                                >
                                    <img src={image.url} alt=""/>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>);
}

export default connect(
    state => ({
        current: state.image.current,
        fetching: state.image.fetching,
        images: state.image.data
    }), ({changeLimitAndFetchItems, setCurrentItem, clearItems, incrementPageAndFetchItems})
)(MoreImagesModal)

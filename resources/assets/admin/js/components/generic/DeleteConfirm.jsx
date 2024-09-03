import React, {useEffect, useRef} from 'react';

export default function DeleteConfirm({id, applyHandler, rejectHandler}){

    const modalReference = useRef(null);

    const blurHandler = (e) => {
        if(!e.currentTarget.contains(e.relatedTarget)){
            rejectHandler();
        }
    };

    useEffect(() => {
        modalReference.current.focus();
    }, []);

    return <div className="delete-confirm">
        <div className="translucent-bg"></div>
        <div
            className="confirm-modal"
            tabIndex="0"
            onBlur={blurHandler}
            ref={modalReference}
        >
            <div className="title">
                Удалить запись #{id}?
            </div>
            <div className="buttons">
                <div className="row">
                    <div className="col">
                        <button className="btn reject" onClick={() => {rejectHandler()}}>
                            <i className="fas fa-xmark"></i>
                            Нет
                        </button>
                    </div>
                    <div className="col">
                        <button className="btn apply" onClick={() => {applyHandler()}}>
                            <i className="fas fa-check"></i>
                            Да
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

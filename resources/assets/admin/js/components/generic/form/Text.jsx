import React, {useEffect} from "react";
import {ErrorMessage, Field, useField} from "formik";
import {Notification} from "../../../utils/Notification";

export default function Text({name, title, helper, disabled = false, required = false}){


    const [field, meta, helpers] = useField(name);

    // useEffect(() => {
    //     if(meta.error && meta.touched){
    //         Notification.error('Ошибка валидации', meta.error);
    //     }
    // });

    return (
        <div className={'mb-3 ' + (disabled ? 'disabled' : '')}>
            <label htmlFor={name} className="form-label">
                {title}
                {required && <span className="required">*</span>}
            </label>
            <Field
                name={name}
                className={'form-control ' + (meta.error && meta.touched ? 'error' : '')}
                type="text"
                id={name}
                aria-describedby={name + '-help'}
                disabled={disabled}
            />
            <ErrorMessage component="div" className="error form-text" name={name} />
            {helper && <div id={name + '-help'} className="form-text">{helper}</div>}
        </div>
    );
}

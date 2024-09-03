import React from "react";
import {ErrorMessage, Field, useField} from "formik";

export default function TextArea({name, title, helper, disabled = false, required = false}){

    const [field, meta, helpers] = useField(name);

    return (
        <div className={'mb-3 ' + (disabled ? 'disabled' : '')}>
            <label htmlFor={name} className="form-label">
                {title}
                {required && <span className="required">*</span>}
            </label>
            <Field
                as="textarea"
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

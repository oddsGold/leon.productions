import React from "react";
import {ErrorMessage, Field, useField, useFormikContext} from "formik";

export default function Check({name, title, helper, disabled = false}){

    const [field, meta, helpers] = useField(name);
    const {setFieldValue, validateField} = useFormikContext();

    const handleCheckBox = (e) => {
        setFieldValue(name, e.currentTarget.checked ? 1 : 0);
    };

    return (
        <div className={'mb-3 form-check ' + (disabled ? 'disabled' : '')}>
            <input
                checked={Boolean(field.value)}
                name={name}
                className="form-check-input"
                type="checkbox"
                id={name}
                aria-describedby={name + '-help'}
                onChange={handleCheckBox}
                disabled={disabled}
            />
            <label className="form-check-label" htmlFor={name}>{title}</label>
            <ErrorMessage component="div" className="error form-text" name={name} />
            {helper && <div id={name + '-help'} className="form-text">{helper}</div>}
        </div>
    );
}

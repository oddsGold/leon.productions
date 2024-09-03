import React, {useEffect} from "react";
import {ErrorMessage, Field, useField, useFormikContext} from "formik";

export default function SelectCustom({name, title, options, helper, disabled = false, required = false}){

    const [field, meta, helpers] = useField(name);
    const {setFieldValue, validateField} = useFormikContext();

    const handleSelected = (e) => {
        setFieldValue(name, e.currentTarget.value ? e.currentTarget.value : null);
        validateField(name);
    };

    return (
        <div className={'mb-3 ' + (disabled ? 'disabled' : '')}>
            <label htmlFor={name} className="form-label">
                {title}
                {required && <span className="required">*</span>}
            </label>
            <select
                value={field.value ? field.value : ''}
                name={name}
                className={'form-select ' + (meta.error && meta.touched ? 'error' : '')}
                id={name}
                aria-describedby={name + '-help'}
                onChange={handleSelected}
                disabled={disabled}
            >
                <option value="">Выберете значение</option>
                {options && options.map((option, index) => {
                    return <option value={option.value} key={index}>{option.label}</option>;
                })}
            </select>
            <ErrorMessage component="div" className="error form-text" name={name} />
            {helper && <div id={name + '-help'} className="form-text">{helper}</div>}
        </div>
    );
}

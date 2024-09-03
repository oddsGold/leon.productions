import React, {useEffect} from "react";
import {ErrorMessage, Field, useField, useFormikContext} from "formik";
import Select from "react-select";

export default function SelectWithSearch({name, title, options, helper, placeholder, required = false}){

    const [field, meta, helpers] = useField(name);
    const {setFieldValue, validateField} = useFormikContext();

    const handleSelected = (option) => {
        setFieldValue(name, option ? option.value : null);
        validateField(name);
    };

    const customStyles = {
        control: (base, state) => ({
            ...base,
            '&:hover': { borderColor: (meta.error && meta.touched) ? '#dc3545' : '#b8babd' },
            border: (meta.error && meta.touched) ? '1px solid #dc3545' : '1px solid #ced4da',
        }),
    }

    return (
        <div className=" mb-3">
            <label htmlFor={name} className="form-label">
                {title}
                {required && <span className="required">*</span>}
            </label>
            <Select
                styles={customStyles}
                className="custom-multi-select"
                name={name}
                value={options.filter(option => option.value === field.value)}
                onChange={handleSelected}
                placeholder={placeholder ? placeholder : 'Выберете значение'}
                options={options}
                isSearchable={true}
                isClearable={true}
            />
            <ErrorMessage component="div" className="error form-text" name={name} />
            {helper && <div id={name + '-help'} className="form-text">{helper}</div>}
        </div>
    );
}

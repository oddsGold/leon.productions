import React from "react";
import {ErrorMessage, Field, useField} from "formik";
import Select from 'react-select';

export default function MultiSelect({name, title, options, helper, required = false}){

    const [field, meta, helpers] = useField(name);


    const CustomMultiSelect = ({placeholder, field, form, options, error}) => {
        const onChange = (option) => {
            form.setFieldValue(
                field.name,
                option.map((item) => item.value)
            );
        };

        const getValue = () => {
            if (options) {
                return options.filter(option => field.value.indexOf(option.value) >= 0);
            } else {
                return [];
            }
        };
        const customStyles = {
            control: (base, state) => ({
                ...base,
                '&:hover': { borderColor: error ? '#dc3545' : '#b8babd' },
                border: error ? '1px solid #dc3545' : '1px solid #ced4da',
            }),
        }

        return (
            <Select
                styles={customStyles}
                className="custom-multi-select"
                name={field.name}
                value={getValue()}
                onChange={onChange}
                placeholder={placeholder}
                options={options}
                isMulti={true}
            />
        );
    };

    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">
                {title}
                {required && <span className="required">*</span>}
            </label>
            <Field
                name={name}
                id={name}
                options={options}
                component={CustomMultiSelect}
                error={meta.error && meta.touched}
            />
            <ErrorMessage component="div" className="error form-text" name={name} />
            {helper && <div id={name + '-help'} className="form-text">{helper}</div>}
        </div>
    );
}

import React from "react";
import {ErrorMessage, Field, useField, useFormikContext} from "formik";
import ru from 'date-fns/locale/ru';
import {formatISO9075, parse} from "date-fns";
import DatePicker from "react-datepicker";

export default function DateTime({name, title, helper, required = false}){

    const [field, meta, helpers] = useField(name);
    const {setFieldValue, validateField} = useFormikContext();

    let selected = null;
    if(field.value){
        let pd = parse(field.value, 'yyyy-MM-dd HH:mm:ss', new Date());
        if(pd instanceof Date){
            selected = pd;
        }
    }

    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">
                {title}
                {required && <span className="required">*</span>}
            </label>
            <DatePicker
                selected={selected}
                onChange={val => {
                    setFieldValue(field.name, (val instanceof Date) ? formatISO9075(val) : '');
                }}
                id={name}
                onCalendarClose={_ => {validateField(name)}}
                name={name}
                showTimeSelect
                isClearable
                locale={ru}
                wrapperClassName="w-100 custom-date-picker"
                timeFormat="HH:mm"
                className={'form-control ' + (meta.error && meta.touched ? 'error' : '')}
                timeIntervals={1}
                timeCaption="time"
                dateFormat="dd.MM.yyyy HH:mm"
                autoComplete="off"
            />
            <ErrorMessage component="div" className="error form-text" name={name} />
            {helper && <div id={name + '-help'} className="form-text">{helper}</div>}
        </div>
    );

}

import React from "react";
import {ErrorMessage, Field, useField, useFormikContext} from "formik";
import ru from 'date-fns/locale/ru';
import {formatISO9075, parse} from "date-fns";
import DatePicker from "react-datepicker";

export default function CheckDateFromTo({nameCheck, nameDateFrom, nameDateTo, title, helper}){

    const [fieldCheck, metaCheck, helpersCheck] = useField(nameCheck);
    const [fieldDateFrom, metaDateFrom, helpersDateFrom] = useField(nameDateFrom);
    const [fieldDateTo, metaDateTo, helpersDateTo] = useField(nameDateTo);
    const {setFieldValue, validateField} = useFormikContext();

    let selectedDateFrom = null;
    if(fieldDateFrom.value){
        let pd = parse(fieldDateFrom.value, 'yyyy-MM-dd HH:mm:ss', new Date());
        if(pd instanceof Date){
            selectedDateFrom = pd;
        }
    }

    let selectedDateTo = null;
    if(fieldDateTo.value){
        let pd = parse(fieldDateTo.value, 'yyyy-MM-dd HH:mm:ss', new Date());
        if(pd instanceof Date){
            selectedDateTo = pd;
        }
    }

    const handleCheckBox = (e) => {
        setFieldValue(nameCheck, e.currentTarget.checked ? 1 : 0);
    };


    return (
        <div className="row mb-3">
            <div className="form-group col-md-4">
                <div className="custom-control form-check custom-switch mt-2 mb-2">
                    <input
                        checked={Boolean(fieldCheck.value)}
                        name={nameCheck}
                        className="form-check-input"
                        type="checkbox"
                        id={nameCheck}
                        aria-describedby={nameCheck + '-help'}
                        onChange={handleCheckBox}
                    />
                    <label className="form-check-label" htmlFor={nameCheck}>{title}</label>
                    {helper && <div id={nameCheck + '-help'} className="form-text">{helper}</div>}
                </div>
            </div>
            <div className={"form-group col-md-4 " + (fieldCheck.value ? '' : 'd-none')}>
                <div className="row">
                    <div className="col-md-1">
                        <label htmlFor={nameDateFrom} className="form-label mt-2 mb-2">С</label>
                    </div>
                    <div className="col-md-11">
                        <DatePicker
                            selected={selectedDateFrom}
                            onChange={val => {
                                setFieldValue(nameDateFrom, (val instanceof Date) ? formatISO9075(val) : '');
                            }}
                            //onCalendarClose={_ => {validateField(nameDateFrom)}}
                            name={nameDateFrom}
                            id={nameDateFrom}
                            showTimeSelect
                            isClearable
                            locale={ru}
                            wrapperClassName=" custom-date-picker"
                            timeFormat="HH:mm"
                            className={'form-control ' + (metaDateFrom.error && metaDateFrom.touched ? 'error' : '')}
                            timeIntervals={1}
                            timeCaption="time"
                            dateFormat="dd.MM.yyyy HH:mm"
                            autoComplete="off"
                        />
                    </div>
                </div>
            </div>
            <div className={"form-group col-md-4 " + (fieldCheck.value ? '' : 'd-none')}>
                <div className="row">
                    <div className="col-md-1">
                        <label htmlFor={nameDateTo} className="form-label mt-2 mb-2">По</label>
                    </div>
                    <div className="col-md-11">
                        <DatePicker
                            selected={selectedDateTo}
                            onChange={val => {
                                setFieldValue(nameDateTo, (val instanceof Date) ? formatISO9075(val) : '');
                            }}
                            //onCalendarClose={_ => {validateField(nameDateTo)}}
                            name={nameDateTo}
                            id={nameDateTo}
                            showTimeSelect
                            isClearable
                            locale={ru}
                            wrapperClassName="custom-date-picker"
                            timeFormat="HH:mm"
                            className={'form-control ' + (metaDateTo.error && metaDateTo.touched ? 'error' : '')}
                            timeIntervals={1}
                            timeCaption="time"
                            dateFormat="dd.MM.yyyy HH:mm"
                            autoComplete="off"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

}

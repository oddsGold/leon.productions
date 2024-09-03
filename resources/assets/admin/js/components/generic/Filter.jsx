import React from 'react';

export default function Filter({title, current, options, setOption}){

    const handleSelected = (e) => {
        setOption(e.currentTarget.value);
    };

    return (
        <div className="filter">
            <div className="input-group">
                <span className="input-group-text" >{title}</span>
                <select
                    //value={''}
                    className="form-select"
                    onChange={handleSelected}
                >
                    <option value="">Все</option>
                    {options && options.map((option, index) => {
                        return <option value={option.value} key={index}>{option.label}</option>;
                    })}
                </select>
            </div>

        </div>
    );
}

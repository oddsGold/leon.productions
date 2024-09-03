import React from "react";

export default function Search({value, setSearch}){

    const minLength = 3;

    const delay = 1300;
    let interval = null;

    const handling = (e) => {

        let s = e.currentTarget.value.trim();



        if((s.length < minLength && s !== String(parseInt(s))) && s !== value){s = '';}



        if(
            (s === String(parseInt(s)) && parseInt(s) > 0) ||
            s.length >= minLength ||
            (s.length === 0 && s !== value)
        ){
            if(interval !== null)clearInterval(interval);
            interval = setTimeout(() => {
                if(s !== value){
                    setSearch(s)
                }
            }, delay);
        }

    };

    return (
        <div className="search">
            <input type="text" onChange={handling} className="form-control" placeholder="Поиск"/>
        </div>
    );
}

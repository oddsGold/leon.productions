import React from "react";
import {Link} from "react-router-dom";

export default function FormTitle({title, backLinkPath}){

    return (
        <div className="row mb-3">
            <div className="col">
                <div className="h3 title">
                    <Link className="back-page" to={backLinkPath}>
                        <i className="fas fa-arrow-left" />назад
                    </Link> {title}
                </div>
            </div>
        </div>
    );
}

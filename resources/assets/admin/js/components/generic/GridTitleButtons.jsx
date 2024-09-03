import React from 'react';
import {Link} from "react-router-dom";

export default function GridTitleButtons({createLinkPath, otherButtons}){


    // {createLinkPath && otherButtons ? <div></div> : }
    // {createLinkPath && <Link className="create" to={createLinkPath} >
    //     <i className="fas fa-edit" /> создать запись
    // </Link>}
    // {otherButtons && <div>{otherButtons}</div>}

    const createButton = <Link className="create" to={createLinkPath} >
        <i className="fas fa-edit" /> создать запись
    </Link>;

    return createLinkPath && otherButtons ?
        <div className="buttons">
            {createButton}
            {otherButtons}
        </div> : (
            createLinkPath ? createButton : (otherButtons ?? otherButtons)
        );
}

import React, { Fragment } from "react";
import General from './General.js';
import Detail from './Detail.js';

function User_infor() {
    return (

        <Fragment>
            <nav className="nav nav-borders">
                <h2 className="fs-bolder ml-3">Personal profile <i className="bi bi-person-circle"></i></h2>
            </nav>
            <hr className="mt-0 mb-4" />
            <General />
            <Detail />
        </Fragment>

    )
}

export default User_infor
import React from "react";
import avt from '../../images/avatar1.png'

function General(props) {

    console.log(props.userInfor)

    return (
        <div className="col-lg-4 card mb-4">
            <div className="card-body text-center d-flex align-items-center justify-content-center">
                <div>
                    <img
                        src={avt}
                        alt="avatar"
                        className="rounded-circle img-fluid"
                        style={{ width: 150 + 'px' }}
                    />
                    <h5 className="my-3">{(props.userInfor === undefined) ? '' : props.userInfor.Name}</h5>
                    <p className="text-muted mb-1">Full Stack Developer</p>
                    <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                </div>
            </div>
        </div>
    )
}

export default General
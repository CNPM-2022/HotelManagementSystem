import React from "react";

function General() {
    return (
        <div className="col-lg-4 card mb-4">
            <div className="card-body text-center d-flex align-items-center justify-content-center">
                <div>
                    <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                        alt="avatar"
                        className="rounded-circle img-fluid"
                        style={{ width: 150 + 'px' }}
                    />
                    <h5 className="my-3">John Smith</h5>
                    <p className="text-muted mb-1">Full Stack Developer</p>
                    <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                </div>
            </div>
        </div>
    )
}

export default General
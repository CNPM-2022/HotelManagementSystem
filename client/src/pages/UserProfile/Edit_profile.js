import React from "react";
import './Edit_profile.scss'

function Edit_profile() {
    return (
        <div className="container-xl px-4">

            <nav className="nav nav-borders">
                <h2 className="fs-bolder ml-3">Edit profile <i className="bi bi-pencil-square"></i></h2>
            </nav>
            <hr className="mt-0 mb-4" />
            <div className="row">
                <div className="col-xl-4">

                    <div className="card mb-4 mb-xl-0">
                        <div className="card-header">Profile Picture</div>
                        <div className="card-body text-center">

                            <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />

                            <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>

                            <button className="btn btn-primary" type="button">Upload new image</button>
                        </div>
                    </div>
                </div>
                <div className="col-xl-8">

                    <div className="card mb-4">
                        <div className="card-header">Account Details</div>
                        <div className="card-body">
                            <form>

                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputUsername">Full name</label>
                                    <input className="form-control" id="inputUsername" type="text" placeholder="Enter your name" />
                                </div>

                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                                    <input className="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" />
                                </div>

                                <div className="row gx-3 mb-3">

                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputPhone">Phone number</label>
                                        <input className="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputCMND">CMND</label>
                                        <input className="form-control" id="inputBirthday" type="text" name="CMND" placeholder="Enter your CMND" />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputAddress">Address</label>
                                    <input className="form-control" id="inputAddress" type="text" placeholder="Enter your address" />
                                </div>

                                <button className="btn btn-primary" type="button">Save changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit_profile
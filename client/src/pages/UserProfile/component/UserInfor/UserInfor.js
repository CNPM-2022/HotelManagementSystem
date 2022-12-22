import React, { Fragment } from 'react';
import { useEffect, useState } from 'react';

import avt from '../../images/avatar1.png';
import { getUser } from '../../../../services/apiServices';

function User_infor() {
    const [infor, setInfor] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        const getInforUser = async () => {
            const res = await getUser(JSON.parse(window.localStorage.getItem('user')).id);
            setInfor(res.data);
        };
        getInforUser();
        setLoading(false);
    }, []);

    if (loading || infor.user === undefined) {
        return (
            <div className="d-flex justify-content-center align-items-center " style={{ minHeight: '300px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    } else {
        return (
            <Fragment>
                <nav className="nav nav-borders">
                    <h2 className="fs-bolder ml-3">
                        Thông tin cá nhân <i className="bi bi-person-circle"></i>
                    </h2>
                </nav>
                <hr className="mt-0 mb-4" />
                <div className="col-lg-4 card mb-4">
                    <div className="card-body text-center d-flex align-items-center justify-content-center">
                        <div>
                            <img
                                src={avt}
                                alt="avatar"
                                className="rounded-circle img-fluid"
                                style={{ width: 150 + 'px' }}
                            />
                            <h5 className="my-3">{infor.user.Name}</h5>
                            <p className="text-muted mb-1">
                                Quốc tịch: {infor.user.typeUser === 'Inland' ? 'Việt Nam' : 'Nước ngoài'}
                            </p>
                            <p className="text-muted mb-4">
                                {infor.user.address === undefined ? '' : infor.user.address}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-8 pr-0">
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Tên đầy đủ</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">{infor.user.Name}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Tên người dùng</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">{infor.user.username}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Email</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">{infor.user.email}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Số điện thoại</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">{infor.user.phoneNumber}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">CMND/CCCD</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">
                                        {infor.user.CMND === undefined ? 'Không có thông tin' : infor.user.CMND}
                                    </p>
                                </div>
                            </div>
                            <hr />

                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Địa chỉ</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">
                                        {infor.user.address === undefined ? 'Không có thông tin' : infor.user.address}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default User_infor;

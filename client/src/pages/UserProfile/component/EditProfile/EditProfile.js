import React, { useState, useEffect } from 'react';
import './EditProfile.scss';
import { getUser } from '../../../../services/apiServices';
import ChangeInfor from './ChangeInfor';

function Edit_profile() {
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
        return <ChangeInfor userInfor={infor.user} />;
    }
}

export default Edit_profile;

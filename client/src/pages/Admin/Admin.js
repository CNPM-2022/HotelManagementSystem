import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Admin.scss';
import Sidebar from './Sidebar';
import Header from './Header';
import images from '../../assets/images';
import Button from '../../components/Button/Button';

function Admin() {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        navigate('/admins/dashboard');
    }, []);

    const handleToggleSidebar = () => setCollapsed((prev) => !prev);

    return user.isAdmin ? (
        <div className="admin-container">
            <Header handleToggleSidebar={handleToggleSidebar} />
            <div className="admin-content">
                <div className="admin-sidebar">
                    <Sidebar collapsed={collapsed} />
                </div>

                <div className="admin-main">
                    <Outlet />
                </div>
            </div>
        </div>
    ) : (
        <div className="admin-container is-not-admin">
            <div className="warning-img">
                <img src={images.warning} alt="warning" />
            </div>
            <h3>Sorry, You Are Not Allowed to Access This Page!</h3>
            <Link to="/" className="btn btn-warning">
                Back to Home
            </Link>
        </div>
    );
}

export default Admin;

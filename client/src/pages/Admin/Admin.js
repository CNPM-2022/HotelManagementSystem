import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import './Admin.scss';
import Sidebar from './Sidebar';
import Header from './Header';

function Admin() {
    const [collapsed, setCollapsed] = useState(false);

    const handleToggleSidebar = () => setCollapsed((prev) => !prev);
    return (
        <div className="admin-container">
            <Header handleToggleSidebar={handleToggleSidebar} />
            <div className="content">
                <div className="sidebar">
                    <Sidebar collapsed={collapsed} />
                </div>

                <div className="main">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Admin;

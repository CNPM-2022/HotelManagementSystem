import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import './Admin.scss';
import Sidebar from './Sidebar';
import { MenuOutlined } from '@ant-design/icons';

function Admin() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="admin-container">
            <div className="sidebar">
                <Sidebar collapsed={collapsed} />
            </div>
            <div className="content">
                <header className="header">
                    <MenuOutlined onClick={() => setCollapsed((prev) => !prev)} />
                </header>
                <div className="main">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Admin;

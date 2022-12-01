import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Sidebar({ collapsed }) {
    const { t } = useTranslation();

    return (
        <ProSidebar collapsed={collapsed}>
            <SidebarHeader className="text-center">
                <div
                    style={{
                        padding: '20px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: 14,
                        letterSpacing: '1px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    <Link to="/" className="title d-block w-100 h-100">
                        {t('admin.sidebar.title')}
                    </Link>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem>
                        {t('admin.sidebar.dashboard')}
                        <Link to="/admins" />
                    </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                    <SubMenu title={t('admin.sidebar.features.title')}>
                        <MenuItem>
                            {t('admin.sidebar.features.manageUsers')}
                            <Link to="/admins/manage-users" />
                        </MenuItem>
                        <MenuItem>
                            {t('admin.sidebar.features.manageRooms')}
                            <Link to="/admins/manage-rooms" />
                        </MenuItem>
                        <MenuItem>
                            {t('admin.sidebar.features.manageRoomTypes')}
                            <Link to="/admins/manage-room-types" />
                        </MenuItem>
                    </SubMenu>
                </Menu>
            </SidebarContent>
            <SidebarFooter style={{ textAlign: 'center' }}>
                <div className="sidebar-btn-wrapper">
                    <a
                        href="https://github.com/CNPM-2022/HotelManager"
                        target="_blank"
                        className="sidebar-btn"
                        rel="noopener noreferrer"
                    >
                        <span>Github</span>
                    </a>
                </div>
            </SidebarFooter>
        </ProSidebar>
    );
}

export default Sidebar;

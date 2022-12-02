import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Sidebar({ collapsed }) {
    const { t } = useTranslation();

    return (
        <ProSidebar collapsed={collapsed}>
            <SidebarHeader className="text-center">Giao diện</SidebarHeader>
            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem>
                        <NavLink className={({ isActive }) => (isActive ? 'active' : undefined)} to="/admins/dashboard">
                            {t('admin.sidebar.dashboard')}
                        </NavLink>
                    </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                    <SubMenu title={t('admin.sidebar.features.title')}>
                        <MenuItem>
                            <NavLink
                                className={({ isActive }) => (isActive ? 'active' : undefined)}
                                to="/admins/manage-users"
                            >
                                {t('admin.sidebar.features.manageUsers')}
                            </NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink
                                className={({ isActive }) => (isActive ? 'active' : undefined)}
                                to="/admins/manage-rooms"
                            >
                                {t('admin.sidebar.features.manageRooms')}{' '}
                            </NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink
                                className={({ isActive }) => (isActive ? 'active' : undefined)}
                                to="/admins/manage-room-types"
                            >
                                {t('admin.sidebar.features.manageRoomTypes')}
                            </NavLink>
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

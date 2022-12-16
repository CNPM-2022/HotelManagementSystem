import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { NavLink } from 'react-router-dom';

function Sidebar({ collapsed }) {
    return (
        <ProSidebar collapsed={collapsed}>
            <SidebarHeader className="text-center">Giao diện</SidebarHeader>
            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem>
                        <NavLink className={({ isActive }) => (isActive ? 'active' : undefined)} to="/admins/dashboard">
                            Bảng điều khiển
                        </NavLink>
                    </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                    <SubMenu title="Tính năng">
                        <MenuItem>
                            <NavLink
                                className={({ isActive }) => (isActive ? 'active' : undefined)}
                                to="/admins/manage-booking"
                            >
                                Quản lý Đặt phòng
                            </NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink
                                className={({ isActive }) => (isActive ? 'active' : undefined)}
                                to="/admins/manage-users"
                            >
                                Quản lý Người dùng
                            </NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink
                                className={({ isActive }) => (isActive ? 'active' : undefined)}
                                to="/admins/manage-rooms"
                            >
                                Quản lý Phòng
                            </NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink
                                className={({ isActive }) => (isActive ? 'active' : undefined)}
                                to="/admins/manage-room-types"
                            >
                                Quản lý Loại Phòng
                            </NavLink>
                        </MenuItem>

                        <MenuItem>
                            <NavLink
                                className={({ isActive }) => (isActive ? 'active' : undefined)}
                                to="/admins/change-regulations"
                            >
                                Thay đổi Quy định
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

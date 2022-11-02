import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';

function Sidebar({ collapsed }) {
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
                        Hotel
                    </Link>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem>
                        Dashboard
                        <Link to="/admins" />
                    </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                    <SubMenu title="Features">
                        <MenuItem>
                            Quản Lý Users
                            <Link to="/admins/manage-users" />
                        </MenuItem>
                        <MenuItem>
                            Quản Lý Rooms
                            <Link to="/admins/manage-rooms" />
                        </MenuItem>
                    </SubMenu>
                </Menu>
            </SidebarContent>
            <SidebarFooter style={{ textAlign: 'center' }}>
                <div className="sidebar-btn-wrapper">
                    <a href="https://www.github.com" target="_blank" className="sidebar-btn" rel="noopener noreferrer">
                        <span>Github</span>
                    </a>
                </div>
            </SidebarFooter>
        </ProSidebar>
    );
}

export default Sidebar;

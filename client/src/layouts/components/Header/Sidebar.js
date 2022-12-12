import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';
import { GrClose } from 'react-icons/gr';
import { BsArrowRight } from 'react-icons/bs';

function Sidebar({ collapsed, setCollapsed }) {
    return (
        <ProSidebar collapsed={collapsed}>
            <SidebarHeader className="text-center">
                <span className="close-btn" onClick={() => setCollapsed(true)}>
                    <GrClose />
                </span>
            </SidebarHeader>
            <SidebarContent>
                <Menu>
                    <MenuItem>
                        Home
                        <Link to="/" />
                    </MenuItem>
                    <MenuItem>
                        Rooms
                        <Link to="/rooms/1" />
                    </MenuItem>
                    <MenuItem>
                        About Us
                        <Link to="/about-us" />
                    </MenuItem>
                    <MenuItem>
                        Contact
                        <Link to="/contact" />
                    </MenuItem>
                </Menu>

                <div className="book-now">
                    <Link to="/rooms">
                        Book Now <BsArrowRight />
                    </Link>
                </div>
            </SidebarContent>
            <SidebarFooter></SidebarFooter>
        </ProSidebar>
    );
}

export default Sidebar;

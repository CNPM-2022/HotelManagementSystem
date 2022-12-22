import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { authActions } from '../../store/authSlice';
import Swal from 'sweetalert2';

function Sidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    function handleToggle() {
        document.getElementById('sidebar').classList.toggle('active');
    }

    const hanldesingout = () => {
        localStorage.removeItem('user');
        dispatch(authActions.logout());
        Swal.fire('Successful', 'Successfully Logged Out ', 'success').then(() => {
            navigate('/');
        });
    };

    return (
        <nav id="sidebar">
            <div className="custom-menu">
                <button type="button" id="sidebarCollapse" className="btn btn-primary" onClick={handleToggle}></button>
            </div>
            <div className="img img-sidebar bg-wrap text-center py-4" id="avt">
                <div className="user-logo">
                    <div className="img img-sidebar"></div>
                    <h3>{user.username}</h3>
                </div>
            </div>
            <ul className="list-unstyled components mb-5">
                <li className="list">
                    <NavLink to="/user/profile">
                        <i className="bi bi-person-circle me-2"></i>Thông tin tài khoản
                    </NavLink>
                </li>
                <li className="list">
                    <NavLink to="/user/my-booking">
                        <i className="bi bi-bag me-2"></i>Danh sách đặt phòng
                    </NavLink>
                </li>
                <li className="list">
                    <NavLink to="/user/edit-profile">
                        <i className="bi bi-pencil-square me-2"></i>Chỉnh sửa thông tin
                    </NavLink>
                </li>
                <li className="list">
                    <NavLink to="/user/favorite">
                        <i className="fa-solid fa-heart me-2"></i>Danh sách yêu thích
                    </NavLink>
                </li>
                <li onClick={hanldesingout}>
                    <a>
                        <i className="bi bi-box-arrow-right me-2"></i>Đằng xuất
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Sidebar;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillCaretDown } from 'react-icons/ai';
import { IoMdArrowBack } from 'react-icons/io';
import { RiAdminFill, RiLogoutBoxRLine, RiUserFill } from 'react-icons/ri';
import Tippy from '@tippyjs/react/headless';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../services/apiServices';
import Swal from 'sweetalert2';

import './UserMenu.scss';
import images from '../../assets/images';
import { authActions } from '../../store/authSlice';

function UserMenu() {
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('user');
        dispatch(authActions.logout());
        Swal.fire('Successful', 'Successfully Logged Out ', 'success').then(() => {
            navigate('/login');
        });
    };

    useEffect(() => {
        getUser(JSON.parse(window.localStorage.getItem('user')).id).then((data) => {
            if (!data.data.user.isAdmin) {
                userMenu.splice(1, 1);
            }
        });
    }, [JSON.parse(window.localStorage.getItem('user')).id]);

    const userMenu = [
        {
            icon: <RiUserFill />,
            title: 'Tài khoản',
            onClick: () => navigate('/user/profile'),
        },
        {
            icon: <RiAdminFill />,
            title: 'Quản trị',
            onClick: () => navigate('/admins/dashboard'),
        },
        {
            icon: <RiLogoutBoxRLine />,
            title: 'Đăng xuất',
            onClick: handleLogout,
            separate: true,
        },
    ];

    const [history, setHistory] = useState([{ data: userMenu }]);
    const [visible, setVisible] = useState(false);

    const current = history[history.length - 1];

    // Back to main menu
    const handleBack = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    return (
        <Tippy
            visible={visible}
            interactive
            onClickOutside={() => setVisible(false)}
            onHide={handleBack}
            render={(attrs) => (
                <div {...attrs} className="user-menu-container">
                    {current.title && (
                        <div className="header" onClick={handleBack}>
                            <i className="icon">
                                <IoMdArrowBack />
                            </i>
                            <span>{current.title}</span>
                        </div>
                    )}
                    <div className="body">
                        {current.data.map((item) => {
                            return (
                                <div
                                    key={item.title}
                                    className={item.separate ? 'menu-item separate' : 'menu-item'}
                                    onClick={() => {
                                        if (item.children) {
                                            setHistory((prevState) => [...prevState, item.children]);
                                        } else item.onClick();
                                    }}
                                >
                                    {item.icon && <i className="icon">{item.icon}</i>}
                                    <span>{item.title}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        >
            <div className="user" onClick={() => setVisible((prevState) => !prevState)}>
                <span className="username">{user?.username || ''}</span>
                <img className="avatar" src={images.defaultUser} alt="avatar" />
                <AiFillCaretDown className="caret-down" />
            </div>
        </Tippy>
    );
}

export default UserMenu;

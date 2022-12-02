import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillCaretDown } from 'react-icons/ai';
import { BiWorld } from 'react-icons/bi';
import { IoMdArrowBack } from 'react-icons/io';
import { RiAdminFill, RiLogoutBoxRLine, RiUserFill } from 'react-icons/ri';
import Tippy from '@tippyjs/react/headless';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import './UserMenu.scss';
import images from '../../assets/images';
import { authActions } from '../../store/authSlice';

function UserMenu() {
    const { i18n, t } = useTranslation();

    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        dispatch(authActions.logout());
        Swal.fire('Successful', 'Successfully Logged Out ', 'success').then(() => {
            navigate('/login');
        });
    };

    const userMenu = [
        {
            icon: <RiUserFill />,
            title: t('homepage.header.userMenu.account'),
            onClick: () => navigate('/User'),
        },
        {
            icon: <RiAdminFill />,
            title: t('homepage.header.userMenu.admin'),
            onClick: () => navigate('/admins/dashboard'),
        },
        {
            icon: <BiWorld />,
            title: t('homepage.header.userMenu.language.title'),
            children: {
                title: t('homepage.header.userMenu.language.subTitle'),
                data: [
                    {
                        code: 'vi',
                        title: t('homepage.header.userMenu.language.vietnamese'),
                        type: 'language',
                    },
                    {
                        code: 'en',
                        title: t('homepage.header.userMenu.language.english'),
                        type: 'language',
                    },
                ],
            },
        },
        {
            icon: <RiLogoutBoxRLine />,
            title: t('homepage.header.userMenu.logout'),
            onClick: handleLogout,
            separate: true,
        },
    ];

    const [history, setHistory] = useState([{ data: userMenu }]);
    const [visible, setVisible] = useState(false);

    const current = history[history.length - 1];

    useEffect(() => {
        setHistory([{ data: userMenu }]);
    }, [i18n.language]);

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
                                        } else {
                                            if (item.type === 'language') {
                                                handleChangeLanguage(item.code);
                                                setVisible(false);
                                            } else {
                                                item.onClick();
                                            }
                                        }
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
                <span className="username">{user.username}</span>
                <img className="avatar" src={images.defaultUser} alt="avatar" />
                <AiFillCaretDown className="caret-down" />
            </div>
        </Tippy>
    );
}

export default UserMenu;

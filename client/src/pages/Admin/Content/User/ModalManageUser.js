import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
import Select from 'react-select';
import { toast } from 'react-toastify';

import { postCreateUser, putUpdateUser } from '../../../../services/apiServices';

function ModalManageUser({ show, setShow, modalType, title, dataUser = {}, fetchAllUsers, setCurrentPage }) {
    const typeOptions = [
        {
            label: 'Việt Nam',
            value: 'Inland',
        },
        {
            label: 'Nước ngoài',
            value: 'Foreign',
        },
    ];

    const roleOptions = [
        {
            label: 'Người dùng',
            value: false,
        },
        {
            label: 'Quản trị',
            value: true,
        },
    ];

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [typeUser, setTypeUser] = useState(typeOptions[0]);
    const [role, setRole] = useState(roleOptions[0]);
    const [identity, setIdentity] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (show && !_.isEmpty(dataUser) && modalType !== 'CREATE') {
            setEmail(dataUser.email);
            setUsername(dataUser.username);
            setRole(roleOptions.find((roleOption) => roleOption.value === dataUser.isAdmin));
            setTypeUser(typeOptions.find((typeOption) => typeOption.value === dataUser.typeUser));
            setName(dataUser.Name);
            setAddress(dataUser.address);
            setIdentity(dataUser.CMND);
            setPhone(dataUser.phoneNumber);
        }
    }, [show]);

    const handleClose = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setName('');
        setIdentity('');
        setPhone('');
        setAddress('');
        setRole(roleOptions[0]);
        setTypeUser(typeOptions[0]);
        setShow(false);
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            );
    };

    const handleSubmit = async () => {
        let isValid = true;
        const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/;
        let res;

        // Validate
        if (!username || !email || !password || !name || !address || !identity || !phone) {
            if (!password && modalType === 'EDIT') {
            } else {
                isValid = false;
                toast.error('Please fill out all fields');
            }
        }

        if (!validateEmail(email)) {
            isValid = false;
            toast.error('Email is not valid');
        }

        if (!usernameRegex.test(username)) {
            isValid = false;
            toast.error('Username does not include spaces and contain at least 3 character');
        }

        if (!passwordRegex.test(password) && modalType !== 'EDIT') {
            isValid = false;
            toast.error(
                'Password must be 7-19 characters and contain at least one letter, one number and a special character',
            );
        }

        if (!isValid) return;

        // Handle submit
        if (modalType === 'CREATE') {
            res = await postCreateUser({
                username,
                email,
                password,
                Name: name,
                CMND: identity,
                address,
                phoneNumber: phone,
                isAdmin: role.value,
                typeUser: typeUser.value,
            });
        } else if (modalType === 'EDIT') {
            res = await putUpdateUser(dataUser._id, {
                id: dataUser._id,
                username,
                email,
                Name: name,
                CMND: identity,
                address,
                phoneNumber: phone,
                isAdmin: role.value,
                typeUser: typeUser.value,
            });
        }

        if (res && res.data && res.data.success === true) {
            toast.success(res.data.message);
            setCurrentPage(1);
            fetchAllUsers();
        } else {
            toast.error(res.message);
        }

        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} size="xl" backdrop={modalType === 'VIEW' ? true : 'static'}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                disabled={modalType === 'VIEW'}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Mật khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                disabled={modalType !== 'CREATE'}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Tên người dùng</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                disabled={modalType === 'VIEW'}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Họ và tên</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                disabled={modalType === 'VIEW'}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Vai trò</label>
                            <Select
                                value={role}
                                options={roleOptions}
                                onChange={setRole}
                                isDisabled={modalType === 'VIEW'}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Loại</label>
                            <Select
                                value={typeUser}
                                options={typeOptions}
                                onChange={setTypeUser}
                                isDisabled={modalType === 'VIEW'}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">CMND/CCCD</label>
                            <input
                                type="text"
                                className="form-control"
                                value={identity}
                                onChange={(event) => setIdentity(event.target.value)}
                                disabled={modalType === 'VIEW'}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Số điện thoại</label>
                            <input
                                type="text"
                                className="form-control"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                                disabled={modalType === 'VIEW'}
                            />
                        </div>

                        <div className="col-md-12">
                            <label className="form-label">Địa chỉ</label>
                            <input
                                type="text"
                                className="form-control"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                                disabled={modalType === 'VIEW'}
                            />
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {modalType !== 'VIEW' && (
                    <Button variant="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
}

export default ModalManageUser;

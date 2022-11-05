import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
import { postCreateUser } from '../../../../services/apiServices';
import { toast } from 'react-toastify';

function ModalManageUser({ show, setShow, type, title, dataUser = {}, fetchListUsers }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [identity, setIdentity] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('USER');

    useEffect(() => {
        if (show && !_.isEmpty(dataUser) && type !== 'CREATE') {
            setEmail(dataUser.email);
            setUsername(dataUser.username);
            if (dataUser.isAdmin) {
                setRole('ADMIN');
            } else {
                setRole('USER');
            }
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
        setAddress('');
        setRole('USER');
        setShow(false);
    };

    const handleSubmit = async () => {
        if (!username || !email || !password || !name || !address || !identity) {
            toast.error('Please fill out all fields');
            return;
        }

        if (type === 'CREATE') {
            const res = await postCreateUser({
                username,
                email,
                password,
                Name: name,
                CMND: identity,
                address,
                phoneNumber: phone,
                isAdmin: role === 'ADMIN' ? true : false,
            });

            if (res && res.data && res.data.success === true) {
                toast.success(res.data.message);
                fetchListUsers();
            } else {
                toast.error(res.message);
            }

            handleClose();
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
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
                                disabled={type !== 'CREATE'}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                disabled={type !== 'CREATE'}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                disabled={type === 'VIEW'}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Role</label>

                            <select
                                className="form-select"
                                value={role}
                                onChange={(event) => setRole(event.target.value)}
                                disabled={type === 'VIEW'}
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Họ và tên</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                disabled={type === 'VIEW'}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">CMND/CCCD</label>
                            <input
                                type="text"
                                className="form-control"
                                value={identity}
                                onChange={(event) => setIdentity(event.target.value)}
                                disabled={type === 'VIEW'}
                            />
                        </div>

                        <div className="col-md-12">
                            <label className="form-label">Số điện thoại</label>
                            <input
                                type="text"
                                className="form-control"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                                disabled={type === 'VIEW'}
                            />
                        </div>

                        <div className="col-md-12">
                            <label className="form-label">Địa chỉ</label>
                            <input
                                type="text"
                                className="form-control"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                                disabled={type === 'VIEW'}
                            />
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {type !== 'VIEW' && (
                    <Button variant="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
}

export default ModalManageUser;

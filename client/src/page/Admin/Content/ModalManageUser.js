import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PlusCircleFilled } from '@ant-design/icons';
import { useState } from 'react';

function ModalManageUser({ show, setShow }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('USER');
    const [previewImage, setPreviewImage] = useState('');
    const [image, setImage] = useState('');

    const handleClose = () => setShow(false);

    const handleUploadImage = (e) => {
        if (e.target?.files[0]) {
            const objectURL = URL.createObjectURL(e.target.files[0]);
            setPreviewImage(objectURL);
            setImage(e.target.files[0]);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Add new user</Modal.Title>
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
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Role</label>

                            <select
                                className="form-select"
                                value={role}
                                onChange={(event) => setRole(event.target.value)}
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>

                        <div className="col-md-12">
                            <label className="form-label btn btn-success image-upload-label" htmlFor="user-upload">
                                <PlusCircleFilled />
                                <span>Upload File Image</span>
                            </label>
                            <input type="file" id="user-upload" hidden onChange={handleUploadImage} />
                        </div>

                        <div className="col-md-12 img-preview">
                            {previewImage ? <img src={previewImage} alt="preview" /> : <span>Preview Image</span>}
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalManageUser;

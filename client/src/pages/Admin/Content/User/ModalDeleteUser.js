import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUser } from '../../../../services/apiServices';

function ModalDeleteUser({ show, setShow, dataUser = {}, fetchAllUsers, setCurrentPage }) {
    const handleClose = () => setShow(false);

    const handleDeleteUser = async () => {
        const res = await deleteUser(dataUser._id);

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
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete the User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure to delete this user. email = <b>{dataUser?.email}</b>?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleDeleteUser}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDeleteUser;

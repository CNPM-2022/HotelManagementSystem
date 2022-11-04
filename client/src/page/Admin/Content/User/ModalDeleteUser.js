import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalDeleteUser({ show, setShow, dataUser = {} }) {
    const handleClose = () => setShow(false);

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
                <Button variant="primary" onClick={handleClose}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDeleteUser;

import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { deleteRoom } from '../../../../services/apiServices';

function ModalDeleteRoom({ show, setShow, dataRoomDelete, fetchAllRooms }) {
    const handleClose = () => setShow(false);

    const handleDeleteRoom = async () => {
        const res = await deleteRoom(dataRoomDelete._id);
        if (res && res.data && res.status === 200) {
            toast.success(res.data.message);
            fetchAllRooms();
            handleClose();
        } else {
            toast.error(res.message);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete the Room</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure to delete this room. Number = <b>{dataRoomDelete?.roomNumber}</b>?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleDeleteRoom}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDeleteRoom;

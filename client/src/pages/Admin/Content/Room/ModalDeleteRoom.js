import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { deleteRoom } from '../../../../services/apiServices';

function ModalDeleteRoom({ show, setShow, dataRoomDelete, fetchAllRooms, setCurrentPage }) {
    const handleClose = () => setShow(false);

    const handleDeleteRoom = async () => {
        const res = await deleteRoom(dataRoomDelete._id);
        if (res && res.data && res.status === 200) {
            toast.success(res.data.message);
            fetchAllRooms();
            setCurrentPage(1);
            handleClose();
        } else {
            toast.error(res.message);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận Xóa phòng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Bạn có chắc chắn xóa phòng này không. Phòng <b>{dataRoomDelete?.roomNumber}</b>?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Hủy bỏ
                </Button>
                <Button variant="primary" onClick={handleDeleteRoom}>
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDeleteRoom;

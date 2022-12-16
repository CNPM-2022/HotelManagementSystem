import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { deleteRoomType } from '../../../../services/apiServices';

function ModalDeleteType({ show, setShow, dataTypeDelete, fetchAllRoomTypes }) {
    const handleClose = () => setShow(false);

    const handleDeleteType = async () => {
        const res = await deleteRoomType(dataTypeDelete._id);
        if (res && res.data && res.status === 200) {
            toast.success(res.data.message);
            fetchAllRoomTypes();
            handleClose();
        } else {
            toast.error(res.message);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận xóa Loại phòng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Bạn có chắc chắn muốn xóa loại phòng này không. Loại <b>{dataTypeDelete?.typeOfRooms}</b>?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Hủy bỏ
                </Button>
                <Button variant="primary" onClick={handleDeleteType}>
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDeleteType;

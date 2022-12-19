import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Bill from './Bill';

function ModalViewBill({ show, setShow, dataBill }) {
    const handleClose = () => setShow(false);
    return (
        <>
            <Modal size="xl" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết Hóa đơn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Bill billData={dataBill} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalViewBill;

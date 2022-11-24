import { Button, Modal } from 'react-bootstrap';
import Select from 'react-select';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { putUpdateRoom } from '../../../../services/apiServices';

function ModalManageRoom({ show, setShow, modalType, dataRoom, fetchAllRooms }) {
    const statusOptions = [
        { value: 'Available', label: 'Available' },
        { value: 'Unavailable', label: 'Unavailable' },
    ];

    const typeOptions = [
        { value: 'A', label: 'A' },
        { value: 'B', label: 'B' },
        { value: 'C', label: 'C' },
    ];

    const [roomNumber, setRoomNumber] = useState('');
    const [capacity, setCapacity] = useState(0);
    const [type, setType] = useState(null);
    const [status, setStatus] = useState(null);
    const [description, setDescription] = useState('');
    const [note, setNote] = useState('');
    const [images, setImages] = useState(null);
    const [imagesSource, setImagesSource] = useState([]);

    useEffect(() => {
        if (show && !_.isEmpty(dataRoom)) {
            setRoomNumber(dataRoom.roomNumber);
            setCapacity(dataRoom.maxCount);
            setType(() => typeOptions.find((type) => type.value === dataRoom.type));
            setStatus(() => statusOptions.find((status) => status.value === dataRoom.status));
            setDescription(dataRoom.description);
            setNote(dataRoom.note);

            if (modalType === 'VIEW') {
                setImages(() =>
                    dataRoom.imageUrls.map((image) => `${process.env.REACT_APP_SERVER_URL}${image.filePath}`),
                );
            }
        }
    }, [show]);

    const handleChangeImageFiles = (event) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setImages(files);
            setImagesSource(Array.from(files).map((file) => URL.createObjectURL(file)));
        }
    };

    const handleClose = () => {
        if (imagesSource.length > 0) {
            imagesSource.forEach((imageSource) => URL.revokeObjectURL(imageSource));
        }
        setImagesSource([]);
        setImages(null);
        setShow(false);
    };

    const handleUpdateRoom = async () => {
        let isValidRoom = true;

        if (!roomNumber) {
            toast.error(`Not empty number!`);
            isValidRoom = false;
        }

        if (!capacity) {
            toast.error(`Not empty capacity!`);
            isValidRoom = false;
        }

        if (_.isEmpty(images)) {
            toast.error(`Not empty images!`);
            isValidRoom = false;
        }

        if (!description) {
            toast.error(`Not empty description!`);
            isValidRoom = false;
        }

        if (!type) {
            toast.error(`Not empty type!`);
            isValidRoom = false;
        }

        if (!status) {
            toast.error(`Not empty status!`);
            isValidRoom = false;
        }

        if (!note) {
            toast.error(`Not empty note!`);
            isValidRoom = false;
        }

        if (isValidRoom) {
            const formData = new FormData();

            formData.append('roomNumber', roomNumber);
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }

            formData.append('status', status.value);
            formData.append('description', description);
            formData.append('type', type.value);
            formData.append('note', note);
            formData.append('maxCount', capacity);

            const res = await putUpdateRoom(dataRoom._id, formData);

            if (res && res.data && res.data.success === true) {
                toast.success(res.data.message);
            } else {
                toast.error(res.message);
            }

            fetchAllRooms();
            handleClose();
        }
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" size="xl" className="modal-manage-room">
            <Modal.Header closeButton>
                <Modal.Title>Update Room Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Number</label>
                            <input
                                value={roomNumber}
                                onChange={(event) => setRoomNumber(event.target.value)}
                                type="text"
                                className="form-control"
                                disabled={modalType === 'VIEW'}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Capacity</label>
                            <input
                                value={capacity}
                                onChange={(event) => setCapacity(+event.target.value)}
                                type="text"
                                className="form-control"
                                disabled={modalType === 'VIEW'}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Type</label>
                            <Select
                                value={type}
                                onChange={(selected) => setType(selected)}
                                options={typeOptions}
                                placeholder="Choose room type..."
                                isDisabled={modalType === 'VIEW'}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Status</label>
                            <Select
                                value={status}
                                onChange={(selected) => setStatus(selected)}
                                options={statusOptions}
                                placeholder="Choose room status..."
                                isDisabled={modalType === 'VIEW'}
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Description</label>
                            <textarea
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                className="form-control description"
                                placeholder="Description"
                                disabled={modalType === 'VIEW'}
                            ></textarea>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Note</label>
                            <input
                                value={note}
                                onChange={(event) => setNote(event.target.value)}
                                type="text"
                                className="form-control"
                                disabled={modalType === 'VIEW'}
                            />
                        </div>
                        <div className="col-md-12">
                            <label
                                htmlFor={`upload-images-input-${dataRoom._id}`}
                                className="btn btn-success upload-images-btn"
                            >
                                <BsFillPlusCircleFill />
                                Upload file images
                            </label>

                            <input
                                onChange={handleChangeImageFiles}
                                type="file"
                                id={`upload-images-input-${dataRoom._id}`}
                                multiple
                                hidden
                                disabled={modalType === 'VIEW'}
                            />

                            <div className="preview-images">
                                {images ? (
                                    <div className="row">
                                        {Array.from(images).map((image, index) => (
                                            <div key={index} className="col-3">
                                                <div className="preview-item">
                                                    <img
                                                        src={modalType === 'UPDATE' ? imagesSource[index] : image}
                                                        alt="Room preview"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="no-image">
                                        <span>Preview Image</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {modalType === 'UPDATE' && (
                    <Button variant="primary" onClick={handleUpdateRoom}>
                        Save
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
}

export default ModalManageRoom;

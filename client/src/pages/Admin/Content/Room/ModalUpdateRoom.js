import { Button, Modal } from 'react-bootstrap';
import Select from 'react-select';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { IoMdCloseCircle } from 'react-icons/io';

function ModalUpdateRoom({ show, setShow, dataRoomUpdate, fetchAllRooms }) {
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
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (show && !_.isEmpty(dataRoomUpdate)) {
            setRoomNumber(dataRoomUpdate.roomNumber);
            setCapacity(dataRoomUpdate.maxCount);
            setType(() => typeOptions.find((type) => type.value === dataRoomUpdate.type));
            setStatus(() => statusOptions.find((status) => status.value === dataRoomUpdate.status));
            setDescription(dataRoomUpdate.description);
            setNote(dataRoomUpdate.note);
            setImages(dataRoomUpdate.imageUrls);
        }
    }, [show]);

    const handleClose = () => {
        setShow(false);
    };

    const setImageSource = (filePath) => {
        return `${process.env.REACT_APP_SERVER_URL}${filePath}`;
    };

    const handleDeleteImage = (image) => {
        setImages((prevImages) => prevImages.filter((x) => x.filePath !== image.filePath));
    };

    const handleChangeImageFiles = (event) => {
        console.log(event.target.files);
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" size="xl" className="modal-update-room">
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
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Capacity</label>
                            <input
                                value={capacity}
                                onChange={(event) => setCapacity(+event.target.value)}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Type</label>
                            <Select
                                value={type}
                                onChange={(selected) => setType(selected)}
                                options={typeOptions}
                                placeholder="Choose room type..."
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Status</label>
                            <Select
                                value={status}
                                onChange={(selected) => setStatus(selected)}
                                options={statusOptions}
                                placeholder="Choose room status..."
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Description</label>
                            <textarea
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                className="form-control description"
                                placeholder="Description"
                            ></textarea>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Note</label>
                            <input
                                value={note}
                                onChange={(event) => setNote(event.target.value)}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-12">
                            <label
                                htmlFor={`upload-images-input-${dataRoomUpdate._id}`}
                                className="btn btn-success upload-images-btn"
                            >
                                <AiOutlinePlusCircle />
                                Upload file images
                            </label>

                            <input
                                onChange={handleChangeImageFiles}
                                type="file"
                                id={`upload-images-input-${dataRoomUpdate._id}`}
                                multiple
                                hidden
                            />

                            <div className="preview-images">
                                <div className="row">
                                    {images && images.length > 0 ? (
                                        images.map((image) => (
                                            <div key={image.filePath} className="col-3">
                                                <div className="preview-item">
                                                    <img src={setImageSource(image.filePath)} alt="Room preview" />
                                                    <span
                                                        className="delete-image-btn"
                                                        onClick={() => handleDeleteImage(image)}
                                                    >
                                                        <IoMdCloseCircle />
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <span>Preview Image</span>
                                    )}
                                </div>
                            </div>
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

export default ModalUpdateRoom;

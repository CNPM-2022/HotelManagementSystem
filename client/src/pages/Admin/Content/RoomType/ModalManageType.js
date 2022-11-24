import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import _ from 'lodash';

function ModalManageType({ show, setShow, modalType, title, dataType = {}, fetchAllRoomTypes }) {
    const [type, setType] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [images, setImages] = useState(null);
    const [imagesSource, setImagesSource] = useState([]);

    useEffect(() => {
        if (show && !_.isEmpty(dataType) && modalType !== 'CREATE') {
            setType(dataType.typeOfRooms);
            setPrice(dataType.price);
            setDescription(dataType.description);
            setType(dataType.typeOfRooms);
        }
    }, [show]);

    const handleFilesChange = (event) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            setImagesSource(Array.from(files).map((file) => URL.createObjectURL(file)));
        }
    };

    const handleClose = () => {
        // Xoa cac file preview
        imagesSource.forEach((imageSource) => URL.revokeObjectURL(imageSource));

        setType('');
        setPrice();
        setDescription('');
        setImages(null);
        setImagesSource([]);
        setShow(false);
    };

    return (
        <>
            <Modal className="modal-manage-type" show={show} onHide={handleClose} backdrop="static" size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Type</label>
                                <input
                                    value={type}
                                    onChange={(event) => setType(event.target.value)}
                                    type="text"
                                    className="form-control"
                                    disabled={modalType === 'VIEW'}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Price</label>
                                <input
                                    value={price}
                                    onChange={(event) => setPrice(+event.target.value)}
                                    type="text"
                                    className="form-control"
                                    disabled={modalType === 'VIEW'}
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
                                />
                            </div>
                            <div className="col-md-12">
                                <label
                                    htmlFor={`upload-type-image-${dataType._id}`}
                                    className="btn btn-success upload-images-btn"
                                >
                                    <BsFillPlusCircleFill />
                                    Upload file images
                                </label>

                                <input
                                    onChange={handleFilesChange}
                                    id={`upload-type-image-${dataType._id}`}
                                    type="file"
                                    multiple
                                    hidden
                                    disabled={modalType === 'VIEW'}
                                />

                                <div className="preview-images">
                                    {imagesSource && imagesSource.length > 0 ? (
                                        <div className="row">
                                            {imagesSource.map((imageSource) => (
                                                <div key={imageSource} className="col-3">
                                                    <div className="preview-item">
                                                        <img src={imageSource} alt="Preview room type" />
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
                    {modalType !== 'VIEW' && (
                        <Button variant="primary" onClick={handleClose}>
                            Save
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalManageType;

import { Button, Modal } from 'react-bootstrap';
import Select from 'react-select';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { AiFillCalendar } from 'react-icons/ai';
import { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';

import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { putUpdateRoom } from '../../../../services/apiServices';
import useClickOutside from '../../../../hooks/useClickOutside';

function ModalManageRoom({ show, setShow, modalType, typeOptions, dataRoom, fetchAllRooms }) {
    const [roomNumber, setRoomNumber] = useState('');
    const [capacity, setCapacity] = useState(0);
    const [type, setType] = useState(null);
    const [description, setDescription] = useState('');
    const [note, setNote] = useState('');
    const [images, setImages] = useState(null);
    const [imagesSource, setImagesSource] = useState([]);
    const [dateRange, setDateRange] = useState([
        {
            startDate: null,
            endDate: null,
            key: 'selection',
        },
    ]);
    const [isShowDateRange, setIsShowDateRange] = useState(false);

    const dateRangeRef = useRef(null);
    useClickOutside(dateRangeRef, () => setIsShowDateRange(false));

    useEffect(() => {
        if (show && !_.isEmpty(dataRoom)) {
            setRoomNumber(dataRoom.roomNumber);
            setCapacity(dataRoom.maxCount);
            setType(() => typeOptions.find((type) => type.value === dataRoom.type));
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

    // Format date
    const padTo2Digits = (num) => {
        return num.toString().padStart(2, '0');
    };

    const formatDate = (date) => {
        return [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join('/');
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
                            <div className="date-range" ref={dateRangeRef}>
                                <label className="form-label">Date range</label>
                                <div
                                    className="form-control date-content"
                                    onClick={() => setIsShowDateRange((prev) => !prev)}
                                >
                                    <span className="calendar">
                                        <AiFillCalendar />
                                    </span>
                                    {dateRange[0]?.startDate && dateRange[0]?.endDate ? (
                                        <span className="text">
                                            {formatDate(dateRange[0].startDate)} - {formatDate(dateRange[0].endDate)}
                                        </span>
                                    ) : (
                                        <span>span</span>
                                    )}
                                </div>
                                {isShowDateRange && (
                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={(item) => setDateRange([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={dateRange}
                                        minDate={new Date()}
                                        startDatePlaceholder="Check-in date"
                                        endDatePlaceholder="Check-out date"
                                    />
                                )}
                            </div>
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

import { Button, Modal } from 'react-bootstrap';
import Select from 'react-select';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import _ from 'lodash';

import DateRange from '../../../../components/DateRange/DateRange';
import { putUpdateRoom } from '../../../../services/apiServices';

function ModalManageRoom({ show, setShow, modalType, typeOptions, dataRoom, fetchAllRooms, setCurrentPage }) {
    const initalDateRange = [
        {
            startDate: null,
            endDate: null,
            key: 'selection',
            disabled: modalType === 'VIEW',
        },
    ];
    const [roomNumber, setRoomNumber] = useState('');
    const [capacity, setCapacity] = useState(0);
    const [type, setType] = useState(null);
    const [description, setDescription] = useState('');
    const [note, setNote] = useState('');
    const [images, setImages] = useState(null);
    const [imagesSource, setImagesSource] = useState([]);
    const [dateRange, setDateRange] = useState(initalDateRange);
    const [isShowDateRange, setIsShowDateRange] = useState(false);

    useEffect(() => {
        if (show && !_.isEmpty(dataRoom)) {
            setRoomNumber(dataRoom.roomNumber);
            setCapacity(dataRoom.maxCount);
            setType(() => typeOptions.find((type) => type.value === dataRoom.type));
            setDescription(dataRoom.description);
            setNote(dataRoom.note);
            if (dataRoom.imageUrls.length > 0) {
                setImagesSource(
                    dataRoom.imageUrls.map((image) => `${process.env.REACT_APP_SERVER_URL}${image.filePath}`),
                );
            }
            if (dataRoom.rentperDate && dataRoom.checkOutDate) {
                setDateRange([
                    {
                        startDate: new Date(dataRoom.rentperDate),
                        endDate: new Date(dataRoom.checkOutDate),
                        key: 'selection',
                        disabled: modalType === 'VIEW',
                    },
                ]);
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

    const handleChangeDateRange = (item) => setDateRange([item.selection]);

    const handleClose = () => {
        if (imagesSource.length > 0) {
            imagesSource.forEach((imageSource) => URL.revokeObjectURL(imageSource));
        }
        setDateRange(initalDateRange);
        setImagesSource([]);
        setImages(null);
        setShow(false);
        setIsShowDateRange(false);
    };

    const addDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };

    const handleUpdateRoom = async () => {
        let isValidRoom = true;

        if (!roomNumber) {
            toast.error(`Not empty number!`);
            isValidRoom = false;
        } else {
            if (isNaN(parseInt(roomNumber))) {
                toast.error(`Invalid room number!`);
                isValidRoom = false;
            }
        }

        if (capacity < 0 || isNaN(capacity)) {
            toast.error(`Invalid capacity!`);
            isValidRoom = false;
        }

        if (_.isEmpty(imagesSource)) {
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

            if (images) {
                for (let i = 0; i < images.length; i++) {
                    formData.append('images', images[i]);
                }
            }

            formData.append('description', description);
            formData.append('type', type.value);
            formData.append('note', note);
            formData.append('maxCount', capacity);

            if (dateRange[0].startDate && dateRange[0].endDate) {
                formData.append('rentperDate', addDays(dateRange[0].startDate, 1));
                formData.append('checkOutDate', addDays(dateRange[0].endDate, 1));
            }

            const res = await putUpdateRoom(dataRoom._id, formData);

            if (res && res.data && res.data.success === true) {
                toast.success(res.data.message);
            } else {
                toast.error(res.message);
            }

            fetchAllRooms();
            setCurrentPage(1);
            handleClose();
        }
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop={modalType === 'VIEW' ? true : 'static'}
            size="xl"
            className="modal-manage-room"
        >
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật thông tin Phòng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Phòng</label>
                            <input
                                value={roomNumber}
                                onChange={(event) => setRoomNumber(event.target.value)}
                                type="text"
                                className="form-control"
                                disabled={modalType === 'VIEW'}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Sức chứa</label>
                            <input
                                value={capacity}
                                onChange={(event) => setCapacity(+event.target.value)}
                                type="text"
                                className="form-control"
                                disabled={modalType === 'VIEW'}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Loại</label>
                            <Select
                                value={type}
                                onChange={(selected) => setType(selected)}
                                options={typeOptions}
                                placeholder="Chọn loại phòng..."
                                isDisabled={modalType === 'VIEW'}
                            />
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-label">Ngày nhận/trả phòng</label>
                                <DateRange
                                    handleChangeDateRange={handleChangeDateRange}
                                    dateRange={dateRange}
                                    isShowDateRange={isShowDateRange}
                                    setIsShowDateRange={setIsShowDateRange}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Mô tả</label>
                            <textarea
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                className="form-control description"
                                placeholder="Mô tả"
                                disabled={modalType === 'VIEW'}
                            ></textarea>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Ghi chú</label>
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
                                htmlFor={`upload-room-images-${dataRoom._id}`}
                                className="btn btn-success upload-images-btn"
                            >
                                <BsFillPlusCircleFill />
                                Tải ảnh mới
                            </label>

                            <input
                                onChange={handleChangeImageFiles}
                                type="file"
                                id={`upload-room-images-${dataRoom._id}`}
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
                                        <span>Xem trước hình ảnh</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                {modalType === 'UPDATE' && (
                    <Button variant="primary" onClick={handleUpdateRoom}>
                        Lưu
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
}

export default ModalManageRoom;

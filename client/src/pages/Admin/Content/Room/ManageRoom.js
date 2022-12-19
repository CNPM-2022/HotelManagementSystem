import { useEffect, useReducer, useRef, useState } from 'react';
import { Accordion, Tab, Tabs } from 'react-bootstrap';
import { RiImageAddFill } from 'react-icons/ri';
import { BsFillPatchPlusFill, BsPatchMinusFill } from 'react-icons/bs';
import Lightbox from 'react-18-image-lightbox';
import Select from 'react-select';
import 'react-18-image-lightbox/style.css';
import { toast } from 'react-toastify';
import _ from 'lodash';

import './ManageRoom.scss';
import reducer, { initState } from './roomReducer/reducer';
import {
    addRoom,
    deleteRoom,
    setRoomDescription,
    setRoomNumber,
    setRoomNote,
    setRoomType,
    setRoomFiles,
    setRooms,
} from './roomReducer/actions';
import { getAllRooms, getAllRoomTypes, postCreateRoom } from '../../../../services/apiServices';
import TableRoom from './TableRoom';
import ModalDeleteRoom from './ModalDeleteRoom';
import ModalManageRoom from './ModalManageRoom';

function ManageRoom() {
    const statusSelectRef = useRef();
    const typeSelectRef = useRef();

    const [roomsState, dispatch] = useReducer(reducer, initState);
    const [typeOptions, setTypeOptions] = useState([]);
    const [listRooms, setListRooms] = useState([]);
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [previewIndex, setPreviewIndex] = useState(0);
    const [images, setImages] = useState('');

    const [isShowModalDeleteRoom, setIsShowModalDeleteRoom] = useState(false);
    const [dataRoomDelete, setDataRoomDelete] = useState({});
    const [isShowModalUpdateRoom, setIsShowModalUpdateRoom] = useState(false);
    const [dataRoomUpdate, setDataRoomUpdate] = useState({});
    const [isShowModalViewRoom, setIsShowModalViewRoom] = useState(false);
    const [dataRoomView, setDataRoomView] = useState({});

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchAllRooms();
        fetchAllRoomTypes();
    }, []);

    const fetchAllRooms = async () => {
        const res = await getAllRooms();

        if (res.status !== 200) return;
        if (res.data.success === false) return;

        res.data.data.map((item) => {
            item.roomNumber = +item.roomNumber;
            return item;
        });
        const data = _.orderBy(res.data.data, ['type', 'roomNumber'], ['asc', 'asc']);

        setListRooms(data);
    };

    const fetchAllRoomTypes = async () => {
        const res = await getAllRoomTypes();

        if (res.status !== 200) return;
        if (res.data.success === false) return;

        setTypeOptions(res.data.data.map((item) => ({ label: item.typeOfRooms, value: item.typeOfRooms })));
    };

    const handleChangeImageFiles = (event, roomId) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            dispatch(
                setRoomFiles({
                    id: roomId,
                    imageFiles: files,
                }),
            );
        }
    };

    const handlePreviewImage = (images, index) => {
        const imageFiles = Array.from(images).map((file) => {
            const imageUrl = URL.createObjectURL(file);
            return {
                url: imageUrl,
                name: file.name,
            };
        });

        setImages(imageFiles);
        setPreviewIndex(index);
        setIsPreviewImage(true);
    };

    const handleAddRoom = async () => {
        // Validate
        let isValidRooms = true;
        for (let i = 0; i < roomsState.length; i++) {
            if (!roomsState[i].number) {
                toast.error(`Not empty number for Room ${i + 1}!`);
                isValidRooms = false;
            } else {
                if (isNaN(parseInt(roomsState[i].number))) {
                    toast.error(`Invalid room number for Room ${i + 1}!`);
                    isValidRooms = false;
                }
            }

            if (_.isEmpty(roomsState[i].imageFiles)) {
                toast.error(`Not empty images for Room ${i + 1}!`);
                isValidRooms = false;
            }

            if (!roomsState[i].description) {
                toast.error(`Not empty description for Room ${i + 1}!`);
                isValidRooms = false;
            }

            if (!roomsState[i].type) {
                toast.error(`Not empty type for Room ${i + 1}!`);
                isValidRooms = false;
            }

            if (!roomsState[i].note) {
                toast.error(`Not empty note for Room ${i + 1}!`);
                isValidRooms = false;
            }
        }

        if (isValidRooms) {
            // Add rooms
            for (let i = 0; i < roomsState.length; i++) {
                const formData = new FormData();
                formData.append('roomNumber', roomsState[i].number);
                for (let j = 0; j < roomsState[i].imageFiles.length; j++) {
                    formData.append('images', roomsState[i].imageFiles[j]);
                }

                formData.append('description', roomsState[i].description);
                formData.append('type', roomsState[i].type);
                formData.append('note', roomsState[i].note);
                formData.append('maxCount', 3);

                const res = await postCreateRoom(formData);

                if (res && res.data && res.data.success === true) {
                    toast.success(res.data.message);
                } else {
                    toast.error(res.message);
                }
            }

            // Revoke image preview
            if (images.length > 0) {
                images.forEach((image) => URL.revokeObjectURL(image.url));
            }

            // Clear state
            dispatch(setRooms(initState));
            fetchAllRooms();
            if (typeSelectRef.current) typeSelectRef.current.clearValue();
            if (statusSelectRef.current) statusSelectRef.current.clearValue();

            //
            setCurrentPage(1);
        }
    };

    const handleChangeType = (selected, roomId) => {
        if (selected && selected.value) {
            dispatch(
                setRoomType({
                    id: roomId,
                    type: selected.value,
                }),
            );
        }
    };

    return (
        <>
            <div className="manage-room-container">
                <Tabs defaultActiveKey="list-rooms" className="mb-3" fill>
                    <Tab eventKey="list-rooms" title="Danh sách phòng">
                        <div className="content-table mt-5">
                            <TableRoom
                                listRooms={listRooms}
                                typeOptions={typeOptions}
                                setIsShowModalDeleteRoom={setIsShowModalDeleteRoom}
                                setDataRoomDelete={setDataRoomDelete}
                                setIsShowModalUpdateRoom={setIsShowModalUpdateRoom}
                                setDataRoomUpdate={setDataRoomUpdate}
                                setIsShowModalViewRoom={setIsShowModalViewRoom}
                                setDataRoomView={setDataRoomView}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                    </Tab>
                    <Tab eventKey="add-room" title="Thêm phòng">
                        <div className="body">
                            <div className="manage-room">
                                <h4 className="">Thêm phòng:</h4>
                                <br />

                                <div className="room-list">
                                    {roomsState &&
                                        roomsState.length > 0 &&
                                        roomsState.map((room, index) => (
                                            <div key={room.id} className="room-item mb-3">
                                                <div className="room-action mb-2">
                                                    <div className="form-floating">
                                                        <input
                                                            value={room.number}
                                                            onChange={(event) =>
                                                                dispatch(
                                                                    setRoomNumber({
                                                                        id: room.id,
                                                                        number: event.target.value,
                                                                    }),
                                                                )
                                                            }
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Phòng"
                                                        />
                                                        <label>Phòng {index + 1}</label>
                                                    </div>

                                                    <div className="btn-group">
                                                        <span onClick={() => dispatch(addRoom({ id: room.id }))}>
                                                            <BsFillPatchPlusFill className="icon-add" />
                                                        </span>
                                                        {roomsState.length > 1 && (
                                                            <span onClick={() => dispatch(deleteRoom({ id: room.id }))}>
                                                                <BsPatchMinusFill className="icon-remove" />
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="group-upload">
                                                    <label
                                                        htmlFor={`upload-room-image-${room.id}`}
                                                        className="label-upload"
                                                    >
                                                        <RiImageAddFill />
                                                    </label>
                                                    <input
                                                        onChange={(event) => handleChangeImageFiles(event, room.id)}
                                                        type="file"
                                                        name="images"
                                                        hidden
                                                        id={`upload-room-image-${room.id}`}
                                                        multiple
                                                    />
                                                    <span>
                                                        {room.imageFiles.length > 0
                                                            ? Array.from(room.imageFiles).map((image, index) => (
                                                                  <span
                                                                      key={index}
                                                                      className="preview-image"
                                                                      onClick={() =>
                                                                          handlePreviewImage(room.imageFiles, index)
                                                                      }
                                                                  >
                                                                      {image.name}
                                                                  </span>
                                                              ))
                                                            : '0 tập tin được tải lên'}
                                                    </span>
                                                </div>

                                                <div className="room-info">
                                                    <div className="col-6">
                                                        <Select
                                                            ref={typeSelectRef}
                                                            className="room-type"
                                                            placeholder="Loại phòng..."
                                                            options={typeOptions}
                                                            onChange={(selected) => handleChangeType(selected, room.id)}
                                                        />
                                                    </div>

                                                    <div className="form-floating">
                                                        <textarea
                                                            value={room.description}
                                                            onChange={(event) =>
                                                                dispatch(
                                                                    setRoomDescription({
                                                                        id: room.id,
                                                                        description: event.target.value,
                                                                    }),
                                                                )
                                                            }
                                                            className="form-control description mb-2"
                                                            placeholder="Mô tả"
                                                        ></textarea>
                                                        <label>Mô tả</label>
                                                    </div>

                                                    <div className="form-floating">
                                                        <input
                                                            value={room.note}
                                                            onChange={(event) =>
                                                                dispatch(
                                                                    setRoomNote({
                                                                        id: room.id,
                                                                        note: event.target.value,
                                                                    }),
                                                                )
                                                            }
                                                            type="text"
                                                            className="form-control mb-2"
                                                            placeholder="Ghi chú"
                                                        />
                                                        <label>Ghi chú</label>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>

                                <div className="submit-manage">
                                    <button className="btn btn-warning" onClick={handleAddRoom}>
                                        Lưu
                                    </button>
                                </div>
                            </div>
                        </div>

                        {isPreviewImage && (
                            <Lightbox
                                mainSrc={images[previewIndex].url}
                                nextSrc={images[(previewIndex + 1) % images.length].url}
                                prevSrc={images[(previewIndex + images.length - 1) % images.length].url}
                                onCloseRequest={() => setIsPreviewImage(false)}
                                onMovePrevRequest={() =>
                                    setPreviewIndex((previewIndex + images.length - 1) % images.length)
                                }
                                onMoveNextRequest={() => setPreviewIndex((previewIndex + 1) % images.length)}
                            />
                        )}
                    </Tab>
                </Tabs>
            </div>

            <ModalDeleteRoom
                show={isShowModalDeleteRoom}
                setShow={setIsShowModalDeleteRoom}
                dataRoomDelete={dataRoomDelete}
                fetchAllRooms={fetchAllRooms}
                setCurrentPage={setCurrentPage}
            />

            <ModalManageRoom
                modalType="UPDATE"
                show={isShowModalUpdateRoom}
                setShow={setIsShowModalUpdateRoom}
                dataRoom={dataRoomUpdate}
                fetchAllRooms={fetchAllRooms}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                typeOptions={typeOptions}
            />

            <ModalManageRoom
                modalType="VIEW"
                show={isShowModalViewRoom}
                setShow={setIsShowModalViewRoom}
                dataRoom={dataRoomView}
                fetchAllRooms={fetchAllRooms}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                typeOptions={typeOptions}
            />
        </>
    );
}

export default ManageRoom;

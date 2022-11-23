import { useEffect, useReducer, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { RiImageAddFill } from 'react-icons/ri';
import { BsFillPatchPlusFill, BsPatchMinusFill } from 'react-icons/bs';
import Lightbox from 'react-18-image-lightbox';
import Select from 'react-select';
import 'react-18-image-lightbox/style.css';
import { toast } from 'react-toastify';

import './ManageRoom.scss';
import reducer, { initState } from './roomReducer/reducer';
import logger from './roomReducer/logger';
import {
    addRoom,
    deleteRoom,
    setRoomDescription,
    setRoomNumber,
    setRoomNote,
    setRoomStatus,
    setRoomType,
    setRoomFiles,
    setRooms,
} from './roomReducer/actions';
import AssignRoom from './AssignRoom';
import { getAllRooms, getAllUsers, postCreateRoom } from '../../../../services/apiServices';
import RemoveRoom from './RemoveRoom';
import TableRoom from './TableRoom';
import _ from 'lodash';
import ModalDeleteRoom from './ModalDeleteRoom';
import ModalUpdateRoom from './ModalUpdateRoom';

function ManageRoom() {
    const statusOptions = [
        { value: 'Available', label: 'Available' },
        { value: 'Unavailable', label: 'Unavailable' },
    ];

    const typeOptions = [
        { value: 'A', label: 'A' },
        { value: 'B', label: 'B' },
        { value: 'C', label: 'C' },
    ];

    const [roomsState, dispatch] = useReducer(logger(reducer), initState);
    const [roomOptions, setRoomOptions] = useState([]);
    const [userOptions, setUserOptions] = useState([]);
    const [listRooms, setListRooms] = useState([]);
    const [listUsers, setListUsers] = useState([]);
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [previewIndex, setPreviewIndex] = useState(0);
    const [images, setImages] = useState('');

    const [isShowModalDeleteRoom, setIsShowModalDeleteRoom] = useState(false);
    const [dataRoomDelete, setDataRoomDelete] = useState({});
    const [isShowModalUpdateRoom, setIsShowModalUpdateRoom] = useState(false);
    const [dataRoomUpdate, setDataRoomUpdate] = useState({});

    useEffect(() => {
        fetchAllUsers();
        fetchAllRooms();
    }, []);

    const fetchAllUsers = async () => {
        const res = await getAllUsers();

        if (res.status !== 200) return;
        if (res.data.success === false) return;

        const data = res.data.users.map((user, index) => ({
            value: user._id,
            label: `${index + 1} - ${user.Name} - ${user.email}`,
        }));

        setUserOptions(data);
        setListUsers(res.data.users);
    };

    const fetchAllRooms = async () => {
        const res = await getAllRooms();

        if (res.status !== 200) return;
        if (res.data.success === false) return;

        const data = res.data.data.map((room) => ({
            value: room._id,
            label: `${room.roomNumber} - type ${room.type}`,
        }));

        setRoomOptions(data);
        setListRooms(res.data.data);
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
        for (let i = 0; i < roomsState.length; i++) {
            let isValidRoom = true;

            if (!roomsState[i].number) {
                toast.error(`Not empty number for Room ${i + 1}!`);
                isValidRoom = false;
            }

            if (_.isEmpty(roomsState[i].imageFiles)) {
                toast.error(`Not empty images for Room ${i + 1}!`);
                isValidRoom = false;
            }

            if (!roomsState[i].description) {
                toast.error(`Not empty description for Room ${i + 1}!`);
                isValidRoom = false;
            }

            if (!roomsState[i].type) {
                toast.error(`Not empty type for Room ${i + 1}!`);
                isValidRoom = false;
            }

            if (!roomsState[i].status) {
                toast.error(`Not empty status for Room ${i + 1}!`);
                isValidRoom = false;
            }
            if (isValidRoom) {
                const formData = new FormData();

                formData.append('roomNumber', roomsState[i].number);
                for (let j = 0; j < roomsState[i].imageFiles.length; j++) {
                    formData.append('images', roomsState[i].imageFiles[j]);
                }

                formData.append('status', roomsState[i].status);
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
        }

        dispatch(setRooms(initState));
        fetchAllRooms();
    };

    return (
        <>
            <div className="manage-room-container">
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Add rooms</Accordion.Header>
                        <Accordion.Body>
                            <div className="body">
                                <div className="manage-room">
                                    <label className="form-label">Add rooms:</label>

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
                                                                placeholder="Room numer"
                                                            />
                                                            <label>Room's {index + 1} number</label>
                                                        </div>

                                                        <div className="btn-group">
                                                            <span onClick={() => dispatch(addRoom({ id: room.id }))}>
                                                                <BsFillPatchPlusFill className="icon-add" />
                                                            </span>
                                                            {roomsState.length > 1 && (
                                                                <span
                                                                    onClick={() =>
                                                                        dispatch(deleteRoom({ id: room.id }))
                                                                    }
                                                                >
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
                                                                : '0 file is uploaded'}
                                                        </span>
                                                    </div>

                                                    <div className="room-info">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <Select
                                                                    className="room-type"
                                                                    placeholder="Room type..."
                                                                    options={typeOptions}
                                                                    onChange={(selected) =>
                                                                        dispatch(
                                                                            setRoomType({
                                                                                id: room.id,
                                                                                type: selected.value,
                                                                            }),
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="col-6">
                                                                <Select
                                                                    className="room-status"
                                                                    options={statusOptions}
                                                                    placeholder="Status..."
                                                                    onChange={(selected) =>
                                                                        dispatch(
                                                                            setRoomStatus({
                                                                                id: room.id,
                                                                                status: selected.value,
                                                                            }),
                                                                        )
                                                                    }
                                                                />
                                                            </div>
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
                                                                placeholder="Description"
                                                            ></textarea>
                                                            <label>Description</label>
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
                                                                placeholder="Note"
                                                            />
                                                            <label>Note</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>

                                    <div className="submit-manage">
                                        <button className="btn btn-warning" onClick={handleAddRoom}>
                                            Save
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
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Assign Room to User</Accordion.Header>
                        <Accordion.Body>
                            <AssignRoom userOptions={userOptions} roomOptions={roomOptions} />
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Remove Room from User</Accordion.Header>
                        <Accordion.Body>
                            <RemoveRoom userOptions={userOptions} />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                <div className="content-table mt-5">
                    <TableRoom
                        listRooms={listRooms}
                        setIsShowModalDeleteRoom={setIsShowModalDeleteRoom}
                        setDataRoomDelete={setDataRoomDelete}
                        setIsShowModalUpdateRoom={setIsShowModalUpdateRoom}
                        setDataRoomUpdate={setDataRoomUpdate}
                    />
                </div>
            </div>

            <ModalDeleteRoom
                show={isShowModalDeleteRoom}
                setShow={setIsShowModalDeleteRoom}
                dataRoomDelete={dataRoomDelete}
                fetchAllRooms={fetchAllRooms}
            />

            <ModalUpdateRoom
                show={isShowModalUpdateRoom}
                setShow={setIsShowModalUpdateRoom}
                dataRoomUpdate={dataRoomUpdate}
                fetchAllRooms={fetchAllRooms}
            />
        </>
    );
}

export default ManageRoom;

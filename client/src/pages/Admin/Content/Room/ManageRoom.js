import { useEffect, useReducer, useState } from 'react';
import { Form, Accordion } from 'react-bootstrap';
import { RiImageAddFill } from 'react-icons/ri';
import { BsFillPatchPlusFill, BsPatchMinusFill } from 'react-icons/bs';
import Lightbox from 'react-18-image-lightbox';
import Select from 'react-select';
import 'react-18-image-lightbox/style.css';

import './ManageRoom.scss';
import reducer, { initState } from './roomReducer/reducer';
import logger from './roomReducer/logger';
import {
    addRoom,
    deleteRoom,
    setRoomDescription,
    setRoomFile,
    setRoomName,
    setRoomNote,
    setRoomPrice,
} from './roomReducer/actions';
import AssignRoom from './AssignRoom';
import { getAllRooms, getAllUsers } from '../../../../services/apiServices';
import RemoveRoom from './RemoveRoom';

function ManageRoom() {
    const roomTypes = [
        { value: 'A', label: 'A' },
        { value: 'B', label: 'B' },
        { value: 'C', label: 'C' },
    ];

    const [allRooms, setAllRooms] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [listRooms, dispatch] = useReducer(logger(reducer), initState);
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [image, setImage] = useState('');

    useEffect(() => {
        fetchAllUsers();
        fetchAllRooms();
    }, []);

    const fetchAllUsers = async () => {
        const res = await getAllUsers();

        if (res.status !== 200) return;

        const data = res.data.users.map((user, index) => ({
            value: user._id,
            label: `${index + 1} - ${user.Name} - ${user.email}`,
        }));

        setAllUsers(data);
    };

    const fetchAllRooms = async () => {
        const res = await getAllRooms();

        if (res.status !== 200) return;

        const data = res.data.map((room, index) => ({
            value: room._id,
            label: `${index + 1} - ${room.name} - type ${room.type}`,
        }));

        setAllRooms(data);
    };

    const handleChangeImageFile = (event, roomId) => {
        if (event.target.files[0]) {
            const imageUrl = URL.createObjectURL(event.target.files[0]);
            setImage(imageUrl);
            dispatch(setRoomFile({ id: roomId, imageFile: imageUrl }));
        }
    };

    return (
        <>
            <div className="manage-room-container">
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Add rooms</Accordion.Header>
                        <Accordion.Body>
                            <div className="body">
                                <div className="form-group mb-3">
                                    <label className="form-label">Choose Room type:</label>
                                    <Select options={roomTypes} />
                                </div>

                                <div className="manage-room">
                                    <label className="form-label">Add rooms:</label>

                                    <div className="room-list">
                                        {listRooms && listRooms.length > 0 ? (
                                            listRooms.map((room, index) => (
                                                <div key={room.id} className="room-item mb-3">
                                                    <div className="room-action mb-2">
                                                        <div className="form-floating">
                                                            <input
                                                                value={room.name}
                                                                onChange={(event) =>
                                                                    dispatch(
                                                                        setRoomName({
                                                                            id: room.id,
                                                                            name: event.target.value,
                                                                        }),
                                                                    )
                                                                }
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Room name"
                                                            />
                                                            <label>Room's {index + 1} name</label>
                                                        </div>

                                                        <div className="group-upload">
                                                            <label
                                                                htmlFor={`upload-room-image-${room.id}`}
                                                                className="label-upload"
                                                            >
                                                                <RiImageAddFill />
                                                            </label>
                                                            <input
                                                                onChange={(event) =>
                                                                    handleChangeImageFile(event, room.id)
                                                                }
                                                                type="file"
                                                                hidden
                                                                id={`upload-room-image-${room.id}`}
                                                            />
                                                            <span>
                                                                {room.imageFile ? (
                                                                    <span
                                                                        className="preview-image"
                                                                        onClick={() => setIsPreviewImage(true)}
                                                                    >
                                                                        room-{index + 1}.png
                                                                    </span>
                                                                ) : (
                                                                    '0 file is uploaded'
                                                                )}
                                                            </span>
                                                        </div>

                                                        <div className="btn-group">
                                                            <span onClick={() => dispatch(addRoom({ id: room.id }))}>
                                                                <BsFillPatchPlusFill className="icon-add" />
                                                            </span>
                                                            {listRooms.length > 1 && (
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
                                                    <div className="room-info">
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
                                                        <div className="row">
                                                            <div className="col-4">
                                                                <div className="form-floating">
                                                                    <input
                                                                        value={room.price}
                                                                        onChange={(event) =>
                                                                            dispatch(
                                                                                setRoomPrice({
                                                                                    id: room.id,
                                                                                    price: +event.target.value,
                                                                                }),
                                                                            )
                                                                        }
                                                                        type="text"
                                                                        className="form-control mb-2"
                                                                        placeholder="Price"
                                                                    />
                                                                    <label>Price</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-8">
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
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="room-item">
                                                <div className="room-action mb-2">
                                                    <div className="form-floating">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Room name"
                                                        />
                                                        <label>Room name</label>
                                                    </div>

                                                    <div className="group-upload">
                                                        <label htmlFor="upload-room-image" className="label-upload">
                                                            <RiImageAddFill />
                                                        </label>
                                                        <input type="file" hidden id="upload-room-image" />
                                                        <span>0 file is uploaded</span>
                                                    </div>

                                                    <div className="btn-group">
                                                        <span>
                                                            <BsFillPatchPlusFill className="icon-add" />
                                                        </span>
                                                        <span>
                                                            <BsPatchMinusFill className="icon-remove" />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="room-info">
                                                    <div className="form-floating">
                                                        <textarea
                                                            className="form-control description mb-2"
                                                            placeholder="Description"
                                                        ></textarea>
                                                        <label>Description</label>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-4">
                                                            <div className="form-floating">
                                                                <input
                                                                    type="text"
                                                                    className="form-control mb-2"
                                                                    placeholder="Price"
                                                                />
                                                                <label>Price</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-8">
                                                            <div className="form-floating">
                                                                <input
                                                                    type="text"
                                                                    className="form-control mb-2"
                                                                    placeholder="Note"
                                                                />
                                                                <label>Note</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="submit-manage">
                                        <button className="btn btn-danger">Save</button>
                                    </div>
                                </div>
                            </div>

                            {isPreviewImage && (
                                <Lightbox mainSrc={image} onCloseRequest={() => setIsPreviewImage(false)} />
                            )}
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Assign Room to User</Accordion.Header>
                        <Accordion.Body>
                            <AssignRoom listUsers={allUsers} listRooms={allRooms} />
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Remove Room from User</Accordion.Header>
                        <Accordion.Body>
                            <RemoveRoom listUsers={allUsers} />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </>
    );
}

export default ManageRoom;

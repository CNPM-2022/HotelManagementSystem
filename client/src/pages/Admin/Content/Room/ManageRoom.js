import { useReducer, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { RiImageAddFill } from 'react-icons/ri';
import { BsFillPatchPlusFill, BsPatchMinusFill } from 'react-icons/bs';
import Lightbox from 'react-18-image-lightbox';
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

function ManageRoom() {
    const [listRoom, dispatch] = useReducer(logger(reducer), initState);
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [image, setImage] = useState('');

    const handleChangeImageFile = (event, roomId) => {
        if (event.target.files[0]) {
            const imageUrl = URL.createObjectURL(event.target.files[0]);
            setImage(imageUrl);
            dispatch(setRoomFile({ id: roomId, imageFile: imageUrl }));
        }
    };

    return (
        <div className="manage-room-container">
            <h3>Manage Rooms</h3>

            <div className="body">
                <div className="form-group mb-3">
                    <label className="form-label">Choose Room type:</label>
                    <Form.Select>
                        <option>Open this select menu</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </Form.Select>
                </div>

                <div className="manage-room">
                    <label className="form-label">Add rooms:</label>

                    <div className="room-list">
                        {listRoom && listRoom.length > 0 ? (
                            listRoom.map((room, index) => (
                                <div key={room.id} className="room-item mb-3">
                                    <div className="room-action mb-2">
                                        <div className="form-floating">
                                            <input
                                                value={room.name}
                                                onChange={(event) =>
                                                    dispatch(setRoomName({ id: room.id, name: event.target.value }))
                                                }
                                                type="text"
                                                className="form-control"
                                                placeholder="Room name"
                                            />
                                            <label>Room's {index + 1} name</label>
                                        </div>

                                        <div className="group-upload">
                                            <label htmlFor={`upload-room-image-${room.id}`} className="label-upload">
                                                <RiImageAddFill />
                                            </label>
                                            <input
                                                onChange={(event) => handleChangeImageFile(event, room.id)}
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
                                            <span onClick={() => dispatch(deleteRoom({ id: room.id }))}>
                                                <BsPatchMinusFill className="icon-remove" />
                                            </span>
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
                                        <input type="text" className="form-control" placeholder="Room name" />
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
                                                <input type="text" className="form-control mb-2" placeholder="Price" />
                                                <label>Price</label>
                                            </div>
                                        </div>
                                        <div className="col-8">
                                            <div className="form-floating">
                                                <input type="text" className="form-control mb-2" placeholder="Note" />
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

            {isPreviewImage && <Lightbox mainSrc={image} onCloseRequest={() => setIsPreviewImage(false)} />}
        </div>
    );
}

export default ManageRoom;

import {
    ADD_ROOM,
    DELETE_ROOM,
    SET_ROOM_NAME,
    SET_ROOM_DESCRIPTION,
    SET_ROOM_FILE,
    SET_ROOM_PRICE,
    SET_ROOM_NOTE,
    SET_ROOMS,
} from './constants';

export const setRooms = (payload) => {
    return {
        type: SET_ROOMS,
        payload,
    };
};

export const addRoom = (payload) => {
    return {
        type: ADD_ROOM,
        payload,
    };
};

export const deleteRoom = (payload) => {
    return {
        type: DELETE_ROOM,
        payload,
    };
};

export const setRoomDescription = (payload) => {
    return {
        type: SET_ROOM_DESCRIPTION,
        payload,
    };
};

export const setRoomFile = (payload) => {
    return {
        type: SET_ROOM_FILE,
        payload,
    };
};

export const setRoomPrice = (payload) => {
    return {
        type: SET_ROOM_PRICE,
        payload,
    };
};

export const setRoomName = (payload) => {
    return {
        type: SET_ROOM_NAME,
        payload,
    };
};

export const setRoomNote = (payload) => {
    return {
        type: SET_ROOM_NOTE,
        payload,
    };
};

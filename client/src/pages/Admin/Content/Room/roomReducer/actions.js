import {
    ADD_ROOM,
    DELETE_ROOM,
    SET_ROOM_NUMBER,
    SET_ROOM_DESCRIPTION,
    SET_ROOM_FILES,
    SET_ROOM_PRICE,
    SET_ROOM_NOTE,
    SET_ROOM_STATUS,
    SET_ROOM_TYPE,
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

export const setRoomFiles = (payload) => {
    return {
        type: SET_ROOM_FILES,
        payload,
    };
};

export const setRoomPrice = (payload) => {
    return {
        type: SET_ROOM_PRICE,
        payload,
    };
};

export const setRoomNumber = (payload) => {
    return {
        type: SET_ROOM_NUMBER,
        payload,
    };
};

export const setRoomNote = (payload) => {
    return {
        type: SET_ROOM_NOTE,
        payload,
    };
};

export const setRoomStatus = (payload) => {
    return {
        type: SET_ROOM_STATUS,
        payload,
    };
};

export const setRoomType = (payload) => {
    return {
        type: SET_ROOM_TYPE,
        payload,
    };
};

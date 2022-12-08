import axios from '../utils/axiosCustomize';

export const postLogin = ({ username, password }) => {
    return axios.post('auth/login', {
        username,
        password,
    });
};

export const postRegister = (userInfor) => {
    return axios.post('auth/register', userInfor);
};

export const getAllUsers = () => {
    return axios.get('user/all');
};

export const getUsersOfPage = ({ page, perPage }) => {
    return axios.get(`user/${page}/${perPage}`);
};

export const postCreateUser = (dataUser) => {
    return axios.post('user/add', dataUser);
};

export const putUpdateUser = (userID, dataUser) => {
    return axios.put(`user/${userID}/change-info`, dataUser);
};

export const deleteUser = (userId) => {
    return axios.delete(`user/${userId}/delete`);
};

export const getAllRooms = () => {
    return axios.get('rooms/all');
};

export const getRoomsByPage = (page) => {
    return axios.get(`rooms/all/${page}`);
};

export const getRoomById = (id) => {
    return axios.get(`rooms/${id}`);
};

export const getAllRoomTypes = () => {
    return axios.get('room-type/all');
};

export const postCreateRoom = (data) => {
    return axios.post('rooms/createRoom', data);
};

export const deleteRoom = (id) => {
    return axios.delete(`rooms/deleteRoom/${id}`);
};

export const putUpdateRoom = (id, data) => {
    return axios.put(`rooms/updateRoom/${id}`, data);
};

export const postCreateRoomType = (data) => {
    return axios.post('room-type/create', data);
};

export const deleteRoomType = (id) => {
    return axios.delete(`room-type/delete/${id}`);
};

export const putUpdateRoomType = (id, data) => {
    return axios.put(`room-type/update/${id}`, data);
};

export const getUser = (userID) => {
    return axios.get(`user/${userID}`);
};

export const putChangePassword = (userID, newPassword) => {
    return axios.put(`user/${userID}/change-password`, newPassword);
};

export const postCreateBooking = (data) => {
    return axios.post('booking/create', data);
};

export const getRegulations = () => {
    return axios.get('quidinh/get');
};

export const putUpdateRegulations = (data) => {
    return axios.put('quidinh/update', data);
};

export const postCreateBill = (data) => {
    return axios.post('booking/create/bill', data);
};

export const getAllBills = () => {
    return axios.get('bill/all');
};

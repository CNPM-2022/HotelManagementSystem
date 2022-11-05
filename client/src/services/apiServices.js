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

export const getAllRooms = () => {
    return axios.get('rooms/allrooms');
};

export const getRoomById = (id) => {
    return axios.get(`rooms/${id}`);
};

export const getAllUsers = () => {
    return axios.get('user/all');
};

export const postCreateUser = (dataUser) => {
    return axios.post('user/add', dataUser);
};

export const putUpdateUser = (dataUser) => {
    return axios.put(`user/${dataUser.id}/change-info`, dataUser);
};

export const deleteUser = (userId) => {
    return axios.delete(`user/${userId}/delete`);
};

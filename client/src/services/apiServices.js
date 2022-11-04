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

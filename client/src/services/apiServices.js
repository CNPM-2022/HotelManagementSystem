import axios from '../utils/axiosCustomize';

export const postLogin = ({ username, password }) => {
    return axios.post('auth/login', {
        username,
        password,
    });
};

export const postRegister = ({ username, password }) => {
    return axios.post('auth/register', {
        username,
        password,
    });
};

export const getAllRooms = () => {
    return axios.get('rooms/allrooms');
};

export const getRoomById = (id) => {
    return axios.get(`rooms/${id}`);
};

import axios from 'axios';
import NProgress from 'nprogress';
import store from '../store/store';

NProgress.configure({
    showSpinner: false,
    trickleSpeed: 50,
});

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const access_token = store.getState().auth?.token;

        if (access_token) {
            config.headers.Authorization = `Bearer ${access_token}`;
        }

        NProgress.start();
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        NProgress.done();
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        NProgress.done();
        return error.response?.data ? error.response?.data : Promise.reject(error);
        // return Promise.reject(error);
    },
);

export default instance;

import {
    ADD_CUSTOMER,
    DELETE_CUSTOMER,
    SET_CUSTOMER_NAME,
    SET_CUSTOMER_IDENTITY,
    SET_CUSTOMER_TYPE,
    SET_CUSTOMER_ADDRESS,
    SET_CUSTOMERS,
} from './constants';

export const setCustomers = (payload) => {
    return {
        type: SET_CUSTOMERS,
        payload,
    };
};

export const addCustomer = (payload) => {
    return {
        type: ADD_CUSTOMER,
        payload,
    };
};

export const deleteCustomer = (payload) => {
    return {
        type: DELETE_CUSTOMER,
        payload,
    };
};

export const setCustomerName = (payload) => {
    return {
        type: SET_CUSTOMER_NAME,
        payload,
    };
};

export const setCustomerAddress = (payload) => {
    return {
        type: SET_CUSTOMER_ADDRESS,
        payload,
    };
};

export const setCustomerType = (payload) => {
    return {
        type: SET_CUSTOMER_TYPE,
        payload,
    };
};

export const setCustomerIdentity = (payload) => {
    return {
        type: SET_CUSTOMER_IDENTITY,
        payload,
    };
};

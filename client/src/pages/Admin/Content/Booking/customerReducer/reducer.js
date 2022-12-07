import {
    ADD_CUSTOMER,
    DELETE_CUSTOMER,
    SET_CUSTOMER_NAME,
    SET_CUSTOMER_ADDRESS,
    SET_CUSTOMER_IDENTITY,
    SET_CUSTOMER_TYPE,
    SET_CUSTOMERS,
} from './constants';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

export const initState = [
    {
        id: uuidv4(),
        name: '',
        identity: '',
        type: 'Inland',
        address: '',
    },
];

const reducer = (state, action) => {
    const stateClone = _.cloneDeep(state);

    if (action.type === SET_CUSTOMERS) {
        return [...action.payload];
    }

    if (action.type === ADD_CUSTOMER) {
        const newCustomer = {
            id: uuidv4(),
            name: '',
            identity: '',
            type: 'Inland',
            address: '',
        };

        stateClone.push(newCustomer);
        return stateClone;
    }

    let customerIndex = stateClone.findIndex((customer) => customer.id === action.payload.id);
    if (customerIndex === -1) return stateClone;

    switch (action.type) {
        case DELETE_CUSTOMER:
            stateClone.splice(customerIndex, 1);
            return stateClone;
        case SET_CUSTOMER_NAME:
            stateClone[customerIndex].name = action.payload.name;
            return stateClone;
        case SET_CUSTOMER_ADDRESS:
            stateClone[customerIndex].address = action.payload.address;
            return stateClone;
        case SET_CUSTOMER_IDENTITY:
            stateClone[customerIndex].identity = action.payload.identity;
            return stateClone;
        case SET_CUSTOMER_TYPE:
            stateClone[customerIndex].type = action.payload.type;
            return stateClone;
        default:
            throw new Error('Invalid action');
    }
};

export default reducer;

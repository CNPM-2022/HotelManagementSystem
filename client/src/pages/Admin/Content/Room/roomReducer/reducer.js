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
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

export const initState = [
    {
        id: uuidv4(),
        name: '',
        description: '',
        imageFile: '',
        price: 0,
        note: '',
    },
];

const reducer = (state, action) => {
    const stateClone = _.cloneDeep(state);
    let roomIndex = stateClone.findIndex((room) => room.id === action.payload.id);

    if (roomIndex === -1) return stateClone;

    switch (action.type) {
        case SET_ROOMS:
            return [...action.payload];
        case ADD_ROOM:
            const newRoom = {
                id: uuidv4(),
                name: '',
                description: '',
                imageFile: '',
                price: 0,
                note: '',
            };

            stateClone.splice(roomIndex + 1, 0, newRoom);
            return stateClone;
        case DELETE_ROOM:
            stateClone.splice(roomIndex, 1);
            return stateClone;
        case SET_ROOM_NAME:
            stateClone[roomIndex].name = action.payload.name;
            return stateClone;
        case SET_ROOM_FILE:
            stateClone[roomIndex].imageFile = action.payload.imageFile;
            return stateClone;
        case SET_ROOM_DESCRIPTION:
            stateClone[roomIndex].description = action.payload.description;
            return stateClone;
        case SET_ROOM_PRICE:
            stateClone[roomIndex].price = +action.payload.price;
            return stateClone;
        case SET_ROOM_NOTE:
            stateClone[roomIndex].note = action.payload.note;
            return stateClone;
        default:
            throw new Error('Invalid action');
    }
};

export default reducer;

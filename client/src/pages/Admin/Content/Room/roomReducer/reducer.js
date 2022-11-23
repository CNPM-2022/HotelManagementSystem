import {
    ADD_ROOM,
    DELETE_ROOM,
    SET_ROOM_NUMBER,
    SET_ROOM_DESCRIPTION,
    SET_ROOM_FILES,
    SET_ROOM_PRICE,
    SET_ROOM_NOTE,
    SET_ROOMS,
    SET_ROOM_STATUS,
    SET_ROOM_TYPE,
} from './constants';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

export const initState = [
    {
        id: uuidv4(),
        number: '',
        description: '',
        imageFiles: [],
        status: '',
        note: '',
        type: '',
    },
];

const reducer = (state, action) => {
    const stateClone = _.cloneDeep(state);

    if (action.type === SET_ROOMS) {
        return [...action.payload];
    }

    let roomIndex = stateClone.findIndex((room) => room.id === action.payload.id);
    if (roomIndex === -1) return stateClone;

    switch (action.type) {
        case ADD_ROOM:
            const newRoom = {
                id: uuidv4(),
                number: '',
                description: '',
                imageFiles: [],
                status: '',
                note: '',
                type: '',
            };

            stateClone.splice(roomIndex + 1, 0, newRoom);
            return stateClone;
        case DELETE_ROOM:
            stateClone.splice(roomIndex, 1);
            return stateClone;
        case SET_ROOM_NUMBER:
            stateClone[roomIndex].number = action.payload.number;
            return stateClone;
        case SET_ROOM_FILES:
            stateClone[roomIndex].imageFiles = action.payload.imageFiles;
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
        case SET_ROOM_STATUS:
            stateClone[roomIndex].status = action.payload.status;
            return stateClone;
        case SET_ROOM_TYPE:
            stateClone[roomIndex].type = action.payload.type;
            return stateClone;
        default:
            throw new Error('Invalid action');
    }
};

export default reducer;

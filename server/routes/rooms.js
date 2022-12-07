import express from 'express';

const router = express.Router();
const { upload } = require('../helpers/fileHelper');

import {
    getAllRooms,
    getAllRoomsWithPagination,
    getRoomsFilter,
    getAllRoomsByType,
    getAllRoomsByTypeName,
    getRoomById,
    createRoom,
    updateRoomWithBookingDetails,
    deleteRoom,
} from '../controllers/RoomsController.js';

router.get('/all', getAllRooms);

router.get('/all/:page', getAllRoomsWithPagination);

router.get('/filter/:page', getRoomsFilter);

router.get('/all/type/:id', getAllRoomsByType);

router.get('/all/type/name/:name', getAllRoomsByTypeName);

router.get('/:id', getRoomById);

router.post('/createRoom', upload.array('images'), createRoom);

router.put('/updateRoom/:id', upload.array('images'), updateRoomWithBookingDetails);

router.delete('/deleteRoom/:id', deleteRoom);

export default router;

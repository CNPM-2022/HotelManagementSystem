import express from 'express';

const router = express.Router();
const { upload } = require('../helpers/FileHelper');

import {
    getAllRooms,
    getAllRoomsByType,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom,
} from '../controllers/RoomsController.js';

router.get('/all', getAllRooms);

router.get('/all/type/:id', getAllRoomsByType);

router.get('/:id', getRoomById);

router.post('/createRoom', upload.array('images'), createRoom);

router.put('/updateRoom/:id', upload.array('images'), updateRoom);

router.delete('/deleteRoom/:id', deleteRoom);

export default router;

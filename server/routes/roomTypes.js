import express from 'express';

const router = express.Router();
const { upload } = require('../helpers/fileHelper');

import {
    getAllRoomType,
    getRoomTypeById,
    createRoomType,
    updateRoomType,
    deleteRoomType,
} from '../controllers/RoomTypesController.js';

router.get('/all', getAllRoomType);

router.get('/:id', getRoomTypeById);

router.post('/create', upload.array('images'), createRoomType);

router.put('/update/:id', upload.array('images'), updateRoomType);

router.delete('/delete/:id', deleteRoomType);

export default router;

import express from 'express';

const router = express.Router();
const { upload } = require('../helpers/FileHelper');

import {
    getAllRoomDirectory,
    getRoomDirectoryById,
    createRoomDirectory,
    updateRoomDirectory,
    deleteRoomDirectory,
} from '../controllers/RoomDirectoryController.js';

router.get('/all', getAllRoomDirectory);
router.get('/:id', getRoomDirectoryById);
router.post('/create', upload.array('images'), createRoomDirectory);
router.put('/update/:id', upload.array('images'), updateRoomDirectory);
router.delete('/delete/:id', deleteRoomDirectory);

export default router;

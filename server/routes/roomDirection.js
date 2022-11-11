import express from 'express';

const router = express.Router();

import {
    getAllRoomDirectory,
    getRoomDirectoryById,
    createRoomDirectory,
    updateRoomDirectory,
    deleteRoomDirectory,
} from '../controllers/RoomDirectoryController.js';

router.get('/all', getAllRoomDirectory);
router.get('/:id', getRoomDirectoryById);
router.post('/create', createRoomDirectory);
router.put('/update/:id', updateRoomDirectory);
router.delete('/delete/:id', deleteRoomDirectory);

export default router;

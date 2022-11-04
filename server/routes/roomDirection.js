import express from 'express';

const router = express.Router();

import { getAllRoomDirectory, getRoomDirectoryById } from '../controllers/RoomDirectoryController.js';

router.get('/all', getAllRoomDirectory);
router.get('/:id', getRoomDirectoryById);

export default router;

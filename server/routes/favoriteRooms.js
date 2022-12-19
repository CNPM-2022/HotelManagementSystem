const express = require('express');
const router = express.Router();
import {
    getFavoriteRoomsByUserId,
    addFavoriteRoom,
    removeFavoriteRoom,
    checkFavoriteRoomsByRoomId,
} from '../controllers/FavoriteController.js';
import verifyToken from '../middleware/auth.js';

router.get('/', verifyToken, getFavoriteRoomsByUserId);

router.get('/add/:roomId', verifyToken, addFavoriteRoom);

router.delete('/remove/:roomId', verifyToken, removeFavoriteRoom);

router.get('/check/:roomId', verifyToken, checkFavoriteRoomsByRoomId);

export default router;

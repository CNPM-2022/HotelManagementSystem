const express = require('express');
const router = express.Router();
import { getFavoriteRoomsByUserId, addFavoriteRoom, removeFavoriteRoom } from '../controllers/FavoriteController.js';
import verifyToken from '../middleware/auth.js';

router.get('/', verifyToken, getFavoriteRoomsByUserId);
router.get('/add/:roomId', verifyToken, addFavoriteRoom);
router.delete('/remove/:roomId', verifyToken, removeFavoriteRoom);

export default router;

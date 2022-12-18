const express = require('express');
const router = express.Router();
import { getFavoriteRoomsByUserId, addFavoriteRoom } from '../controllers/FavoriteController.js';
import verifyToken from '../middleware/auth.js';

router.get('/', verifyToken, getFavoriteRoomsByUserId);
router.get('/add/:roomId', verifyToken, addFavoriteRoom);

export default router;

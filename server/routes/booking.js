import express from 'express';
const router = express.Router();

import { createBooking, getBookings } from '../controllers/BookingController.js';
import verifyToken from '../middleware/auth.js';

router.post('/create', verifyToken, createBooking);
router.get('/all', getBookings);

export default router;

import express from 'express';
const router = express.Router();

import {
    createBooking,
    getBookings,
    getBookingById,
    deleteBooking,
    updateBooking,
    setSatatusBooking,
} from '../controllers/BookingController.js';
import verifyToken from '../middleware/auth.js';

router.post('/create', verifyToken, createBooking);
router.get('/all', getBookings);
router.get('/:id', verifyToken, getBookingById);
router.put('/update/:id', verifyToken, updateBooking);
router.delete('/delete/:id', verifyToken, deleteBooking);
router.put('/admin/status/:id', setSatatusBooking);

export default router;

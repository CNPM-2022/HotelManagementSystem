import Booking from '../models/Booking';

const createBooking = async (req, res) => {
    const { roomId, checkInDate, checkOutDate, customerList, totalAmount, status } = req.body;
    if (!roomId || !checkInDate || !checkOutDate || !customerList || !totalAmount || !status) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required',
        });
    }
    try {
        const NewBooking = await Booking.create({
            roomId,
            userId: req.userId,
            customerList,
            checkInDate,
            checkOutDate,
            totalAmount,
            status,
        });
        if (NewBooking) {
            return res.status(201).json({
                success: true,
                message: 'Booking created successfully',
                NewBooking,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Booking not created',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        return res.status(200).json({
            success: true,
            message: 'Bookings fetched successfully',
            length: bookings.length,
            bookings,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

export { createBooking, getBookings };

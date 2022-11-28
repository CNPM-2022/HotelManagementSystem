import mongoose, { SchemaTypes } from 'mongoose';

const bookingSchema = mongoose.Schema(
    {
        roomId: {
            type: SchemaTypes.ObjectId,
            ref: 'Room',
        },
        userId: {
            type: SchemaTypes.ObjectId,
            ref: 'User',
        },
        customerList: {
            type: Array,
            default: [],
        },
        checkInDate: {
            type: String,
            required: true,
        },
        checkOutDate: {
            type: String,
            required: true,
        },
        totalAmount: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: 'Pending',
            enum: ['Pending', 'Paid', 'Canceled'],
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const Booking = mongoose.model('booking', bookingSchema);

export default Booking;

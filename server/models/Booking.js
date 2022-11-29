import mongoose, { SchemaTypes } from 'mongoose';

const bookingSchema = mongoose.Schema(
    {
        room: {
            type: SchemaTypes.ObjectId,
            ref: 'rooms',
        },
        user: {
            type: SchemaTypes.ObjectId,
            ref: 'users',
        },
        customerList: [
            {
                type: SchemaTypes.ObjectId,
                ref: 'customers',
            },
        ],
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

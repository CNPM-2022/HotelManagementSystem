import mongoose from 'mongoose';

const roomSchema = mongoose.Schema(
    {
        roomNumber: {
            type: String,
            required: true,
        },
        maxCount: {
            type: Number,
            required: true,
        },
        imageUrls: [],
        type: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        rentperDate: {
            type: String,
        },
        checkOutDate: {
            type: String,
        },
        currentBookings: {
            type: Array,
            default: [],
        },
        price: {
            type: Number,
            required: true,
        },
        note: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const Rooms = mongoose.model('rooms', roomSchema);

export default Rooms;

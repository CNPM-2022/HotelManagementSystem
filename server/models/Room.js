import mongoose from 'mongoose';

const roomSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        maxCount: {
            type: Number,
            required: true,
            max: 3,
        },
        imageUrls: [],
        status: {
            type: String,
            required: true,
            default: 'Available',
        },
        type: {
            type: String,
            required: true,
            default: 'A',
            enum: ['A', 'B', 'C'],
        },
        description: {
            type: String,
            required: true,
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

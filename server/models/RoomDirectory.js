import mongoose from 'mongoose';

const roomDirectorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        typeOfRooms: {
            type: String,
            required: true,
            default: 'A',
            enum: ['A', 'B', 'C'],
        },
        imageUrls: [],
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        listRoom: {
            type: Array,
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

const RoomDirectory = mongoose.model('roomtype', roomDirectorySchema);

export default RoomDirectory;

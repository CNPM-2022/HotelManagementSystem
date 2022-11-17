import mongoose from 'mongoose';

const roomDirectorySchema = mongoose.Schema(
    {
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
    },
    {
        timestamps: true,
    },
);

const RoomDirectory = mongoose.model('roomtype', roomDirectorySchema);

export default RoomDirectory;

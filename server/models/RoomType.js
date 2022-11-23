import mongoose from 'mongoose';

const roomTypeSchema = mongoose.Schema(
    {
        typeOfRooms: {
            type: String,
            required: true,
            default: 'A',
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

const RoomType = mongoose.model('roomtype', roomTypeSchema);

export default RoomType;

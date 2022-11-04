import asyncHandler from 'express-async-handler';
import RoomDirectory from '../models/RoomDirectory.js';

// @desc    Fetch room directory
// @route   GET /api/room-directory
// @access  Public

const getAllRoomDirectory = asyncHandler(async (req, res) => {
    const roomDirectory = await RoomDirectory.find({});
    res.json(roomDirectory);
});

const getRoomDirectoryById = asyncHandler(async (req, res) => {
    const roomDirectory = await RoomDirectory.findById(req.params.id);

    if (roomDirectory) {
        res.json({
            _id: roomDirectory._id,
            name: roomDirectory.name,
            type: roomDirectory.type,
            imageurls: roomDirectory.imageurls,
            description: roomDirectory.description,
            price: roomDirectory.price,
            listRoom: roomDirectory.listRoom,
            note: roomDirectory.note,
        });
    } else {
        res.status(404);
        throw new Error('room not found');
    }
});

export { getAllRoomDirectory, getRoomDirectoryById };

import asyncHandler from 'express-async-handler';
import Rooms from '../models/Room';
import RoomDirectory from '../models/RoomDirectory';
import fs from 'fs';

// @desc    Fetch all rooms
// @route   GET /api/rooms
// @access  Public
const getAllRooms = asyncHandler(async (req, res) => {
    try {
        const rooms = await Rooms.find({});
        if (rooms.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Rooms fetched successfully',
                lengthOfList: rooms.length,
                data: rooms,
            });
        } else {
            throw new Error('No rooms found');
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
});

// @desc    Fetch all rooms by type
// @route   GET /api/rooms/:id
// @access  Public
const getAllRoomsByType = asyncHandler(async (req, res) => {
    try {
        const Type = await RoomDirectory.findById(req.params.id);
        if (Type) {
            const rooms = await Rooms.find({ type: Type.typeOfRooms });
            if (rooms.length > 0) {
                res.status(200).json({
                    success: true,
                    message: 'Rooms fetched successfully',
                    lengthOfList: rooms.length,
                    data: rooms,
                });
            } else {
                throw new Error('No rooms found');
            }
        } else {
            throw new Error('No room type found');
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});

// @desc    Fetch single room
// @route   GET /api/rooms/:id
// @access  Public

const getRoomById = asyncHandler(async (req, res) => {
    const rooms = await Rooms.findById(req.params.id);

    if (rooms) {
        res.json({
            _id: rooms._id,
            roomNumber: rooms.roomNumber,
            maxCount: rooms.maxcount,
            imageUrls: rooms.imageUrls,
            status: rooms.status,
            type: rooms.type,
            description: rooms.description,
            price: rooms.price,
            note: rooms.note,
        });
    } else {
        res.status(404);
        throw new Error('room not found');
    }
});

// @desc    Create a room
// @route   POST /api/createRoom
// @access  Private/Admin

const createRoom = asyncHandler(async (req, res) => {
    const { roomNumber, maxCount, status, type, description, note } = req.body;

    if (!roomNumber || !maxCount || !status || !type || !description || !note) {
        res.status(400);
        throw new Error('Please fill out all required fields');
    }

    try {
        const typeIsTrue = await RoomDirectory.findOne({ typeOfRooms: type });

        if (!typeIsTrue) {
            res.status(400);
            throw new Error('Type of room is not exist');
        }
        typeIsTrue.listRoom.push(roomNumber);

        await typeIsTrue.save();

        const roomIsAlreadyExist = await Rooms.findOne({ roomNumber });

        if (roomIsAlreadyExist) {
            res.status(400);
            throw new Error('Room already exists');
        }

        console.log(req);

        let ImagesArray = [];
        req.files.forEach((element) => {
            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
            };
            ImagesArray.push(file);
        });
        const Price = type === 'A' ? 150000 : type === 'B' ? 170000 : 200000;

        const room = await Rooms.create({
            roomNumber,
            maxCount,
            imageUrls: ImagesArray,
            status,
            type,
            description,
            price: Price,
            note,
        });
        if (room) {
            res.status(201).json({
                success: true,
                message: 'Room created successfully',
                data: room,
            });
        } else {
            throw new Error('Room not created');
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});

// @desc    Update a room
// @route   PUT /api/rooms/:id
// @access  Private/Admin

const updateRoom = asyncHandler(async (req, res) => {
    const { roomNumber, maxCount, status, type, description, note } = req.body;
    const id = req.params.id;

    if (!roomNumber || !maxCount || !status || !type || !description || !note) {
        res.status(400);
        throw new Error('Please fill out all required fields');
    }

    try {
        const typeIsTrue = type === 'A' || type === 'B' || type === 'C';

        if (!typeIsTrue) {
            res.status(400);
            throw new Error('Type of room is not exist');
        }

        const roomIsAlreadyExist = await Rooms.findOne({ id });

        if (!roomIsAlreadyExist) {
            res.status(400);
            throw new Error('Room not exists');
        }

        const ImagesArrayTemp = roomIsAlreadyExist.imageUrls;
        ImagesArrayTemp.map((item) => {
            fs.unlink(item.filePath, (err) => {
                if (err) {
                    throw new Error('File not found');
                }
            });
        });

        let ImagesArray = [];
        req.files.forEach((element) => {
            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
            };
            ImagesArray.push(file);
        });

        console.log(ImagesArray);

        const Price = type === 'A' ? 150000 : type === 'B' ? 170000 : 200000;

        const room = await Rooms.findByIdAndUpdate(
            req.params.id,
            {
                roomNumber,
                maxCount,
                imageUrls: ImagesArray,
                status,
                type,
                description,
                price: Price,
                note,
            },
            { new: true },
        );

        if (room) {
            res.status(201).json({
                success: true,
                message: 'Room updated successfully',
                data: room,
            });
        } else {
            throw new Error('Room not updated');
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});

// @desc    Delete a room
// @route   DELETE /api/rooms/deleteRoom/:id
// @access  Private/Admin

const deleteRoom = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({
            success: false,
            message: 'No room director id provided',
        });
    }
    try {
        const room = await Rooms.findById(req.params.id);

        if (!room) {
            throw new Error('Room not found');
        }
        const ImagesArrayTemp = room.imageUrls;
        ImagesArrayTemp.map((item) => {
            fs.unlink(item.filePath, (err) => {
                if (err) {
                    throw new Error('File not found');
                }
            });
        });
        const type = await RoomDirectory.findOne({ typeOfRooms: room.type });
        if (type) {
            const index = type.listRoom.indexOf(room.roomNumber);
            if (index > -1) {
                type.listRoom.splice(index, 1);
            }
            await type.save();
        }

        if (room) {
            await room.remove();
            res.json({ message: 'Room removed' });
        } else {
            res.status(404);
            throw new Error('Room not found');
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
export { getAllRooms, getAllRoomsByType, getRoomById, createRoom, updateRoom, deleteRoom };

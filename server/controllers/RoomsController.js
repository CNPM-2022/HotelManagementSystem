import asyncHandler from 'express-async-handler';
import Rooms from '../models/Room';
import RoomType from '../models/RoomType';
import Booking from '../models/Booking';
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
        const Type = await RoomType.findById(req.params.id);
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

// @desc    Fetch all rooms by type
// @route   GET /api/rooms/:id
// @access  Public
const getAllRoomsByTypeName = asyncHandler(async (req, res) => {
    try {
        const Type = await RoomType.findOne({ typeOfRooms: req.params.name });
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
            maxCount: rooms.maxCount,
            imageUrls: rooms.imageUrls,
            type: rooms.type,
            rentperDate: rooms.rentperDate,
            checkOutDate: rooms.checkOutDate,
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
    const { roomNumber, maxCount, type, description, note } = req.body;

    if (!roomNumber || !maxCount || !type || !description || !note) {
        res.status(400);
        throw new Error('Please fill out all required fields');
    }

    try {
        const typeIsTrue = await RoomType.findOne({ typeOfRooms: type });

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

        let ImagesArray = [];
        req.files.forEach((element) => {
            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
            };
            ImagesArray.push(file);
        });
        const Price = typeIsTrue.price;

        const room = await Rooms.create({
            roomNumber,
            maxCount,
            imageUrls: ImagesArray,
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
    const { roomNumber, maxCount, type, description, note } = req.body;
    const id = req.params.id;

    // if (!roomNumber || !maxCount || !type || !description || !note) {
    //     res.status(400);
    //     throw new Error('Please fill out all required fields');
    // }

    try {
        const typeIsTrue = await RoomType.findOne({ typeOfRooms: type });

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
            if (fs.existsSync(item.filePath)) {
                fs.unlink(item.filePath, (err) => {
                    if (err) {
                        throw new Error('File not found');
                    }
                });
            }
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

        const Price = typeIsTrue.price;

        const room = await Rooms.findByIdAndUpdate(
            req.params.id,
            {
                roomNumber,
                maxCount,
                imageUrls: ImagesArray,
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
            if (fs.existsSync(item.filePath)) {
                fs.unlink(item.filePath, (err) => {
                    if (err) {
                        throw new Error('File not found');
                    }
                });
            }
        });

        const type = await RoomType.findOne({ typeOfRooms: room.type });
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

// @desc    update room booking details
// @route   PUT /api/rooms/updateRoomBookingDetails/:id
// @access  Private/Admin

const updateRoomWithBookingDetails = asyncHandler(async (req, res) => {
    const { roomNumber, maxCount, type, description, rentperDate, checkOutDate, note } = req.body;
    const id = req.params.id;

    try {
        const typeIsTrue = await RoomType.findOne({ typeOfRooms: type });

        if (!typeIsTrue) {
            res.status(400);
            throw new Error('Type of room is not exist');
        }

        const roomIsAlreadyExist = await Rooms.findOne({ id });

        if (!roomIsAlreadyExist) {
            res.status(400);
            throw new Error('Room not exists');
        }

        let ImagesArray = [];

        if (req.files.length > 0) {
            const ImagesArrayTemp = roomIsAlreadyExist.imageUrls;
            ImagesArrayTemp.map((item) => {
                if (fs.existsSync(item.filePath)) {
                    fs.unlink(item.filePath, (err) => {
                        if (err) {
                            throw new Error('File not found');
                        }
                    });
                }
            });

            req.files.forEach((element) => {
                const file = {
                    fileName: element.originalname,
                    filePath: element.path,
                    fileType: element.mimetype,
                };
                ImagesArray.push(file);
            });
        } else {
            ImagesArray = roomIsAlreadyExist.imageUrls;
        }

        if (type) {
            const oldType = await RoomType.findOne({ typeOfRooms: roomIsAlreadyExist.type });
            if (type) {
                const index = oldType.listRoom.indexOf(roomIsAlreadyExist.roomNumber);
                if (index > -1) {
                    oldType.listRoom.splice(index, 1);
                }
                await oldType.save();
            }
            const typeIsTrue = await RoomType.findOne({ typeOfRooms: type });
            if (typeIsTrue) {
                typeIsTrue.listRoom.push(roomIsAlreadyExist.roomNumber);
                await typeIsTrue.save();
            }
        }

        const Price = typeIsTrue.price;

        roomIsAlreadyExist.roomNumber = roomNumber;
        roomIsAlreadyExist.maxCount = maxCount;
        roomIsAlreadyExist.imageUrls = ImagesArray;
        roomIsAlreadyExist.type = type;
        roomIsAlreadyExist.description = description;
        roomIsAlreadyExist.price = Price;
        roomIsAlreadyExist.note = note;
        roomIsAlreadyExist.rentperDate = rentperDate;
        roomIsAlreadyExist.checkOutDate = checkOutDate;

        roomIsAlreadyExist.save();

        if (roomIsAlreadyExist) {
            res.status(201).json({
                success: true,
                message: 'Room updated successfully',
                data: roomIsAlreadyExist,
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

// @desc    Get all rooms with pagination
// @route   GET /api/rooms/getAllRooms/:pageNumber
// @access  Private/Admin

const getAllRoomsWithPagination = asyncHandler(async (req, res) => {
    const { page } = req.params;
    const limit = 5;
    try {
        const startIndex = (Number(page) - 1) * Number(limit);
        const endIndex = Number(page) * Number(limit);
        const results = {};

        if (endIndex < (await Rooms.countDocuments().exec())) {
            results.next = {
                page: Number(page) + 1,
                limit: Number(limit),
            };
        }

        if (startIndex > 0) {
            results.previous = {
                page: Number(page) - 1,
                limit: Number(limit),
            };
        }

        results.results = await Rooms.find().limit(Number(limit)).skip(startIndex).exec();
        const lengthOfRooms = await Rooms.countDocuments().exec();
        res.status(200).json({
            success: true,
            message: 'Get Rooms with pagination success',
            lenghtOfPage: results.results.length,
            lengthOfList: lengthOfRooms,
            results,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @desc    Get rooms with filter
// @route   GET /api/rooms/getRoomsFilter/:pageNumber
// @access  Public

const getRoomsFilter = asyncHandler(async (req, res) => {
    const { page } = req.params;
    const { type, price, rentperDate, checkOutDate } = req.body;
    const limit = 5;
    try {
        const startIndex = (Number(page) - 1) * Number(limit);
        const endIndex = Number(page) * Number(limit);
        const results = {};

        const DateNow = new Date();
        const newCheckInDate = new Date(rentperDate);
        const newCheckOutDate = new Date(checkOutDate);

        results.results = await Rooms.find();
        if (type && type !== 'all') {
            results.results = await Rooms.find({
                type,
            });
        }

        if (price) {
            if (price === '1') {
                for (let i = 0; i < results.results.length; i++) {
                    if (results.results[i].price > 500000) {
                        results.results.splice(i, 1);
                        i--;
                    }
                }
            }
            if (price === '2') {
                for (let i = 0; i < results.results.length; i++) {
                    if (results.results[i].price > 1000000 || results.results[i].price < 500000) {
                        results.results.splice(i, 1);
                        i--;
                    }
                }
            }
            if (price === '3') {
                for (let i = 0; i < results.results.length; i++) {
                    if (results.results[i].price < 1000000) {
                        results.results.splice(i, 1);
                        i--;
                    }
                }
            }
        }

        if (newCheckInDate && newCheckOutDate) {
            for (let i = 0; i < results.results.length; i++) {
                let currentBookings;
                if (results.results[i].currentBookings.length > 0) {
                    currentBookings = results.results[i].currentBookings;
                    let count = 0;
                    for (let j = 0; j < currentBookings.length; j++) {
                        const newCheckInDate = new Date(rentperDate);
                        const newCheckOutDate = new Date(checkOutDate);
                        const booking = await Booking.findById(currentBookings[j]);
                        const currentCheckInDate = new Date(booking.checkInDate);
                        const currentCheckOutDate = new Date(booking.checkOutDate);

                        if (
                            (newCheckInDate >= currentCheckOutDate &&
                                newCheckInDate <= newCheckOutDate &&
                                newCheckInDate >= DateNow) ||
                            (newCheckOutDate <= currentCheckInDate &&
                                newCheckOutDate >= newCheckInDate &&
                                newCheckInDate >= DateNow)
                        ) {
                            count++;
                        }
                    }
                    if (count == 0) {
                        results.results.splice(i, 1);
                        i--;
                    }
                }
            }
        }

        const lengthOfRooms = results.results.length;

        if (endIndex < lengthOfRooms) {
            results.next = {
                page: Number(page) + 1,
                limit: Number(limit),
            };
        }

        if (startIndex > 0) {
            results.previous = {
                page: Number(page) - 1,
                limit: Number(limit),
            };
        }

        results.results = results.results.slice(startIndex, endIndex);

        res.status(200).json({
            success: true,
            message: 'Get Rooms with pagination success',
            lenghtOfPage: results.results.length,
            results,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export {
    getAllRooms,
    getAllRoomsWithPagination,
    getRoomsFilter,
    getAllRoomsByType,
    getAllRoomsByTypeName,
    getRoomById,
    createRoom,
    updateRoom,
    updateRoomWithBookingDetails,
    deleteRoom,
};

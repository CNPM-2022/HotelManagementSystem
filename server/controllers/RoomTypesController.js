import asyncHandler from 'express-async-handler';
import RoomType from '../models/RoomType.js';
import fs from 'fs';

// @desc    Fetch room type
// @route   GET /api/room-type/all
// @access  Public

const getAllRoomType = asyncHandler(async (req, res) => {
    try {
        const roomTypes = await RoomType.find({});
        if (roomTypes.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Room types fetched successfully',
                lengthOfList: roomTypes.length,
                data: roomTypes,
            });
        } else {
            throw new Error('No room types found');
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
});

// @desc    Fetch room type by id
// @route   GET /api/room-type/:id
// @access  Public
const getRoomTypeById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).json({
            success: false,
            message: 'No room type id provided',
        });
    }
    try {
        const roomType = await RoomType.findById(req.params.id);

        if (roomType) {
            res.status(200).json({
                success: true,
                message: 'Room type fetched successfully',
                data: roomType,
            });
        } else {
            throw new Error('Room type not found');
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
});

// @desc    create room type
// @route   POST /api/room-type/create
// @access  Private
const createRoomType = asyncHandler(async (req, res) => {
    const { typeOfRooms, description, price, listRoom } = req.body;

    if (!typeOfRooms || !description || !price || !listRoom) {
        res.status(400).json({
            success: false,
            message: 'Please provide all required fields',
        });
    }
    try {
        const roomTypeIsAlreadyExist = await RoomType.findOne({ typeOfRooms });
        if (roomTypeIsAlreadyExist) {
            throw new Error('Room type is already exist');
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
        const roomType = await RoomType.create({
            description,
            typeOfRooms,
            imageUrls: ImagesArray,
            price,
            listRoom,
        });
        if (roomType) {
            res.status(201).json({
                success: true,
                message: 'Room type created successfully',
                id: roomType._id,
                data: roomType,
            });
        } else {
            throw new Error('Room type not created');
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});

// @desc    update room type
// @route   PUT /api/room-type/update/:id
// @access  Private
const updateRoomType = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { typeOfRooms, description, price, listRoom } = req.body;
    if (!id) {
        res.status(400).json({
            success: false,
            message: 'No room type id provided',
        });
    }
    try {
        const roomType = await RoomType.findById(id);

        if (!roomType) {
            throw new Error('Room type not found');
        }

        const ImagesArrayTemp = roomType.imageUrls;
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
        if (roomType) {
            roomType.description = description;
            roomType.typeOfRooms = typeOfRooms;
            roomType.imageUrls = ImagesArray;
            roomType.price = price;
            roomType.listRoom = listRoom;
        }
        const updatedRoomType = await roomType.save();
        if (updatedRoomType) {
            res.status(200).json({
                success: true,
                message: 'Room type updated successfully',
                data: updatedRoomType,
            });
        } else {
            throw new Error('Room type not updated');
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});

// @desc    delete room type
// @route   DELETE /api/room-type/delete/:id
// @access  Private
const deleteRoomType = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({
            success: false,
            message: 'No room type id provided',
        });
    }
    try {
        const roomType = await RoomType.findById(id);
        if (roomType) {
            const ImagesArrayTemp = roomType.imageUrls;
            ImagesArrayTemp.map((item) => {
                fs.unlink(item.filePath, (err) => {
                    if (err) {
                        throw new Error('File not found');
                    }
                });
            });

            await roomType.remove();
            res.status(200).json({
                success: true,
                message: 'Room type deleted successfully',
            });
        } else {
            throw new Error('Room type not found');
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});

export { getAllRoomType, getRoomTypeById, createRoomType, updateRoomType, deleteRoomType };

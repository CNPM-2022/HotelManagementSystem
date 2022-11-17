import asyncHandler from 'express-async-handler';
import RoomDirectory from '../models/RoomDirectory.js';
import fs from 'fs';

// @desc    Fetch room directory
// @route   GET /api/room-directory/all
// @access  Public

const getAllRoomDirectory = asyncHandler(async (req, res) => {
    try {
        const roomDirectory = await RoomDirectory.find({});
        if (roomDirectory.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Room directory fetched successfully',
                lengthOfList: roomDirectory.length,
                data: roomDirectory,
            });
        } else {
            throw new Error('No room directory found');
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
});

// @desc    Fetch room directory by id
// @route   GET /api/room-directory/:id
// @access  Public
const getRoomDirectoryById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({
            success: false,
            message: 'No room director id provided',
        });
    }
    try {
        const roomDirectory = await RoomDirectory.findById(req.params.id);

        if (roomDirectory) {
            res.status(200).json({
                success: true,
                message: 'Room directory fetched successfully',
                data: roomDirectory,
            });
        } else {
            throw new Error('Room director not found');
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
});

// @desc    create room directory
// @route   POST /api/room-directory/create
// @access  Private
const createRoomDirectory = asyncHandler(async (req, res) => {
    const { typeOfRooms, description, price, listRoom } = req.body;

    if (!typeOfRooms || !description || !price || !listRoom) {
        res.status(400).json({
            success: false,
            message: 'Please provide all required fields',
        });
    }
    try {
        const roomIsAlreadyExist = await RoomDirectory.findOne({ typeOfRooms });
        if (roomIsAlreadyExist) {
            throw new Error('Room Direction is already exist');
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
        const roomDirectory = await RoomDirectory.create({
            description,
            typeOfRooms,
            imageUrls: ImagesArray,
            price,
            listRoom,
        });
        if (roomDirectory) {
            res.status(201).json({
                success: true,
                message: 'Room directory created successfully',
                id: roomDirectory._id,
                data: roomDirectory,
            });
        } else {
            throw new Error('Room directory not created');
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});

// @desc    update room directory
// @route   PUT /api/room-directory/update/:id
// @access  Private
const updateRoomDirectory = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { typeOfRooms, description, price, listRoom } = req.body;
    if (!id) {
        res.status(400).json({
            success: false,
            message: 'No room director id provided',
        });
    }
    // if (!typeOfRooms || !description || !price || !listRoom) {
    //     res.status(400).json({
    //         success: false,
    //         message: 'Please provide all required fields',
    //     });
    // }
    try {
        const roomDirectory = await RoomDirectory.findById(id);
        roomDirectory.imageUrls.map((image) => {
            console.log(image);
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
        if (roomDirectory) {
            roomDirectory.description = description;
            roomDirectory.typeOfRooms = typeOfRooms;
            roomDirectory.imageUrls = ImagesArray;
            roomDirectory.price = price;
            roomDirectory.listRoom = listRoom;
        } else {
            throw new Error('Room director not found');
        }
        const updatedRoomDirectory = await roomDirectory.save();
        if (updatedRoomDirectory) {
            res.status(200).json({
                success: true,
                message: 'Room directory updated successfully',
                data: updatedRoomDirectory,
            });
        } else {
            throw new Error('Room directory not updated');
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});

// @desc    delete room directory
// @route   DELETE /api/room-directory/delete/:id
// @access  Private
const deleteRoomDirectory = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({
            success: false,
            message: 'No room director id provided',
        });
    }
    try {
        const roomDirectory = await RoomDirectory.findById(id);
        if (roomDirectory) {
            await roomDirectory.remove();
            res.status(200).json({
                success: true,
                message: 'Room directory deleted successfully',
            });
        } else {
            throw new Error('Room director not found');
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});

export { getAllRoomDirectory, getRoomDirectoryById, createRoomDirectory, updateRoomDirectory, deleteRoomDirectory };

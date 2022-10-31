import asyncHandler from "express-async-handler";
import Rooms from "../models/Room";

// @desc    Fetch all rooms
// @route   GET /api/rooms
// @access  Public
const getAllRooms = asyncHandler(async (req, res) => {
  const rooms = await Rooms.find({});
  res.json(rooms);
});

const getRoomsById = asyncHandler(async (req, res) => {
  const rooms = await Rooms.findById(req.params.id);

  if (rooms) {
    res.json({
      _id: rooms._id,
      name: rooms.name,
      maxcount: rooms.maxcount,
      phonenumber: rooms.phonenumber,
      rentperday: rooms.rentperday,
      imageurls: rooms.imageurls,
      currentBookings: rooms.currentBookings,
      type: rooms.type,
      description: rooms.description,
    });
  } else {
    res.status(404);
    throw new Error("room not found");
  }
});

const roomById = asyncHandler(async (req, res) => {
  const roomid = req.body.roomid;

  try {
    const rooms = await Rooms.findOne({ _id: req.body.roomid });
    res.json(rooms);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

export { getAllRooms, getRoomsById, roomById };

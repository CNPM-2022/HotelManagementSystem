import Booking from '../models/Booking';
import Room from '../models/Room';
import RoomType from '../models/RoomType';
import ReportByType from '../models/ReportByRoomType';

const RestartReport = async () => {
    RoomType.find({}).then(async (roomTypes) => {
        for(let i = 0; i < roomTypes.length; i++) {
            await ReportByType.findOne({
                roomType: roomTypes[i]._id,
            }).then(async (report) => {
                if (report) {
                    report.totalRevenue = 0;
                    await report.save();
                } else {
                    const newReport = new ReportByType({
                        roomType: roomTypes[i]._id,
                        totalRevenue: 0,
                    });
                    await newReport.save();
                }
            });
        }
    });
};

const WriteReport = async () => {
    await RoomType.find({}).then(async (roomTypes) => {
       for(let i = 0; i < roomTypes.length; i++) {
            const rooms = roomTypes[i].listRoom;
            for(let i = 0; i < rooms.length; i++) {
                await Room.find({ roomNumber: rooms[i] }).then(async (Room) => {
                    if (Room[0].currentBookings) {
                        let totalAmount = 0;
                        for(let i = 0; i < Room[0].currentBookings.length; i++) {
                            await Booking.find({ _id: Room[0].currentBookings[i] }).then(async (booking) => {
                                totalAmount += parseInt(booking[0].totalAmount);
                            });
                        }
                        await ReportByType.findOne({
                            roomType: roomTypes[i]._id,
                        }).then(async (report) => {
                            if (report) {
                                report.totalRevenue += totalAmount;
                                await report.save();
                            } else {
                                const newReport = new ReportByType({
                                    roomType: roomTypes[i]._id,
                                    totalRevenue: totalAmount,
                                });
                                await newReport.save();
                            }
                        });
                    }
                });
            }
        }
    });
};

const ReportByRoomType = async (req, res) => {
    try {
        await RestartReport();
        await WriteReport();
        ReportByType.find({})
            .populate('roomType', 'typeOfRooms')
            .then((reports) => {
                res.status(200).json({
                    success: true,
                    message: 'Get report by room type successfully',
                    data: reports,
                });
            });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

export { ReportByRoomType };

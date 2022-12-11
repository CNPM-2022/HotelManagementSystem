import Booking from '../models/Booking';
import Room from '../models/Room';
import RoomType from '../models/RoomType';
import ReportByType from '../models/ReportByRoomType';
import Report from '../models/Report';

const RestartReport = async () => {
    RoomType.find({}).then(async (roomTypes) => {
        roomTypes.map(async (roomType) => {
            await ReportByType.findOne({
                roomType: roomType._id,
            }).then(async (report) => {
                if (report) {
                    report.totalRevenue = 0;
                    report.save();
                } else {
                    const newReport = new ReportByType({
                        roomType: roomType._id,
                        totalRevenue: 0,
                    });
                    newReport.save();
                }
            });
        });
    });
};

const WriteReport = async () => {
    await RoomType.find({}).then(async (roomTypes) => {
        roomTypes.map(async (roomType) => {
            await roomType.listRoom.map(async (room) => {
                await Room.find({ roomNumber: room }).then(async (Room) => {
                    if (Room[0].currentBookings) {
                        const total = await Room[0].currentBookings.reduce((total, booking) => {
                            Booking.find({
                                _id: booking,
                            }).then((Book) => {
                                return total + Book[0].totalAmount;
                            });
                        }, 0);
                        console.log(total);
                    }
                });
            });
        });
    });
};

const ReportByRoomType = async (req, res) => {
    try {
        // await RestartReport();
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

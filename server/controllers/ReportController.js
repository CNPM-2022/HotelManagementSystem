import Booking from '../models/Booking';
import Room from '../models/Room';
import RoomType from '../models/RoomType';
import ReportByType from '../models/ReportByRoomType';
import RoomUsageDensityReport from '../models/RoomUsageDensityReport';

const RestartReportByType = async () => {
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
        await RestartReportByType();
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


const RestartRoomUsageDensityReport = async (req, res) => {
    await Room.find({}).then(async (rooms) => {
        for(let i = 0; i < rooms.length; i++) {
            const booking = rooms[i].currentBookings;
            let totalRentDays = 0;
            for(let i =0;i<booking.length;i++)
            {
                await Booking.find({ _id: booking[i] }).then(async (booking) => {
                   totalRentDays += parseInt((new Date(booking[0].checkOutDate) - new Date(booking[0].checkInDate))/(1000 * 60 * 60 * 24), 10);
                });
            }
            const report = await RoomUsageDensityReport.findOne({
                room: rooms[i]._id,
            })
            if (report) {
                report.totalRentDays = totalRentDays;
                report.ratio = totalRentDays / 365;
                await report.save();
            } else {
                const newReport = new RoomUsageDensityReport({
                    room: rooms[i]._id,
                    totalRentDays: totalRentDays,
                    ratio: totalRentDays / 365,
                });
                await newReport.save();
            }
        }
    }
    )
}

const getRoomUsageDensityReport = async (req, res) => {
    try {
        await RestartRoomUsageDensityReport();
        RoomUsageDensityReport.find({}).populate('room', ['roomNumber']).then(
            (reports) => {
                res.status(200).json({
                    success: true,
                    message: 'Get room usage density report successfully',
                    data: reports,
                });
            }
        )
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
}

export { ReportByRoomType,getRoomUsageDensityReport };

import Booking from '../models/Booking';
import Room from '../models/Room';
import RoomType from '../models/RoomType';
import ReportByType from '../models/ReportByRoomType';
import RoomUsageDensityReport from '../models/RoomUsageDensityReport';
import Report from '../models/Report';

const RestartReportByType = async () => {
    RoomType.find({}).then(async (roomTypes) => {
        for (let i = 0; i < roomTypes.length; i++) {
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

const WriteReportByType = async (month, year) => {
    const lastdate = new Date(year, month - 1, 30);
    const firstdate = new Date(year, month - 1, 1);
    await RoomType.find({}).then(async (roomTypes) => {
        for (let i = 0; i < roomTypes.length; i++) {
            const rooms = roomTypes[i].listRoom;
            for (let i = 0; i < rooms.length; i++) {
                await Room.find({ roomNumber: rooms[i] }).then(async (Room) => {
                    if (Room[0].currentBookings) {
                        let totalAmount = 0;
                        for (let i = 0; i < Room[0].currentBookings.length; i++) {
                            await Booking.find({
                                _id: Room[0].currentBookings[i],
                            }).then(async (booking) => {
                                if (
                                    booking.length > 0 &&
                                    booking[0].checkInDate >= firstdate &&
                                    booking[0].checkOutDate <= lastdate
                                ) {
                                    totalAmount += parseInt(booking[0].totalAmount);
                                }
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

const WriteRoomUsageDensityReport = async (month, year) => {
    const lastdate = new Date(year, month - 1, 30);
    const firstdate = new Date(year, month - 1, 1);
    await Room.find({}).then(async (rooms) => {
        for (let i = 0; i < rooms.length; i++) {
            const booking = rooms[i].currentBookings;
            let totalRentDays = 0;
            for (let i = 0; i < booking.length; i++) {
                await Booking.find({
                    _id: booking[i],
                }).then(async (booking) => {
                    if (booking[0].checkInDate >= firstdate && booking[0].checkOutDate <= lastdate) {
                        totalRentDays += parseInt(
                            (new Date(booking[0].checkOutDate) - new Date(booking[0].checkInDate)) /
                                (1000 * 60 * 60 * 24),
                            10,
                        );
                    }
                });
            }
            const report = await RoomUsageDensityReport.findOne({
                room: rooms[i]._id,
            });
            if (report) {
                report.totalRentDays = totalRentDays;
                await report.save();
            } else {
                const newReport = new RoomUsageDensityReport({
                    room: rooms[i]._id,
                    totalRentDays: totalRentDays,
                });
                await newReport.save();
            }
        }
    });
};

const createReportsModal = async (req, res) => {
    const { month, year } = req.params;
    try {
        if (!month || !year) throw new Error('Missing month or year parameter');

        const ReportIsExist = await Report.findOne({
            month: month,
            year: year,
        });

        await RestartReportByType();
        await WriteReportByType(month, year);
        await WriteRoomUsageDensityReport(month, year);

        let ReportByTypeData;
        await ReportByType.find({}).then((reports) => {
            ReportByTypeData = reports;
        });
        let RoomUsageDensityReportData;
        await RoomUsageDensityReport.find({}).then((reports) => {
            RoomUsageDensityReportData = reports;
        });

        if (ReportIsExist) {
            ReportIsExist.reportByRoomType = ReportByTypeData;
            ReportIsExist.roomUsageDensityReport = RoomUsageDensityReportData;

            await ReportIsExist.save();

            return res.status(200).json({
                success: true,
                message: 'Update reports successfully',
                data: ReportIsExist,
            });
        }

        await Report.create({
            month: month,
            year: year,
            reportByRoomType: ReportByTypeData,
            roomUsageDensityReport: RoomUsageDensityReportData,
        }).then((report) => {
            res.status(200).json({
                success: true,
                message: 'Create reports successfully',
                data: report,
            });
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

const getReportByMonth = async (req, res) => {
    const { month, year } = req.params;
    try {
        if (!month || !year) throw new Error('Missing month or year parameter');

        await Report.find({ month: month, year: year })
            .populate({ path: 'reportByRoomType', populate: { path: 'roomType', select: 'typeOfRooms' } })
            .populate({ path: 'roomUsageDensityReport', populate: { path: 'room', select: 'roomNumber' } })
            .then((reports) => {
                res.status(200).json({
                    success: true,
                    message: 'Get report by time successfully',
                    data: reports,
                });
            });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

const getReports = async (req, res) => {
    try {
        await Report.find({})
            .populate({ path: 'reportByRoomType', populate: { path: 'roomType', select: 'typeOfRooms' } })
            .populate({ path: 'roomUsageDensityReport', populate: { path: 'room', select: 'roomNumber' } })
            .then((reports) => {
                res.status(200).json({
                    success: true,
                    message: 'Get reports successfully',
                    data: reports,
                });
            });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

export { getReports, createReportsModal, getReportByMonth };

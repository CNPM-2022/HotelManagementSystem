import mongoose from 'mongoose';

const roomUsageDensityReportSchema = mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rooms',
        required: true,
    },
    totalRentDays: {
        type: Number,
        required: true,
    },
    ratio: {
        type: Number,
        required: true,
    },
});

const RoomUsageDensityReport = mongoose.model('roomUsageDensityReport', roomUsageDensityReportSchema);

export default RoomUsageDensityReport;

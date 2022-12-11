import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
    month: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    reportByRoomType: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'reportByRoomType',
        },
    ],
    roomUsageDensityReport: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'roomUsageDensityReport',
        },
    ],
});

const Report = mongoose.model('report', ReportSchema);

export default Report;

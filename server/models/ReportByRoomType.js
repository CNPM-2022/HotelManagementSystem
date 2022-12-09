import mongoose from 'mongoose';

const reportByRoomTypeSchema = mongoose.Schema({
    roomType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'roomtype',
        required: true,
    },
    totalRevenue: {
        type: Number,
        required: true,
    },
    ratio: {
        type: Number,
        required: true,
    },
});

const ReportByRoomType = mongoose.model('reportByRoomType', reportByRoomTypeSchema);

export default ReportByRoomType;

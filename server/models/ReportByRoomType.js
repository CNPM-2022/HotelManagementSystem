import mongoose from 'mongoose';

const reportByRoomTypeSchema = mongoose.Schema({
    roomType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'roomtype',
        required: true,
    },
    totalRevenue: {
        type: Number,
        default: 0,
    },
    ratio: {
        type: Number,
    },
});

const ReportByRoomType = mongoose.model('reportByRoomType', reportByRoomTypeSchema);

export default ReportByRoomType;

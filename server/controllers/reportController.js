import Booking from '../models/Booking';
import Room from '../models/Room';
import RoomType from '../models/RoomType';
const ReportByRoomType = (req, res) => {
    RoomType.find();
};

export { ReportByRoomType };

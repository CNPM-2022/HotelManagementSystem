import Booking from "../models/Booking";
import Room from "../models/Room";

const BookingController = {
    // get a list of bookings from db
    async getBookings(req, res, next) {
        try {
            const bookings = await Booking.find({});
            res.send(bookings);
        } catch (error) {
            next(error);
        }
    },
    //add new booking to db
    async addBooking(req, res, next) {
        try {
            const booking = await Booking.create(req.body);
            res.send(booking);
        } catch (error) {
            next(error);
        }
    },
    // update a booking in db
    async updateBooking(req, res, next) {
        try {
            const booking = await Booking.findByIdAndUpdate({ _id: req.params.id },
                req.body);
            res.send(booking);
        } catch (error) {
            next(error);
        }
    },
    // delete a booking from db
    async deleteBooking(req, res, next) {
        try {
            const booking = await Booking.findByIdAndRemove({ _id: req.params.id });
            res.send(booking);
        } catch (error) {
            next(error);
        }
    },
}
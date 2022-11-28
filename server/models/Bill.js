import mongoose, { SchemaTypes } from 'mongoose';

const billSchema = mongoose.Schema({
    bookingId: {
        type: SchemaTypes.ObjectId,
        ref: 'Booking',
    },
    userId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
    },
    dateOfPayment: {
        type: String,
        required: true,
    },
    totalAmount: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
});

const Bill = mongoose.model('bill', billSchema);

export default Bill;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  roomNumber: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  typeGest: {
    type: String,
    enum: ["noidia", "nuocngoai"],
  },
  numberGuest: {
    type: Number,
  },
  price: {
    type: Number,
  },
});

module.exports = Order = mongoose.model("orders", OrderSchema);

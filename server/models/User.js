const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    stripeAccountId: "",
    stripeSellers: {},
    stripeSession: {},
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("users", UserSchema);

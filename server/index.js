const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
require("dotenv").config();
const connectDB = async () => {
  try {
    const con = await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@project1.hodrtv1.mongodb.net/?retryWrites=true&w=majority`,
      {
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connectDB();

const app = express();
app.use(express.json());
const port = 5000;

app.use("/api/auth", authRouter);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

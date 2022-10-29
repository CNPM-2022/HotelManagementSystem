const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
import fs from "fs";
const morgan = require("morgan");
import cors from "cors";

//connect to mongodb
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

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

//middleware for routes
app.use(morgan("dev"));

//enable cors
app.use(cors());

//auto load routes

fs.readdirSync("./routes").map((r) =>
  app.use("/api/auth", require(`./routes/${r}`))
);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);

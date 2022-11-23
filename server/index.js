const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const morgan = require('morgan');
import path from 'path';
import cors from 'cors';
import rooms from './routes/rooms.js';
import auth from './routes/auth.js';
import roomTypes from './routes/roomTypes.js';
import user from './routes/user.js';
import uploads from './routes/upload.js';

//connect to mongodb
const connectDB = async () => {
    try {
        const con = await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@project1.hodrtv1.mongodb.net/?retryWrites=true&w=majority`,
            {
                useUnifiedTopology: true,
            },
        );
        console.log('MongoDB connected');
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
    res.setHeader('Access-Control-Allow-Origin', `${process.env.CLIENT_URL}`);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//middleware for routes
app.use(morgan('dev'));

//enable cors
app.use(cors());

//auto load routes

//routes
app.use('/api/auth', auth);
app.use('/api/rooms', rooms);
app.use('/api/room-type', roomTypes);
app.use('/api/user', user);
app.use('/api/upload', uploads);

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));

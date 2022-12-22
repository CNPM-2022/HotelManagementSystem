const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@hotelmanage.xjfexqv.mongodb.net/?retryWrites=true&w=majority`,
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

export default connectDB;

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const singleImageSchema = new Schema(
    {
        fileName: {
            type: String,
            required: true,
        },
        filePath: {
            type: String,
            required: true,
        },
        fileType: {
            type: String,
            required: true,
        },
        fileSize: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('SingleImage', singleImageSchema);

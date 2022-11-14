const express = require('express');
const { upload } = require('../helpers/FileHelper');
const {
    singleFileUpload,
    multipleFileUpload,
    getallSingleFiles,
    getallMultipleFiles,
} = require('../controllers/FileUploadController');
const router = express.Router();

router.post('/singleFile', upload.single('image'), singleFileUpload);
router.post('/multipleFiles', upload.array('images'), multipleFileUpload);
router.get('/getSingleFiles', getallSingleFiles);
router.get('/getMultipleFiles', getallMultipleFiles);

module.exports = router;

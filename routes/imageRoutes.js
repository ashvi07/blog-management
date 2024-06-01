const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { uploadImage } = require('../controllers/imageController');

router.post('/upload', upload.single('image'), uploadImage);

module.exports = router;

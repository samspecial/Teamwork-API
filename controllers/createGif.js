const { pool } = require('../config');
const multer = require('multer');
const cloudinary = require('cloudinary')

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
})
const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Image file Allowed Only'), false);
    }
    cb(null, true);
}

const upload = multer({
    storage,
    fileFilter: imageFilter
})

cloudinary.config({
    cloud_name: samspecial,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

})
const createNewGif = (req, res) => {
    cloudinary.uploader.upload(req.file.path, (result) => {

    })
}
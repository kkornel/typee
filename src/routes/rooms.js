const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const DatauriParser = require('datauri/parser');
const cloudinary = require('cloudinary').v2;

const authenticate = require('../middleware/authenticate');
const ErrorResponse = require('../utils/ErrorResponse');
const Room = require('../models/Room');

cloudinary.config(process.env.CLOUDINARY_URL);

const router = express.Router();

const upload = multer({
  limits: {
    fileSize: 2000000, // 2MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image (png/jpg/jpeg only)'));
    }

    return cb(undefined, true);
  },
});

router.post(
  '/:name',
  // authenticate,
  upload.single('file'),
  async (req, res, next) => {
    const { name } = req.params;

    // const { newName, deleteCurrent } = req.body;
    // deleteCurrent was of type String, because of how FormData works
    // so now it is stringified on client side and parsed on server,
    // so deleteCurrent is boolean instead of String
    const newName = req.body.newName;
    const deleteCurrent = JSON.parse(req.body.deleteCurrent);
    const file = req.file;

    try {
      const nameTaken = await Room.findOne({
        name: newName,
      });

      if (nameTaken) {
        throw new ErrorResponse(409, 'Name already taken', 'ALREADY_EXISTS');
      }

      const room = await Room.findOne({ name });

      if (newName) {
        room.name = newName;
      }

      // deleteCurrent is of type String because of how FormData works
      // if (deleteCurrent === 'true') {
      if (deleteCurrent) {
        const response = await cloudinary.uploader.destroy(
          `rooms/${room._id.toString()}`
        );

        console.log(response);

        room.avatar = undefined;
        room.avatarURL = undefined;
      }

      if (file) {
        const buffer = await sharp(file.buffer)
          .resize({ width: 250, height: 250 })
          .png()
          .toBuffer();

        // Store avatar as binary in the database
        // 1. Sending binary to the client requires using following:
        // <img src="data:image/jpg;base64,BINARY_FROM_DB"/>
        // 2. To send image instead of binary as a response use:
        // res.set('Content-Type', 'image/png');
        // res.send(room.avatar);
        room.avatar = buffer;

        const parser = new DatauriParser();
        const dataURI = parser.format('.png', buffer).content;

        try {
          const response = await cloudinary.uploader.upload(dataURI, {
            folder: 'rooms',
            public_id: room._id.toString(),
          });

          console.log(response);

          room.avatarURL = response.secure_url;
        } catch (e) {
          console.log(e);
        }
      }

      await room.save();
      res.send(room);
    } catch (error) {
      next(error);
    }
  },
  (error, req, res, next) => {
    next(new ErrorResponse(400, error.message));
  }
);

module.exports = router;

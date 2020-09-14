const { validationResult } = require('express-validator');

const Room = require('../models/Room');
const ErrorResponse = require('../utils/ErrorResponse');
const { errorFormatter } = require('../validators/room');
const { getResizedBuffer, getDataUri } = require('../utils/imageUtils');
const { cloudinaryUpload, cloudinaryDelete } = require('../utils/cloudinary');

const update = async (req, res, next) => {
  const { name } = req.params;

  // const { newName, deleteCurrent } = req.body;
  // deleteCurrent was of type String, because of how FormData works
  // so now it is stringified on client side and parsed on server,
  // so deleteCurrent is boolean instead of String
  const newName = req.body.newName;
  const deleteCurrent = JSON.parse(req.body.deleteCurrent);
  const file = req.file;

  const errors = validationResult(req).formatWith(errorFormatter);
  console.log(errors.errors);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  try {
    const nameTaken = await Room.findOne({
      name: newName,
    });

    if (nameTaken) {
      throw new ErrorResponse(409, 'Name already taken', 'ALREADY_EXISTS');
    }

    const room = await Room.findOne({ name }).populate([
      { path: 'author' },
      { path: 'users.user' },
    ]);
    await room.populate('messages').execPopulate();
    await room
      .populate('messages.author', '_id username subtext avatarUrl')
      .execPopulate();

    if (newName) {
      room.name = newName;
    }

    // deleteCurrent is of type String because of how FormData works
    // if (deleteCurrent === 'true') {
    if (deleteCurrent) {
      const response = await cloudinaryDelete('users', user._id.toString());
      console.log('cloudinary response', response);

      room.avatar = undefined;
      room.avatarUrl = undefined;
    }

    if (file) {
      const buffer = await getResizedBuffer(file.buffer);

      // Store avatar as binary in the database
      // 1. Sending binary to the client requires using following:
      // <img src="data:image/jpg;base64,BINARY_FROM_DB"/>
      // 2. To send image instead of binary as a response use:
      // res.set('Content-Type', 'image/png');
      // res.send(room.avatar);
      room.avatar = buffer;

      const dataUri = getDataUri(buffer);

      try {
        const response = await cloudinaryUpload(
          'users',
          user._id.toString(),
          dataUri
        );
        console.log('cloudinary response', response);

        room.avatarUrl = response.secure_url;
      } catch (e) {
        console.log(e);
      }
    }

    await room.save();
    res.send(room);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  update,
};

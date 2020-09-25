const { validationResult } = require('express-validator');

const Room = require('../models/Room');
const ErrorResponse = require('../utils/ErrorResponse');
const errorFormatter = require('../validators/errorFormatter');
const { getResizedBuffer, getDataUri } = require('../utils/imageUtils');
const { cloudinaryUpload, cloudinaryDelete } = require('../utils/cloudinary');

const { getRoomWithoutUserSockets } = require('../chat/users');

const update = async (req, res, next) => {
  console.log(`/rooms/${req.params.name}`, req.body);

  const errors = validationResult(req).formatWith(errorFormatter);
  console.log(errors);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  const { name } = req.params;

  // deleteCurrent was of type String, because of how FormData works
  // so now it is stringified on client side and parsed on server,
  // so deleteCurrent is boolean instead of String
  const { file } = req;
  const newName = req.body.newName;
  const deleteAvatar = JSON.parse(req.body.deleteAvatar);

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

    console.log(newName);

    if (newName) {
      room.name = newName;
    }

    // deleteAvatar is of type String because of how FormData works
    // if (deleteAvatar === 'true') {
    if (deleteAvatar && room.avatarUrl) {
      const response = await cloudinaryDelete('rooms', room._id.toString());
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
      // room.avatar = buffer;

      const dataUri = getDataUri(buffer);

      try {
        const response = await cloudinaryUpload(
          'room',
          room._id.toString(),
          dataUri
        );
        console.log('cloudinary response', response);

        room.avatarUrl = response.secure_url;
      } catch (error) {
        console.log('cloudinary error', error);
        throw new ErrorResponse(
          500,
          'Unable to upload image',
          'INTERNAL_SERVER_ERROR'
        );
      }
    }

    await room.save();

    const newRoom = await getRoomWithoutUserSockets(room);

    res.send(newRoom);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  update,
};

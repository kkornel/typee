const express = require('express');
const { checkSchema } = require('express-validator');

const upload = require('../middleware/upload');
const getUser = require('../middleware/getUser');
const authenticate = require('../middleware/authenticate');
const {
  updateProfile,
  verifyPassword,
  deleteAccount,
} = require('../controllers/profile');
const { updateSchema } = require('../validators/profile');

const User = require('../models/User');

const router = express.Router();

router.get('/', async (req, res) => {
  console.log('/users');

  const user = await User.findById('5f365cff264ad02a0415cd3f');

  await user.populate('rooms').execPopulate();
  await user.populate('createdRooms').execPopulate();

  const allParticipatedRooms = user.rooms.map((room) => room.name);
  const createdRooms = user.createdRooms.map((room) => room.name);
  // const separated = allParticipatedRooms.map((room) => room._id in  )

  console.log(allParticipatedRooms);
  console.log(createdRooms);

  const participatedRooms = allParticipatedRooms.filter(
    (room) => !createdRooms.includes(room)
  );
  console.log(participatedRooms);

  res.send({ participatedRooms, createdRooms });
});

router.post(
  '/:id',
  getUser,
  checkSchema(updateSchema),
  upload.single('file'),
  updateProfile
);

router.post('/:id/verify', authenticate, verifyPassword);
router.post('/:id/delete', authenticate, deleteAccount);

module.exports = router;

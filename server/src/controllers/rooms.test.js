require('dotenv').config({
  path: '.env.test',
});

const request = require('supertest');

const app = require('../app');

const User = require('../models/User');
const Room = require('../models/Room');

const {
  setupDatabase,
  clearDatabase,
  userOneId,
  roomOneId,
  roomTwoName,
} = require('../../tests/fixtures/db');

beforeEach(setupDatabase);
afterEach(clearDatabase);

describe('POST /api/v1/rooms/:name', () => {
  it('should respond with 401 for unauthenticated request', async () => {
    const room = await Room.findById(roomOneId);

    const response = await request(app)
      .post(`/api/v1/rooms/${room.name}`)
      .send({ deleteAvatar: 'false' })
      .expect('Content-Type', /json/)
      .expect(401);

    expect(response.body).toMatchObject({ message: 'Please authenticate' });
  });

  it('should respond with 422 with error for too long newName', async () => {
    const user = await User.findById(userOneId);
    const room = await Room.findById(roomOneId);
    const token = user.jwtTokens[0];

    const response = await request(app)
      .post(`/api/v1/rooms/${room.name}`)
      .set('Authorization', `Bearer ${token.token}`)
      .send({
        deleteAvatar: 'false',
        newName: 'TooooooooooooooooooooooooooooooLongName',
      })
      .expect('Content-Type', /json/)
      .expect(422);

    const errors = {
      newName: {
        message: 'Max length is 25',
        value: 'TooooooooooooooooooooooooooooooLongName',
      },
    };

    expect(response.body).toMatchObject({ errors });
  });

  it('should respond with 409 for name taken', async () => {
    const room = await Room.findById(roomOneId);
    const user = await User.findById(userOneId);
    const token = user.jwtTokens[0];

    const response = await request(app)
      .post(`/api/v1/rooms/${room.name}`)
      .set('Authorization', `Bearer ${token.token}`)
      .send({ deleteAvatar: 'false', newName: roomTwoName })
      .expect('Content-Type', /json/)
      .expect(409);

    expect(response.body).toMatchObject({
      status: 'ALREADY_EXISTS',
      message: 'Name already taken',
    });
  });

  it('should respond with 200 and update room name', async () => {
    const room = await Room.findById(roomOneId);
    const user = await User.findById(userOneId);
    const token = user.jwtTokens[0];

    const newName = 'RoomOneNew';

    const response = await request(app)
      .post(`/api/v1/rooms/${room.name}`)
      .set('Authorization', `Bearer ${token.token}`)
      .send({ newName, deleteAvatar: 'false' })
      .expect('Content-Type', /json/)
      .expect(200);

    const updatedRoom = await Room.findById(roomOneId);

    expect(updatedRoom.name).not.toBe(room.name);
    expect(updatedRoom.name).toBe(newName);
    expect(response.body._id).toBe(updatedRoom._id.toString());
  });

  it('should respond with 200 and delete room avatar', async () => {
    const room = await Room.findById(roomOneId);
    const user = await User.findById(userOneId);
    const token = user.jwtTokens[0];

    const response = await request(app)
      .post(`/api/v1/rooms/${room.name}`)
      .set('Authorization', `Bearer ${token.token}`)
      .send({ deleteAvatar: 'true' })
      .expect('Content-Type', /json/)
      .expect(200);

    const updatedRoom = await Room.findById(roomOneId);

    expect(updatedRoom.avatar).toBe(undefined);
    expect(updatedRoom.avatarUrl).toBe(undefined);
    expect(response.body._id).toBe(updatedRoom._id.toString());
  });
});

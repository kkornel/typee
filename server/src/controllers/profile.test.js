require('dotenv').config({
  path: '.env.test',
});

const request = require('supertest');

const app = require('../app');

const User = require('../models/User');
const Token = require('../models/Token');

const {
  setupDatabase,
  clearDatabase,
  userOneId,
  userThree,
  userOnePassword,
  userAvatarId,
  userAvatarPassword,
} = require('../../tests/fixtures/db');

beforeEach(setupDatabase);
afterEach(clearDatabase);

describe('GET /api/v1/users', () => {
  it('should respond with 200 and null user object as a response', async () => {
    const response = await request(app)
      .get('/api/v1/users')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toMatchObject({});
  });

  it('should respond with 200 and user object as a response', async () => {
    const user = await User.findById(userOneId);
    const token = user.jwtTokens[0];

    const response = await request(app)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${token.token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).not.toBeNull();
    expect(response.body.user._id.toString()).toBe(user._id.toString());
  });
});

describe('POST /api/v1/users/:id', () => {
  it('should respond with 401 for unauthenticated request', async () => {
    const response = await request(app)
      .post(`/api/v1/users/${userOneId}`)
      .expect('Content-Type', /json/)
      .expect(401);

    expect(response.body).toMatchObject({
      message: 'Please authenticate',
    });
  });

  it('should respond with 422 for missing required field', async () => {
    const user = await User.findById(userOneId);
    const token = user.jwtTokens[0];

    const response = await request(app)
      .post(`/api/v1/users/${userOneId}`)
      .set('Authorization', `Bearer ${token.token}`)
      .send({ deleteAvatar: 'false' })
      .expect('Content-Type', /json/)
      .expect(422);

    const errors = {
      email: {
        message: 'Required field',
      },
      password: {
        message: 'Required field',
      },
      username: {
        message: 'Required field',
      },
    };

    expect(response.body).toMatchObject({ errors });
  });

  it('should respond with 401 for incorrect password', async () => {
    const user = await User.findById(userOneId);
    const token = user.jwtTokens[0];

    const response = await request(app)
      .post(`/api/v1/users/${userOneId}`)
      .set('Authorization', `Bearer ${token.token}`)
      .send({
        email: user.email,
        username: user.username,
        password: 'WrongPassword',
        deleteAvatar: 'false',
      })
      .expect('Content-Type', /json/)
      .expect(401);

    const errorResponse = {
      message: 'Incorrect password',
      status: 'UNAUTHORIZED',
      success: false,
      details: { field: 'password' },
    };

    expect(response.body).toMatchObject(errorResponse);
  });

  it('should respond with 409 for email taken', async () => {
    const user = await User.findById(userOneId);
    const token = user.jwtTokens[0];

    const response = await request(app)
      .post(`/api/v1/users/${userOneId}`)
      .set('Authorization', `Bearer ${token.token}`)
      .send({
        email: userThree.email,
        username: user.username,
        password: userOnePassword,
        deleteAvatar: 'false',
      })
      .expect('Content-Type', /json/)
      .expect(409);

    expect(response.body).toMatchObject({
      status: 'ALREADY_EXISTS',
      message: 'Email already in use',
      details: {
        field: 'email',
        value: userThree.email,
      },
    });
  });

  it('should respond with 409 for username taken', async () => {
    const user = await User.findById(userOneId);
    const token = user.jwtTokens[0];

    const response = await request(app)
      .post(`/api/v1/users/${userOneId}`)
      .set('Authorization', `Bearer ${token.token}`)
      .send({
        email: user.email,
        username: userThree.username,
        password: userOnePassword,
        deleteAvatar: 'false',
      })
      .expect('Content-Type', /json/)
      .expect(409);

    expect(response.body).toMatchObject({
      status: 'ALREADY_EXISTS',
      message: 'Username already in use',
      details: {
        field: 'username',
        value: userThree.username,
      },
    });
  });

  it('should respond with 200 and update user email and send verification email', async () => {
    const user = await User.findById(userOneId);
    const token = user.jwtTokens[0];

    const newEmail = 'newEmailForUserOne@gmail.com';
    const userOneTokens = await Token.find({ user: user._id });

    const response = await request(app)
      .post(`/api/v1/users/${userOneId}`)
      .set('Authorization', `Bearer ${token.token}`)
      .send({
        email: newEmail,
        username: user.username,
        password: userOnePassword,
        deleteAvatar: 'false',
      })
      .expect('Content-Type', /json/)
      .expect(200);

    const updatedUserOne = await User.findById(userOneId);
    const updatedUserOneTokens = await Token.find({ user: user._id });

    expect(updatedUserOne.email).not.toBe(user.email);
    expect(updatedUserOneTokens.length).toBe(userOneTokens.length + 1);

    expect(response.body.success).toBe(true);
    expect(response.body.user.email).toBe(updatedUserOne.email);
  });

  it('should respond with 200 and update user username', async () => {
    const user = await User.findById(userOneId);
    const token = user.jwtTokens[0];
    const newUsername = 'newUsername';

    const response = await request(app)
      .post(`/api/v1/users/${userOneId}`)
      .set('Authorization', `Bearer ${token.token}`)
      .send({
        email: user.email,
        username: newUsername,
        password: userOnePassword,
        deleteAvatar: 'false',
      })
      .expect('Content-Type', /json/)
      .expect(200);

    const updatedUserOne = await User.findById(userOneId);

    expect(updatedUserOne.username).not.toBe(user.username);
    expect(updatedUserOne.username).toBe(newUsername);

    expect(response.body.success).toBe(true);
    expect(response.body.user.username).toBe(updatedUserOne.username);
  });

  it('should respond with 200 and delete user avatar', async () => {
    const user = await User.findById(userAvatarId);
    const token = user.jwtTokens[0];

    const response = await request(app)
      .post(`/api/v1/users/${userAvatarId}`)
      .set('Authorization', `Bearer ${token.token}`)
      .send({
        email: user.email,
        username: user.username,
        password: userAvatarPassword,
        deleteAvatar: 'true',
      })
      .expect('Content-Type', /json/)
      .expect(200);

    const updatedUserOne = await User.findById(userOneId);

    expect(updatedUserOne.avatar).toBe(undefined);
    expect(updatedUserOne.avatarUrl).toBe(undefined);

    expect(response.body.success).toBe(true);
    expect(response.body.user.avatarUrl).toBe(undefined);
  });
});

describe('POST /api/v1/users/:id/verify', () => {
  it('should respond with 401 for unauthenticated request', async () => {
    const response = await request(app)
      .post(`/api/v1/users/${userOneId}/verify`)
      .expect('Content-Type', /json/)
      .expect(401);

    expect(response.body).toMatchObject({
      message: 'Please authenticate',
    });
  });

  it('should respond with 401 for incorrect password', async () => {
    const user = await User.findById(userOneId);
    const token = user.jwtTokens[0];

    const response = await request(app)
      .post(`/api/v1/users/${userOneId}/verify`)
      .set('Authorization', `Bearer ${token.token}`)
      .send({
        email: user.email,
        username: user.username,
        password: 'WrongPassword',
        deleteAvatar: 'false',
      })
      .expect('Content-Type', /json/)
      .expect(401);

    const errorResponse = {
      message: 'Incorrect password',
      status: 'UNAUTHORIZED',
      success: false,
      details: { field: 'password' },
    };

    expect(response.body).toMatchObject(errorResponse);
  });
});

describe('POST /api/v1/users/:id/delete', () => {
  it('should respond with 401 for unauthenticated request', async () => {
    const response = await request(app)
      .post(`/api/v1/users/${userOneId}/delete`)
      .expect('Content-Type', /json/)
      .expect(401);

    expect(response.body).toMatchObject({
      message: 'Please authenticate',
    });
  });

  it('should respond with 200 and delete user and leave rooms he participated in', async () => {
    const user = await User.findById(userOneId);
    const token = user.jwtTokens[0];

    await user.populate('rooms').execPopulate();
    await user.populate('createdRooms').execPopulate();

    const allParticipatedRooms = user.rooms.map((room) => room.name);
    const createdRooms = user.createdRooms.map((room) => room.name);

    const participatedRooms = allParticipatedRooms.filter(
      (room) => !createdRooms.includes(room)
    );

    expect(participatedRooms.length).toBe(1);
    expect(createdRooms.length).toBe(1);

    const response = await request(app)
      .post(`/api/v1/users/${userOneId}/delete`)
      .set('Authorization', `Bearer ${token.token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    await user.populate('rooms').execPopulate();
    await user.populate('createdRooms').execPopulate();

    const allParticipatedRooms2 = user.rooms.map((room) => room.name);
    const createdRooms2 = user.createdRooms.map((room) => room.name);

    const participatedRooms2 = allParticipatedRooms2.filter(
      (room) => !createdRooms2.includes(room)
    );

    // It should NOT remove created rooms YET
    // It takes places in socket event
    // So they will not be deleted now
    expect(createdRooms2.length).toBe(1);
    expect(participatedRooms2.length).toBe(0);
  });
});

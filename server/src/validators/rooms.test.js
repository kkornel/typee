const request = require('supertest');

const app = require('../app');

const User = require('../models/User');

const {
  setupDatabase,
  clearDatabase,
  userOneId,
  roomOneName,
} = require('../../tests/fixtures/db');

beforeEach(setupDatabase);
afterEach(clearDatabase);

describe('room validator', () => {
  it('should respond with 422 for invalid new name', async () => {
    const user = await User.findById(userOneId);
    const token = user.jwtTokens[0];

    const response = await request(app)
      .post(`/api/v1/rooms/${roomOneName}`)
      .set('Authorization', `Bearer ${token.token}`)
      .send({
        deleteAvatar: 'false',
        newName: 'ToooooooooooooooooooooooooooooooooooLong',
      })
      .expect('Content-Type', /json/)
      .expect(422);

    const errors = {
      newName: {
        message: 'Max length is 25',
      },
    };

    expect(response.body).toMatchObject({ errors });
  });
});

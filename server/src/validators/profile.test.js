const request = require('supertest');

const app = require('../app');

const User = require('../models/User');

const {
  setupDatabase,
  clearDatabase,
  userOneId,
  userOnePassword,
} = require('../../tests/fixtures/db');

beforeEach(setupDatabase);
afterEach(clearDatabase);

describe('profile validator', () => {
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

  it('should respond with 422 for invalid email', async () => {
    const user = await User.findById(userOneId);
    const token = user.jwtTokens[0];

    const response = await request(app)
      .post(`/api/v1/users/${userOneId}`)
      .set('Authorization', `Bearer ${token.token}`)
      .send({
        email: 'invalid@mail',
        username: user.username,
        password: userOnePassword,
        deleteAvatar: 'false',
      })
      .expect('Content-Type', /json/)
      .expect(422);

    const errors = {
      email: {
        message: 'Invalid email',
      },
    };

    expect(response.body).toMatchObject({ errors });
  });

  it('should respond with 422 for invalid username', async () => {
    const user = await User.findById(userOneId);
    const token = user.jwtTokens[0];

    const response = await request(app)
      .post(`/api/v1/users/${userOneId}`)
      .set('Authorization', `Bearer ${token.token}`)
      .send({
        email: user.email,
        username: 'Inv',
        password: userOnePassword,
        deleteAvatar: 'false',
      })
      .expect('Content-Type', /json/)
      .expect(422);

    const errors = {
      username: {
        message: 'Required min length of 4 and max of 18',
      },
    };

    expect(response.body).toMatchObject({ errors });
  });

  it('should respond with 422 for invalid password', async () => {
    const user = await User.findById(userOneId);
    const token = user.jwtTokens[0];

    const response = await request(app)
      .post(`/api/v1/users/${userOneId}`)
      .set('Authorization', `Bearer ${token.token}`)
      .send({
        email: user.email,
        username: user.username,
        password: userOnePassword,
        newPassword: 'NoNumbers',
        deleteAvatar: 'false',
      })
      .expect('Content-Type', /json/)
      .expect(422);

    const errors = {
      newPassword: {
        message:
          'Must contain at least 8 Characters, 1 Uppercase, 1 Lowercase and 1 Number',
      },
    };

    expect(response.body).toMatchObject({ errors });

    const response2 = await request(app)
      .post(`/api/v1/users/${userOneId}`)
      .set('Authorization', `Bearer ${token.token}`)
      .send({
        email: user.email,
        username: user.username,
        password: userOnePassword,
        newPassword: 'nouppercase1',
        deleteAvatar: 'false',
      })
      .expect('Content-Type', /json/)
      .expect(422);

    expect(response2.body).toMatchObject({ errors });

    const response3 = await request(app)
      .post(`/api/v1/users/${userOneId}`)
      .set('Authorization', `Bearer ${token.token}`)
      .send({
        email: user.email,
        username: user.username,
        password: userOnePassword,
        newPassword: 'NOLOWERCASE1',
        deleteAvatar: 'false',
      })
      .expect('Content-Type', /json/)
      .expect(422);

    expect(response3.body).toMatchObject({ errors });

    const response4 = await request(app)
      .post(`/api/v1/users/${userOneId}`)
      .set('Authorization', `Bearer ${token.token}`)
      .send({
        email: user.email,
        username: user.username,
        password: userOnePassword,
        newPassword: 'short',
        deleteAvatar: 'false',
      })
      .expect('Content-Type', /json/)
      .expect(422);

    expect(response4.body).toMatchObject({ errors });
  });
});

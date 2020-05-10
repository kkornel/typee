const request = require('supertest');

const app = require('../src/app');
const User = require('../src/models/User');
const Token = require('../src/models/Token');

const {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  newUser,
  newUserEmailTaken,
  newUserUsernameTaken,
  userNotVerifiedId,
  userNotVerified,
  expiredToken,
  validToken,
  setupDatabase,
} = require('./fixtures/db');

beforeEach(setupDatabase);

describe('GET /api/testauth', () => {
  it('should respond with 401 for unauthenticated request', async () => {
    const response = await request(app)
      .get('/api/testauth')
      .expect('Content-Type', /json/)
      .expect(401);

    expect(response.body).toMatchObject({
      error: { message: 'Please authenticate.' },
    });
  });

  it('should respond with 200 for authenticated request', async () => {
    const response = await request(app)
      .get('/api/testauth')
      .set('Authorization', `Bearer ${userOne.jwtTokens[0].token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.message).toEqual('WE GUCCI ✅');
  });
});

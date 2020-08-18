require('dotenv').config({
  path: '.env.test',
});

const request = require('supertest');
const bcrypt = require('bcrypt');

const app = require('../app');

const User = require('../models/User');
const Token = require('../models/Token');

const {
  newUserFormValues,
  newUserEmailTaken,
  newUserUsernameTaken,
  userOne,
  userOneId,
  userNotVerified,
  expiredToken,
  validToken,
  setupDatabase,
  clearDatabase,
} = require('../../tests/fixtures/db');

beforeEach(setupDatabase);
afterEach(clearDatabase);

describe('POST /api/v1/auth/register', () => {
  // Will never reach this, because of setting up express-validator.
  // it('should respond with 400 for missing required field', async () => {
  //   const response = await request(app)
  //     .post('/api/v1/auth/register')
  //     .send({
  //       email: 'newUserMissingUsername@mail.com',
  //       password: 'Strong123!',
  //     })
  //     .expect('Content-Type', /json/)
  //     .expect(400);

  //   expect(response.body).toMatchObject({
  //     message: 'Missing required field(s).',
  //   });
  // });

  it('should respond with 409 for email taken', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send(newUserEmailTaken)
      .expect('Content-Type', /json/)
      .expect(409);

    expect(response.body).toMatchObject({
      status: 'ALREADY_EXISTS',
      message: 'Email already in use.',
      details: {
        field: 'email',
        value: newUserEmailTaken.email,
      },
    });

    // Expect the user no to be created with given credentials
    const user = await User.findOne({
      email: newUserEmailTaken.email,
      username: newUserEmailTaken.username,
    });
    expect(user).toBeNull();
  });

  it('should respond with 409 for username taken', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send(newUserUsernameTaken)
      .expect('Content-Type', /json/)
      .expect(409);

    expect(response.body).toMatchObject({
      status: 'ALREADY_EXISTS',
      message: 'Username already in use.',
      details: {
        field: 'username',
        value: newUserUsernameTaken.username,
      },
    });

    const user = await User.findOne({
      email: newUserUsernameTaken.email,
      username: newUserUsernameTaken.username,
    });
    expect(user).toBeNull();
  });

  it('should respond with 201 and signup a new user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send(newUserFormValues)
      .expect('Content-Type', /json/)
      .expect(201);

    // Assert that database was changed correctly and user has been created
    const user = await User.findOne({ email: newUserFormValues.email });
    expect(user).not.toBeNull();

    // Assertions about response
    expect(response.body).toMatchObject({
      success: true,
      message: `A verification email has been sent to ${user.email}`,
    });

    // Expect to be hashed
    expect(user.password).not.toEqual(newUserFormValues.password);

    // Find all user's tokens
    const tokens = await Token.find({ user: user._id });

    // Expect to be only one token for new user - email verification token
    expect(tokens).not.toBeNull();
    expect(tokens.length).toEqual(1);
  });
});

describe('POST /api/v1/auth/login', () => {
  it('should respond with 400 for missing required field', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'newUserMissingUsername@mail.com',
      })
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toMatchObject({
      message: 'Missing required field(s).',
    });
  });

  it('should respond with 400 for invalid login credentials', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: userOne.email,
        password: 'invalidPassword',
      })
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toMatchObject({
      message: 'Unable to login.',
    });
  });

  it('should respond with 401 for not verified user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: userNotVerified.email,
        password: userNotVerified.password,
      })
      .expect('Content-Type', /json/)
      .expect(401);

    const user = await User.findOne({ email: userNotVerified.email });
    expect(user.active).toBe(false);

    expect(response.body).toMatchObject({
      status: 'NOT_VERIFIED',
      message: 'Account has not been verified.',
    });
  });

  it('should respond with 200 and log in an existing user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: userOne.email, password: userOne.password })
      .expect('Content-Type', /json/)
      .expect(200);

    const user = await User.findById(userOneId);
    expect(response.body.user._id).toBe(user._id.toString());
    expect(response.body.token).toBe(user.jwtTokens[1].token);
  });
});

describe('POST /api/v1/auth/logout', () => {
  // TODO: Test Google?

  it('should respond with 401 for unauthenticated request', async () => {
    const response = await request(app)
      .post('/api/v1/auth/logout')
      .expect('Content-Type', /json/)
      .expect(401);

    expect(response.body).toMatchObject({
      message: 'Please authenticate.',
    });
  });

  it('should respond with 200 and logout user', async () => {
    let user = await User.findById(userOneId);
    const token = user.jwtTokens[0];
    expect(user.jwtTokens).toContain(token);

    const response = await request(app)
      .post('/api/v1/auth/logout')
      .set('Authorization', `Bearer ${token.token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    user = await User.findById(userOneId);
    expect(user.jwtTokens).not.toContain(token);
  });
});

describe('POST /api/v1/auth/logout/all', () => {
  it('should respond with 401 for unauthenticated request', async () => {
    const response = await request(app)
      .post('/api/v1/auth/logout/all')
      .expect('Content-Type', /json/)
      .expect(401);

    expect(response.body).toMatchObject({
      message: 'Please authenticate.',
    });
  });

  it('should respond with 200 and logout user from all devices', async () => {
    let user = await User.findById(userOneId);
    expect(user.jwtTokens).toHaveLength(1);

    const response = await request(app)
      .post('/api/v1/auth/logout/all')
      .set('Authorization', `Bearer ${user.jwtTokens[0].token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    user = await User.findById(userOneId);
    expect(user.jwtTokens).toHaveLength(0);
  });
});

describe('POST /api/v1/auth/verify', () => {
  it('should respond with 400 for missing required field', async () => {
    const response = await request(app)
      .post('/api/v1/auth/verify')
      .send({})
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toMatchObject({
      message: 'Missing required field(s).',
    });
  });

  it('should respond with 400 for nonexisting email', async () => {
    const nonExistingEmail = 'nonExistingEmail@mail.com';

    const response = await request(app)
      .post('/api/v1/auth/verify')
      .send({ email: nonExistingEmail })
      .expect('Content-Type', /json/)
      .expect(400);

    const user = await User.findOne({ email: nonExistingEmail });
    expect(user).toBeNull();

    expect(response.body).toMatchObject({
      message: `The email address ${nonExistingEmail} is not associated with any account.`,
    });
  });

  it('should respond with 200 for successful verification email resending', async () => {
    const email = userNotVerified.email.toLowerCase();

    const response = await request(app)
      .post('/api/v1/auth/verify')
      .send({ email })
      .expect('Content-Type', /json/)
      .expect(200);

    const user = await User.findOne({ email });
    expect(user).not.toBeNull();

    const token = await Token.findOne({ user: userNotVerified._id });
    expect(token).not.toBeNull();

    expect(response.body).toMatchObject({
      message: `A verification email has been sent to ${email}`,
    });
  });
});

describe('POST /api/v1/auth/verify/:token', () => {
  it('should respond with 400 for invalid token', async () => {
    const invalidToken = '12InvAliDtOk3ns21';

    const response = await request(app)
      .get(`/api/v1/auth/verify/${invalidToken}`)
      .expect('Content-Type', /json/)
      .expect(400);

    const token = await Token.findOne({ token: invalidToken });
    expect(token).toBeNull();

    expect(response.body).toMatchObject({
      message: 'Invalid token.',
    });
  });

  it('should respond with 400 for expired token', async () => {
    const response = await request(app)
      .get(`/api/v1/auth/verify/${expiredToken.token}`)
      .expect('Content-Type', /json/)
      .expect(400);

    // Expect toBeNull, because token gets deleted after marking as expired
    const token = await Token.findOne(expiredToken);
    expect(token).toBeNull();

    expect(response.body).toMatchObject({
      message: 'Token expired.',
    });
  });

  it('should respond with 200 for account verified with valid token', async () => {
    let user = await User.findById(validToken.user);
    expect(user.active).toBe(false);

    let token = await Token.findOne(validToken);
    expect(token).not.toBeNull();

    const response = await request(app)
      .get(`/api/v1/auth/verify/${validToken.token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    user = await User.findById(validToken.user);
    expect(user.active).toBe(true);

    // Expect token to be deleted after use
    token = await Token.findOne(validToken);
    expect(token).toBeNull();

    expect(response.body).toMatchObject({
      message: 'The account has been verified. Please log in.',
    });
  });
});

describe('POST /api/v1/auth/password/reset', () => {
  it('should respond with 400 for missing required field', async () => {
    const response = await request(app)
      .post('/api/v1/auth/password/reset')
      .send({})
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toMatchObject({
      message: 'Missing required field(s).',
    });
  });

  it('should respond with 400 for nonexisting email', async () => {
    const nonExistingEmail = 'nonExistingEmail@mail.com';

    const response = await request(app)
      .post('/api/v1/auth/password/reset')
      .send({ email: nonExistingEmail })
      .expect('Content-Type', /json/)
      .expect(400);

    const user = await User.findOne({ email: nonExistingEmail });
    expect(user).toBeNull();

    expect(response.body).toMatchObject({
      message: `This email address is not associated with any account.`,
    });
  });

  it('should respond with 200 for successful password reset email sending', async () => {
    const response = await request(app)
      .post('/api/v1/auth/password/reset')
      .send({ email: userOne.email })
      .expect('Content-Type', /json/)
      .expect(200);

    const user = await User.findOne({ email: userOne.email });
    expect(user).not.toBeNull();

    const token = await Token.findOne({ user: user._id });
    expect(token).not.toBeNull();

    expect(response.body).toMatchObject({
      success: true,
      message: `A reset email has been sent to ${user.email}`,
    });
  });
});

describe('POST /api/v1/auth/password/reset/:token', () => {
  it('should respond with 400 for invalid token', async () => {
    const invalidToken = '12InvAliDtOk3ns21';

    const response = await request(app)
      .get(`/api/v1/auth/password/reset/${invalidToken}`)
      .expect('Content-Type', /json/)
      .expect(400);

    const token = await Token.findOne({ token: invalidToken });
    expect(token).toBeNull();

    expect(response.body).toMatchObject({
      message: 'Invalid token.',
    });
  });

  it('should respond with 400 for expired token', async () => {
    const response = await request(app)
      .get(`/api/v1/auth/password/reset/${expiredToken.token}`)
      .expect('Content-Type', /json/)
      .expect(400);

    // Expect toBeNull, because token gets deleted after marking as expired
    const token = await Token.findOne(expiredToken);
    expect(token).toBeNull();

    expect(response.body).toMatchObject({
      message: 'Token expired.',
    });
  });

  it('should respond with 302 and redirect user', async () => {
    let token = await Token.findOne(validToken);
    expect(token).not.toBeNull();

    const response = await request(app)
      .get(`/api/v1/auth/password/reset/${validToken.token}`)
      .expect('Content-Type', /text/)
      .expect(302, 'Found. Redirecting to /password-reset-new');

    // Expect to have a token in the cookie
    expect(response.headers['set-cookie'][0].includes(validToken.token)).toBe(
      true
    );

    expect(response.headers['location']).toEqual('/password-reset-new');
  });
});

describe('POST /api/v1/auth/password/reset/new', () => {
  it('should respond with 400 for invalid token', async () => {
    const invalidToken = '1nVaL!Dt0k3N';

    const response = await request(app)
      .post('/api/v1/auth/password/reset/new')
      .set('Cookie', [`token=${invalidToken}`])
      .send({ newPassword: 'N3wPassw0rd!@' })
      .expect(400);

    expect(response.body).toMatchObject({
      message: 'Invalid token.',
    });
  });

  it('should respond with 400 for token expired', async () => {
    const response = await request(app)
      .post('/api/v1/auth/password/reset/new')
      .set('Cookie', [`token=${expiredToken.token}`])
      .send({ newPassword: 'N3wPassw0rd!@' })
      .expect(400);

    expect(response.body).toMatchObject({
      message: 'Token expired.',
    });
  });

  it('should respond with 400 for missing required field', async () => {
    const response = await request(app)
      .post('/api/v1/auth/password/reset/new')
      .set('Cookie', [`token=${validToken.token}`])
      .send({})
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toMatchObject({
      message: 'Missing required field(s).',
    });
  });

  it("should respond 200 for updating user's password", async () => {
    let user = await User.findById(validToken.user);
    expect(user).not.toBeNull();

    const newPassword = 'N3wPassw0rd!@';

    let isMatch = await bcrypt.compare(newPassword, user.password);
    expect(isMatch).toBe(false);

    const response = await request(app)
      .post('/api/v1/auth/password/reset/new')
      .set('Cookie', [`token=${validToken.token}`])
      .send({ password: newPassword })
      .expect(200);

    user = await User.findById(validToken.user);

    isMatch = await bcrypt.compare(newPassword, user.password);
    expect(isMatch).toBe(true);

    expect(response.body).toMatchObject({
      success: true,
      message: 'Password has been updated.',
    });

    // Expect to have cleared cookie
    expect(response.headers['set-cookie'][0].includes(validToken.token)).toBe(
      false
    );
  });
});

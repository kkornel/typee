const request = require('supertest');
const bcrypt = require('bcrypt');

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

describe('POST /api/v1/auth/register', () => {
  it('should signup a new user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send(newUser)
      .expect('Content-Type', /json/)
      .expect(201);

    // Assert that database was changed correctly and user has been created
    const user = await User.findOne({ email: newUser.email });
    expect(user).not.toBeNull();

    // Assertions about response
    expect(response.body).toMatchObject({
      message: `A verification email has been sent to ${user.email}`,
    });

    // Expect to be hashed
    expect(user.password).not.toEqual(newUser.password);

    // Find all user's tokens
    const tokens = await Token.find({ userId: user._id });

    // Expect to be only one token for new user - email verification token
    expect(tokens).not.toBeNull();
    expect(tokens.length).toEqual(1);
  });

  it('should respond with 409 for a email taken', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send(newUserEmailTaken)
      .expect('Content-Type', /json/)
      .expect(409);

    expect(response.body).toMatchObject({
      error: {
        code: 409,
        status: 'ALREADY_EXISTS',
        message: 'Email already in use.',
        details: {
          field: 'email',
          value: newUserEmailTaken.email,
        },
      },
    });

    // Expect the user hasn't been created with given credentials
    const user = await User.findOne({
      email: newUserEmailTaken.email,
      username: newUserEmailTaken.username,
    });
    expect(user).toBeNull();
  });

  it('should respond with 409 for a username taken', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send(newUserUsernameTaken)
      .expect('Content-Type', /json/)
      .expect(409);

    expect(response.body).toMatchObject({
      error: {
        code: 409,
        status: 'ALREADY_EXISTS',
        message: 'Username already in use.',
        details: {
          field: 'username',
          value: newUserUsernameTaken.username,
        },
      },
    });

    // Expect the user hasn't been created with given credentials
    const user = await User.findOne({
      email: newUserUsernameTaken.email,
      username: newUserUsernameTaken.username,
    });
    expect(user).toBeNull();
  });

  // it('should break', async () => {
  //   const response = await request(app)
  //     .post('/api/v1/auth/register')
  //     .send({
  //       em: '',
  //       username: '',
  //       password: 21312,
  //     })
  //     .expect(409);
  // });
});

describe('POST /api/v1/auth/login', () => {
  it('should log in existing user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: userOne.email, password: userOne.password })
      .expect('Content-Type', /json/)
      .expect(200);

    const user = await User.findById(userOneId);
    expect(response.body.user._id).toBe(user._id.toString());
    expect(response.body.token).toBe(user.jwtTokens[1].token);
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
      error: {
        code: 401,
        status: 'NOT_VERIFIED',
        message: 'Account has not been verified.',
        details: {
          field: 'email',
          value: userNotVerified.email,
        },
      },
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
      error: {
        code: 400,
        status: 'BAD_REQUEST',
        message: 'Unable to login.',
        details: {
          field: 'email',
          value: userOne.email,
        },
      },
    });
  });
});

describe('GET /api/v1/auth/verify/:token', () => {
  it('should respond with 400 for invalid token', async () => {
    const invalidToken = '12InvAliDtOk3ns21';
    const response = await request(app)
      .get(`/api/v1/auth/verify/${invalidToken}`)
      .expect('Content-Type', /json/)
      .expect(400);

    const token = await Token.findOne({ token: invalidToken });
    expect(token).toBeNull();

    expect(response.body).toMatchObject({
      error: {
        code: 400,
        status: 'INVALID_ARGUMENT',
        message: 'Invalid token.',
      },
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
      error: {
        code: 400,
        status: 'BAD_REQUEST',
        message: 'Token expired.',
      },
    });
  });

  it('should respond with 200 for account verified with valid token', async () => {
    let user = await User.findById(validToken.userId);
    expect(user.active).toBe(false);

    let token = await Token.findOne(validToken);
    expect(token).not.toBeNull();

    const response = await request(app)
      .get(`/api/v1/auth/verify/${validToken.token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    user = await User.findById(validToken.userId);
    expect(user.active).toBe(true);

    // Expect token to be deleted after use
    token = await Token.findOne(validToken);
    expect(token).toBeNull();

    expect(response.body).toMatchObject({
      message: 'The account has been verified.',
    });
  });
});

describe('POST /api/v1/auth/verify', () => {
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
      error: {
        code: 400,
        status: 'BAD_REQUEST',
        message: `The email address ${nonExistingEmail} is not associated with any account.`,
      },
    });
  });

  it('should respond with 200 for successful verification email sending', async () => {
    const email = userNotVerified.email.toLowerCase();
    const response = await request(app)
      .post('/api/v1/auth/verify')
      .send({ email })
      .expect('Content-Type', /json/)
      .expect(200);

    const user = await User.findOne({ email });
    expect(user).not.toBeNull();

    const token = await Token.findOne({ userId: userNotVerified._id });
    expect(token).not.toBeNull();

    expect(response.body).toMatchObject({
      message: `A verification email has been sent to ${email}`,
    });
  });
});

describe('GET /api/v1/auth/password/reset/:token', () => {
  it('should respond with 400 for invalid token', async () => {
    const invalidToken = '12InvAliDtOk3ns21';
    const response = await request(app)
      .get(`/api/v1/auth/password/reset/${invalidToken}`)
      .expect('Content-Type', /json/)
      .expect(400);

    const token = await Token.findOne({ token: invalidToken });
    expect(token).toBeNull();

    expect(response.body).toMatchObject({
      error: {
        code: 400,
        status: 'INVALID_ARGUMENT',
        message: 'Invalid token.',
      },
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
      error: {
        code: 400,
        status: 'BAD_REQUEST',
        message: 'Token expired.',
      },
    });
  });

  it('should respond with 302', async () => {
    let token = await Token.findOne(validToken);
    expect(token).not.toBeNull();

    const response = await request(app)
      .get(`/api/v1/auth/password/reset/${validToken.token}`)
      .expect('Content-Type', /text/)
      .expect(302, 'Found. Redirecting to /password/reset/new');

    // Expect to have a token in the cookie
    expect(response.headers['set-cookie'][0].includes(validToken.token)).toBe(
      true
    );

    expect(response.headers['location']).toEqual('/password/reset/new');
  });
});

describe('POST /api/v1/auth/password/reset', () => {
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
      error: {
        code: 400,
        status: 'BAD_REQUEST',
        message: `The email address ${nonExistingEmail} is not associated with any account.`,
      },
    });
  });

  it('should respond with 200 for successful verification email sending', async () => {
    const email = userNotVerified.email.toLowerCase();
    const response = await request(app)
      .post('/api/v1/auth/verify')
      .send({ email })
      .expect('Content-Type', /json/)
      .expect(200);

    const user = await User.findOne({ email });
    expect(user).not.toBeNull();

    const token = await Token.findOne({ userId: userNotVerified._id });
    expect(token).not.toBeNull();

    expect(response.body).toMatchObject({
      message: `A verification email has been sent to ${email}`,
    });
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
      error: {
        code: 400,
        status: 'INVALID_ARGUMENT',
        message: 'Invalid token.',
      },
    });
  });

  it('should respond with 400 for token expired', async () => {
    const response = await request(app)
      .post('/api/v1/auth/password/reset/new')
      .set('Cookie', [`token=${expiredToken.token}`])
      .send({ newPassword: 'N3wPassw0rd!@' })
      .expect(400);

    expect(response.body).toMatchObject({
      error: {
        code: 400,
        status: 'BAD_REQUEST',
        message: 'Token expired.',
      },
    });
  });

  it(`should respond 200 for updating user's password`, async () => {
    let user = await User.findById(validToken.userId);
    expect(user).not.toBeNull();

    const newPassword = 'N3wPassw0rd!@';

    let isMatch = await bcrypt.compare(newPassword, user.password);
    expect(isMatch).toBe(false);

    const response = await request(app)
      .post('/api/v1/auth/password/reset/new')
      .set('Cookie', [`token=${validToken.token}`])
      .send({ newPassword })
      .expect(200);

    user = await User.findById(validToken.userId);

    isMatch = await bcrypt.compare(newPassword, user.password);
    expect(isMatch).toBe(true);

    expect(response.body).toMatchObject({
      message: 'Password has been updated.',
    });

    // Expect to have cleared cookie
    expect(response.headers['set-cookie'][0].includes(validToken.token)).toBe(
      false
    );
  });
});

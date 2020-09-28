const request = require('supertest');

const app = require('../app');

describe('auth validator', () => {
  it('should respond with 422 for empty fields', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({})
      .expect('Content-Type', /json/)
      .expect(422);

    const errors = {
      email: {
        message: 'Required field',
      },
      username: {
        message: 'Required field',
      },
      password: {
        message: 'Required field',
      },
    };

    expect(response.body).toMatchObject({ errors });
  });

  it('should respond with 422 for invalid email', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'invalid@mail',
        username: 'ValidUsername',
        password: 'Strong123!',
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
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'valid@mail.com',
        username: 'Invalid!@#$',
        password: 'Strong123!',
      })
      .expect('Content-Type', /json/)
      .expect(422);

    const errors = {
      username: {
        message: 'Only alphanumerics (letters and numbers)',
      },
    };

    expect(response.body).toMatchObject({ errors });

    const response2 = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'valid@mail.com',
        username: 'Inv',
        password: 'Strong123!',
      })
      .expect('Content-Type', /json/)
      .expect(422);

    const errors2 = {
      username: {
        message: 'Required min length of 4 and max of 18',
      },
    };

    expect(response2.body).toMatchObject({ errors: errors2 });
  });

  it('should respond with 422 for invalid password', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'valid@mail.com',
        username: 'ValidUsername',
        password: 'NoNumbers',
      })
      .expect('Content-Type', /json/)
      .expect(422);

    const errors = {
      password: {
        message:
          'Must contain at least 8 Characters, 1 Uppercase, 1 Lowercase and 1 Number',
      },
    };

    expect(response.body).toMatchObject({ errors });

    const response2 = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'valid@mail.com',
        username: 'ValidUsername',
        password: 'nouppercase1',
      })
      .expect('Content-Type', /json/)
      .expect(422);

    expect(response2.body).toMatchObject({ errors });

    const response3 = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'valid@mail.com',
        username: 'ValidUsername',
        password: 'NOLOWERCASE1',
      })
      .expect('Content-Type', /json/)
      .expect(422);

    expect(response3.body).toMatchObject({ errors });

    const response4 = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'valid@mail.com',
        username: 'ValidUsername',
        password: 'short',
      })
      .expect('Content-Type', /json/)
      .expect(422);

    expect(response4.body).toMatchObject({ errors });
  });
});

import sinon from 'sinon';
import { faker } from '@faker-js/faker';
import { client } from './setup';
import { EmailService } from '../src/services';
import { UserRepository } from '../src/repositories';
import { UserReturn } from '../src/types/user';

const AUTH_URL = '/v1/auth';

describe('test /auth routes', () => {
  let tokens: any = null;
  const newUser = {
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(10),
  };
  it('registers new user', async () => {
    const stub = sinon.stub(EmailService, 'sendOnboardingEmail');
    const response = await client.post(`${AUTH_URL}/register`).send(newUser);
    expect(response.status).toBe(200);
    expect(stub.calledOnce).toBe(true);
    expect(Object.keys(response.body)).toStrictEqual(['user', 'tokens']);
    expect(Object.keys(response.body.user)).toStrictEqual([
      'uuid',
      'email',
      'username',
      'role',
      'name',
      'age',
      'created',
      'updated',
    ]);
    expect(response.body.tokens.accessToken.exp).toStrictEqual(86400);
    expect(response.body.tokens.refreshToken.exp).toStrictEqual(432000);
    expect(stub.calledOnceWith(newUser.email, newUser.username));

    const newUserDb = await UserRepository.getUserByEmail(newUser.email);

    expect(newUserDb?.email).toStrictEqual(newUser.email);
    expect(newUserDb?.username).toStrictEqual(newUser.username.toLowerCase());

    tokens = response.body.tokens;
  }, 10000);

  it('gets my profile', async () => {
    const response = await client
      .get(`${AUTH_URL}/me`)
      .set('Authorization', `Bearer ${tokens.accessToken.token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.username).toStrictEqual(newUser.username.toLowerCase());
    expect(response.body.email).toStrictEqual(newUser.email);
  });

  it('logins me with credentials', async () => {
    const response = await client
      .post(`${AUTH_URL}/login`)
      .send({ email: newUser.email, password: newUser.password });

    expect(response.statusCode).toBe(200);
  });

  it('logs me out', async () => {
    const response = await client
      .post(`${AUTH_URL}/logout`)
      .set('Authorization', `Bearer ${tokens.accessToken.token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ message: 'User signed out.' });
    const userFromDb = await UserRepository.getUserByEmail(newUser.email, UserReturn);
    expect(userFromDb?.signedOut).toBeDefined();
  });

  it('returns 401 token invalid error', async () => {
    const response = await client
      .get(`${AUTH_URL}/me`)
      .set('Authorization', `Bearer ${tokens.accessToken.token}`);

    expect(response.statusCode).toBe(401);
    expect(response.body.code).toStrictEqual(401);
    expect(response.body.message).toStrictEqual('Expired token.');
  });
});

import { client } from './setup';
import { faker } from '@faker-js/faker';

const AUTH_URL = '/v1/auth';

describe('Register', () => {
  it('registers the user', async () => {
    const newUser = {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };
    const response = await client.post(`${AUTH_URL}/register`).send(newUser);
    expect(response.status).toBe(200);
  }, 10000);
});

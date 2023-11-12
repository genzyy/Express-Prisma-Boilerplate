import { faker } from '@faker-js/faker';
import { client } from '../setup';

const AUTH_URL = '/auth';

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

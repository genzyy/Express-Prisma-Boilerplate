import { assert } from 'chai';
import { faker } from '@faker-js/faker';
import { client } from '../setup';

describe('API test', () => {
  it('test user register', async () => {
    const payload = {
      username: faker.internet.userName,
      email: faker.internet.email,
      password: faker.internet.password,
    };
    const response = await client.post('/v1/auth/register').send(payload);
    assert.equal(response.statusCode, 200);
  });
});

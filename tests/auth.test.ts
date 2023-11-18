import sinon from 'sinon';
import { faker } from '@faker-js/faker';
import { client } from './setup';
import { EmailService } from '../src/services';

const AUTH_URL = '/v1/auth';

describe('Register', () => {
  it('registers the user', async () => {
    const stub = sinon.stub(EmailService, 'sendOnboardingEmail');
    const newUser = {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };
    const response = await client.post(`${AUTH_URL}/register`).send(newUser);
    expect(response.status).toBe(200);
    expect(stub.calledOnce).toBe(true);
    expect(stub.calledOnceWith(newUser.email, newUser.username));
  }, 10000);
});

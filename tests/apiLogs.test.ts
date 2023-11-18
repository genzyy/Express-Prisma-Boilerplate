import { client } from './setup';

describe('API logs', () => {
  it('checks api health', async () => {
    const response = await client.get('/logs/health');
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({ status: 'API healthy' });
  }, 10000);
});

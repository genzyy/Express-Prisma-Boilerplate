import request from 'supertest';
import app from '../src/app';

describe('API logs', () => {
  it('checks api health', async () => {
    const response = await request(app).get('/logs/health');
    expect(response.status).toBe(200);
  }, 10000);
});

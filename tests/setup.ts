import request from 'supertest';
import app from '../src/app';

const client = request(app);

export { client };

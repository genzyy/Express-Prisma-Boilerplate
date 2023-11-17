import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';

import app from '../app';

dotenv.config({ path: '.env.test', override: true });

chai.use(chaiHttp);

const client = chai.request(app);

export { client };

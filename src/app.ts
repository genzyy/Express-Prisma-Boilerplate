import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import passport from 'passport';

import config from './core/config';
import morgan from './core/morgan';
import { startApolloServer } from './core/graphql/apollo';
import JwtStrategy from './core/passport';
import { errorConverter, errorHandler } from './core/middlewares/error';

import routes from './routes/v1';
import { NotFound } from './utils/ApiError';

const app = express();

if (config.environment !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

app.use(helmet());
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.use(passport.initialize());
passport.use('jwt', JwtStrategy);

app.use((req, res, next) => {
  next(new NotFound());
});

app.use(errorConverter);
app.use(errorHandler);

startApolloServer();

app.use('/v1', routes);

export default app;

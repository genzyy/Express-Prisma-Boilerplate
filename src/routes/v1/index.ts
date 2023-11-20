import { Router } from 'express';
import authRoute from './auth.route';

const v1Router = Router();

const routes = [
  {
    path: '/auth',
    route: authRoute,
  },
];

routes.forEach((route) => {
  v1Router.use(route.path, route.route);
});

export { v1Router };

import Joi from 'joi';

const register = {
  body: Joi.object().keys({
    username: Joi.string().required().lowercase(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(7),
  }),
};

export default { register };

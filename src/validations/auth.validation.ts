import Joi from 'joi';

const register = {
  body: Joi.object().keys({
    username: Joi.string().required().lowercase(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(7),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required(),
  }),
};

const getMe = {
  headers: Joi.object().keys({
    authorization: Joi.string().token(),
  }),
};
export default { register, login, getMe };

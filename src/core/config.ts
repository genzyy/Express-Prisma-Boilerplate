import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const envVarsSchema = Joi.object()
  .keys({
    ENVIRONMENT: Joi.string().valid('production', 'development', 'staging').required(),
    PORT: Joi.number().default(3000),
    REDIS_URL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().required(),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().required(),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number().required(),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number().required(),
    SHOW_SQL_QUERIES: Joi.bool().default(false),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Error validating config: ${error.message}`);
}

export default {
  environment: envVars.ENVIRONMENT,
  port: envVars.PORT,
  redisUrl: envVars.REDIS_URL,
  logging: {
    showSqlQueries: envVars.SHOW_SQL_QUERIES,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
};

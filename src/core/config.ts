import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const envVarsSchema = Joi.object()
  .keys({
    ENVIRONMENT: Joi.string().valid('production', 'development', 'staging', 'test').required(),
    PORT: Joi.number().default(3000),
    REDIS_URL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().required(),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().required(),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number().required(),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number().required(),
    SHOW_SQL_QUERIES: Joi.bool().default(false),
    SENTRY_DSN: Joi.string().default(''),
    SENTRY_ENVIRONMENT: Joi.string().default('development'),
    COMPANY_SENDER_EMAIL: Joi.string().email().default('no-reply@company.com'),
    QUEUE_REDIS_HOST: Joi.string().default(''),
    QUEUE_REDIS_PORT: Joi.number().default(6379),
    QUEUE_CONCURRENCY: Joi.number().default(1),
    AWS_REGION: Joi.string().default(''),
    AWS_SES_API_VERSION: Joi.string().default(''),
    API_STATUS: Joi.string().default(''),
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
  devEnvironments: ['development', 'test'],
  port: envVars.PORT,
  redisUrl: envVars.REDIS_URL,
  api: {
    status: envVars.API_STATUS,
  },
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
  sentry: {
    dsn: envVars.SENTRY_DSN,
    environment: envVars.SENTRY_ENVIRONMENT,
  },
  emailService: {
    companySenderEmail: envVars.COMPANY_SENDER_EMAIL,
    queue: {
      redisHost: envVars.QUEUE_REDIS_HOST,
      redisPort: envVars.QUEUE_REDIS_PORT,
      concurrency: envVars.QUEUE_CONCURRENCY,
    },
  },
  aws: {
    region: envVars.AWS_REGION,
    ses_api_version: envVars.AWS_SES_API_VERSION,
  },
};

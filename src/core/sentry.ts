import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';
import config from './config';

Sentry.init({
  dsn: config.sentry.dsn,
  environment: config.sentry.environment,
  attachStacktrace: true,
  normalizeDepth: 5,
  includeLocalVariables: true,
  integrations: [new RewriteFrames({ root: global.__dirname })],
});

export const captureMessage = (message: string, payload: object) => {
  for (const entry in Object.entries(payload)) Sentry.setExtra(entry[0], entry[1]);
  Sentry.captureMessage(message);
};

export const captureException = (exception: Error, payload: object) => {
  for (const entry in Object.entries(payload)) Sentry.setExtra(entry[0], entry[1]);
  Sentry.captureException(exception);
};

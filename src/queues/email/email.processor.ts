import { Email } from '../../types/email';
import { Job } from 'bullmq';
import { SES } from 'aws-sdk';
import nodemailer from 'nodemailer';

import config from '../../core/config';

const emailTransporter = nodemailer.createTransport({
  SES: new SES({
    region: config.aws.region,
    apiVersion: config.aws.ses_api_version,
  }),
});

export default (job: Job<Email>) => emailTransporter.sendMail(job.data);

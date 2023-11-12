import { EmailQueue } from '../queues/email/email.queue';
import config from '../core/config';
import { Email } from '../types/email';

const sendOnboardingEmail = async (recipient: string, name: string) => {
  const emailData: Email = {
    recipient: recipient,
    sender: config.emailService.companySenderEmail,
    html: `<h1>Welcome ${name}</h1>`,
    subject: `Welcome to the app, ${name}`,
  };
  await EmailQueue.add('onboarding-email', emailData);
};

export default { sendOnboardingEmail };

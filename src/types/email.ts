export interface Email {
  sender: string;
  recipient: string;
  subject: string;
  html: string;
}
export const EMAIL_QUEUE_IDENTIFIER = 'email-queue';

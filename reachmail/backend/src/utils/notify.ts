import { IncomingWebhook } from '@slack/webhook';
import axios from 'axios';

const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
const webhookUrl = process.env.WEBHOOK_SITE_URL;

export const notifySlack = async (email: any) => {
  if (!slackWebhookUrl) return;
  const webhook = new IncomingWebhook(slackWebhookUrl);
  await webhook.send({
    text: `📧 New *Interested* email received!\n*From:* ${email.from}\n*Subject:* ${email.subject}`,
  });
};

export const triggerWebhook = async (email: any) => {
  if (!webhookUrl) return;
  await axios.post(webhookUrl, {
    event: 'InterestedEmail',
    data: {
      from: email.from,
      subject: email.subject,
      text: email.body,
    },
  });
};

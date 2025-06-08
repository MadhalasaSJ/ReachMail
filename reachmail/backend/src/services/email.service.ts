import { esClient } from '../utils/elasticsearch';
import { categorizeEmail } from '../utils/categorizeEmail';
import { notifySlack, triggerWebhook } from '../utils/notify';

export interface Email {
  subject: string;
  from: string;
  to: string;
  body: string;
  date: string; // ISO string or Date
}

const indexEmail = async (email: Email): Promise<void> => {
  try {
    const category = categorizeEmail(email.subject, email.body);

    const doc = {
      subject: email.subject,
      from: email.from,
      to: email.to,
      text: email.body,
      date: email.date,
      category,
    };

    await esClient.index({
      index: 'emails',
      document: doc,
    });

    if (category === 'Interested') {
      await Promise.all([
        notifySlack(email),
        triggerWebhook(email),
      ]);
    }
  } catch (error) {
    console.error('Error indexing email:', error);
  }
};

export default indexEmail;

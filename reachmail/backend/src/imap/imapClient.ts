import imaps from 'imap-simple';
import type { ImapSimpleOptions as ClientOptions } from 'imap-simple';
import { simpleParser } from 'mailparser';
import { Client } from '@elastic/elasticsearch';
import { categorizeEmail } from '../services/aiCategorizer'; 
import axios from 'axios'; 

const esClient = new Client({ node: 'http://localhost:9200' });

const config: ClientOptions = {
  imap: {
    user: process.env.EMAIL_USER!,
    password: process.env.EMAIL_PASS!,
    host: process.env.EMAIL_HOST!,
    port: 993,
    tls: true,
    authTimeout: 3000
  }
};

export const fetchAndIndexEmails = async () => {
  const connection = await imaps.connect(config);
  await connection.openBox('INBOX');

  const searchCriteria = ['ALL'];
  const fetchOptions = {
    bodies: ['HEADER', 'TEXT'],
    markSeen: false
  };

  const messages = await connection.search(searchCriteria, fetchOptions);

  for (const item of messages) {
    const all = item.parts.find((part: any) => part.which === 'TEXT');
    const parsed = await simpleParser(all.body);

    const subject = parsed.subject || '';
    const body = parsed.text || '';

    const category = await categorizeEmail(subject, body);

    const emailDoc = {
      subject,
      from: parsed.from?.text,
      to: parsed.to?.text,
      date: parsed.date,
      body,
      category
    };

    await esClient.index({
      index: 'emails',
      body: emailDoc
    });

    console.log(`📩 Indexed: ${subject} | 🏷️ Category: ${category}`);

    if (category === 'Interested') {
      await axios.post(process.env.SLACK_WEBHOOK_URL!, {
        text: `🚀 New Interested Email: ${subject} from ${emailDoc.from}`
      });

      await axios.post('https://webhook.site/YOUR-UNIQUE-ID', emailDoc);
    }
  }

  await connection.end();
};

export const startRealTimeSync = async () => {
  const connection = await imaps.connect(config);
  await connection.openBox('INBOX');

  console.log('📡 IMAP IDLE mode started. Waiting for new emails...');

  connection.on('mail', async () => {
    console.log('📥 New email detected!');
    const searchCriteria = ['UNSEEN'];
    const fetchOptions = {
      bodies: ['HEADER', 'TEXT'],
      markSeen: false
    };

    const messages = await connection.search(searchCriteria, fetchOptions);

    for (const item of messages) {
      const all = item.parts.find((part: any) => part.which === 'TEXT');
      const parsed = await simpleParser(all.body);

      const subject = parsed.subject || '';
      const body = parsed.text || '';

      const category = await categorizeEmail(subject, body);

      const emailDoc = {
        subject,
        from: parsed.from?.text,
        to: parsed.to?.text,
        date: parsed.date,
        body,
        category
      };

      await esClient.index({
        index: 'emails',
        body: emailDoc
      });

      console.log(`✅ Real-time Email Indexed: ${subject} | Category: ${category}`);

      if (category === 'Interested') {
        await axios.post(process.env.SLACK_WEBHOOK_URL!, {
          text: `🚀 New Interested Email: ${subject} from ${emailDoc.from}`
        });

        await axios.post('https://webhook.site/YOUR-UNIQUE-ID', emailDoc);
      }
    }
  });
};

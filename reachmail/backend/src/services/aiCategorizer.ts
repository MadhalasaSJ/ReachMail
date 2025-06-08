// backend/utils/aiCategorizer.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // Add this to your .env
});

const categories = [
  'Interested',
  'Meeting Booked',
  'Not Interested',
  'Spam',
  'Out of Office',
];

export async function categorizeEmail(subject: string, text: string): Promise<string> {
  const prompt = `Categorize the following email into one of these categories: ${categories.join(', ')}.
  
Email Subject: "${subject}"
Email Body: "${text}"

Only reply with the category name.`;

  try {
    const res = await openai.chat.completions.create({
      model: 'gpt-4o', // or gpt-3.5-turbo
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
    });

    const response = res.choices[0].message.content?.trim() || 'Not Interested';

    // Ensure valid category
    if (categories.includes(response)) {
      return response;
    } else {
      return 'Not Interested';
    }
  } catch (err) {
    console.error('AI categorization failed:', err);
    return 'Not Interested';
  }
}

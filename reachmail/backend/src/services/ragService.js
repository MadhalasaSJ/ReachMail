// services/ragService.js
const axios = require('axios');
const { loadContext } = require('./vectorStore');

async function generateRAGReply(emailContent) {
  console.log("📩 Generating RAG reply for content:", emailContent.slice(0, 100));

  try {
    const collection = await loadContext();
    console.log("✅ Vector store loaded");

    const relevant = await collection.query({
      queryTexts: [emailContent],
      nResults: 2,
    });

    console.log("📄 Retrieved relevant documents:", relevant.documents);

    const context = relevant.documents.flat().join("\n");

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an assistant replying to emails. Use the company agenda when relevant."
        },
        {
          role: "user",
          content: `Context:\n${context}\n\nEmail:\n${emailContent}`
        }
      ]
    }, {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("✅ OpenAI API response received");
    return response.data.choices[0].message.content;

  } catch (err) {
    console.error("❌ RAG error:", err?.response?.data || err.message || err);
    throw new Error("Failed to generate reply from OpenAI");
  }
}

module.exports = { generateRAGReply };

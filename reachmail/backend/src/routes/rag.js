// routes/rag.js
const express = require('express');
const router = express.Router();
const { generateRAGReply } = require('../services/ragService'); // service function for RAG

router.post('/suggest-reply', async (req, res) => {
  const { emailContent } = req.body;
  if (!emailContent) {
    return res.status(400).json({ error: 'Email content is required' });
  }

  try {
    const reply = await generateRAGReply(emailContent);
    res.json({ reply });
  } catch (err) {
    console.error('RAG error:', err.response?.data || err.message || err);
    res.status(500).json({ error: 'Failed to generate reply' });
  }
});

module.exports = router;

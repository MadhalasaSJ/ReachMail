import React, { useState } from 'react';
import axios from 'axios';

const ComposeEmail: React.FC = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');

  const handleSend = async () => {
    try {
      await axios.post('/api/email/send', { to, subject, text });
      alert('Email sent successfully!');
      setTo('');
      setSubject('');
      setText('');
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to send email.');
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Compose Email</h2>
      <input
        type="email"
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="w-full p-3 mb-4 rounded bg-gray-100 dark:bg-gray-700"
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full p-3 mb-4 rounded bg-gray-100 dark:bg-gray-700"
      />
      <textarea
        placeholder="Message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-3 mb-4 rounded bg-gray-100 dark:bg-gray-700"
        rows={6}
      />
      <button
        onClick={handleSend}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Send
      </button>
    </div>
  );
};

export default ComposeEmail;

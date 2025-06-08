// src/components/EmailItem.tsx
import React from 'react';
import { Trash2, Archive, Star, Send } from 'lucide-react';

interface Email {
  subject: string;
  from: string;
  to: string;
  text: string;
  date: string;
  category: string;
}

interface Props {
  email: Email;
  onDelete: () => void;
  onArchive: () => void;
  onStar: () => void;
  onSend: () => void;
}

const EmailItem: React.FC<Props> = ({ email, onDelete, onArchive, onStar, onSend }) => {
  // ✍️ Suggest Reply Handler
  const handleSuggestReply = async () => {
    try {
      const res = await fetch('/api/rag/suggest-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailContent: email.text }),
      });

      const data = await res.json();
      console.log('✅ Suggested reply response:', data);

      if (!res.ok || !data.reply) {
        alert('⚠️ Failed to generate a suggested reply.');
        return;
      }

      alert(`Suggested reply: ${data.reply}`);
    } catch (error) {
      console.error('❌ Error fetching suggested reply:', error);
      alert('❌ Failed to get suggested reply.');
    }
  };

  return (
    <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl border-l-4 border-blue-500 transition-all">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold line-clamp-1">{email.subject}</h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(email.date).toLocaleString()}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">From: {email.from}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">To: {email.to}</p>
      <p className="text-gray-800 dark:text-gray-200 mt-3 text-sm line-clamp-2">
        {email.text.slice(0, 120)}...
      </p>

      {/* ✍️ Suggest Reply Button */}
      <div className="mt-2">
        <button
          onClick={handleSuggestReply}
          className="text-blue-500 hover:underline text-sm"
        >
          ✍️ Suggest Reply
        </button>
      </div>

      <div className="mt-3 flex justify-between items-center">
        <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 rounded-full">
          {email.category}
        </span>
        <div className="flex space-x-3">
          <button onClick={onDelete} className="text-red-500 hover:text-red-700" title="Delete">
            <Trash2 size={16} />
          </button>
          <button onClick={onArchive} className="text-yellow-500 hover:text-yellow-700" title="Archive">
            <Archive size={16} />
          </button>
          <button onClick={onStar} className="text-blue-500 hover:text-blue-700" title="Star">
            <Star size={16} />
          </button>
          <button onClick={onSend} className="text-green-500 hover:text-green-700" title="Send">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailItem;

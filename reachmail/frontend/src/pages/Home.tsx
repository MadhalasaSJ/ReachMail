import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import EmailList from '../components/EmailList';
import ComposeEmail from '../components/ComposeEmail';
import axios from 'axios';

interface Email {
  subject: string;
  from: string;
  to: string;
  text: string;
  date: string;
  category: string;
  id?: string;
}

interface HomeProps {
  activeTab: string;
}

const Home: React.FC<HomeProps> = ({ activeTab }) => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchEmails = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get(`/api/email/search?query=${query}&folder=${activeTab}`);
      if (Array.isArray(res.data) && res.data.length > 0) {
        setEmails(res.data);
      } else {
        // Inject mock data for demo/testing
        setEmails([
          {
            subject: "Interview Invitation",
            from: "hr@example.com",
            to: "you@example.com",
            text: "Hi, Your resume has been shortlisted. When will be a good time for you to attend the technical interview?",
            date: new Date().toISOString(),
            category: "Inbox"
          },
          {
            subject: "Follow-up",
            from: "recruiter@example.com",
            to: "you@example.com",
            text: "Just checking if you're available to continue with the process.",
            date: new Date().toISOString(),
            category: "Starred"
          }
        ]);
  }
  } catch (err) {
    console.error('Failed to fetch emails:', err);
    setError('⚠️ Could not fetch emails. Backend may not be running.');
    setEmails([]);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    if (activeTab !== 'Compose') {
      fetchEmails();
    }
  }, [activeTab, query]);

  // === Email Action Handlers ===
  const handleDelete = (email: Email) => {
    setEmails((prev) => prev.filter((e) => e !== email));
  };

  const handleArchive = (email: Email) => {
    setEmails((prev) =>
      prev.map((e) => (e === email ? { ...e, category: 'Archived' } : e))
    );
  };

  const handleStar = (email: Email) => {
    alert(`⭐️ Starred email: ${email.subject}`);
  };

  const handleSend = (email: Email) => {
    alert(`📨 Resending email: ${email.subject}`);
  };

  // === Folder counts ===
  const counts = {
    Inbox: emails.filter((e) => e.category === 'Inbox').length,
    Sent: emails.filter((e) => e.category === 'Sent').length,
    Archived: emails.filter((e) => e.category === 'Archived').length,
    Starred: emails.filter((e) => e.category === 'Starred').length,
    Spam: emails.filter((e) => e.category === 'Spam').length,
  };

  return (
    <div className="flex">
      

      <div className="flex-1 p-6">
        {activeTab === 'Compose' ? (
          <ComposeEmail />
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-6 tracking-tight">📂 {activeTab}</h1>
            <SearchBar onSearch={setQuery} />

            {loading && <p className="text-center text-gray-500">Loading...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {!loading && !error && emails.length === 0 && (
              <p className="text-center text-gray-400">No emails found.</p>
            )}
            {!loading && !error && emails.length > 0 && (
              <EmailList
                emails={emails}
                onDelete={handleDelete}
                onArchive={handleArchive}
                onStar={handleStar}
                onSend={handleSend}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

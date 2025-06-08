// App.tsx
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Inbox');

  // Dummy counts for now; replace with actual logic from API or backend
  const [counts, setCounts] = useState({
    Inbox: 5,
    Sent: 2,
    Archived: 1,
    Starred: 3,
    Spam: 0,
  });

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        counts={counts}
      />
      <main className="flex-1 p-6 overflow-y-auto">
        <Home activeTab={activeTab} />
      </main>
    </div>
  );
};

export default App;

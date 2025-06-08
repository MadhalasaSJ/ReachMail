// src/components/Sidebar.tsx
import React from 'react';
import { Inbox, Send, Archive, Star, Ban, Pencil } from 'lucide-react';

interface Props {
  activeTab: string;
  counts: Record<string, number>;
  onSelectTab: (tab: string) => void;
}

const tabs = [
  { name: 'Inbox', icon: Inbox },
  { name: 'Sent', icon: Send },
  { name: 'Archived', icon: Archive },
  { name: 'Starred', icon: Star },
  { name: 'Spam', icon: Ban },
];

const Sidebar: React.FC<Props> = ({ activeTab, counts, onSelectTab }) => {
  return (
    <div className="w-64 p-4 bg-gray-100 dark:bg-gray-900 h-screen border-r dark:border-gray-700 flex flex-col">
      <h2 className="text-xl font-bold mb-6">📬 Mailbox</h2>

      {/* Compose Button */}
      <button
        onClick={() => onSelectTab('Compose')}
        className="mb-6 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition font-medium"
      >
        <Pencil size={18} className="mr-2" />
        Compose
      </button>

      <ul className="space-y-3 flex-1 overflow-y-auto">
        {tabs.map(({ name, icon: Icon }) => (
          <li
            key={name}
            onClick={() => onSelectTab(name)}
            className={`flex items-center justify-between cursor-pointer px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition ${
              activeTab === name ? 'bg-blue-200 dark:bg-blue-700 text-white font-semibold' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon size={18} />
              <span>{name}</span>
            </div>
            <span className="text-sm bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded-full">
              {counts[name] || 0}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

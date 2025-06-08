// src/components/EmailList.tsx
import React from 'react';
import EmailItem from './EmailItem';

interface Email {
  subject: string;
  from: string;
  to: string;
  text: string;
  date: string;
  category: string;
}

interface Props {
  emails: Email[];
  onDelete: (email: Email) => void;
  onArchive: (email: Email) => void;
  onStar: (email: Email) => void;
  onSend: (email: Email) => void;
}

const EmailList: React.FC<Props> = ({ emails, onDelete, onArchive, onStar, onSend }) => {
  return (
    <div className="space-y-4">
      {emails.length ? (
        emails.map((email, index) => (
          <EmailItem
            key={index}
            email={email}
            onDelete={() => onDelete(email)}
            onArchive={() => onArchive(email)}
            onStar={() => onStar(email)}
            onSend={() => onSend(email)}
          />
        ))
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-10">No emails found</p>
      )}
    </div>
  );
};

export default EmailList;
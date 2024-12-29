import React from 'react';

interface DocumentContentProps {
  content: string;
}

const DocumentContent: React.FC<DocumentContentProps> = ({ content }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
    <div className="prose dark:prose-invert max-w-none">
      {content}
    </div>
  </div>
);

export default DocumentContent;
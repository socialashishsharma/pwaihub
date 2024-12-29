import React from 'react';
import { useStore } from '../../../store/useStore';
import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const DocumentList = () => {
  const documents = useStore((state) => state.documents);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">My Documents</h2>
      
      {documents.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No documents uploaded yet</p>
      ) : (
        <ul className="space-y-4">
          {documents.map((doc) => (
            <li key={doc.id}>
              <Link
                to={`/document/${doc.id}`}
                className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition"
              >
                <FileText className="w-5 h-5 text-blue-500 mr-3" />
                <div>
                  <h3 className="font-medium dark:text-white">{doc.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DocumentList;
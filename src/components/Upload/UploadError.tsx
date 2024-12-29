import React from 'react';
import { XCircle } from 'lucide-react';

interface UploadErrorProps {
  message: string;
  onDismiss: () => void;
}

const UploadError: React.FC<UploadErrorProps> = ({ message, onDismiss }) => (
  <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-4">
    <div className="flex items-start">
      <XCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm text-red-700 dark:text-red-200">{message}</p>
      </div>
      <button
        onClick={onDismiss}
        className="ml-4 text-red-500 hover:text-red-600"
      >
        ×
      </button>
    </div>
  </div>
);

export default UploadError;
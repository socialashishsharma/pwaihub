import React from 'react';
import { Loader2 } from 'lucide-react';

const UploadProgress: React.FC = () => (
  <div className="p-8 border-2 border-gray-200 dark:border-gray-700 rounded-lg text-center">
    <Loader2 className="w-8 h-8 mx-auto mb-4 text-blue-500 animate-spin" />
    <p className="text-lg font-medium dark:text-white">
      Processing document...
    </p>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
      This may take a moment depending on the file size
    </p>
  </div>
);

export default UploadProgress;
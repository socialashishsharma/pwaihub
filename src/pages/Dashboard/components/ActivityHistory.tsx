import React from 'react';
import { Brain, FileText, PenTool, Library, Clock, AlertCircle } from 'lucide-react';
import { useActivities } from '../../../hooks/useActivities';
import { UserActivity } from '../../../types';

const ActivityHistory: React.FC = () => {
  const { activities, loading, error } = useActivities();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'quiz':
        return Brain;
      case 'essay':
        return PenTool;
      case 'flashcard':
        return Library;
      default:
        return FileText;
    }
  };

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-center text-red-500 space-x-2">
          <AlertCircle className="w-5 h-5" />
          <span>Failed to load activities</span>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">No activity yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow divide-y dark:divide-gray-700">
      {activities.map((activity) => {
        const Icon = getActivityIcon(activity.type);
        return (
          <div key={activity.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {activity.action}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(activity.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ActivityHistory;
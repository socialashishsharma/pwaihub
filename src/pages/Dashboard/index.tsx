import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, FileText, PenTool, Library, History, Upload, Plus } from 'lucide-react';
import DocumentList from './components/DocumentList';
import UploadSection from './components/UploadSection';
import ActivityHistory from './components/ActivityHistory';
import { useStore } from '../../store/useStore';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useStore();

  const features = [
    {
      title: 'Generate Quiz',
      description: 'Create AI-powered quizzes from your documents',
      icon: Brain,
      color: 'bg-purple-500',
      onClick: () => navigate('/quiz-generator')
    },
    {
      title: 'Evaluate Essay',
      description: 'Get detailed feedback on your essays',
      icon: PenTool,
      color: 'bg-blue-500',
      onClick: () => navigate('/essay-evaluation')
    },
    {
      title: 'Create Flashcards',
      description: 'Generate interactive study flashcards',
      icon: Library,
      color: 'bg-green-500',
      onClick: () => navigate('/flashcards')
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold dark:text-white mb-2">
          Welcome back, {user?.user_metadata?.name || 'Student'}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Let's continue your learning journey
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {features.map((feature) => (
          <button
            key={feature.title}
            onClick={feature.onClick}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all group"
          >
            <div className={`${feature.color} text-white p-3 rounded-lg inline-block mb-4`}>
              <feature.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {feature.description}
            </p>
          </button>
        ))}
      </div>

      {/* Upload Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold dark:text-white">Upload Documents</h2>
          <button
            onClick={() => document.getElementById('file-upload')?.click()}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            <span>New Upload</span>
          </button>
        </div>
        <UploadSection />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Documents List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold dark:text-white">My Documents</h2>
            <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
              View All
            </button>
          </div>
          <DocumentList />
        </div>

        {/* Activity History */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold dark:text-white">Recent Activity</h2>
            <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
              View All
            </button>
          </div>
          <ActivityHistory />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
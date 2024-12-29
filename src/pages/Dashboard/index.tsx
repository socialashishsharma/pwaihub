import React from 'react';
import DocumentList from './components/DocumentList';
import UploadSection from './components/UploadSection';
import QuizList from './components/QuizList';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold dark:text-white">My Dashboard</h1>
      
      <UploadSection />
      
      <div className="grid md:grid-cols-2 gap-8">
        <DocumentList />
        <QuizList />
      </div>
    </div>
  );
};

export default Dashboard;
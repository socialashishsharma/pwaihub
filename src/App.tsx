import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useStore } from './store/useStore';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Page Components
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import DocumentViewer from './pages/DocumentViewer';
import Quiz from './pages/Quiz';
import EssayEvaluation from './pages/EssayEvaluation';
import FlashcardsPage from './pages/Flashcards';

function App() {
  const darkMode = useStore((state) => state.darkMode);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Router>
        <Header />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/document/:id" element={<DocumentViewer />} />
            <Route path="/quiz/:id" element={<Quiz />} />
            <Route path="/essay-evaluation" element={<EssayEvaluation />} />
            <Route path="/flashcards" element={<FlashcardsPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
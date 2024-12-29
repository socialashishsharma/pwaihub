import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Sun, Moon, BookOpen } from 'lucide-react';

const Navbar = () => {
  const { darkMode, toggleDarkMode, user } = useStore();

  return (
    <nav className={`${
      darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
    } shadow-lg`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="w-6 h-6" />
            <span className="font-bold text-xl">DocAI</span>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="hover:text-blue-500">
                  Dashboard
                </Link>
                <button className="hover:text-blue-500">
                  Sign Out
                </button>
              </>
            ) : (
              <button className="hover:text-blue-500">
                Sign In
              </button>
            )}
            
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
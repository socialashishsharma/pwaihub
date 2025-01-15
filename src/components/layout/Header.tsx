import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Menu, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { darkMode, toggleDarkMode, user } = useStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <nav className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/src/assets/logo.png" alt="Unifined" className="w-6 h-6" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">Unifined</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/features">Features</NavLink>
            <NavLink to="/pricing">Pricing</NavLink>
            {user ? (
              <>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <button className="btn-secondary">Sign Out</button>
              </>
            ) : (
              <Link to="/login" className="btn-primary">Get Started</Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <div className="flex flex-col space-y-4 p-4">
              <NavLink to="/features" mobile>Features</NavLink>
              <NavLink to="/pricing" mobile>Pricing</NavLink>
              {user ? (
                <>
                  <NavLink to="/dashboard" mobile>Dashboard</NavLink>
                  <button className="btn-secondary w-full">Sign Out</button>
                </>
              ) : (
                <Link to="/login" className="btn-primary w-full">Get Started</Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

const NavLink = ({ to, children, mobile = false }: { 
  to: string; 
  children: React.ReactNode;
  mobile?: boolean;
}) => (
  <Link
    to={to}
    className={`
      text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white
      ${mobile ? 'block w-full py-2' : ''}
    `}
  >
    {children}
  </Link>
);

export default Header;
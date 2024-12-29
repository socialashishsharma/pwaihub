import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin 
} from 'lucide-react';

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="flex items-center space-x-2 mb-4">
            <BookOpen className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold text-white">LearnAI</span>
          </Link>
          <p className="text-gray-400">
            Transform your study materials into powerful learning tools with AI.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Product</h3>
          <ul className="space-y-2">
            <li><Link to="/features" className="hover:text-white">Features</Link></li>
            <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
            <li><Link to="/testimonials" className="hover:text-white">Testimonials</Link></li>
            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
            <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
          <ul className="space-y-2">
            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
            <li><Link to="/security" className="hover:text-white">Security</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} LearnAI. All rights reserved.
        </p>

        <div className="flex space-x-6 mt-4 md:mt-0">
          <SocialLink href="#" icon={Twitter} />
          <SocialLink href="#" icon={Facebook} />
          <SocialLink href="#" icon={Instagram} />
          <SocialLink href="#" icon={Linkedin} />
        </div>
      </div>
    </div>
  </footer>
);

const SocialLink = ({ 
  href, 
  icon: Icon 
}: {
  href: string;
  icon: React.ElementType;
}) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-white transition-colors"
  >
    <Icon className="w-5 h-5" />
  </a>
);

export default Footer;
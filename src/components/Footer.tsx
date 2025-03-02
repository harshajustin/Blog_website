import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Github, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store subscription in localStorage
    const subscribers = JSON.parse(localStorage.getItem('blog_subscribers') || '[]');
    subscribers.push({
      email,
      date: new Date().toISOString()
    });
    localStorage.setItem('blog_subscribers', JSON.stringify(subscribers));
    
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">Web Development<span className="text-blue-400">Blog</span></h3>
            <p className="text-gray-400 mb-4">
              Exploring the latest in web development, technology, and design.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-blue-400 transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-blue-400 transition-colors">About</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog?category=react" className="text-gray-400 hover:text-blue-400 transition-colors">React</Link>
              </li>
              <li>
                <Link to="/blog?category=technology" className="text-gray-400 hover:text-blue-400 transition-colors">Technology</Link>
              </li>
              <li>
                <Link to="/blog?category=accessibility" className="text-gray-400 hover:text-blue-400 transition-colors">Accessibility</Link>
              </li>
              <li>
                <Link to="/blog?category=performance" className="text-gray-400 hover:text-blue-400 transition-colors">Performance</Link>
              </li>
              <li>
                <Link to="/blog?category=css" className="text-gray-400 hover:text-blue-400 transition-colors">CSS</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            {subscribed ? (
              <p className="text-green-400 mb-4">
                Thanks for subscribing! You'll receive our latest updates.
              </p>
            ) : (
              <>
                <p className="text-gray-400 mb-4">
                  Subscribe to our newsletter for the latest updates.
                </p>
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="flex">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      required
                      className="flex-grow px-4 py-2 bg-gray-800 text-white rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r transition-colors"
                    >
                      <Mail size={20} />
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} ModernBlog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
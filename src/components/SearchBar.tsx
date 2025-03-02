import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { Post } from '../types';

interface SearchBarProps {
  onClose?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { searchPosts } = useBlog();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (query.trim().length > 2) {
      setIsSearching(true);
      // Debounce search to avoid excessive searches while typing
      const timer = setTimeout(() => {
        const searchResults = searchPosts(query);
        setResults(searchResults);
        setIsSearching(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [query, searchPosts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length > 0) {
      navigate(`/blog?search=${encodeURIComponent(query)}`);
      if (onClose) onClose();
    }
  };

  const handleResultClick = (slug: string) => {
    navigate(`/blog/${slug}`);
    setQuery('');
    if (onClose) onClose();
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full px-4 py-3 pl-10 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={18} />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X size={18} />
            </button>
          )}
        </div>
        
        {/* Search Results */}
        {query.trim().length > 2 && (
          <div className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            {isSearching ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                Searching...
              </div>
            ) : results.length > 0 ? (
              <ul>
                {results.map((post) => (
                  <li key={post.id}>
                    <button
                      onClick={() => handleResultClick(post.slug)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <p className="font-medium text-gray-900 dark:text-white">{post.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{post.excerpt}</p>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No results found for "{query}"
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
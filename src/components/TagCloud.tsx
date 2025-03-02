import React from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';

const TagCloud: React.FC = () => {
  const { posts } = useBlog();
  
  // Extract all tags and count occurrences
  const tagCounts: Record<string, number> = {};
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  // Convert to array and sort by count
  const tags = Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  // Function to determine tag size based on count
  const getTagSize = (count: number): string => {
    const max = Math.max(...Object.values(tagCounts));
    const min = Math.min(...Object.values(tagCounts));
    const range = max - min || 1;
    const normalized = (count - min) / range;
    
    if (normalized < 0.2) return 'text-xs';
    if (normalized < 0.4) return 'text-sm';
    if (normalized < 0.6) return 'text-base';
    if (normalized < 0.8) return 'text-lg';
    return 'text-xl';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Popular Tags</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map(({ name, count }) => (
          <Link
            key={name}
            to={`/blog?tag=${name}`}
            className={`${getTagSize(count)} bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-1 rounded-full transition-colors`}
          >
            {name} <span className="text-gray-500 dark:text-gray-400 text-xs">({count})</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagCloud;
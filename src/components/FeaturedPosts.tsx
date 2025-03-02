import React from 'react';
import { useBlog } from '../context/BlogContext';
import PostCard from './PostCard';

const FeaturedPosts: React.FC = () => {
  const { featuredPosts } = useBlog();

  if (featuredPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Featured Posts
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map(post => (
            <PostCard key={post.id} post={post} featured={true} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import FeaturedPosts from '../components/FeaturedPosts';
import PostCard from '../components/PostCard';
import CategoryList from '../components/CategoryList';
import TagCloud from '../components/TagCloud';

const HomePage: React.FC = () => {
  const { posts } = useBlog();
  
  // Get the latest 6 posts
  const latestPosts = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Welcome to Web DevelopmentBlog
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
            Exploring the latest in web development, technology, and design.
          </p>
          <Link 
            to="/blog" 
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Explore Articles
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>

      {/* Featured Posts Section */}
      <FeaturedPosts />

      {/* Latest Posts Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Latest Articles
            </h2>
            <Link 
              to="/blog" 
              className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center"
            >
              View All
              <ArrowRight className="ml-1" size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories and Tags Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Explore Topics
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CategoryList />
            <TagCloud />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Subscribe to our newsletter to receive the latest updates, articles, and resources.
          </p>
          
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-l-lg focus:outline-none text-gray-900"
              required
            />
            <button
              type="submit"
              className="bg-indigo-700 hover:bg-indigo-800 px-6 py-3 rounded-r-lg font-medium transition-colors"
            >
              Subscribe
            </button>
          </form>
          
          <p className="mt-4 text-sm text-blue-200">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
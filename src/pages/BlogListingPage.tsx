import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';
import CategoryList from '../components/CategoryList';
import TagCloud from '../components/TagCloud';
import { Filter, Search } from 'lucide-react';
import SearchBar from '../components/SearchBar';

const BlogListingPage: React.FC = () => {
  const location = useLocation();
  const { posts, getPostsByCategory, getPostsByTag, searchPosts } = useBlog();
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const postsPerPage = 9;
  
  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  const tagParam = queryParams.get('tag');
  const searchParam = queryParams.get('search');
  
  // Filter posts based on query parameters
  useEffect(() => {
    let result = posts;
    
    if (categoryParam) {
      result = getPostsByCategory(categoryParam);
    } else if (tagParam) {
      result = getPostsByTag(tagParam);
    } else if (searchParam) {
      result = searchPosts(searchParam);
    }
    
    setFilteredPosts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [categoryParam, tagParam, searchParam, posts, getPostsByCategory, getPostsByTag, searchPosts]);
  
  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  
  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Toggle filters on mobile
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {categoryParam 
              ? `Category: ${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)}`
              : tagParam
                ? `Tag: ${tagParam}`
                : searchParam
                  ? `Search Results: "${searchParam}"`
                  : 'Blog Articles'}
          </h1>
          
          {!searchParam && (
            <div className="max-w-xl mx-auto">
              <SearchBar />
            </div>
          )}
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar for Desktop */}
          <aside className="hidden lg:block lg:w-1/4 space-y-6">
            <CategoryList />
            <TagCloud />
          </aside>
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={toggleFilters}
              className="w-full flex items-center justify-center space-x-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md"
            >
              <Filter size={20} />
              <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
            </button>
            
            {/* Mobile Filters */}
            {showFilters && (
              <div className="mt-4 space-y-6">
                <CategoryList />
                <TagCloud />
              </div>
            )}
          </div>
          
          {/* Main Content */}
          <main className="lg:w-3/4">
            {filteredPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <Search size={48} className="mx-auto text-gray-400 mb-4" />
                <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                  No posts found
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {searchParam 
                    ? `No results found for "${searchParam}". Try a different search term.`
                    : categoryParam || tagParam
                      ? 'No posts found in this category or tag.'
                      : 'No posts available at the moment.'}
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default BlogListingPage;
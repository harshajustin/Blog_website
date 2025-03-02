import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { formatDate } from '../utils/formatDate';
import { ArrowLeft, Calendar, Clock, Tag, User } from 'lucide-react';
import CommentSection from '../components/CommentSection';
import ShareButtons from '../components/ShareButtons';
import ReadingProgress from '../components/ReadingProgress';
import { marked } from 'marked';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getPostBySlug, posts } = useBlog();
  const navigate = useNavigate();
  const [post, setPost] = useState(getPostBySlug(slug || ''));
  const [relatedPosts, setRelatedPosts] = useState<Array<any>>([]);
  
  // Set up marked options
  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  useEffect(() => {
    // If post not found, redirect to 404
    if (!post) {
      navigate('/404');
      return;
    }

    // Find related posts (same category or tags)
    const related = posts
      .filter(p => 
        p.id !== post.id && 
        (p.category === post.category || 
         p.tags.some(tag => post.tags.includes(tag)))
      )
      .slice(0, 3);
    
    setRelatedPosts(related);
    
    // Update document title
    document.title = `${post.title} | ModernBlog`;
    
    // Scroll to top when post changes
    window.scrollTo(0, 0);
  }, [post, posts, navigate, slug]);

  // If post is not found and we haven't redirected yet
  if (!post) {
    return null;
  }

  // Parse markdown content to HTML
  const contentHtml = marked(post.content);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <ReadingProgress />
      
      {/* Hero Section with Cover Image */}
      <div className="relative h-96 bg-gray-900">
        <img 
          src={post.coverImage} 
          alt={post.title}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-white mb-4 hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Blog
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center text-gray-300 gap-4 mb-2">
              <div className="flex items-center">
                <User className="mr-2" size={16} />
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2" size={16} />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2" size={16} />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <Link 
                to={`/blog?category=${post.category}`}
                className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full hover:bg-blue-700 transition-colors"
              >
                {post.category}
              </Link>
              {post.tags.map((tag, index) => (
                <Link 
                  key={index}
                  to={`/blog?tag=${tag}`}
                  className="bg-gray-700 text-gray-200 text-sm font-medium px-3 py-1 rounded-full hover:bg-gray-600 transition-colors"
                >
                  <Tag className="inline-block mr-1" size={12} />
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article Content */}
          <article className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
              {/* Author Info */}
              <div className="flex items-center mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {post.author.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Author & Content Creator
                  </p>
                </div>
              </div>
              
              {/* Article Body */}
              <div 
                className="prose prose-lg dark:prose-invert max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
              
              {/* Share Buttons */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
                <ShareButtons 
                  title={post.title} 
                  url={window.location.href} 
                />
              </div>
            </div>
            
            {/* Comments Section */}
            <CommentSection postSlug={post.slug} />
          </article>
          
          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Related Posts */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Related Posts
              </h2>
              
              {relatedPosts.length > 0 ? (
                <div className="space-y-4">
                  {relatedPosts.map(relatedPost => (
                    <div key={relatedPost.id} className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0">
                      <Link 
                        to={`/blog/${relatedPost.slug}`}
                        className="block group"
                      >
                        <div className="flex items-start">
                          <img 
                            src={relatedPost.coverImage} 
                            alt={relatedPost.title}
                            className="w-20 h-16 object-cover rounded mr-3"
                          />
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                              {relatedPost.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {formatDate(relatedPost.date)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No related posts found.
                </p>
              )}
            </div>
            
            {/* Tags Cloud */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Link 
                    key={index}
                    to={`/blog?tag=${tag}`}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-1 rounded-full text-sm transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
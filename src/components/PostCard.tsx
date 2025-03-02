import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Clock, Tag } from 'lucide-react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, featured = false }) => {
  const formattedDate = formatDistanceToNow(new Date(post.date), { addSuffix: true });

  return (
    <article 
      className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${
        featured ? 'md:col-span-2 lg:col-span-2' : ''
      }`}
    >
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="relative">
          <img 
            src={post.coverImage} 
            alt={post.title}
            className={`w-full object-cover ${featured ? 'h-64 md:h-80' : 'h-48'}`}
            loading="lazy"
          />
          {featured && (
            <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              Featured
            </span>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <span className="inline-block bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded mb-2">
              {post.category}
            </span>
            <h2 className={`text-white font-bold ${featured ? 'text-2xl' : 'text-xl'} line-clamp-2`}>
              {post.title}
            </h2>
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex items-center mb-4">
          <img 
            src={post.author.avatar} 
            alt={post.author.name}
            className="w-8 h-8 rounded-full mr-2"
          />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{post.author.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{formattedDate}</p>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <Clock size={16} className="mr-1" />
            <span>{post.readingTime} min read</span>
          </div>
          
          <div className="flex items-center">
            {post.tags.slice(0, 2).map((tag, index) => (
              <Link 
                key={index}
                to={`/blog?tag=${tag}`}
                className="flex items-center text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mr-2"
              >
                <Tag size={14} className="mr-1" />
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
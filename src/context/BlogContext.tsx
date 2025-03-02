import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Post, Category, Comment } from '../types';
import blogData from '../data/posts.json';

interface BlogContextType {
  posts: Post[];
  categories: Category[];
  featuredPosts: Post[];
  getPostBySlug: (slug: string) => Post | undefined;
  getPostsByCategory: (category: string) => Post[];
  getPostsByTag: (tag: string) => Post[];
  searchPosts: (query: string) => Post[];
  addComment: (postSlug: string, comment: Omit<Comment, 'id' | 'date'>) => void;
  getComments: (postSlug: string) => Comment[];
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});

  useEffect(() => {
    // Load posts from JSON
    setPosts(blogData.posts);
    setCategories(blogData.categories);
    
    // Load comments from localStorage
    const savedComments = localStorage.getItem('blog_comments');
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, []);

  useEffect(() => {
    // Save comments to localStorage whenever they change
    localStorage.setItem('blog_comments', JSON.stringify(comments));
  }, [comments]);

  const featuredPosts = posts.filter(post => post.featured);

  const getPostBySlug = (slug: string) => {
    return posts.find(post => post.slug === slug);
  };

  const getPostsByCategory = (category: string) => {
    return posts.filter(post => post.category === category);
  };

  const getPostsByTag = (tag: string) => {
    return posts.filter(post => post.tags.includes(tag));
  };

  const searchPosts = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    return posts.filter(
      post =>
        post.title.toLowerCase().includes(lowerCaseQuery) ||
        post.excerpt.toLowerCase().includes(lowerCaseQuery) ||
        post.content.toLowerCase().includes(lowerCaseQuery)
    );
  };

  const addComment = (postSlug: string, comment: Omit<Comment, 'id' | 'date'>) => {
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };

    setComments(prevComments => {
      const postComments = prevComments[postSlug] || [];
      return {
        ...prevComments,
        [postSlug]: [...postComments, newComment],
      };
    });
  };

  const getComments = (postSlug: string) => {
    return comments[postSlug] || [];
  };

  return (
    <BlogContext.Provider
      value={{
        posts,
        categories,
        featuredPosts,
        getPostBySlug,
        getPostsByCategory,
        getPostsByTag,
        searchPosts,
        addComment,
        getComments,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
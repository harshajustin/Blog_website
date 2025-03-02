export interface Post {
  id: string;
  title: string;
  slug: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string;
  coverImage: string;
  readingTime: number;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Comment {
  id: string;
  name: string;
  email: string;
  content: string;
  date: string;
}

export interface Subscriber {
  email: string;
  date: string;
}
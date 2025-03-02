import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Users, Award, BookOpen } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Web DevelopmentBlog</h1>
          <p className="text-xl max-w-3xl mx-auto text-blue-100">
            We're passionate about sharing knowledge and insights on web development, technology, and design.
          </p>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Story</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                ModernBlog was founded in 2025 with a simple mission: to create a platform where developers and tech enthusiasts could find high-quality, in-depth content about the latest trends and best practices in web development.
              </p>
              <p>
                What started as a small personal blog has grown into a community of passionate writers and readers who share a common interest in technology and its applications. We believe in the power of knowledge sharing and continuous learning in an industry that evolves at a rapid pace.
              </p>
              <p>
                Our team consists of experienced developers, designers, and tech enthusiasts who are committed to creating content that is not only informative but also accessible and engaging. We strive to break down complex concepts into understandable pieces, making technology more approachable for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full inline-flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Quality Content</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We prioritize depth, accuracy, and clarity in every article we publish.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full inline-flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Community Focus</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We believe in fostering a supportive community of learners and experts.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full inline-flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Continuous Learning</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We're committed to staying at the forefront of technological advancements.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md text-center">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" 
                alt="Jane Smith"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">Jane Smith</h3>
                <p className="text-blue-600 dark:text-blue-400 mb-3">Founder & Editor</p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Frontend developer with 10+ years of experience specializing in React.
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md text-center">
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" 
                alt="Alex Johnson"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">Alex Johnson</h3>
                <p className="text-blue-600 dark:text-blue-400 mb-3">Senior Writer</p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Full-stack developer passionate about emerging technologies.
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md text-center">
              <img 
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" 
                alt="Maria Rodriguez"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">Maria Rodriguez</h3>
                <p className="text-blue-600 dark:text-blue-400 mb-3">UX Specialist</p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Designer focused on creating accessible and intuitive interfaces.
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md text-center">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" 
                alt="David Chen"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">David Chen</h3>
                <p className="text-blue-600 dark:text-blue-400 mb-3">Performance Expert</p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Backend developer specializing in system optimization and scalability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Info */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Get In Touch</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center">
                <div className="bg-white dark:bg-gray-700 p-4 rounded-full mb-4">
                  <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">Email</h3>
                <p className="text-gray-600 dark:text-gray-300">webdevelopment@blog.com</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-white dark:bg-gray-700 p-4 rounded-full mb-4">
                  <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">Location</h3>
                <p className="text-gray-600 dark:text-gray-300">San Francisco, CA</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-white dark:bg-gray-700 p-4 rounded-full mb-4">
                  <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">Phone</h3>
                <p className="text-gray-600 dark:text-gray-300">(123) 456-7890</p>
              </div>
            </div>
            
            <Link 
              to="/contact" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
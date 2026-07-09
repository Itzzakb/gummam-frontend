import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Folder } from 'lucide-react';

const dummyBlogs = [
  {
    id: 1,
    title: 'Want To Succeed In Real Estate? Focus On These Habits',
    date: 'January 10, 2026',
    category: 'Technology',
    summary: 'A fairy tale (alternative names include fairytale, fairy story, magic tale, or wonder tale) is a short story that belongs to the folklore genre..',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Want To Succeed In Real Estate? Focus On These Habits',
    date: 'January 10, 2026',
    category: 'Technology',
    summary: 'A fairy tale (alternative names include fairytale, fairy story, magic tale, or wonder tale) is a short story that belongs to the folklore genre..',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Want To Succeed In Real Estate? Focus On These Habits',
    date: 'January 10, 2026',
    category: 'Technology',
    summary: 'A fairy tale (alternative names include fairytale, fairy story, magic tale, or wonder tale) is a short story that belongs to the folklore genre..',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

export const BlogSection: React.FC = () => {
  return (
    <section className="font-poppins py-16 bg-[#FAFAFA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="flex justify-center mb-6">
          <div className="relative inline-block border-b-2 border-[#0B2C5C] pb-3">
            <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#0B2C5C] font-heading">
              Our Blog
            </h2>
            <div className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#0B2C5C]"></div>
          </div>
        </div>
        
        {/* See All Link */}
        <div className="flex justify-end mb-8">
          <Link to="/blogs" className="text-[#0B2C5C] font-semibold text-[14px] underline hover:text-[#4885FF] transition-colors whitespace-nowrap">
            See all blog
          </Link>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {dummyBlogs.map((blog) => (
            <Link to={`/blog/${blog.id}`} key={blog.id} className="bg-white rounded-[12px] overflow-hidden border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full cursor-pointer block">
              
              {/* Image */}
              <div className="w-full h-[220px] overflow-hidden relative">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-[17px] font-bold text-[#1A1A1A] leading-snug mb-4">
                  {blog.title}
                </h3>
                
                {/* Meta Info */}
                <div className="flex items-center gap-6 text-[13px] text-gray-500 mb-4 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-[15px] h-[15px] text-gray-400 stroke-2" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Folder className="w-[15px] h-[15px] text-gray-400 stroke-2" />
                    <span>{blog.category}</span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-[14px] text-gray-500 leading-relaxed font-light">
                  {blog.summary}
                </p>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

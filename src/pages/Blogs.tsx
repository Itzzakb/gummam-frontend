import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, Folder } from 'lucide-react';

const featuredPost = {
  id: 101,
  title: 'High-Rise Townhouse',
  date: '10-01-2026',
  category: 'Technology',
  summary: "Practice rooms give learners the chance to put their knowledge to the test – literally. By going through exercises that closely match the certification exam, they'll get a good sense of how prepared they...",
  image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&q=80'
};

const sidebarPosts = [
  {
    id: 102,
    title: 'Want To Succeed In Real Estate? Focus On These Habits',
    date: '10-01-2026',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80'
  },
  {
    id: 103,
    title: 'Want To Succeed In Real Estate? Focus On These Habits',
    date: '10-01-2026',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80'
  },
  {
    id: 104,
    title: 'Want To Succeed In Real Estate? Focus On These Habits',
    date: '10-01-2026',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80'
  }
];

const initialGridBlogs = [
  {
    id: 1,
    title: 'Want To Succeed In Real Estate? Focus On These Habits',
    date: '10-01-2026',
    category: 'Technology',
    summary: 'A fairy tale (alternative names include fairytale, fairy story, magic tale, or wonder tale) is a short story that belongs to the folklore genre.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    overlayText: 'Tips To Invest in Real Estate India'
  },
  {
    id: 2,
    title: 'Want To Succeed In Real Estate? Focus On These Habits',
    date: '10-01-2026',
    category: 'Technology',
    summary: 'A fairy tale (alternative names include fairytale, fairy story, magic tale, or wonder tale) is a short story that belongs to the folklore genre.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
  },
  {
    id: 3,
    title: 'Want To Succeed In Real Estate? Focus On These Habits',
    date: '10-01-2026',
    category: 'Technology',
    summary: 'A fairy tale (alternative names include fairytale, fairy story, magic tale, or wonder tale) is a short story that belongs to the folklore genre.',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18efc2297?w=800&q=80'
  },
  {
    id: 4,
    title: 'Want To Succeed In Real Estate? Focus On These Habits',
    date: '10-01-2026',
    category: 'Technology',
    summary: 'A fairy tale (alternative names include fairytale, fairy story, magic tale, or wonder tale) is a short story that belongs to the folklore genre.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    overlayText: 'Tips To Invest in Real Estate India'
  },
  {
    id: 5,
    title: 'Want To Succeed In Real Estate? Focus On These Habits',
    date: '10-01-2026',
    category: 'Technology',
    summary: 'A fairy tale (alternative names include fairytale, fairy story, magic tale, or wonder tale) is a short story that belongs to the folklore genre.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
  },
  {
    id: 6,
    title: 'Want To Succeed In Real Estate? Focus On These Habits',
    date: '10-01-2026',
    category: 'Technology',
    summary: 'A fairy tale (alternative names include fairytale, fairy story, magic tale, or wonder tale) is a short story that belongs to the folklore genre.',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18efc2297?w=800&q=80'
  },
  {
    id: 7,
    title: 'Want To Succeed In Real Estate? Focus On These Habits',
    date: '10-01-2026',
    category: 'Technology',
    summary: 'A fairy tale (alternative names include fairytale, fairy story, magic tale, or wonder tale) is a short story that belongs to the folklore genre.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    overlayText: 'Tips To Invest in Real Estate India'
  },
  {
    id: 8,
    title: 'Want To Succeed In Real Estate? Focus On These Habits',
    date: '10-01-2026',
    category: 'Technology',
    summary: 'A fairy tale (alternative names include fairytale, fairy story, magic tale, or wonder tale) is a short story that belongs to the folklore genre.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
  },
  {
    id: 9,
    title: 'Want To Succeed In Real Estate? Focus On These Habits',
    date: '10-01-2026',
    category: 'Technology',
    summary: 'A fairy tale (alternative names include fairytale, fairy story, magic tale, or wonder tale) is a short story that belongs to the folklore genre.',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18efc2297?w=800&q=80'
  }
];

export const Blogs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredBlogs, setFilteredBlogs] = useState(initialGridBlogs);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase();
    const filtered = initialGridBlogs.filter(blog => 
      blog.title.toLowerCase().includes(query) || 
      blog.summary.toLowerCase().includes(query) ||
      (blog.overlayText && blog.overlayText.toLowerCase().includes(query))
    );
    setFilteredBlogs(filtered);
    setCurrentPage(1);
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-20 font-poppins">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-[13px] text-gray-500 mb-6">
          <Link to="/" className="hover:text-gray-900 cursor-pointer">Home</Link>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-gray-900 font-medium">Blogs</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[28px] font-bold text-[#0B2C5C] font-merriweather">
            Our Blogs
          </h1>
        </div>

        {/* Featured Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          
          {/* Left Large Featured Post */}
          <Link to={`/blog/${featuredPost.id}`} className="lg:col-span-2 relative h-[380px] md:h-[450px] rounded-[16px] overflow-hidden group shadow-sm block">
            <img 
              src={featuredPost.image} 
              alt={featuredPost.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent"></div>
            
            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white flex flex-col justify-end">
              <h2 className="text-[28px] md:text-[32px] font-bold mb-3 leading-tight font-merriweather">
                {featuredPost.title}
              </h2>
              
              {/* Meta Info */}
              <div className="flex items-center gap-6 text-[13px] text-gray-300 mb-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{featuredPost.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Folder className="w-4 h-4" />
                  <span>{featuredPost.category}</span>
                </div>
              </div>

              <p className="text-[13px] md:text-[14px] text-gray-300 leading-relaxed max-w-2xl line-clamp-3 font-light">
                {featuredPost.summary}
              </p>
            </div>
          </Link>

          {/* Right Sidebar Stack */}
          <div className="flex flex-col gap-4 justify-between h-auto lg:h-[450px]">
            {sidebarPosts.map((post) => (
              <Link to={`/blog/${post.id}`} key={post.id} className="bg-white rounded-[16px] border border-gray-200/60 shadow-sm flex items-center overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex-1 gap-4 block">
                <div className="w-[120px] md:w-[140px] self-stretch flex-shrink-0">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 py-3 pr-4">
                  <h3 className="text-[13px] md:text-[14px] font-bold text-gray-900 leading-snug line-clamp-2 mb-2 font-merriweather hover:text-[#00478F] transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-4 text-[11px] text-gray-500 font-medium">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Folder className="w-3.5 h-3.5 text-gray-400" />
                      <span>{post.category}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-10 max-w-[420px]">
          <input
            type="text"
            placeholder="What are looking for"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-[8px] text-[13px] focus:outline-none focus:border-[#00478F] transition-colors placeholder:text-gray-400 shadow-sm"
          />
          <button 
            type="submit"
            className="px-8 py-2.5 bg-[#0B2C5C] text-white rounded-[8px] text-[13px] font-medium hover:bg-blue-900 transition-colors shadow-sm uppercase font-semibold"
          >
            Search
          </button>
        </form>

        {/* Main Grid Section */}
        {filteredBlogs.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
              {filteredBlogs.map((blog) => (
                <Link to={`/blog/${blog.id}`} key={blog.id} className="bg-white rounded-[16px] overflow-hidden border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow flex flex-col h-[480px] cursor-pointer block">
                  
                  {/* Image with conditional overlay banner matching screenshot */}
                  <div className="w-full h-[220px] overflow-hidden relative flex-shrink-0 bg-gray-100">
                    <img 
                      src={blog.image} 
                      alt={blog.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    {blog.overlayText && (
                      <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6">
                        <span className="text-white text-[22px] font-bold leading-tight font-merriweather max-w-[200px]">
                          {blog.overlayText}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-[16px] font-bold text-gray-900 leading-snug mb-3 font-merriweather line-clamp-2 hover:text-[#00478F] transition-colors">
                        {blog.title}
                      </h3>
                      
                      {/* Meta Info */}
                      <div className="flex items-center gap-6 text-[12px] text-gray-500 mb-4 font-medium">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span>{blog.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Folder className="w-3.5 h-3.5 text-gray-400" />
                          <span>{blog.category}</span>
                        </div>
                      </div>

                      <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-4 font-light">
                        {blog.summary}
                      </p>
                    </div>
                  </div>

                </Link>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-2 mt-8">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[13px] hover:bg-gray-100 transition-colors text-gray-600"
              >
                &lt;
              </button>
              
              <button 
                onClick={() => setCurrentPage(1)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold transition-colors ${
                  currentPage === 1 ? 'bg-[#0B2C5C] text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                1
              </button>
              
              <button 
                onClick={() => setCurrentPage(2)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold transition-colors ${
                  currentPage === 2 ? 'bg-[#0B2C5C] text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                2
              </button>
              
              <button 
                onClick={() => setCurrentPage(3)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold transition-colors ${
                  currentPage === 3 ? 'bg-[#0B2C5C] text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                3
              </button>

              <span className="text-gray-400 px-1 text-[13px]">...</span>

              <button 
                onClick={() => setCurrentPage(8)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold transition-colors ${
                  currentPage === 8 ? 'bg-[#0B2C5C] text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                8
              </button>

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, 8))}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[13px] hover:bg-gray-100 transition-colors text-gray-600"
              >
                &gt;
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-200/60 shadow-sm">
            No blogs found matching "{searchQuery}"
          </div>
        )}

      </div>
    </div>
  );
};

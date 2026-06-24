import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Calendar, Folder, ChevronLeft } from 'lucide-react';

// Shared mock database for articles
const blogDatabase: { [key: string]: any } = {
  '101': {
    title: 'Considering Women’s Leadership On International Women’s Day',
    category: 'Apartment',
    subcategory: 'Technology',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    date: 'April 24, 2026'
  },
  '1': {
    title: 'Want To Succeed In Real Estate? Focus On These Habits',
    category: 'Apartment',
    subcategory: 'Technology',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80',
    date: 'January 10, 2026'
  }
};

const featuredArticles = [
  {
    id: 1,
    title: 'Want To Succeed In Real Estate? Focus On These Habits',
    date: 'January 10, 2026',
    category: 'Technology',
    summary: 'A fairy tale (alternative names include fairytale, fairy story, magic tale, or wonder tale) is a short story that belongs to the folklore genre.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    overlayText: 'Tips To Invest in Real Estate India'
  },
  {
    id: 2,
    title: 'Want To Succeed In Real Estate? Focus On These Habits',
    date: 'January 10, 2026',
    category: 'Technology',
    summary: 'A fairy tale (alternative names include fairytale, fairy story, magic tale, or wonder tale) is a short story that belongs to the folklore genre.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
  },
  {
    id: 3,
    title: 'Want To Succeed In Real Estate? Focus On These Habits',
    date: 'January 10, 2026',
    category: 'Technology',
    summary: 'A fairy tale (alternative names include fairytale, fairy story, magic tale, or wonder tale) is a short story that belongs to the folklore genre.',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18efc2297?w=800&q=80'
  }
];

export const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [comments, setComments] = useState([
    {
      id: 1,
      name: 'Marina',
      date: '2 Days Ago',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      text: 'Practice rooms are highly beneficial because they provide a safe space where students can practice and hone their skills without fear of making mistakes in real life.',
      replies: [
        {
          id: 11,
          name: 'Ravi',
          date: '2 Days Ago',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
          text: 'Practice rooms are highly beneficial because they provide a safe space where students can practice and hone their skills without fear of making mistakes in real life.'
        }
      ]
    },
    {
      id: 2,
      name: 'John',
      date: '4 Days Ago',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
      text: 'Practice rooms are highly beneficial because they provide a safe space where students can practice and hone their skills without fear of making mistakes in real life.',
      replies: []
    }
  ]);

  const [newComment, setNewComment] = useState({ name: '', email: '', text: '' });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const article = blogDatabase[id || '101'] || blogDatabase['101'];

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const commentObj = {
      id: Date.now(),
      name: newComment.name,
      date: 'Just Now',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
      text: newComment.text,
      replies: []
    };
    setComments([...comments, commentObj]);
    setSubmitSuccess(true);
    setNewComment({ name: '', email: '', text: '' });
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-20 font-poppins">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-[13px] text-gray-500 mb-10">
          <Link to="/" className="hover:text-gray-900 cursor-pointer">Home</Link>
          <ChevronRight className="w-4 h-4 mx-1" />
          <Link to="/blogs" className="hover:text-gray-900 cursor-pointer">Blogs</Link>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-gray-900 font-medium">Blogs Details</span>
        </div>

        {/* Center Categories */}
        <div className="flex justify-center items-center gap-6 text-[13px] text-gray-500 font-medium mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Folder className="w-4 h-4 text-gray-400" />
            <span>{article.subcategory || 'Technology'}</span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-[28px] md:text-[38px] font-bold text-center text-[#1A1A1A] leading-tight mb-8 font-merriweather max-w-[760px] mx-auto">
          {article.title}
        </h1>

        {/* Large Image */}
        <div className="rounded-[16px] overflow-hidden mb-8 shadow-sm h-[320px] md:h-[480px]">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Blog Paragraph Content */}
        <div className="text-[14px] text-gray-600 leading-relaxed space-y-6 text-justify font-light mb-10">
          <p>
            Important concepts are best understood through real-world applications. Practice rooms do exactly that – providing students with the opportunities to practice skills in an environment that is clean, secure, and fully customized to fit the needs of the curriculum. In this blog, we'll talk about why practice rooms are such a great addition to the learning experience.
          </p>

          <h2 className="text-[18px] font-bold text-[#1A1A1A] font-merriweather pt-2">
            Benefit Of Practice Rooms In Gaining Hands-on Learning
          </h2>

          <p>
            Practice rooms are highly beneficial because they provide a safe space where students can practice and hone their skills without fear of making mistakes in real life. These rooms are designed to replicate actual environments, allowing students to get a feel for what it is like to work in their field. They are also highly customisable, meaning that teachers can design exercises that match their specific curriculum. This makes them a great tool for hands-on learning, as it allows students to apply what they have learned in a practical setting.
          </p>

          {/* Section 1 side-by-side image & content */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-6 pt-4 items-start">
            <div className="rounded-[12px] overflow-hidden shadow-sm h-[200px]">
              <img 
                src={article.image} 
                alt="Detail representation" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-[15px] font-bold text-gray-900 font-merriweather">
                Practice Exams
              </h3>
              <p className="text-[13.5px] text-gray-500">
                Practice exams are another great feature of practice rooms. They allow students to test their knowledge and see where they need to focus their studies. This helps them prepare for their certification exams, increasing their chances of passing. They also help reduce test anxiety by making students more familiar with the exam format.
              </p>
              
              <h3 className="text-[15px] font-bold text-gray-900 font-merriweather pt-2">
                Real-world Experience
              </h3>
              <p className="text-[13.5px] text-gray-500">
                Practice rooms simulate real-world environments, which gives students experience working with tools and equipment they will use in their career. This helps them build confidence and prepares them for the workforce. It also allows them to explore different career paths and find what they are most interested in.
              </p>
            </div>
          </div>

          <h2 className="text-[18px] font-bold text-[#1A1A1A] font-merriweather pt-6">
            Increase The Support Your Company And Employees Receive
          </h2>

          <p>
            Another benefit of practice rooms is that they can be used to provide support to companies and their employees. They can be used to train new hires or to retrain existing employees on new technologies.
          </p>

          {/* Section 2 side-by-side image & content */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-6 pt-4 items-start">
            <div className="rounded-[12px] overflow-hidden shadow-sm h-[200px]">
              <img 
                src={article.image} 
                alt="Detail representation" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-[15px] font-bold text-gray-900 font-merriweather">
                Create a Learning Path
              </h3>
              <p className="text-[13.5px] text-gray-500">
                Practice rooms can be used to create a learning path for students. This helps them stay on track and ensures they are learning the skills they need to succeed in their career. It also allows teachers to monitor student progress and provide support when needed.
              </p>
              
              <h3 className="text-[15px] font-bold text-gray-900 font-merriweather pt-2">
                Recent Articles By Wellness Summit
              </h3>
              <p className="text-[13.5px] text-gray-500">
                Wellness Summit is another great feature of practice rooms. It allows students to learn about wellness and how to manage stress. This is important because real estate can be a stressful industry, and learning how to manage stress can help students succeed in their career. It also provides resources for students to get help if they need it.
              </p>
            </div>
          </div>
        </div>

        {/* Tags & Share social row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-y border-gray-200 py-4 mb-8 gap-4">
          <div className="flex items-center gap-2 text-[14px]">
            <span className="font-bold text-[#1A1A1A]">Tags:</span>
            <span className="bg-[#F2F2F2] text-[#818181] px-4 py-1.5 rounded-[8px] text-[13px] font-medium">Leadership</span>
            <span className="border border-[#00478F] text-[#00478F] bg-white px-4 py-1.5 rounded-[8px] text-[13px] font-semibold">Guide</span>
            <span className="bg-[#F2F2F2] text-[#818181] px-4 py-1.5 rounded-[8px] text-[13px] font-medium">News</span>
          </div>

          {/* Social media icons */}
          <div className="flex items-center gap-3 text-[14px]">
            <span className="font-medium text-gray-800">Share:</span>
            <a href="#" className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:opacity-85 transition-opacity">
              <img src="/icons/google.png" alt="Google" className="w-[18px] h-[18px] object-contain" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:opacity-85 transition-opacity">
              <img src="/icons/instagram.png" alt="Instagram" className="w-[18px] h-[18px] object-contain" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:opacity-85 transition-opacity">
              <img src="/icons/facebook.png" alt="Facebook" className="w-[18px] h-[18px] object-contain" />
            </a>
          </div>
        </div>

        {/* Prev & Next Post row */}
        <div className="flex justify-between items-center border-b border-gray-200/60 pb-8 mb-10">
          {/* Previous Link */}
          <Link to="#" className="flex items-center gap-3.5 group text-left max-w-[45%]">
            <span className="w-11 h-11 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 group-hover:bg-gray-50 transition-colors shrink-0">
              <ChevronLeft className="w-[18px] h-[18px] text-gray-800" />
            </span>
            <div className="min-w-0">
              <span className="text-[12px] text-gray-400 block font-normal mb-1">Previous</span>
              <span className="text-[16px] font-semibold text-[#1D293F] block truncate hover:text-[#00478F] transition-colors leading-tight">
                Auto-Welcome Message
              </span>
            </div>
          </Link>

          {/* Next Link */}
          <Link to="#" className="flex items-center justify-end gap-3.5 group text-right max-w-[45%] ml-auto">
            <div className="min-w-0">
              <span className="text-[12px] text-gray-400 block font-normal mb-1">Next</span>
              <span className="text-[16px] font-semibold text-[#1D293F] block truncate hover:text-[#00478F] transition-colors leading-tight">
                Auto-Welcome Message
              </span>
            </div>
            <span className="w-11 h-11 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 group-hover:bg-gray-50 transition-colors shrink-0">
              <ChevronRight className="w-[18px] h-[18px] text-gray-800" />
            </span>
          </Link>
        </div>

        {/* Comments Section */}
        <div className="mb-10">
          <h2 className="text-[20px] font-bold text-[#1A1A1A] mb-6 font-merriweather">Comments</h2>
          
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="space-y-4">
                {/* Main Comment */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 border border-white shadow-sm">
                    <img src={comment.avatar} alt={comment.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[14px] font-bold text-gray-800">{comment.name}</span>
                      <span className="text-[11px] text-gray-400 font-medium">• {comment.date}</span>
                    </div>
                    <p className="text-[13px] text-gray-500 leading-relaxed mb-1">{comment.text}</p>
                    <button className="text-[12px] font-semibold text-[#00478F] hover:underline">Reply</button>
                  </div>
                </div>

                {/* Sub replies */}
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex gap-4 items-start pl-12">
                    <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 border border-white shadow-sm">
                      <img src={reply.avatar} alt={reply.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[13px] font-bold text-gray-800">{reply.name}</span>
                        <span className="text-[11px] text-gray-400 font-medium">• {reply.date}</span>
                      </div>
                      <p className="text-[12.5px] text-gray-500 leading-relaxed mb-1">{reply.text}</p>
                      <button className="text-[11px] font-semibold text-[#00478F] hover:underline">Reply</button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Leave a Comment Form */}
        <div className="bg-white rounded-[16px] border border-gray-200/60 p-6 md:p-8 shadow-sm mb-16">
          <h2 className="text-[20px] font-bold text-[#1A1A1A] mb-4 font-merriweather">Leave A Comment</h2>
          
          {submitSuccess && (
            <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 rounded-lg text-[13px] font-semibold border border-emerald-100">
              Comment submitted successfully!
            </div>
          )}

          <form onSubmit={handleCommentSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Name" 
                  required
                  value={newComment.name}
                  onChange={(e) => setNewComment({...newComment, name: e.target.value})}
                  className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00478F] focus:bg-white transition-colors" 
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Email" 
                  required
                  value={newComment.email}
                  onChange={(e) => setNewComment({...newComment, email: e.target.value})}
                  className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00478F] focus:bg-white transition-colors" 
                />
              </div>
            </div>
            <div>
              <textarea 
                placeholder="Comment" 
                rows={5}
                required
                value={newComment.text}
                onChange={(e) => setNewComment({...newComment, text: e.target.value})}
                className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00478F] focus:bg-white transition-colors resize-none"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="px-6 py-2.5 bg-[#0B2C5C] text-white rounded-lg text-[13px] font-semibold hover:bg-blue-900 transition-colors shadow-sm uppercase"
            >
              Submit Comment
            </button>
          </form>
        </div>

        {/* Featured Articles Section */}
        <div>
          {/* Header */}
          <div className="flex justify-center mb-6">
            <div className="relative inline-block border-b-2 border-[#0B2C5C] pb-3">
              <h2 className="text-center text-[22px] font-bold text-[#0B2C5C] font-heading">
                Featured Articles
              </h2>
              <div className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#0B2C5C]"></div>
            </div>
          </div>
          
          {/* See All Link */}
          <div className="flex justify-end mb-8">
            <Link to="/blogs" className="text-[#0B2C5C] font-semibold text-[13px] underline hover:text-[#4885FF] transition-colors whitespace-nowrap">
              See all blog
            </Link>
          </div>

          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {featuredArticles.map((blog) => (
              <Link to={`/blog/${blog.id}`} key={blog.id} className="bg-white rounded-[16px] overflow-hidden border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow flex flex-col h-[450px] cursor-pointer">
                
                {/* Image */}
                <div className="w-full h-[200px] overflow-hidden relative flex-shrink-0 bg-gray-100">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {blog.overlayText && (
                    <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6">
                      <span className="text-white text-[20px] font-bold leading-tight font-merriweather max-w-[200px]">
                        {blog.overlayText}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[15px] font-bold text-gray-900 leading-snug mb-3 font-merriweather line-clamp-2 hover:text-[#00478F]">
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

                    <p className="text-[12.5px] text-gray-500 leading-relaxed line-clamp-4 font-light">
                      {blog.summary}
                    </p>
                  </div>
                </div>

              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

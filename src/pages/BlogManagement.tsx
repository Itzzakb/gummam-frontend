import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Search,
  X,
  Plus,
  ChevronDown,
  Check,
  Pencil,
  Trash2,
  TrendingUp,
  Clock,
  Info,
  FileText,
  Star,
  Layers,
  Upload
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  author: string;
  status: 'Published' | 'Draft' | 'Scheduled' | 'Pending';
  views: string;
  seoScore: number;
  imageIcon: string;
}

// Period Dropdown component (matching other pages)
interface PeriodDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const PeriodDropdown: React.FC<PeriodDropdownProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const options = ['Last Week', 'Last Month', 'Three Months', 'Six Months', 'Last Years'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 4,
        left: rect.right + window.scrollX - 112, // width is 112
        width: 112
      });
    }
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left animate-none" ref={dropdownRef}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 bg-[#E2F5EC] hover:bg-[#d4f0e2] rounded-full px-2.5 py-1 text-[10px] font-semibold text-slate-800 transition-all focus:outline-none cursor-pointer"
      >
        <span>{value}</span>
        <ChevronDown className={`w-2.5 h-2.5 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-slate-800' : 'text-slate-600'}`} />
      </button>

      {isOpen && createPortal(
        <div
          className="bg-white border border-slate-200 rounded-lg shadow-lg z-[9999] py-1 flex flex-col"
          style={{
            position: 'absolute',
            top: coords.top,
            left: coords.left,
            width: coords.width
          }}
        >
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-1.5 text-[10px] transition-colors flex items-center justify-between cursor-pointer ${
                option === value ? 'bg-[#F0F4F9]/60 font-semibold text-[#035096]' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{option}</span>
              {option === value && <Check className="w-3 h-3 text-[#035096] shrink-0" />}
            </button>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
};

// Reusable custom dropdown for filtering
interface PortalFilterDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
}

const PortalFilterDropdown: React.FC<PortalFilterDropdownProps> = ({
  value,
  onChange,
  options,
  placeholder
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }, [isOpen]);

  return (
    <div className="relative flex-1 min-w-[140px]" ref={dropdownRef}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-10 px-3 bg-white border border-slate-200 rounded-[8px] text-xs font-semibold text-slate-700 flex items-center justify-between hover:border-slate-350 cursor-pointer"
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
      </button>

      {isOpen && createPortal(
        <div
          className="bg-white border border-slate-200 rounded-[8px] shadow-lg z-[9999] py-1 max-h-56 overflow-y-auto"
          style={{
            position: 'absolute',
            top: coords.top,
            left: coords.left,
            width: coords.width
          }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2.5 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                opt === value
                  ? 'bg-[#F0F4F9]/60 font-semibold text-[#035096]'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{opt}</span>
              {opt === value && <Check className="w-3.5 h-3.5 text-[#035096] shrink-0" />}
            </button>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
};

export const BlogManagement: React.FC = () => {
  // Stat Card Periods
  const [periodTotalBlogs, setPeriodTotalBlogs] = useState('Last Month');
  const [periodPublishedBlogs, setPeriodPublishedBlogs] = useState('Last Month');
  const [periodDraftArticles, setPeriodDraftArticles] = useState('Last Month');
  const [periodScheduledPosts, setPeriodScheduledPosts] = useState('Last Month');
  const [periodTotalViews, setPeriodTotalViews] = useState('Last Month');
  const [periodAvgEngagement, setPeriodAvgEngagement] = useState('Last Month');

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedSort, setSelectedSort] = useState('Newest');

  // Blog creation modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: 'blog' | 'category'; id: string } | null>(null);

  // Initial Categories list
  const [categories, setCategories] = useState([
    'Market Trends',
    'Property Investment',
    'Home Buying Tips',
    'Home Selling Tips',
    'Interior Design',
    'Commercial Real Estate',
    'Local Area Guides'
  ]);

  // Handle adding new category
  const [newCatName, setNewCatName] = useState('');
  const [isAddingCat, setIsAddingCat] = useState(false);

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCatName.trim() && !categories.includes(newCatName.trim())) {
      setCategories([...categories, newCatName.trim()]);
      setNewCatName('');
      setIsAddingCat(false);
    }
  };

  // Mock initial Blogs list
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: 'B1',
      title: 'Top 10 Real Estate Investment Tips for 2024',
      category: 'Property Investment',
      author: 'Sarah Chen',
      status: 'Published',
      views: '2,543',
      seoScore: 92,
      imageIcon: '📈'
    },
    {
      id: 'B2',
      title: 'First-Time Home Buyer\'s Complete Guide',
      category: 'Home Buying Tips',
      author: 'Mike Johnson',
      status: 'Published',
      views: '1,876',
      seoScore: 88,
      imageIcon: '🏠'
    },
    {
      id: 'B3',
      title: '5 Interior Design Trends That Add Value to Your Home',
      category: 'Interior Design',
      author: 'Emma Wilson',
      status: 'Published',
      views: '1,456',
      seoScore: 85,
      imageIcon: '🎨'
    },
    {
      id: 'B4',
      title: 'How to Price Your Home for a Quick Sale',
      category: 'Home Selling Tips',
      author: 'David Lee',
      status: 'Draft',
      views: '0',
      seoScore: 0,
      imageIcon: '💰'
    },
    {
      id: 'B5',
      title: 'Market Trends: Real Estate Forecast Q1 2024',
      category: 'Market Trends',
      author: 'Lisa Wong',
      status: 'Scheduled',
      views: '0',
      seoScore: 90,
      imageIcon: '📊'
    },
    {
      id: 'B6',
      title: 'Commercial Real Estate Investment Basics',
      category: 'Commercial Real Estate',
      author: 'John Smith',
      status: 'Pending',
      views: '0',
      seoScore: 87,
      imageIcon: '🏢'
    }
  ]);

  // Selected row tracking
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

  // Toggle single row checkbox
  const toggleRow = (id: string) => {
    if (selectedRowIds.includes(id)) {
      setSelectedRowIds(selectedRowIds.filter(item => item !== id));
    } else {
      setSelectedRowIds([...selectedRowIds, id]);
    }
  };

  // Toggle select all checkbox
  const toggleSelectAll = () => {
    if (selectedRowIds.length === filteredBlogs.length) {
      setSelectedRowIds([]);
    } else {
      setSelectedRowIds(filteredBlogs.map(b => b.id));
    }
  };

  // Form states for creating a new Blog Post
  const [blogForm, setBlogForm] = useState({
    title: '',
    refUrl: '',
    shortDescription: '',
    category: 'Market Trends',
    author: '',
    content: '',
    para1: '',
    para2: '',
    metaTitle: '',
    metaDescription: '',
    focusKeyword: ''
  });

  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBlog: BlogPost = {
      id: `B${blogPosts.length + 1}`,
      title: blogForm.title || 'Untitled Post',
      category: blogForm.category,
      author: blogForm.author || 'Ravi Admin',
      status: 'Published',
      views: '0',
      seoScore: 85,
      imageIcon: '📄'
    };

    setBlogPosts([newBlog, ...blogPosts]);
    setShowCreateModal(false);
    // Reset Form
    setBlogForm({
      title: '',
      refUrl: '',
      shortDescription: '',
      category: 'Market Trends',
      author: '',
      content: '',
      para1: '',
      para2: '',
      metaTitle: '',
      metaDescription: '',
      focusKeyword: ''
    });
  };

  // Filters logic
  const filteredBlogs = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || post.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All Status' || post.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6 text-left">
      
      {/* ================= HEADER SECTION ================= */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Blog Management</h1>
        <p className="text-xs font-medium text-slate-500 mt-1">
          Manage articles, guidelines, announcements, categories, and review engagement analytics.
        </p>
      </div>

      {/* ================= KPI CARDS GRID (2 ROWS OF 3 COLUMNS) ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Blogs */}
        <div className="bg-white border border-[#dddddd] rounded-[16px] p-4 flex flex-col justify-between min-h-[140px] shadow-none animate-none">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500">Total Blogs</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-2xl font-bold text-slate-900 leading-none">45</span>
            <div className="flex justify-between items-center mt-3">
              <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3 text-emerald-600" />
                <span>+ 8.02% this month</span>
              </span>
              <PeriodDropdown value={periodTotalBlogs} onChange={setPeriodTotalBlogs} />
            </div>
          </div>
        </div>

        {/* Published Blogs */}
        <div className="bg-white border border-[#dddddd] rounded-[16px] p-4 flex flex-col justify-between min-h-[140px] shadow-none animate-none">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500">Published Blogs</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-[#0F8043]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-2xl font-bold text-slate-900 leading-none">38</span>
            <div className="flex justify-between items-center mt-3">
              <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3 text-emerald-600" />
                <span>+ 8.02% this month</span>
              </span>
              <PeriodDropdown value={periodPublishedBlogs} onChange={setPeriodPublishedBlogs} />
            </div>
          </div>
        </div>

        {/* Draft Articles */}
        <div className="bg-white border border-[#dddddd] rounded-[16px] p-4 flex flex-col justify-between min-h-[140px] shadow-none animate-none">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500">Draft Articles</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-650">
              <Star className="w-4 h-4" />
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-2xl font-bold text-slate-900 leading-none">4</span>
            <div className="flex justify-between items-center mt-3">
              <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3 text-emerald-600" />
                <span>+ 8.02% this month</span>
              </span>
              <PeriodDropdown value={periodDraftArticles} onChange={setPeriodDraftArticles} />
            </div>
          </div>
        </div>

        {/* Scheduled Posts */}
        <div className="bg-white border border-[#dddddd] rounded-[16px] p-4 flex flex-col justify-between min-h-[140px] shadow-none animate-none">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500">Scheduled Posts</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-2xl font-bold text-slate-900 leading-none">3</span>
            <div className="flex justify-between items-center mt-3">
              <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3 text-emerald-600" />
                <span>+ 8.02% this month</span>
              </span>
              <PeriodDropdown value={periodScheduledPosts} onChange={setPeriodScheduledPosts} />
            </div>
          </div>
        </div>

        {/* Total Views */}
        <div className="bg-white border border-[#dddddd] rounded-[16px] p-4 flex flex-col justify-between min-h-[140px] shadow-none animate-none">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500">Total Views</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-650">
              <Info className="w-4 h-4" />
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-2xl font-bold text-slate-900 leading-none">24.5K</span>
            <div className="flex justify-between items-center mt-3">
              <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3 text-emerald-600" />
                <span>+ 8.02% this month</span>
              </span>
              <PeriodDropdown value={periodTotalViews} onChange={setPeriodTotalViews} />
            </div>
          </div>
        </div>

        {/* Avg Engagement */}
        <div className="bg-white border border-[#dddddd] rounded-[16px] p-4 flex flex-col justify-between min-h-[140px] shadow-none animate-none">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500">Avg Engagement</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-650">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-2xl font-bold text-slate-900 leading-none">4.2%</span>
            <div className="flex justify-between items-center mt-3">
              <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3 text-emerald-600" />
                <span>+ 8.02% this month</span>
              </span>
              <PeriodDropdown value={periodAvgEngagement} onChange={setPeriodAvgEngagement} />
            </div>
          </div>
        </div>
      </div>

      {/* ================= SEARCH & FILTER CONTROL BAR ================= */}
      <div className="bg-white border border-[#dddddd] rounded-[16px] p-4 space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search Blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 border border-slate-200 rounded-[8px] text-xs font-medium outline-none focus:border-[#035096] bg-slate-50/50 hover:bg-slate-50"
            />
          </div>

          {/* Action button */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="h-10 px-4 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[8px] flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Create New Blog</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <PortalFilterDropdown
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={['All Categories', ...categories]}
            placeholder="All Categories"
          />
          <PortalFilterDropdown
            value={selectedStatus}
            onChange={setSelectedStatus}
            options={['All Status', 'Published', 'Draft', 'Scheduled', 'Pending']}
            placeholder="All Status"
          />
          <PortalFilterDropdown
            value={selectedSort}
            onChange={setSelectedSort}
            options={['Newest', 'Oldest', 'Most Views']}
            placeholder="Newest"
          />
        </div>
      </div>

      {/* ================= BLOGS DIRECTORY TABLE ================= */}
      <div className="bg-white rounded-[16px] overflow-hidden border border-[#dddddd] shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs text-slate-700 font-medium">
            <thead>
              <tr className="bg-[#F0F2F3] border-b border-[#dddddd] text-xs font-semibold text-slate-700">
                <th className="p-4 pl-6 w-8">
                  <input
                    type="checkbox"
                    checked={filteredBlogs.length > 0 && selectedRowIds.length === filteredBlogs.length}
                    onChange={toggleSelectAll}
                    className="w-3.5 h-3.5 rounded border-slate-300 text-[#035096] focus:ring-[#035096] cursor-pointer"
                  />
                </th>
                <th className="p-4">Image</th>
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Author</th>
                <th className="p-4">Status</th>
                <th className="p-4">Views</th>
                <th className="p-4">SEO Score</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dddddd]">
              {filteredBlogs.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="p-4 pl-6">
                    <input
                      type="checkbox"
                      checked={selectedRowIds.includes(post.id)}
                      onChange={() => toggleRow(post.id)}
                      className="w-3.5 h-3.5 rounded border-slate-300 text-[#035096] focus:ring-[#035096] cursor-pointer"
                    />
                  </td>
                  <td className="p-4">
                    <div className="w-8 h-8 rounded-lg bg-slate-100/80 border border-slate-200/50 flex items-center justify-center text-sm">
                      {post.imageIcon}
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-slate-900 max-w-[280px] truncate">{post.title}</td>
                  <td className="p-4 text-slate-650">{post.category}</td>
                  <td className="p-4 text-slate-650">{post.author}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-[5px] text-[10px] font-semibold ${
                      post.status === 'Published' ? 'text-emerald-600 bg-emerald-50 border border-emerald-200' :
                      post.status === 'Draft' ? 'text-slate-600 bg-slate-50 border border-slate-200' :
                      post.status === 'Scheduled' ? 'text-amber-600 bg-amber-50 border border-amber-200' :
                      'text-indigo-600 bg-indigo-50 border border-indigo-200'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-slate-900">{post.views}</td>
                  <td className="p-4">
                    {post.seoScore > 0 ? (
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-250 rounded-[5px] px-2 py-0.5 text-[10px] font-bold">
                        {post.seoScore}
                      </span>
                    ) : (
                      <span className="bg-slate-50 text-slate-400 border border-slate-200 rounded-[5px] px-2 py-0.5 text-[10px] font-bold">
                        {post.seoScore}
                      </span>
                    )}
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="w-8 h-8 rounded-[5px] hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-700 transition cursor-pointer">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm({ type: 'blog', id: post.id })}
                        className="w-8 h-8 rounded-[5px] hover:bg-slate-100 flex items-center justify-center text-rose-600 hover:text-rose-700 transition cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= CATEGORIES MANAGEMENT SECTION ================= */}
      <div className="bg-white rounded-[16px] border border-[#dddddd] p-6 space-y-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Categories Management</h3>
          <p className="text-[11px] font-medium text-slate-400 mt-0.5">Manage existing post categories or create new target labels</p>
        </div>

        <div className="space-y-2 w-full">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex items-center justify-between bg-slate-50/50 border border-slate-150 rounded-[8px] px-4 py-2.5 text-xs text-slate-700 font-semibold">
              <span>{cat}</span>
              <div className="flex items-center gap-2">
                <button className="w-7 h-7 hover:bg-slate-200/50 rounded flex items-center justify-center text-slate-500 hover:text-slate-700 cursor-pointer">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteConfirm({ type: 'category', id: cat })}
                  className="w-7 h-7 hover:bg-slate-200/50 rounded flex items-center justify-center text-rose-600 hover:text-rose-700 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Category Trigger */}
        {!isAddingCat ? (
          <button
            onClick={() => setIsAddingCat(true)}
            className="h-8 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold rounded-[6px] flex items-center gap-1.5 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Category</span>
          </button>
        ) : (
          <form onSubmit={handleAddCategorySubmit} className="flex gap-2 max-w-sm animate-in fade-in duration-200">
            <input
              type="text"
              required
              placeholder="Enter category name"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              className="flex-1 h-9 px-3 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
            />
            <button
              type="submit"
              className="h-9 px-4 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[5px] cursor-pointer"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setIsAddingCat(false)}
              className="h-9 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-[5px] cursor-pointer"
            >
              Cancel
            </button>
          </form>
        )}
      </div>

      {/* ================= MODAL: CREATE NEW BLOG POST ================= */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-[1000] p-4">
          <div className="bg-white w-full max-w-[500px] rounded-[5px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Create New Blog Post</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-[5px] hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleBlogSubmit} className="flex flex-col overflow-hidden">
              <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-650 [scrollbar-width:thin]">
                
                {/* Title & Ref URL */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Blog Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter blog title"
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
                      className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Ref. URL</label>
                    <input
                      type="text"
                      placeholder="blog-post-url"
                      value={blogForm.refUrl}
                      onChange={(e) => setBlogForm({...blogForm, refUrl: e.target.value})}
                      className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                    />
                  </div>
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">Short Description</label>
                  <textarea
                    rows={2}
                    placeholder="Write a brief summary of your blog post..."
                    value={blogForm.shortDescription}
                    onChange={(e) => setBlogForm({...blogForm, shortDescription: e.target.value})}
                    className="w-full p-2 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096] resize-none"
                  />
                </div>

                {/* Category & Author */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Category</label>
                    <select
                      value={blogForm.category}
                      onChange={(e) => setBlogForm({...blogForm, category: e.target.value})}
                      className="w-full h-8 px-2 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Author</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter author name"
                      value={blogForm.author}
                      onChange={(e) => setBlogForm({...blogForm, author: e.target.value})}
                      className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                    />
                  </div>
                </div>

                {/* Blog Content */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">Blog Content</label>
                  <textarea
                    rows={3}
                    placeholder="Write your blog content here..."
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({...blogForm, content: e.target.value})}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096] resize-none"
                  />
                </div>

                {/* Main image upload */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">Blog Main Image</label>
                  <div className="border border-dashed border-slate-200 rounded-[5px] p-5 text-center hover:bg-slate-50/50 cursor-pointer flex flex-col items-center gap-1.5 transition">
                    <Upload className="w-5 h-5 text-slate-400" />
                    <span className="text-[10px] font-semibold text-slate-500">Click to upload or drag and drop</span>
                  </div>
                </div>

                {/* Paragraph 1 */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">Paragraph 1</label>
                  <textarea
                    rows={2}
                    placeholder="Write here..."
                    value={blogForm.para1}
                    onChange={(e) => setBlogForm({...blogForm, para1: e.target.value})}
                    className="w-full p-2 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096] resize-none"
                  />
                </div>

                {/* Paragraph image 1 upload */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">Paragraph image 1</label>
                  <div className="border border-dashed border-slate-200 rounded-[5px] p-5 text-center hover:bg-slate-50/50 cursor-pointer flex flex-col items-center gap-1.5 transition">
                    <Upload className="w-5 h-5 text-slate-400" />
                    <span className="text-[10px] font-semibold text-slate-500">Click to upload or drag and drop</span>
                  </div>
                </div>

                {/* Paragraph 2 */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">Paragraph 2</label>
                  <textarea
                    rows={2}
                    placeholder="Write here..."
                    value={blogForm.para2}
                    onChange={(e) => setBlogForm({...blogForm, para2: e.target.value})}
                    className="w-full p-2 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096] resize-none"
                  />
                </div>

                {/* Paragraph image 2 upload */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">Paragraph image 2</label>
                  <div className="border border-dashed border-slate-200 rounded-[5px] p-5 text-center hover:bg-slate-50/50 cursor-pointer flex flex-col items-center gap-1.5 transition">
                    <Upload className="w-5 h-5 text-slate-400" />
                    <span className="text-[10px] font-semibold text-slate-500">Click to upload or drag and drop</span>
                  </div>
                </div>

                {/* SEO Fields */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Meta Title</label>
                    <input
                      type="text"
                      placeholder="SEO Title"
                      value={blogForm.metaTitle}
                      onChange={(e) => setBlogForm({...blogForm, metaTitle: e.target.value})}
                      className="w-full h-8 px-2 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Meta Description</label>
                    <input
                      type="text"
                      placeholder="SEO description"
                      value={blogForm.metaDescription}
                      onChange={(e) => setBlogForm({...blogForm, metaDescription: e.target.value})}
                      className="w-full h-8 px-2 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Focus Keyword</label>
                    <input
                      type="text"
                      placeholder="Primary keyword"
                      value={blogForm.focusKeyword}
                      onChange={(e) => setBlogForm({...blogForm, focusKeyword: e.target.value})}
                      className="w-full h-8 px-2 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-100 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-[5px] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => alert('Draft saved')}
                  className="flex-1 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-[5px] cursor-pointer"
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  className="flex-1 h-9 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[5px] cursor-pointer"
                >
                  Publish Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ================= CONFIRM DELETE DIALOG ================= */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-[1100] p-4">
          <div className="bg-white w-full max-w-[380px] rounded-[5px] overflow-hidden shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-semibold text-slate-900">
              Confirm Delete
            </h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Are you sure you want to delete this {deleteConfirm.type === 'blog' ? 'Blog Post' : 'Category'}? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-semibold rounded-[5px] hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (deleteConfirm.type === 'blog') {
                    setBlogPosts(blogPosts.filter((b) => b.id !== deleteConfirm.id));
                  } else {
                    setCategories(categories.filter((c) => c !== deleteConfirm.id));
                  }
                  setDeleteConfirm(null);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-[5px] transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

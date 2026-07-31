import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Briefcase,
  UserCheck,
  Building2,
  CheckCircle,
  FileText,
  CreditCard,
  Megaphone,
  BookOpen,
  BarChart3,
  Layers,
  Type as TypeIcon,
  Settings,
  LogOut,
  Bell,
  Clock,
  Eye,
  Search,
  Lock,
  X,
  Download,
  Menu
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
  ArcElement,
  Filler
} from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';

import { UserRolesManagement } from './UserRolesManagement';
import { AgentsOwnersManagement } from './AgentsOwnersManagement';
import { AgentVerificationManagement } from './AgentVerificationManagement';
import { PropertyManagement } from './PropertyManagement';
import { PropertyApprovalManagement } from './PropertyApprovalManagement';
import { CrmManagement } from './CrmManagement';
import { PricingSubscription } from './PricingSubscription';
import { AdvertisementManagement } from './AdvertisementManagement';
import { BlogManagement } from './BlogManagement';
import { AnalyticsPage } from './AnalyticsPage';
import { StaticContent } from './StaticContent';
import { TitleManagement } from './TitleManagement';
import { SettingsPage } from './SettingsPage';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  ChartLegend,
  ArcElement,
  Filler
);

// Sidebar Items Definition
const sidebarItems = [
  { id: 'overview', name: 'Overview', icon: LayoutDashboard },
  { id: 'users', name: 'User Management', icon: Users },
  { id: 'roles', name: 'Role Management', icon: ShieldCheck },
  { id: 'agents', name: 'Agents & Owners', icon: Briefcase },
  { id: 'verification', name: 'Agent Verification', icon: UserCheck },
  { id: 'properties', name: 'Properties', icon: Building2 },
  { id: 'approval', name: 'Property Approval', icon: CheckCircle },
  { id: 'inquiries', name: 'Inquiries & CRM', icon: FileText },
  { id: 'pricing', name: 'Pricing & Subscription', icon: CreditCard },
  { id: 'advertisement', name: 'Advertisement', icon: Megaphone },
  { id: 'blogs', name: 'Blog Management', icon: BookOpen },
  { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  { id: 'static', name: 'Static content', icon: Layers },
  { id: 'title', name: 'Title Management', icon: TypeIcon },
  { id: 'settings', name: 'Settings', icon: Settings },
];

// User item interface
interface UserItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'Agent' | 'Owner' | 'Buyer';
  status: 'Active' | 'Blocked';
  propertiesListed: number;
  inquiriesReceived: number;
  joinDate: string;
  lastLogin: string;
  loginHistory: Array<{
    date: string;
    device: string;
  }>;
}

// Reusable Period Dropdown styled as a light green pill
interface PeriodDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const PeriodDropdown: React.FC<PeriodDropdownProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
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

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 bg-[#E2F5EC] hover:bg-[#d4f0e2] rounded-full px-2.5 py-1 text-[10px] font-semibold text-slate-800 transition-all focus:outline-none cursor-pointer`}
      >
        <span>{value}</span>
        <svg
          className={`w-2.5 h-2.5 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-slate-800' : 'text-slate-600'
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-28 bg-white border border-slate-200 rounded-lg shadow-lg z-50 py-1 flex flex-col">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-1.5 text-[10px] transition-colors flex items-center justify-between ${
                option === value
                  ? 'bg-[#F0F4F9]/60 font-semibold text-[#035096]'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{option}</span>
              {option === value && (
                <svg className="w-3 h-3 text-[#035096] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Custom Dropdowns for Table Filter Bar to match CRM Dropdown Menu Design
interface CustomFilterDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder: string;
}

const CustomFilterDropdown: React.FC<CustomFilterDropdownProps> = ({ value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeLabel = options.find(o => o.value === value)?.label || placeholder;

  return (
    <div className="relative inline-block text-left min-w-[130px]" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-2 bg-white border rounded-[8px] px-3.5 py-2 text-xs font-semibold transition-all focus:outline-none cursor-pointer ${
          isOpen
            ? 'border-[#035096] text-[#035096] ring-1/2 ring-[#035096]/20'
            : 'border-slate-200 hover:border-slate-300 text-slate-700'
        }`}
      >
        <span>{activeLabel}</span>
        <svg
          className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#035096]' : 'text-slate-500'
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-full bg-white border border-slate-200 rounded-[8px] shadow-lg z-50 py-1 flex flex-col">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2 text-xs transition-colors flex items-center justify-between ${
                option.value === value
                  ? 'bg-[#F0F4F9]/60 font-semibold text-[#035096]'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{option.label}</span>
              {option.value === value && (
                <svg className="w-3.5 h-3.5 text-[#035096] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const AdminPortal: React.FC = () => {
  const navigate = useNavigate();
  const { pagename } = useParams<{ pagename?: string }>();
  const activeTab = pagename || 'overview';
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Tile period filter states
  const [usersPeriod, setUsersPeriod] = useState('Last Month');
  const [propertiesPeriod, setPropertiesPeriod] = useState('Last Month');
  const [inquiriesPeriod, setInquiriesPeriod] = useState('Last Month');
  const [revenuePeriod, setRevenuePeriod] = useState('Last Month');
  const [activityPeriod, setActivityPeriod] = useState('Last Month');

  // Users page stat filter states
  const [statTotalPeriod, setStatTotalPeriod] = useState('Last Month');
  const [statActivePeriod, setStatActivePeriod] = useState('Last Month');
  const [statBlockedPeriod, setStatBlockedPeriod] = useState('Last Month');
  const [statVerifiedPeriod, setStatVerifiedPeriod] = useState('Last Month');

  // Users management state
  const [usersList, setUsersList] = useState<UserItem[]>([
    {
      id: 'U001',
      name: 'Rajesh Kumar',
      email: 'rajesh@gmail.com',
      phone: '98765 43210',
      type: 'Agent',
      status: 'Active',
      propertiesListed: 24,
      inquiriesReceived: 156,
      joinDate: '2026-05-15',
      lastLogin: '2 minutes ago',
      loginHistory: [
        { date: 'May 15, 2026 at 2:30 PM', device: 'Chrome on Windows' },
        { date: 'May 14, 2026 at 11:15 AM', device: 'Safari on iPhone' },
        { date: 'May 13, 2026 at 4:45 PM', device: 'Chrome on Windows' }
      ]
    },
    {
      id: 'U002',
      name: 'Rajesh Kumar',
      email: 'rajesh@gmail.com',
      phone: '98765 43210',
      type: 'Owner',
      status: 'Active',
      propertiesListed: 14,
      inquiriesReceived: 63,
      joinDate: '2026-05-20',
      lastLogin: '1 hour ago',
      loginHistory: [
        { date: 'May 20, 2026 at 10:15 AM', device: 'Chrome on Windows' },
        { date: 'May 19, 2026 at 3:30 PM', device: 'Safari on iOS' }
      ]
    },
    {
      id: 'U003',
      name: 'Rajesh Kumar',
      email: 'rajesh@gmail.com',
      phone: '98765 43210',
      type: 'Buyer',
      status: 'Active',
      propertiesListed: 63,
      inquiriesReceived: 96,
      joinDate: '2026-04-12',
      lastLogin: '4 hours ago',
      loginHistory: [
        { date: 'May 12, 2026 at 5:12 PM', device: 'Firefox on Linux' }
      ]
    },
    {
      id: 'U004',
      name: 'Rajesh Kumar',
      email: 'rajesh@gmail.com',
      phone: '98765 43210',
      type: 'Agent',
      status: 'Blocked',
      propertiesListed: 17,
      inquiriesReceived: 147,
      joinDate: '2026-03-24',
      lastLogin: '1 day ago',
      loginHistory: [
        { date: 'May 14, 2026 at 9:00 AM', device: 'Chrome on Windows' }
      ]
    },
    {
      id: 'U005',
      name: 'Rajesh Kumar',
      email: 'rajesh@gmail.com',
      phone: '98765 43210',
      type: 'Owner',
      status: 'Active',
      propertiesListed: 27,
      inquiriesReceived: 235,
      joinDate: '2026-05-18',
      lastLogin: '30 minutes ago',
      loginHistory: [
        { date: 'May 18, 2026 at 8:45 PM', device: 'Chrome on Windows' }
      ]
    },
    {
      id: 'U006',
      name: 'Rajesh Kumar',
      email: 'rajesh@gmail.com',
      phone: '98765 43210',
      type: 'Agent',
      status: 'Active',
      propertiesListed: 36,
      inquiriesReceived: 28,
      joinDate: '2026-05-02',
      lastLogin: '3 days ago',
      loginHistory: [
        { date: 'May 02, 2026 at 11:20 AM', device: 'Safari on macOS' }
      ]
    },
    {
      id: 'U007',
      name: 'Rajesh Kumar',
      email: 'rajesh@gmail.com',
      phone: '98765 43210',
      type: 'Buyer',
      status: 'Active',
      propertiesListed: 45,
      inquiriesReceived: 61,
      joinDate: '2026-05-11',
      lastLogin: '2 hours ago',
      loginHistory: [
        { date: 'May 11, 2026 at 2:00 PM', device: 'Edge on Windows' }
      ]
    },
    {
      id: 'U008',
      name: 'Rajesh Kumar',
      email: 'rajesh@gmail.com',
      phone: '98765 43210',
      type: 'Owner',
      status: 'Blocked',
      propertiesListed: 12,
      inquiriesReceived: 32,
      joinDate: '2026-02-15',
      lastLogin: '5 days ago',
      loginHistory: [
        { date: 'May 10, 2026 at 4:30 PM', device: 'Safari on iPhone' }
      ]
    }
  ]);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  // Selected User for Modal details
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  // User to confirm block/unblock
  const [confirmBlockUser, setConfirmBlockUser] = useState<UserItem | null>(null);

  // Statistics calculation based on usersList state
  const totalUsersCount = usersList.length;
  const activeUsersCount = usersList.filter(u => u.status === 'Active').length;
  const blockedUsersCount = usersList.filter(u => u.status === 'Blocked').length;
  const verifiedAgentsCount = usersList.filter(u => u.type === 'Agent' && u.status === 'Active').length;

  const toggleUserBlock = (userId: string) => {
    setUsersList(prev => prev.map(user => {
      if (user.id === userId) {
        const nextStatus: 'Active' | 'Blocked' = user.status === 'Active' ? 'Blocked' : 'Active';
        const updatedUser: UserItem = { ...user, status: nextStatus };
        // If the modal is currently open for this user, update its state too
        if (selectedUser && selectedUser.id === userId) {
          setSelectedUser(updatedUser);
        }
        return updatedUser;
      }
      return user;
    }));
  };

  const filteredUsers = usersList.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    const matchesType = typeFilter === 'All' || user.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // ChartJS Pie Data (Lead Conversion Summary)
  const pieData = {
    labels: ['New Leads', 'Contacted', 'Site Visit', 'Closed'],
    datasets: [
      {
        data: [45, 32, 18, 5],
        backgroundColor: ['#0B56A2', '#FB923C', '#10B981', '#F59E0B'],
        hoverBackgroundColor: ['#083D76', '#EA580C', '#059669', '#D97706'],
        borderWidth: 0,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    maintainAspectRatio: false,
  };

  // ChartJS Line Data (Platform Growth over 12 Months)
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'New User',
        data: [6000, 4000, 5000, 6000, 5800, 10000, 7000, 1000, 3000, 6000, 2000, 6000],
        borderColor: '#0D76D8',
        backgroundColor: 'rgba(13, 118, 216, 0.04)',
        fill: true,
        tension: 0.45,
        borderWidth: 2,
        pointBackgroundColor: '#0D76D8',
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#0D76D8',
      },
      {
        label: 'Properties Listed',
        data: [4000, 2000, 4500, 3500, 1000, 7000, 3000, 6500, 4000, 6500, 3000, 7500],
        borderColor: '#FB923C',
        backgroundColor: 'rgba(251, 146, 60, 0.04)',
        fill: true,
        tension: 0.45,
        borderWidth: 2,
        pointBackgroundColor: '#FB923C',
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#FB923C',
      },
      {
        label: 'Inquiries',
        data: [4500, 3000, 3200, 3100, 2800, 3000, 3500, 3000, 4500, 3200, 3000, 3500],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.04)',
        fill: true,
        tension: 0.45,
        borderWidth: 2,
        pointBackgroundColor: '#10B981',
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#10B981',
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'white',
        titleColor: '#0F172A',
        bodyColor: '#334155',
        borderColor: '#E2E8F0',
        borderWidth: 1,
        padding: 10,
        boxPadding: 4,
        usePointStyle: true,
        callbacks: {
          title: (context: any) => {
            return context[0].label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#64748B',
          font: {
            size: 11,
          },
        },
      },
      y: {
        min: 0,
        max: 12500,
        ticks: {
          stepSize: 2500,
          color: '#64748B',
          font: {
            size: 11,
          },
        },
        grid: {
          color: '#F1F5F9',
        },
      },
    },
  };

  return (
    <div className="flex h-screen w-full bg-[#F4F7FA] overflow-hidden font-sans select-none">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex w-[260px] bg-white border-r border-slate-100 flex-col justify-between shrink-0">
        <div className="flex flex-col overflow-hidden">
          {/* Logo Area */}
          <div className="h-16 px-6 flex items-center shrink-0">
            <img src="/images/main-logo-2.png" alt="Gummaam" className="h-8 w-auto" />
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5 [scrollbar-width:thin]">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(`/admin/${item.id}`)}
                  className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-[#0B56A2] text-white'
                      : 'text-slate-700 hover:bg-[#F0F4F9]/60 hover:text-[#0B56A2]'
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout at bottom */}
        <div className="p-3 border-t border-slate-100 shrink-0">
          <button
            onClick={() => navigate('/admin/login')}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-sm font-medium text-red-655 hover:bg-red-50 transition-all duration-150 cursor-pointer"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Dashboard Bar */}
        <header className="h-16 bg-white px-4 lg:px-8 flex items-center justify-between border-b border-slate-100 shrink-0">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-650 cursor-pointer"
            title="Open Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-6 ml-auto">
            {/* Notification bell */}
            <button className="relative w-9 h-9 flex items-center justify-center rounded-full bg-slate-100/80 hover:bg-slate-200/60 transition cursor-pointer">
              <Bell className="h-4.5 w-4.5 text-slate-750" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Profile Avatar / Title Info */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-semibold text-slate-800 leading-tight">Hi, Ravi</div>
                <div className="text-[10px] font-medium text-slate-500">Admin</div>
              </div>
              <img
                src="/images/profile_avatar.png"
                alt="Ravi"
                className="w-9 h-9 rounded-full object-cover border border-slate-200"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face';
                }}
              />
            </div>
          </div>
        </header>

        {/* Content container */}
        <main className="flex-1 overflow-y-auto px-4 py-4 lg:px-8 lg:py-6 space-y-6 [scrollbar-width:thin]">
          {activeTab === 'overview' && (
            <>
              {/* Dynamic stats cards grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Users */}
                <div className="bg-white rounded-[5px] p-6 flex flex-col justify-between min-h-[170px]">
                  <div>
                    <span className="text-lg font-medium text-slate-500">Total Users</span>
                    <span className="text-[2.25rem] font-semibold text-slate-900 mt-2 block leading-none">12,485</span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="flex items-center gap-1 text-xs font-semibold text-[#0F8043] bg-[#E2F5EC] px-3 py-1.5 rounded-full">
                      ↑ 12.05%
                    </span>
                    <PeriodDropdown value={usersPeriod} onChange={setUsersPeriod} />
                  </div>
                </div>

                {/* Active Properties */}
                <div className="bg-white rounded-[5px] p-6 flex flex-col justify-between min-h-[170px]">
                  <div>
                    <span className="text-lg font-medium text-slate-500">Active Properties</span>
                    <span className="text-[2.25rem] font-semibold text-slate-900 mt-2 block leading-none">3,845</span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="flex items-center gap-1 text-xs font-semibold text-[#0F8043] bg-[#E2F5EC] px-3 py-1.5 rounded-full">
                      ↑ 8.02%
                    </span>
                    <PeriodDropdown value={propertiesPeriod} onChange={setPropertiesPeriod} />
                  </div>
                </div>

                {/* Daily Inquiries */}
                <div className="bg-white rounded-[5px] p-6 flex flex-col justify-between min-h-[170px]">
                  <div>
                    <span className="text-lg font-medium text-slate-500">Daily inquiries</span>
                    <span className="text-[2.25rem] font-semibold text-slate-900 mt-2 block leading-none">248</span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="flex items-center gap-1 text-xs font-semibold text-[#0F8043] bg-[#E2F5EC] px-3 py-1.5 rounded-full">
                      ↑ 5.01%
                    </span>
                    <PeriodDropdown value={inquiriesPeriod} onChange={setInquiriesPeriod} />
                  </div>
                </div>

                {/* Revenue */}
                <div className="bg-white rounded-[5px] p-6 flex flex-col justify-between min-h-[170px]">
                  <div>
                    <span className="text-lg font-medium text-slate-500">Revenue</span>
                    <span className="text-[2.25rem] font-semibold text-slate-900 mt-2 block leading-none">₹2.4L</span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="flex items-center gap-1 text-xs font-semibold text-[#0F8043] bg-[#E2F5EC] px-3 py-1.5 rounded-full">
                      ↑ 22.3%
                    </span>
                    <PeriodDropdown value={revenuePeriod} onChange={setRevenuePeriod} />
                  </div>
                </div>
              </div>

              {/* Charts grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Lead Conversion Summary */}
                <div className="bg-white rounded-[5px] p-6 lg:col-span-5 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-semibold text-slate-900">Lead Conversion Summary</h2>
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        ↑ 5.01%
                      </span>
                    </div>
                  </div>
                  <div className="relative h-[160px] flex justify-center items-center">
                    <Pie data={pieData} options={pieOptions} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0B56A2] shrink-0" />
                      <span className="text-xs text-slate-500 font-medium">New Leads : <span className="font-semibold text-slate-850">45</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FB923C] shrink-0" />
                      <span className="text-xs text-slate-500 font-medium">Contacted : <span className="font-semibold text-slate-850">32</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0" />
                      <span className="text-xs text-slate-500 font-medium">Site Visit : <span className="font-semibold text-slate-850">18</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shrink-0" />
                      <span className="text-xs text-slate-500 font-medium">Closed : <span className="font-semibold text-slate-850">05</span></span>
                    </div>
                  </div>
                </div>

                {/* KPIs & Response Metrics */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  {/* KPI Progress Bars */}
                  <div className="bg-white rounded-[5px] p-6 flex-1">
                    <h2 className="text-base font-semibold text-slate-900 mb-6">Key Performance Indicators</h2>
                    <div className="space-y-4">
                      {/* Lead Conversion Rate */}
                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-750 mb-1.5">
                          <span>Lead Conversion Rate</span>
                          <span className="text-[#0B56A2] font-medium">24.5%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#0B56A2] rounded-full" style={{ width: '24.5%' }} />
                        </div>
                      </div>

                      {/* Agent Response Rate */}
                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-750 mb-1.5">
                          <span>Agent Response Rate</span>
                          <span className="text-[#0B56A2] font-medium">87.3%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#0B56A2] rounded-full" style={{ width: '87.3%' }} />
                        </div>
                      </div>

                      {/* Property Approval Rate */}
                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-750 mb-1.5">
                          <span>Property Approval Rate</span>
                          <span className="text-[#0B56A2] font-medium">92.1%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#0B56A2] rounded-full" style={{ width: '92.1%' }} />
                        </div>
                      </div>

                      {/* User Retention */}
                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-750 mb-1.5">
                          <span>User Retention</span>
                          <span className="text-[#0B56A2] font-medium">24.5%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#0B56A2] rounded-full" style={{ width: '24.5%' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Response Metrics */}
                  <div className="bg-white rounded-[5px] p-5">
                    <h2 className="text-sm font-semibold text-slate-900 mb-4">Response Metrics</h2>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3.5 bg-blue-50/50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-[#0B56A2]">
                            <Clock className="w-4.5 h-4.5" />
                          </div>
                          <span className="text-xs font-medium text-slate-800">Avg Response Time</span>
                        </div>
                        <span className="text-xs font-semibold text-[#0B56A2]">2.5 hrs</span>
                      </div>

                      <div className="flex items-center justify-between p-3.5 bg-emerald-50/50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                            <Eye className="w-4.5 h-4.5" />
                          </div>
                          <span className="text-xs font-medium text-slate-800">Avg First View</span>
                        </div>
                        <span className="text-xs font-semibold text-emerald-600">15 mins</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Platform Growth Graph Card */}
              <div className="bg-white rounded-[5px] p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-base font-semibold text-slate-900">Platform Growth</h2>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4 text-xs font-medium">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-0.75 bg-[#0D76D8] block rounded" />
                        <span className="text-slate-500">New User</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-0.75 bg-[#FB923C] block rounded" />
                        <span className="text-slate-500">Properties Listed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-0.75 bg-[#10B981] block rounded" />
                        <span className="text-slate-500">Inquiries</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[280px]">
                  <Line data={lineData} options={lineOptions} />
                </div>
              </div>

              {/* Recent Activity Section */}
              <div className="bg-white rounded-[5px] p-6">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-base font-semibold text-slate-900">Recent Activity</h2>
                  <PeriodDropdown value={activityPeriod} onChange={setActivityPeriod} />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-slate-50/70 hover:bg-slate-100/50 rounded-xl transition duration-150">
                    <div>
                      <div className="text-xs font-semibold text-slate-850">New Property Listed</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">3BHK, Hyderabad</div>
                    </div>
                    <span className="text-[10px] font-medium text-slate-400">2 mins ago</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50/70 hover:bg-slate-100/50 rounded-xl transition duration-150">
                    <div>
                      <div className="text-xs font-semibold text-slate-850">User verification completed</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Rajesh Kumar</div>
                    </div>
                    <span className="text-[10px] font-medium text-slate-400">15 mins ago</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50/70 hover:bg-slate-100/50 rounded-xl transition duration-150">
                    <div>
                      <div className="text-xs font-semibold text-slate-850">Lead assigned to agent</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Priya Singh</div>
                    </div>
                    <span className="text-[10px] font-medium text-slate-400">1 hour ago</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50/70 hover:bg-slate-100/50 rounded-xl transition duration-150">
                    <div>
                      <div className="text-xs font-semibold text-slate-850">Payment received</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">₹5,000</div>
                    </div>
                    <span className="text-[10px] font-medium text-slate-400">3 hours ago</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              {/* Heading */}
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">User Management</h1>
                <p className="text-xs font-medium text-slate-500 mt-1">
                  Manage all users on your platform. View profiles, activate or block users, and monitor user activity.
                </p>
              </div>

              {/* KPI cards grid - border 1px solid #dddddd and radius 16px */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Users */}
                <div className="bg-white border border-[#dddddd] rounded-[16px] p-6 flex flex-col justify-between min-h-[140px] shadow-none">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-slate-500">Total Users</span>
                  </div>
                  <div className="flex items-end justify-between mt-2">
                    <span className="text-3xl font-semibold text-slate-900 leading-none">
                      {totalUsersCount < 10 ? `0${totalUsersCount}` : totalUsersCount}
                    </span>
                    <PeriodDropdown value={statTotalPeriod} onChange={setStatTotalPeriod} />
                  </div>
                </div>

                {/* Active Users */}
                <div className="bg-white border border-[#dddddd] rounded-[16px] p-6 flex flex-col justify-between min-h-[140px] shadow-none">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-slate-500">Active Users</span>
                  </div>
                  <div className="flex items-end justify-between mt-2">
                    <span className="text-3xl font-semibold text-[#0F8043] leading-none">
                      {activeUsersCount < 10 ? `0${activeUsersCount}` : activeUsersCount}
                    </span>
                    <PeriodDropdown value={statActivePeriod} onChange={setStatActivePeriod} />
                  </div>
                </div>

                {/* Blocked Users */}
                <div className="bg-white border border-[#dddddd] rounded-[16px] p-6 flex flex-col justify-between min-h-[140px] shadow-none">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-slate-500">Blocked Users</span>
                  </div>
                  <div className="flex items-end justify-between mt-2">
                    <span className="text-3xl font-semibold text-[#D92D20] leading-none">
                      {blockedUsersCount < 10 ? `0${blockedUsersCount}` : blockedUsersCount}
                    </span>
                    <PeriodDropdown value={statBlockedPeriod} onChange={setStatBlockedPeriod} />
                  </div>
                </div>

                {/* Verified Agents */}
                <div className="bg-white border border-[#dddddd] rounded-[16px] p-6 flex flex-col justify-between min-h-[140px] shadow-none">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-slate-500">Verified Agents</span>
                  </div>
                  <div className="flex items-end justify-between mt-2">
                    <span className="text-3xl font-semibold text-[#035096] leading-none">
                      {verifiedAgentsCount < 10 ? `0${verifiedAgentsCount}` : verifiedAgentsCount}
                    </span>
                    <PeriodDropdown value={statVerifiedPeriod} onChange={setStatVerifiedPeriod} />
                  </div>
                </div>
              </div>

              {/* Filters & Actions controls bar - border 1px solid #dddddd and radius 16px */}
              <div className="bg-white border border-[#dddddd] rounded-[16px] p-4 flex flex-col md:flex-row gap-4 justify-between items-center shadow-none">
                {/* Search */}
                <div className="relative w-full md:max-w-md">
                  <Search className="absolute left-3.5 my-auto inset-y-0 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by name, email...."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200 rounded-[8px] text-xs outline-none transition placeholder:text-slate-400 focus:border-[#035096]"
                  />
                </div>

                {/* Filtering controls */}
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
                  {/* Custom Status filter dropdown */}
                  <CustomFilterDropdown
                    value={statusFilter}
                    onChange={setStatusFilter}
                    placeholder="All Status"
                    options={[
                      { label: 'All Status', value: 'All' },
                      { label: 'Active', value: 'Active' },
                      { label: 'Blocked', value: 'Blocked' }
                    ]}
                  />

                  {/* Custom Type filter dropdown */}
                  <CustomFilterDropdown
                    value={typeFilter}
                    onChange={setTypeFilter}
                    placeholder="All Types"
                    options={[
                      { label: 'All Types', value: 'All' },
                      { label: 'Agent', value: 'Agent' },
                      { label: 'Owner', value: 'Owner' },
                      { label: 'Buyer', value: 'Buyer' }
                    ]}
                  />

                  {/* Export button */}
                  <button className="h-10 px-4 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[8px] flex items-center gap-2 transition cursor-pointer">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              {/* Users Directory Table - border 1px solid #dddddd and radius 16px */}
              <div className="bg-white rounded-[16px] overflow-hidden border border-[#dddddd] shadow-none">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-[#F0F2F3] border-b border-[#dddddd] text-xs font-semibold text-slate-700">
                        <th className="p-4 pl-6">Name</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Phone</th>
                        <th className="p-4">Type</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-center">Property Listed</th>
                        <th className="p-4 text-center">Inq Rec'd</th>
                        <th className="p-4 text-center pr-6">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#dddddd] text-xs text-slate-700 font-medium">
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-slate-50/30 transition-colors">
                            <td className="p-4 pl-6 font-semibold text-slate-900">{user.name}</td>
                            <td className="p-4 text-slate-400">{user.email}</td>
                            <td className="p-4 text-slate-450">{user.phone}</td>
                            <td className="p-4">
                              <span className={`px-3 py-1 rounded-[5px] text-[10px] font-semibold tracking-wide ${
                                user.type === 'Agent' ? 'bg-blue-100 text-blue-700' :
                                user.type === 'Owner' ? 'bg-emerald-100 text-emerald-700' :
                                'bg-purple-100 text-purple-700'
                              }`}>
                                {user.type}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className={`flex items-center gap-1.5 text-[11px] font-semibold ${
                                user.status === 'Active' ? 'text-emerald-600' : 'text-red-500'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                  user.status === 'Active' ? 'bg-emerald-600' : 'bg-red-550'
                                }`} />
                                <span>{user.status === 'Active' ? 'Active' : 'Blocked'}</span>
                              </span>
                            </td>
                            <td className="p-4 text-center font-semibold text-slate-900">{user.propertiesListed}</td>
                            <td className="p-4 text-center font-semibold text-slate-900">{user.inquiriesReceived}</td>
                            <td className="p-4 pr-6">
                              <div className="flex items-center justify-center gap-4">
                                {/* View Eye button */}
                                <button
                                  onClick={() => setSelectedUser(user)}
                                  className="w-8 h-8 rounded-[5px] hover:bg-slate-100 flex items-center justify-center text-blue-600 transition cursor-pointer"
                                  title="View User Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                {/* Lock/Unlock button */}
                                <button
                                  onClick={() => setConfirmBlockUser(user)}
                                  className={`w-8 h-8 rounded-[5px] hover:bg-slate-100 flex items-center justify-center transition cursor-pointer text-[#F43F5E] hover:text-[#E11D48]`}
                                  title={user.status === 'Active' ? 'Block User' : 'Unblock User'}
                                >
                                  <Lock className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="p-8 text-center text-slate-400">
                            No users match the search filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer */}
                <div className="p-4 pl-6 bg-slate-50/20 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500 font-semibold">
                  <span>Showing {filteredUsers.length} of {usersList.length} users</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'roles' && (
            <UserRolesManagement />
          )}

          {activeTab === 'agents' && (
            <AgentsOwnersManagement />
          )}

          {activeTab === 'verification' && (
            <AgentVerificationManagement />
          )}

          {activeTab === 'properties' && (
            <PropertyManagement />
          )}

          {activeTab === 'approval' && (
            <PropertyApprovalManagement />
          )}

          {activeTab === 'inquiries' && (
            <CrmManagement />
          )}

          {activeTab === 'pricing' && (
            <PricingSubscription />
          )}

           {activeTab === 'advertisement' && (
            <AdvertisementManagement />
          )}

          {activeTab === 'blogs' && (
            <BlogManagement />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsPage />
          )}

          {activeTab === 'static' && (
            <StaticContent />
          )}

          {activeTab === 'title' && (
            <TitleManagement />
          )}

          {activeTab === 'settings' && (
            <SettingsPage />
          )}

          {activeTab !== 'overview' && activeTab !== 'users' && activeTab !== 'roles' && activeTab !== 'agents' && activeTab !== 'verification' && activeTab !== 'properties' && activeTab !== 'approval' && activeTab !== 'inquiries' && activeTab !== 'pricing' && activeTab !== 'advertisement' && activeTab !== 'blogs' && activeTab !== 'analytics' && activeTab !== 'static' && activeTab !== 'title' && activeTab !== 'settings' && (
            <div className="flex items-center justify-center min-h-[400px] bg-white rounded-[5px]">
              <div className="text-center text-slate-400">
                <LayoutDashboard className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                <h3 className="text-sm font-semibold text-slate-850 uppercase tracking-wide">
                  {sidebarItems.find((item) => item.id === activeTab)?.name || 'Admin Section'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">This module is under active development.</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* User Details Profile Modal overlay */}
      {selectedUser && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-[1000] p-4">
          <div className="bg-white w-full max-w-[460px] rounded-[5px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">User Profile</h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="w-8 h-8 rounded-[5px] hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto [scrollbar-width:thin]">
              {/* Profile Card Header Info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xl font-semibold shrink-0">
                  {selectedUser.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 leading-tight">{selectedUser.name}</h3>
                  <div className="text-xs text-slate-500 mt-0.5">{selectedUser.email}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 rounded-[5px] text-[10px] font-semibold bg-blue-100 text-blue-700">
                      {selectedUser.type}
                    </span>
                    <span className={`px-2 py-0.5 rounded-[5px] text-[10px] font-semibold flex items-center gap-1 ${
                      selectedUser.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
                    }`}>
                      <span className={`w-1 h-1 rounded-full ${selectedUser.status === 'Active' ? 'bg-emerald-600' : 'bg-red-600'}`} />
                      <span>{selectedUser.status}</span>
                    </span>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Information Grid */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs">
                <div>
                  <div className="text-slate-400 font-semibold mb-1">Phone</div>
                  <div className="text-slate-900 font-semibold">+91 {selectedUser.phone}</div>
                </div>
                <div>
                  <div className="text-slate-400 font-semibold mb-1">User ID</div>
                  <div className="text-slate-900 font-semibold">{selectedUser.id}</div>
                </div>
                <div>
                  <div className="text-slate-400 font-semibold mb-1">Join Date</div>
                  <div className="text-slate-900 font-semibold">{selectedUser.joinDate}</div>
                </div>
                <div>
                  <div className="text-slate-400 font-semibold mb-1">Last Login</div>
                  <div className="text-slate-900 font-semibold">{selectedUser.lastLogin}</div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Activity Summary */}
              <div>
                <h4 className="text-xs font-semibold text-[#035096] uppercase tracking-wide mb-3">Activity Summary</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50/50 rounded-[5px] p-4">
                    <div className="text-[10px] font-semibold text-slate-400">Properties Listed</div>
                    <div className="text-2xl font-semibold text-blue-600 mt-1">{selectedUser.propertiesListed}</div>
                  </div>
                  <div className="bg-emerald-50/50 rounded-[5px] p-4">
                    <div className="text-[10px] font-semibold text-slate-400">Inquiries Received</div>
                    <div className="text-2xl font-semibold text-emerald-600 mt-1">{selectedUser.inquiriesReceived}</div>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Login History */}
              <div>
                <h4 className="text-xs font-semibold text-[#035096] uppercase tracking-wide mb-3">Login History</h4>
                <div className="space-y-2">
                  {selectedUser.loginHistory.map((history, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-100/60 rounded-[5px] px-4 py-3 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-semibold text-slate-800">{history.date}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{history.device}</div>
                      </div>
                      <span className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
              <button
                onClick={() => setConfirmBlockUser(selectedUser)}
                className="flex-1 h-11 rounded-[5px] text-xs font-semibold transition-all cursor-pointer bg-red-100 text-red-600 hover:bg-red-200"
              >
                {selectedUser.status === 'Active' ? 'Block User' : 'Unblock User'}
              </button>
              <button
                onClick={() => setSelectedUser(null)}
                className="flex-1 h-11 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-[5px] transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog for Block/Unblock */}
      {confirmBlockUser && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-[1100] p-4">
          <div className="bg-white w-full max-w-[400px] rounded-[5px] overflow-hidden shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-semibold text-slate-900">
              Confirm {confirmBlockUser.status === 'Active' ? 'Block' : 'Unblock'} User
            </h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Are you sure you want to {confirmBlockUser.status === 'Active' ? 'block' : 'unblock'} <span className="font-semibold text-slate-800">{confirmBlockUser.name}</span>?
              {confirmBlockUser.status === 'Active' 
                ? ' This user will no longer be able to log in, view their dashboard, or manage their listings.' 
                : ' This user will regain full access to their dashboard and account features.'}
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setConfirmBlockUser(null)}
                className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-semibold rounded-[5px] hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toggleUserBlock(confirmBlockUser.id);
                  setConfirmBlockUser(null);
                }}
                className={`px-4 py-2 text-white text-xs font-semibold rounded-[5px] transition cursor-pointer ${
                  confirmBlockUser.status === 'Active'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sidebar Navigation Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-[2000] lg:hidden flex">
          {/* Backdrop */}
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
          />
          {/* Sidebar drawer content */}
          <aside className="relative w-[260px] bg-white flex flex-col justify-between h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <div className="flex flex-col overflow-hidden">
              {/* Logo Area */}
              <div className="h-16 px-6 flex items-center shrink-0 justify-between">
                <img src="/images/main-logo-2.png" alt="Gummaam" className="h-8 w-auto" />
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
                  title="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5 [scrollbar-width:thin]">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        navigate(`/admin/${item.id}`);
                        setMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
                        isActive
                          ? 'bg-[#0B56A2] text-white'
                          : 'text-slate-700 hover:bg-[#F0F4F9]/60 hover:text-[#0B56A2]'
                      }`}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Logout at bottom */}
            <div className="p-3 border-t border-slate-100 shrink-0">
              <button
                onClick={() => {
                  navigate('/admin/login');
                  setMobileSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-sm font-medium text-red-655 hover:bg-red-550 transition-all duration-150 cursor-pointer"
              >
                <LogOut className="h-5 w-5 shrink-0" />
                <span>Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

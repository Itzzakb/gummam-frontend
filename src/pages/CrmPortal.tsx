import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LeadManagement } from './LeadManagement';
import { EmployeeManagement } from './EmployeeManagement';
import { PropertyListings } from './PropertyListings';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Briefcase,
  ChevronRight,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  Building2,
  FileText,
  CheckCircle,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
  ArcElement
} from 'chart.js';
import { Pie as ChartPie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  ChartLegend,
  ArcElement
);



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
    <div className="relative inline-block text-left" ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 bg-white border rounded-full px-2.5 py-1 text-[10px] font-semibold transition-all focus:outline-none cursor-pointer ${
          isOpen
            ? 'border-[#035096] text-[#035096] ring-1/2 ring-[#035096]'
            : 'border-slate-200 hover:border-slate-350 text-slate-700'
        }`}
      >
        <span>{value}</span>
        <svg 
          className={`w-2.5 h-2.5 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#035096]' : 'text-slate-400'
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
        <div className="absolute right-0 mt-1.5 w-28 bg-white border border-slate-200 rounded-lg shadow-lg z-50 py-1 flex flex-col">
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

interface AnalyticsPeriodDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const AnalyticsPeriodDropdown: React.FC<AnalyticsPeriodDropdownProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const options = ['Jan - Jun 2026', 'Jul - Dec 2026'];

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
        className={`flex items-center justify-between gap-2 bg-white border rounded-[8px] pl-4 pr-3 py-2 text-sm font-medium transition-all focus:outline-none cursor-pointer min-w-[145px] ${
          isOpen
            ? 'border-[#035096] text-[#035096] ring-1/2 ring-[#035096]'
            : 'border-slate-300 hover:border-slate-400 text-gray-700 shadow-sm'
        }`}
      >
        <span>{value === 'Jan - Jun 2026' ? 'Jan - Dec 2026' : value}</span>
        <svg 
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#035096]' : 'text-gray-500'
          }`}
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-full bg-white border border-slate-200 rounded-[8px] shadow-lg z-50 py-1 flex flex-col">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                option === value 
                  ? 'bg-[#F0F4F9]/60 font-semibold text-[#035096]' 
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{option === 'Jan - Jun 2026' ? 'Jan - Dec 2026' : option}</span>
              {option === value && (
                <svg className="w-4 h-4 text-[#035096] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
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

export const CrmPortal: React.FC = () => {
  const navigate = useNavigate();
  const { pagename } = useParams<{ pagename?: string }>();
  const { user, isAuthenticated, logout, openAuthDialog } = useAuth();
  
  // Sidebar Menu Items
  const menuItems = [
    { name: 'Overview', icon: LayoutDashboard, path: 'overview' },
    { name: 'Lead Management', icon: Users, path: 'leads' },
    { name: 'Employee Management', icon: UserCheck, path: 'employees' },
    { name: 'Property listings', icon: Building2, path: 'properties' },
    { name: 'CRM Management', icon: FileText, path: 'crm-management' },
    { name: 'Subscription', icon: Briefcase, path: 'subscription' },
    { name: 'Settings', icon: Settings, path: 'settings' },
  ];

  // Derive active menu item from the pagename path parameter, default to 'Overview'
  const currentMenuItem = menuItems.find(item => item.path === pagename) || menuItems[0];
  const activeMenu = currentMenuItem.name;

  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('Jan - Jun 2026');
  const [leadsResPeriod, setLeadsResPeriod] = useState('Last Month');
  const [leadsCommPeriod, setLeadsCommPeriod] = useState('Last Month');
  const [listingsResPeriod, setListingsResPeriod] = useState('Last Month');
  const [listingsCommPeriod, setListingsCommPeriod] = useState('Last Month');

  // Verification progress mock data
  const verificationProgress = {
    verifiedCount: 2,
    totalCount: 13
  };
  const remainingVerification = Math.max(0, verificationProgress.totalCount - verificationProgress.verifiedCount);
  const verificationProgressPercentage = (verificationProgress.verifiedCount / verificationProgress.totalCount) * 100;

  // Route protection
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      openAuthDialog('agent');
    } else if (user?.role !== 'agent') {
      alert("Only agents are allowed to access the CRM Portal.");
      navigate('/');
      openAuthDialog('agent');
    }
  }, [isAuthenticated, user, navigate, openAuthDialog]);

  if (!isAuthenticated || user?.role !== 'agent') {
    return null;
  }

  // Dummy statistics and sparklines
  const connectionStatuses = [
    { name: 'All', value: '22', points: '10,15 20,8 30,14 40,6 50,11' },
    { name: 'Pending', value: '02', points: '10,18 20,15 30,12 40,10 50,8' },
    { name: 'Interested', value: '13', points: '10,16 20,11 30,9 40,7 50,5' },
    { name: 'Follow Up', value: '05', points: '10,12 20,10 30,11 40,7 50,9' },
    { name: 'In Progress', value: '40', points: '10,18 20,12 30,15 40,9 50,6' },
    { name: 'Not Ans', value: '08', points: '10,15 20,14 30,16 40,13 50,15' },
    { name: 'Converted', value: '22', points: '10,18 20,16 30,12 40,9 50,4' },
    { name: 'Dead', value: '14', points: '10,5 20,8 30,11 40,14 50,18' },
    { name: 'Visited', value: '51', points: '10,19 20,14 30,10 40,8 50,5' },
    { name: 'Payment', value: '34', points: '10,15 20,12 30,14 40,10 50,7' },
    { name: 'Not Connected', value: '34', points: '10,10 20,12 30,9 40,11 50,8' },
  ];

  const recentActivities = [
    {
      id: 1,
      name: 'John Doe',
      action: 'Submitted inquiry for 3BHK Apartment',
      location: 'Maple Street Residence',
      time: '3 hours ago',
      color: 'bg-blue-600',
      initial: 'J',
      type: 'inquiry'
    },
    {
      id: 2,
      name: 'Sarah Smith',
      action: 'Scheduled site visit',
      location: 'Oak Avenue Villa',
      time: '4 hours ago',
      color: 'bg-orange-600',
      initial: 'S',
      type: 'visit'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      action: 'Sent WhatsApp message',
      location: 'Riverside Plaza',
      time: '6 hours ago',
      color: 'bg-green-600',
      initial: 'M',
      type: 'whatsapp'
    },
    {
      id: 4,
      name: 'Emma Brown',
      action: 'Deal closed',
      location: 'Downtown Heights',
      time: '1 day ago',
      color: 'bg-purple-600',
      initial: 'E',
      type: 'closed'
    }
  ];

  const pieLegend = [
    { name: 'All', count: 45, color: '#1E3A8A' },
    { name: 'Not Ans', count: 45, color: '#F59E0B' },
    { name: 'Pending', count: 32, color: '#EF4444' },
    { name: 'Converted', count: 32, color: '#10B981' },
    { name: 'Interested', count: 18, color: '#3B82F6' },
    { name: 'Dead', count: 18, color: '#6B7280' },
    { name: 'Follow Up', count: 5, color: '#8B5CF6' },
    { name: 'Visited', count: 5, color: '#EC4899' },
    { name: 'In Progress', count: 5, color: '#14B8A6' },
    { name: 'Payment', count: 5, color: '#F97316' },
    { name: 'Not Connected', count: 5, color: '#06B6D4' }
  ];

  const monthlyData = [
    { name: 'Jan', Leads: 24, Conversions: 12 },
    { name: 'Feb', Leads: 32, Conversions: 18 },
    { name: 'Mar', Leads: 28, Conversions: 15 },
    { name: 'Apr', Leads: 45, Conversions: 28 },
    { name: 'May', Leads: 52, Conversions: 35 },
    { name: 'Jun', Leads: 48, Conversions: 32 },
    { name: 'Jul', Leads: 38, Conversions: 22 },
    { name: 'Aug', Leads: 42, Conversions: 26 },
    { name: 'Sep', Leads: 55, Conversions: 38 },
    { name: 'Oct', Leads: 62, Conversions: 45 },
    { name: 'Nov', Leads: 58, Conversions: 40 },
    { name: 'Dec', Leads: 65, Conversions: 48 }
  ];

  // Dynamic totals for the analytics
  const totalLeads = monthlyData.reduce((sum, item) => sum + item.Leads, 0);
  const totalConversions = monthlyData.reduce((sum, item) => sum + item.Conversions, 0);
  const overallConversionRate = totalLeads > 0 ? Math.round((totalConversions / totalLeads) * 100) : 0;


  return (
    <div className="crm-portal min-h-screen bg-[#F3F4F6] font-poppins flex text-[#1F2937]">
      
      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between shrink-0 hidden md:flex h-screen sticky top-0 z-40">
        <div>
          {/* Logo container */}
          <div className="py-6 px-6 flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/images/main-logo-2.png" alt="Gummaam" className="h-9 w-auto" />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-0">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(`/agent-crm/${item.path}`)}
                  className={`w-full flex items-center gap-4 py-4 px-3 rounded-none text-[15px] transition-all text-left ${
                    isActive
                      ? 'bg-[#004B8F] text-white'
                      : 'text-black bg-white hover:bg-gray-50/80'
                  }`}
                  style={{ fontWeight: 400 }}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-black'}`} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout action at bottom */}
        <div className="pb-6">
          <div className="border-t border-gray-200/80 my-4 mx-6"></div>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="w-full flex items-center gap-4 py-4 px-6 rounded-none text-[15px] text-black hover:bg-gray-50/80 transition-colors text-left"
            style={{ fontWeight: 400 }}
          >
            <LogOut className="w-5 h-5 text-black" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTAINER ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* ================= TOP HEADER ================= */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-1 text-gray-500 hover:bg-gray-100 rounded-lg">
              <img src="/images/main-logo-2.png" alt="Gummaam" className="h-8 w-auto" />
            </button>
            <h2 className="text-lg font-semibold text-[#0B2C5C] font-poppins hidden md:block">
              {activeMenu}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-600 relative transition-all"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in">
                  <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                    <span className="font-bold text-sm text-gray-900">Notifications</span>
                    <button className="text-xs text-[#035096] font-semibold">Mark read</button>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    <div className="px-4 py-3 hover:bg-gray-50 flex gap-3 border-b border-gray-50 cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-800">New lead assigned</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">3 mins ago</p>
                      </div>
                    </div>
                    <div className="px-4 py-3 hover:bg-gray-50 flex gap-3 cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-800">Verification complete for Oak Villa</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
              <div className="hidden lg:flex flex-col text-right">
                <span className="text-sm font-bold text-[#0B2C5C]">Hi, Ravi</span>
                <span className="text-[10px] font-semibold text-amber-600 tracking-wider uppercase bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100 mt-0.5">
                  Gold Agent
                </span>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-[#0B56A2] p-[2px] overflow-hidden">
                <img
                  src={user?.avatarUrl || "/images/profile_avatar.png"}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* ================= MAIN CONTENT VIEWPORT ================= */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {activeMenu === 'Lead Management' ? (
            <LeadManagement />
          ) : activeMenu === 'Employee Management' ? (
            <EmployeeManagement />
          ) : activeMenu === 'Property listings' ? (
            <PropertyListings />
          ) : activeMenu !== 'Overview' ? (
            <div className="bg-white rounded-[5px] p-8 border border-gray-200/60 shadow-sm text-center py-20">
              <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Under Construction</h3>
              <p className="text-gray-500 text-sm mt-1 max-w-sm mx-auto">
                The {activeMenu} module is being connected. Please use the "Overview" page to track leads.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Row 1: Leads, Listings, Gold Plan on left, Scan & Verify on right */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                
                {/* Left Column (Leads, Listings, Gold Plan) */}
                <div className="space-y-6">
                  {/* Total Leads Card */}
                  <div className="bg-white rounded-[5px] p-6 border border-gray-200/60 shadow-sm hover:shadow-md transition-all">
                    <h3 className="text-base font-semibold text-[#0B2C5C] tracking-tight">Total Leads</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      {/* Residential */}
                      <div className="bg-white border border-[#EAF0F6] rounded-[8px] p-4 flex items-start justify-between">
                        <div className="flex-1">
                          <span className="text-xs font-medium text-[#5C5C5C]">Residential</span>
                          <h4 className="text-2xl font-semibold text-gray-900 mt-1">24</h4>
                          <div className="flex items-center justify-between gap-2 mt-3 w-full">
                            <span className="text-[10px] text-[#10B981] font-semibold bg-[#ECFDF5] px-2.5 py-1 rounded-full flex items-center gap-1">
                              <svg className="w-3 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                              </svg>
                              5.01%
                            </span>
                            <PeriodDropdown value={leadsResPeriod} onChange={setLeadsResPeriod} />
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#EBF3FE] text-[#0066F6] flex items-center justify-center shrink-0 ml-4">
                          <Building2 className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Commercial */}
                      <div className="bg-white border border-[#EAF0F6] rounded-[8px] p-4 flex items-start justify-between">
                        <div className="flex-1">
                          <span className="text-xs font-medium text-[#5C5C5C]">Commercial</span>
                          <h4 className="text-2xl font-semibold text-gray-900 mt-1">44</h4>
                          <div className="flex items-center justify-between gap-2 mt-3 w-full">
                            <span className="text-[10px] text-[#10B981] font-semibold bg-[#ECFDF5] px-2.5 py-1 rounded-full flex items-center gap-1">
                              <svg className="w-3 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                              </svg>
                              5.01%
                            </span>
                            <PeriodDropdown value={leadsCommPeriod} onChange={setLeadsCommPeriod} />
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#FFF3E5] text-[#FFA234] flex items-center justify-center shrink-0 ml-4">
                          <Briefcase className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Total Listings Card */}
                  <div className="bg-white rounded-[5px] p-6 border border-gray-200/60 shadow-sm hover:shadow-md transition-all">
                    <h3 className="text-base font-semibold text-[#0B2C5C] tracking-tight">Total Listings</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      {/* Residential */}
                      <div className="bg-white border border-[#EAF0F6] rounded-[8px] p-4 flex items-start justify-between">
                        <div className="flex-1">
                          <span className="text-xs font-medium text-[#5C5C5C]">Residential</span>
                          <h4 className="text-2xl font-semibold text-gray-900 mt-1">14</h4>
                          <div className="flex items-center justify-between gap-2 mt-3 w-full">
                            <span className="text-[10px] text-[#10B981] font-semibold bg-[#ECFDF5] px-2.5 py-1 rounded-full flex items-center gap-1">
                              <svg className="w-3 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                              </svg>
                              5.01%
                            </span>
                            <PeriodDropdown value={listingsResPeriod} onChange={setListingsResPeriod} />
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#EBF3FE] text-[#0066F6] flex items-center justify-center shrink-0 ml-4">
                          <Building2 className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Commercial */}
                      <div className="bg-white border border-[#EAF0F6] rounded-[8px] p-4 flex items-start justify-between">
                        <div className="flex-1">
                          <span className="text-xs font-medium text-[#5C5C5C]">Commercial</span>
                          <h4 className="text-2xl font-semibold text-gray-900 mt-1">34</h4>
                          <div className="flex items-center justify-between gap-2 mt-3 w-full">
                            <span className="text-[10px] text-[#10B981] font-semibold bg-[#ECFDF5] px-2.5 py-1 rounded-full flex items-center gap-1">
                              <svg className="w-3 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                              </svg>
                              5.01%
                            </span>
                            <PeriodDropdown value={listingsCommPeriod} onChange={setListingsCommPeriod} />
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#FFF3E5] text-[#FFA234] flex items-center justify-center shrink-0 ml-4">
                          <Briefcase className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gold Premium Plan Banner */}
                  <div className="bg-gradient-to-r from-[#0062E1] to-[#0051B8] rounded-[5px] p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-2xl">
                        💰
                      </div>
                      <div>
                        <h4 className="font-semibold text-base tracking-wide">Gold Premium Plan</h4>
                        <p className="text-xs text-white/90 mt-0.5">Credits remaining: 15 listings • 45 leads this month</p>
                      </div>
                    </div>
                    <button className="bg-white hover:bg-gray-50 text-[#0062E1] font-bold text-xs px-6 py-3 rounded-full whitespace-nowrap shadow transition-colors">
                      Upgrade Plan
                    </button>
                  </div>
                </div>

                {/* Right Column (Scan & Verify) */}
                <div className="xl:col-span-1 space-y-6">
                  {/* Master Scan and Verify Card */}
                  <div className="bg-white rounded-[5px] border border-gray-200/60 p-6 shadow-sm space-y-2 h-full flex flex-col justify-between">
                    
                    {/* Top Banner part */}
                    <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-3">
                      <div className="space-y-3 flex-1">
                        <div className="w-12 h-12 rounded bg-[#EAF5EC] text-[#22C55E] flex items-center justify-center">
                          <img src="/images/green-tick-shield.png" alt="shield" className="object-contain" />
                        </div>
                        <h3 className="text-xl font-semibold text-[#0B2C5C] leading-[1.1] font-poppins">
                          Scan. Verify.<br />
                          <span className="text-[#5B21B6]">Get More.</span>
                        </h3>
                        <p className="text-[11px] text-gray-500 leading-tight">
                          Scan your Property blueprints and unlock more benefits.
                        </p>
                       
                      </div>
                      
                      <div className="w-[310px] h-[180px] shrink-0">
                        <img src="/images/scan-property.png" alt="Scan Property" className="w-full h-full object-contain" />
                      </div>
                    </div>

                    {/* Middle feature list */}
                    <div className="space-y-4 my-auto">
                      {/* Feature 1 */}
                      <div className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-[#EAF5EC] flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-[#0B2C5C]">Build Trust Instantly</h4>
                            <p className="text-[10px] text-gray-500 leading-tight mt-0.5">Verified badge shows credibility and builds client trust.</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-purple-600 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      </div>

                      <div className="border-t border-gray-100"></div>

                      {/* Feature 2 */}
                      <div className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-[#F0EEFD] flex items-center justify-center text-[#5B21B6] shrink-0">
                            <BarChart3 className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-[#0B2C5C]">Rank Higher in Searches</h4>
                            <p className="text-[10px] text-gray-500 leading-tight mt-0.5">Verified listings get more visibility and quality leads.</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-purple-600 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      </div>

                      <div className="border-t border-gray-100"></div>

                      {/* Feature 3 */}
                      <div className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-[#FFF9EB] flex items-center justify-center text-[#F59E0B] shrink-0">
                            <span className="text-xl">🎁</span>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-[#0B2C5C]">Unlock Exclusive Rewards</h4>
                            <p className="text-[10px] text-gray-500 leading-tight mt-0.5">Verify more listings and earn valuable credits.</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-purple-600 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>

                    {/* Bottom Verification status tracker */}
                    <div className="bg-[#F5F3FF] rounded-[12px] p-5 flex items-center gap-6 mt-4 border border-[#E8E3FF]">
                      {/* Left side circular chart */}
                      <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <circle
                            className="text-[#E2E8F0]"
                            strokeWidth="3"
                            stroke="currentColor"
                            fill="none"
                            cx="18" cy="18" r="16"
                          />
                          <circle
                            className="text-[#6236FF]"
                            strokeDasharray={`${verificationProgressPercentage}, 100`}
                            strokeWidth="3.2"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            cx="18" cy="18" r="16"
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center text-center font-poppins leading-tight">
                          <div className="leading-none flex items-baseline justify-center">
                            <span className="text-[#6236FF] text-xl font-bold">{verificationProgress.verifiedCount}</span>
                            <span className="text-[#0B2C5C] text-sm font-semibold">/{verificationProgress.totalCount}</span>
                          </div>
                          <span className="text-[9px] text-gray-500 font-semibold leading-tight mt-0.5">Verified</span>
                          <span className="text-[9px] text-gray-500 font-semibold leading-tight">Listings</span>
                        </div>
                      </div>
                                            {/* Vertical Divider */}
                      <div className="h-16 w-[1px] bg-[#E5E0FF] shrink-0"></div>

                      {/* Right side text and button */}
                      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <h4 className="text-base font-bold text-[#0B2C5C] flex items-center gap-1.5 leading-tight">
                            Almost there! <span className="text-lg">🎉</span>
                          </h4>
                          <p className="text-xs text-gray-500 leading-normal font-medium max-w-[190px]">
                            Verify {remainingVerification} more listings to enjoy more benefits.
                          </p>
                        </div>

                        <button className="bg-[#5C1BE6] hover:bg-[#4C12C4] text-white py-2.5 px-6 rounded-[8px] text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-2 shrink-0 border-none">
                          Verify More Listings
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* Row 2: Connection Status (Full Width Combined Section) */}
              <div className="bg-white rounded-[5px] p-6 border border-gray-200/60 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Left Part: Grid of 11 items (takes 2 columns) */}
                <div className="space-y-5">
                  <h3 className="text-base font-semibold text-[#0B2C5C] tracking-tight">Connection Status</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {connectionStatuses.map((stat, i) => (
                      <div key={i} className="bg-white border border-gray-100 rounded-[5px] p-3.5 flex flex-col justify-between transition-colors shadow-sm">
                        <span className="text-xs font-semibold text-gray-400">{stat.name}</span>
                        <div className="flex items-end justify-between mt-2">
                          <h4 className="text-xl font-medium text-gray-900 leading-none">{stat.value}</h4>
                          <svg className="w-10 h-5 overflow-visible text-[#0062E1]" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <polyline
                              fill="none"
                              stroke="currentColor"
                              points={stat.points}
                            />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Part: Distribution Pie Chart & Badges (takes 1 column) */}
                <div className="border-t lg:border-t-0 lg:border-l border-gray-100 pt-6 lg:pt-0 lg:pl-8 flex flex-col">
                  <div className="flex justify-start gap-2 mb-5">
                    <span className="text-[11px] font-bold text-white bg-[#0088FF] px-3.5 py-1.5 rounded-[5px] whitespace-nowrap shadow-sm">
                      Contact Rate 10%
                    </span>
                    <span className="text-[11px] font-bold text-white bg-[#00B050] px-3.5 py-1.5 rounded-[5px] whitespace-nowrap shadow-sm">
                      Conversion Rate 10%
                    </span>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Legend list in two sub-columns */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 flex-1">
                      {pieLegend.map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-[16px] font-medium text-gray-500">
                          <div className="flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                            <span>{item.name} :</span>
                          </div>
                          <span className="font-medium text-gray-950 ml-1">{item.count}</span>
                        </div>
                      ))}
                    </div>

                    {/* Chart.js Pie Chart */}
                    <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
                      <ChartPie
                        data={{
                          labels: pieLegend.map(item => item.name),
                          datasets: [
                            {
                              data: pieLegend.map(item => item.count),
                              backgroundColor: pieLegend.map(item => item.color),
                              borderWidth: 0,
                            }
                          ]
                        }}
                        options={{
                          plugins: {
                            legend: { display: false },
                            tooltip: { enabled: true }
                          },
                          maintainAspectRatio: false
                        }}
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Row 3: Bottom Performance & Activity Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                
                {/* Left Column (Performance Analytics & Lead Activity) */}
                <div className="xl:col-span-3 space-y-6">
                  
                  {/* Performance Analytics Card */}
                  <div className="bg-white rounded-[12px] p-6 border border-gray-200 shadow-sm space-y-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 leading-tight">Performance Analytics</h3>
                        <p className="text-sm text-gray-500 mt-1">Track your leads and conversions performance over time.</p>
                      </div>
                      <AnalyticsPeriodDropdown value={selectedPeriod} onChange={setSelectedPeriod} />
                    </div>

                    {/* Metric Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Total Leads Card */}
                      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] p-5 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-[10px] bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] shrink-0">
                          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-[#000000] block">Total Leads</span>
                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-3xl font-semibold text-[#2563EB]">{totalLeads}</span>
                            <span className="text-xs font-bold text-[#10B981] flex items-center gap-0.5 bg-[#ECFDF5] px-2 py-0.5 rounded-[4px]">
                              <svg className="h-4 w-3 text-[#10B981] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                              </svg>
                              24%
                            </span>
                          </div>
                          <span className="text-xs text-gray-400 block mt-1">vs Dec 2025 - May 2026</span>
                        </div>
                      </div>

                      {/* Total Conversions Card */}
                      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] p-5 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-[10px] bg-[#ECFDF5] flex items-center justify-center text-[#10B981] shrink-0">
                          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-[#000000] block">Total Conversions</span>
                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-3xl font-semibold text-[#10B981]">{totalConversions}</span>
                            <span className="text-xs font-bold text-[#10B981] flex items-center gap-0.5 bg-[#ECFDF5] px-2 py-0.5 rounded-[4px]">
                              <svg className="h-4 w-3 text-[#10B981] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                              </svg>
                              26%
                            </span>
                          </div>
                          <span className="text-xs text-gray-400 block mt-1">vs Dec 2025 - May 2026</span>
                        </div>
                      </div>
                    </div>

                    {/* Chart Section */}
                    <div className="space-y-4 pt-2">
                      <h4 className="text-lg font-semibold text-gray-900 leading-tight">
                        Leads vs Conversions (Bar Chart)
                      </h4>

                      {/* Legend */}
                      <div className="flex justify-center gap-6 text-sm font-medium text-gray-650 pt-1 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-3.5 h-3.5 bg-[#2563EB] rounded-[4px] inline-block"></span>
                          <span>Leads</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-3.5 h-3.5 bg-[#10B981] rounded-[4px] inline-block"></span>
                          <span>Conversions</span>
                        </div>
                      </div>

                      {/* Custom SVG Bar Chart */}
                      <div className="w-full relative h-[320px]">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 800 320" preserveAspectRatio="none">
                          {/* Grid Lines & Labels */}
                          {[75, 60, 45, 30, 15, 0].map((val, idx) => {
                            const y = 30 + idx * 44; // Total height area for grid lines is 220px (from y=30 to y=250)
                            return (
                              <g key={val}>
                                {/* Y-axis Label */}
                                <text
                                  x="30"
                                  y={y + 4}
                                  textAnchor="end"
                                  className="text-[13px] font-medium fill-gray-900"
                                  style={{ fontFamily: "'Poppins', sans-serif" }}
                                >
                                  {val}
                                </text>
                                {/* Grid Line */}
                                <line
                                  x1="50"
                                  y1={y}
                                  x2="780"
                                  y2={y}
                                  stroke={val === 0 ? "#111827" : "#E2E8F0"}
                                  strokeWidth={val === 0 ? "1.5" : "1"}
                                  strokeDasharray={val === 0 ? "none" : "3,3"}
                                />
                              </g>
                            );
                          })}

                          {/* Bars and Values */}
                          {monthlyData.map((data, i) => {
                            const segmentWidth = (730 / 12);
                            const xCenter = 50 + i * segmentWidth + segmentWidth / 2;
                            const barWidth = 14;
                            const barGap = 2;

                            const maxVal = 75;
                            const chartAreaHeight = 220; // from y=30 to y=250
                            const yScale = chartAreaHeight / maxVal;

                            const leadsHeight = data.Leads * yScale;
                            const leadsY = 250 - leadsHeight;
                            const leadsX = xCenter - barWidth - barGap;

                            const convHeight = data.Conversions * yScale;
                            const convY = 250 - convHeight;
                            const convX = xCenter + barGap;

                            // SVG Path for top-rounded bar
                            const getRoundedBarPath = (x: number, y: number, w: number, r: number) => {
                              return `M ${x} 250 
                                      L ${x} ${y + r} 
                                      A ${r} ${r} 0 0 1 ${x + r} ${y} 
                                      L ${x + w - r} ${y} 
                                      A ${r} ${r} 0 0 1 ${x + w} ${y + r} 
                                      L ${x + w} 250 Z`;
                            };

                            return (
                              <g key={data.name} className="group">
                                {/* Leads Bar */}
                                <path
                                  d={getRoundedBarPath(leadsX, leadsY, barWidth, 3)}
                                  fill="#2563EB"
                                  className="transition-all duration-200 hover:opacity-85 hover:brightness-95 cursor-pointer"
                                />
                                {/* Leads Label */}
                                <text
                                  x={leadsX + barWidth / 2}
                                  y={leadsY - 6}
                                  textAnchor="middle"
                                  className="text-[10px] font-bold fill-[#2563EB] opacity-90 transition-opacity duration-200 group-hover:scale-110 origin-bottom"
                                  style={{ fontFamily: "'Poppins', sans-serif" }}
                                >
                                  {data.Leads}
                                </text>

                                {/* Conversions Bar */}
                                <path
                                  d={getRoundedBarPath(convX, convY, barWidth, 3)}
                                  fill="#10B981"
                                  className="transition-all duration-200 hover:opacity-85 hover:brightness-95 cursor-pointer"
                                />
                                {/* Conversions Label */}
                                <text
                                  x={convX + barWidth / 2}
                                  y={convY - 6}
                                  textAnchor="middle"
                                  className="text-[10px] font-bold fill-[#10B981] opacity-90 transition-opacity duration-200 group-hover:scale-110 origin-bottom"
                                  style={{ fontFamily: "'Poppins', sans-serif" }}
                                >
                                  {data.Conversions}
                                </text>

                                {/* X-axis Label (Month) */}
                                <text
                                  x={xCenter}
                                  y="278"
                                  textAnchor="middle"
                                  className="text-[12px] font-medium fill-gray-900"
                                  style={{ fontFamily: "'Poppins', sans-serif" }}
                                >
                                  {data.name}
                                </text>
                              </g>
                            );
                          })}
                        </svg>
                      </div>
                    </div>

                    {/* Table Section */}
                    <div className="space-y-4 pt-4">
                      <h4 className="text-lg font-semibold text-[#0B2C5C] leading-tight">
                        Monthly Performance Summary
                      </h4>
                      <div className="overflow-x-auto rounded-[8px] border border-gray-250">
                        <table className="w-full text-left border-collapse text-sm min-w-[700px]">
                          <thead>
                            <tr className="bg-white border-b border-gray-200">
                              <th className="p-4 font-bold text-gray-800">Month</th>
                              {monthlyData.map(d => (
                                <th key={d.name} className="p-4 font-semibold text-gray-700 text-center">{d.name}</th>
                              ))}
                              <th className="p-4 font-bold text-gray-800 bg-[#F8FAFC] text-center">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* Leads Row */}
                            <tr className="border-b border-gray-200 hover:bg-gray-50/50">
                              <td className="p-4 font-bold text-gray-800 flex items-center gap-2">
                                <span className="w-3 h-3 bg-[#2563EB] rounded-full"></span> Leads
                              </td>
                              {monthlyData.map(d => (
                                <td key={d.name} className="p-4 text-center text-[#2563EB] font-bold">{d.Leads}</td>
                              ))}
                              <td className="p-4 text-center font-extrabold text-[#2563EB] bg-[#EFF6FF]">{totalLeads}</td>
                            </tr>
                            {/* Conversions Row */}
                            <tr className="border-b border-gray-200 hover:bg-gray-50/50">
                              <td className="p-4 font-bold text-gray-800 flex items-center gap-2">
                                <span className="w-3 h-3 bg-[#10B981] rounded-full"></span> Conversions
                              </td>
                              {monthlyData.map(d => (
                                <td key={d.name} className="p-4 text-center text-[#10B981] font-bold">{d.Conversions}</td>
                              ))}
                              <td className="p-4 text-center font-extrabold text-[#10B981] bg-[#ECFDF5]">{totalConversions}</td>
                            </tr>
                            {/* Conversion Rate Row */}
                            <tr className="hover:bg-gray-50/50">
                              <td className="p-4 font-bold text-gray-800 flex items-center gap-2">
                                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                                Conversion Rate
                              </td>
                              {monthlyData.map(d => {
                                const rate = d.Leads > 0 ? Math.round((d.Conversions / d.Leads) * 100) : 0;
                                return (
                                  <td key={d.name} className="p-4 text-center text-gray-900 font-medium">{rate}%</td>
                                );
                              })}
                              <td className="p-4 text-center font-extrabold text-purple-700 bg-[#F3E8FF]">{overallConversionRate}%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <span className="text-[11px] text-gray-400 block font-normal pt-1">
                        {"Conversion Rate = (Conversions / Leads) × 100"}
                      </span>
                    </div>
                  </div>
                  
                   {/* Recent Lead Activity Section */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-150 pb-3">
                      <h3 className="text-lg font-semibold text-[#0B2C5C]">Recent Lead Activity</h3>
                      <button className="text-xs text-[#035096] font-semibold hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                      {recentActivities.map((act) => (
                        <div key={act.id} className="bg-white border border-[#E2E8F0] rounded-[8px] p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
                          <div className="flex items-center gap-4">
                            {/* Blue Avatar with Linear Gradient */}
                            <div 
                              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-sm"
                              style={{ background: 'linear-gradient(180deg, #035096 0%, #008CFF 100%)' }}
                            >
                              {act.initial}
                            </div>
                            <div className="space-y-0.5">
                              <div className="text-sm font-semibold text-gray-900 flex items-center gap-1.5 flex-wrap">
                                <span>{act.name}</span>
                                <span className="font-normal text-gray-500">{act.action}</span>
                              </div>
                              <div className="text-xs text-gray-500">
                                {act.location}
                              </div>
                              <div className="text-xs text-gray-400">
                                {act.time}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center shrink-0 pr-1">
                            {act.type === 'inquiry' && (
                              <svg className="w-6 h-6 text-[#2563EB]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                              </svg>
                            )}
                            {act.type === 'visit' && (
                              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                              </svg>
                            )}
                            {act.type === 'whatsapp' && (
                              <svg className="w-6 h-6 text-[#10B981]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                              </svg>
                            )}
                            {act.type === 'closed' && (
                              <svg className="w-6 h-6 text-[#10B981]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                              </svg>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Empty Right Column for balance */}
                <div className="hidden xl:block"></div>

              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

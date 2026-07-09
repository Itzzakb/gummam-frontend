import React, { useState, useEffect, useRef } from 'react';
import { Eye, Search, Download, X, Lock, Shield, Star, ChevronDown } from 'lucide-react';

interface AgentOwner {
  position: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'Agent' | 'Owner';
  status: 'Approved' | 'Pending' | 'Restricted';
  badges: ('Verified' | 'Premium')[];
  plan: 'Premium' | 'Standard' | 'None';
  propertyListings: number;
  rating: number;
  ratingCount: number;
  joinDate: string;
  conversionRate: string;
  avgResponse: string;
  featuredPosition: string;
  daysLeft: number;
  startDate: string;
  endDate: string;
}

// Period Dropdown component - semibold support
interface PeriodDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const PeriodDropdown: React.FC<PeriodDropdownProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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
        className="flex items-center gap-1 bg-[#E2F5EC] hover:bg-[#d4f0e2] rounded-full px-2.5 py-1 text-[10px] font-semibold text-slate-800 transition-all focus:outline-none cursor-pointer"
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
                option === value ? 'bg-[#F0F4F9]/60 text-[#035096] font-semibold' : 'text-slate-700 hover:bg-slate-50 font-medium'
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

// Custom Filter Dropdown component - semibold support
interface CustomFilterDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder: string;
}

const CustomFilterDropdown: React.FC<CustomFilterDropdownProps> = ({ value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
                option.value === value ? 'bg-[#F0F4F9]/60 text-[#035096] font-semibold' : 'text-slate-700 hover:bg-slate-50 font-medium'
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

export const AgentsOwnersManagement: React.FC = () => {
  // Prepopulated mock data
  const [items, setItems] = useState<AgentOwner[]>([
    {
      position: '001',
      id: 'ID - 001',
      name: 'Rajesh Kumar',
      email: 'rajesh@realestate.com',
      phone: '+91 98765 43210',
      type: 'Agent',
      status: 'Approved',
      badges: ['Verified', 'Premium'],
      plan: 'Premium',
      propertyListings: 24,
      rating: 4.8,
      ratingCount: 156,
      joinDate: '2026-05-15',
      conversionRate: '28.5%',
      avgResponse: '15 mins',
      featuredPosition: '1st Position',
      daysLeft: 5,
      startDate: '2026-07-01',
      endDate: '2026-07-10'
    },
    {
      position: '002',
      id: 'ID - 001',
      name: 'Rajesh Kumar',
      email: 'rajesh@realestate.com',
      phone: '+91 98765 43210',
      type: 'Agent',
      status: 'Approved',
      badges: ['Verified'],
      plan: 'None',
      propertyListings: 18,
      rating: 4.6,
      ratingCount: 98,
      joinDate: '2026-05-15',
      conversionRate: '24.0%',
      avgResponse: '18 mins',
      featuredPosition: '2nd Position',
      daysLeft: 2,
      startDate: '2026-07-03',
      endDate: '2026-07-07'
    },
    {
      position: '003',
      id: 'ID - 003',
      name: 'Suresh Raina',
      email: 'suresh@gmail.com',
      phone: '+91 98765 43211',
      type: 'Owner',
      status: 'Pending',
      badges: [],
      plan: 'None',
      propertyListings: 3,
      rating: 4.8,
      ratingCount: 156,
      joinDate: '2026-06-10',
      conversionRate: '15.0%',
      avgResponse: '45 mins',
      featuredPosition: 'None',
      daysLeft: 0,
      startDate: '',
      endDate: ''
    },
    {
      position: '004',
      id: 'ID - 004',
      name: 'Karan Johar',
      email: 'karan@filmy.com',
      phone: '+91 98765 43212',
      type: 'Owner',
      status: 'Restricted',
      badges: ['Verified'],
      plan: 'None',
      propertyListings: 15,
      rating: 4.8,
      ratingCount: 156,
      joinDate: '2026-04-12',
      conversionRate: '22.0%',
      avgResponse: '30 mins',
      featuredPosition: 'None',
      daysLeft: 0,
      startDate: '',
      endDate: ''
    },
    {
      position: '005',
      id: 'ID - 005',
      name: 'Amitabh B',
      email: 'amitabh@bachchan.com',
      phone: '+91 98765 43213',
      type: 'Agent',
      status: 'Approved',
      badges: ['Verified'],
      plan: 'None',
      propertyListings: 5,
      rating: 4.8,
      ratingCount: 156,
      joinDate: '2026-06-01',
      conversionRate: '18.0%',
      avgResponse: '20 mins',
      featuredPosition: 'None',
      daysLeft: 0,
      startDate: '',
      endDate: ''
    },
    {
      position: '006',
      id: 'ID - 006',
      name: 'Priyanka C',
      email: 'priyanka@pc.com',
      phone: '+91 98765 43214',
      type: 'Agent',
      status: 'Approved',
      badges: ['Verified', 'Premium'],
      plan: 'Premium',
      propertyListings: 31,
      rating: 4.8,
      ratingCount: 156,
      joinDate: '2026-03-20',
      conversionRate: '32.4%',
      avgResponse: '12 mins',
      featuredPosition: 'None',
      daysLeft: 0,
      startDate: '',
      endDate: ''
    },
    {
      position: '007',
      id: 'ID - 007',
      name: 'Shah Rukh',
      email: 'srk@redchillies.com',
      phone: '+91 98765 43215',
      type: 'Owner',
      status: 'Pending',
      badges: [],
      plan: 'None',
      propertyListings: 7,
      rating: 4.8,
      ratingCount: 156,
      joinDate: '2026-06-25',
      conversionRate: '25.0%',
      avgResponse: '15 mins',
      featuredPosition: 'None',
      daysLeft: 0,
      startDate: '',
      endDate: ''
    },
    {
      position: '008',
      id: 'ID - 008',
      name: 'Deepika P',
      email: 'deepika@dp.com',
      phone: '+91 98765 43216',
      type: 'Owner',
      status: 'Approved',
      badges: [],
      plan: 'None',
      propertyListings: 2,
      rating: 4.8,
      ratingCount: 156,
      joinDate: '2026-06-28',
      conversionRate: '30.0%',
      avgResponse: '10 mins',
      featuredPosition: 'None',
      daysLeft: 0,
      startDate: '',
      endDate: ''
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState<AgentOwner | null>(null);

  const [activeIdDropdownRow, setActiveIdDropdownRow] = useState<string | null>(null);
  const agentDropdownRef = useRef<HTMLDivElement>(null);

  const agentIdOptions = [
    { id: 'ID - 001', name: 'Agent Name' },
    { id: 'ID - 002', name: 'Agent Name' },
    { id: 'ID - 003', name: 'Agent Name' },
    { id: 'ID - 004', name: 'Ravi Kumar' },
    { id: 'ID - 005', name: 'Ravi Kumar' },
    { id: 'ID - 006', name: 'Ravi Kumar' },
    { id: 'ID - 007', name: 'Ravi Kumar' },
    { id: 'ID - 008', name: 'Ravi Kumar' },
    { id: 'ID - 009', name: 'Ravi Kumar' }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (agentDropdownRef.current && !agentDropdownRef.current.contains(event.target as Node)) {
        setActiveIdDropdownRow(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Date edits in modal
  const [modalStartDate, setModalStartDate] = useState('');
  const [modalEndDate, setModalEndDate] = useState('');

  // KPI Period States
  const [totalPeriod, setTotalPeriod] = useState('Last Month');
  const [pendingPeriod, setPendingPeriod] = useState('Last Month');
  const [approvedPeriod, setApprovedPeriod] = useState('Last Month');
  const [restrictedPeriod, setRestrictedPeriod] = useState('Last Month');
  const [revenuePeriod, setRevenuePeriod] = useState('Last Month');

  // Handle saving position dates
  const handleSavePositionDates = () => {
    if (!selectedItem) return;
    setItems(prev => prev.map(item => {
      if (item.position === selectedItem.position) {
        return {
          ...item,
          startDate: modalStartDate,
          endDate: modalEndDate,
          daysLeft: 5
        };
      }
      return item;
    }));
    alert('Position management dates updated successfully.');
  };

  // Toggle badge assignment
  const handleToggleBadge = (badge: 'Verified' | 'Premium') => {
    if (!selectedItem) return;
    const hasBadge = selectedItem.badges.includes(badge);
    const updatedBadges = hasBadge 
      ? selectedItem.badges.filter(b => b !== badge)
      : [...selectedItem.badges, badge];

    const updatedItem = { ...selectedItem, badges: updatedBadges };
    setSelectedItem(updatedItem);
    setItems(prev => prev.map(item => item.position === selectedItem.position ? updatedItem : item));
  };

  // Restrict/Approve privileges toggle
  const handleToggleRestriction = () => {
    if (!selectedItem) return;
    const newStatus: 'Approved' | 'Restricted' = selectedItem.status === 'Restricted' ? 'Approved' : 'Restricted';
    const updatedItem: AgentOwner = { ...selectedItem, status: newStatus };
    setSelectedItem(updatedItem);
    setItems(prev => prev.map(item => item.position === selectedItem.position ? updatedItem : item));
  };

  // Open details modal
  const handleViewDetails = (item: AgentOwner) => {
    setSelectedItem(item);
    setModalStartDate(item.startDate || '2026-07-04');
    setModalEndDate(item.endDate || '2026-07-14');
  };

  // Filter logic
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesType = typeFilter === 'All' || item.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // KPI Calculations
  const totalCount = items.length;
  const pendingCount = items.filter(i => i.status === 'Pending').length;
  const approvedCount = items.filter(i => i.status === 'Approved').length;
  const restrictedCount = items.filter(i => i.status === 'Restricted').length;

  const getFormattedCount = (num: number) => {
    return num < 10 ? `0${num}` : String(num);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Agents & Owners Management</h1>
        <p className="text-xs font-medium text-slate-500 mt-1">
          Manage property posters including agents and owners. Approve, assign badges, and monitor listings.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {[
          { label: 'Total Agents/Owners', count: getFormattedCount(totalCount), color: 'text-slate-900', period: totalPeriod, setPeriod: setTotalPeriod },
          { label: 'Pending Approval', count: getFormattedCount(pendingCount), color: 'text-amber-500', period: pendingPeriod, setPeriod: setPendingPeriod },
          { label: 'Approved', count: getFormattedCount(approvedCount), color: 'text-emerald-600', period: approvedPeriod, setPeriod: setApprovedPeriod },
          { label: 'Restricted', count: getFormattedCount(restrictedCount), color: 'text-red-500', period: restrictedPeriod, setPeriod: setRestrictedPeriod },
          { label: 'Monthly Revenue', count: '₹4.9L', color: 'text-[#035096]', period: revenuePeriod, setPeriod: setRevenuePeriod }
        ].map((card, i) => (
          <div key={i} className="bg-white border border-[#dddddd] rounded-[16px] p-6 flex flex-col justify-between min-h-[140px] shadow-none">
            <span className="text-sm font-medium text-slate-500">{card.label}</span>
            <div className="flex items-end justify-between mt-2">
              <span className={`text-3xl font-semibold ${card.color} leading-none`}>{card.count}</span>
              <PeriodDropdown value={card.period} onChange={card.setPeriod} />
            </div>
          </div>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#dddddd] rounded-[16px] p-4 flex flex-col md:flex-row gap-4 justify-between items-center shadow-none">
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

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {/* Status Filter */}
          <CustomFilterDropdown
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="All Status"
            options={[
              { label: 'All Status', value: 'All' },
              { label: 'Approved', value: 'Approved' },
              { label: 'Pending', value: 'Pending' },
              { label: 'Restricted', value: 'Restricted' }
            ]}
          />

          {/* Type Filter */}
          <CustomFilterDropdown
            value={typeFilter}
            onChange={setTypeFilter}
            placeholder="All Types"
            options={[
              { label: 'All Types', value: 'All' },
              { label: 'Agent', value: 'Agent' },
              { label: 'Owner', value: 'Owner' }
            ]}
          />

          {/* Export Button */}
          <button className="h-10 px-4 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[8px] flex items-center gap-2 transition cursor-pointer">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-white rounded-[16px] overflow-hidden border border-[#dddddd] shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="bg-[#F0F2F3] border-b border-[#dddddd] text-slate-700 font-semibold">
                <th className="p-4 pl-6">Agent Position</th>
                <th className="p-4">Name & ID</th>
                <th className="p-4">Type</th>
                <th className="p-4">Status</th>
                <th className="p-4">Badges</th>
                <th className="p-4">Plan</th>
                <th className="p-4 text-center">Property Listings</th>
                <th className="p-4">Rating</th>
                <th className="p-4 text-center pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dddddd] text-slate-700 font-medium">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                    <td className="p-4 pl-6 text-slate-500 font-semibold">{item.position}</td>
                    <td className="p-4 font-semibold relative">
                      {item.type === 'Agent' ? (
                        <div className="relative inline-block text-left" ref={activeIdDropdownRow === item.position ? agentDropdownRef : null}>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveIdDropdownRow(activeIdDropdownRow === item.position ? null : item.position);
                            }}
                            className="px-2.5 py-1 border border-purple-300 text-purple-700 bg-purple-50 rounded-[4px] text-[10px] flex items-center gap-1.5 font-semibold cursor-pointer select-none"
                          >
                            <span>{item.id}</span>
                            <ChevronDown className={`w-2.5 h-2.5 shrink-0 transition-transform duration-200 ${
                              activeIdDropdownRow === item.position ? 'rotate-180' : ''
                            }`} />
                          </button>

                          {activeIdDropdownRow === item.position && (
                            <div className="absolute left-0 mt-1.5 w-52 bg-white border border-slate-200 rounded-[8px] shadow-lg z-50 py-1 flex flex-col max-h-[220px] overflow-y-auto [scrollbar-width:thin]">
                              {agentIdOptions.map((opt) => {
                                const isSelected = opt.id === item.id;
                                return (
                                  <button
                                    key={opt.id}
                                    type="button"
                                    onClick={() => {
                                      setItems(prev => prev.map(i => i.position === item.position ? { ...i, id: opt.id, name: opt.name } : i));
                                      setActiveIdDropdownRow(null);
                                    }}
                                    className={`w-full text-left px-3.5 py-2 text-[10px] transition-colors flex items-center justify-between border-b border-slate-100 last:border-b-0 ${
                                      isSelected 
                                        ? 'bg-[#F0F4F9]/60 text-[#035096] font-semibold' 
                                        : 'text-slate-700 hover:bg-slate-50 font-medium'
                                    }`}
                                  >
                                    <span>{opt.id}</span>
                                    <span className="text-slate-400 font-medium">{opt.name}</span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="font-semibold text-slate-900">{item.name}</span>
                      )}
                    </td>
                    <td className="p-4 text-slate-400 font-medium">{item.type}</td>
                    <td className="p-4 font-semibold">
                      <span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-semibold ${
                        item.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' :
                        item.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                        'bg-red-50 text-red-600'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 font-semibold">
                      <div className="flex items-center gap-1.5">
                        {item.badges.includes('Verified') && (
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-[4px] text-[10px] flex items-center gap-1 font-semibold">
                            <span>✓ Verified</span>
                          </span>
                        )}
                        {item.badges.length === 0 && <span className="text-slate-400 font-medium">-</span>}
                      </div>
                    </td>
                    <td className="p-4 font-semibold">
                      {item.plan === 'Premium' ? (
                        <span className="px-2 py-0.5 bg-purple-50 text-purple-700 border border-purple-100 rounded-[4px] text-[10px] font-semibold">
                          ★ Premium
                        </span>
                      ) : (
                        <span className="text-slate-400 font-medium">-</span>
                      )}
                    </td>
                    <td className="p-4 text-center font-semibold text-slate-900">{item.propertyListings}</td>
                    <td className="p-4 font-semibold text-slate-500">
                      <span className="text-amber-500 mr-1">★</span>
                      <span className="text-slate-700 font-semibold">{item.rating}</span>
                      <span className="text-slate-400 font-medium">({item.ratingCount})</span>
                    </td>
                    <td className="p-4 pr-6 text-center">
                      <button
                        onClick={() => handleViewDetails(item)}
                        className="w-8 h-8 rounded-[6px] hover:bg-slate-100 flex items-center justify-center text-[#035096] transition cursor-pointer mx-auto"
                        title="View Details & Manage"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-400">
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 pl-6 bg-slate-50/20 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500 font-semibold">
          <span>Showing {filteredItems.length} of {items.length} agents/owners</span>
        </div>
      </div>

      {/* Details/Management Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-[1000] p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-[500px] rounded-[16px] overflow-hidden border border-[#dddddd] shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">{selectedItem.name}</span>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 rounded-[8px] hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-650 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto [scrollbar-width:thin]">
              {/* Profile Card Header Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-[8px] bg-[#035096] flex items-center justify-center text-white text-lg font-semibold shrink-0">
                  {selectedItem.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 leading-tight">{selectedItem.name}</h3>
                  <div className="text-xs text-slate-450 mt-0.5">{selectedItem.email}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-semibold bg-blue-50 text-blue-700">
                      {selectedItem.type}
                    </span>
                    <span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-semibold ${
                      selectedItem.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' :
                      selectedItem.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                      'bg-red-50 text-red-600'
                    }`}>
                      {selectedItem.status}
                    </span>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Details Info Fields */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs text-slate-700">
                <div>
                  <div className="text-slate-400 font-semibold mb-1">Email</div>
                  <div className="text-slate-900 font-semibold break-all">{selectedItem.email}</div>
                </div>
                <div>
                  <div className="text-slate-400 font-semibold mb-1">Phone</div>
                  <div className="text-slate-900 font-semibold">{selectedItem.phone}</div>
                </div>
                <div>
                  <div className="text-slate-400 font-semibold mb-1">Join Date</div>
                  <div className="text-slate-900 font-semibold">{selectedItem.joinDate}</div>
                </div>
                <div>
                  <div className="text-slate-400 font-semibold mb-1">Agent ID</div>
                  <div className="text-slate-900 font-semibold">{selectedItem.id || 'N/A'}</div>
                </div>
              </div>

              {/* Performance & Listings Grid */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Performance & Listings</span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50/30 border border-blue-100 rounded-[8px] p-3 text-center">
                    <div className="text-[10px] text-slate-500 font-semibold">Active Listings</div>
                    <div className="text-lg text-blue-700 mt-1 font-semibold">{selectedItem.propertyListings}</div>
                  </div>
                  <div className="bg-amber-50/30 border border-amber-100 rounded-[8px] p-3 text-center">
                    <div className="text-[10px] text-slate-500 font-semibold">Conversion Rate</div>
                    <div className="text-lg text-amber-600 mt-1 font-semibold">{selectedItem.conversionRate}</div>
                  </div>
                  <div className="bg-emerald-50/30 border border-emerald-100 rounded-[8px] p-3 text-center">
                    <div className="text-[10px] text-slate-500 font-semibold">Avg Rating</div>
                    <div className="text-lg text-emerald-700 mt-1 font-semibold">{selectedItem.rating}</div>
                  </div>
                  <div className="bg-purple-50/30 border border-purple-100 rounded-[8px] p-3 text-center">
                    <div className="text-[10px] text-slate-500 font-semibold">Avg Response</div>
                    <div className="text-lg text-purple-700 mt-1 font-semibold">{selectedItem.avgResponse}</div>
                  </div>
                </div>
              </div>

              {/* Agent Position manage - only if Agent */}
              {selectedItem.type === 'Agent' && (
                <div className="space-y-3 p-4 bg-slate-50/50 border border-slate-100 rounded-[8px]">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-700 font-semibold">Agent Position manage : {selectedItem.featuredPosition}</span>
                    <span className="text-purple-700 font-semibold">{selectedItem.daysLeft} Days Left</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-500 font-semibold">Start Date</span>
                      <input
                        type="date"
                        value={modalStartDate}
                        onChange={(e) => setModalStartDate(e.target.value)}
                        className="w-full h-8 px-2 bg-white border border-slate-200 rounded-[4px] text-xs outline-none transition focus:border-[#035096]"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-500 font-semibold">End Date</span>
                      <input
                        type="date"
                        value={modalEndDate}
                        onChange={(e) => setModalEndDate(e.target.value)}
                        className="w-full h-8 px-2 bg-white border border-slate-200 rounded-[4px] text-xs outline-none transition focus:border-[#035096]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={handleSavePositionDates}
                      className="h-8 px-4 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[4px] transition cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}

              {/* Badge Management */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Badge Management</span>
                <div className="space-y-2.5">
                  {/* Verified Badge */}
                  <div className="flex items-center justify-between p-3 border border-slate-100 rounded-[8px] bg-white text-xs">
                    <div className="flex items-start gap-3">
                      <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-800 block font-semibold">Verified Agent Badge</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">Indicates verified and trusted agent</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggleBadge('Verified')}
                      className={`h-7 px-3 rounded-[4px] text-[10px] font-semibold transition cursor-pointer ${
                        selectedItem.badges.includes('Verified')
                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-150'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-transparent'
                      }`}
                    >
                      {selectedItem.badges.includes('Verified') ? '✓ Assigned' : 'Assign'}
                    </button>
                  </div>

                  {/* Premium Badge */}
                  <div className="flex items-center justify-between p-3 border border-slate-100 rounded-[8px] bg-white text-xs">
                    <div className="flex items-start gap-3">
                      <Star className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-800 block font-semibold">Premium Agent Badge</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">Indicates top performer with enhanced visibility</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggleBadge('Premium')}
                      className={`h-7 px-3 rounded-[4px] text-[10px] font-semibold transition cursor-pointer ${
                        selectedItem.badges.includes('Premium')
                          ? 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-150'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-transparent'
                      }`}
                    >
                      {selectedItem.badges.includes('Premium') ? '★ Assigned' : 'Assign'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-2.5">
              <button
                onClick={handleToggleRestriction}
                className="w-full h-9 bg-red-50 hover:bg-red-100 border border-red-200 text-red-650 text-xs font-semibold rounded-[6px] flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{selectedItem.status === 'Restricted' ? 'Unrestrict Posting Privileges' : 'Restrict Posting Privileges'}</span>
              </button>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-full h-9 bg-slate-200/80 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-[6px] transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

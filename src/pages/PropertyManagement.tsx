import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Eye, Search, Download, X, AlertTriangle, Copy, MapPin, Home, Flag, Check, Ban, ChevronDown } from 'lucide-react';

interface PropertyItem {
  id: string;
  title: string;
  address: string;
  type: 'Apartment' | 'House' | 'Commercial' | 'Land';
  price: string;
  agent: string;
  agentEmail: string;
  status: 'Approved' | 'Pending' | 'Sold' | 'Rented';
  isSuspicious: boolean;
  isDuplicate: boolean;
  titleMgtId: string;
  titleMgtDaysLeft: number;
  bedrooms: number;
  bathrooms: number;
  area: string;
  views: number;
  inquiries: number;
  imagesCount: number;
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
    <div className="relative w-full lg:w-auto lg:min-w-[130px] text-left" ref={dropdownRef}>
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
interface TableTitleMgtDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const TableTitleMgtDropdown: React.FC<TableTitleMgtDropdownProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

  const titleMgtOptions = [
    { id: 'ID - 001', label: 'ID - 001  Trending Homes You\'ll Love' },
    { id: 'ID - 002', label: 'ID - 002  Your Ultimate Hub for Hyderabad' },
    { id: 'ID - 003', label: 'ID - 003  New Launch' },
    { id: 'ID - 004', label: 'ID - 004  Prime Properties' },
    { id: 'ID - 005', label: 'ID - 005  Commercial Real Estate' }
  ];

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
        width: 300
      });
    }
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-2.5 py-1 border border-blue-200 text-blue-700 bg-blue-50/50 rounded-[4px] text-[10px] inline-flex items-center gap-1.5 cursor-pointer font-semibold whitespace-nowrap select-none hover:bg-blue-100/50 transition-colors focus:outline-none"
      >
        <span>{value}</span>
        <ChevronDown className={`w-2.5 h-2.5 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-700' : 'text-blue-500'}`} />
      </button>

      {isOpen && createPortal(
        <div
          className="bg-white border border-slate-200 rounded-[8px] shadow-lg z-[9999] py-1 flex flex-col"
          style={{
            position: 'absolute',
            top: coords.top,
            left: coords.left,
            width: coords.width
          }}
        >
          {titleMgtOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                onChange(opt.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-[10px] transition-colors flex items-center justify-start cursor-pointer border-b border-slate-50 last:border-b-0 ${
                opt.id === value ? 'bg-[#F0F4F9]/60 font-semibold text-[#035096]' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{opt.label}</span>
            </button>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
};

export const PropertyManagement: React.FC = () => {
  // Prepopulated initial mock properties
  const [properties, setProperties] = useState<PropertyItem[]>([
    {
      id: 'P001',
      title: 'Luxury 3BHK Apartment',
      address: 'Uppal, Hyderabad',
      type: 'Apartment',
      price: '₹1.50Cr',
      agent: 'Rajesh Kumar',
      agentEmail: 'rajesh@realestate.com',
      status: 'Approved',
      isSuspicious: false,
      isDuplicate: false,
      titleMgtId: 'ID - 001',
      titleMgtDaysLeft: 5,
      bedrooms: 3,
      bathrooms: 2,
      area: '2500 Sft.',
      views: 156,
      inquiries: 12,
      imagesCount: 8,
      startDate: '2026-07-01',
      endDate: '2026-07-06'
    },
    {
      id: 'P002',
      title: 'Spacious 2BHK House',
      address: 'Virar West, Mumbai',
      type: 'House',
      price: '₹4.5Cr.',
      agent: 'Priya Singh',
      agentEmail: 'priya@realestate.com',
      status: 'Pending',
      isSuspicious: true,
      isDuplicate: false,
      titleMgtId: 'ID - 001',
      titleMgtDaysLeft: 0,
      bedrooms: 2,
      bathrooms: 2,
      area: '1800 Sft.',
      views: 98,
      inquiries: 4,
      imagesCount: 6,
      startDate: '',
      endDate: ''
    },
    {
      id: 'P003',
      title: 'Commercial Space',
      address: 'Nariman Point, Mumbai',
      type: 'Commercial',
      price: '₹25Cr.',
      agent: 'Deepak Verma',
      agentEmail: 'deepak@realestate.com',
      status: 'Approved',
      isSuspicious: false,
      isDuplicate: true,
      titleMgtId: 'ID - 001',
      titleMgtDaysLeft: 7,
      bedrooms: 0,
      bathrooms: 4,
      area: '5000 Sft.',
      views: 220,
      inquiries: 18,
      imagesCount: 12,
      startDate: '2026-07-02',
      endDate: '2026-07-09'
    },
    {
      id: 'P004',
      title: 'Cozy 1BHK Apartment',
      address: 'Thane West, Mumbai',
      type: 'Apartment',
      price: '₹22L',
      agent: 'Rajesh Kumar',
      agentEmail: 'rajesh@realestate.com',
      status: 'Sold',
      isSuspicious: false,
      isDuplicate: false,
      titleMgtId: 'ID - 001',
      titleMgtDaysLeft: 0,
      bedrooms: 1,
      bathrooms: 1,
      area: '650 Sft.',
      views: 75,
      inquiries: 3,
      imagesCount: 4,
      startDate: '',
      endDate: ''
    },
    {
      id: 'P005',
      title: 'Plot in Noida Extension',
      address: 'Sector 121, Noida',
      type: 'Land',
      price: '₹3.5Cr.',
      agent: 'Rajesh Kumar',
      agentEmail: 'rajesh@realestate.com',
      status: 'Pending',
      isSuspicious: true,
      isDuplicate: false,
      titleMgtId: 'ID - 001',
      titleMgtDaysLeft: 0,
      bedrooms: 0,
      bathrooms: 0,
      area: '3000 Sft.',
      views: 110,
      inquiries: 5,
      imagesCount: 3,
      startDate: '',
      endDate: ''
    },
    {
      id: 'P006',
      title: '4BHK Penthouse',
      address: 'Powai, Mumbai',
      type: 'Apartment',
      price: '₹18.5L',
      agent: 'Rajesh Kumar',
      agentEmail: 'rajesh@realestate.com',
      status: 'Approved',
      isSuspicious: false,
      isDuplicate: true,
      titleMgtId: 'ID - 001',
      titleMgtDaysLeft: 30,
      bedrooms: 4,
      bathrooms: 4,
      area: '4200 Sft.',
      views: 310,
      inquiries: 25,
      imagesCount: 15,
      startDate: '2026-07-04',
      endDate: '2026-08-03'
    },
    {
      id: 'P007',
      title: 'Villa in Gurgaon',
      address: 'DLF Magnolias, Gurgaon',
      type: 'House',
      price: '₹12Cr.',
      agent: 'Rajesh Kumar',
      agentEmail: 'rajesh@realestate.com',
      status: 'Rented',
      isSuspicious: false,
      isDuplicate: false,
      titleMgtId: 'ID - 001',
      titleMgtDaysLeft: 15,
      bedrooms: 5,
      bathrooms: 6,
      area: '6000 Sft.',
      views: 185,
      inquiries: 9,
      imagesCount: 10,
      startDate: '2026-07-01',
      endDate: '2026-07-16'
    },
    {
      id: 'P008',
      title: 'Luxury 3BHK Apartment',
      address: 'Uppal, Hyderabad',
      type: 'Apartment',
      price: '₹15L',
      agent: 'Rajesh Kumar',
      agentEmail: 'rajesh@realestate.com',
      status: 'Pending',
      isSuspicious: false,
      isDuplicate: false,
      titleMgtId: 'ID - 001',
      titleMgtDaysLeft: 0,
      bedrooms: 3,
      bathrooms: 2,
      area: '2500 Sft.',
      views: 45,
      inquiries: 1,
      imagesCount: 5,
      startDate: '',
      endDate: ''
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [cityFilter, setCityFilter] = useState('All');

  // Filter mode for Suspicious / Duplicates buttons
  const [showOnlySuspicious, setShowOnlySuspicious] = useState(false);
  const [showOnlyDuplicates, setShowOnlyDuplicates] = useState(false);

  const [selectedProperty, setSelectedProperty] = useState<PropertyItem | null>(null);
  const [modalStartDate, setModalStartDate] = useState('');
  const [modalEndDate, setModalEndDate] = useState('');

  // Period States
  const [totalPeriod, setTotalPeriod] = useState('Last Month');
  const [pendingPeriod, setPendingPeriod] = useState('Last Month');
  const [approvedPeriod, setApprovedPeriod] = useState('Last Month');
  const [suspiciousPeriod, setSuspiciousPeriod] = useState('Last Month');
  const [duplicatePeriod, setDuplicatePeriod] = useState('Last Month');

  // Title drop state in modal
  const [showModalTitleDropdown, setShowModalTitleDropdown] = useState(false);
  const modalTitleDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalTitleDropdownRef.current && !modalTitleDropdownRef.current.contains(event.target as Node)) {
        setShowModalTitleDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle status updates from modal
  const handleUpdateStatus = (id: string, newStatus: PropertyItem['status']) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
    if (selectedProperty && selectedProperty.id === id) {
      setSelectedProperty(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  // Toggle Suspicious flag
  const handleToggleSuspicious = (id: string) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, isSuspicious: !p.isSuspicious } : p));
    if (selectedProperty && selectedProperty.id === id) {
      setSelectedProperty(prev => prev ? { ...prev, isSuspicious: !prev.isSuspicious } : null);
    }
  };

  // Save Title Manage Date range
  const handleSaveDates = () => {
    if (!selectedProperty) return;
    setProperties(prev => prev.map(p => {
      if (p.id === selectedProperty.id) {
        return {
          ...p,
          startDate: modalStartDate,
          endDate: modalEndDate,
          titleMgtDaysLeft: 10
        };
      }
      return p;
    }));
    alert('Title Management duration updated.');
  };

  // Extraction of unique cities for filtering
  const cities = Array.from(new Set(properties.map(p => p.address.split(', ').pop() || '')));

  // Filtering properties
  const filteredProperties = properties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchesType = typeFilter === 'All' || p.type === typeFilter;
    const matchesCity = cityFilter === 'All' || p.address.endsWith(cityFilter);
    const matchesSuspicious = !showOnlySuspicious || p.isSuspicious;
    const matchesDuplicate = !showOnlyDuplicates || p.isDuplicate;

    return matchesSearch && matchesStatus && matchesType && matchesCity && matchesSuspicious && matchesDuplicate;
  });

  // Dynamic counts for top cards
  const totalCount = properties.length;
  const pendingCount = properties.filter(p => p.status === 'Pending').length;
  const approvedCount = properties.filter(p => p.status === 'Approved').length;
  const suspiciousCount = properties.filter(p => p.isSuspicious).length;
  const duplicateCount = properties.filter(p => p.isDuplicate).length;

  const formatCount = (num: number) => {
    return num < 10 ? `0${num}` : String(num);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Property Management</h1>
        <p className="text-xs font-medium text-slate-500 mt-1">
          Control all property listings on the platform. Approve/reject, mark status, and detect suspicious listings.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {[
          { label: 'Total Properties', count: formatCount(totalCount), color: 'text-slate-900', period: totalPeriod, setPeriod: setTotalPeriod },
          { label: 'Pending Review', count: formatCount(pendingCount), color: 'text-amber-500', period: pendingPeriod, setPeriod: setPendingPeriod },
          { label: 'Approved', count: formatCount(approvedCount), color: 'text-emerald-600', period: approvedPeriod, setPeriod: setApprovedPeriod },
          { label: 'Suspicious', count: formatCount(suspiciousCount), color: 'text-red-500', period: suspiciousPeriod, setPeriod: setSuspiciousPeriod },
          { label: 'Duplicate Detected', count: formatCount(duplicateCount), color: 'text-purple-650', period: duplicatePeriod, setPeriod: setDuplicatePeriod }
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
      <div className="bg-white border border-[#dddddd] rounded-[16px] p-4 flex flex-col gap-4 shadow-none">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center w-full">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3.5 my-auto inset-y-0 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200 rounded-[8px] text-xs outline-none transition placeholder:text-slate-400 focus:border-[#035096]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 w-full lg:flex lg:flex-wrap lg:items-center lg:w-auto lg:justify-end">
            {/* Status Filter */}
            <CustomFilterDropdown
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="All Status"
              options={[
                { label: 'All Status', value: 'All' },
                { label: 'Approved', value: 'Approved' },
                { label: 'Pending', value: 'Pending' },
                { label: 'Sold', value: 'Sold' },
                { label: 'Rented', value: 'Rented' }
              ]}
            />

            {/* Type Filter */}
            <CustomFilterDropdown
              value={typeFilter}
              onChange={setTypeFilter}
              placeholder="All Types"
              options={[
                { label: 'All Types', value: 'All' },
                { label: 'Apartment', value: 'Apartment' },
                { label: 'House', value: 'House' },
                { label: 'Commercial', value: 'Commercial' },
                { label: 'Land', value: 'Land' }
              ]}
            />

            {/* City Filter */}
            <CustomFilterDropdown
              value={cityFilter}
              onChange={setCityFilter}
              placeholder="All Cities"
              options={[{ label: 'All Cities', value: 'All' }, ...cities.map(c => ({ label: c, value: c }))]}
            />

            {/* Export Button */}
            <button className="h-10 px-4 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[8px] flex items-center justify-center gap-2 transition cursor-pointer w-full lg:w-auto">
              <Download className="h-4 w-4 shrink-0" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Action Toggle buttons for Suspicious/Duplicates */}
        <div className="flex flex-col lg:flex-row gap-3 w-full lg:items-center">
          <button
            onClick={() => {
              setShowOnlySuspicious(!showOnlySuspicious);
              setShowOnlyDuplicates(false);
            }}
            className={`h-10 px-4 rounded-[8px] text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer border w-full lg:w-auto ${
              showOnlySuspicious 
                ? 'bg-red-100 text-red-700 border-red-400 font-bold' 
                : 'bg-red-50/80 text-red-650 hover:bg-red-100/50 border-red-200'
            }`}
          >
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Show Suspicious ({suspiciousCount})</span>
          </button>

          <button
            onClick={() => {
              setShowOnlyDuplicates(!showOnlyDuplicates);
              setShowOnlySuspicious(false);
            }}
            className={`h-10 px-4 rounded-[8px] text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer border w-full lg:w-auto ${
              showOnlyDuplicates 
                ? 'bg-amber-100 text-amber-800 border-amber-400 font-bold' 
                : 'bg-amber-50/80 text-amber-700 hover:bg-amber-100/50 border-amber-200'
            }`}
          >
            <Copy className="w-4 h-4 shrink-0" />
            <span>Show Duplicates ({duplicateCount})</span>
          </button>
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-white rounded-[16px] overflow-hidden border border-[#dddddd] shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="bg-[#F0F2F3] border-b border-[#dddddd] text-slate-700 font-semibold">
                <th className="p-4 pl-6">Property</th>
                <th className="p-4">Type</th>
                <th className="p-4">Price</th>
                <th className="p-4">Agent</th>
                <th className="p-4">Status</th>
                <th className="p-4 min-w-[100px] whitespace-nowrap">Title .Mgt</th>
                <th className="p-4 text-center min-w-[110px] whitespace-nowrap">Title .Mgt Day Left</th>
                <th className="p-4 text-center pr-6 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dddddd] text-slate-700 font-medium">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((prop) => (
                  <tr key={prop.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="p-4 pl-6 font-semibold">
                      <div className="flex flex-col">
                        <span className="text-slate-900 font-semibold">{prop.title}</span>
                        <span className="text-[10px] text-slate-400 mt-0.5 font-medium">{prop.address}</span>
                      </div>
                    </td>
                    <td className="p-4 font-semibold">
                      <span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-semibold ${
                        prop.type === 'Apartment' ? 'bg-blue-50 text-blue-700' :
                        prop.type === 'House' ? 'bg-emerald-50 text-emerald-700' :
                        prop.type === 'Commercial' ? 'bg-orange-50 text-orange-755' :
                        'bg-yellow-50 text-yellow-800'
                      }`}>
                        {prop.type}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-slate-900">{prop.price}</td>
                    <td className="p-4 text-slate-500 font-semibold">{prop.agent}</td>
                    <td className="p-4 font-semibold">
                      <span className={`px-2.5 py-0.5 rounded-[4px] text-[10px] font-semibold ${
                        prop.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' :
                        prop.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                        prop.status === 'Sold' ? 'bg-blue-50 text-[#035096]' :
                        'bg-pink-50 text-pink-700'
                      }`}>
                        {prop.status}
                      </span>
                    </td>
                    <td className="p-4 font-semibold min-w-[100px] whitespace-nowrap">
                      <TableTitleMgtDropdown
                        value={prop.titleMgtId}
                        onChange={(newVal) => {
                          setProperties(prev => prev.map(p => p.id === prop.id ? { ...p, titleMgtId: newVal } : p));
                        }}
                      />
                    </td>
                    <td className="p-4 text-center font-semibold min-w-[110px] whitespace-nowrap">
                      {prop.titleMgtDaysLeft > 0 ? (
                        <span className="px-2.5 py-0.5 bg-red-50 text-red-650 rounded-[4px] text-[10px] font-semibold whitespace-nowrap">
                          {prop.titleMgtDaysLeft} days
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 bg-slate-100 text-slate-500 rounded-[4px] text-[10px] font-semibold whitespace-nowrap">
                          00
                        </span>
                      )}
                    </td>
                    <td className="p-4 pr-6 text-center">
                      <button
                        onClick={() => {
                          setSelectedProperty(prop);
                          setModalStartDate(prop.startDate || '');
                          setModalEndDate(prop.endDate || '');
                        }}
                        className="w-8 h-8 rounded-[6px] hover:bg-slate-100 flex items-center justify-center text-[#035096] transition cursor-pointer mx-auto"
                        title="View & Edit Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    No matching properties found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 pl-6 bg-slate-50/20 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500 font-semibold">
          <span>Showing {filteredProperties.length} of {properties.length} properties</span>
        </div>
      </div>

      {/* Details modal overlay */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-[1000] p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-[500px] rounded-[16px] overflow-hidden border border-[#dddddd] shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">{selectedProperty.title} in Hyderabad</span>
              <button
                onClick={() => setSelectedProperty(null)}
                className="w-8 h-8 rounded-[8px] hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-650 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto [scrollbar-width:thin]">
              
              {/* Address and Type Header info */}
              <div className="grid grid-cols-2 gap-4 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#035096]" />
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">Address</span>
                    <span className="text-slate-900 block font-semibold">{selectedProperty.address}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-emerald-600" />
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">Type</span>
                    <span className="text-slate-900 block font-semibold">{selectedProperty.type}</span>
                  </div>
                </div>
              </div>

              {/* Price and area configuration boxes */}
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-blue-50/40 border border-blue-100 rounded-[8px] p-2.5 text-center">
                  <div className="text-[9px] text-slate-500 font-semibold">Price</div>
                  <div className="text-xs text-blue-700 mt-1 font-semibold">{selectedProperty.price}</div>
                </div>
                <div className="bg-emerald-50/40 border border-emerald-100 rounded-[8px] p-2.5 text-center">
                  <div className="text-[9px] text-slate-500 font-semibold">Bedrooms</div>
                  <div className="text-xs text-emerald-700 mt-1 font-semibold">{selectedProperty.bedrooms || '-'}</div>
                </div>
                <div className="bg-blue-50/40 border border-blue-100 rounded-[8px] p-2.5 text-center">
                  <div className="text-[9px] text-slate-500 font-semibold">Bathrooms</div>
                  <div className="text-xs text-blue-700 mt-1 font-semibold">{selectedProperty.bathrooms || '-'}</div>
                </div>
                <div className="bg-amber-50/40 border border-amber-100 rounded-[8px] p-2.5 text-center">
                  <div className="text-[9px] text-slate-500 font-semibold">Area</div>
                  <div className="text-xs text-amber-700 mt-1 font-semibold">{selectedProperty.area}</div>
                </div>
              </div>

              {/* Posted By author block */}
              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider">Posted By</span>
                <div className="p-3 bg-slate-100/60 rounded-[8px] text-xs text-slate-700 font-semibold">
                  <span className="text-slate-900 block font-semibold">{selectedProperty.agent}</span>
                  <span className="text-slate-400 block mt-0.5 font-semibold">{selectedProperty.agentEmail}</span>
                </div>
              </div>

              {/* Performance numbers */}
              <div className="space-y-2">
                <span className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider">Performance</span>
                <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                  <div className="p-3 border border-slate-100 rounded-[8px] bg-white">
                    <span className="text-[9px] text-slate-450 block font-semibold">Views</span>
                    <span className="text-blue-700 block mt-1 text-sm font-semibold">{selectedProperty.views}</span>
                  </div>
                  <div className="p-3 border border-slate-100 rounded-[8px] bg-white">
                    <span className="text-[9px] text-slate-455 block font-semibold">Inquiries</span>
                    <span className="text-emerald-700 block mt-1 text-sm font-semibold">{selectedProperty.inquiries}</span>
                  </div>
                  <div className="p-3 border border-slate-100 rounded-[8px] bg-white">
                    <span className="text-[9px] text-slate-455 block font-semibold">Images</span>
                    <span className="text-blue-655 block mt-1 text-sm font-semibold">{selectedProperty.imagesCount}</span>
                  </div>
                </div>
              </div>

              {/* Title Manage Section with custom drop menu */}
              <div className="space-y-2 relative" ref={modalTitleDropdownRef}>
                <span className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider">Title Manage</span>
                <button
                  type="button"
                  onClick={() => setShowModalTitleDropdown(!showModalTitleDropdown)}
                  className={`w-full h-8 px-3 bg-white border rounded-[6px] text-xs font-semibold transition-all focus:outline-none flex items-center justify-between cursor-pointer ${
                    showModalTitleDropdown
                      ? 'border-[#035096] text-[#035096] ring-1/2 ring-[#035096]/20'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span>{selectedProperty.titleMgtId}</span>
                  <svg
                    className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                      showModalTitleDropdown ? 'rotate-180 text-[#035096]' : 'text-slate-500'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {showModalTitleDropdown && (
                  <div className="absolute left-0 right-0 mt-1 bg-white border border-slate-200 rounded-[6px] shadow-lg z-50 py-1 flex flex-col text-xs">
                    {['ID - 001', 'ID - 002'].map((idVal) => (
                      <button
                        key={idVal}
                        type="button"
                        onClick={() => {
                          setProperties(prev => prev.map(p => p.id === selectedProperty.id ? { ...p, titleMgtId: idVal } : p));
                          setSelectedProperty(prev => prev ? { ...prev, titleMgtId: idVal } : null);
                          setShowModalTitleDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2 transition-colors flex items-center justify-between ${
                          idVal === selectedProperty.titleMgtId ? 'bg-[#F0F4F9]/60 text-[#035096] font-semibold' : 'text-slate-700 hover:bg-slate-50 font-medium'
                        }`}
                      >
                        <span>{idVal}</span>
                        {idVal === selectedProperty.titleMgtId && (
                          <svg className="w-3.5 h-3.5 text-[#035096] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Date management / duration configure */}
              <div className="space-y-3 p-4 bg-slate-50/50 border border-slate-100 rounded-[8px]">
                <span className="text-xs font-semibold text-slate-700 block">Day Left</span>
                <div className="grid grid-cols-2 gap-3 text-xs">
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
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleSaveDates}
                    className="h-8 px-4 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[4px] transition cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </div>

              {/* Property Status buttons group */}
              <div className="space-y-2.5">
                <span className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider">Property Status</span>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => handleUpdateStatus(selectedProperty.id, 'Approved')}
                    className="h-9 border border-slate-200 bg-white hover:bg-slate-50 text-slate-755 font-semibold rounded-[6px] flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedProperty.id, 'Pending')}
                    className="h-9 border border-slate-200 bg-white hover:bg-slate-50 text-slate-755 font-semibold rounded-[6px] flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Ban className="w-3.5 h-3.5 text-red-500" />
                    <span>Reject</span>
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedProperty.id, 'Sold')}
                    className="h-9 border border-slate-200 bg-white hover:bg-slate-50 text-slate-755 font-semibold rounded-[6px] flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5 text-blue-650" />
                    <span>Mark Sold</span>
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedProperty.id, 'Rented')}
                    className="h-9 border border-slate-200 bg-white hover:bg-slate-50 text-slate-755 font-semibold rounded-[6px] flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5 text-pink-650" />
                    <span>Mark Rented</span>
                  </button>
                </div>

                <button
                  onClick={() => handleToggleSuspicious(selectedProperty.id)}
                  className={`w-full h-9 border rounded-[6px] flex items-center justify-center gap-1.5 transition cursor-pointer text-xs font-semibold ${
                    selectedProperty.isSuspicious 
                      ? 'bg-red-50 border-red-200 text-red-650 hover:bg-red-100/50' 
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>Flag as Suspicious</span>
                </button>
              </div>
            </div>

            {/* Close footer */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50">
              <button
                onClick={() => setSelectedProperty(null)}
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

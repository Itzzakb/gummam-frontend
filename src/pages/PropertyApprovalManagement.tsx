import React, { useState, useEffect, useRef } from 'react';
import { Eye, Search, Download, X, Check, Ban, AlertCircle, MapPin } from 'lucide-react';

interface ApprovalRequest {
  id: string;
  title: string;
  address: string;
  ownerAgent: string;
  type: 'Apartment' | 'House' | 'Commercial' | 'Land';
  category: string;
  submittedDate: string;
  status: 'Approved' | 'Pending' | 'Under Review' | 'Rejected';
  price: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  furnishing: string;
  city: string;
  state: string;
  pincode: string;
  images: string[];
  latLng: string;
  checks: {
    titleClear: boolean;
    duplicateCheck: boolean;
    descriptionCheck: boolean;
    pricingCheck: boolean;
    imageCountCheck: boolean;
    contentCheck: boolean;
  };
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

export const PropertyApprovalManagement: React.FC = () => {
  // Prepopulated mock data
  const [requests, setRequests] = useState<ApprovalRequest[]>([
    {
      id: 'PROP-001',
      title: 'Luxury 3BHK Apartment',
      address: 'Uppal, Hyderabad',
      ownerAgent: 'Rajesh Kumar',
      type: 'Apartment',
      category: 'Residential',
      submittedDate: '07 Jun 2026',
      status: 'Approved',
      price: '₹2,50,00,000',
      area: 3500,
      bedrooms: 4,
      bathrooms: 3,
      furnishing: 'Fully Furnished',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500039',
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80'
      ],
      latLng: '18.5204, 73.8567',
      checks: {
        titleClear: true,
        duplicateCheck: true,
        descriptionCheck: true,
        pricingCheck: false,
        imageCountCheck: true,
        contentCheck: true
      }
    },
    {
      id: 'PROP-002',
      title: 'Spacious 2BHK House',
      address: 'Virar West, Mumbai',
      ownerAgent: 'Rahul Sharma',
      type: 'House',
      category: 'Residential',
      submittedDate: '07 Jun 2026',
      status: 'Pending',
      price: '₹95,00,000',
      area: 1800,
      bedrooms: 2,
      bathrooms: 2,
      furnishing: 'Unfurnished',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '401303',
      images: [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&auto=format&fit=crop&q=80'
      ],
      latLng: '19.4564, 72.8001',
      checks: {
        titleClear: true,
        duplicateCheck: false,
        descriptionCheck: true,
        pricingCheck: true,
        imageCountCheck: false,
        contentCheck: true
      }
    },
    {
      id: 'PROP-003',
      title: 'Commercial Space',
      address: 'Nariman Point, Mumbai',
      ownerAgent: 'Rajesh Kumar',
      type: 'Commercial',
      category: 'Office Space',
      submittedDate: '07 Jun 2026',
      status: 'Approved',
      price: '₹25,00,00,000',
      area: 5000,
      bedrooms: 0,
      bathrooms: 4,
      furnishing: 'Semi-Furnished',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400021',
      images: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80'
      ],
      latLng: '18.9256, 72.8242',
      checks: {
        titleClear: true,
        duplicateCheck: true,
        descriptionCheck: true,
        pricingCheck: true,
        imageCountCheck: true,
        contentCheck: true
      }
    },
    {
      id: 'PROP-004',
      title: 'Cozy 1BHK Apartment',
      address: 'Thane West, Mumbai',
      ownerAgent: 'Rajesh Kumar',
      type: 'Apartment',
      category: 'Residential',
      submittedDate: '07 Jun 2026',
      status: 'Under Review',
      price: '₹45,00,000',
      area: 650,
      bedrooms: 1,
      bathrooms: 1,
      furnishing: 'Fully Furnished',
      city: 'Thane',
      state: 'Maharashtra',
      pincode: '400601',
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&auto=format&fit=crop&q=80'
      ],
      latLng: '19.2183, 72.9781',
      checks: {
        titleClear: true,
        duplicateCheck: true,
        descriptionCheck: false,
        pricingCheck: false,
        imageCountCheck: true,
        contentCheck: true
      }
    },
    {
      id: 'PROP-005',
      title: 'Plot in Noida Extension',
      address: 'Sector 121, Noida',
      ownerAgent: 'Rajesh Kumar',
      type: 'Land',
      category: 'Plot',
      submittedDate: '07 Jun 2026',
      status: 'Approved',
      price: '₹3,50,00,000',
      area: 3000,
      bedrooms: 0,
      bathrooms: 0,
      furnishing: 'Unfurnished',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301',
      images: [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80'
      ],
      latLng: '28.5355, 77.3910',
      checks: {
        titleClear: true,
        duplicateCheck: true,
        descriptionCheck: true,
        pricingCheck: true,
        imageCountCheck: true,
        contentCheck: true
      }
    },
    {
      id: 'PROP-006',
      title: '4BHK Penthouse',
      address: 'Powai, Mumbai',
      ownerAgent: 'Rajesh Kumar',
      type: 'Apartment',
      category: 'Residential',
      submittedDate: '07 Jun 2026',
      status: 'Pending',
      price: '₹4,50,00,000',
      area: 4200,
      bedrooms: 4,
      bathrooms: 4,
      furnishing: 'Fully Furnished',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400076',
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80'
      ],
      latLng: '19.1176, 72.9060',
      checks: {
        titleClear: false,
        duplicateCheck: true,
        descriptionCheck: true,
        pricingCheck: false,
        imageCountCheck: true,
        contentCheck: true
      }
    },
    {
      id: 'PROP-007',
      title: 'Villa in Gurgaon',
      address: 'DLF Magnolias, Gurgaon',
      ownerAgent: 'Rajesh Kumar',
      type: 'House',
      category: 'Residential',
      submittedDate: '07 Jun 2026',
      status: 'Approved',
      price: '₹12,00,00,000',
      area: 6000,
      bedrooms: 5,
      bathrooms: 6,
      furnishing: 'Fully Furnished',
      city: 'Gurgaon',
      state: 'Haryana',
      pincode: '122009',
      images: [
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&auto=format&fit=crop&q=80'
      ],
      latLng: '28.4595, 77.0266',
      checks: {
        titleClear: true,
        duplicateCheck: true,
        descriptionCheck: true,
        pricingCheck: true,
        imageCountCheck: true,
        contentCheck: true
      }
    },
    {
      id: 'PROP-008',
      title: 'Luxury 3BHK Apartment',
      address: 'Uppal, Hyderabad',
      ownerAgent: 'Rajesh Kumar',
      type: 'Apartment',
      category: 'Residential',
      submittedDate: '07 Jun 2026',
      status: 'Under Review',
      price: '₹2,50,00,000',
      area: 3500,
      bedrooms: 4,
      bathrooms: 3,
      furnishing: 'Fully Furnished',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500039',
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=80'
      ],
      latLng: '18.5204, 73.8567',
      checks: {
        titleClear: true,
        duplicateCheck: true,
        descriptionCheck: true,
        pricingCheck: true,
        imageCountCheck: true,
        contentCheck: true
      }
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Period states
  const [pendingPeriod, setPendingPeriod] = useState('Last Month');
  const [approvedPeriod, setApprovedPeriod] = useState('Last Month');
  const [rejectedPeriod, setRejectedPeriod] = useState('Last Month');
  const [reviewPeriod, setReviewPeriod] = useState('Last Month');
  const [flaggedPeriod, setFlaggedPeriod] = useState('Last Month');

  // Update status
  const handleUpdateStatus = (id: string, newStatus: ApprovalRequest['status']) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: newStatus } : req));
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  // Toggle quality check checklist
  const handleToggleCheck = (key: keyof ApprovalRequest['checks']) => {
    if (!selectedRequest) return;
    const updatedChecks = {
      ...selectedRequest.checks,
      [key]: !selectedRequest.checks[key]
    };
    const updatedRequest = { ...selectedRequest, checks: updatedChecks };
    setSelectedRequest(updatedRequest);
    setRequests(prev => prev.map(req => req.id === selectedRequest.id ? updatedRequest : req));
  };

  // Filtering
  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          req.ownerAgent.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          req.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = propertyTypeFilter === 'All' || req.type === propertyTypeFilter;
    const matchesStatus = statusFilter === 'All' || req.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  // KPI counts
  const pendingCount = requests.filter(r => r.status === 'Pending').length;
  const approvedTodayCount = requests.filter(r => r.status === 'Approved').length;
  const rejectedCount = requests.filter(r => r.status === 'Rejected').length;
  const underReviewCount = requests.filter(r => r.status === 'Under Review').length;

  const formatCount = (num: number) => {
    return num < 10 ? `0${num}` : String(num);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Property Approval Management</h1>
        <p className="text-xs font-medium text-slate-500 mt-1">
          Verify property details, ownership, images, pricing, and compliance before publishing listings.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {[
          { label: 'Pending Properties', count: formatCount(pendingCount), color: 'text-amber-500', period: pendingPeriod, setPeriod: setPendingPeriod },
          { label: 'Approved Today', count: formatCount(approvedTodayCount), color: 'text-emerald-600', period: approvedPeriod, setPeriod: setApprovedPeriod },
          { label: 'Rejected Properties', count: formatCount(rejectedCount), color: 'text-red-500', period: rejectedPeriod, setPeriod: setRejectedPeriod },
          { label: 'Under Review', count: formatCount(underReviewCount), color: 'text-[#035096]', period: reviewPeriod, setPeriod: setReviewPeriod },
          { label: 'Flagged Listings', count: '00', color: 'text-rose-500', period: flaggedPeriod, setPeriod: setFlaggedPeriod }
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

      {/* Filter bar */}
      <div className="bg-white border border-[#dddddd] rounded-[16px] p-4 flex flex-col md:flex-row gap-4 justify-between items-center shadow-none">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 my-auto inset-y-0 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by property ID, Name, Owner, or Location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200 rounded-[8px] text-xs outline-none transition placeholder:text-slate-400 focus:border-[#035096]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {/* Properties Type filter */}
          <CustomFilterDropdown
            value={propertyTypeFilter}
            onChange={setPropertyTypeFilter}
            placeholder="All Properties"
            options={[
              { label: 'All Properties', value: 'All' },
              { label: 'Apartment', value: 'Apartment' },
              { label: 'House', value: 'House' },
              { label: 'Commercial', value: 'Commercial' },
              { label: 'Land', value: 'Land' }
            ]}
          />

          {/* Status filter */}
          <CustomFilterDropdown
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Status"
            options={[
              { label: 'Status', value: 'All' },
              { label: 'Approved', value: 'Approved' },
              { label: 'Pending', value: 'Pending' },
              { label: 'Under Review', value: 'Under Review' },
              { label: 'Rejected', value: 'Rejected' }
            ]}
          />

          {/* Export button */}
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
                <th className="p-4 pl-6">Property ID</th>
                <th className="p-4">Property</th>
                <th className="p-4">Owner/Agent</th>
                <th className="p-4">Type</th>
                <th className="p-4">Submitted</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dddddd] text-slate-700 font-medium">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((req, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                    <td className="p-4 pl-6 font-semibold text-slate-900">{req.id}</td>
                    <td className="p-4 font-semibold">
                      <div className="flex flex-col">
                        <span className="text-slate-900 font-semibold">{req.title}</span>
                        <span className="text-[10px] text-slate-400 mt-0.5 font-medium">{req.address}</span>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-slate-900">{req.ownerAgent}</td>
                    <td className="p-4 font-semibold">
                      <span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-semibold ${
                        req.type === 'Apartment' ? 'bg-blue-50 text-blue-750' :
                        req.type === 'House' ? 'bg-emerald-50 text-emerald-700' :
                        req.type === 'Commercial' ? 'bg-orange-50 text-orange-700' :
                        'bg-yellow-50 text-yellow-800'
                      }`}>
                        {req.type}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500 font-medium">{req.submittedDate}</td>
                    <td className="p-4 font-semibold">
                      <span className={`px-2.5 py-0.5 rounded-[4px] text-[10px] font-semibold ${
                        req.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' :
                        req.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                        req.status === 'Under Review' ? 'bg-blue-50 text-[#035096]' :
                        'bg-red-50 text-red-600'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-center">
                      <button
                        onClick={() => {
                          setSelectedRequest(req);
                          setActiveImageIndex(0);
                        }}
                        className="w-8 h-8 rounded-[6px] hover:bg-slate-100 flex items-center justify-center text-[#035096] transition cursor-pointer mx-auto"
                        title="Review and Approve Property"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No properties match approval review query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 pl-6 bg-slate-50/20 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500 font-semibold">
          <span>Showing {filteredRequests.length} of {requests.length} properties</span>
        </div>
      </div>

      {/* Review & Verification details modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-[1000] p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-[520px] rounded-[16px] overflow-hidden border border-[#dddddd] shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">Property Information</span>
              <button
                onClick={() => setSelectedRequest(null)}
                className="w-8 h-8 rounded-[8px] hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-650 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto [scrollbar-width:thin]">
              
              {/* Information text fields grid */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs text-slate-700">
                <div>
                  <div className="text-slate-455 font-semibold mb-1">Property ID</div>
                  <div className="text-slate-900 font-semibold">{selectedRequest.id}</div>
                </div>
                <div>
                  <div className="text-slate-455 font-semibold mb-1">Property Title</div>
                  <div className="text-slate-900 font-semibold">{selectedRequest.title}</div>
                </div>
                <div>
                  <div className="text-slate-455 font-semibold mb-1">Type</div>
                  <div className="text-slate-900 font-semibold">{selectedRequest.category}</div>
                </div>
                <div>
                  <div className="text-slate-455 font-semibold mb-1">Category</div>
                  <div className="text-slate-900 font-semibold">{selectedRequest.type}</div>
                </div>
                <div>
                  <div className="text-slate-455 font-semibold mb-1">Price</div>
                  <div className="text-slate-900 font-semibold">{selectedRequest.price}</div>
                </div>
                <div>
                  <div className="text-slate-455 font-semibold mb-1">Area (Sq Ft)</div>
                  <div className="text-slate-900 font-semibold">{selectedRequest.area}</div>
                </div>
                <div>
                  <div className="text-slate-455 font-semibold mb-1">Bedrooms</div>
                  <div className="text-slate-900 font-semibold">{selectedRequest.bedrooms || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-slate-455 font-semibold mb-1">Bathrooms</div>
                  <div className="text-slate-900 font-semibold">{selectedRequest.bathrooms || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-slate-455 font-semibold mb-1">Furnishing</div>
                  <div className="text-slate-900 font-semibold">{selectedRequest.furnishing}</div>
                </div>
                <div>
                  <div className="text-slate-455 font-semibold mb-1">Address</div>
                  <div className="text-slate-900 font-semibold">{selectedRequest.address}</div>
                </div>
                <div>
                  <div className="text-slate-455 font-semibold mb-1">City</div>
                  <div className="text-slate-900 font-semibold">{selectedRequest.city}</div>
                </div>
                <div>
                  <div className="text-slate-455 font-semibold mb-1">State</div>
                  <div className="text-slate-900 font-semibold">{selectedRequest.state}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-slate-455 font-semibold mb-1">Pincode</div>
                  <div className="text-slate-900 font-semibold">{selectedRequest.pincode}</div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Property Image Previews */}
              <div className="space-y-3">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Property Images</span>
                <div className="space-y-2">
                  {/* Big Image preview */}
                  <div className="w-full h-48 rounded-[12px] overflow-hidden bg-slate-100 border border-slate-200">
                    <img
                      src={selectedRequest.images[activeImageIndex] || selectedRequest.images[0]}
                      alt="Property Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Thumbnails row */}
                  <div className="flex gap-2">
                    {selectedRequest.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-16 h-12 rounded-[6px] overflow-hidden border transition shrink-0 ${
                          activeImageIndex === idx ? 'border-[#035096]' : 'border-slate-200'
                        }`}
                      >
                        <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Location Lat Lng text info */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Property Location</span>
                <div className="flex items-center gap-2 text-xs text-slate-650">
                  <MapPin className="w-4 h-4 text-[#035096]" />
                  <span>{selectedRequest.latLng}</span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">Interactive map would be displayed here (latitude/longitude and nearby landmarks)</span>
              </div>

              <hr className="border-slate-100" />

              {/* Ownership Verification documents checklist */}
              <div className="space-y-3">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Ownership Verification</span>
                
                <div className="space-y-2">
                  {['Property Ownership Proof', 'Sale Deed', 'Tax Receipt', 'Utility Bill'].map((docName, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border border-slate-100 rounded-[8px] bg-slate-50/20 text-xs">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-slate-800 font-semibold">{docName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => alert(`Reviewing ${docName}`)} className="w-7 h-7 hover:bg-slate-100 rounded flex items-center justify-center text-slate-500">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => alert(`Downloading ${docName}`)} className="w-7 h-7 hover:bg-slate-100 rounded flex items-center justify-center text-slate-500">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quality Checklist */}
              <div className="space-y-3">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Quality Check</span>
                
                <div className="space-y-3 p-4 bg-slate-50/50 border border-slate-100 rounded-[8px] text-xs font-normal">
                  <div className="space-y-2">
                    <span className="text-[10px] font-semibold text-slate-400 block uppercase">Listing Quality</span>
                    <div className="grid grid-cols-2 gap-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedRequest.checks.titleClear}
                          onChange={() => handleToggleCheck('titleClear')}
                          className="w-4 h-4 rounded border-slate-200 text-[#035096] focus:ring-[#035096] accent-[#035096]"
                        />
                        <span className="text-[11px] text-slate-700 font-medium">Property title is clear</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedRequest.checks.descriptionCheck}
                          onChange={() => handleToggleCheck('descriptionCheck')}
                          className="w-4 h-4 rounded border-slate-200 text-[#035096] focus:ring-[#035096] accent-[#035096]"
                        />
                        <span className="text-[11px] text-slate-700 font-medium">description quality check</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedRequest.checks.duplicateCheck}
                          onChange={() => handleToggleCheck('duplicateCheck')}
                          className="w-4 h-4 rounded border-slate-200 text-[#035096] focus:ring-[#035096] accent-[#035096]"
                        />
                        <span className="text-[11px] text-slate-700 font-medium">Duplicate listing check</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedRequest.checks.pricingCheck}
                          onChange={() => handleToggleCheck('pricingCheck')}
                          className="w-4 h-4 rounded border-slate-200 text-[#035096] focus:ring-[#035096] accent-[#035096]"
                        />
                        <span className="text-[11px] text-slate-700 font-medium">Accurate pricing</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2 mt-2">
                    <span className="text-[10px] font-semibold text-slate-400 block uppercase">Media Quality</span>
                    <div className="grid grid-cols-2 gap-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedRequest.checks.imageCountCheck}
                          onChange={() => handleToggleCheck('imageCountCheck')}
                          className="w-4 h-4 rounded border-slate-200 text-[#035096] focus:ring-[#035096] accent-[#035096]"
                        />
                        <span className="text-[11px] text-slate-700 font-medium">Minimum image count</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedRequest.checks.contentCheck}
                          onChange={() => handleToggleCheck('contentCheck')}
                          className="w-4 h-4 rounded border-slate-200 text-[#035096] focus:ring-[#035096] accent-[#035096]"
                        />
                        <span className="text-[11px] text-slate-700 font-medium">Appropriate content</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-2.5">
              <button
                onClick={() => handleUpdateStatus(selectedRequest.id, 'Approved')}
                disabled={selectedRequest.status === 'Approved'}
                className="w-full h-9 bg-emerald-100 hover:bg-emerald-150 text-emerald-800 text-xs font-semibold rounded-[6px] flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Approve Property</span>
              </button>
              <button
                onClick={() => handleUpdateStatus(selectedRequest.id, 'Under Review')}
                disabled={selectedRequest.status === 'Under Review'}
                className="w-full h-9 bg-blue-100 hover:bg-blue-150 text-blue-800 text-xs font-semibold rounded-[6px] flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Request Modification</span>
              </button>
              <button
                onClick={() => handleUpdateStatus(selectedRequest.id, 'Rejected')}
                disabled={selectedRequest.status === 'Rejected'}
                className="w-full h-9 bg-red-100 hover:bg-red-150 text-red-800 text-xs font-semibold rounded-[6px] flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Ban className="w-3.5 h-3.5" />
                <span>Reject Property</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

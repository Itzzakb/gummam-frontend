import React, { useState, useEffect, useRef } from 'react';
import { Eye, Search, Download, X, Check, AlertCircle, Ban } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface VerificationRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  type: 'Agent' | 'Owner';
  location: string;
  submittedDate: string;
  documentsCount: number;
  status: 'Approved' | 'Pending' | 'Under Review' | 'Rejected';
  experience: number;
  documents: Array<{
    name: string;
    submittedDate: string;
  }>;
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

export const AgentVerificationManagement: React.FC = () => {
  // Mock data
  const [requests, setRequests] = useState<VerificationRequest[]>([
    {
      id: 'V001',
      name: 'Rajesh Kumar',
      email: 'Rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      address: '123 Business Park, Hyderabad',
      city: 'Hyderabad',
      state: 'Telangana',
      type: 'Agent',
      location: 'Hyderabad',
      submittedDate: '05-06-2026',
      documentsCount: 4,
      status: 'Approved',
      experience: 3,
      documents: [
        { name: 'Government ID', submittedDate: '05-06-2026' },
        { name: 'PAN Card', submittedDate: '05-06-2026' },
        { name: 'RERA Certificate', submittedDate: '05-06-2026' },
        { name: 'Agency License', submittedDate: '05-06-2026' },
        { name: 'Profile Photo', submittedDate: '05-06-2026' }
      ]
    },
    {
      id: 'V002',
      name: 'Rajesh Kumar',
      email: 'Rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      address: '456 Sea Link, Mumbai',
      city: 'Mumbai',
      state: 'Maharashtra',
      type: 'Agent',
      location: 'Mumbai',
      submittedDate: '04-06-2026',
      documentsCount: 4,
      status: 'Pending',
      experience: 5,
      documents: [
        { name: 'Government ID', submittedDate: '04-06-2026' },
        { name: 'PAN Card', submittedDate: '04-06-2026' },
        { name: 'RERA Certificate', submittedDate: '04-06-2026' },
        { name: 'Profile Photo', submittedDate: '04-06-2026' }
      ]
    },
    {
      id: 'V003',
      name: 'Rajesh Kumar',
      email: 'Rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      address: '789 Deccan Hills, Pune',
      city: 'Pune',
      state: 'Maharashtra',
      type: 'Owner',
      location: 'Pune',
      submittedDate: '04-06-2026',
      documentsCount: 4,
      status: 'Approved',
      experience: 1,
      documents: [
        { name: 'Government ID', submittedDate: '04-06-2026' },
        { name: 'PAN Card', submittedDate: '04-06-2026' },
        { name: 'Property Tax Receipt', submittedDate: '04-06-2026' },
        { name: 'Profile Photo', submittedDate: '04-06-2026' }
      ]
    },
    {
      id: 'V004',
      name: 'Rajesh Kumar',
      email: 'Rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      address: '101 Connaught Place, Delhi',
      city: 'Delhi',
      state: 'Delhi',
      type: 'Owner',
      location: 'Delhi',
      submittedDate: '04-06-2026',
      documentsCount: 4,
      status: 'Under Review',
      experience: 2,
      documents: [
        { name: 'Government ID', submittedDate: '04-06-2026' },
        { name: 'PAN Card', submittedDate: '04-06-2026' },
        { name: 'Property Deeds', submittedDate: '04-06-2026' },
        { name: 'Profile Photo', submittedDate: '04-06-2026' }
      ]
    },
    {
      id: 'V005',
      name: 'Rajesh Kumar',
      email: 'Rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      address: '202 Indiranagar, Bangalore',
      city: 'Bangalore',
      state: 'Karnataka',
      type: 'Agent',
      location: 'Bangalore',
      submittedDate: '04-06-2026',
      documentsCount: 4,
      status: 'Approved',
      experience: 4,
      documents: [
        { name: 'Government ID', submittedDate: '04-06-2026' },
        { name: 'PAN Card', submittedDate: '04-06-2026' },
        { name: 'RERA Certificate', submittedDate: '04-06-2026' },
        { name: 'Agency License', submittedDate: '04-06-2026' }
      ]
    },
    {
      id: 'V006',
      name: 'Rajesh Kumar',
      email: 'Rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      address: '303 Banjara Hills, Hyderabad',
      city: 'Hyderabad',
      state: 'Telangana',
      type: 'Agent',
      location: 'Hyderabad',
      submittedDate: '04-06-2026',
      documentsCount: 4,
      status: 'Pending',
      experience: 3,
      documents: [
        { name: 'Government ID', submittedDate: '04-06-2026' },
        { name: 'PAN Card', submittedDate: '04-06-2026' },
        { name: 'RERA Certificate', submittedDate: '04-06-2026' },
        { name: 'Profile Photo', submittedDate: '04-06-2026' }
      ]
    },
    {
      id: 'V007',
      name: 'Rajesh Kumar',
      email: 'Rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      address: '404 Gachibowli, Hyderabad',
      city: 'Hyderabad',
      state: 'Telangana',
      type: 'Owner',
      location: 'Hyderabad',
      submittedDate: '04-06-2026',
      documentsCount: 4,
      status: 'Approved',
      experience: 1,
      documents: [
        { name: 'Government ID', submittedDate: '04-06-2026' },
        { name: 'PAN Card', submittedDate: '04-06-2026' },
        { name: 'Property Tax Receipt', submittedDate: '04-06-2026' },
        { name: 'Profile Photo', submittedDate: '04-06-2026' }
      ]
    },
    {
      id: 'V008',
      name: 'Rajesh Kumar',
      email: 'Rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      address: '505 Jubilee Hills, Hyderabad',
      city: 'Hyderabad',
      state: 'Telangana',
      type: 'Owner',
      location: 'Hyderabad',
      submittedDate: '04-06-2026',
      documentsCount: 4,
      status: 'Under Review',
      experience: 2,
      documents: [
        { name: 'Government ID', submittedDate: '04-06-2026' },
        { name: 'PAN Card', submittedDate: '04-06-2026' },
        { name: 'Property Deeds', submittedDate: '04-06-2026' },
        { name: 'Profile Photo', submittedDate: '04-06-2026' }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('All');
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);

  // Period States
  const [pendingPeriod, setPendingPeriod] = useState('Last Month');
  const [approvedPeriod, setApprovedPeriod] = useState('Last Month');
  const [rejectedPeriod, setRejectedPeriod] = useState('Last Month');
  const [agentsPeriod, setAgentsPeriod] = useState('Last Month');
  const [ownersPeriod, setOwnersPeriod] = useState('Last Month');

  // Update status handlers
  const handleUpdateStatus = (id: string, newStatus: VerificationRequest['status']) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: newStatus } : req));
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          req.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = userTypeFilter === 'All' || req.type === userTypeFilter;
    return matchesSearch && matchesType;
  });

  // KPI calculations
  const pendingRequestsCount = requests.filter(r => r.status === 'Pending').length;
  const approvedTodayCount = requests.filter(r => r.status === 'Approved').length;
  const rejectedRequestsCount = requests.filter(r => r.status === 'Rejected').length;

  const formatCount = (num: number) => {
    return num < 10 ? `0${num}` : String(num);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">New Agent / Owner Verification & Approval</h1>
        <p className="text-xs font-medium text-slate-500 mt-1">
          Allow admin to review, verify, approve, reject, or request additional information
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {[
          { label: 'Pending Requests', count: formatCount(pendingRequestsCount), color: 'text-amber-500', period: pendingPeriod, setPeriod: setPendingPeriod },
          { label: 'Approved Today', count: formatCount(approvedTodayCount), color: 'text-emerald-600', period: approvedPeriod, setPeriod: setApprovedPeriod },
          { label: 'Rejected Requests', count: formatCount(rejectedRequestsCount), color: 'text-red-500', period: rejectedPeriod, setPeriod: setRejectedPeriod },
          { label: 'Active Agents', count: '125', color: 'text-[#035096]', period: agentsPeriod, setPeriod: setAgentsPeriod },
          { label: 'Active Owners', count: '99', color: 'text-purple-655', period: ownersPeriod, setPeriod: setOwnersPeriod }
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

      {/* Filters bar */}
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
          {/* User Type Filter */}
          <CustomFilterDropdown
            value={userTypeFilter}
            onChange={setUserTypeFilter}
            placeholder="All Users"
            options={[
              { label: 'All Users', value: 'All' },
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
                <th className="p-4 pl-6">Name</th>
                <th className="p-4">Type</th>
                <th className="p-4">Location</th>
                <th className="p-4">Submitted</th>
                <th className="p-4">Documents</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dddddd] text-slate-700 font-medium">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((req, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                    <td className="p-4 pl-6 font-semibold text-slate-900">{req.name}</td>
                    <td className="p-4 font-semibold text-[#035096]">{req.type}</td>
                    <td className="p-4 text-slate-500 font-medium">{req.location}</td>
                    <td className="p-4 text-slate-500 font-medium">{formatDate(req.submittedDate)}</td>
                    <td className="p-4 text-slate-550 font-semibold">{req.documentsCount} Docs</td>
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
                        onClick={() => setSelectedRequest(req)}
                        className="w-8 h-8 rounded-[6px] hover:bg-slate-100 flex items-center justify-center text-[#035096] transition cursor-pointer mx-auto"
                        title="Review Verification Request"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No matching requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 pl-6 bg-slate-50/20 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500 font-semibold">
          <span>Showing {filteredRequests.length} of {requests.length} agents/owners</span>
        </div>
      </div>

      {/* Verification Documents Review Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-[1000] p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-[500px] rounded-[16px] overflow-hidden border border-[#dddddd] shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">Personal Information</span>
              <button
                onClick={() => setSelectedRequest(null)}
                className="w-8 h-8 rounded-[8px] hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-650 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto [scrollbar-width:thin]">
              
              {/* Personal Information Fields */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs text-slate-700">
                <div>
                  <div className="text-slate-455 font-semibold mb-1">Full Name</div>
                  <div className="text-slate-900 font-semibold">{selectedRequest.name}</div>
                </div>
                <div>
                  <div className="text-slate-455 font-semibold mb-1">Email</div>
                  <div className="text-slate-900 font-semibold break-all">{selectedRequest.email}</div>
                </div>
                <div>
                  <div className="text-slate-455 font-semibold mb-1">Mobile Number</div>
                  <div className="text-slate-900 font-semibold">{selectedRequest.phone}</div>
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
                <div>
                  <div className="text-slate-455 font-semibold mb-1">Account Type</div>
                  <div className="text-slate-900 font-semibold">{selectedRequest.type}</div>
                </div>
                <div>
                  <div className="text-slate-455 font-semibold mb-1">Experience</div>
                  <div className="text-slate-900 font-semibold">{selectedRequest.experience} Years</div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Verification Documents Checklist/View */}
              <div className="space-y-3">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Verification Documents</span>
                
                <div className="space-y-2">
                  {selectedRequest.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border border-slate-100 rounded-[8px] bg-slate-50/20 text-xs">
                      <div>
                        <span className="text-slate-800 block font-semibold">{doc.name}</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">{formatDate(doc.submittedDate)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => alert(`Opening preview for ${doc.name}`)}
                          className="w-7 h-7 rounded hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-[#035096] transition cursor-pointer"
                          title="Preview Document"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => alert(`Downloading ${doc.name}`)}
                          className="w-7 h-7 rounded hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-700 transition cursor-pointer"
                          title="Download Document"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
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
                <span>Approve User</span>
              </button>
              <button
                onClick={() => handleUpdateStatus(selectedRequest.id, 'Under Review')}
                disabled={selectedRequest.status === 'Under Review'}
                className="w-full h-9 bg-blue-100 hover:bg-blue-150 text-blue-800 text-xs font-semibold rounded-[6px] flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Request More Information</span>
              </button>
              <button
                onClick={() => handleUpdateStatus(selectedRequest.id, 'Rejected')}
                disabled={selectedRequest.status === 'Rejected'}
                className="w-full h-9 bg-red-100 hover:bg-red-150 text-red-800 text-xs font-semibold rounded-[6px] flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Ban className="w-3.5 h-3.5" />
                <span>Reject User</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Search, SlidersHorizontal, Share2, Phone, FileText, ChevronDown } from 'lucide-react';
interface DualRangeSliderProps {
  min: number;
  max: number;
  minLimit: number;
  maxLimit: number;
  step: number;
  onChange: (min: number, max: number) => void;
  accentColor?: string;
}

const DualRangeSlider: React.FC<DualRangeSliderProps> = ({
  min,
  max,
  minLimit,
  maxLimit,
  step,
  onChange,
  accentColor = '#004B8F'
}) => {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), max - step);
    onChange(value, max);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), min + step);
    onChange(min, value);
  };

  const minPercent = ((min - minLimit) / (maxLimit - minLimit)) * 100;
  const maxPercent = ((max - minLimit) / (maxLimit - minLimit)) * 100;

  return (
    <div className="relative w-full h-6 flex items-center">
      {/* Track Background */}
      <div className="absolute left-0 right-0 h-1 bg-gray-200 rounded-lg"></div>
      
      {/* Selected range highlighted track */}
      <div 
        className="absolute h-1 rounded-lg"
        style={{
          left: `${minPercent}%`,
          right: `${100 - maxPercent}%`,
          backgroundColor: accentColor
        }}
      ></div>

      {/* Dual inputs overlay */}
      <input
        type="range"
        min={minLimit}
        max={maxLimit}
        step={step}
        value={min}
        onChange={handleMinChange}
        className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none outline-none z-20"
      />
      <input
        type="range"
        min={minLimit}
        max={maxLimit}
        step={step}
        value={max}
        onChange={handleMaxChange}
        className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none outline-none z-20"
      />
      
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          pointer-events: auto;
          -webkit-appearance: none;
          appearance: none;
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: #004B8F;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        input[type="range"]::-moz-range-thumb {
          pointer-events: auto;
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: #004B8F;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
};

interface ReasonSubmenuProps {
  reasons: string[];
  onSelectReason: (reason: string) => void;
  anchorRect: DOMRect;
}

const ReasonSubmenu: React.FC<ReasonSubmenuProps> = ({ reasons, onSelectReason, anchorRect }) => {
  const menuWidth = 224;
  const gap = 8;
  const spaceOnRight = window.innerWidth - anchorRect.right;
  const placeRight = spaceOnRight >= menuWidth + gap;
  const left = placeRight
    ? anchorRect.right + gap
    : Math.max(8, anchorRect.left - menuWidth - gap);
  const top = Math.min(
    Math.max(8, anchorRect.top),
    window.innerHeight - 280
  );

  return createPortal(
    <div
      className="fixed w-56 bg-white border border-[#E2E8F0] rounded-[6px] shadow-xl z-[9999] py-1.5 flex flex-col max-h-64 overflow-y-auto"
      style={{ left, top }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {reasons.map((reason) => (
        <button
          key={reason}
          type="button"
          onClick={() => onSelectReason(reason)}
          className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-slate-50 border-b border-gray-100 last:border-0 font-medium"
        >
          {reason}
        </button>
      ))}
    </div>,
    document.body
  );
};

const LEAD_STATUSES = [
  { label: 'New Lead', color: 'text-blue-500', hasSubmenu: false },
  { label: 'Contacted', color: 'text-blue-500', hasSubmenu: false },
  { label: 'Send Brochure', color: 'text-indigo-600', hasSubmenu: false },
  { label: 'Follow-up', color: 'text-[#004B8F]', hasSubmenu: 'follow-up' as const },
  { label: 'Send Location Map', color: 'text-indigo-600', hasSubmenu: false },
  { label: 'Site Visit Scheduled', color: 'text-indigo-800', hasSubmenu: false },
  { label: 'Site Visit Completed', color: 'text-teal-600', hasSubmenu: false },
  { label: 'Negotiation', color: 'text-slate-900 font-semibold', hasSubmenu: false },
  { label: 'Token Received', color: 'text-green-600', hasSubmenu: false },
  { label: 'Booking Confirmed', color: 'text-green-600', hasSubmenu: false },
  { label: 'Registered', color: 'text-green-700', hasSubmenu: false },
  { label: 'Lost', color: 'text-red-500 font-medium', hasSubmenu: 'lost' as const },
  { label: 'Junk Lead', color: 'text-red-400', hasSubmenu: false },
  { label: 'Add extra point', color: 'text-[#035096] font-medium', hasSubmenu: 'extra' as const },
];

const FOLLOW_UP_REASONS = [
  'Ring No Response (RNR)',
  'Busy',
  'Requested Callback',
  'Family Discussion',
  'Loan Processing',
  'Budget Arrangement',
  'Site Visit Planning',
  'Price Discussion',
  'Documents Review',
  'Interested',
  'Comparing Projects',
  'Not Available',
];

const LOST_REASONS = [
  'Budget Mismatch',
  'Location Mismatch',
  'Purchased Elsewhere',
  'Loan Rejected',
  'No Requirement',
  'Price Negotiation Failed',
  'Family Rejected',
  'Project Not Suitable',
  'Invalid Number',
  'Duplicate Lead',
];

interface NoteEditorModalProps {
  initialContent: string;
  onClose: () => void;
  onSave: (content: string) => void;
}

const NoteEditorModal: React.FC<NoteEditorModalProps> = ({ initialContent, onClose, onSave }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialContent || '';
    }
  }, [initialContent]);

  const execCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleSave = () => {
    if (editorRef.current) {
      onSave(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#004B8F]" />
            <span>Format Note & Add Details</span>
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-lg"
          >
            ✕
          </button>
        </div>

        {/* Text Formatting Toolbar */}
        <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap gap-1 items-center">
          <button onClick={() => execCommand('bold')} className="p-2 hover:bg-slate-200 rounded font-bold text-xs" title="Bold">B</button>
          <button onClick={() => execCommand('italic')} className="p-2 hover:bg-slate-200 rounded italic text-xs" title="Italic">I</button>
          <button onClick={() => execCommand('underline')} className="p-2 hover:bg-slate-200 rounded underline text-xs" title="Underline">U</button>
          <button onClick={() => execCommand('strikeThrough')} className="p-2 hover:bg-slate-200 rounded line-through text-xs" title="Strikethrough">S</button>
          <div className="w-[1px] h-6 bg-slate-300 mx-1"></div>
          
          <button onClick={() => execCommand('formatBlock', 'h2')} className="p-2 hover:bg-slate-200 rounded text-xs font-bold" title="Heading 1">H1</button>
          <button onClick={() => execCommand('formatBlock', 'h3')} className="p-2 hover:bg-slate-200 rounded text-xs font-semibold" title="Heading 2">H2</button>
          <button onClick={() => execCommand('formatBlock', 'p')} className="p-2 hover:bg-slate-200 rounded text-xs font-medium" title="Paragraph">P</button>
          <div className="w-[1px] h-6 bg-slate-300 mx-1"></div>

          <button onClick={() => execCommand('insertUnorderedList')} className="p-2 hover:bg-slate-200 rounded text-xs" title="Bullet List">• List</button>
          <button onClick={() => execCommand('insertOrderedList')} className="p-2 hover:bg-slate-200 rounded text-xs" title="Numbered List">1. List</button>
          <button onClick={() => execCommand('formatBlock', 'blockquote')} className="p-2 hover:bg-slate-200 rounded text-xs italic" title="Quote">Quote</button>
          <div className="w-[1px] h-6 bg-slate-300 mx-1"></div>

          <select 
            onChange={(e) => execCommand('foreColor', e.target.value)} 
            className="p-1 text-xs bg-white border border-slate-200 rounded outline-none"
            title="Text Color"
          >
            <option value="#1f2937">Default</option>
            <option value="#ef4444">Red</option>
            <option value="#f97316">Orange</option>
            <option value="#10b981">Green</option>
            <option value="#3b82f6">Blue</option>
            <option value="#8b5cf6">Purple</option>
          </select>

          <button onClick={() => execCommand('removeFormat')} className="p-2 hover:bg-slate-200 rounded text-xs text-red-500" title="Clear Style">Clear</button>
          <div className="w-[1px] h-6 bg-slate-300 mx-1"></div>

          <button onClick={() => execCommand('undo')} className="p-2 hover:bg-slate-200 rounded text-xs" title="Undo">↶</button>
          <button onClick={() => execCommand('redo')} className="p-2 hover:bg-slate-200 rounded text-xs" title="Redo">↷</button>
        </div>

        {/* Editor body content */}
        <div className="p-6 flex-1 overflow-y-auto">
          <div
            ref={editorRef}
            contentEditable
            className="w-full min-h-[220px] focus:outline-none text-sm text-gray-800 prose prose-sm max-w-none"
            style={{ minHeight: '220px' }}
          />
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-[4px] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-[#004B8F] hover:bg-[#003d75] text-white text-xs font-semibold rounded-[4px] transition-colors"
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};

interface Lead {
  id: string;
  name: string;
  avatar: string;
  initials: string;
  timeAgo: string;
  isBoosted: boolean;
  status: string;
  assignedId: string;
  lookingFor: {
    bhk: string;
    type: string;
    project: string;
    location: string;
    purpose: 'Buy' | 'Rent';
    price: string;
    area: string;
  };
  notes?: string;
}

export const LeadManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<'New' | 'Today' | 'Last month' | 'Callback' | 'Scheduled'>('New');
  
  // Custom dropdown states for each lead status / lead assign select
  const [activeStatusDropdown, setActiveStatusDropdown] = useState<string | null>(null);
  const [activeAssignDropdown, setActiveAssignDropdown] = useState<string | null>(null);
  const [activeStatusSubmenu, setActiveStatusSubmenu] = useState<{
    leadId: string;
    type: 'Follow-up' | 'Lost';
    rect: DOMRect;
  } | null>(null);
  const [activeEditingNoteLeadId, setActiveEditingNoteLeadId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  // Filter dropdown toggle and values state
  const [showFilters, setShowFilters] = useState(false);
  const [filterSector, setFilterSector] = useState<'All' | 'Residential' | 'Commercial'>('All');
  const [filterLeadStatus, setFilterLeadStatus] = useState<'Open' | 'Closed' | 'Pending' | 'Followup / Callback' | 'Rejected'>('Open');
  const [filterFollowUpDate, setFilterFollowUpDate] = useState<'Today' | 'Tomorrow' | 'Past Dated' | 'Custom Date'>('Today');
  const [filterLocality, setFilterLocality] = useState('');
  const [filterProject, setFilterProject] = useState('');
  const [filterPropertyType, setFilterPropertyType] = useState<string>('Apartment');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [filterMinPrice, setFilterMinPrice] = useState<number>(500000);
  const [filterMaxPrice, setFilterMaxPrice] = useState<number>(10000000);

  // Mock Leads Data matching the screenshot layout
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 'L-001',
      name: 'Priya Verma',
      avatar: '',
      initials: 'PL',
      timeAgo: '20 hrs ago',
      isBoosted: true,
      status: 'New Lead',
      assignedId: 'ID - 001',
      lookingFor: {
        bhk: '2 BHK',
        type: 'Apartment',
        project: 'Gummaam Heights',
        location: 'Hayathnagar',
        purpose: 'Buy',
        price: '₹ 68.5 L',
        area: '1200 Sft.'
      }
    },
    {
      id: 'L-002',
      name: 'Priya Verma',
      avatar: '',
      initials: 'PL',
      timeAgo: '20 hrs ago',
      isBoosted: true,
      status: 'New Lead',
      assignedId: 'ID - 001',
      lookingFor: {
        bhk: '2 BHK',
        type: 'Apartment',
        project: 'Gummaam Heights',
        location: 'Hayathnagar',
        purpose: 'Buy',
        price: '₹ 68.5 L',
        area: '1200 Sft.'
      }
    },
    {
      id: 'L-003',
      name: 'Priya Verma',
      avatar: '',
      initials: 'PL',
      timeAgo: '20 hrs ago',
      isBoosted: true,
      status: 'New Lead',
      assignedId: 'ID - 001',
      lookingFor: {
        bhk: '2 BHK',
        type: 'Apartment',
        project: 'Gummaam Heights',
        location: 'Hayathnagar',
        purpose: 'Buy',
        price: '₹ 68.5 L',
        area: '1200 Sft.'
      }
    },
    {
      id: 'L-004',
      name: 'Priya Verma',
      avatar: '',
      initials: 'PL',
      timeAgo: '20 hrs ago',
      isBoosted: true,
      status: 'New Lead',
      assignedId: 'ID - 001',
      lookingFor: {
        bhk: '2 BHK',
        type: 'Apartment',
        project: 'Gummaam Heights',
        location: 'Hayathnagar',
        purpose: 'Buy',
        price: '₹ 68.5 L',
        area: '1200 Sft.'
      }
    }
  ]);

  const tabs = [
    { name: 'New', count: '08' },
    { name: 'Today', count: '20' },
    { name: 'Last month', count: '30' },
    { name: 'Callback', count: '07' },
    { name: 'Scheduled', count: '10' }
  ] as const;

  const handleStatusChange = (id: string, newStatus: Lead['status']) => {
    setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
    setActiveStatusDropdown(null);
    setActiveStatusSubmenu(null);
  };

  const handleAssignChange = (id: string, newAssignId: string) => {
    setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, assignedId: newAssignId } : lead));
    setActiveAssignDropdown(null);
  };

  const handleSaveNote = (id: string, text: string) => {
    setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, notes: text } : lead));
    setActiveEditingNoteLeadId(null);
    setNoteText('');
  };

  return (
    <div className="bg-white rounded-[5px] border border-gray-200/60 p-6 md:p-8 shadow-sm space-y-6 animate-fade-in font-poppins text-left">
      {/* Header and Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="text-left">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#0B2C5C] tracking-tight">Lead Management</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">Manage your buyer and renter leads</p>
        </div>
      </div>

      {/* Filter and Search Row */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, location, property ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-[#E2E8F0] rounded-[6px] text-sm focus:outline-none focus:border-[#004B8F] text-gray-700 placeholder-gray-400"
          />
        </div>
        <div className="relative">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#004B8F] hover:bg-[#003d75] text-white px-6 py-3 rounded-[6px] text-sm font-semibold transition-all shrink-0 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          {/* Filters Dropdown Overlay Panel */}
          {showFilters && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-[#E2E8F0] rounded-xl shadow-xl z-50 overflow-hidden flex flex-col font-poppins animate-fade-in">
              {/* Header */}
              <div className="px-5 py-4 border-b border-[#F1F5F9] flex items-center justify-between">
                <span className="font-semibold text-gray-900 text-sm">Filters</span>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="p-5 space-y-5 max-h-[360px] overflow-y-auto">
                {/* Sector Section */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-semibold text-gray-900">Sector</h4>
                  <div className="space-y-2">
                    {['All', 'Residential', 'Commercial'].map((sector) => (
                      <label key={sector} className="flex items-center gap-3 text-xs cursor-pointer select-none text-[#757575]" style={{ fontWeight: 400 }}>
                        <input
                          type="radio"
                          name="sector"
                          checked={filterSector === sector}
                          onChange={() => setFilterSector(sector as any)}
                          className="w-4 h-4 text-[#004B8F] border-[#E2E8F0] focus:ring-[#004B8F]"
                        />
                        <span>{sector}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Lead Status Section */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-semibold text-gray-900">Lead Status</h4>
                  <div className="space-y-2">
                    {['Open', 'Closed', 'Pending', 'Followup / Callback', 'Rejected'].map((status) => (
                      <label key={status} className="flex items-center gap-3 text-xs cursor-pointer select-none text-[#757575]" style={{ fontWeight: 400 }}>
                        <input
                          type="radio"
                          name="leadStatus"
                          checked={filterLeadStatus === status}
                          onChange={() => setFilterLeadStatus(status as any)}
                          className="w-4 h-4 text-[#004B8F] border-[#E2E8F0] focus:ring-[#004B8F]"
                        />
                        <span>{status}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Follow Up Date Section */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-semibold text-gray-900">Follow Up Date</h4>
                  <div className="space-y-2">
                    {['Today', 'Tomorrow', 'Past Dated', 'Custom Date'].map((dateOpt) => (
                      <label key={dateOpt} className="flex items-center gap-3 text-xs cursor-pointer select-none text-[#757575]" style={{ fontWeight: 400 }}>
                        <input
                          type="radio"
                          name="followUpDate"
                          checked={filterFollowUpDate === dateOpt}
                          onChange={() => setFilterFollowUpDate(dateOpt as any)}
                          className="w-4 h-4 text-[#004B8F] border-[#E2E8F0] focus:ring-[#004B8F]"
                        />
                        <span>{dateOpt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Locality */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">Locality</h4>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter locality here"
                      value={filterLocality}
                      onChange={(e) => setFilterLocality(e.target.value)}
                      className="w-full bg-white border border-[#E2E8F0] rounded-lg pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-[#004B8F]"
                    />
                  </div>
                </div>

                {/* Projects */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">Projects</h4>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter projects here"
                      value={filterProject}
                      onChange={(e) => setFilterProject(e.target.value)}
                      className="w-full bg-white border border-[#E2E8F0] rounded-lg pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-[#004B8F]"
                    />
                  </div>
                </div>

                {/* Property Type */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">Property Type</h4>
                  <div className="flex flex-col gap-2 max-h-36 overflow-y-auto border border-gray-150 rounded-lg p-2 bg-gray-50/30">
                    {[
                      'Apartment', 'Independent Floor', 'Independent House', 'Villa', 'Plot',
                      'Agricultural Land', 'Office Space', 'Shop', 'Showroom', 'Commercial Plot',
                      'Warehouse', 'Others'
                    ].map((type) => (
                      <label key={type} className="flex items-center gap-2 text-xs text-gray-655 cursor-pointer font-medium">
                        <input
                          type="radio"
                          name="propertytype"
                          checked={filterPropertyType === type}
                          onChange={() => setFilterPropertyType(type)}
                          className="w-4 h-4 text-[#004B8F] focus:ring-[#004B8F] border-gray-300"
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Date Range */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">Date Range</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-400 font-bold mb-1">Start Date</span>
                      <input
                        type="date"
                        value={filterStartDate}
                        onChange={(e) => setFilterStartDate(e.target.value)}
                        className="border border-[#E2E8F0] rounded-lg px-2 py-1 text-[10px] text-gray-700 bg-white"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-400 font-bold mb-1">End Date</span>
                      <input
                        type="date"
                        value={filterEndDate}
                        onChange={(e) => setFilterEndDate(e.target.value)}
                        className="border border-[#E2E8F0] rounded-lg px-2 py-1 text-[10px] text-gray-700 bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Price Range inputs and Slider */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">Price Range</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-[9px] font-bold">Min:</span>
                      <input
                        type="text"
                        value={filterMinPrice.toLocaleString('en-IN')}
                        onChange={(e) => {
                          const val = parseInt(e.target.value.replace(/,/g, '')) || 0;
                          setFilterMinPrice(val);
                        }}
                        className="w-full bg-white border border-[#E2E8F0] rounded-lg pl-8 pr-2 py-1 text-[10px] font-semibold text-gray-800"
                      />
                    </div>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-[9px] font-bold">Max:</span>
                      <input
                        type="text"
                        value={filterMaxPrice.toLocaleString('en-IN')}
                        onChange={(e) => {
                          const val = parseInt(e.target.value.replace(/,/g, '')) || 0;
                          setFilterMaxPrice(val);
                        }}
                        className="w-full bg-white border border-[#E2E8F0] rounded-lg pl-8 pr-2 py-1 text-[10px] font-semibold text-gray-800"
                      />
                    </div>
                  </div>

                  {/* Dual Slider */}
                  <div className="pt-2">
                    <DualRangeSlider
                      min={filterMinPrice}
                      max={filterMaxPrice}
                      minLimit={500000}
                      maxLimit={100000000}
                      step={500000}
                      onChange={(newMin, newMax) => {
                        setFilterMinPrice(newMin);
                        setFilterMaxPrice(newMax);
                      }}
                      accentColor="#004B8F"
                    />
                    <div className="flex justify-between text-[9px] text-gray-400 font-bold mt-1">
                      <span>₹ 5 Lakhs</span>
                      <span>₹ 10 Cr</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="px-5 py-4 bg-slate-50 border-t border-[#F1F5F9] flex items-center gap-3">
                <button
                  onClick={() => {
                    setFilterSector('All');
                    setFilterLeadStatus('Open');
                    setFilterFollowUpDate('Today');
                    setFilterLocality('');
                    setFilterProject('');
                    setFilterPropertyType('Apartment');
                    setFilterStartDate('');
                    setFilterEndDate('');
                    setFilterMinPrice(500000);
                    setFilterMaxPrice(10000000);
                  }}
                  className="flex-1 px-4 py-2.5 bg-white border border-[#E2E8F0] text-gray-800 text-xs font-semibold rounded-[8px] hover:bg-slate-50 transition-colors shadow-xs"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="flex-1 px-4 py-2.5 bg-[#004B8F] hover:bg-[#003d75] text-white text-xs font-semibold rounded-[8px] transition-colors shadow-xs"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Segment Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-100 scrollbar-none">
        <span className="text-sm font-semibold text-[#0B2C5C] mr-4 whitespace-nowrap">Lead summary</span>
        <div className="flex gap-2">
          {tabs.map((tab) => {
            const isActive = selectedTab === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => setSelectedTab(tab.name)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-[4px] text-xs whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#EBF3FE] text-[#004B8F]'
                    : 'bg-[#F1F5F9] text-gray-700 hover:bg-gray-200/70'
                }`}
                style={{ fontWeight: 400 }}
              >
                <span>{tab.name}</span>
                <span className="font-semibold">{tab.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Showing count indicator */}
      <div className="text-xs md:text-sm text-[#585858]" style={{ fontWeight: 400 }}>
        Showing {leads.length.toString().padStart(2, '0')} leads
      </div>

      {/* Leads Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="bg-[#F7FBFF] border border-[#E2E8F0] rounded-[10px] p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative"
          >
            {/* Top row: Share and Boost badge */}
            <div className="flex justify-between items-start w-full">
              <button className="p-1.5 hover:bg-gray-50 rounded-full transition-colors">
                <Share2 className="w-4 h-4 text-gray-500" />
              </button>
              {lead.isBoosted && (
                <span className="inline-flex items-center gap-1 bg-[#FFF9EB] border border-[#FFE3A8] text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded-[4px] shadow-sm select-none">
                  ⚡ Boost
                </span>
              )}
            </div>

            {/* Profile Initials and Details */}
            <div className="flex flex-col items-center text-center mt-2">
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm"
                style={{ background: 'linear-gradient(180deg, #0056B3 0%, #0088FF 100%)' }}
              >
                {lead.initials}
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mt-3">{lead.name}</h3>
              <p className="text-[11px] font-medium text-gray-500 mt-1">
                Contacted <span className="font-semibold text-gray-900">{lead.timeAgo}</span>
              </p>
            </div>

            {/* Status and Lead Assign drop downs */}
            <div className="space-y-2.5 mt-5">
              {/* Status Row */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 font-medium">Status :</span>
                <div className="relative">
                  <button
                    onClick={() => {
                      setActiveStatusDropdown(activeStatusDropdown === lead.id ? null : lead.id);
                      setActiveAssignDropdown(null);
                      setActiveStatusSubmenu(null);
                    }}
                    className="flex items-center gap-1.5 bg-[#EBF3FE] border border-[#BFDBFE] text-[#0066F6] font-medium px-3 py-1.5 rounded-[4px] cursor-pointer max-w-[180px]"
                  >
                    <span className="truncate">{lead.status}</span>
                    <ChevronDown className="w-3 h-3 text-[#0066F6] shrink-0" />
                  </button>
                  {activeStatusDropdown === lead.id && (
                    <div className="absolute right-0 mt-1.5 w-56 bg-white border border-[#E2E8F0] rounded-[6px] shadow-lg z-50 py-1.5 flex flex-col max-h-72 overflow-y-auto">
                      {LEAD_STATUSES.map((statusObj) => (
                        <div key={statusObj.label} className="relative">
                          <button
                            onClick={(e) => {
                              if (statusObj.hasSubmenu === 'follow-up' || statusObj.hasSubmenu === 'lost') {
                                const type = statusObj.label as 'Follow-up' | 'Lost';
                                const rect = e.currentTarget.getBoundingClientRect();
                                setActiveStatusSubmenu(
                                  activeStatusSubmenu?.leadId === lead.id &&
                                  activeStatusSubmenu?.type === type
                                    ? null
                                    : { leadId: lead.id, type, rect }
                                );
                              } else if (statusObj.hasSubmenu === 'extra') {
                                const customStatus = window.prompt('Enter custom status point:');
                                if (customStatus?.trim()) {
                                  handleStatusChange(lead.id, customStatus.trim());
                                }
                              } else {
                                handleStatusChange(lead.id, statusObj.label);
                              }
                            }}
                            className={`w-full text-left px-4 py-2 text-xs transition-colors hover:bg-slate-50 border-b border-gray-100 last:border-0 ${statusObj.color} flex items-center justify-between`}
                          >
                            <span>{statusObj.label}</span>
                            {(statusObj.hasSubmenu === 'follow-up' || statusObj.hasSubmenu === 'lost') && (
                              <svg className="w-3 h-3 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                              </svg>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeStatusSubmenu?.leadId === lead.id && activeStatusSubmenu.type === 'Follow-up' && (
                    <ReasonSubmenu
                      reasons={FOLLOW_UP_REASONS}
                      anchorRect={activeStatusSubmenu.rect}
                      onSelectReason={(reason) => {
                        handleStatusChange(lead.id, `Follow-up: ${reason}`);
                      }}
                    />
                  )}

                  {activeStatusSubmenu?.leadId === lead.id && activeStatusSubmenu.type === 'Lost' && (
                    <ReasonSubmenu
                      reasons={LOST_REASONS}
                      anchorRect={activeStatusSubmenu.rect}
                      onSelectReason={(reason) => {
                        handleStatusChange(lead.id, `Lost: ${reason}`);
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Lead Assign Row */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 font-medium">Lead Assign :</span>
                <div className="relative">
                  <button
                    onClick={() => {
                      setActiveAssignDropdown(activeAssignDropdown === lead.id ? null : lead.id);
                      setActiveStatusDropdown(null);
                      setActiveStatusSubmenu(null);
                    }}
                    className="flex items-center gap-1.5 bg-[#F5F3FF] border border-[#DDD6FE] text-[#6D28D9] font-medium px-3 py-1.5 rounded-[4px] cursor-pointer"
                  >
                    <span>{lead.assignedId}</span>
                    <ChevronDown className="w-3 h-3 text-[#6D28D9]" />
                  </button>
                  {activeAssignDropdown === lead.id && (
                    <div className="absolute right-0 mt-1.5 w-60 bg-white border border-[#E2E8F0] rounded-[6px] shadow-lg z-50 py-1.5 flex flex-col max-h-72 overflow-y-auto">
                      {[
                        'ID - 001', 'ID - 002', 'ID - 003',
                        'ID - 004', 'ID - 005', 'ID - 006',
                        'ID - 007', 'ID - 008', 'ID - 009'
                      ].map((idStr) => (
                        <button
                          key={idStr}
                          onClick={() => handleAssignChange(lead.id, idStr)}
                          className="w-full text-left px-4 py-2.5 text-xs text-slate-800 hover:bg-slate-50 border-b border-gray-100 last:border-0 flex items-center justify-between"
                        >
                          <span className="font-semibold text-gray-900">{idStr}</span>
                          <span className="font-medium text-gray-700">Ravi Kumar</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Requirement Details */}
            <div className="border-t border-[#F1F5F9] mt-4 pt-4 space-y-3">
              <span className="text-[10px] font-semibold text-gray-400 block tracking-wider uppercase">Looking for</span>
              
              {/* BHK & House type */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-50 text-[#0066F6] flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-gray-900">
                  {lead.lookingFor.bhk} {lead.lookingFor.type}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                <svg className="w-3.5 h-3.5 text-red-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>{lead.lookingFor.location}</span>
              </div>

              {/* Attributes badges (Purpose, Price, Area) */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="bg-[#F1F5F9] text-gray-800 text-[10px] font-semibold px-2.5 py-1 rounded-[4px]">
                  {lead.lookingFor.purpose}
                </span>
                <span className="bg-[#F1F5F9] text-gray-800 text-[10px] font-semibold px-2.5 py-1 rounded-[4px]">
                  {lead.lookingFor.price}
                </span>
                <span className="bg-[#F1F5F9] text-gray-800 text-[10px] font-semibold px-2.5 py-1 rounded-[4px]">
                  {lead.lookingFor.area}
                </span>
              </div>
            </div>

            {/* Notes preview if present */}
            {lead.notes && (
              <div className="mt-4 p-3 bg-amber-50/50 border border-amber-100 rounded-[6px] text-xs text-gray-700 italic relative group-hover:bg-amber-50 transition-colors">
                <span className="font-semibold text-amber-800 not-italic block text-[10px] uppercase tracking-wider mb-1">Saved Note:</span>
                <div dangerouslySetInnerHTML={{ __html: lead.notes }} className="line-clamp-3 prose prose-xs" />
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2 mt-5">
              <button 
                onClick={() => {
                  setActiveEditingNoteLeadId(lead.id);
                  setNoteText(lead.notes || '');
                }}
                className={`w-full flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-2.5 rounded-[4px] transition-all border cursor-pointer ${
                  lead.notes 
                    ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100/70' 
                    : 'bg-white border-[#E2E8F0] hover:bg-gray-50 text-gray-700'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-gray-500" />
                <span>{lead.notes ? 'Edit note' : 'Add note'}</span>
              </button>
              <button className="w-full flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2.5 rounded-[4px] transition-all">
                <Phone className="w-3.5 h-3.5" />
                <span>View Contact</span>
              </button>
              
              <button className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold py-2.5 rounded-[4px] transition-all">
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.99L2 22l5.23-1.372a9.907 9.907 0 0 0 4.781 1.226h.004c5.505 0 9.99-4.478 9.99-9.985a9.93 9.93 0 0 0-2.927-7.06A9.917 9.917 0 0 0 12.012 2zm5.72 14.158c-.313.88-1.534 1.576-2.128 1.69-.533.102-1.22.186-3.57-.79-2.925-1.218-4.805-4.186-4.95-4.382-.146-.195-1.185-1.574-1.185-3.003 0-1.43.75-2.13.99-2.4.24-.27.53-.338.7-.338.172 0 .346.002.497.01.155.008.364-.06.57.447.212.52.723 1.764.785 1.892.062.127.104.276.02.446-.082.17-.123.276-.245.42-.124.143-.26.32-.37.43-.125.127-.255.265-.11.513.146.248.65.1.07 1.07.69.615 1.28 1.018 1.956 1.34.677.32.96.223 1.153.002.193-.22.842-.98.988-1.316.146-.33.29-.276.495-.2.203.076 1.29.61 1.512.72.22.11.367.165.42.257.054.09.054.52-.16 1.4z" />
                </svg>
                <span>Chat on whatsapp</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Formatting Text Editor Modal */}
      {activeEditingNoteLeadId && (
        <NoteEditorModal
          initialContent={noteText}
          onClose={() => {
            setActiveEditingNoteLeadId(null);
            setNoteText('');
          }}
          onSave={(content) => handleSaveNote(activeEditingNoteLeadId, content)}
        />
      )}
    </div>
  );
};

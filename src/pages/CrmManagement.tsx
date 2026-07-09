import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Search,
  Download,
  Eye,
  X,
  Plus,
  ChevronDown,
  Check,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

// Interfaces for our Lead data
interface LeadTimelineItem {
  type: string;
  date: string;
  time: string;
  notes: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  property: string;
  propertyType: string;
  bedrooms: string;
  source: string;
  status: string;
  assigned: string;
  followUp: string;
  budget: string;
  note: string;
  timeline: {
    inquiry: LeadTimelineItem;
    lastFollowUp: LeadTimelineItem;
    nextFollowUp: LeadTimelineItem;
  };
}

// Period Dropdown Component to match User Management Stat Cards Dropdown
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
        left: rect.right + window.scrollX - 112, // width is 112px
        width: 112
      });
    }
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 bg-[#E2F5EC] hover:bg-[#d4f0e2] rounded-full px-2.5 py-1 text-[10px] font-semibold text-slate-800 transition-all focus:outline-none cursor-pointer"
      >
        <span>{value}</span>
        <ChevronDown
          className={`w-2.5 h-2.5 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-slate-800' : 'text-slate-600'
          }`}
        />
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
                option === value
                  ? 'bg-[#F0F4F9]/60 font-semibold text-[#035096]'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{option}</span>
              {option === value && (
                <Check className="w-3 h-3 text-[#035096] shrink-0" />
              )}
            </button>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
};

// Custom Filter Dropdown Component to match Table Filter Bar Dropdown
interface CustomFilterDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder: string;
  hasSearch?: boolean;
  searchText?: string;
  onSearchChange?: (val: string) => void;
}

const CustomFilterDropdown: React.FC<CustomFilterDropdownProps> = ({
  value,
  onChange,
  options,
  placeholder,
  hasSearch = false,
  searchText = '',
  onSearchChange
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
        width: Math.max(rect.width, 160)
      });
    }
  }, [isOpen]);

  const activeLabel = options.find(o => o.value === value)?.label || placeholder;

  return (
    <div className="relative w-full lg:w-auto lg:min-w-[130px] text-left" ref={dropdownRef}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-2 bg-white border rounded-[8px] px-3.5 py-2 text-xs font-semibold transition-all focus:outline-none cursor-pointer ${
          isOpen
            ? 'border-[#035096] text-[#035096] ring-1/2 ring-[#035096]/20'
            : 'border-slate-200 hover:border-slate-300 text-slate-700'
        }`}
      >
        <span className="truncate">{activeLabel}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#035096]' : 'text-slate-500'
          }`}
        />
      </button>

      {isOpen && createPortal(
        <div
          className="bg-white border border-slate-200 rounded-[8px] shadow-lg z-[9999] py-1 flex flex-col min-w-[160px]"
          style={{
            position: 'absolute',
            top: coords.top,
            left: coords.left,
            width: coords.width
          }}
        >
          {hasSearch && onSearchChange && (
            <div className="p-2 border-b border-slate-100 bg-white sticky top-0">
              <input
                type="text"
                placeholder="Search"
                value={searchText}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-[#035096] text-slate-700"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          <div className="max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                  if (onSearchChange) onSearchChange('');
                }}
                className={`w-full text-left px-3.5 py-2 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                  option.value === value
                    ? 'bg-[#F0F4F9]/60 font-semibold text-[#035096]'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{option.label}</span>
                {option.value === value && (
                  <Check className="w-3.5 h-3.5 text-[#035096] shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export const CrmManagement: React.FC = () => {
  // Stat periods
  const [periodTotalInquiries, setPeriodTotalInquiries] = useState('Last Month');
  const [periodNewLeads, setPeriodNewLeads] = useState('Last Month');
  const [periodClosedDeals, setPeriodClosedDeals] = useState('Last Month');
  const [periodContacted, setPeriodContacted] = useState('Last Month');
  const [periodConversion, setPeriodConversion] = useState('Last Month');

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedSource, setSelectedSource] = useState('All Source');
  const [selectedAssigned, setSelectedAssigned] = useState('All Leads');

  const [assignedSearchText, setAssignedSearchText] = useState('');
  const [viewAgentDropdownOpen, setViewAgentDropdownOpen] = useState(false);
  const viewAgentTriggerRef = useRef<HTMLButtonElement>(null);
  const [viewAgentCoords, setViewAgentCoords] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (viewAgentDropdownOpen && viewAgentTriggerRef.current) {
      const rect = viewAgentTriggerRef.current.getBoundingClientRect();
      setViewAgentCoords({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }, [viewAgentDropdownOpen]);

  const [scheduleAgentDropdownOpen, setScheduleAgentDropdownOpen] = useState(false);
  const scheduleAgentTriggerRef = useRef<HTMLButtonElement>(null);
  const [scheduleAgentCoords, setScheduleAgentCoords] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (scheduleAgentDropdownOpen && scheduleAgentTriggerRef.current) {
      const rect = scheduleAgentTriggerRef.current.getBoundingClientRect();
      setScheduleAgentCoords({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }, [scheduleAgentDropdownOpen]);

  const [scheduleReminderDropdownOpen, setScheduleReminderDropdownOpen] = useState(false);
  const scheduleReminderTriggerRef = useRef<HTMLButtonElement>(null);
  const [scheduleReminderCoords, setScheduleReminderCoords] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (scheduleReminderDropdownOpen && scheduleReminderTriggerRef.current) {
      const rect = scheduleReminderTriggerRef.current.getBoundingClientRect();
      setScheduleReminderCoords({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }, [scheduleReminderDropdownOpen]);

  // Modals state
  const [selectedLeadForView, setSelectedLeadForView] = useState<Lead | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleLead, setRescheduleLead] = useState<Lead | null>(null);

  // Form states for scheduling a new visit
  const [scheduleForm, setScheduleForm] = useState({
    propertyTitle: '',
    location: '',
    buyerName: '',
    email: '',
    phone: '',
    visitDate: '',
    visitTime: '',
    assignedAgent: 'Select Agent',
    reminder: '1 day before',
    notificationPlatform: 'Whatsapp', // Whatsapp or Email
    note: ''
  });

  // Form states for rescheduling a visit
  const [rescheduleForm, setRescheduleForm] = useState({
    newDate: '',
    newTime: '',
    reason: ''
  });

  // Mock initial leads data to match screen mock exactly
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 'L01',
      name: 'Amit Sharma',
      email: 'amit@email.com',
      phone: '+91 98765 43210',
      city: 'Hyderabad',
      property: '3BHK Apartment',
      propertyType: 'Apartment',
      bedrooms: '3',
      source: 'Website',
      status: 'New',
      assigned: 'Rajesh Kumar',
      followUp: '2026-5-27',
      budget: '₹15L',
      note: 'Interested in premium properties, first-time buyer',
      timeline: {
        inquiry: { type: 'Inquiry Date', date: '2026-05-16', time: '01:00PM', notes: 'Interested in premium properties, first-time buyer' },
        lastFollowUp: { type: 'Last Follow-up', date: '-', time: '-', notes: '-' },
        nextFollowUp: { type: 'Next Follow-up', date: '2026-05-27', time: '01:00PM', notes: 'Notes' }
      }
    },
    {
      id: 'L02',
      name: 'Priya Gupta',
      email: 'priya.g@email.com',
      phone: '+91 87654 32109',
      city: 'Hyderabad',
      property: '2BHK House',
      propertyType: 'House',
      bedrooms: '2',
      source: 'App',
      status: 'Contacted',
      assigned: 'Rajesh Kumar',
      followUp: '2026-5-27',
      budget: '₹2.3Cr.',
      note: 'Looking for a gated community near tech parks',
      timeline: {
        inquiry: { type: 'Inquiry Date', date: '2026-05-18', time: '11:00AM', notes: 'Inquired from app' },
        lastFollowUp: { type: 'Last Follow-up', date: '2026-05-20', time: '03:30PM', notes: 'Discussed project details' },
        nextFollowUp: { type: 'Next Follow-up', date: '2026-05-27', time: '10:00AM', notes: 'Site visit scheduling' }
      }
    },
    {
      id: 'L03',
      name: 'Vikram Patel',
      email: 'vikram.p@email.com',
      phone: '+91 76543 21098',
      city: 'Hyderabad',
      property: '4BHK Penthouse',
      propertyType: 'Penthouse',
      bedrooms: '4',
      source: 'Referral',
      status: 'Site Visit',
      assigned: 'Deepak Verma',
      followUp: '2026-5-27',
      budget: '₹40Cr.',
      note: 'Premium luxury penthouse seeker with high-end requirements',
      timeline: {
        inquiry: { type: 'Inquiry Date', date: '2026-05-12', time: '04:00PM', notes: 'Referred by premium builder client' },
        lastFollowUp: { type: 'Last Follow-up', date: '2026-05-15', time: '02:00PM', notes: 'Initial requirements discussion' },
        nextFollowUp: { type: 'Next Follow-up', date: '2026-05-27', time: '02:00PM', notes: 'Site visit scheduled' }
      }
    },
    {
      id: 'L04',
      name: 'Neha Dasgupta',
      email: 'neha.d@email.com',
      phone: '+91 65432 10987',
      city: 'Hyderabad',
      property: 'Commercial',
      propertyType: 'Commercial',
      bedrooms: 'N/A',
      source: 'Call',
      status: 'Negotiation',
      assigned: 'Priya Singh',
      followUp: '2026-5-27',
      budget: '₹27Cr.',
      note: 'Looking for a retail space in prime commercial zone',
      timeline: {
        inquiry: { type: 'Inquiry Date', date: '2026-05-10', time: '10:30AM', notes: 'Direct call inquiry' },
        lastFollowUp: { type: 'Last Follow-up', date: '2026-05-18', time: '05:00PM', notes: 'Shared price proposal sheet' },
        nextFollowUp: { type: 'Next Follow-up', date: '2026-05-27', time: '04:00PM', notes: 'Negotiation round 2' }
      }
    },
    {
      id: 'L05',
      name: 'Suresh Iyer',
      email: 'suresh.i@email.com',
      phone: '+91 54321 09876',
      city: 'Hyderabad',
      property: '1BHK Apartment',
      propertyType: 'Apartment',
      bedrooms: '1',
      source: 'Website',
      status: 'Follow-up',
      assigned: 'Rajesh Kumar',
      followUp: '2026-5-27',
      budget: '₹61L',
      note: 'Young professional seeking close proximity to metro station',
      timeline: {
        inquiry: { type: 'Inquiry Date', date: '2026-05-20', time: '09:00AM', notes: 'Website inquiry' },
        lastFollowUp: { type: 'Last Follow-up', date: '2026-05-22', time: '12:00PM', notes: 'Information brochure shared' },
        nextFollowUp: { type: 'Next Follow-up', date: '2026-05-27', time: '11:00AM', notes: 'Follow up call on budget' }
      }
    },
    {
      id: 'L06',
      name: 'Anjali Singh',
      email: 'anjali.s@email.com',
      phone: '+91 43210 98765',
      city: 'Hyderabad',
      property: 'Land Plot',
      propertyType: 'Plot',
      bedrooms: 'N/A',
      source: 'Social Media',
      status: 'Closed',
      assigned: 'Priya Singh',
      followUp: '2026-5-27',
      budget: '₹2.3Cr.',
      note: 'Plot purchased for villa construction. Deal finalized.',
      timeline: {
        inquiry: { type: 'Inquiry Date', date: '2026-04-15', time: '06:00PM', notes: 'Instagram ad lead' },
        lastFollowUp: { type: 'Last Follow-up', date: '2026-05-02', time: '03:00PM', notes: 'Payment terms agreed' },
        nextFollowUp: { type: 'Next Follow-up', date: '2026-05-27', time: '-', notes: 'Deal Closed successfully' }
      }
    },
    {
      id: 'L07',
      name: 'Rajesh Mehta',
      email: 'rajesh.m@email.com',
      phone: '+91 32109 87654',
      city: 'Hyderabad',
      property: '2BHK Apartment',
      propertyType: 'Apartment',
      bedrooms: '2',
      source: 'App',
      status: 'Not Interested',
      assigned: 'Deepak Verma',
      followUp: '2026-5-27',
      budget: '₹15L',
      note: 'Budget constraint. Looking for properties in outer ring road.',
      timeline: {
        inquiry: { type: 'Inquiry Date', date: '2026-05-05', time: '02:00PM', notes: 'App lead' },
        lastFollowUp: { type: 'Last Follow-up', date: '2026-05-08', time: '11:00AM', notes: 'Declined current offers due to budget limits' },
        nextFollowUp: { type: 'Next Follow-up', date: '2026-05-27', time: '-', notes: 'Archived - Not interested for now' }
      }
    },
    {
      id: 'L08',
      name: 'Divya Kumar',
      email: 'divya.k@email.com',
      phone: '+91 21098 76543',
      city: 'Hyderabad',
      property: '3BHK Villa',
      propertyType: 'Villa',
      bedrooms: '3',
      source: 'Walk-in',
      status: 'New',
      assigned: 'Unassigned',
      followUp: '2026-5-27',
      budget: '₹22L',
      note: 'Walked in to office. Looking for a weekend villa near city outskirts.',
      timeline: {
        inquiry: { type: 'Inquiry Date', date: '2026-05-25', time: '04:30PM', notes: 'Walk-in office visit' },
        lastFollowUp: { type: 'Last Follow-up', date: '-', time: '-', notes: '-' },
        nextFollowUp: { type: 'Next Follow-up', date: '2026-05-27', time: '10:00AM', notes: 'Site visit scheduling call' }
      }
    }
  ]);

  // Options lists
  const statusOptions = [
    { label: 'All Status', value: 'All Status' },
    { label: 'New', value: 'New' },
    { label: 'Contacted', value: 'Contacted' },
    { label: 'Follow-up', value: 'Follow-up' },
    { label: 'Site Visit', value: 'Site Visit' },
    { label: 'Negotiation', value: 'Negotiation' },
    { label: 'Closed', value: 'Closed' },
    { label: 'Not Interested', value: 'Not Interested' }
  ];

  const sourceOptions = [
    { label: 'All Source', value: 'All Source' },
    { label: 'Website', value: 'Website' },
    { label: 'Call', value: 'Call' },
    { label: 'App', value: 'App' },
    { label: 'Social Media', value: 'Social Media' },
    { label: 'Referral', value: 'Referral' },
    { label: 'Walk-in', value: 'Walk-in' }
  ];

  const agentOptions = ['Unassigned', 'Rajesh Kumar', 'Deepak Verma', 'Priya Singh'];

  const handleExport = () => {
    alert("Exporting lead listings data. Downloading file: gummam_crm_leads.csv");
  };

  const triggerRescheduleFromView = (lead: Lead) => {
    setRescheduleLead(lead);
    setRescheduleForm({
      newDate: lead.timeline.nextFollowUp.date !== '-' ? lead.timeline.nextFollowUp.date : '2026-05-30',
      newTime: lead.timeline.nextFollowUp.time !== '-' ? lead.timeline.nextFollowUp.time : '01:00PM',
      reason: ''
    });
    setSelectedLeadForView(null);
    setShowRescheduleModal(true);
  };

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleLead) return;

    setLeads(leads.map(l => {
      if (l.id === rescheduleLead.id) {
        return {
          ...l,
          followUp: rescheduleForm.newDate,
          timeline: {
            ...l.timeline,
            nextFollowUp: {
              type: 'Next Follow-up',
              date: rescheduleForm.newDate,
              time: rescheduleForm.newTime,
              notes: rescheduleForm.reason || 'Rescheduled visit'
            }
          }
        };
      }
      return l;
    }));

    setShowRescheduleModal(false);
    setRescheduleLead(null);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLeadId = `L0${leads.length + 1}`;
    const newLead: Lead = {
      id: newLeadId,
      name: scheduleForm.buyerName || 'New Inquiry',
      email: scheduleForm.email || 'no-email@email.com',
      phone: scheduleForm.phone || '+91 00000 00000',
      city: scheduleForm.location || 'Hyderabad',
      property: scheduleForm.propertyTitle || 'Property Interest',
      propertyType: 'Apartment',
      bedrooms: '3',
      source: 'Website',
      status: 'New',
      assigned: scheduleForm.assignedAgent === 'Select Agent' ? 'Unassigned' : scheduleForm.assignedAgent,
      followUp: scheduleForm.visitDate || '2026-05-27',
      budget: '₹25L',
      note: scheduleForm.note || 'Scheduled site visit',
      timeline: {
        inquiry: { type: 'Inquiry Date', date: '2026-07-01', time: '10:00AM', notes: 'Scheduled via dashboard' },
        lastFollowUp: { type: 'Last Follow-up', date: '-', time: '-', notes: '-' },
        nextFollowUp: {
          type: 'Next Follow-up',
          date: scheduleForm.visitDate || '2026-05-27',
          time: scheduleForm.visitTime || '12:00PM',
          notes: scheduleForm.note || 'Scheduled visit'
        }
      }
    };

    setLeads([newLead, ...leads]);
    setShowScheduleModal(false);
    setScheduleForm({
      propertyTitle: '',
      location: '',
      buyerName: '',
      email: '',
      phone: '',
      visitDate: '',
      visitTime: '',
      assignedAgent: 'Select Agent',
      reminder: '1 day before',
      notificationPlatform: 'Whatsapp',
      note: ''
    });
  };

  const handleUpdateStatus = (leadId: string, newStatus: string) => {
    setLeads(leads.map(l => {
      if (l.id === leadId) {
        return { ...l, status: newStatus };
      }
      return l;
    }));
    if (selectedLeadForView && selectedLeadForView.id === leadId) {
      setSelectedLeadForView({ ...selectedLeadForView, status: newStatus });
    }
  };

  const handleAssignAgent = (leadId: string, agentName: string) => {
    setLeads(leads.map(l => {
      if (l.id === leadId) {
        return { ...l, assigned: agentName };
      }
      return l;
    }));
    if (selectedLeadForView && selectedLeadForView.id === leadId) {
      setSelectedLeadForView({ ...selectedLeadForView, assigned: agentName });
    }
  };

  const renderStatusBadge = (status: string) => {
    let classes = '';
    switch(status) {
      case 'New':
        classes = 'bg-blue-50 text-blue-700 border border-blue-200';
        break;
      case 'Contacted':
        classes = 'bg-cyan-50 text-cyan-700 border border-cyan-200';
        break;
      case 'Follow-up':
        classes = 'bg-amber-50 text-amber-700 border border-amber-200';
        break;
      case 'Site Visit':
        classes = 'bg-purple-50 text-purple-700 border border-purple-200';
        break;
      case 'Negotiation':
        classes = 'bg-rose-50 text-rose-700 border border-rose-200';
        break;
      case 'Closed':
        classes = 'bg-emerald-50 text-emerald-700 border border-emerald-200';
        break;
      case 'Not Interested':
        classes = 'bg-slate-100 text-slate-600 border border-slate-200';
        break;
      default:
        classes = 'bg-slate-50 text-slate-600 border border-slate-200';
    }
    return <span className={`px-2.5 py-0.5 rounded-[5px] text-[10px] font-semibold select-none ${classes}`}>{status}</span>;
  };

  const renderSourceBadge = (source: string) => {
    let classes = '';
    switch(source) {
      case 'Website':
        classes = 'bg-blue-100 text-blue-800';
        break;
      case 'App':
        classes = 'bg-emerald-100 text-emerald-800';
        break;
      case 'Referral':
        classes = 'bg-purple-100 text-purple-800';
        break;
      case 'Call':
        classes = 'bg-rose-100 text-rose-800';
        break;
      case 'Social Media':
        classes = 'bg-pink-100 text-pink-850';
        break;
      case 'Walk-in':
        classes = 'bg-amber-100 text-amber-800';
        break;
      default:
        classes = 'bg-slate-100 text-slate-700';
    }
    return <span className={`px-2.5 py-0.5 rounded-[5px] text-[10px] font-semibold select-none ${classes}`}>{source}</span>;
  };

  const renderAssigned = (assigned: string) => {
    if (assigned === 'Unassigned') {
      return <span className="text-[#D92D20] font-semibold text-xs">{assigned}</span>;
    }
    return <span className="text-slate-600 font-semibold text-xs">{assigned}</span>;
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'All Status' || lead.status === selectedStatus;
    const matchesSource = selectedSource === 'All Source' || lead.source === selectedSource;
    
    const matchesAssigned = selectedAssigned === 'All Leads' ||
      (selectedAssigned === 'Unassigned' && lead.assigned === 'Unassigned') ||
      (selectedAssigned !== 'Unassigned' && lead.assigned === selectedAssigned);

    return matchesSearch && matchesStatus && matchesSource && matchesAssigned;
  });

  return (
    <div className="space-y-6 text-left">
      
      {/* ================= HEADER SECTION ================= */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Inquiries & CRM Management</h1>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Deep lead tracking system with status management, follow-ups, and lead source tracking.
          </p>
        </div>
        <button
          onClick={() => setShowScheduleModal(true)}
          className="h-10 px-4 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[8px] flex items-center justify-center gap-2 transition cursor-pointer w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Schedule Visit</span>
        </button>
      </div>

      {/* ================= KPI CARDS GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {/* Total Inquiries */}
        <div className="bg-white border border-[#dddddd] rounded-[16px] p-6 flex flex-col justify-between min-h-[140px] shadow-none">
          <span className="text-sm font-medium text-slate-500">Total Inquiries</span>
          <div className="flex items-end justify-between mt-2">
            <span className="text-3xl font-semibold text-slate-900 leading-none">08</span>
            <PeriodDropdown value={periodTotalInquiries} onChange={setPeriodTotalInquiries} />
          </div>
        </div>

        {/* New Leads */}
        <div className="bg-white border border-[#dddddd] rounded-[16px] p-6 flex flex-col justify-between min-h-[140px] shadow-none">
          <span className="text-sm font-medium text-slate-500">New Leads</span>
          <div className="flex items-end justify-between mt-2">
            <span className="text-3xl font-semibold text-amber-500 leading-none">02</span>
            <PeriodDropdown value={periodNewLeads} onChange={setPeriodNewLeads} />
          </div>
        </div>

        {/* Closed Deals */}
        <div className="bg-white border border-[#dddddd] rounded-[16px] p-6 flex flex-col justify-between min-h-[140px] shadow-none">
          <span className="text-sm font-medium text-slate-500">Closed Deals</span>
          <div className="flex items-end justify-between mt-2">
            <span className="text-3xl font-semibold text-[#0F8043] leading-none">05</span>
            <PeriodDropdown value={periodClosedDeals} onChange={setPeriodClosedDeals} />
          </div>
        </div>

        {/* Contacted */}
        <div className="bg-white border border-[#dddddd] rounded-[16px] p-6 flex flex-col justify-between min-h-[140px] shadow-none">
          <span className="text-sm font-medium text-slate-500">Contacted</span>
          <div className="flex items-end justify-between mt-2">
            <span className="text-3xl font-semibold text-[#D92D20] leading-none">01</span>
            <PeriodDropdown value={periodContacted} onChange={setPeriodContacted} />
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white border border-[#dddddd] rounded-[16px] p-6 flex flex-col justify-between min-h-[140px] shadow-none">
          <span className="text-sm font-medium text-slate-500">Conversion Rate</span>
          <div className="flex items-end justify-between mt-2">
            <span className="text-3xl font-semibold text-[#035096] leading-none">12.5%</span>
            <PeriodDropdown value={periodConversion} onChange={setPeriodConversion} />
          </div>
        </div>
      </div>

      {/* ================= FILTERS & ACTIONS CONTROLS BAR ================= */}
      <div className="bg-white border border-[#dddddd] rounded-[16px] p-4 flex flex-col lg:flex-row gap-4 justify-between items-center shadow-none">
        
        {/* Search */}
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-3.5 my-auto inset-y-0 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title or address...."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200 rounded-[8px] text-xs outline-none transition placeholder:text-slate-400 focus:border-[#035096]"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-3 w-full lg:flex lg:flex-wrap lg:items-center lg:w-auto lg:justify-end">
          
          {/* Custom Status Dropdown */}
          <CustomFilterDropdown
            value={selectedStatus}
            onChange={setSelectedStatus}
            placeholder="All Status"
            options={statusOptions}
          />

          {/* Custom Source Dropdown */}
          <CustomFilterDropdown
            value={selectedSource}
            onChange={setSelectedSource}
            placeholder="All Source"
            options={sourceOptions}
          />

          {/* Custom Agent Dropdown with search inside */}
          <CustomFilterDropdown
            value={selectedAssigned}
            onChange={setSelectedAssigned}
            placeholder="All Leads"
            hasSearch={true}
            searchText={assignedSearchText}
            onSearchChange={setAssignedSearchText}
            options={['All Leads', 'Unassigned', ...agentOptions.slice(1)]
              .filter(opt => opt.toLowerCase().includes(assignedSearchText.toLowerCase()))
              .map(opt => ({ label: opt, value: opt }))
            }
          />

          {/* Export Button */}
          <button
            onClick={handleExport}
            className="h-10 px-4 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[8px] flex items-center justify-center gap-2 transition cursor-pointer w-full lg:w-auto"
          >
            <Download className="h-4 w-4 shrink-0" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* ================= TABLE LISTINGS SECTION ================= */}
      <div className="bg-white rounded-[16px] overflow-hidden border border-[#dddddd] shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#F0F2F3] border-b border-[#dddddd] text-xs font-semibold text-slate-700">
                <th className="p-4 pl-6">Buyers Name</th>
                <th className="p-4">Property</th>
                <th className="p-4">Source</th>
                <th className="p-4">Status</th>
                <th className="p-4">Agent</th>
                <th className="p-4">Follow-up</th>
                <th className="p-4">Budget</th>
                <th className="p-4 text-center pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dddddd] text-xs text-slate-700 font-medium">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="p-4 pl-6 font-semibold text-slate-900">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900">{lead.name}</span>
                        <span className="text-[10px] text-slate-400 mt-0.5 font-normal">{lead.email}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-550 font-medium">{lead.property}</td>
                    <td className="p-4">{renderSourceBadge(lead.source)}</td>
                    <td className="p-4">{renderStatusBadge(lead.status)}</td>
                    <td className="p-4">{renderAssigned(lead.assigned)}</td>
                    <td className="p-4 text-slate-450">{lead.followUp}</td>
                    <td className="p-4 text-slate-900 font-semibold">{lead.budget}</td>
                    <td className="p-4 pr-6">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => setSelectedLeadForView(lead)}
                          className="w-8 h-8 rounded-[5px] hover:bg-slate-100 flex items-center justify-center text-blue-600 transition cursor-pointer"
                          title="View Lead Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    No inquiries found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="bg-[#F8FAFC] px-6 py-4 border-t border-[#dddddd] flex items-center justify-between text-xs text-slate-400 font-medium">
          <span>Showing {filteredLeads.length} of {leads.length} Inquiries</span>
        </div>
      </div>

      {/* ================= MODAL 1: VIEW DETAILS MODAL ================= */}
      {selectedLeadForView && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-[1000] p-4">
          <div className="bg-white w-full max-w-[460px] rounded-[5px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">{selectedLeadForView.name}</h2>
              <button
                onClick={() => setSelectedLeadForView(null)}
                className="w-8 h-8 rounded-[5px] hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-600">
              {/* Buyer Contact Grid */}
              <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Email</span>
                  <div className="text-slate-800 font-semibold mt-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{selectedLeadForView.email}</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Phone</span>
                  <div className="text-slate-800 font-semibold mt-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{selectedLeadForView.phone}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">City</span>
                  <div className="text-slate-800 font-semibold mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{selectedLeadForView.city}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Budget</span>
                  <div className="text-slate-900 font-bold mt-1">
                    {selectedLeadForView.budget}
                  </div>
                </div>
              </div>

              {/* Property Interest Section */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-[#035096] uppercase tracking-wider">Property Interest</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50/50 border border-blue-100/50 rounded-[5px] p-3">
                    <span className="text-[9px] text-slate-400 uppercase font-semibold">Property</span>
                    <p className="text-slate-800 font-semibold mt-0.5">{selectedLeadForView.property}</p>
                  </div>
                  <div className="bg-[#E1FFE9]/60 border border-emerald-100/50 rounded-[5px] p-3">
                    <span className="text-[9px] text-slate-400 uppercase font-semibold">Type</span>
                    <p className="text-emerald-800 font-semibold mt-0.5">{selectedLeadForView.propertyType}</p>
                  </div>
                  <div className="bg-[#F3E8FF]/60 border border-purple-100/50 rounded-[5px] p-3">
                    <span className="text-[9px] text-slate-400 uppercase font-semibold">Preferred Bedrooms</span>
                    <p className="text-purple-800 font-semibold mt-0.5">{selectedLeadForView.bedrooms}</p>
                  </div>
                  <div className="bg-[#FFF3CD]/60 border border-amber-100/50 rounded-[5px] p-3">
                    <span className="text-[9px] text-slate-400 uppercase font-semibold">Lead Source</span>
                    <p className="text-amber-800 font-semibold mt-0.5">{selectedLeadForView.source}</p>
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-[#035096] uppercase tracking-wider">Note</h4>
                <div className="bg-slate-50 border border-slate-100 rounded-[5px] p-3 text-slate-700 font-medium">
                  {selectedLeadForView.note}
                </div>
              </div>

              {/* Update Status */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#035096] uppercase tracking-wider">Update Lead Status</h4>
                <div className="grid grid-cols-4 gap-2">
                  {statusOptions.slice(1).map((opt) => {
                    const isActive = selectedLeadForView.status === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleUpdateStatus(selectedLeadForView.id, opt.value)}
                        className={`py-1.5 text-[10px] font-semibold rounded-[5px] transition-colors text-center cursor-pointer ${
                          isActive
                            ? 'bg-[#035096] text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Assign Agent Dropdown */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#035096] uppercase tracking-wider">Assign Agent</h4>
                <div className="relative">
                  <button
                    ref={viewAgentTriggerRef}
                    type="button"
                    onClick={() => setViewAgentDropdownOpen(!viewAgentDropdownOpen)}
                    className="w-full bg-white border border-slate-200 rounded-[5px] px-3 py-2 text-xs font-semibold text-slate-700 flex items-center justify-between hover:border-slate-350 cursor-pointer"
                  >
                    <span>{selectedLeadForView.assigned}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                  {viewAgentDropdownOpen && createPortal(
                    <div
                      className="bg-white border border-slate-200 rounded-[5px] shadow-lg z-[9999] py-1 max-h-36 overflow-y-auto"
                      style={{
                        position: 'absolute',
                        top: viewAgentCoords.top,
                        left: viewAgentCoords.left,
                        width: viewAgentCoords.width
                      }}
                    >
                      {agentOptions.map((agent) => (
                        <button
                          key={agent}
                          type="button"
                          onClick={() => {
                            handleAssignAgent(selectedLeadForView.id, agent);
                            setViewAgentDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                            agent === selectedLeadForView.assigned
                              ? 'bg-[#F0F4F9]/60 font-semibold text-[#035096]'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{agent}</span>
                          {agent === selectedLeadForView.assigned && (
                            <Check className="w-3.5 h-3.5 text-[#035096] shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>,
                    document.body
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex items-center gap-3">
              <button
                type="button"
                onClick={() => triggerRescheduleFromView(selectedLeadForView)}
                className="flex-1 h-9 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[5px] cursor-pointer"
              >
                Reschedule
              </button>
              <button
                type="button"
                onClick={() => setSelectedLeadForView(null)}
                className="flex-1 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-[5px] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: SCHEDULE NEW VISIT ================= */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-[1000] p-4">
          <div className="bg-white w-full max-w-[460px] rounded-[5px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Schedule New Visit</h2>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="w-8 h-8 rounded-[5px] hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleScheduleSubmit} className="flex flex-col overflow-hidden">
              <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-600">
                {/* Property Info */}
                <div className="space-y-2.5">
                  <h4 className="text-[10px] font-bold text-[#035096] uppercase tracking-wider border-b border-slate-100 pb-1">Property Information</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-1">Property Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 3BHK Apartment"
                        value={scheduleForm.propertyTitle}
                        onChange={(e) => setScheduleForm({...scheduleForm, propertyTitle: e.target.value})}
                        className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-1">Location *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Hyderabad"
                        value={scheduleForm.location}
                        onChange={(e) => setScheduleForm({...scheduleForm, location: e.target.value})}
                        className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                      />
                    </div>
                  </div>
                </div>

                {/* Buyer Info */}
                <div className="space-y-2.5">
                  <h4 className="text-[10px] font-bold text-[#035096] uppercase tracking-wider border-b border-slate-100 pb-1">Buyer Information</h4>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Buyer Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      value={scheduleForm.buyerName}
                      onChange={(e) => setScheduleForm({...scheduleForm, buyerName: e.target.value})}
                      className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-1">Email</label>
                      <input
                        type="email"
                        placeholder="email@gmail.com"
                        value={scheduleForm.email}
                        onChange={(e) => setScheduleForm({...scheduleForm, email: e.target.value})}
                        className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-1">Phone</label>
                      <input
                        type="text"
                        placeholder="e.g. 98765..."
                        value={scheduleForm.phone}
                        onChange={(e) => setScheduleForm({...scheduleForm, phone: e.target.value})}
                        className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                      />
                    </div>
                  </div>
                </div>

                {/* Visit Schedule */}
                <div className="space-y-2.5">
                  <h4 className="text-[10px] font-bold text-[#035096] uppercase tracking-wider border-b border-slate-100 pb-1">Visit Schedule</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-1">Visit Date *</label>
                      <input
                        type="date"
                        required
                        value={scheduleForm.visitDate}
                        onChange={(e) => setScheduleForm({...scheduleForm, visitDate: e.target.value})}
                        className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-1">Visit Time *</label>
                      <input
                        type="time"
                        required
                        value={scheduleForm.visitTime}
                        onChange={(e) => setScheduleForm({...scheduleForm, visitTime: e.target.value})}
                        className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-1">Assigned Agent</label>
                      <div className="relative">
                        <button
                          ref={scheduleAgentTriggerRef}
                          type="button"
                          onClick={() => setScheduleAgentDropdownOpen(!scheduleAgentDropdownOpen)}
                          className="w-full bg-white border border-slate-200 rounded-[5px] h-8 px-2.5 text-xs text-slate-700 flex items-center justify-between hover:border-slate-350 cursor-pointer"
                        >
                          <span className="truncate">{scheduleForm.assignedAgent}</span>
                          <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        </button>
                        {scheduleAgentDropdownOpen && createPortal(
                          <div
                            className="bg-white border border-slate-200 rounded-[5px] shadow-lg z-[9999] py-1 max-h-36 overflow-y-auto"
                            style={{
                              position: 'absolute',
                              top: scheduleAgentCoords.top,
                              left: scheduleAgentCoords.left,
                              width: scheduleAgentCoords.width
                            }}
                          >
                            {['Select Agent', ...agentOptions.slice(1)].map((agent) => (
                              <button
                                key={agent}
                                type="button"
                                onClick={() => {
                                  setScheduleForm({...scheduleForm, assignedAgent: agent});
                                  setScheduleAgentDropdownOpen(false);
                                }}
                                className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                                  agent === scheduleForm.assignedAgent
                                    ? 'bg-[#F0F4F9]/60 font-semibold text-[#035096]'
                                    : 'text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <span>{agent}</span>
                                {agent === scheduleForm.assignedAgent && (
                                  <Check className="w-3.5 h-3.5 text-[#035096] shrink-0" />
                                )}
                              </button>
                            ))}
                          </div>,
                          document.body
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-1">Reminder</label>
                      <div className="relative">
                        <button
                          ref={scheduleReminderTriggerRef}
                          type="button"
                          onClick={() => setScheduleReminderDropdownOpen(!scheduleReminderDropdownOpen)}
                          className="w-full bg-white border border-slate-200 rounded-[5px] h-8 px-2.5 text-xs text-slate-700 flex items-center justify-between hover:border-slate-350 cursor-pointer"
                        >
                          <span className="truncate">{scheduleForm.reminder}</span>
                          <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        </button>
                        {scheduleReminderDropdownOpen && createPortal(
                          <div
                            className="bg-white border border-slate-200 rounded-[5px] shadow-lg z-[9999] py-1 max-h-36 overflow-y-auto"
                            style={{
                              position: 'absolute',
                              top: scheduleReminderCoords.top,
                              left: scheduleReminderCoords.left,
                              width: scheduleReminderCoords.width
                            }}
                          >
                            {['1 day before', '2 hours before', '1 hour before', '3 days before'].map((rem) => (
                              <button
                                key={rem}
                                type="button"
                                onClick={() => {
                                  setScheduleForm({...scheduleForm, reminder: rem});
                                  setScheduleReminderDropdownOpen(false);
                                }}
                                className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                                  rem === scheduleForm.reminder
                                    ? 'bg-[#F0F4F9]/60 font-semibold text-[#035096]'
                                    : 'text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <span>{rem}</span>
                                {rem === scheduleForm.reminder && (
                                  <Check className="w-3.5 h-3.5 text-[#035096] shrink-0" />
                                )}
                              </button>
                            ))}
                          </div>,
                          document.body
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Choose platform */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-semibold text-slate-500">Choose notification platform</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setScheduleForm({...scheduleForm, notificationPlatform: 'Whatsapp'})}
                      className={`px-3 py-1.5 rounded-[5px] font-semibold text-xs transition-all border cursor-pointer ${
                        scheduleForm.notificationPlatform === 'Whatsapp'
                          ? 'bg-[#25D366] border-[#25D366] text-white'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Whatsapp
                    </button>
                    <button
                      type="button"
                      onClick={() => setScheduleForm({...scheduleForm, notificationPlatform: 'Email'})}
                      className={`px-3 py-1.5 rounded-[5px] font-semibold text-xs transition-all border cursor-pointer ${
                        scheduleForm.notificationPlatform === 'Email'
                          ? 'bg-[#1A91F0] border-[#1A91F0] text-white'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Email
                    </button>
                  </div>
                </div>

                {/* Note */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-semibold text-slate-500">Note</label>
                  <textarea
                    rows={3}
                    placeholder="Enter notes about client preference..."
                    value={scheduleForm.note}
                    onChange={(e) => setScheduleForm({...scheduleForm, note: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-[5px] px-2.5 py-1.5 text-xs outline-none focus:border-[#035096] resize-none"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-100 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-[5px] cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="flex-1 h-9 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[5px] cursor-pointer"
                >
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL 3: RESCHEDULE VISIT ================= */}
      {showRescheduleModal && rescheduleLead && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-[1000] p-4">
          <div className="bg-white w-full max-w-[400px] rounded-[5px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Reschedule Visit</h2>
              <button
                onClick={() => {
                  setShowRescheduleModal(false);
                  setRescheduleLead(null);
                }}
                className="w-8 h-8 rounded-[5px] hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleRescheduleSubmit} className="flex flex-col">
              <div className="p-6 space-y-4 text-xs text-slate-600">
                {/* Property Display */}
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Property</span>
                  <p className="text-slate-800 font-semibold mt-0.5">{rescheduleLead.property}</p>
                </div>

                {/* New Date */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">New Date</label>
                  <input
                    type="date"
                    required
                    value={rescheduleForm.newDate}
                    onChange={(e) => setRescheduleForm({...rescheduleForm, newDate: e.target.value})}
                    className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                  />
                </div>

                {/* New Time */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">New Time</label>
                  <input
                    type="time"
                    required
                    value={rescheduleForm.newTime}
                    onChange={(e) => setRescheduleForm({...rescheduleForm, newTime: e.target.value})}
                    className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                  />
                </div>

                {/* Reason */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">Reason for Rescheduling</label>
                  <textarea
                    rows={3}
                    placeholder="Enter reason for rescheduling..."
                    value={rescheduleForm.reason}
                    onChange={(e) => setRescheduleForm({...rescheduleForm, reason: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-[5px] px-2.5 py-1.5 text-xs outline-none focus:border-[#035096] resize-none"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-100 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowRescheduleModal(false);
                    setRescheduleLead(null);
                  }}
                  className="flex-1 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-[5px] cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="flex-1 h-9 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[5px] cursor-pointer"
                >
                  Reschedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

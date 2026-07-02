import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';

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

export const CrmManagement: React.FC = () => {
  // Stat periods
  const [periodTotalInquiries, setPeriodTotalInquiries] = useState('Last Month');
  const [periodNewLeads, setPeriodNewLeads] = useState('Last Month');
  const [periodClosedDeals, setPeriodClosedDeals] = useState('Last Month');
  const [periodContacted, setPeriodContacted] = useState('Last Month');
  const [periodConversion, setPeriodConversion] = useState('Last Month');

  // Active dropdown states for stat tiles
  const [openStatDropdown, setOpenStatDropdown] = useState<string | null>(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedSource, setSelectedSource] = useState('All Source');
  const [selectedAssigned, setSelectedAssigned] = useState('All Leads');

  // Dropdown open states
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [sourceDropdownOpen, setSourceDropdownOpen] = useState(false);
  const [assignedDropdownOpen, setAssignedDropdownOpen] = useState(false);
  const [assignedSearchText, setAssignedSearchText] = useState('');
  const [viewAgentDropdownOpen, setViewAgentDropdownOpen] = useState(false);
  const [scheduleAgentDropdownOpen, setScheduleAgentDropdownOpen] = useState(false);
  const [scheduleReminderDropdownOpen, setScheduleReminderDropdownOpen] = useState(false);

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

  // Mock initial leads data from screenshots
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 'L01',
      name: 'Shiva Sharma',
      email: 'shiva@email.com',
      phone: '+91 98765 43210',
      city: 'Hyderabad',
      property: '3BHK Apartment',
      propertyType: 'Apartment',
      bedrooms: '3',
      source: 'Website',
      status: 'New',
      assigned: 'Unassigned',
      followUp: '2026-5-27',
      budget: '₹15L',
      note: 'Interested in premium properties, first-time buyer',
      timeline: {
        inquiry: { type: 'Inquiry Date', date: '2026-05-16', time: '01:00PM', notes: 'Interested in premium properties, first-time buyer' },
        lastFollowUp: { type: 'Last Follow-up', date: '-', time: '-', notes: '-' },
        nextFollowUp: { type: 'Next Follow-up', date: '2026-05-30', time: '01:00PM', notes: 'Notes' }
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
        nextFollowUp: { type: 'Next Follow-up', date: '2026-05-28', time: '10:00AM', notes: 'Site visit scheduling' }
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
        nextFollowUp: { type: 'Next Follow-up', date: '2026-05-29', time: '11:00AM', notes: 'Follow up call on budget' }
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
        nextFollowUp: { type: 'Next Follow-up', date: '-', time: '-', notes: 'Deal Closed successfully' }
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
        nextFollowUp: { type: 'Next Follow-up', date: '-', time: '-', notes: 'Archived - Not interested for now' }
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
        nextFollowUp: { type: 'Next Follow-up', date: '2026-06-01', time: '10:00AM', notes: 'Site visit scheduling call' }
      }
    }
  ]);

  // Dropdown list options
  const statusOptions = ['All Status', 'New', 'Contacted', 'Follow-up', 'Site Visit', 'Negotiation', 'Closed', 'Not Interested'];
  const sourceOptions = ['All Source', 'Website', 'Call', 'App', 'Social Media', 'Referral', 'Walk-in'];
  const agentOptions = ['Unassigned', 'Rajesh Kumar', 'Deepak Verma', 'Priya Singh'];
  const periodOptions = ['Last Week', 'Last Month', 'Three Months', 'Six Months', 'Last Years'];

  // Ref hooks to close dropdowns when clicking outside
  const statRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const sourceRef = useRef<HTMLDivElement>(null);
  const assignedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (statRef.current && !statRef.current.contains(e.target as Node)) {
        setOpenStatDropdown(null);
      }
      if (statusRef.current && !statusRef.current.contains(e.target as Node)) {
        setStatusDropdownOpen(false);
      }
      if (sourceRef.current && !sourceRef.current.contains(e.target as Node)) {
        sourceDropdownOpen && setSourceDropdownOpen(false);
      }
      if (assignedRef.current && !assignedRef.current.contains(e.target as Node)) {
        assignedDropdownOpen && setAssignedDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [sourceDropdownOpen, assignedDropdownOpen]);

  // Export data as simple alert download or CSV
  const handleExport = () => {
    alert("Exporting lead listings data. Downloading file: gummam_crm_leads.csv");
  };

  // Click handler to open reschedule modal from lead details modal
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

  // Submit rescheduling
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

  // Submit new visit scheduling
  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new lead/visit from schedule form
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
    
    // Reset form
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

  // Change lead status from view modal
  const handleUpdateStatus = (leadId: string, newStatus: string) => {
    setLeads(leads.map(l => {
      if (l.id === leadId) {
        return { ...l, status: newStatus };
      }
      return l;
    }));
    // Also update current view state
    if (selectedLeadForView && selectedLeadForView.id === leadId) {
      setSelectedLeadForView({ ...selectedLeadForView, status: newStatus });
    }
  };

  // Change lead assigned agent from view modal
  const handleAssignAgent = (leadId: string, agentName: string) => {
    setLeads(leads.map(l => {
      if (l.id === leadId) {
        return { ...l, assigned: agentName };
      }
      return l;
    }));
    // Also update current view state
    if (selectedLeadForView && selectedLeadForView.id === leadId) {
      setSelectedLeadForView({ ...selectedLeadForView, assigned: agentName });
    }
  };

  // Render Status Badge with correct colors (as seen in screenshots)
  const renderStatusBadge = (status: string) => {
    let classes = '';
    switch(status) {
      case 'New':
        classes = 'bg-[#E3EFFF] text-[#035096]';
        break;
      case 'Contacted':
        classes = 'bg-[#D2F3FC] text-[#006699]';
        break;
      case 'Follow-up':
        classes = 'bg-[#FFF2D4] text-[#E08A00]';
        break;
      case 'Site Visit':
        classes = 'bg-[#F2E5FF] text-[#8000FF]';
        break;
      case 'Negotiation':
        classes = 'bg-[#FFE2E2] text-[#CC0000]';
        break;
      case 'Closed':
        classes = 'bg-[#D5F9DF] text-[#1E7D32]';
        break;
      case 'Not Interested':
        classes = 'bg-[#FCE3F5] text-[#A6006E]';
        break;
      default:
        classes = 'bg-gray-100 text-gray-700';
    }
    return <span className={`px-3 py-1 rounded-full text-xs font-semibold select-none ${classes}`}>{status}</span>;
  };

  // Render Source Badge with correct colors (as seen in screenshots)
  const renderSourceBadge = (source: string) => {
    let classes = '';
    switch(source) {
      case 'Website':
        classes = 'bg-[#E6F0FF] text-[#0A58CA]';
        break;
      case 'App':
        classes = 'bg-[#E1FFE9] text-[#198754]';
        break;
      case 'Referral':
        classes = 'bg-[#F3E8FF] text-[#6F42C1]';
        break;
      case 'Call':
        classes = 'bg-[#FEE2E2] text-[#DC3545]';
        break;
      case 'Social Media':
        classes = 'bg-[#FFEAF3] text-[#D63384]';
        break;
      case 'Walk-in':
        classes = 'bg-[#FFF3CD] text-[#FD7E14]';
        break;
      default:
        classes = 'bg-gray-100 text-gray-700';
    }
    return <span className={`px-2.5 py-0.5 rounded text-[10px] font-semibold select-none ${classes}`}>{source}</span>;
  };

  // Render Assigned text colors
  const renderAssigned = (assigned: string) => {
    if (assigned === 'Unassigned') {
      return <span className="text-[#CC0000] font-semibold text-sm">{assigned}</span>;
    }
    return <span className="text-gray-700 font-semibold text-sm">{assigned}</span>;
  };

  // Stat tile Period Dropdown renderer
  const renderPeriodDropdown = (id: string, currentVal: string, setter: (val: string) => void) => {
    const isThisOpen = openStatDropdown === id;
    return (
      <div className="relative inline-block text-left">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setOpenStatDropdown(isThisOpen ? null : id);
          }}
          className={`flex items-center gap-1 bg-white border rounded-full px-2.5 py-1 text-[10px] font-semibold transition-all focus:outline-none cursor-pointer ${
            isThisOpen
              ? 'border-[#035096] text-[#035096] ring-1/2 ring-[#035096]'
              : 'border-slate-200 hover:border-slate-350 text-slate-700'
          }`}
        >
          <span>{currentVal}</span>
          <Icon 
            icon="ri:arrow-down-s-line" 
            className={`w-2.5 h-2.5 shrink-0 transition-transform duration-200 ${
              isThisOpen ? 'rotate-180 text-[#035096]' : 'text-slate-400'
            }`} 
          />
        </button>

        {isThisOpen && (
          <div className="absolute right-0 mt-1.5 w-28 bg-white border border-slate-200 rounded-lg shadow-lg z-50 py-1 flex flex-col">
            {periodOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setter(option);
                  setOpenStatDropdown(null);
                }}
                className={`w-full text-left px-3 py-1.5 text-[10px] transition-colors flex items-center justify-between cursor-pointer ${
                  option === currentVal 
                    ? 'bg-[#F0F4F9]/60 font-semibold text-[#035096]' 
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{option}</span>
                {option === currentVal && <Icon icon="ri:check-line" className="w-3 h-3 text-[#035096] shrink-0" />}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Filtered Leads
  const filteredLeads = leads.filter(lead => {
    // Search filter
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus = selectedStatus === 'All Status' || lead.status === selectedStatus;

    // Source filter
    const matchesSource = selectedSource === 'All Source' || lead.source === selectedSource;

    // Agent assignment filter
    const matchesAssigned = selectedAssigned === 'All Leads' || 
      (selectedAssigned === 'Unassigned' && lead.assigned === 'Unassigned') ||
      (selectedAssigned !== 'Unassigned' && lead.assigned === selectedAssigned);

    return matchesSearch && matchesStatus && matchesSource && matchesAssigned;
  });

  return (
    <div className="bg-white rounded-[5px] border border-gray-200/60 p-6 md:p-8 shadow-sm space-y-6 animate-fade-in font-poppins text-left" ref={statRef}>
      
      {/* ================= HEADER SECTION ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-left">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#0B2C5C] tracking-tight">CRM Management</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">Deep lead tracking system with status management, follow-ups, and lead source tracking.</p>
        </div>
        <button 
          onClick={() => setShowScheduleModal(true)}
          className="bg-[#035096] hover:bg-[#024076] text-white font-semibold text-sm px-5 py-2.5 rounded-lg inline-flex items-center gap-2 transition-colors cursor-pointer shadow-sm ml-auto md:ml-0"
        >
          <Icon icon="ri:add-line" className="w-4 h-4" />
          <span>Schedule Visit</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Inquiries */}
        <div className="bg-white rounded-xl p-4 flex flex-col justify-between shadow-sm min-h-[90px]">
          <span className="text-xs text-slate-500 font-medium font-poppins">Total Inquiries</span>
          <div className="flex items-center justify-between mt-2.5">
            <span className="text-2xl font-semibold text-slate-900 font-poppins">08</span>
            {renderPeriodDropdown('inquiries', periodTotalInquiries, setPeriodTotalInquiries)}
          </div>
        </div>

        {/* New Leads */}
        <div className="bg-white rounded-xl p-4 flex flex-col justify-between shadow-sm min-h-[90px]">
          <span className="text-xs text-slate-500 font-medium font-poppins">New Leads</span>
          <div className="flex items-center justify-between mt-2.5">
            <span className="text-2xl font-semibold text-amber-600 font-poppins">02</span>
            {renderPeriodDropdown('newLeads', periodNewLeads, setPeriodNewLeads)}
          </div>
        </div>

        {/* Closed Deals */}
        <div className="bg-white rounded-xl p-4 flex flex-col justify-between shadow-sm min-h-[90px]">
          <span className="text-xs text-slate-500 font-medium font-poppins">Closed Deals</span>
          <div className="flex items-center justify-between mt-2.5">
            <span className="text-2xl font-semibold text-green-600 font-poppins">05</span>
            {renderPeriodDropdown('closedDeals', periodClosedDeals, setPeriodClosedDeals)}
          </div>
        </div>

        {/* Contacted */}
        <div className="bg-white rounded-xl p-4 flex flex-col justify-between shadow-sm min-h-[90px]">
          <span className="text-xs text-slate-500 font-medium font-poppins">Contacted</span>
          <div className="flex items-center justify-between mt-2.5">
            <span className="text-2xl font-semibold text-red-500 font-poppins">01</span>
            {renderPeriodDropdown('contacted', periodContacted, setPeriodContacted)}
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white rounded-xl p-4 flex flex-col justify-between shadow-sm min-h-[90px]">
          <span className="text-xs text-slate-500 font-medium font-poppins">Conversion Rate</span>
          <div className="flex items-center justify-between mt-2.5">
            <span className="text-2xl font-semibold text-blue-600 font-poppins">12.5%</span>
            {renderPeriodDropdown('conversion', periodConversion, setPeriodConversion)}
          </div>
        </div>
      </div>

      {/* ================= SEARCH & CUSTOM DROPDOWN FILTERS ================= */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-3 rounded-lg border border-gray-200">
        
        {/* Search */}
        <div className="relative flex-1">
          <Icon icon="ri:search-line" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title or address...."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#035096] transition-colors"
          />
        </div>

        {/* Custom Status Dropdown */}
        <div className="relative" ref={statusRef}>
          <button
            onClick={() => {
              setStatusDropdownOpen(!statusDropdownOpen);
              setSourceDropdownOpen(false);
              setAssignedDropdownOpen(false);
            }}
            className="w-full md:w-auto bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 inline-flex items-center justify-between gap-3 transition-colors cursor-pointer"
          >
            <span>{selectedStatus}</span>
            <Icon 
              icon="ri:arrow-down-s-line" 
              className={`w-4 h-4 transition-transform duration-200 ${
                statusDropdownOpen ? 'rotate-180 text-[#035096]' : 'text-gray-500'
              }`} 
            />
          </button>
          
          {statusDropdownOpen && (
            <div className="absolute left-0 sm:right-0 mt-1.5 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-50 py-1 flex flex-col font-poppins">
              <div className="max-h-60 overflow-y-auto bg-white">
                {statusOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSelectedStatus(opt);
                      setStatusDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                      opt === selectedStatus 
                        ? 'bg-[#F0F4F9]/60 font-semibold text-[#035096]' 
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{opt === 'All Status' ? 'All Status' : opt}</span>
                    {opt === selectedStatus && <Icon icon="ri:check-line" className="w-3.5 h-3.5 text-[#035096] shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Custom Source Dropdown */}
        <div className="relative" ref={sourceRef}>
          <button
            onClick={() => {
              setSourceDropdownOpen(!sourceDropdownOpen);
              setStatusDropdownOpen(false);
              setAssignedDropdownOpen(false);
            }}
            className="w-full md:w-auto bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 inline-flex items-center justify-between gap-3 transition-colors cursor-pointer"
          >
            <span>{selectedSource}</span>
            <Icon 
              icon="ri:arrow-down-s-line" 
              className={`w-4 h-4 transition-transform duration-200 ${
                sourceDropdownOpen ? 'rotate-180 text-[#035096]' : 'text-gray-500'
              }`} 
            />
          </button>

          {sourceDropdownOpen && (
            <div className="absolute left-0 sm:right-0 mt-1.5 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-50 py-1 flex flex-col font-poppins">
              <div className="max-h-60 overflow-y-auto bg-white">
                {sourceOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSelectedSource(opt);
                      setSourceDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                      opt === selectedSource 
                        ? 'bg-[#F0F4F9]/60 font-semibold text-[#035096]' 
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{opt === 'All Source' ? 'All Source' : opt}</span>
                    {opt === selectedSource && <Icon icon="ri:check-line" className="w-3.5 h-3.5 text-[#035096] shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Custom Agent / Lead Assigned Dropdown */}
        <div className="relative" ref={assignedRef}>
          <button
            onClick={() => {
              setAssignedDropdownOpen(!assignedDropdownOpen);
              setStatusDropdownOpen(false);
              setSourceDropdownOpen(false);
            }}
            className="w-full md:w-auto bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 inline-flex items-center justify-between gap-3 transition-colors cursor-pointer"
          >
            <span>{selectedAssigned}</span>
            <Icon 
              icon="ri:arrow-down-s-line" 
              className={`w-4 h-4 transition-transform duration-200 ${
                assignedDropdownOpen ? 'rotate-180 text-[#035096]' : 'text-gray-500'
              }`} 
            />
          </button>

          {assignedDropdownOpen && (
            <div className="absolute left-0 sm:right-0 mt-1.5 w-52 bg-white border border-slate-200 rounded-lg shadow-lg z-50 py-1 flex flex-col font-poppins">
              {/* Search input in dropdown */}
              <div className="p-2 border-b border-gray-150 bg-white">
                <input
                  type="text"
                  placeholder="Search"
                  value={assignedSearchText}
                  onChange={(e) => setAssignedSearchText(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-[#035096] text-gray-700"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="max-h-60 overflow-y-auto bg-white">
                {['All Leads', 'Unassigned', ...agentOptions.slice(1)]
                  .filter(opt => opt.toLowerCase().includes(assignedSearchText.toLowerCase()))
                  .map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSelectedAssigned(opt);
                        setAssignedDropdownOpen(false);
                        setAssignedSearchText('');
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                        opt === selectedAssigned 
                          ? 'bg-[#F0F4F9]/60 font-semibold text-[#035096]' 
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{opt}</span>
                      {opt === selectedAssigned && <Icon icon="ri:check-line" className="w-3.5 h-3.5 text-[#035096] shrink-0" />}
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Export Button */}
        <button
          onClick={handleExport}
          className="bg-[#035096] text-white hover:bg-[#024076] font-medium text-sm px-5 py-2.5 rounded-lg inline-flex items-center gap-2 transition-colors cursor-pointer ml-auto shadow-sm"
        >
          <Icon icon="ri:download-line" className="w-4 h-4" />
          <span>Export</span>
        </button>
      </div>

      {/* ================= TABLE LISTINGS SECTION ================= */}
      <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-gray-200 text-xs font-semibold text-gray-700 font-poppins">
                <th className="px-6 py-4">Buyers Name</th>
                <th className="px-6 py-4">Property</th>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Assigned</th>
                <th className="px-6 py-4">Follow-up</th>
                <th className="px-6 py-4">Budget</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900 text-sm">{lead.name}</span>
                        <span className="text-xs text-gray-400 font-normal mt-0.5">{lead.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                      {lead.property}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderSourceBadge(lead.source)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderStatusBadge(lead.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderAssigned(lead.assigned)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                      {lead.followUp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {lead.budget}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button 
                        onClick={() => setSelectedLeadForView(lead)}
                        className="text-[#035096] hover:text-[#024076] p-1.5 transition-colors cursor-pointer inline-flex items-center justify-center"
                        title="View Lead Details"
                      >
                        <Icon icon="ri:eye-line" className="w-4.5 h-4.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500 text-sm font-medium">
                    No inquiries found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 px-6 py-4 border-t border-gray-150 flex items-center justify-between text-xs text-gray-500 font-medium">
          <span>Showing {filteredLeads.length} of {leads.length} Inquiries</span>
        </div>
      </div>

      {/* ================= MODAL 1: VIEW DETAILS MODAL ================= */}
      {selectedLeadForView && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-2xl border border-gray-200 shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-150 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-semibold text-gray-900 font-poppins">{selectedLeadForView.name}</h3>
              <button 
                onClick={() => setSelectedLeadForView(null)}
                className="text-gray-400 hover:text-gray-650 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Icon icon="ri:close-line" className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-left">
              {/* Buyer Contact Grid */}
              <div className="grid grid-cols-2 gap-4 border-b border-gray-150 pb-5">
                <div>
                  <span className="text-[10px] uppercase font-medium text-gray-400 tracking-wider">Email</span>
                  <div className="text-sm font-medium text-gray-800 mt-1 flex items-center gap-1.5">
                    <Icon icon="ri:mail-line" className="w-4 h-4 text-gray-400" />
                    <span>{selectedLeadForView.email}</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-medium text-gray-400 tracking-wider">Phone</span>
                  <div className="text-sm font-medium text-gray-800 mt-1 flex items-center gap-1.5">
                    <Icon icon="ri:phone-line" className="w-4 h-4 text-gray-400" />
                    <span>{selectedLeadForView.phone}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-[10px] uppercase font-medium text-gray-400 tracking-wider">City</span>
                  <div className="text-sm font-semibold text-gray-700 mt-1 flex items-center gap-1.5">
                    <Icon icon="ri:map-pin-line" className="w-4 h-4 text-gray-400" />
                    <span>{selectedLeadForView.city}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-[10px] uppercase font-medium text-gray-400 tracking-wider">Budget</span>
                  <div className="text-sm font-medium text-gray-900 mt-1 flex items-center gap-1.5">
                    <span className="text-gray-400 font-medium">₹</span>
                    <span>{selectedLeadForView.budget.replace('₹', '')}</span>
                  </div>
                </div>
              </div>

              {/* Property Interest */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-[#035096] uppercase tracking-wider">Property Interest</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50/55 border border-blue-100 rounded-lg p-3">
                    <span className="text-[10px] text-gray-400 uppercase font-semibold">Property</span>
                    <p className="text-sm font-medium text-gray-900 mt-0.5">{selectedLeadForView.property}</p>
                  </div>
                  <div className="bg-[#E1FFE9] border border-emerald-100 rounded-lg p-3">
                    <span className="text-[10px] text-gray-400 uppercase font-semibold">Type</span>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5">{selectedLeadForView.propertyType}</p>
                  </div>
                  <div className="bg-[#F3E8FF] border border-purple-150 rounded-lg p-3">
                    <span className="text-[10px] text-gray-400 uppercase font-semibold">Preferred Bedrooms</span>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">{selectedLeadForView.bedrooms}</p>
                  </div>
                  <div className="bg-[#FFF3CD] border border-amber-150 rounded-lg p-3">
                    <span className="text-[10px] text-gray-400 uppercase font-semibold">Lead Source</span>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">{selectedLeadForView.source}</p>
                  </div>
                </div>
              </div>

              {/* Lead Timeline */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-[#035096] uppercase tracking-wider">Lead Timeline</h4>
                <div className="space-y-2">
                  {/* Inquiry Date */}
                  <div className="bg-[#F1F3F6] rounded-lg p-3.5 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-700 font-medium gap-3">
                    <div className="flex items-center gap-2.5 min-w-[140px]">
                      <Icon icon="ri:time-line" className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-500">Inquiry Date</span>
                    </div>
                    <div className="flex-1 grid grid-cols-3 gap-2">
                      <span className="text-gray-650">{selectedLeadForView.timeline.inquiry.date}</span>
                      <span className="text-gray-650">{selectedLeadForView.timeline.inquiry.time}</span>
                      <span className="text-gray-550 truncate">{selectedLeadForView.timeline.inquiry.notes}</span>
                    </div>
                  </div>

                  {/* Last Follow-up */}
                  <div className="bg-[#F1F3F6] rounded-lg p-3.5 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-700 font-medium gap-3">
                    <div className="flex items-center gap-2.5 min-w-[140px]">
                      <Icon icon="ri:chat-3-line" className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-500">Last Follow-up</span>
                    </div>
                    <div className="flex-1 grid grid-cols-3 gap-2">
                      <span className="text-gray-650">{selectedLeadForView.timeline.lastFollowUp.date}</span>
                      <span className="text-gray-650">{selectedLeadForView.timeline.lastFollowUp.time}</span>
                      <span className="text-gray-550 truncate">{selectedLeadForView.timeline.lastFollowUp.notes}</span>
                    </div>
                  </div>

                  {/* Next Follow-up */}
                  <div className="bg-[#F1F3F6] rounded-lg p-3.5 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-700 font-medium gap-3">
                    <div className="flex items-center gap-2.5 min-w-[140px]">
                      <Icon icon="ri:notification-3-line" className="w-4 h-4 text-red-500" />
                      <span className="text-gray-500">Next Follow-up</span>
                    </div>
                    <div className="flex-1 grid grid-cols-3 gap-2">
                      <span className="text-gray-650">{selectedLeadForView.timeline.nextFollowUp.date}</span>
                      <span className="text-gray-650">{selectedLeadForView.timeline.nextFollowUp.time}</span>
                      <span className="text-gray-550 truncate">{selectedLeadForView.timeline.nextFollowUp.notes}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-[#035096] uppercase tracking-wider">Note</h4>
                <div className="bg-[#F1F3F6] rounded-lg p-3.5 text-xs text-gray-800 font-medium">
                  {selectedLeadForView.note}
                </div>
              </div>

              {/* Update Lead Status */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-[#035096] uppercase tracking-wider">Update Lead Status</h4>
                <div className="grid grid-cols-4 gap-2">
                  {statusOptions.slice(1).map((status) => {
                    const isActive = selectedLeadForView.status === status;
                    return (
                      <button
                        key={status}
                        type="button"
                        onClick={() => handleUpdateStatus(selectedLeadForView.id, status)}
                        className={`py-2 text-xs font-semibold rounded-lg transition-colors text-center cursor-pointer ${
                          isActive 
                            ? 'bg-[#D2E7FF] text-[#035096]' 
                            : 'bg-[#ECEEF2] hover:bg-slate-200 text-gray-700'
                        }`}
                      >
                        {status}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Assign Agent */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-[#035096] uppercase tracking-wider">Assign Agent</h4>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setViewAgentDropdownOpen(!viewAgentDropdownOpen)}
                    className={`w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none flex items-center justify-between transition-all cursor-pointer ${
                      viewAgentDropdownOpen ? 'ring-1 ring-[#035096] border-[#035096]' : ''
                    }`}
                  >
                    <span>{selectedLeadForView.assigned}</span>
                    <Icon 
                      icon="ri:arrow-down-s-line" 
                      className={`w-4 h-4 text-gray-700 transition-transform duration-200 ${
                        viewAgentDropdownOpen ? 'rotate-180 text-[#035096]' : ''
                      }`} 
                    />
                  </button>
                  {viewAgentDropdownOpen && (
                    <div className="absolute left-0 mt-1.5 w-full bg-white border border-slate-200 rounded-lg shadow-lg z-50 py-1 flex flex-col font-poppins max-h-48 overflow-y-auto">
                      {['Unassigned', ...agentOptions.slice(1)].map((agent) => (
                        <button
                          key={agent}
                          type="button"
                          onClick={() => {
                            handleAssignAgent(selectedLeadForView.id, agent);
                            setViewAgentDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                            agent === selectedLeadForView.assigned 
                              ? 'bg-[#F0F4F9]/60 font-semibold text-[#035096]' 
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{agent}</span>
                          {agent === selectedLeadForView.assigned && <Icon icon="ri:check-line" className="w-3.5 h-3.5 text-[#035096] shrink-0" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-white border-t border-gray-150 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => triggerRescheduleFromView(selectedLeadForView)}
                className="bg-[#035096] hover:bg-[#024076] text-white font-semibold text-sm py-2.5 flex-1 rounded-lg transition-colors cursor-pointer text-center"
              >
                Reschedule
              </button>
              <button
                type="button"
                onClick={() => setSelectedLeadForView(null)}
                className="bg-[#ECEEF2] hover:bg-slate-200 text-gray-750 font-semibold text-sm py-2.5 flex-1 rounded-lg transition-colors cursor-pointer text-center"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: SCHEDULE NEW VISIT ================= */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-lg border border-gray-200 shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-150 flex justify-between items-center bg-white">
              <h3 className="text-lg font-semibold text-gray-900 font-poppins">Schedule New Visit</h3>
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="text-gray-400 hover:text-gray-650 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Icon icon="ri:close-line" className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleScheduleSubmit} className="flex flex-col overflow-hidden">
              <div className="p-6 overflow-y-auto space-y-5 text-left text-sm max-h-[65vh]">
                
                {/* Section: Property Info */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-[#035096] uppercase tracking-wider border-b border-gray-100 pb-1">Property Information</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Property Title <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 3BHK Apartment"
                        value={scheduleForm.propertyTitle}
                        onChange={(e) => setScheduleForm({...scheduleForm, propertyTitle: e.target.value})}
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#035096]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Location <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Hyderabad"
                        value={scheduleForm.location}
                        onChange={(e) => setScheduleForm({...scheduleForm, location: e.target.value})}
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#035096]"
                      />
                    </div>
                  </div>
                </div>

                {/* Section: Buyer Info */}
                <div className="space-y-3 mt-4">
                  <h4 className="text-xs font-semibold text-[#035096] uppercase tracking-wider border-b border-gray-100 pb-1">Buyer Information</h4>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Buyer Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      value={scheduleForm.buyerName}
                      onChange={(e) => setScheduleForm({...scheduleForm, buyerName: e.target.value})}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#035096]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        placeholder="email@gmail.com"
                        value={scheduleForm.email}
                        onChange={(e) => setScheduleForm({...scheduleForm, email: e.target.value})}
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#035096]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Phone</label>
                      <input
                        type="text"
                        placeholder="e.g. 98765..."
                        value={scheduleForm.phone}
                        onChange={(e) => setScheduleForm({...scheduleForm, phone: e.target.value})}
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#035096]"
                      />
                    </div>
                  </div>
                </div>

                {/* Section: Visit Schedule */}
                <div className="space-y-3 mt-4">
                  <h4 className="text-xs font-semibold text-[#035096] uppercase tracking-wider border-b border-gray-100 pb-1">Visit Schedule</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Visit Date <span className="text-red-500">*</span></label>
                      <input
                        type="date"
                        required
                        value={scheduleForm.visitDate}
                        onChange={(e) => setScheduleForm({...scheduleForm, visitDate: e.target.value})}
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#035096]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Visit Time <span className="text-red-500">*</span></label>
                      <input
                        type="time"
                        required
                        value={scheduleForm.visitTime}
                        onChange={(e) => setScheduleForm({...scheduleForm, visitTime: e.target.value})}
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#035096]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Assigned</label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setScheduleAgentDropdownOpen(!scheduleAgentDropdownOpen)}
                          className={`w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs font-medium text-gray-700 focus:outline-none flex items-center justify-between transition-all cursor-pointer ${
                            scheduleAgentDropdownOpen ? 'border-[#035096]' : ''
                          }`}
                        >
                          <span className="truncate">{scheduleForm.assignedAgent}</span>
                          <Icon 
                            icon="ri:arrow-down-s-line" 
                            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                              scheduleAgentDropdownOpen ? 'rotate-180 text-[#035096]' : ''
                            }`} 
                          />
                        </button>
                        {scheduleAgentDropdownOpen && (
                          <div className="absolute left-0 mt-1.5 w-full bg-white border border-slate-200 rounded-lg shadow-lg z-50 py-1 flex flex-col font-poppins max-h-40 overflow-y-auto">
                            {['Select Agent', ...agentOptions.slice(1)].map((agent) => (
                              <button
                                key={agent}
                                type="button"
                                onClick={() => {
                                  setScheduleForm({...scheduleForm, assignedAgent: agent});
                                  setScheduleAgentDropdownOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                                  agent === scheduleForm.assignedAgent 
                                    ? 'bg-[#F0F4F9]/60 font-semibold text-[#035096]' 
                                    : 'text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <span className="truncate">{agent}</span>
                                {agent === scheduleForm.assignedAgent && <Icon icon="ri:check-line" className="w-3.5 h-3.5 text-[#035096] shrink-0" />}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Reminder</label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setScheduleReminderDropdownOpen(!scheduleReminderDropdownOpen)}
                          className={`w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs font-medium text-gray-700 focus:outline-none flex items-center justify-between transition-all cursor-pointer ${
                            scheduleReminderDropdownOpen ? 'border-[#035096]' : ''
                          }`}
                        >
                          <span className="truncate">{scheduleForm.reminder}</span>
                          <Icon 
                            icon="ri:arrow-down-s-line" 
                            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                              scheduleReminderDropdownOpen ? 'rotate-180 text-[#035096]' : ''
                            }`} 
                          />
                        </button>
                        {scheduleReminderDropdownOpen && (
                          <div className="absolute left-0 mt-1.5 w-full bg-white border border-slate-200 rounded-lg shadow-lg z-50 py-1 flex flex-col font-poppins max-h-40 overflow-y-auto">
                            {['1 day before', '2 hours before', '1 hour before', '3 days before'].map((rem) => (
                              <button
                                key={rem}
                                type="button"
                                onClick={() => {
                                  setScheduleForm({...scheduleForm, reminder: rem});
                                  setScheduleReminderDropdownOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                                  rem === scheduleForm.reminder 
                                    ? 'bg-[#F0F4F9]/60 font-semibold text-[#035096]' 
                                    : 'text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <span className="truncate">{rem}</span>
                                {rem === scheduleForm.reminder && <Icon icon="ri:check-line" className="w-3.5 h-3.5 text-[#035096] shrink-0" />}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section: Choose notification platform */}
                <div className="space-y-2 mt-4">
                  <label className="block text-xs font-semibold text-gray-700">Choose notification platform</label>
                  <div className="flex gap-2.5">
                    <button
                      type="button"
                      onClick={() => setScheduleForm({...scheduleForm, notificationPlatform: 'Whatsapp'})}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs cursor-pointer transition-all border ${
                        scheduleForm.notificationPlatform === 'Whatsapp'
                          ? 'bg-[#25D366] border-[#25D366] text-white shadow-sm'
                          : 'bg-white hover:bg-slate-50 border-gray-300 text-gray-700'
                      }`}
                    >
                      <Icon icon="ri:whatsapp-line" className="w-4 h-4" />
                      <span>Whatsapp</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setScheduleForm({...scheduleForm, notificationPlatform: 'Email'})}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs cursor-pointer transition-all border ${
                        scheduleForm.notificationPlatform === 'Email'
                          ? 'bg-[#1A91F0] border-[#1A91F0] text-white shadow-sm'
                          : 'bg-white hover:bg-slate-50 border-gray-300 text-gray-700'
                      }`}
                    >
                      <span className="font-semibold text-sm leading-none">@</span>
                      <span>Email</span>
                    </button>
                  </div>
                </div>

                {/* Section: Note */}
                <div className="space-y-1.5 mt-4">
                  <label className="block text-xs font-semibold text-gray-700">Note</label>
                  <textarea
                    rows={3}
                    placeholder="Enter notes about client preference..."
                    value={scheduleForm.note}
                    onChange={(e) => setScheduleForm({...scheduleForm, note: e.target.value})}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#035096] resize-none"
                  />
                </div>

              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-gray-150 flex items-center justify-between gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="bg-slate-200/80 hover:bg-slate-200 text-gray-700 font-semibold text-sm px-6 py-2 rounded-lg transition-colors cursor-pointer border border-slate-250 flex-1"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-[#035096] hover:bg-[#024076] text-white font-semibold text-sm px-6 py-2 rounded-lg transition-colors cursor-pointer flex-1"
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
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md border border-gray-200 shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-150 flex justify-between items-center bg-white">
              <h3 className="text-lg font-semibold text-gray-900 font-poppins">Reschedule Visit</h3>
              <button 
                onClick={() => {
                  setShowRescheduleModal(false);
                  setRescheduleLead(null);
                }}
                className="text-gray-400 hover:text-gray-650 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Icon icon="ri:close-line" className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleRescheduleSubmit} className="flex flex-col text-left">
              <div className="p-6 space-y-4">
                
                {/* Property Display */}
                <div>
                  <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Property</span>
                  <p className="text-sm font-medium text-gray-900 mt-0.5">{rescheduleLead.property}</p>
                </div>

                {/* New Date */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">New Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={rescheduleForm.newDate}
                      onChange={(e) => setRescheduleForm({...rescheduleForm, newDate: e.target.value})}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#035096]"
                    />
                  </div>
                </div>

                {/* New Time */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">New Time</label>
                  <div className="relative">
                    <input
                      type="time"
                      required
                      value={rescheduleForm.newTime}
                      onChange={(e) => setRescheduleForm({...rescheduleForm, newTime: e.target.value})}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#035096]"
                    />
                  </div>
                </div>

                {/* Reason */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Reason for Rescheduling</label>
                  <textarea
                    rows={3}
                    placeholder="Enter reason for rescheduling..."
                    value={rescheduleForm.reason}
                    onChange={(e) => setRescheduleForm({...rescheduleForm, reason: e.target.value})}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#035096] resize-none"
                  />
                </div>

              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-gray-150 flex items-center justify-between gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setShowRescheduleModal(false);
                    setRescheduleLead(null);
                  }}
                  className="bg-slate-200/80 hover:bg-slate-200 text-gray-700 font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors cursor-pointer border border-slate-250 flex-1 text-center font-poppins"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-[#035096] hover:bg-[#024076] text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors cursor-pointer flex-1 text-center font-poppins shadow-sm"
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

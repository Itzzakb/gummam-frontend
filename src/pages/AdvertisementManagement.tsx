import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
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

interface FeaturedProperty {
  id: string;
  propertyId: string;
  propertyName: string;
  category: string;
  agentName: string;
  featuredPosition: string;
  duration: string;
  status: string;
  revenue: string;
}

interface PropertyOption {
  propertyId: string;
  propertyName: string;
  category: string;
  agentName: string;
}

const PROPERTY_CATALOG: PropertyOption[] = [
  { propertyId: 'PRP001', propertyName: 'Luxury Apartment', category: 'Apartment', agentName: 'Rajesh Kumar' },
  { propertyId: 'PRP002', propertyName: '3 BHK Apartment in Tukkuguda', category: 'Apartment', agentName: 'Rajesh Kumar' },
  { propertyId: 'PRP003', propertyName: 'Penthouse Suite', category: 'Luxury', agentName: 'Priya Sharma' },
  { propertyId: 'PRP004', propertyName: '4 BHK Luxury Villa', category: 'Villa', agentName: 'Anjali Mehta' },
  { propertyId: 'PRP005', propertyName: 'Commercial Office Space', category: 'Commercial', agentName: 'Vikram Patel' },
  { propertyId: 'PRP006', propertyName: 'Gachibowli Plot', category: 'Land', agentName: 'Sneha Reddy' },
  { propertyId: 'PRP007', propertyName: 'Jubilee Hills Independent House', category: 'Residential', agentName: 'Arjun Nair' },
  { propertyId: 'PRP008', propertyName: 'Hitech City Studio', category: 'Apartment', agentName: 'Meera Iyer' },
  { propertyId: 'PRP009', propertyName: 'Kondapur Duplex', category: 'Residential', agentName: 'Rahul Sharma' },
  { propertyId: 'PRP010', propertyName: 'Madhapur Retail Shop', category: 'Commercial', agentName: 'Neha Kapoor' },
];

interface BannerAd {
  id: string;
  bannerName: string;
  agentName: string;
  featuredPosition: string;
  duration: string;
  status: string;
  revenue: string;
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
        left: rect.right + window.scrollX - 112, // width of dropdown is w-28 (112px)
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

export const AdvertisementManagement: React.FC = () => {
  // Stat periods
  const [periodTotalAds, setPeriodTotalAds] = useState('Last Month');
  const [periodActiveProm, setPeriodActiveProm] = useState('Last Month');
  const [periodFeaturedProp, setPeriodFeaturedProp] = useState('Last Month');
  const [periodBannerCampaigns, setPeriodBannerCampaigns] = useState('Last Month');
  const [periodAdRevenue, setPeriodAdRevenue] = useState('Last Month');
  const [periodAvgCtr, setPeriodAvgCtr] = useState('Last Month');

  // Sub tab navigation
  const [activeSubTab, setActiveSubTab] = useState<'featured' | 'banners'>('featured');

  // Modals state
  const [showCreateFeaturedModal, setShowCreateFeaturedModal] = useState(false);
  const [showCreateBannerModal, setShowCreateBannerModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: 'featured' | 'banner'; id: string } | null>(null);

  // Title Management list for Featured Property Dropdown
  const titleMgtOptions = [
    { id: 'ID - 001', label: 'Trending Homes You\'ll Love' },
    { id: 'ID - 002', label: 'Your Ultimate Hub for Hyderabad' },
    { id: 'ID - 003', label: 'New Launch' },
    { id: 'ID - 004', label: 'Prime Properties' },
    { id: 'ID - 005', label: 'Commercial Real Estate' }
  ];

  const [titleDropdownOpen, setTitleDropdownOpen] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleTriggerRef = useRef<HTMLButtonElement>(null);
  const [titleCoords, setTitleCoords] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (titleDropdownOpen && titleTriggerRef.current) {
      const rect = titleTriggerRef.current.getBoundingClientRect();
      setTitleCoords({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: Math.max(rect.width, 280)
      });
    }
  }, [titleDropdownOpen]);

  // Placement Options for Banner
  const placementOptions = [
    'Homepage Featured',
    'Homepage Top Banner',
    'Search Sidebar Ads',
    'Listing Footer Banner'
  ];
  const [placementDropdownOpen, setPlacementDropdownOpen] = useState(false);
  const placementRef = useRef<HTMLDivElement>(null);
  const placementTriggerRef = useRef<HTMLButtonElement>(null);
  const [placementCoords, setPlacementCoords] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (placementDropdownOpen && placementTriggerRef.current) {
      const rect = placementTriggerRef.current.getBoundingClientRect();
      setPlacementCoords({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }, [placementDropdownOpen]);

  // Form states for creating a Featured Property
  const [featuredForm, setFeaturedForm] = useState({
    propertyId: '',
    propertyName: '',
    agentName: '',
    startDate: '',
    endDate: '',
    pricing: '',
    titleId: 'ID - 001',
    category: '',
    status: 'Active'
  });
  const [propertyQuery, setPropertyQuery] = useState('');
  const [propertySuggestionsOpen, setPropertySuggestionsOpen] = useState(false);
  const propertySearchRef = useRef<HTMLDivElement>(null);

  // Form states for creating a Banner
  const [bannerForm, setBannerForm] = useState({
    bannerName: '',
    agentName: '',
    bannerTitle: '',
    landingPageUrl: '',
    ctaText: '',
    placement: 'Select Placement',
    startDate: '',
    endDate: '',
    price: '',
    status: 'Active'
  });

  // Mock initial Featured Properties
  const [featuredProperties, setFeaturedProperties] = useState<FeaturedProperty[]>([
    { id: 'FP1', propertyId: 'PRP001', propertyName: 'Luxury Apartment', category: 'Apartment', agentName: 'Rajesh Kumar', featuredPosition: 'Trending Homes You\'ll Love', duration: '30 Days', status: 'Active', revenue: '₹2500' },
    { id: 'FP2', propertyId: 'PRP002', propertyName: 'Luxury Apartment', category: 'Residential', agentName: 'Rajesh Kumar', featuredPosition: 'Trending Homes You\'ll Love', duration: '15 Days', status: 'Active', revenue: '₹2500' },
    { id: 'FP3', propertyId: 'PRP006', propertyName: 'Luxury Apartment', category: 'Land', agentName: 'Rajesh Kumar', featuredPosition: 'Trending Homes You\'ll Love', duration: '07 Days', status: 'Active', revenue: '₹2500' },
    { id: 'FP4', propertyId: 'PRP003', propertyName: 'Penthouse Suite', category: 'Luxury', agentName: 'Rajesh Kumar', featuredPosition: 'Trending Homes You\'ll Love', duration: '30 Days', status: 'Active', revenue: '₹2500' }
  ]);

  // Mock initial Banners
  const [bannerAds, setBannerAds] = useState<BannerAd[]>([
    { id: 'BA1', bannerName: 'Summer Promotion', agentName: 'Rajesh Kumar', featuredPosition: 'Homepage Featured', duration: '30 Days', status: 'Active', revenue: '₹2500' },
    { id: 'BA2', bannerName: 'Luxury Living Campaign', agentName: 'Rajesh Kumar', featuredPosition: 'Homepage Featured', duration: '15 Days', status: 'Active', revenue: '₹2500' },
    { id: 'BA3', bannerName: 'Summer Promotion', agentName: 'Rajesh Kumar', featuredPosition: 'Homepage Featured', duration: '07 Days', status: 'Active', revenue: '₹2500' },
    { id: 'BA4', bannerName: 'Summer Promotion', agentName: 'Rajesh Kumar', featuredPosition: 'Homepage Featured', duration: '30 Days', status: 'Active', revenue: '₹2500' }
  ]);

  // Close dropdowns clicking outside
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (titleRef.current && !titleRef.current.contains(e.target as Node)) {
        setTitleDropdownOpen(false);
      }
      if (placementRef.current && !placementRef.current.contains(e.target as Node)) {
        setPlacementDropdownOpen(false);
      }
      if (propertySearchRef.current && !propertySearchRef.current.contains(e.target as Node)) {
        setPropertySuggestionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const matchedProperties = PROPERTY_CATALOG.filter((p) => {
    const q = propertyQuery.trim().toLowerCase();
    if (!q) return false;
    return (
      p.propertyId.toLowerCase().includes(q) ||
      p.propertyName.toLowerCase().includes(q)
    );
  }).slice(0, 6);

  const selectPropertyOption = (option: PropertyOption) => {
    setFeaturedForm((prev) => ({
      ...prev,
      propertyId: option.propertyId,
      propertyName: option.propertyName,
      category: option.category,
      agentName: option.agentName,
    }));
    setPropertyQuery(`${option.propertyId} — ${option.propertyName}`);
    setPropertySuggestionsOpen(false);
  };

  const resetFeaturedForm = () => {
    setFeaturedForm({
      propertyId: '',
      propertyName: '',
      agentName: '',
      startDate: '',
      endDate: '',
      pricing: '',
      titleId: 'ID - 001',
      category: '',
      status: 'Active'
    });
    setPropertyQuery('');
    setPropertySuggestionsOpen(false);
  };

  const handleFeaturedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const activeTitle = titleMgtOptions.find(o => o.id === featuredForm.titleId)?.label || 'Featured Position';
    
    // Calculate dummy duration if dates selected
    let durationStr = '30 Days';
    if (featuredForm.startDate && featuredForm.endDate) {
      const diffTime = Math.abs(new Date(featuredForm.endDate).getTime() - new Date(featuredForm.startDate).getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      durationStr = `${diffDays < 10 ? '0' : ''}${diffDays} Days`;
    }

    const newFP: FeaturedProperty = {
      id: `FP${featuredProperties.length + 1}`,
      propertyId: featuredForm.propertyId || 'PRP000',
      propertyName: featuredForm.propertyName || 'Luxury Apartment',
      category: featuredForm.category || 'Apartment',
      agentName: featuredForm.agentName || 'Rajesh Kumar',
      featuredPosition: activeTitle,
      duration: durationStr,
      status: featuredForm.status,
      revenue: `₹${featuredForm.pricing || '2500'}`
    };

    setFeaturedProperties([...featuredProperties, newFP]);
    setShowCreateFeaturedModal(false);
    resetFeaturedForm();
  };

  const handleBannerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let durationStr = '30 Days';
    if (bannerForm.startDate && bannerForm.endDate) {
      const diffTime = Math.abs(new Date(bannerForm.endDate).getTime() - new Date(bannerForm.startDate).getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      durationStr = `${diffDays < 10 ? '0' : ''}${diffDays} Days`;
    }

    const newBA: BannerAd = {
      id: `BA${bannerAds.length + 1}`,
      bannerName: bannerForm.bannerName || 'Summer Promotion',
      agentName: bannerForm.agentName || 'Rajesh Kumar',
      featuredPosition: bannerForm.placement === 'Select Placement' ? 'Homepage Featured' : bannerForm.placement,
      duration: durationStr,
      status: bannerForm.status,
      revenue: `₹${bannerForm.price || '2500'}`
    };

    setBannerAds([...bannerAds, newBA]);
    setShowCreateBannerModal(false);
    // Reset Form
    setBannerForm({
      bannerName: '',
      agentName: '',
      bannerTitle: '',
      landingPageUrl: '',
      ctaText: '',
      placement: 'Select Placement',
      startDate: '',
      endDate: '',
      price: '',
      status: 'Active'
    });
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* ================= HEADER SECTION ================= */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Advertisement Management</h1>
        <p className="text-xs font-medium text-slate-500 mt-1">
          Manage property promotions, featured listings, advertising campaigns, and revenue-generating placements.
        </p>
      </div>

      {/* ================= KPI CARDS GRID (2 ROWS OF 3 COLUMNS) ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Advertisements */}
        <div className="bg-white border border-[#dddddd] rounded-[16px] p-4 flex flex-col justify-between min-h-[140px] shadow-none">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500">Total Advertisements</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-2xl font-bold text-slate-900 leading-none">1,248</span>
            <div className="flex justify-between items-center mt-3">
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>+ 8.02%</span>
              </span>
              <PeriodDropdown value={periodTotalAds} onChange={setPeriodTotalAds} />
            </div>
          </div>
        </div>

        {/* Active Promotions */}
        <div className="bg-white border border-[#dddddd] rounded-[16px] p-4 flex flex-col justify-between min-h-[140px] shadow-none">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500">Active Promotions</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-[#0F8043]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-2xl font-bold text-slate-900 leading-none">347</span>
            <div className="flex justify-between items-center mt-3">
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>+ 8.02%</span>
              </span>
              <PeriodDropdown value={periodActiveProm} onChange={setPeriodActiveProm} />
            </div>
          </div>
        </div>

        {/* Featured Properties */}
        <div className="bg-white border border-[#dddddd] rounded-[16px] p-4 flex flex-col justify-between min-h-[140px] shadow-none">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500">Featured Properties</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-650">
              <Star className="w-4 h-4" />
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-2xl font-bold text-slate-900 leading-none">89</span>
            <div className="flex justify-between items-center mt-3">
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>+ 8.02%</span>
              </span>
              <PeriodDropdown value={periodFeaturedProp} onChange={setPeriodFeaturedProp} />
            </div>
          </div>
        </div>

        {/* Banner Campaigns */}
        <div className="bg-white border border-[#dddddd] rounded-[16px] p-4 flex flex-col justify-between min-h-[140px] shadow-none">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500">Banner Campaigns</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-2xl font-bold text-slate-900 leading-none">42</span>
            <div className="flex justify-between items-center mt-3">
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>+ 8.02%</span>
              </span>
              <PeriodDropdown value={periodBannerCampaigns} onChange={setPeriodBannerCampaigns} />
            </div>
          </div>
        </div>

        {/* Advertisement Revenue */}
        <div className="bg-white border border-[#dddddd] rounded-[16px] p-4 flex flex-col justify-between min-h-[140px] shadow-none">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500">Advertisement Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-650">
              <Info className="w-4 h-4" />
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-2xl font-bold text-slate-900 leading-none">₹8.75 Lakhs</span>
            <div className="flex justify-between items-center mt-3">
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>+ 8.02%</span>
              </span>
              <PeriodDropdown value={periodAdRevenue} onChange={setPeriodAdRevenue} />
            </div>
          </div>
        </div>

        {/* Average CTR */}
        <div className="bg-white border border-[#dddddd] rounded-[16px] p-4 flex flex-col justify-between min-h-[140px] shadow-none">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500">Average CTR</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-650">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-2xl font-bold text-slate-900 leading-none">3.8%</span>
            <div className="flex justify-between items-center mt-3">
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>+ 8.02%</span>
              </span>
              <PeriodDropdown value={periodAvgCtr} onChange={setPeriodAvgCtr} />
            </div>
          </div>
        </div>
      </div>

      {/* ================= SUB TAB TOGGLER BAR ================= */}
      <div className="flex border border-[#dddddd] rounded-[8px] overflow-hidden w-full bg-white p-1">
        <button
          onClick={() => setActiveSubTab('featured')}
          className={`flex-1 py-3 text-sm font-semibold rounded-[6px] transition-colors cursor-pointer text-center ${
            activeSubTab === 'featured'
              ? 'bg-[#035096] text-white shadow-xs'
              : 'bg-transparent text-slate-500 hover:bg-slate-50'
          }`}
        >
          Featured Properties
        </button>
        <button
          onClick={() => setActiveSubTab('banners')}
          className={`flex-1 py-3 text-sm font-semibold rounded-[6px] transition-colors cursor-pointer text-center ${
            activeSubTab === 'banners'
              ? 'bg-[#035096] text-white shadow-xs'
              : 'bg-transparent text-slate-500 hover:bg-slate-50'
          }`}
        >
          Banner Ads
        </button>
      </div>

      {/* ================= SUB TAB 1: FEATURED PROPERTIES ================= */}
      {activeSubTab === 'featured' && (
        <div className="space-y-3">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Featured Property Management</h3>
              <p className="text-[11px] font-medium text-slate-500">Manage featured property listings displayed across the platform</p>
            </div>
            <button
              onClick={() => setShowCreateFeaturedModal(true)}
              className="h-10 px-4 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[8px] flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add Featured Property</span>
            </button>
          </div>

          <div className="bg-white rounded-[16px] overflow-hidden border border-[#dddddd] shadow-none">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs text-slate-700 font-medium">
                <thead>
                  <tr className="bg-[#F0F2F3] border-b border-[#dddddd] text-xs font-semibold text-slate-700">
                    <th className="p-4 pl-6 min-w-[100px] whitespace-nowrap">Property ID</th>
                    <th className="p-4 min-w-[140px] whitespace-nowrap">Property Name</th>
                    <th className="p-4 min-w-[100px] whitespace-nowrap">Category</th>
                    <th className="p-4 min-w-[110px] whitespace-nowrap">Agent Name</th>
                    <th className="p-4 min-w-[160px] whitespace-nowrap">Title List</th>
                    <th className="p-4 min-w-[90px] whitespace-nowrap">Duration</th>
                    <th className="p-4 min-w-[90px] whitespace-nowrap">Status</th>
                    <th className="p-4 min-w-[90px] whitespace-nowrap">Revenue</th>
                    <th className="p-4 pr-6 text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dddddd]">
                  {featuredProperties.map((prop) => (
                    <tr key={prop.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="p-4 pl-6 font-semibold text-[#035096] whitespace-nowrap">{prop.propertyId}</td>
                      <td className="p-4 font-semibold text-slate-900 whitespace-nowrap">{prop.propertyName}</td>
                      <td className="p-4 text-slate-650 whitespace-nowrap">{prop.category}</td>
                      <td className="p-4 text-slate-655 whitespace-nowrap">{prop.agentName}</td>
                      <td className="p-4 whitespace-nowrap">
                        <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-[5px] px-2.5 py-0.5 text-[10px] font-semibold whitespace-nowrap">
                          {prop.featuredPosition}
                        </span>
                      </td>
                      <td className="p-4 text-slate-500 font-semibold whitespace-nowrap">{prop.duration}</td>
                      <td className="p-4 whitespace-nowrap">
                        <span className="text-emerald-600 font-semibold bg-emerald-50 border border-emerald-250 px-2.5 py-0.5 rounded-[5px] text-[10px] whitespace-nowrap">
                          {prop.status}
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-slate-900 whitespace-nowrap">{prop.revenue}</td>
                      <td className="p-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="w-8 h-8 rounded-[5px] hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-700 transition cursor-pointer">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm({ type: 'featured', id: prop.id })}
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
        </div>
      )}

      {/* ================= SUB TAB 2: BANNER ADS ================= */}
      {activeSubTab === 'banners' && (
        <div className="space-y-3">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Banner Advertisement Management</h3>
              <p className="text-[11px] font-medium text-slate-500">Manage website banner advertisements and campaigns</p>
            </div>
            <button
              onClick={() => setShowCreateBannerModal(true)}
              className="h-10 px-4 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[8px] flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add Banner</span>
            </button>
          </div>

          <div className="bg-white rounded-[16px] overflow-hidden border border-[#dddddd] shadow-none">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs text-slate-700 font-medium">
                <thead>
                  <tr className="bg-[#F0F2F3] border-b border-[#dddddd] text-xs font-semibold text-slate-700">
                    <th className="p-4 pl-6 min-w-[140px] whitespace-nowrap">Banner Name</th>
                    <th className="p-4 min-w-[110px] whitespace-nowrap">Agent Name</th>
                    <th className="p-4 min-w-[160px] whitespace-nowrap">Featured Position</th>
                    <th className="p-4 min-w-[90px] whitespace-nowrap">Duration</th>
                    <th className="p-4 min-w-[90px] whitespace-nowrap">Status</th>
                    <th className="p-4 min-w-[90px] whitespace-nowrap">Revenue</th>
                    <th className="p-4 pr-6 text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dddddd]">
                  {bannerAds.map((ban) => (
                    <tr key={ban.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="p-4 pl-6 font-semibold text-slate-900 whitespace-nowrap">{ban.bannerName}</td>
                      <td className="p-4 text-slate-650 whitespace-nowrap">{ban.agentName}</td>
                      <td className="p-4 whitespace-nowrap">
                        <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-[5px] px-2.5 py-0.5 text-[10px] font-semibold whitespace-nowrap">
                          {ban.featuredPosition}
                        </span>
                      </td>
                      <td className="p-4 text-slate-500 font-semibold whitespace-nowrap">{ban.duration}</td>
                      <td className="p-4 whitespace-nowrap">
                        <span className="text-emerald-600 font-semibold bg-emerald-50 border border-emerald-250 px-2.5 py-0.5 rounded-[5px] text-[10px] whitespace-nowrap">
                          {ban.status}
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-slate-900 whitespace-nowrap">{ban.revenue}</td>
                      <td className="p-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="w-8 h-8 rounded-[5px] hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-700 transition cursor-pointer">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm({ type: 'banner', id: ban.id })}
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
        </div>
      )}

      {/* ================= MODAL: CREATE FEATURED PROPERTY ================= */}
      {showCreateFeaturedModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-[1000] p-4">
          <div className="bg-white w-full max-w-[460px] rounded-[5px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Create Featured Property</h2>
              <button
                onClick={() => {
                  setShowCreateFeaturedModal(false);
                  resetFeaturedForm();
                }}
                className="w-8 h-8 rounded-[5px] hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleFeaturedSubmit} className="flex flex-col overflow-hidden">
              <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-600">
                <div className="grid grid-cols-2 gap-3">
                  <div ref={propertySearchRef} className="relative">
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Property Name / ID</label>
                    <input
                      type="text"
                      required
                      autoComplete="off"
                      placeholder="Search by ID or name"
                      value={propertyQuery}
                      onFocus={() => {
                        if (propertyQuery.trim()) setPropertySuggestionsOpen(true);
                      }}
                      onChange={(e) => {
                        const value = e.target.value;
                        setPropertyQuery(value);
                        setPropertySuggestionsOpen(value.trim().length > 0);
                        setFeaturedForm((prev) => ({
                          ...prev,
                          propertyId: '',
                          propertyName: value,
                        }));
                      }}
                      className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                    />
                    {propertySuggestionsOpen && matchedProperties.length > 0 && (
                      <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-[5px] shadow-lg z-20 max-h-44 overflow-y-auto py-1">
                        {matchedProperties.map((option) => (
                          <button
                            key={option.propertyId}
                            type="button"
                            onClick={() => selectPropertyOption(option)}
                            className="w-full text-left px-3 py-2 hover:bg-[#F0F7FF] transition-colors cursor-pointer"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[11px] font-semibold text-slate-800 truncate">
                                {option.propertyName}
                              </span>
                              <span className="text-[10px] font-semibold text-[#035096] shrink-0">
                                {option.propertyId}
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-500 mt-0.5">
                              {option.category} · {option.agentName}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                    {propertySuggestionsOpen && propertyQuery.trim() && matchedProperties.length === 0 && (
                      <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-[5px] shadow-lg z-20 px-3 py-2 text-[10px] text-slate-500">
                        No matching properties found
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Agent Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={featuredForm.agentName}
                      onChange={(e) => setFeaturedForm({...featuredForm, agentName: e.target.value})}
                      className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Start Date</label>
                    <input
                      type="date"
                      required
                      value={featuredForm.startDate}
                      onChange={(e) => setFeaturedForm({...featuredForm, startDate: e.target.value})}
                      className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">End Date</label>
                    <input
                      type="date"
                      required
                      value={featuredForm.endDate}
                      onChange={(e) => setFeaturedForm({...featuredForm, endDate: e.target.value})}
                      className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Pricing</label>
                    <div className="relative flex items-center">
                      <span className="absolute left-2.5 text-slate-400 font-semibold text-xs">₹</span>
                      <input
                        type="number"
                        required
                        placeholder="Pricing"
                        value={featuredForm.pricing}
                        onChange={(e) => setFeaturedForm({...featuredForm, pricing: e.target.value})}
                        className="w-full h-8 pl-6 pr-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                      />
                    </div>
                  </div>
                  <div ref={titleRef}>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Title Mgt.</label>
                    <div className="relative">
                      <button
                        ref={titleTriggerRef}
                        type="button"
                        onClick={() => setTitleDropdownOpen(!titleDropdownOpen)}
                        className="w-full bg-white border border-slate-200 rounded-[5px] h-8 px-2.5 text-xs text-slate-700 flex items-center justify-between hover:border-slate-350 cursor-pointer"
                      >
                        <span className="truncate">{featuredForm.titleId}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      </button>
                      {titleDropdownOpen && createPortal(
                        <div
                          className="bg-white border border-slate-200 rounded-[5px] shadow-lg z-[9999] py-1 max-h-48 overflow-y-auto"
                          style={{
                            position: 'absolute',
                            top: titleCoords.top,
                            left: titleCoords.left,
                            width: titleCoords.width
                          }}
                        >
                          {titleMgtOptions.map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => {
                                setFeaturedForm({...featuredForm, titleId: opt.id});
                                setTitleDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-1.5 text-[10px] transition-colors flex items-center justify-between cursor-pointer ${
                                opt.id === featuredForm.titleId
                                  ? 'bg-[#F0F4F9]/60 font-semibold text-[#035096]'
                                  : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <span>{opt.id} &nbsp; {opt.label}</span>
                              {opt.id === featuredForm.titleId && (
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

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Category</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apartment"
                      value={featuredForm.category}
                      onChange={(e) => setFeaturedForm({...featuredForm, category: e.target.value})}
                      className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Status</label>
                    <span className="text-emerald-600 font-semibold bg-emerald-50 border border-emerald-250 px-3 py-1 rounded-[5px] text-[10px] inline-block mt-0.5">
                      {featuredForm.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-100 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateFeaturedModal(false);
                    resetFeaturedForm();
                  }}
                  className="flex-1 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-[5px] cursor-pointer"
                >
                  Cancel
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

      {/* ================= MODAL: CREATE BANNER ================= */}
      {showCreateBannerModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-[1000] p-4">
          <div className="bg-white w-full max-w-[460px] rounded-[5px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Create Banner</h2>
              <button
                onClick={() => setShowCreateBannerModal(false)}
                className="w-8 h-8 rounded-[5px] hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleBannerSubmit} className="flex flex-col overflow-hidden">
              <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-600">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Banner Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter banner name"
                      value={bannerForm.bannerName}
                      onChange={(e) => setBannerForm({...bannerForm, bannerName: e.target.value})}
                      className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Agent Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter agent name"
                      value={bannerForm.agentName}
                      onChange={(e) => setBannerForm({...bannerForm, agentName: e.target.value})}
                      className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Banner Title</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter banner title"
                      value={bannerForm.bannerTitle}
                      onChange={(e) => setBannerForm({...bannerForm, bannerTitle: e.target.value})}
                      className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Landing Page URL</label>
                    <input
                      type="text"
                      required
                      placeholder="Example.com"
                      value={bannerForm.landingPageUrl}
                      onChange={(e) => setBannerForm({...bannerForm, landingPageUrl: e.target.value})}
                      className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">CTA Button Text</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Buy now"
                      value={bannerForm.ctaText}
                      onChange={(e) => setBannerForm({...bannerForm, ctaText: e.target.value})}
                      className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                    />
                  </div>
                  <div ref={placementRef}>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Placement</label>
                    <div className="relative">
                      <button
                        ref={placementTriggerRef}
                        type="button"
                        onClick={() => setPlacementDropdownOpen(!placementDropdownOpen)}
                        className="w-full bg-white border border-slate-200 rounded-[5px] h-8 px-2.5 text-xs text-slate-700 flex items-center justify-between hover:border-slate-350 cursor-pointer"
                      >
                        <span className="truncate">{bannerForm.placement}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      </button>
                      {placementDropdownOpen && createPortal(
                        <div
                          className="bg-white border border-slate-200 rounded-[5px] shadow-lg z-[9999] py-1 max-h-36 overflow-y-auto"
                          style={{
                            position: 'absolute',
                            top: placementCoords.top,
                            left: placementCoords.left,
                            width: placementCoords.width
                          }}
                        >
                          {placementOptions.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => {
                                setBannerForm({...bannerForm, placement: opt});
                                setPlacementDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                                opt === bannerForm.placement
                                  ? 'bg-[#F0F4F9]/60 font-semibold text-[#035096]'
                                  : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <span>{opt}</span>
                              {opt === bannerForm.placement && (
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

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Start Date</label>
                    <input
                      type="date"
                      required
                      value={bannerForm.startDate}
                      onChange={(e) => setBannerForm({...bannerForm, startDate: e.target.value})}
                      className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">End Date</label>
                    <input
                      type="date"
                      required
                      value={bannerForm.endDate}
                      onChange={(e) => setBannerForm({...bannerForm, endDate: e.target.value})}
                      className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">Price</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-2.5 text-slate-400 font-semibold text-xs">₹</span>
                    <input
                      type="number"
                      required
                      placeholder="Pricing"
                      value={bannerForm.price}
                      onChange={(e) => setBannerForm({...bannerForm, price: e.target.value})}
                      className="w-full h-8 pl-6 pr-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                    />
                  </div>
                </div>

                {/* Banner Image upload area */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">Banner Image</label>
                  <div className="border border-dashed border-slate-300 rounded-[5px] p-6 text-center hover:bg-slate-50/50 cursor-pointer flex flex-col items-center gap-1.5 transition">
                    <Upload className="w-5 h-5 text-slate-400" />
                    <span className="text-[10px] font-semibold text-slate-500">Click to upload or drag and drop</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-100 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateBannerModal(false)}
                  className="flex-1 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-[5px] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => alert("Saved as draft")}
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
              Are you sure you want to delete this {deleteConfirm.type === 'featured' ? 'Featured Property' : 'Banner Ad'}? This action cannot be undone.
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
                  if (deleteConfirm.type === 'featured') {
                    setFeaturedProperties(featuredProperties.filter((f) => f.id !== deleteConfirm.id));
                  } else {
                    setBannerAds(bannerAds.filter((b) => b.id !== deleteConfirm.id));
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

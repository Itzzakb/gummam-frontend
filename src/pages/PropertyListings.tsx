import React, { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  MapPin,
  Maximize2,
  Calendar,
  Users,
  CheckCircle,
  X,
  FileImage,
  Star,
  Award,
  Sparkles,
  Share2,
  MoreVertical,
  HelpCircle,
  Info,
  Sliders,
  ChevronDown,
  TrendingUp,
  Home,
  Zap,
  Pencil,
  ImagePlus,
  Trophy,
  ShieldCheck
} from 'lucide-react';


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
  accentColor = '#035096'
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
        className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none outline-none accent-[#035096] z-20"
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
          background: #035096;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        input[type="range"]::-moz-range-thumb {
          pointer-events: auto;
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: #035096;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
};

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  priceRaw: number;
  area: string;
  status: 'Active' | 'Pending' | 'Sold' | 'Expired';
  image: string;
  images: string[];
  qualityScore: number;
  lastAdded: string;
  leads: number;
  occupancyDate: string;
  validUntil: string;
  sector: 'Residential' | 'Commercial';
  propertyType: string;
  locality: string;
  project: string;
}

const mockProperties: Property[] = [
  {
    id: 'PRP001',
    title: '3 BHK Apartment in Tukkuguda',
    location: 'EAPL Sri tirumala fortune, Hyderabad',
    price: '₹ 1.00Cr',
    priceRaw: 10000000,
    area: '1500 sq.ft.',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=60',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=60'
    ],
    qualityScore: 10,
    lastAdded: '19 May 2026',
    leads: 2,
    occupancyDate: '31 Mar 2029',
    validUntil: '18 Jul 2026',
    sector: 'Residential',
    propertyType: 'Apartment',
    locality: 'Tukkuguda',
    project: 'EAPL Sri tirumala fortune'
  },
  {
    id: 'PRP002',
    title: '3 BHK Apartment in Tukkuguda',
    location: 'EAPL Sri tirumala fortune, Hyderabad',
    price: '₹ 1.00Cr',
    priceRaw: 10000000,
    area: '1500 sq.ft.',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=60',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=60'
    ],
    qualityScore: 10,
    lastAdded: '19 May 2026',
    leads: 2,
    occupancyDate: '31 Mar 2029',
    validUntil: '18 Jul 2026',
    sector: 'Residential',
    propertyType: 'Apartment',
    locality: 'Tukkuguda',
    project: 'EAPL Sri tirumala fortune'
  },
  {
    id: 'PRP003',
    title: '3 BHK Apartment in Tukkuguda',
    location: 'EAPL Sri tirumala fortune, Hyderabad',
    price: '₹ 1.00Cr',
    priceRaw: 10000000,
    area: '1500 sq.ft.',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=60',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=60'
    ],
    qualityScore: 10,
    lastAdded: '19 May 2026',
    leads: 2,
    occupancyDate: '31 Mar 2029',
    validUntil: '18 Jul 2026',
    sector: 'Residential',
    propertyType: 'Apartment',
    locality: 'Tukkuguda',
    project: 'EAPL Sri tirumala fortune'
  },
  {
    id: 'PRP004',
    title: '4 BHK Luxury Villa',
    location: 'Gachibowli, Hyderabad',
    price: '₹ 4.50Cr',
    priceRaw: 45000000,
    area: '3800 sq.ft.',
    status: 'Pending',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&auto=format&fit=crop&q=60',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&auto=format&fit=crop&q=60'
    ],
    qualityScore: 8,
    lastAdded: '10 May 2026',
    leads: 0,
    occupancyDate: '01 Jan 2028',
    validUntil: '30 May 2026',
    sector: 'Residential',
    propertyType: 'Villa',
    locality: 'Gachibowli',
    project: 'Luxury Villa project'
  },
  {
    id: 'PRP005',
    title: 'Commercial Office Space',
    location: 'Madhapur, Hitech City, Hyderabad',
    price: '₹ 6.20Cr',
    priceRaw: 62000000,
    area: '5400 sq.ft.',
    status: 'Sold',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=60',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=60'
    ],
    qualityScore: 9,
    lastAdded: '15 Apr 2026',
    leads: 14,
    occupancyDate: 'Ready to Move',
    validUntil: '15 Oct 2026',
    sector: 'Commercial',
    propertyType: 'Office Space',
    locality: 'Madhapur',
    project: 'Tech Park'
  },
  {
    id: 'PRP006',
    title: 'Plot in Shadnagar',
    location: 'Shadnagar Phase-2, Hyderabad',
    price: '₹ 45.00L',
    priceRaw: 4500000,
    area: '2400 sq.ft.',
    status: 'Expired',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=60',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=60'
    ],
    qualityScore: 5,
    lastAdded: '01 Jan 2026',
    leads: 1,
    occupancyDate: 'Immediate',
    validUntil: '01 Jun 2026',
    sector: 'Residential',
    propertyType: 'Plot',
    locality: 'Shadnagar',
    project: 'Shadnagar Phase-2'
  }
];

export const PropertyListings: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [selectedStatusTab, setSelectedStatusTab] = useState<'Active' | 'Pending' | 'Sold' | 'Expired'>('Active');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals / Panels States
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  // Filter form states
  const [filterSector, setFilterSector] = useState<string>('All');
  const [filterLeadStatus, setFilterLeadStatus] = useState<string>('Open');
  const [filterFollowUpDate, setFilterFollowUpDate] = useState<string>('Today');
  const [filterLocality, setFilterLocality] = useState('');
  const [filterProject, setFilterProject] = useState('');
  const [filterPropertyType, setFilterPropertyType] = useState<string>('Apartment');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [filterMinPrice, setFilterMinPrice] = useState<number>(500000);
  const [filterMaxPrice, setFilterMaxPrice] = useState<number>(10000000);
  const [filterPriceSlider, setFilterPriceSlider] = useState<number>(500000);

  // Helper counts
  const countByStatus = (status: 'Active' | 'Pending' | 'Sold' | 'Expired') => {
    return properties.filter(p => p.status === status).length;
  };

  // Filter trigger handler
  const handleApplyFilters = () => {
    let filtered = [...mockProperties];
    
    if (filterSector !== 'All') {
      filtered = filtered.filter(p => p.sector === filterSector);
    }
    if (filterLocality) {
      filtered = filtered.filter(p => p.locality.toLowerCase().includes(filterLocality.toLowerCase()));
    }
    if (filterProject) {
      filtered = filtered.filter(p => p.project.toLowerCase().includes(filterProject.toLowerCase()));
    }
    if (filterPropertyType) {
      filtered = filtered.filter(p => p.propertyType === filterPropertyType);
    }
    filtered = filtered.filter(p => p.priceRaw >= filterMinPrice && p.priceRaw <= filterMaxPrice);

    setProperties(filtered);
    setShowFiltersPanel(false);
  };

  const handleResetFilters = () => {
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
    setFilterPriceSlider(500000);
    setProperties(mockProperties);
    setShowFiltersPanel(false);
  };

  const handleEditClick = (property: Property) => {
    setSelectedProperty(property);
    setShowEditModal(true);
  };

  const handleDeactivate = (id: string) => {
    setProperties(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, status: p.status === 'Active' ? 'Expired' : 'Active' };
      }
      return p;
    }));
  };

  const displayProperties = properties
    .filter(p => p.status === selectedStatusTab)
    .filter(p => 
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="bg-white rounded-[5px] border border-gray-200/60 p-6 md:p-8 shadow-sm space-y-6 animate-fade-in font-poppins text-left">
      
      {/* ================= HEADER SECTION ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-left">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#0B2C5C] tracking-tight">Property Listings</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">Manage and showcase all your property listings</p>
        </div>
        <button className="bg-[#035096] hover:bg-[#024076] text-white font-medium text-sm px-5 py-2.5 rounded-lg inline-flex items-center gap-2 transition-colors cursor-pointer shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Add New Property</span>
        </button>
      </div>

      {/* ================= SEARCH & FILTER CONTROLS ================= */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by property ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#035096] transition-colors"
          />
        </div>
        <div className="relative">
          <button 
            onClick={() => setShowFiltersPanel(!showFiltersPanel)}
            className="w-full md:w-auto bg-[#035096] text-white hover:bg-[#024076] border border-transparent rounded-lg px-5 py-2.5 text-sm font-medium inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showFiltersPanel ? 'rotate-180' : ''}`} />
          </button>

          {/* Filters Dropdown Overlay Panel */}
          {showFiltersPanel && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden flex flex-col font-poppins animate-fade-in">
              {/* Header */}
              <div className="px-5 py-4 border-b border-gray-150 flex items-center justify-between">
                <span className="font-semibold text-gray-900 text-sm">Filters</span>
                <button 
                  onClick={() => setShowFiltersPanel(false)}
                  className="text-gray-400 hover:text-gray-650 transition-colors text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="p-5 space-y-5 max-h-[360px] overflow-y-auto">
                
                {/* Sector */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">Sector</h4>
                  <div className="flex flex-col gap-2">
                    {['All', 'Residential', 'Commercial'].map((sec) => (
                      <label key={sec} className="flex items-center gap-2 text-xs text-gray-655 cursor-pointer font-medium">
                        <input
                          type="radio"
                          name="sector"
                          checked={filterSector === sec}
                          onChange={() => setFilterSector(sec)}
                          className="w-4 h-4 text-[#035096] focus:ring-[#035096] border-gray-300"
                        />
                        <span>{sec}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Lead Status */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">Lead Status</h4>
                  <div className="flex flex-col gap-2">
                    {['Open', 'Closed', 'Pending', 'Followup / Callback', 'Rejected'].map((status) => (
                      <label key={status} className="flex items-center gap-2 text-xs text-gray-655 cursor-pointer font-medium">
                        <input
                          type="radio"
                          name="leadstatus"
                          checked={filterLeadStatus === status}
                          onChange={() => setFilterLeadStatus(status)}
                          className="w-4 h-4 text-[#035096] focus:ring-[#035096] border-gray-300"
                        />
                        <span>{status}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Follow Up Date */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">Follow Up Date</h4>
                  <div className="flex flex-col gap-2">
                    {['Today', 'Tomorrow', 'Past Dated', 'Custom Date'].map((dateOpt) => (
                      <label key={dateOpt} className="flex items-center gap-2 text-xs text-gray-655 cursor-pointer font-medium">
                        <input
                          type="radio"
                          name="followupdate"
                          checked={filterFollowUpDate === dateOpt}
                          onChange={() => setFilterFollowUpDate(dateOpt)}
                          className="w-4 h-4 text-[#035096] focus:ring-[#035096] border-gray-300"
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
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter locality here"
                      value={filterLocality}
                      onChange={(e) => setFilterLocality(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#035096]"
                    />
                  </div>
                </div>

                {/* Projects */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">Projects</h4>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter projects here"
                      value={filterProject}
                      onChange={(e) => setFilterProject(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#035096]"
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
                          className="w-4 h-4 text-[#035096] focus:ring-[#035096] border-gray-300"
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
                        className="border border-gray-200 rounded-lg px-2.5 py-1 text-[10px] text-gray-700 bg-white"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-400 font-bold mb-1">End Date</span>
                      <input
                        type="date"
                        value={filterEndDate}
                        onChange={(e) => setFilterEndDate(e.target.value)}
                        className="border border-gray-200 rounded-lg px-2.5 py-1 text-[10px] text-gray-700 bg-white"
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
                        className="w-full bg-white border border-gray-200 rounded-lg pl-8 pr-2 py-1 text-[10px] font-semibold text-gray-800"
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
                        className="w-full bg-white border border-gray-200 rounded-lg pl-8 pr-2 py-1 text-[10px] font-semibold text-gray-800"
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
                      accentColor="#035096"
                    />
                    <div className="flex justify-between text-[9px] text-gray-400 font-bold mt-1">
                      <span>₹ {(500000).toLocaleString('en-IN')}</span>
                      <span>₹ {(100000000).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Actions Footer */}
              <div className="px-5 py-4 bg-slate-50 border-t border-gray-150 flex items-center gap-3">
                <button
                  onClick={handleResetFilters}
                  className="flex-1 px-4 py-2 bg-white border border-gray-200 text-gray-800 text-xs font-semibold rounded-[8px] hover:bg-slate-55 transition-colors shadow-xs cursor-pointer"
                >
                  Reset
                </button>
                <button
                  onClick={handleApplyFilters}
                  className="flex-1 px-4 py-2 bg-[#035096] hover:bg-[#024076] text-white text-xs font-semibold rounded-[8px] transition-colors shadow-xs cursor-pointer"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-100 scrollbar-none">
        <span className="text-sm font-semibold text-[#0B2C5C] mr-4 whitespace-nowrap">Property listings</span>
        <div className="flex gap-2">
          {(['Active', 'Pending', 'Sold', 'Expired'] as const).map((status) => {
            const isActive = selectedStatusTab === status;
            const count = countByStatus(status);
            const countString = count.toString().padStart(2, '0');
            return (
              <button
                key={status}
                onClick={() => setSelectedStatusTab(status)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-[4px] text-xs whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#EBF3FE] text-[#035096] font-semibold'
                    : 'bg-[#F1F5F9] text-gray-700 hover:bg-gray-200/70'
                }`}
              >
                <span>{status}</span>
                <span className="font-semibold">{countString}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Showing count indicator */}
      <div className="text-xs md:text-sm text-[#585858]" style={{ fontWeight: 400 }}>
        Showing {displayProperties.length.toString().padStart(2, '0')} properties
      </div>

      {/* ================= PROPERTY CARDS GRID ================= */}
      {displayProperties.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center shadow-sm">
          <p className="text-gray-500 font-medium">No properties found matching the selected filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-[24px] overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between">
              
              {/* Image with badges */}
              <div className="relative h-56 w-full bg-slate-100">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Active Status Badge */}
                <span className="absolute top-3 left-3 text-[10px] font-bold text-white px-3.5 py-1 rounded-[14px] uppercase tracking-wider bg-[#0F925E]">
                  {property.status}
                </span>

                {/* Photos Count Badge */}
                <span className="absolute top-3 right-3 text-[10px] font-semibold text-white bg-black/60 px-3 py-1 rounded-[14px] backdrop-blur-[2px]">
                  1/{property.images.length + 6}
                </span>
              </div>

              {/* Card Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-gray-900 leading-snug font-poppins text-left">{property.title}</h3>
                  
                  <div className="flex items-center gap-1.5 text-xs mt-1.5 font-poppins font-light text-left" style={{ color: '#7A7A7A' }}>
                    <MapPin className="w-4 h-4 shrink-0" style={{ color: '#7A7A7A' }} strokeWidth={1.5} />
                    <span className="truncate">{property.location}</span>
                  </div>

                  {/* Price & Area row */}
                  <div className="border border-gray-200 rounded-xl p-3.5 mt-4 flex items-center justify-between bg-white">
                    <div className="flex items-center justify-center flex-1 text-center font-bold text-lg text-[#0F925E]">
                      {property.price}
                    </div>
                    <div className="w-[1px] h-8 bg-gray-200"></div>
                    <div className="flex items-center justify-center flex-1 gap-2 text-gray-950 font-bold text-sm text-center">
                      <svg className="w-5 h-5 text-[#0F925E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="5" width="14" height="14" rx="2" />
                        <path d="M5 9h14M9 5v14" />
                      </svg>
                      <span>{property.area}</span>
                    </div>
                  </div>

                  {/* Metrics Table / Grid */}
                  <div className="grid grid-cols-3 border border-gray-200 rounded-xl mt-4 bg-white p-3 divide-x divide-gray-200">
                    <div className="flex flex-col items-center justify-center text-center px-1">
                      <span className="text-[9px] font-medium leading-tight text-center" style={{ color: '#7A7A7A' }}>Listing Quality Score</span>
                      <div className="flex items-center justify-center gap-1.5 mt-2">
                        <span className="border border-[#0F925E] text-[#0F925E] bg-green-100 text-[10px] font-bold rounded-[4px] px-1.5 py-0.5 flex items-center justify-center">
                          {property.qualityScore}
                        </span>
                        <Info className="w-3.5 h-3.5 cursor-help" style={{ color: '#7A7A7A' }} />
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center text-center px-1">
                      <span className="text-[9px] font-medium leading-tight" style={{ color: '#7A7A7A' }}>Last Added</span>
                      <div className="flex items-center justify-center gap-1.5 mt-2.5 text-gray-700 font-semibold text-[10px]">
                        <Calendar className="w-3.5 h-3.5" style={{ color: '#7A7A7A' }} />
                        <span>{property.lastAdded}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center text-center px-1">
                      <span className="text-[9px] font-medium leading-tight" style={{ color: '#7A7A7A' }}>Leads</span>
                      <div className="flex items-center justify-center gap-1 mt-2.5 text-gray-750 font-bold text-[10px]">
                        <Users className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="text-[#0B2C5C] font-semibold">{property.leads}</span>
                        <svg className="w-3.5 h-3.5 text-indigo-500 cursor-pointer ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* High Quality Listing Box */}
                  <div className="bg-[#0F925E]/5 rounded-xl p-3.5 mt-4 flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-white text-[#0F925E] flex items-center justify-center border border-[#0F925E]/20 shadow-xs shrink-0">
                      <ShieldCheck className="w-9 h-9 text-[#0F925E] fill-[#0F925E]/10" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-medium text-[#0F925E]">High Quality Listing</p>
                      <p className="text-[10px] font-light mt-0.5 leading-normal" style={{ color: '#7A7A7A' }}>Great job! Your listing is performing well and getting good visibility.</p>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-3 mt-5 pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => handleEditClick(property)}
                    className="flex-1 flex items-center justify-center gap-2 border border-[#035096] text-[#035096] hover:bg-[#035096]/5 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z" />
                    </svg>
                    <span>Edit</span>
                  </button>
                  <button 
                    onClick={() => handleDeactivate(property.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#FCE8E6] text-[#D93025] hover:bg-[#F9D2CE] py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10" />
                    </svg>
                    <span>Deactivate</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= EDIT MODAL ================= */}
      {showEditModal && selectedProperty && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center z-[100] p-4 overflow-y-auto">
          <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
            
            {/* Modal Header */}
            <div className="px-8 pt-8 pb-4 flex items-start justify-between bg-white">
              <div>
                <h3 className="text-xl font-semibold text-gray-950 font-poppins text-left" style={{ color: '#000000', fontWeight: 600 }}>{selectedProperty.title}</h3>
                <div className="flex items-center gap-1 text-xs font-normal text-left mt-2.5" style={{ color: '#7A7A7A' }}>
                  <MapPin className="w-4 h-4 shrink-0" style={{ color: '#7A7A7A' }} strokeWidth={1.5} />
                  <span>{selectedProperty.location}</span>
                </div>
              </div>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-gray-900 hover:text-black transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" strokeWidth={2.2} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-8 pb-6 pt-2 space-y-6 max-h-[70vh] overflow-y-auto">
              
              {/* Photo Management Section */}
              <div className="grid grid-cols-3 gap-5">
                <div className="h-32 rounded-[12px] overflow-hidden border border-gray-100 bg-gray-50">
                  <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=60" className="w-full h-full object-cover" />
                </div>
                <div className="h-32 rounded-[12px] overflow-hidden border border-gray-100 bg-gray-50">
                  <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=60" className="w-full h-full object-cover" />
                </div>
                <button className="border border-dashed border-gray-300 hover:border-gray-400 bg-[#FAFAFA] rounded-[12px] flex flex-col items-center justify-center gap-2.5 h-32 cursor-pointer hover:bg-gray-50 transition-colors">
                  <ImagePlus className="w-6 h-6 text-gray-900" strokeWidth={1.8} />
                  <span className="text-[11px] font-medium text-gray-500 font-poppins">Add Photo</span>
                </button>
              </div>

              {/* Status Info Row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#EBF3FE] rounded-[12px] p-4 flex flex-col justify-between text-left h-24">
                  <div className="flex items-center gap-1.5 text-xs">
                    <TrendingUp className="w-4 h-4 text-slate-500" strokeWidth={2} />
                    <span className="font-normal text-slate-500 font-poppins">Price</span>
                  </div>
                  <p className="text-[17px] font-semibold text-gray-950 font-poppins" style={{ fontWeight: 600 }}>₹1,00,00,000</p>
                </div>
                
                <div className="bg-[#EBF3FE] rounded-[12px] p-4 flex flex-col justify-between text-left h-24">
                  <div className="flex items-center gap-1.5 text-xs">
                    <Home className="w-4 h-4 text-slate-500" strokeWidth={2} />
                    <span className="font-normal text-slate-500 font-poppins">Occupancy Date</span>
                  </div>
                  <p className="text-[17px] font-semibold text-gray-950 font-poppins" style={{ fontWeight: 600 }}>31 Mar 2029</p>
                </div>

                <div className="bg-[#EBF3FE] rounded-[12px] p-4 flex flex-col justify-between text-left h-24">
                  <div className="flex items-center gap-1.5 text-xs">
                    <Calendar className="w-4 h-4 text-slate-500" strokeWidth={2} />
                    <span className="font-normal text-slate-500 font-poppins">Valid Until</span>
                  </div>
                  <p className="text-[17px] font-semibold text-gray-950 font-poppins" style={{ fontWeight: 600 }}>18 Jul 2026</p>
                </div>
              </div>

              {/* Info dates metadata */}
              <div className="grid grid-cols-3 gap-4 text-left px-1">
                <div>
                  <p className="text-[11px] font-normal font-poppins" style={{ color: '#7A7A7A' }}>Last Added</p>
                  <p className="text-[13px] font-semibold text-gray-950 font-poppins mt-1.5" style={{ fontWeight: 600 }}>19 May 2026</p>
                </div>
                <div>
                  <p className="text-[11px] font-normal font-poppins" style={{ color: '#7A7A7A' }}>Created On</p>
                  <p className="text-[13px] font-semibold text-gray-950 font-poppins mt-1.5" style={{ fontWeight: 600 }}>19 May 2026</p>
                </div>
                <div>
                  <p className="text-[11px] font-normal font-poppins" style={{ color: '#7A7A7A' }}>Leads</p>
                  <p className="text-[13px] font-semibold text-gray-950 font-poppins mt-1.5" style={{ fontWeight: 600 }}>02</p>
                </div>
              </div>

              {/* Cart Promotions */}
              <div className="border border-gray-200/90 rounded-[12px] p-5 flex items-center justify-between bg-white">
                <div className="flex gap-4.5 items-center">
                  <Trophy className="w-6 h-6 text-[#FBBF24]" strokeWidth={1.8} />
                  <div className="text-left">
                    <h5 className="text-[13px] font-semibold text-gray-950 leading-tight font-poppins" style={{ fontWeight: 600 }}>Cart promotions</h5>
                    <p className="text-[11px] mt-1 font-poppins" style={{ color: '#7A7A7A' }}>Gold membership</p>
                  </div>
                </div>
              </div>

              {/* Special Highlights */}
              <div className="border border-gray-200/90 rounded-[12px] p-5 flex items-center justify-between bg-white">
                <div className="flex gap-4.5 items-center">
                  <Award className="w-6 h-6 text-[#FBBF24]" strokeWidth={1.8} />
                  <div className="text-left">
                    <h5 className="text-[13px] font-semibold text-gray-950 leading-tight font-poppins" style={{ fontWeight: 600 }}>Special Highlights</h5>
                    <p className="text-[11px] mt-1 font-poppins" style={{ color: '#7A7A7A' }}>Children Play Area, Swimming Pool, Gated Community....</p>
                  </div>
                </div>
                <button className="text-gray-900 hover:text-black cursor-pointer p-1">
                  <Pencil className="w-4 h-4 text-gray-900" strokeWidth={2.2} />
                </button>
              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="px-8 py-6 flex items-center gap-3 bg-white border-t border-gray-100">
              <button className="flex-1 bg-[#004B8F] hover:bg-[#003c73] text-white text-sm font-medium py-3 px-5 rounded-[12px] flex items-center justify-center gap-2 cursor-pointer transition-colors font-poppins">
                <Pencil className="w-4 h-4 text-white" strokeWidth={2.2} />
                <span>Edit Listing</span>
              </button>
              
              <button className="flex-1 bg-[#FFF9E6] border border-[#FFD980] hover:bg-[#FFF1CC] text-[#D97706] text-sm font-medium py-3 px-5 rounded-[12px] flex items-center justify-center gap-2 cursor-pointer transition-colors font-poppins">
                <Zap className="w-4 h-4 text-[#D97706] fill-[#D97706]" strokeWidth={1} />
                <span>Boost</span>
              </button>
              
              <button className="flex-[0.8] bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#1E293B] text-sm font-medium py-3 px-5 rounded-[12px] flex items-center justify-center gap-2 cursor-pointer transition-colors font-poppins">
                <Share2 className="w-4 h-4" strokeWidth={2.2} />
                <span>Share</span>
              </button>
              
              <button className="flex-[0.8] bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#1E293B] text-sm font-medium py-3 px-5 rounded-[12px] flex items-center justify-center gap-2 cursor-pointer transition-colors font-poppins">
                <MoreVertical className="w-4 h-4" strokeWidth={2.2} />
                <span>More</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

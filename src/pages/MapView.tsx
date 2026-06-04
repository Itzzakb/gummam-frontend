import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SlidersHorizontal, Layers, List, Search, MapPin, Check, Bookmark, ArrowUpRight } from 'lucide-react';
import { MapViewContainer } from '../components/map/MapViewContainer';

interface PropertyListing {
  id: number;
  title: string;
  location: string;
  price: string;
  image: string;
  lat: number;
  lng: number;
}

const mockListings: PropertyListing[] = [
  {
    id: 1,
    title: '2089 Sq Yards',
    location: 'Patrapada (Og) - Khordha...',
    price: '5,400 /sq yard',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80',
    lat: 17.3850,
    lng: 78.4867
  },
  {
    id: 2,
    title: '416 Sq Yards',
    location: 'Panchupali - Khordha (dist)',
    price: '13,950 /sq yard',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&q=80',
    lat: 17.3950,
    lng: 78.4350
  },
  {
    id: 3,
    title: '436 Sq Yards',
    location: 'Jujhagada - Khordha (dist)',
    price: '9,184 /sq yard',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80',
    lat: 17.3750,
    lng: 78.5150
  },
  {
    id: 4,
    title: '222 Sq Yards',
    location: 'Tangi - Khordha (dist)',
    price: '4,200 /sq yard',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80',
    lat: 17.4150,
    lng: 78.4750
  },
  {
    id: 5,
    title: '150 Sq Yards',
    location: 'Jatani - Khordha (dist)',
    price: '8,500 /sq yard',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80',
    lat: 17.3550,
    lng: 78.4450
  },
  {
    id: 6,
    title: '180 Sq Yards',
    location: 'Chandanpur - Puri',
    price: '6,000 /sq yard',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80',
    lat: 17.3350,
    lng: 78.5350
  }
];

export const MapView: React.FC = () => {
  const navigate = useNavigate();
  const { locationParams } = useParams<{ locationParams?: string }>();

  // State for search input
  const [searchQuery, setSearchQuery] = useState('');
  
  // Tag filter states
  const [activeTags, setActiveTags] = useState<string[]>(['Plots']);
  
  // Map parameters state
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: 17.3850, lng: 78.4867 });
  const [mapZoom, setMapZoom] = useState<number>(9);
  
  // Layer and Sidebar Toggles
  const [activeLayer, setActiveLayer] = useState<'hybrid' | 'roadmap' | 'satellite'>('hybrid');
  const [isLayersOpen, setIsLayersOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isRequirementsOpen, setIsRequirementsOpen] = useState(false);
  const [isListSidebarOpen, setIsListSidebarOpen] = useState(false);

  // Sidebar Specific Filters States
  const [filterType, setFilterType] = useState<string[]>(['Lands', 'Plots']);
  const [filterListedBy, setFilterListedBy] = useState<string[]>([]);
  const [filterUploadDate, setFilterUploadDate] = useState<string>('All');
  const [filterRoadWidth, setFilterRoadWidth] = useState<number>(100);
  const [filterBudgetMax, setFilterBudgetMax] = useState<number>(30);
  const [filterSizeUnit, setFilterSizeUnit] = useState<string>('Acres');
  const [filterSizeMax, setFilterSizeMax] = useState<number>(30);
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState<boolean>(false);

  // Hover synchronization state
  const [hoveredCoords, setHoveredCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [hoveredPropertyId, setHoveredPropertyId] = useState<number | null>(null);

  // Parse location parameters from URL (format: @lat-lng-zoomm or @lat-lng-zoomz)
  useEffect(() => {
    if (locationParams) {
      const match = locationParams.match(/@(-?\d+\.\d+)-(-?\d+\.\d+)-(\d+)m/);
      if (match) {
        const lat = parseFloat(match[1]);
        const lng = parseFloat(match[2]);
        const zoom = parseInt(match[3], 10);
        setMapCenter({ lat, lng });
        setMapZoom(zoom);
      }
    } else {
      // If no params in URL, attempt to get browser geolocation
      if (navigator.geolocation) {
        try {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;
              const zoom = 12;
              setMapCenter({ lat, lng });
              setMapZoom(zoom);
              navigate(`/map-view/@${lat.toFixed(4)}-${lng.toFixed(4)}-${zoom}m`, { replace: true });
            },
            (error) => {
              console.log("Geolocation error or denied, defaulting to Hyderabad", error);
              navigate(`/map-view/@17.3850-78.4867-9m`, { replace: true });
            }
          );
        } catch (e) {
          console.error("Geolocation synchronous error", e);
          navigate(`/map-view/@17.3850-78.4867-9m`, { replace: true });
        }
      } else {
        navigate(`/map-view/@17.3850-78.4867-9m`, { replace: true });
      }
    }
  }, [locationParams]);

  // Update URL coordinates when map is panned or zoomed
  const handleMapChange = (lat: number, lng: number, zoom: number) => {
    setMapCenter({ lat, lng });
    setMapZoom(zoom);
    navigate(`/map-view/@${lat.toFixed(4)}-${lng.toFixed(4)}-${zoom}m`, { replace: true });
  };

  const toggleTag = (tag: string) => {
    setActiveTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="relative w-full h-[100vh] overflow-hidden font-poppins bg-[#0e1726] flex">
      
      {/* 1. List Sidebar showing available properties */}
      <div 
        className={`absolute top-0 left-0 bottom-0 z-40 w-[380px] sm:w-[420px] bg-white border-r border-gray-100 flex flex-col h-full transform transition-transform duration-300 ease-in-out ${
          isListSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header Search & Filters button row */}
        <div className="p-4 pb-3 flex items-center gap-3">
          <div className="flex-1 flex items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-200/50">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none text-[13px] text-gray-800 focus:outline-none placeholder-gray-400 font-medium"
              placeholder="Enter Location"
            />
            <Search className="w-4 h-4 text-gray-400 ml-1 shrink-0" />
          </div>

          <button 
            onClick={() => {
              setIsFiltersOpen(true);
              setIsLayersOpen(false);
            }}
            className="flex items-center gap-1.5 bg-[#FFF9E6] border border-[#FFE8A3] px-4 py-2 rounded-full text-[13px] font-semibold text-gray-700 shadow-sm relative transition-all hover:bg-[#fff2cc]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-700" />
            <span>Filters</span>
            <span className="w-4.5 h-4.5 rounded-full bg-gray-800 text-white text-[9px] font-bold flex items-center justify-center">1</span>
          </button>
        </div>

        {/* Categories tag pills */}
        <div className="px-4 pb-4 flex gap-2 overflow-x-auto scrollbar-none whitespace-nowrap">
          {['Lands', 'Plots', 'Owner Listed', 'Last Month'].map((tag) => {
            const isChecked = activeTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => {
                  setActiveTags(prev => 
                    prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                  );
                }}
                className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-[11px] font-bold border transition-colors ${
                  isChecked 
                    ? 'bg-white text-gray-800 border-gray-800 font-extrabold' 
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                }`}
              >
                {isChecked && <span className="text-gray-800 text-[10px]">✓</span>}
                <span>{tag}</span>
              </button>
            );
          })}
        </div>

        {/* Requirement Mapping card banner */}
        <div className="mx-4 mb-4 p-3 rounded-xl border border-gray-200/80 bg-white flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-bold text-gray-900">Requirement Mapping</span>
            <span className="bg-[#EBF1FF] text-[#035096] text-[10px] font-bold px-2 py-0.5 rounded-md">New +</span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-gray-500" />
        </div>

        {/* Summary counts & Sort dropdown */}
        <div className="px-4 pb-2 flex justify-between items-center border-b border-gray-100">
          <span className="text-[12px] font-bold text-gray-800 flex items-center gap-1">
            34 listings <span className="text-[10px]">↘</span>
          </span>
          <button className="text-[12px] font-bold text-gray-500 hover:text-gray-800 flex items-center gap-0.5">
            Sort By ▾
          </button>
        </div>

        {/* Scrollable Listings Area */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100 scrollbar-none">
          {mockListings.map((listing) => {
            const isHovered = hoveredPropertyId === listing.id;
            return (
              <div
                key={listing.id}
                onMouseEnter={() => {
                  setHoveredPropertyId(listing.id);
                  setHoveredCoords({ lat: listing.lat, lng: listing.lng });
                }}
                onMouseLeave={() => {
                  setHoveredPropertyId(null);
                  setHoveredCoords(null);
                }}
                className={`p-4 flex gap-4 transition-colors cursor-pointer ${
                  isHovered ? 'bg-[#FFF9E6]/50' : 'bg-white hover:bg-gray-50/50'
                }`}
              >
                {/* Rounded image */}
                <img 
                  src={listing.image} 
                  alt={listing.title} 
                  className="w-20 h-20 rounded-xl object-cover shrink-0 border border-gray-100"
                />

                {/* Details column */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 truncate">{listing.title}</h4>
                    <p className="text-[11px] text-gray-400 mt-1 truncate">{listing.location}</p>
                  </div>
                  <div className="text-[13px] font-bold text-gray-800">
                    {listing.price}
                  </div>
                </div>

                {/* Actions (Bookmark + WhatsApp icons) */}
                <div className="flex flex-col justify-between items-end shrink-0">
                  <Bookmark className="w-5 h-5 text-gray-700 hover:fill-gray-800 cursor-pointer" />
                  
                  {/* WhatsApp green icon */}
                  <a 
                    href={`https://wa.me/919999999999?text=Hi, Interested in ${listing.title}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-5 h-5 rounded-full"
                  >
                    <img src="/icons/whatsapp.png" alt="WhatsApp" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Filters Sidebar overlaying the map and list views */}
      <div 
        className={`absolute top-0 left-0 bottom-0 z-50 w-[380px] sm:w-[420px] bg-white shadow-2xl border-r border-gray-100 flex flex-col h-full transform transition-transform duration-300 ease-in-out ${
          isFiltersOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sticky Header */}
        <div className="p-6 flex items-center justify-between border-b border-gray-100 bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-800">Filters</h2>
          <button 
            onClick={() => setIsFiltersOpen(false)}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
            title="Close Filters"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Filters Content Body */}
        <div className="p-6 space-y-8 overflow-y-auto flex-1 scrollbar-none text-gray-700 bg-white">
          
          {/* Type Category Selection Capsule */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-3.5">Type</h3>
            <div className="flex flex-wrap gap-2.5">
              {['Lands', 'Plots'].map(t => {
                const active = filterType.includes(t);
                return (
                  <button
                    key={t}
                    onClick={() => {
                      setFilterType(prev => 
                        prev.includes(t) ? prev.filter(item => item !== t) : [...prev, t]
                      );
                    }}
                    className={`px-5 py-2.5 rounded-full border text-[13px] font-semibold flex items-center gap-2 transition-all hover:bg-gray-50 active:scale-95 ${
                      active 
                        ? 'border-gray-800 bg-[#fbfbfb] text-gray-800' 
                        : 'border-gray-200 text-gray-500'
                    }`}
                  >
                    <span>{t}</span>
                    <span className={`w-4.5 h-4.5 rounded flex items-center justify-center text-[11px] transition-colors ${
                      active ? 'bg-gray-800 text-white' : 'border border-gray-300'
                    }`}>
                      {active ? '✓' : ''}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Listed By Selection */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-3.5">Listed By</h3>
            <div className="flex flex-wrap gap-2.5">
              {['Owner', 'Agent', '1acre'].map(t => {
                const active = filterListedBy.includes(t);
                return (
                  <button
                    key={t}
                    onClick={() => {
                      setFilterListedBy(prev => 
                        prev.includes(t) ? prev.filter(item => item !== t) : [...prev, t]
                      );
                    }}
                    className={`px-5 py-2.5 rounded-full border text-[13px] font-semibold flex items-center gap-2 transition-all hover:bg-gray-50 active:scale-95 ${
                      active 
                        ? 'border-gray-800 bg-[#fbfbfb] text-gray-800' 
                        : 'border-gray-200 text-gray-500'
                    }`}
                  >
                    <span>{t}</span>
                    <span className={`w-4.5 h-4.5 rounded border flex items-center justify-center text-[11px] transition-colors ${
                      active ? 'bg-gray-800 text-white border-transparent' : 'border-gray-300'
                    }`}>
                      {active ? '✓' : ''}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Upload Date capsules */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-3.5">Upload Date</h3>
            <div className="flex flex-wrap gap-2.5">
              {['Last 1 Week', 'Last 1 Month', 'Last 3 Months', 'Last 6 Months', 'Last 1 Year', 'All'].map(t => {
                const active = filterUploadDate === t;
                return (
                  <button
                    key={t}
                    onClick={() => setFilterUploadDate(t)}
                    className={`px-5 py-2.5 rounded-full border text-[13px] font-semibold flex items-center gap-2.5 transition-all hover:bg-gray-50 active:scale-95 ${
                      active 
                        ? 'border-gray-800 bg-[#fbfbfb] text-gray-800' 
                        : 'border-gray-200 text-gray-500'
                    }`}
                  >
                    <span>{t}</span>
                    <span className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center p-[2.5px] transition-colors ${
                      active ? 'border-gray-800' : 'border-gray-300'
                    }`}>
                      {active && <span className="w-2 h-2 rounded-full bg-gray-800" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Approach Road Width Slider */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-2">Approach Road Width</h3>
            <div className="px-2 pt-6 pb-2">
              <div className="relative mb-6">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={filterRoadWidth} 
                  onChange={(e) => setFilterRoadWidth(parseInt(e.target.value, 10))}
                  className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-800"
                />
                {/* Bubble value pointers */}
                <div 
                  className="absolute -top-7 transform -translate-x-1/2 bg-white border border-gray-300/80 px-2 py-0.5 rounded text-[11px] font-semibold text-gray-700 shadow-sm"
                  style={{ left: `${filterRoadWidth}%` }}
                >
                  {filterRoadWidth === 100 ? '100ft+' : `${filterRoadWidth}ft`}
                </div>
                <div className="absolute -top-7 left-0 transform -translate-x-1/2 bg-white border border-gray-300/80 px-2 py-0.5 rounded text-[11px] font-semibold text-gray-700 shadow-sm">
                  0
                </div>
              </div>
              <div className="flex justify-between text-[11px] text-gray-400 font-semibold px-1">
                <span>0</span>
                <span>20ft</span>
                <span>40ft</span>
                <span>60ft</span>
                <span>80ft</span>
                <span>100ft+</span>
              </div>
            </div>
          </div>

          {/* Budget Range color gradient slider */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-2">Budget</h3>
            <div className="px-2 pt-6 pb-2">
              <div className="relative mb-6">
                <input 
                  type="range" 
                  min="0" 
                  max="30" 
                  value={filterBudgetMax} 
                  onChange={(e) => setFilterBudgetMax(parseInt(e.target.value, 10))}
                  className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  style={{
                    background: 'linear-gradient(to right, #4ade80, #facc15, #f97316)'
                  }}
                />
                <div 
                  className="absolute -top-7 transform -translate-x-1/2 bg-white border border-gray-300/80 px-2 py-0.5 rounded text-[11px] font-semibold text-gray-700 shadow-sm"
                  style={{ left: `${(filterBudgetMax / 30) * 100}%` }}
                >
                  {filterBudgetMax === 30 ? '30Cr+' : `${filterBudgetMax}Cr`}
                </div>
                <div className="absolute -top-7 left-0 transform -translate-x-1/2 bg-white border border-gray-300/80 px-2 py-0.5 rounded text-[11px] font-semibold text-gray-700 shadow-sm">
                  0Cr
                </div>
              </div>
            </div>
          </div>

          {/* Size drop select + slider */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-bold text-gray-800">Size</span>
              
              {/* Unit Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsSizeDropdownOpen(!isSizeDropdownOpen)}
                  className="px-3.5 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-semibold text-gray-700 flex items-center gap-1.5 hover:bg-gray-100"
                >
                  {filterSizeUnit} ▾
                </button>
                {isSizeDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-36 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1.5">
                    {['Acres', 'Hectares', 'Square Meters', 'Square Yards', 'Square Feet'].map(u => (
                      <button
                        key={u}
                        onClick={() => {
                          setFilterSizeUnit(u);
                          setIsSizeDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 font-medium"
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Tag indicator */}
              <span className="bg-gray-50 border border-gray-200 px-3.5 py-1.5 rounded-full text-xs font-semibold text-gray-700 flex items-center gap-1">
                {filterSizeUnit} 
                <button 
                  onClick={() => setFilterSizeUnit('Acres')}
                  className="text-gray-400 hover:text-gray-600 font-bold ml-1 text-[11px]"
                >
                  ✕
                </button>
              </span>
            </div>

            <div className="px-2 pt-6 pb-2">
              <div className="relative mb-6">
                <input 
                  type="range" 
                  min="0" 
                  max="30" 
                  value={filterSizeMax} 
                  onChange={(e) => setFilterSizeMax(parseInt(e.target.value, 10))}
                  className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-800"
                />
                <div 
                  className="absolute -top-7 transform -translate-x-1/2 bg-white border border-gray-300/80 px-2 py-0.5 rounded text-[11px] font-semibold text-gray-700 shadow-sm"
                  style={{ left: `${(filterSizeMax / 30) * 100}%` }}
                >
                  {filterSizeMax === 30 ? '30+' : `${filterSizeMax}`}
                </div>
                <div className="absolute -top-7 left-0 transform -translate-x-1/2 bg-white border border-gray-300/80 px-2 py-0.5 rounded text-[11px] font-semibold text-gray-700 shadow-sm">
                  0
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Sticky Footer Actions */}
        <div className="p-6 border-t border-gray-100 bg-white sticky bottom-0 z-10 flex gap-4">
          <button 
            onClick={() => {
              setFilterType(['Lands', 'Plots']);
              setFilterListedBy([]);
              setFilterUploadDate('All');
              setFilterRoadWidth(100);
              setFilterBudgetMax(30);
              setFilterSizeUnit('Acres');
              setFilterSizeMax(30);
            }}
            className="flex-1 py-3 border border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300 rounded-full text-sm font-semibold transition-colors text-center cursor-pointer"
          >
            Clear all
          </button>
          <button 
            onClick={() => setIsFiltersOpen(false)}
            className="flex-1 py-3 bg-[#035096] hover:bg-[#024078] text-white rounded-full text-sm font-semibold transition-colors text-center flex items-center justify-center gap-1.5 cursor-pointer"
          >
            Apply →
          </button>
        </div>
      </div>

      {/* Map View Area */}
      <div className="flex-1 h-full relative">
        {/* Interactive Google Map Container */}
        <MapViewContainer 
          center={mapCenter}
          zoom={mapZoom}
          layerType={activeLayer}
          onMapChange={handleMapChange}
          hoveredCoords={hoveredCoords}
        />

        {/* Top Floating Controls */}
        <div className="absolute top-4 left-4 right-4 z-10 pointer-events-none flex flex-col gap-3">
          {/* Row 1: Search, Filters, My Requirements, Layers */}
          <div className="flex flex-wrap items-center gap-3 pointer-events-auto">
            {/* Address Search Bar */}
            {!isListSidebarOpen && (
              <div className="flex items-center bg-white rounded-full px-4 py-2.5 shadow-lg border border-gray-200/80 w-full sm:w-[320px] md:w-[360px]">
                <Search className="w-5 h-5 text-gray-400 mr-2 shrink-0" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-[14px] text-gray-800 focus:outline-none placeholder-gray-400 font-medium"
                  placeholder="Search location..."
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-gray-400 hover:text-gray-600 text-sm ml-1"
                  >
                    ✕
                  </button>
                )}
              </div>
            )}

            {/* Floating Filters Button on Map (Visible only when List view is closed) */}
            {!isListSidebarOpen && (
              <button 
                onClick={() => {
                  setIsFiltersOpen(!isFiltersOpen);
                  setIsLayersOpen(false);
                  setIsRequirementsOpen(false);
                }}
                className={`flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-lg border text-[13px] font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-95 ${
                  isFiltersOpen ? 'border-[#0B2C5C] text-[#0B2C5C] ring-2 ring-blue-500/20' : 'border-gray-200'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4 text-[#0B2C5C]" />
                Filters
              </button>
            )}

            {/* My Requirements Button */}
            <div className="relative">
              <button 
                onClick={() => {
                  setIsRequirementsOpen(!isRequirementsOpen);
                  setIsFiltersOpen(false);
                  setIsLayersOpen(false);
                }}
                className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-lg border border-gray-200 text-[13px] font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-95"
              >
                <List className="w-4 h-4 text-orange-500" />
                My Requirements
              </button>
              {isRequirementsOpen && (
                <div className="absolute top-full left-0 mt-2 w-[240px] bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50">
                  <h4 className="text-sm font-bold text-[#0B2C5C] mb-2">Saved Criteria</h4>
                  <p className="text-[12px] text-gray-500 mb-3">Filter listings based on your saved property profiles.</p>
                  <button className="w-full py-2 bg-[#0B2C5C] text-white rounded-lg text-xs font-semibold hover:bg-blue-900">Manage Requirements</button>
                </div>
              )}
            </div>

            {/* Layers Button */}
            <div className="relative ml-auto sm:ml-0">
              <button 
                onClick={() => {
                  setIsLayersOpen(!isLayersOpen);
                  setIsFiltersOpen(false);
                  setIsRequirementsOpen(false);
                }}
                className={`flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-lg border text-[13px] font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-95 ${
                  isLayersOpen ? 'border-[#0B2C5C] text-[#0B2C5C]' : 'border-gray-200'
                }`}
              >
                <Layers className="w-4 h-4 text-blue-500" />
                Layers
              </button>
              {isLayersOpen && (
                <div className="absolute top-full right-0 sm:left-0 mt-2 w-[160px] bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                  {(['hybrid', 'satellite', 'roadmap'] as const).map((layer) => (
                    <button 
                      key={layer}
                      onClick={() => {
                        setActiveLayer(layer);
                        setIsLayersOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-left text-[13px] text-gray-700 hover:bg-gray-50 font-medium capitalize"
                    >
                      {layer}
                      {activeLayer === layer && <Check className="w-4 h-4 text-[#0B2C5C]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Row 2: Category Pills (Visible only when List view is closed) */}
          {!isListSidebarOpen && (
            <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
              {[
                { name: 'Lands', icon: '🌱' },
                { name: 'Plots', icon: '📐' },
                { name: 'Owner Listed', icon: '👤' },
                { name: 'Last Month', icon: '📅' }
              ].map((tag) => {
                const isChecked = activeTags.includes(tag.name);
                return (
                  <button
                    key={tag.name}
                    onClick={() => toggleTag(tag.name)}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border shadow-md transition-all active:scale-95 ${
                      isChecked 
                        ? 'bg-white text-gray-800 border-[#0B2C5C]' 
                        : 'bg-white/90 text-gray-600 border-gray-200/80 hover:bg-white'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 text-green-600 stroke-[3px]" />}
                    <span>{tag.icon} {tag.name}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Floating List View Toggle Button (Aligns dynamically relative to list sidebar boundary) */}
        <div 
          className={`absolute top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ${
            isListSidebarOpen 
              ? 'left-[380px] sm:left-[420px]' 
              : 'left-[16px]'
          }`}
        >
          <button 
            onClick={() => setIsListSidebarOpen(!isListSidebarOpen)}
            className="flex flex-col items-center justify-center bg-white rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.15)] border border-gray-200/80 w-12 h-16 transition-all hover:bg-gray-50 active:scale-95 cursor-pointer"
            title={isListSidebarOpen ? "Hide List View" : "Show List View"}
          >
            <List className="w-5 h-5 text-[#0B2C5C] mb-1" />
            <span className="text-[10px] font-bold text-gray-800 uppercase tracking-wider">List</span>
          </button>
        </div>

        {/* Floating GPS Target Status Alert (Mock indicator) */}
        <div className="absolute bottom-4 right-4 z-10 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-[11px] font-medium flex items-center gap-2 pointer-events-none">
          <MapPin className="w-3.5 h-3.5 text-green-400 animate-pulse" />
          <span>GPS Tracking Enabled • Zoom Level: {mapZoom}</span>
        </div>
      </div>
    </div>
  );
};

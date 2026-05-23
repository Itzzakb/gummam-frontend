import React, { useState, useRef, useEffect } from 'react';
import { Filter, RotateCcw, LayoutGrid, List as ListIcon, ChevronRight, ChevronDown, ChevronUp, ArrowLeftRight, Check } from 'lucide-react';
import { SearchPropertyCard } from '../components/ui/SearchPropertyCard';
import { AgentSection } from '../features/landing/AgentSection';
import { PromoSidebarCard } from '../components/ui/PromoSidebarCard';

const dummyProperties = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
    title: 'Townhouse For Rent In Ready Nager Main Road, Hyderabad',
    location: 'Ready Nager Main Road, Hyderabad',
    price: '₹ 12,999',
    type: 'For Rent',
    beds: 3,
    baths: 2,
    sqft: 122280,
    description: 'Builder Floor Apartment Is Available For Sale. It Is A Good Location Property. Please Contact For More Available For Sale. It Is A Good Location Property. Please More...',
    updatedAt: '6 day ago'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
    title: 'Townhouse For Sale In Ready Nager Main Road, Hyderabad',
    location: 'Ready Nager Main Road, Hyderabad',
    price: '₹ 1.72 Cr.',
    type: 'For Sale',
    beds: 3,
    baths: 2,
    sqft: 122280,
    description: 'Builder Floor Apartment Is Available For Sale. It Is A Good Location Property. Please Contact For More Available For Sale. It Is A Good Location Property. Please More...',
    updatedAt: '6 day ago'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    title: 'Townhouse For Rent In Ready Nager Main Road, Hyderabad',
    location: 'Ready Nager Main Road, Hyderabad',
    price: '₹ 12,999',
    type: 'For Rent',
    beds: 3,
    baths: 2,
    sqft: 122280,
    description: 'Builder Floor Apartment Is Available For Sale. It Is A Good Location Property. Please Contact For More Available For Sale. It Is A Good Location Property. Please More...',
    updatedAt: '6 day ago'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
    title: 'Townhouse For Rent In Ready Nager Main Road, Hyderabad',
    location: 'Ready Nager Main Road, Hyderabad',
    price: '₹ 12,999',
    type: 'For Rent',
    beds: 3,
    baths: 2,
    sqft: 122280,
    description: 'Builder Floor Apartment Is Available For Sale. It Is A Good Location Property. Please Contact For More Available For Sale. It Is A Good Location Property. Please More...',
    updatedAt: '6 day ago'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
    title: 'Townhouse For Sale In Ready Nager Main Road, Hyderabad',
    location: 'Ready Nager Main Road, Hyderabad',
    price: '₹ 1.72 Cr.',
    type: 'For Sale',
    beds: 3,
    baths: 2,
    sqft: 122280,
    description: 'Builder Floor Apartment Is Available For Sale. It Is A Good Location Property. Please Contact For More Available For Sale. It Is A Good Location Property. Please More...',
    updatedAt: '6 day ago'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    title: 'Townhouse For Rent In Ready Nager Main Road, Hyderabad',
    location: 'Ready Nager Main Road, Hyderabad',
    price: '₹ 12,999',
    type: 'For Rent',
    beds: 3,
    baths: 2,
    sqft: 122280,
    description: 'Builder Floor Apartment Is Available For Sale. It Is A Good Location Property. Please Contact For More Available For Sale. It Is A Good Location Property. Please More...',
    updatedAt: '6 day ago'
  }
];



export const ListingProjects: React.FC = () => {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  
  // Filter States
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [bedsFilter, setBedsFilter] = useState<string>('Any');
  const [bathsFilter, setBathsFilter] = useState<string>('Any');
  const [exactMatchBeds, setExactMatchBeds] = useState(false);
  const [exactMatchBaths, setExactMatchBaths] = useState(false);

  // Close dropdown on click outside
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleStatus = (val: string) => {
    if (val === 'All') {
      setStatusFilter(statusFilter.includes('All') ? [] : ['All']);
    } else {
      setStatusFilter(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev.filter(v => v !== 'All'), val]);
    }
  };

  const toggleType = (val: string) => {
    if (val === 'All') {
      setTypeFilter(typeFilter.includes('All') ? [] : ['All']);
    } else {
      setTypeFilter(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev.filter(v => v !== 'All'), val]);
    }
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-20 font-poppins">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Breadcrumb */}
        <div className="flex items-center text-[13px] text-gray-500 mb-6">
          <span className="hover:text-gray-900 cursor-pointer">Home</span>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-gray-900 font-medium">Trending Homes</span>
        </div>

        {/* Page Header */}
        <div className="flex justify-between items-end mb-6">
          <h1 className="text-[28px] font-bold text-[#0B2C5C] font-merriweather">Trending Homes</h1>

          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-white p-1 rounded-md border border-gray-200">
            <button
              onClick={() => setViewType('grid')}
              className={`p-1.5 rounded ${viewType === 'grid' ? 'bg-[#0B2C5C] text-white' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewType('list')}
              className={`p-1.5 rounded ${viewType === 'list' ? 'bg-[#0B2C5C] text-white' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8" ref={dropdownRef}>
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-[280px]">
              <input
                type="text"
                placeholder="What are looking for"
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#035096] transition-colors"
              />
            </div>

            {/* Status Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setOpenDropdown(openDropdown === 'status' ? null : 'status')}
                className={`px-4 py-2.5 bg-white border rounded-lg text-[14px] flex items-center gap-2 transition-colors ${openDropdown === 'status' ? 'border-[#035096] text-[#035096]' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
              >
                Status {openDropdown === 'status' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openDropdown === 'status' && (
                <div className="absolute top-full left-0 mt-2 w-[160px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3">
                  <div className="space-y-3">
                    {['All', 'For Rent', 'For Sale'].map((item) => (
                      <label key={item} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${statusFilter.includes(item) ? 'bg-[#035096] border-[#035096]' : 'border-gray-300 group-hover:border-[#035096]'}`}>
                          {statusFilter.includes(item) && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className="text-[14px] text-gray-700">{item}</span>
                        <input type="checkbox" className="hidden" checked={statusFilter.includes(item)} onChange={() => toggleStatus(item)} />
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Type Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setOpenDropdown(openDropdown === 'type' ? null : 'type')}
                className={`px-4 py-2.5 bg-white border rounded-lg text-[14px] flex items-center gap-2 transition-colors ${openDropdown === 'type' ? 'border-[#035096] text-[#035096]' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
              >
                Type {openDropdown === 'type' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openDropdown === 'type' && (
                <div className="absolute top-full left-0 mt-2 w-[180px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3">
                  <div className="space-y-3">
                    {['All', 'Apartment', 'Condo', 'House', 'Land', 'Manufactured', 'Townhome', 'Villa'].map((item) => (
                      <label key={item} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${typeFilter.includes(item) ? 'bg-[#035096] border-[#035096]' : 'border-gray-300 group-hover:border-[#035096]'}`}>
                          {typeFilter.includes(item) && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className="text-[14px] text-gray-700">{item}</span>
                        <input type="checkbox" className="hidden" checked={typeFilter.includes(item)} onChange={() => toggleType(item)} />
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Beds Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setOpenDropdown(openDropdown === 'beds' ? null : 'beds')}
                className={`px-4 py-2.5 bg-white border rounded-lg text-[14px] flex items-center gap-2 transition-colors ${openDropdown === 'beds' ? 'border-[#035096] text-[#035096]' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
              >
                Beds {openDropdown === 'beds' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openDropdown === 'beds' && (
                <div className="absolute top-full left-0 mt-2 w-[280px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
                  <div className="flex gap-2 mb-4">
                    {['Any', '1', '2', '3', '4', '5'].map((val) => (
                      <button 
                        key={val}
                        onClick={() => setBedsFilter(val)}
                        className={`flex-1 py-1.5 border rounded text-[14px] transition-colors ${bedsFilter === val ? 'bg-[#e6f0fa] border-[#035096] text-[#035096]' : 'border-gray-200 text-gray-600 hover:border-[#035096]'}`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${exactMatchBeds ? 'bg-[#035096] border-[#035096]' : 'border-gray-300 group-hover:border-[#035096]'}`}>
                      {exactMatchBeds && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-[14px] text-gray-700">Use exact match</span>
                    <input type="checkbox" className="hidden" checked={exactMatchBeds} onChange={() => setExactMatchBeds(!exactMatchBeds)} />
                  </label>
                </div>
              )}
            </div>

            {/* Baths Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setOpenDropdown(openDropdown === 'baths' ? null : 'baths')}
                className={`px-4 py-2.5 bg-white border rounded-lg text-[14px] flex items-center gap-2 transition-colors ${openDropdown === 'baths' ? 'border-[#035096] text-[#035096]' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
              >
                Baths {openDropdown === 'baths' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openDropdown === 'baths' && (
                <div className="absolute top-full left-0 mt-2 w-[280px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
                  <div className="flex gap-2 mb-4">
                    {['Any', '1', '2', '3', '4', '5'].map((val) => (
                      <button 
                        key={val}
                        onClick={() => setBathsFilter(val)}
                        className={`flex-1 py-1.5 border rounded text-[14px] transition-colors ${bathsFilter === val ? 'bg-[#e6f0fa] border-[#035096] text-[#035096]' : 'border-gray-200 text-gray-600 hover:border-[#035096]'}`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${exactMatchBaths ? 'bg-[#035096] border-[#035096]' : 'border-gray-300 group-hover:border-[#035096]'}`}>
                      {exactMatchBaths && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-[14px] text-gray-700">Use exact match</span>
                    <input type="checkbox" className="hidden" checked={exactMatchBaths} onChange={() => setExactMatchBaths(!exactMatchBaths)} />
                  </label>
                </div>
              )}
            </div>

            <button className="px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-colors">
              <RotateCcw className="w-4 h-4" />
            </button>

            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`px-3 py-2.5 bg-white border rounded-lg flex items-center justify-center transition-colors ${isFilterOpen ? 'border-[#035096] text-[#035096]' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              <Filter className="w-4 h-4" />
            </button>

            <button className="px-8 py-2.5 bg-[#254f8d] text-white rounded-lg text-[14px] font-medium hover:bg-blue-900 transition-colors">
              Search
            </button>
          </div>

          {/* Advanced Filters Expanded Container */}
          {isFilterOpen && (
            <div className="mt-4 bg-[#F3F4F6] p-6 rounded-xl border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                
                {/* Price */}
                <div className="min-w-0">
                  <div className="text-[13px] text-gray-500 mb-2 font-medium">Price</div>
                  <div className="flex items-center gap-2 lg:gap-3">
                    <input type="text" placeholder="Max Price" className="flex-1 w-full min-w-0 px-3 py-2.5 rounded-lg border border-gray-200 text-[14px] focus:outline-none focus:border-[#035096]" />
                    <ArrowLeftRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <input type="text" placeholder="Min Price" className="flex-1 w-full min-w-0 px-3 py-2.5 rounded-lg border border-gray-200 text-[14px] focus:outline-none focus:border-[#035096]" />
                  </div>
                </div>

                {/* Area */}
                <div className="min-w-0">
                  <div className="text-[13px] text-gray-500 mb-2 font-medium">Area</div>
                  <div className="flex items-center gap-2 lg:gap-3">
                    <input type="text" placeholder="Max Area" className="flex-1 w-full min-w-0 px-3 py-2.5 rounded-lg border border-gray-200 text-[14px] focus:outline-none focus:border-[#035096]" />
                    <ArrowLeftRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <input type="text" placeholder="Min Area" className="flex-1 w-full min-w-0 px-3 py-2.5 rounded-lg border border-gray-200 text-[14px] focus:outline-none focus:border-[#035096]" />
                  </div>
                </div>

                {/* Year Built */}
                <div className="min-w-0">
                  <div className="text-[13px] text-gray-500 mb-2 font-medium">Year Built</div>
                  <div className="flex items-center gap-2 lg:gap-3">
                    <input type="text" placeholder="Min Year" className="flex-1 w-full min-w-0 px-3 py-2.5 rounded-lg border border-gray-200 text-[14px] focus:outline-none focus:border-[#035096]" />
                    <ArrowLeftRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <input type="text" placeholder="Max Year" className="flex-1 w-full min-w-0 px-3 py-2.5 rounded-lg border border-gray-200 text-[14px] focus:outline-none focus:border-[#035096]" />
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Properties List/Grid */}
          <div className="flex-1 min-w-0">
            {viewType === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {dummyProperties.map((property) => (
                  <SearchPropertyCard key={property.id} {...property} viewType="grid" />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-6 mb-8">
                {dummyProperties.map((property) => (
                  <SearchPropertyCard key={property.id} {...property} viewType="list" />
                ))}
              </div>
            )}

            <div className="flex justify-end mb-10">
              <a href="#" className="text-[13px] font-semibold text-gray-900 underline underline-offset-4 decoration-2">
                View More
              </a>
            </div>


          </div>

          {/* Right Sidebar */}
          {viewType === 'list' && (
            <div className="hidden lg:block w-[300px] flex-shrink-0">
              <PromoSidebarCard />
            </div>
          )}

        </div>

      </div>
      <AgentSection />
    </div>
  );
};

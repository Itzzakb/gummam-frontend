import React, { useState } from 'react';
import { Search, SlidersHorizontal, RotateCcw, LayoutGrid, List as ListIcon, ChevronRight } from 'lucide-react';
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
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex-1 min-w-[280px]">
            <input 
              type="text" 
              placeholder="What are looking for" 
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-[14px] focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <select className="px-4 py-3 bg-white border border-gray-200 rounded-md text-[14px] text-gray-600 outline-none w-[120px]">
            <option>Status</option>
          </select>
          
          <select className="px-4 py-3 bg-white border border-gray-200 rounded-md text-[14px] text-gray-600 outline-none w-[120px]">
            <option>Type</option>
          </select>
          
          <select className="px-4 py-3 bg-white border border-gray-200 rounded-md text-[14px] text-gray-600 outline-none w-[100px]">
            <option>Beds</option>
          </select>
          
          <select className="px-4 py-3 bg-white border border-gray-200 rounded-md text-[14px] text-gray-600 outline-none w-[100px]">
            <option>Baths</option>
          </select>
          
          <button className="px-4 py-3 bg-white border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 flex items-center justify-center">
            <RotateCcw className="w-4 h-4" />
          </button>
          
          <button className="px-4 py-3 bg-white border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 flex items-center justify-center">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
          
          <button className="px-8 py-3 bg-[#0B2C5C] text-white rounded-md text-[14px] font-semibold hover:bg-blue-900 transition-colors">
            Search
          </button>
        </div>

        {/* Content Area */}
        <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Properties List/Grid */}
            <div className="flex-1">
                {viewType === 'grid' ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {dummyProperties.map((property) => (
                          <SearchPropertyCard key={property.id} {...property} viewType="grid" />
                        ))}
                     </div>
                ) : (
                    <div className="flex flex-col mb-8">
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

            {/* Right Sidebar (Visible only in List View or can be responsive, based on Figma, it's visible in list view) */}
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

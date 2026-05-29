import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { AgentCard } from '../components/ui/AgentCard';
import { NewLaunch } from '../features/landing/NewLaunch';

// Mock list of 12 verified agents
const initialAgents = [
  {
    name: 'Vinod Reddy',
    company: 'V R Home & Property',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    properties: 57,
    experience: '5+ Yrs',
    forSale: 11,
    rentLease: 8
  },
  {
    name: 'Sravanthi Rao',
    company: 'Rao Real Estate',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    properties: 42,
    experience: '4+ Yrs',
    forSale: 15,
    rentLease: 10
  },
  {
    name: 'Anil Kumar',
    company: 'Apex Housing Solutions',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    properties: 68,
    experience: '7+ Yrs',
    forSale: 20,
    rentLease: 12
  },
  {
    name: 'Neha Sharma',
    company: 'Elegant Dwellings',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    properties: 29,
    experience: '3+ Yrs',
    forSale: 8,
    rentLease: 6
  },
  {
    name: 'Karan Singh',
    company: 'Singh Partners & Co',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    properties: 50,
    experience: '6+ Yrs',
    forSale: 14,
    rentLease: 9
  },
  {
    name: 'Pooja Patel',
    company: 'Pioneer Properties',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    properties: 35,
    experience: '5+ Yrs',
    forSale: 12,
    rentLease: 5
  },
  {
    name: 'Rajesh Verma',
    company: 'Verma Estates Group',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    properties: 84,
    experience: '9+ Yrs',
    forSale: 25,
    rentLease: 18
  },
  {
    name: 'Meera Krishnan',
    company: 'Green Space Realtors',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    properties: 21,
    experience: '2+ Yrs',
    forSale: 5,
    rentLease: 4
  },
  {
    name: 'Vikram Malhotra',
    company: 'Malhotra Dream Homes',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    properties: 61,
    experience: '8+ Yrs',
    forSale: 18,
    rentLease: 11
  },
  {
    name: 'Deepika Sen',
    company: 'Sen & Associates',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    properties: 40,
    experience: '5+ Yrs',
    forSale: 10,
    rentLease: 7
  },
  {
    name: 'Sanjay Dutt',
    company: 'Dutt & Brothers',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    properties: 72,
    experience: '10+ Yrs',
    forSale: 30,
    rentLease: 15
  },
  {
    name: 'Kriti Sanon',
    company: 'Sanon Premium Realty',
    image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    properties: 31,
    experience: '4+ Yrs',
    forSale: 9,
    rentLease: 6
  }
];

export const AgentList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(9);

  // Filter agents by search query
  const filteredAgents = initialAgents.filter(agent =>
    agent.name.toLowerCase().includes(appliedQuery.toLowerCase()) ||
    agent.company.toLowerCase().includes(appliedQuery.toLowerCase())
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedQuery(searchQuery);
    setVisibleCount(9); // Reset visible count on new search
  };

  const handleViewMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen font-poppins">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Breadcrumbs */}
        <div className="flex items-center text-[13px] text-gray-500 mb-6">
          <Link to="/" className="hover:text-gray-900 cursor-pointer">Home</Link>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-gray-900 font-medium">Agents List</span>
        </div>

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-[28px] font-bold text-[#0B2C5C] font-merriweather">
            Gummaam Verified Agents
          </h1>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-10 max-w-md">
          <input
            type="text"
            placeholder="Search agent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#035096] transition-colors"
          />
          <button 
            type="submit"
            className="px-8 py-2.5 bg-[#00478F] text-white rounded-lg text-[14px] font-medium hover:bg-blue-900 transition-colors shadow-sm"
          >
            Search
          </button>
        </form>

        {/* Agents Grid */}
        {filteredAgents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredAgents.slice(0, visibleCount).map((agent, index) => (
              <div key={index} className="h-full">
                <AgentCard {...agent} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No agents found matching "{appliedQuery}"
          </div>
        )}

        {/* View More Button */}
        {filteredAgents.length > visibleCount && (
          <div className="flex justify-end mb-12">
            <button 
              onClick={handleViewMore}
              className="text-[14px] font-semibold text-gray-900 underline underline-offset-4 decoration-2 hover:text-[#00478F] transition-colors"
            >
              View More
            </button>
          </div>
        )}
      </div>

      {/* New Launch Section */}
      <NewLaunch />
    </div>
  );
};

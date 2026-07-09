import React, { useState } from 'react';
import { TrendingPropertyCard } from '../../components/ui/TrendingPropertyCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const filters = ["All", "Apartments", "Home", "Townhouse", "Flats", "Office", "Villa", "Smart Home", "Bungalow"];

const dummyData = [
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=80',
    title: 'The Best View Villa',
    location: 'Uppal, Hyderabad',
    price: '₹07,46,00,000',
    beds: 6,
    baths: 2,
    sqft: '6,800 Sq. Ft.',
    isFavorite: true,
  },
  {
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80',
    title: 'The Best View Villa',
    location: 'Uppal, Hyderabad',
    price: '₹07,46,00,000',
    beds: 6,
    baths: 2,
    sqft: '6,800 Sq. Ft.',
    isFavorite: false,
  },
  {
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80',
    title: 'The Best View Villa',
    location: 'Uppal, Hyderabad',
    price: '₹07,46,00,000',
    beds: 6,
    baths: 2,
    sqft: '6,800 Sq. Ft.',
    isFavorite: false,
  },
  {
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500&q=80',
    title: 'The Best View Villa',
    location: 'Uppal, Hyderabad',
    price: '₹07,46,00,000',
    beds: 6,
    baths: 2,
    sqft: '6,800 Sq. Ft.',
    isFavorite: false,
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80',
    title: 'The Best View Villa',
    location: 'Uppal, Hyderabad',
    price: '₹07,46,00,000',
    beds: 6,
    baths: 2,
    sqft: '6,800 Sq. Ft.',
    isFavorite: false,
  },
  {
    image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=500&q=80',
    title: 'The Best View Villa',
    location: 'Uppal, Hyderabad',
    price: '₹07,46,00,000',
    beds: 6,
    baths: 2,
    sqft: '6,800 Sq. Ft.',
    isFavorite: false,
  },
];

export const TrendingHomes: React.FC = () => {
  const [activeType, setActiveType] = useState("For Sale");
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <section className="py-16 bg-[#FAFAFA] font-poppins relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="flex justify-center mb-10">
          <div className="relative inline-block border-b-2 border-[#0B2C5C] pb-3">
            <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#0B2C5C] font-heading">
              Trending Homes You'll Love
            </h2>
            {/* Triangle pointing down */}
            <div className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#0B2C5C]"></div>
          </div>
        </div>

        {/* Filters Area */}
        <div className="mb-8">
          {/* Top Links (For Sale / For Rent) */}
          <div className="flex gap-6 mb-6">
            {["For Sale", "For Rent"].map(type => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`pb-2 text-[16px] transition-colors relative ${
                  activeType === type ? 'text-[#0B2C5C] font-semibold' : 'text-[#33353A] font-medium'
                }`}
              >
                {type}
                {activeType === type && (
                  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#F68035] rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Pill Filters */}
          <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map(filter => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`whitespace-nowrap transition-colors ${
                    isActive 
                      ? 'text-[#0B2C5C] font-semibold p-[1.5px] bg-gradient-to-r from-[#4885FF] to-[#F68035] rounded-[9.5px]' 
                      : 'text-[#535353] font-medium border border-[#E0E0E0] bg-white px-6 py-2.5 hover:bg-gray-50 rounded-[8px]'
                  }`}
                >
                  {isActive ? (
                    <div className="px-6 py-2 rounded-[8px] bg-[#EAF1FF] w-full h-full flex items-center justify-center">
                      {filter}
                    </div>
                  ) : (
                    filter
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* See All Link (Between chips and carousel) */}
        <div className="flex justify-end mb-4">
          <a href="#" className="text-[#0B2C5C] font-semibold text-[14px] underline hover:text-[#4885FF] transition-colors whitespace-nowrap">
            See all Properties
          </a>
        </div>

        {/* Carousel */}
        <div className="relative mt-2 px-2">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {dummyData.map((property, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <TrendingPropertyCard {...property} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] border-0 text-gray-800 disabled:opacity-50 z-10 hidden md:flex" />
            <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] border-0 text-gray-800 disabled:opacity-50 z-10 hidden md:flex" />
          </Carousel>
        </div>

      </div>
    </section>
  );
};

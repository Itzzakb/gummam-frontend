import React from 'react';
import { CityCard } from '../../components/ui/CityCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const dummyCities = [
  { name: 'Hyderabad', propertyCount: 2, image: '/images/hyderabad.png' },
  { name: 'Warangal', propertyCount: 2, image: '/images/warangal.png' },
  { name: 'Karimnagar', propertyCount: 2, image: '/images/karimnagar.png' },
  { name: 'Khammam', propertyCount: 2, image: '/images/khammam.png' },
];

export const CityExplore: React.FC = () => {
  return (
    <section className="font-poppins">
      {/* Header Area */}
      <div className="pt-16 pb-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="flex justify-center mb-6">
            <div className="relative inline-block border-b-2 border-[#0B2C5C] pb-3">
              <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#0B2C5C] font-heading">
                Properties by Cities
              </h2>
              <div className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#0B2C5C]"></div>
            </div>
          </div>

          {/* See All Link */}
          <div className="flex justify-end">
            <a href="#" className="text-[#0B2C5C] font-semibold text-[14px] underline hover:text-[#4885FF] transition-colors whitespace-nowrap">
              See all Properties
            </a>
          </div>
        </div>
      </div>

      {/* Carousel Area with inset shadows */}
      <div className="py-12 bg-[#F5F6F8] shadow-[inset_0_4px_10px_rgba(0,0,0,0.04),inset_0_-4px_10px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Carousel */}
          <div className="relative px-2">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {dummyCities.map((city, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <CityCard {...city} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] border-0 text-gray-800 disabled:opacity-50 z-10 hidden md:flex" />
              <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] border-0 text-gray-800 disabled:opacity-50 z-10 hidden md:flex" />
            </Carousel>
          </div>

        </div>
      </div>
    </section>
  );
};

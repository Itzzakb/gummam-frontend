import React from 'react';
import { NewLaunchCard, type NewLaunchCardProps } from '../../components/ui/NewLaunchCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const dummyNewLaunches: NewLaunchCardProps[] = [
  {
    id: 301,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    tagLabel: 'PRE-LAUNCH OFFER',
    title: 'Laxmi Tower',
    description: 'Ultra-luxurious 4 BHK Condos starting at ₹1.2 Cr.',
    location: 'Hyderabad, Uppal'
  },
  {
    id: 302,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    tagLabel: 'READY IN 2027',
    title: 'Best 1 Villas',
    description: 'Sustainable living in the heart of the tech hub.',
    location: 'Hyderabad, Uppal'
  },
  {
    id: 303,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    tagLabel: 'NEW PROJECT',
    title: 'Skyline Residences',
    description: 'Premium apartments with panoramic city views.',
    location: 'Hyderabad, Gachibowli'
  }
];

export const NewLaunch: React.FC = () => {
  return (
    <section
      className="font-poppins py-16 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F8F9FA 90%, #e67d225f 100%)'
      }}
    >
      {/* Background sketch overlay */}
      <div
        className="absolute top-0 left-0 w-[400px] h-full opacity-30 pointer-events-none z-0"
        style={{
          backgroundImage: 'url("/images/left-parallex.png")',
          backgroundPosition: 'left bottom',
          backgroundRepeat: 'no-repeat'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Heading */}
        {/* Heading */}
<div className="flex justify-center mb-4">
  <div className="relative inline-block border-b-2 border-[#0B2C5C] pb-3">
    <h2 className="text-center text-3xl font-bold text-[#0B2C5C] font-heading relative overflow-hidden">
      New Launch
      {/* Shine sweep */}
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(112deg, transparent 20%, rgba(255,255,255,0.7) 50%, transparent 80%)',
          transform: 'translateX(-100%)',
          animation: 'shine-sweep 2.5s ease-in-out infinite',
        }}
      />
    </h2>

    {/* Keyframes injected inline */}
    <style>{`
      @keyframes shine-sweep {
        0%   { transform: translateX(-120%); }
        60%  { transform: translateX(120%); }
        100% { transform: translateX(120%); }
      }
    `}</style>

    <div className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#0B2C5C]"></div>
  </div>
</div>

        {/* See All Link */}
        <div className="flex justify-end mb-8">
          <a href="#" className="text-[#0B2C5C] font-semibold text-[14px] underline hover:text-[#4885FF] transition-colors whitespace-nowrap">
            See all Properties
          </a>
        </div>

        {/* Carousel */}
        <div className="relative px-2">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {dummyNewLaunches.map((launch, idx) => (
                <CarouselItem key={idx} className="pl-4 md:basis-1/2">
                  <NewLaunchCard {...launch} />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Custom styled arrows */}
            <CarouselPrevious className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-md border-0 text-[#0B2C5C] hover:bg-[#0B2C5C] hover:text-white transition-colors disabled:opacity-50 z-10 hidden md:flex" />
            <CarouselNext className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-md border-0 text-[#0B2C5C] hover:bg-[#0B2C5C] hover:text-white transition-colors disabled:opacity-50 z-10 hidden md:flex" />
          </Carousel>
        </div>

      </div>
    </section>
  );
};

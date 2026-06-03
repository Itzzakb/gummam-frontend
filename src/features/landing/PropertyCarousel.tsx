import React from 'react';
import { PropertyCard, type PropertyCardProps } from '../../components/ui/PropertyCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface PropertyCarouselProps {
  title: string;
  properties: PropertyCardProps[];
}

export const PropertyCarousel: React.FC<PropertyCarouselProps> = ({ title, properties }) => {
  return (
    <section className="font-poppins py-16 bg-white relative overflow-hidden">

      {/* Decorative Background */}
      <div
        className="absolute top-0 right-0 w-[400px] h-full opacity-30 pointer-events-none z-0"
        style={{
          backgroundImage: 'url("/images/right-parallex.png")',
          backgroundPosition: 'right bottom',
          backgroundRepeat: 'no-repeat'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Heading */}
        <div className="flex justify-center mb-6">
          <div className="relative inline-block border-b-2 border-[#0B2C5C] pb-3">
            <h2 className="text-center text-3xl font-bold text-[#0B2C5C] font-heading">
              {title}
            </h2>
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
              {properties.map((prop, idx) => (
                <CarouselItem key={idx} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <PropertyCard {...prop} />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Custom styled arrows based on design (white circle, blue arrow) */}
            <CarouselPrevious className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-md border-0 text-[#0B2C5C] hover:bg-[#0B2C5C] hover:text-white transition-colors disabled:opacity-50 z-10 hidden md:flex" />
            <CarouselNext className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-md border-0 text-[#0B2C5C] hover:bg-[#0B2C5C] hover:text-white transition-colors disabled:opacity-50 z-10 hidden md:flex" />
          </Carousel>
        </div>

      </div>
    </section>
  );
};

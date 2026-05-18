import React from 'react';
import { Building2, Calendar, Home, Key } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const dummyAgents = [
  {
    name: 'Vinod Reddy',
    agency: 'V R Home & Property',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    properties: 57,
    experience: '5+ Yrs',
    forSale: 11,
    rentLease: 8
  },
  {
    name: 'Vinod Reddy',
    agency: 'V R Home & Property',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    properties: 57,
    experience: '5+ Yrs',
    forSale: 11,
    rentLease: 8
  },
  {
    name: 'Vinod Reddy',
    agency: 'V R Home & Property',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    properties: 57,
    experience: '5+ Yrs',
    forSale: 11,
    rentLease: 8
  },
  {
    name: 'Vinod Reddy',
    agency: 'V R Home & Property',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    properties: 57,
    experience: '5+ Yrs',
    forSale: 11,
    rentLease: 8
  }
];

export const AgentSection: React.FC = () => {
  return (
    <section className="font-poppins py-16 bg-[#FAFAFA] relative overflow-hidden">
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
        <div className="flex justify-center mb-4">
          <div className="relative inline-block border-b-2 border-[#0B2C5C] pb-3">
            <h2 className="text-3xl font-bold text-[#0B2C5C] font-heading">
              Gummaam Verified Agents
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
              {dummyAgents.map((agent, idx) => (
                <CarouselItem key={idx} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div
                    className="rounded-[16px] p-5 shadow-sm border border-gray-200/60 flex flex-col h-full"
                    style={{ background: 'linear-gradient(180deg, #D3EAFF 65%, #FFFFFF 100%)' }}
                  >

                    {/* Top Profile Area - Row Layout */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative w-[88px] h-[88px] shrink-0">
                        <img
                          src={agent.image}
                          alt={agent.name}
                          className="w-full h-full object-cover rounded-full border-[3px] border-white shadow-sm"
                        />
                        {/* Gold Badge */}
                        <div className="absolute -bottom-3 -right-3">
                          <img
                            src="/icons/golden-badge.png"
                            alt="Golden Badge"
                            className="w-12 h-12 object-contain drop-shadow-sm"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <div className="flex items-center text-black text-[14px] mb-1 font-normal">
                          <img
                            src="/icons/verified.png"
                            alt="Verified"
                            className="w-[18px] h-[18px] mr-1.5 object-contain"
                          />
                          Verified
                        </div>
                        <h3 className="text-[24px] font-bold text-black leading-tight">{agent.name}</h3>
                        <p className="text-[15px] text-[#818181] font-medium mt-0.5">{agent.agency}</p>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="bg-white rounded-[12px] p-5 shadow-sm border border-gray-200 relative mb-5">
                      {/* Custom Dividers */}
                      <div className="absolute left-1/2 top-5 bottom-5 w-px bg-gray-200"></div>
                      <div className="absolute top-1/2 left-5 right-5 h-px bg-gray-200"></div>

                      <div className="grid grid-cols-2 gap-y-6 gap-x-4 relative z-10">

                        {/* Properties */}
                        <div className="flex items-start gap-3">
                          <Building2 className="w-5 h-5 text-gray-700 shrink-0 mt-0.5" />
                          <div className="flex flex-col">
                            <span className="text-[13px] text-gray-600 leading-tight mb-1">Properties:</span>
                            <span className="text-[20px] font-bold text-[#00478F] leading-none">{agent.properties}</span>
                          </div>
                        </div>

                        {/* Experience */}
                        <div className="flex items-start gap-3 pl-2">
                          <Calendar className="w-5 h-5 text-gray-700 shrink-0 mt-0.5" />
                          <div className="flex flex-col">
                            <span className="text-[13px] text-gray-600 leading-tight mb-1">Experience:</span>
                            <span className="text-[20px] font-bold text-[#00478F] leading-none">{agent.experience}</span>
                          </div>
                        </div>

                        {/* For Sale */}
                        <div className="flex items-start gap-3">
                          <Home className="w-5 h-5 text-gray-700 shrink-0 mt-0.5" />
                          <div className="flex flex-col w-full pr-2">
                            <span className="text-[13px] text-gray-600 leading-tight mb-1.5">For Sale:</span>
                            <span className="text-[20px] font-bold text-[#00478F] leading-none mb-2">{agent.forSale < 10 ? `0${agent.forSale}` : agent.forSale}</span>
                            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-[#00478F]" style={{ width: '30%' }}></div>
                            </div>
                          </div>
                        </div>

                        {/* Rent / Lease */}
                        <div className="flex items-start gap-3 pl-2">
                          <Key className="w-5 h-5 text-gray-700 shrink-0 mt-0.5" />
                          <div className="flex flex-col w-full pr-2">
                            <span className="text-[13px] text-gray-600 leading-tight mb-1.5">Rent / Lease:</span>
                            <span className="text-[20px] font-bold text-[#00478F] leading-none mb-2">{agent.rentLease < 10 ? `0${agent.rentLease}` : agent.rentLease}</span>
                            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-[#00478F]" style={{ width: '15%' }}></div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-auto">
                      <button className="flex-1 bg-[#EB832D] text-white py-3 rounded-[16px] text-[12px] font-poppins font-semibold tracking-[1.2px] hover:bg-orange-600 transition-colors shadow-sm uppercase">
                        View Properties
                      </button>
                      <button className="flex-1 bg-[#00478F] text-white py-3 rounded-[16px] text-[12px] font-poppins font-semibold tracking-[1.2px] hover:bg-blue-900 transition-colors shadow-sm uppercase">
                        View Profile
                      </button>
                    </div>

                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Custom styled arrows */}
            <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-md border-0 text-[#0B2C5C] hover:bg-[#0B2C5C] hover:text-white transition-colors disabled:opacity-50 z-10 hidden md:flex" />
            <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-md border-0 text-[#0B2C5C] hover:bg-[#0B2C5C] hover:text-white transition-colors disabled:opacity-50 z-10 hidden md:flex" />
          </Carousel>
        </div>

      </div>
    </section>
  );
};

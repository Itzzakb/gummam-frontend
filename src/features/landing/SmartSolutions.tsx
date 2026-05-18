import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const SmartSolutions: React.FC = () => {
  return (
    <section className="font-poppins py-16 bg-[#FAFAFA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="flex justify-center mb-12">
          <div className="relative inline-block border-b-2 border-[#0B2C5C] pb-3">
            <h2 className="text-[28px] font-bold text-black font-heading text-center">
              Smart Solutions for Every Property Need
            </h2>
            <div className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#0B2C5C]"></div>
          </div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6 h-auto md:h-[340px]">
          
          {/* Sellers Card */}
          <div className="md:col-span-1 rounded-[16px] overflow-hidden relative group shadow-sm h-[300px] md:h-full cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
              alt="Sellers" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <h3 className="text-[22px] font-bold mb-1">Sellers</h3>
              <p className="text-[13px] text-gray-200 leading-snug font-light">
                list and promote your<br/>property in minutes.
              </p>
            </div>
          </div>

          {/* Agents Card */}
          <div className="md:col-span-1 rounded-[16px] overflow-hidden relative group shadow-sm h-[300px] md:h-full cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
              alt="Agents" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <h3 className="text-[22px] font-bold mb-1">Agents</h3>
              <p className="text-[13px] text-gray-200 leading-snug font-light">
                manage clients and<br/>deals all in one place.
              </p>
            </div>
          </div>

          {/* Wide Orange Card */}
          <div className="md:col-span-2 bg-[#E67E22] rounded-[16px] p-8 sm:p-10 flex flex-col justify-center shadow-sm relative h-[300px] md:h-full overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
            <h2 className="text-white text-[32px] sm:text-[40px] lg:text-[46px] font-bold leading-[1.2] z-10 font-heading">
              FIND YOUR DREAM<br/>HOME WITH<br/>GUMMAAM
            </h2>
            
            <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 z-10">
              <button className="bg-[#00478F] text-white px-5 py-2.5 rounded-full flex items-center gap-2 font-semibold text-[14px] hover:bg-blue-900 transition-colors shadow-sm">
                Start Searching
                <ArrowUpRight className="w-[18px] h-[18px] stroke-[2.5]" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

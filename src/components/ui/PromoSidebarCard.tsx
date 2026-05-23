import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const PromoSidebarCard: React.FC = () => {
  return (
    <div className="bg-[#1a1435] rounded-xl overflow-hidden font-poppins relative h-[500px] flex flex-col border border-gray-800 shadow-md">
      {/* Background City Image Overlay */}
      <div className="absolute inset-0 opacity-40 mix-blend-luminosity">
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" alt="City Background" className="w-full h-full object-cover" />
      </div>

      <div className="p-6 relative z-10">
        <h3 className="text-white text-[24px] font-bold mb-3 leading-tight mt-6 shadow-black drop-shadow-md flex flex-col">
          <span className="text-[16px] font-medium opacity-90">Post You</span>
          <span className="text-[28px]">Property</span>
        </h3>
        <p className="text-gray-100 text-[14px] leading-relaxed mb-8 font-medium drop-shadow-md">
          Reach thousands of buyers and renters by listing your property.
        </p>
        
        <button className="bg-[#035096] hover:bg-blue-900 text-white px-6 py-2.5 rounded-full text-[14px] font-semibold transition-colors shadow-lg flex items-center gap-2">
          Post Property <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
      
      {/* Bottom house images cards */}
      <div className="absolute bottom-4 left-0 w-full px-4 z-10 flex gap-2 h-[180px]">
         <div className="flex-1 rounded-lg overflow-hidden border border-white/20 shadow-xl bg-white">
            <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&q=80" alt="Home 1" className="w-full h-full object-cover" />
         </div>
         <div className="flex-1 rounded-lg overflow-hidden border border-white/20 shadow-xl bg-white translate-y-[-10px]">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&q=80" alt="Home 2" className="w-full h-full object-cover" />
         </div>
         <div className="flex-1 rounded-lg overflow-hidden border border-white/20 shadow-xl bg-white">
            <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&q=80" alt="Home 3" className="w-full h-full object-cover" />
         </div>
      </div>
      {/* Gradient fade to dark purple at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-t from-[#140b2e] via-[#1a1435]/80 to-transparent"></div>
    </div>
  );
};

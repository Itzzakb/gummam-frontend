import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const PromoSidebarCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-[#2D333F] to-[#1E222A] rounded-xl overflow-hidden font-poppins relative min-h-[360px] flex flex-col">
      <div className="p-6 relative z-10 flex-1">
        <p className="text-gray-300 text-[14px] font-medium mb-1">Post You</p>
        <h3 className="text-white text-[28px] font-bold mb-4 leading-tight">Property</h3>
        <p className="text-gray-300 text-[12px] leading-relaxed mb-6 max-w-[200px]">
          Reach thousands of buyers and renters by listing your property.
        </p>
        
        <button className="bg-[#0B2C5C] hover:bg-[#0B2C5C]/90 text-white px-5 py-2.5 rounded-full text-[13px] font-medium flex items-center gap-2 transition-all shadow-sm">
          Post Property
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
      
      {/* Background decoration - House image snippet */}
      <div className="absolute bottom-0 left-0 w-full h-[140px] opacity-90 overflow-hidden mt-auto">
         <div className="flex gap-2 h-full absolute bottom-0 left-0 w-[120%] rotate-2 translate-y-4">
             <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&q=80" alt="Home 1" className="w-1/3 h-full object-cover rounded-md" />
             <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&q=80" alt="Home 2" className="w-1/3 h-full object-cover rounded-md -translate-y-4" />
             <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&q=80" alt="Home 3" className="w-1/3 h-full object-cover rounded-md -translate-y-8" />
         </div>
         {/* Gradient overlay to fade bottom images */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      </div>
    </div>
  );
};

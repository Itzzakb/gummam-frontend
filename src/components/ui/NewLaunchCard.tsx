import React from 'react';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface NewLaunchCardProps {
  id?: number | string;
  image: string;
  tagLabel: string;
  title: string;
  description: string;
  location: string;
}

export const NewLaunchCard: React.FC<NewLaunchCardProps> = ({
  id = 1, image, tagLabel, title, description, location
}) => {
  return (
    <div className="bg-white rounded-[20px] overflow-hidden border border-gray-200/60 shadow-sm font-poppins flex flex-col sm:flex-row h-full">
      {/* Left Image Section */}
      <div className="relative w-full sm:w-[45%] h-[200px] sm:h-[260px] shrink-0">
        {/* NEW Ribbon - Solid Triangle */}
        <div className="absolute top-0 left-0 w-[85px] h-[85px] overflow-hidden rounded-tl-[20px] z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[#F6931D]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
          <div className="absolute top-[18px] left-[10px] text-white font-bold text-[15px] -rotate-45 origin-center tracking-wider z-20">
            NEW
          </div>
        </div>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Right Content Section */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col">
        <div className="text-[#F6931D] text-[11px] font-bold uppercase tracking-wider mb-2">
          {tagLabel}
        </div>
        <h3 className="text-2xl font-bold text-[#0B2C5C] mb-3">{title}</h3>
        <p className="text-gray-500 text-[14px] leading-relaxed mb-6 line-clamp-2">
          {description}
        </p>
        
        <div className="mt-auto flex justify-between items-center">
          <p className="text-[14px] text-gray-500 flex items-center">
            <MapPin className="w-4 h-4 mr-1.5 text-gray-400" /> {location}
          </p>
          <Link to={`/property/${id}`} className="px-5 py-2 border border-[#0B2C5C] text-[#0B2C5C] rounded-lg text-[13px] font-semibold hover:bg-[#0B2C5C] hover:text-white transition-colors text-center">
            View Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

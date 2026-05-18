import React from 'react';

export interface CityCardProps {
  name: string;
  propertyCount: number;
  image: string;
}

export const CityCard: React.FC<CityCardProps> = ({ name, propertyCount, image }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden h-[340px] md:h-[380px] shadow-sm font-poppins group cursor-pointer border border-gray-100/50">
      <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      {/* Dark gradient overlay at top */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B2C5C]/90 via-transparent to-transparent opacity-90"></div>
      
      <div className="absolute top-5 left-5">
        <h3 className="text-white text-[22px] font-bold tracking-wide">{name}</h3>
        <p className="text-gray-200 text-[13px] font-medium mt-0.5">{propertyCount} Properties</p>
      </div>
    </div>
  );
};

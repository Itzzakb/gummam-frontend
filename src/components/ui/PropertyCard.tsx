import React from 'react';
import { MapPin, BedDouble, Bath, Maximize } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface PropertyCardProps {
  id?: number | string;
  image: string;
  title: string;
  location: string;
  price: string;
  type: string;
  beds?: number;
  baths?: number;
  sqft: number;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  id = 1, image, title, location, price, type, beds, baths, sqft
}) => {
  const isRent = type.toLowerCase().includes('rent');

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200/60 shadow-sm font-poppins flex flex-col h-[400px]">
      <div className="relative h-[220px] overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-white border border-[#F6931D] text-black px-2.5 py-0.5 rounded text-[11px] font-medium shadow-sm">
          {type}
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-[15px] font-bold text-[#33353A] truncate mb-1">{title}</h3>
        
        <p className="text-[12px] text-gray-500 flex items-center mb-4">
          <MapPin className="w-3.5 h-3.5 mr-1 text-gray-400" /> {location}
        </p>
        
        <div className="flex items-center text-[12px] text-gray-500 mb-5 h-4">
          {beds !== undefined && (
            <>
              <div className="flex items-center gap-1.5">
                <BedDouble className="w-4 h-4 text-gray-400" />
                <span>{beds}</span>
              </div>
              <div className="w-[1px] h-3 bg-gray-300 mx-3"></div>
            </>
          )}
          {baths !== undefined && (
            <>
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-gray-400" />
                <span>{baths}</span>
              </div>
              <div className="w-[1px] h-3 bg-gray-300 mx-3"></div>
            </>
          )}
          <div className="flex items-center gap-1.5">
            <Maximize className="w-3.5 h-3.5 text-gray-400" />
            <span>{sqft} {sqft === 1500 ? 'sqft' : 'sqft'}</span>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-auto pt-4 flex justify-between items-center">
          <div className="text-[20px] font-bold text-[#0B2C5C] flex items-baseline">
            {price}
            {isRent && <span className="text-[11px] font-medium text-gray-500 ml-1">/Month</span>}
          </div>
          <Link to={`/property/${id}`} className="px-4 py-1.5 border border-[#0B2C5C] text-[#0B2C5C] rounded-md text-[12px] font-semibold hover:bg-[#0B2C5C] hover:text-white transition-colors text-center">
            View Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

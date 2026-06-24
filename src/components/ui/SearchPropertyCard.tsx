import React from 'react';
import { MapPin, BedDouble, Bath, Maximize, Heart, Share2, Star, Bus } from 'lucide-react';

import { Link } from 'react-router-dom';

export interface SearchPropertyCardProps {
  id: number;
  image: string;
  title: string;
  location?: string;
  price: string;
  type: string; // 'For Rent' | 'For Sale'
  beds?: number;
  baths?: number;
  sqft: number;
  description: string;
  updatedAt: string;
  viewType?: 'grid' | 'list';
}

export const SearchPropertyCard: React.FC<SearchPropertyCardProps> = ({
  id, image, title, location, price, type, beds, baths, sqft, description, updatedAt, viewType = 'grid'
}) => {
  const isRent = type.toLowerCase().includes('rent');

  if (viewType === 'list') {
    return (
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200/60 shadow-sm font-poppins flex flex-col">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row flex-1">
        {/* Image Section */}
        <div className="relative h-[200px] md:h-auto md:w-[280px] flex-shrink-0">
          <img src={image} alt={title} className="w-full h-full absolute inset-0 object-cover" />

          <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 rounded text-[13px] font-normal border border-[#E67E22] shadow-sm font-poppins">
            {type}
          </div>

          <div className="absolute top-4 right-4 flex gap-3 z-10">
            <button className="text-white hover:text-gray-200 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="text-white hover:text-gray-200 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute top-0 right-0 h-full w-[110px] bg-black/60 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-white text-[18px] font-medium leading-none mb-1">10+</span>
            <span className="text-white text-[13px] font-medium">Photos</span>
          </div>

          <div className="absolute bottom-0 left-0 bg-black/70 px-4 py-1.5">
            <span className="text-white text-[13px] font-normal font-poppins">Updated {updatedAt}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col min-w-0">
          <h3 className="text-[18px] font-bold text-[#1A1A1A] mb-1.5 leading-tight">{title}</h3>
          
          <div className="flex items-start gap-1 mb-4">
            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="text-[13px] text-gray-500">{location || 'Apartment, P&T Colony, Dilsukhnagar, Hyderabad.'}</span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="border border-gray-200 rounded px-2.5 py-1.5 text-[12px] flex items-center overflow-hidden whitespace-nowrap">
              <span className="text-gray-600 mr-1 flex-shrink-0">Rent: </span>
              <span className="text-[#035096] font-bold truncate">{price}</span>
            </div>
            <div className="border border-gray-200 rounded px-2.5 py-1.5 text-[12px] flex items-center overflow-hidden whitespace-nowrap">
              <span className="text-gray-600 mr-1 flex-shrink-0">Deposit: </span>
              <span className="text-[#035096] font-bold truncate">3 Months</span>
            </div>
            <div className="border border-gray-200 rounded px-2.5 py-1.5 text-[12px] flex items-center overflow-hidden whitespace-nowrap">
              <span className="text-gray-600 mr-1 flex-shrink-0">Buildup Area: </span>
              <span className="text-[#035096] font-bold truncate">{sqft} Sq.Ft.</span>
            </div>
            <div className="border border-gray-200 rounded px-2.5 py-1.5 text-[12px] flex items-center overflow-hidden whitespace-nowrap">
              <span className="text-gray-600 mr-1 flex-shrink-0">Facing: </span>
              <span className="text-[#035096] font-bold truncate">East</span>
            </div>
            <div className="border border-gray-200 rounded px-2.5 py-1.5 text-[12px] flex items-center overflow-hidden whitespace-nowrap">
              <span className="text-gray-600 mr-1 flex-shrink-0">Wash Rooms: </span>
              <span className="text-[#035096] font-bold truncate">{baths ? `0${baths}` : '05'}</span>
            </div>
            <div className="border border-gray-200 rounded px-2.5 py-1.5 text-[12px] flex items-center overflow-hidden whitespace-nowrap">
              <span className="text-gray-600 mr-1 flex-shrink-0">Availability: </span>
              <span className="text-[#035096] font-bold truncate">01 Jan 2026</span>
            </div>
          </div>

          <p className="text-[13px] text-gray-500 truncate mb-4 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap justify-between items-center pb-1 gap-3">
            <div className="flex items-center gap-2 text-[13px] text-[#1A1A1A] font-medium">
              <Bus className="w-4 h-4" />
              <span>1.5 Km From Bus Stop/Metro/MMTS</span>
            </div>
            <a href="#" className="text-[13px] font-medium text-[#035096] underline hover:text-blue-800">
              Explore Similar Properties
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-5 py-3 border-t border-gray-200 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[14px] text-[#1A1A1A]">Agent Name: <span className="font-bold">Ravi Kumar</span></span>
          <div className="flex gap-0.5 text-[#F6931D] ml-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="px-5 py-2.5 border border-[#E67E22] text-[#E67E22] rounded-lg text-[13px] font-semibold hover:bg-[#E67E22] hover:text-white transition-colors">
            Send A Message
          </button>
          <button className="px-5 py-2.5 bg-[#E67E22] text-white rounded-lg text-[13px] font-semibold hover:bg-orange-600 transition-colors border border-[#E67E22]">
            Contact Number
          </button>
        </div>
      </div>
    </div>
    );
  }

  // Grid View
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200/60 shadow-sm font-poppins flex flex-col h-[460px]">
      <div className="relative h-[240px] overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />

        <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 rounded text-[13px] font-normal border border-[#E67E22] shadow-sm font-poppins">
          {type}
        </div>

        <div className="absolute top-4 right-4 flex gap-3 z-10">
          <button className="text-white hover:text-gray-200 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="text-white hover:text-gray-200 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute top-0 right-0 h-full w-[110px] bg-black/60 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-white text-[18px] font-medium leading-none mb-1">10+</span>
          <span className="text-white text-[13px] font-medium">Photos</span>
        </div>

        <div className="absolute bottom-0 left-0 bg-black/70 px-4 py-1.5">
          <span className="text-white text-[13px] font-normal font-poppins">Updated {updatedAt}</span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start gap-1 mb-3">
          <MapPin className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
          <h3 className="text-[14px] font-bold text-[#33353A] leading-tight">{title}</h3>
        </div>

        <div className="flex items-center text-[13px] text-gray-600 mb-4 h-5">
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
            <Maximize className="w-4 h-4 text-gray-400" />
            <span>{sqft.toLocaleString()} sqft</span>
          </div>
        </div>

        <p className="text-[12px] text-gray-500 line-clamp-2 mb-4 leading-relaxed">
          {description}
        </p>

        <div className="border-t border-gray-100 mt-auto pt-4 flex justify-between items-center">
          <div className="text-[20px] font-bold text-[#0B2C5C] flex items-baseline">
            {price}
            {isRent && <span className="text-[11px] font-medium text-gray-500 ml-1">/Month</span>}
          </div>
          <Link 
            to={`/property/${id}`}
            className="px-5 py-1.5 border border-[#0B2C5C] text-[#0B2C5C] rounded-md text-[12px] font-semibold hover:bg-[#0B2C5C] hover:text-white transition-colors text-center inline-block"
          >
            View Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { MapPin, BedDouble, Bath, Maximize, Heart, Share2, Mail, Phone } from 'lucide-react';
import { Button } from './Button';

export interface SearchPropertyCardProps {
  image: string;
  title: string;
  location: string;
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
  image, title, location, price, type, beds, baths, sqft, description, updatedAt, viewType = 'grid'
}) => {
  const isRent = type.toLowerCase().includes('rent');

  if (viewType === 'list') {
    return (
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200/60 shadow-sm font-poppins flex flex-col md:flex-row h-auto md:min-h-[220px] mb-4">
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
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-start gap-1 mb-2">
            <MapPin className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
            <h3 className="text-[15px] font-bold text-[#33353A] leading-tight">{title}</h3>
          </div>

          <div className="flex items-center text-[13px] text-gray-600 mb-3 h-5">
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

          <div className="flex items-center gap-4 mb-3 text-[10px] md:text-[11px] text-gray-500 font-medium">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-500"></div> East facing property</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-500"></div> Near uppal metro station</div>
          </div>

          <p className="text-[12px] text-gray-500 line-clamp-2 mb-4 leading-relaxed">
            {description}
          </p>

          <div className="mt-auto flex justify-between items-end border-t border-gray-100 pt-3">
            <div className="text-[22px] font-bold text-[#0B2C5C] flex items-baseline">
              {price}
              {isRent && <span className="text-[12px] font-medium text-gray-500 ml-1">/Month</span>}
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-[#F6931D] text-[#F6931D] rounded-md text-[12px] font-semibold hover:bg-[#F6931D] hover:text-white transition-colors">
                Send A Message
              </button>
              <button className="px-4 py-2 bg-[#F6931D] text-white rounded-md text-[12px] font-semibold hover:bg-orange-600 transition-colors">
                Contact Owner
              </button>
            </div>
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
          <button className="px-5 py-1.5 border border-[#0B2C5C] text-[#0B2C5C] rounded-md text-[12px] font-semibold hover:bg-[#0B2C5C] hover:text-white transition-colors">
            View Detail
          </button>
        </div>
      </div>
    </div>
  );
};

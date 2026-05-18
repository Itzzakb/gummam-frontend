import React from 'react';
import { Heart, Bed, Bath } from 'lucide-react';

export interface TrendingPropertyCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  isFavorite?: boolean;
}

export const TrendingPropertyCard: React.FC<TrendingPropertyCardProps> = ({
  image, title, location, price, beds, baths, sqft, isFavorite
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full font-poppins">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Heart Icon */}
        <div className="absolute top-4 right-4">
          <Heart
            className={`w-6 h-6 cursor-pointer drop-shadow-md ${isFavorite ? 'fill-[#E63946] text-[#E63946]' : 'text-white'}`}
          />
        </div>
      </div>

      <div className="px-3 py-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-[14px] text-gray-400 mb-5">{location}</p>

        {/* Pills */}
        <div className="flex gap-3 mb-6">
          <div className="border border-gray-200 rounded-lg px-3 py-1.5 flex items-center gap-2 text-gray-600">
            <Bed className="w-4 h-4" />
            <span className="text-[14px] font-medium">{beds} Beds</span>
          </div>
          <div className="border border-gray-200 rounded-lg px-3 py-1.5 flex items-center gap-2 text-gray-600">
            <Bath className="w-4 h-4" />
            <span className="text-[14px] font-medium">{baths} Baths</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 mt-auto">
          <div className="text-[20px] font-bold text-[#F6931D]">{price}</div>
          <div className="text-[15px] font-medium text-gray-400">{sqft}</div>
        </div>
      </div>
    </div>
  );
};

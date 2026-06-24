import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Calendar, Home, Key } from 'lucide-react';

export interface AgentCardProps {
  image: string;
  name: string;
  company: string;
  properties: number;
  experience: string;
  forSale?: number;
  rentLease?: number;
}

export const AgentCard: React.FC<AgentCardProps> = ({
  image, name, company, properties, experience, forSale = 11, rentLease = 8
}) => {
  return (
    <div
      className="rounded-[16px] p-5 shadow-sm border border-gray-200/60 flex flex-col h-full font-poppins"
      style={{ background: 'linear-gradient(180deg, #D3EAFF 65%, #FFFFFF 100%)' }}
    >
      {/* Top Profile Area - Row Layout */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-[88px] h-[88px] shrink-0">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-full border-[3px] border-white shadow-sm"
          />
          {/* Gold Badge */}
          <div className="absolute -bottom-3 -right-3">
            <img
              src="/icons/golden-badge.png"
              alt="Golden Badge"
              className="w-12 h-12 object-contain drop-shadow-sm"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center text-black text-[14px] mb-1 font-normal">
            <img
              src="/icons/verified.png"
              alt="Verified"
              className="w-[18px] h-[18px] mr-1.5 object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            Verified
          </div>
          <h3 className="text-[24px] font-bold text-black leading-tight">{name}</h3>
          <p className="text-[15px] text-[#818181] font-medium mt-0.5">{company}</p>
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
              <span className="text-[20px] font-bold text-[#00478F] leading-none">{properties}</span>
            </div>
          </div>

          {/* Experience */}
          <div className="flex items-start gap-3 pl-2">
            <Calendar className="w-5 h-5 text-gray-700 shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-[13px] text-gray-600 leading-tight mb-1">Experience:</span>
              <span className="text-[20px] font-bold text-[#00478F] leading-none">{experience}</span>
            </div>
          </div>

          {/* For Sale */}
          <div className="flex items-start gap-3">
            <Home className="w-5 h-5 text-gray-700 shrink-0 mt-0.5" />
            <div className="flex flex-col w-full pr-2">
              <span className="text-[13px] text-gray-600 leading-tight mb-1.5">For Sale:</span>
              <span className="text-[20px] font-bold text-[#00478F] leading-none mb-2">{forSale < 10 ? `0${forSale}` : forSale}</span>
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
              <span className="text-[20px] font-bold text-[#00478F] leading-none mb-2">{rentLease < 10 ? `0${rentLease}` : rentLease}</span>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#00478F]" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-auto">
        <Link
          to={`/agent/${encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'))}/properties`}
          className="flex-1 bg-[#EB832D] text-white py-3 rounded-[16px] text-[12px] font-poppins font-semibold tracking-[1.2px] hover:bg-orange-600 transition-colors shadow-sm uppercase text-center flex items-center justify-center"
        >
          View Properties
        </Link>
        <Link to={`/agent/${encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'))}`} className="flex-1 bg-[#00478F] text-white py-3 rounded-[16px] text-[12px] font-poppins font-semibold tracking-[1.2px] hover:bg-blue-900 transition-colors shadow-sm uppercase text-center flex items-center justify-center">
          View Profile
        </Link>
      </div>
    </div>
  );
};

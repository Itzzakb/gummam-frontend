import React, { type ReactNode } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DropdownFieldProps {
  icon?: ReactNode;
  label: string;
  options: string[];
}

const DropdownField: React.FC<DropdownFieldProps> = ({ icon, label, options }) => {
  return (
    <div className="flex-1  relative h-full">
      <Select>
        <SelectTrigger
          className="border border-gray-100 rounded-xl px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors bg-white h-full min-h-[56px] shadow-none focus:ring-0 [&>svg]:ml-2 [&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-gray-800"
          style={{ boxShadow: 'none' }}
        >
          <div className="flex items-center gap-3 shrink-0">
            {icon}
            <span className="text-[14px] font-medium text-gray-800 whitespace-nowrap">
              <SelectValue placeholder={label} />
            </span>
          </div>
        </SelectTrigger>
        <SelectContent className="bg-white border-gray-100 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] py-2 font-poppins z-50">
          {options.map((opt, idx) => (
            <SelectItem
              key={idx}
              value={opt}
              className="px-5 py-3 cursor-pointer text-[14px] font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:bg-gray-50 focus:text-gray-900 rounded-none data-[state=checked]:bg-gray-50 data-[state=checked]:text-[#0B2C5C]"
            >
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export const HeroSection: React.FC = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 font-poppins bg-[#FAFAFA] pb-10">
      <div className="max-w-7xl mx-auto rounded-[40px] relative overflow-hidden bg-gradient-to-r from-[#D7E5F0] via-[#EAEBE5] to-[#F1D7C2] pt-16 pb-20 px-10 sm:px-16 flex flex-col lg:flex-row items-center min-h-[600px] mt-4 shadow-sm">

        {/* Noise Texture Overlay */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.4] mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        ></div>

        {/* Left Content */}
        <div className="w-full lg:w-1/2 relative z-10 flex flex-col justify-center">
          <p className="text-black font-normal mb-2 text-[14px]">Welcome to Realstate</p>
          <h1 className="text-[36px] font-bold font-heading text-[#0B2C5C] leading-[1.2] mb-4">
            Find The Perfect Place to <br />
            Live With your favorites
          </h1>
          <p className="text-black font-normal text-[14px] mb-16">
            Let's find a place that's perfect for you
          </p>

          {/* Search Box Container */}
          <div className="mt-8 relative w-full lg:w-[130%] xl:w-[140%] z-20 font-poppins">
            {/* Floating Tabs */}
            <div className="bg-white rounded-t-2xl px-8 py-5 flex gap-8 w-max shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
              <div className="relative cursor-pointer">
                <span className="text-[14px] font-medium text-gray-900">All</span>
                <div className="absolute -bottom-5 left-0 w-full h-[3px] bg-black rounded-full"></div>
              </div>
              <span className="text-[14px] font-medium text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">For Sale</span>
              <span className="text-[14px] font-medium text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">For Rent</span>
              <span className="text-[14px] font-medium text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">Commercial</span>
              <span className="text-[14px] font-medium text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">New Launch</span>
              <span className="text-[14px] font-medium text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">Plots/Land</span>
            </div>

            {/* Main Search Bar Pill */}
            <div className="bg-white rounded-b-2xl rounded-tr-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] p-3.5 flex flex-wrap lg:flex-nowrap items-center gap-2 w-full lg:w-max">

              {/* Location */}
              <DropdownField
                label="Location"
                options={['Hyderabad', 'Hitec City', 'Uppal', 'Lingampalli']}
                icon={<svg className="w-5 h-5 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>}
              />

              {/* Property Type */}
              <DropdownField
                label="Property Type"
                options={['Apartment', 'Villa', 'Commercial', 'Land']}
                icon={<svg className="w-5 h-5 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>}
              />

              {/* Budget */}
              <DropdownField
                label="Budget"
                options={['Under ₹50L', '₹50L - ₹1Cr', '₹1Cr - ₹5Cr', 'Above ₹5Cr']}
                icon={<span className="font-medium text-gray-600 text-[16px] shrink-0 whitespace-nowrap">₹</span>}
              />

              {/* Mic Icon */}
              <button className="w-[52px] h-[52px] rounded-full bg-gray-100/80 flex items-center justify-center hover:bg-gray-200 transition-colors shrink-0 mx-1">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
              </button>

              {/* Regular Search */}
              <button className="bg-[#E67817] hover:bg-[#D5680E] text-white px-7 py-4 rounded-full font-medium text-[14px] transition-colors flex items-center gap-2 shrink-0 shadow-lg shadow-orange-500/20">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                Regular Search
              </button>

              {/* AI Search */}
              <div className="rounded-full p-[2px] bg-gradient-to-r from-[#4885FF] to-[#F68035] shrink-0 shadow-lg shadow-blue-900/20">
                <button className="bg-[#035096] hover:bg-[#024078] text-white px-7 py-4 rounded-full font-medium text-[14px] transition-colors flex items-center gap-2 w-full h-full">
                  <img src="/icons/ai-brain.png" alt="AI Brain" className="w-5 h-5 object-contain" />
                  Ai Search
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Right Content - 3D House Image */}
        <div className="w-full lg:w-1/2 absolute right-0 top-0 bottom-0 h-full flex justify-end pointer-events-none">
          <img src="/images/hero-img.png" alt="hero-img" />
        </div>

      </div>

      {/* Floating Ask Gummaam Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <img src="/images/chat-support-woman.png" alt="chat" className='w-30 m-auto' />
        <div className="rounded-full bg-gradient-to-r from-[#EB6753] to-[#4885FF] p-[3px] shadow-2xl shadow-blue-900/40 cursor-pointer hover:scale-105 transition-transform">
          <button className="bg-[#0B2C5C] hover:bg-[#082046] text-white px-5 py-3 rounded-full text-sm transition-colors flex items-center gap-1 h-full w-full">
            <span className="font-bold">Ask</span> <span className="font-normal">Gummaam</span>
            <div className="w-7 h-7 rounded-full bg-[#37B2FF] flex items-center justify-center shadow-inner ml-1 overflow-hidden">
              <img
                src="/images/gummaam-logo.png"
                alt="Gummaam Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </button>
        </div>
      </div>

    </div>
  );
};

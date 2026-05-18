import React, { useState } from 'react';
import { AuthDialog } from '../ui/AuthDialog';

export const Navbar: React.FC = () => {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  return (
    <>
      <style>{`
        @keyframes shimmer-line {
          0% {
            transform: translateX(-100%) skewX(-20deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(350%) skewX(-20deg);
            opacity: 0;
          }
        }

        .shimmer-btn {
          position: relative;
          overflow: hidden;
        }

        .shimmer-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 30%;
          height: 100%;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(255, 255, 255, 0.25) 45%,
            rgba(255, 255, 255, 0.5) 50%,
            rgba(255, 255, 255, 0.25) 55%,
            transparent 100%
          );
          transform: translateX(-100%) skewX(-20deg);
          animation: shimmer-line 2.5s ease-in-out infinite;
          pointer-events: none;
        }
      `}</style>

      <div className="pt-6 px-4 sm:px-6 lg:px-8 font-poppins bg-[#FAFAFA]">
        <nav className="max-w-7xl mx-auto bg-[#F0F4F9] rounded-full px-6 py-3 flex justify-between items-center shadow-sm">

          {/* Logo Section */}
          <div className="flex items-center gap-3 cursor-pointer">
            <img src="/images/main-logo-2.png" alt="logo" className="" />
          </div>

          {/* Center Links - White Pill */}
          <div className="hidden lg:flex items-center bg-white rounded-full px-8 py-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)] gap-8">
            <div className="relative group cursor-pointer">
              <span className="text-[#1A2B4C] font-semibold text-sm">Projects</span>
              <div className="absolute -bottom-3 left-0 w-full h-[3px] bg-[#F6931D] rounded-full"></div>
            </div>
            <span className="text-[#173F8D] font-medium text-sm cursor-pointer hover:text-[#F6931D] transition-colors">Map-View</span>
            <span className="text-[#173F8D] font-medium text-sm cursor-pointer hover:text-[#F6931D] transition-colors">Commercial</span>
            <span className="text-[#173F8D] font-medium text-sm cursor-pointer hover:text-[#F6931D] transition-colors">CRM</span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-start gap-1 cursor-pointer">
              <img src="/images/diamond.png" alt="membership" style={{ height: '30px', width: '30px' }} />
              <div className="flex flex-col leading-tight">
                <span className="text-[#E67E22] font-semibold text-[20px]">Member</span>
                <span className="text-[#E67E22] font-semibold text-center text-[12px]">Ship</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsAuthDialogOpen(true)}
              className="hidden md:flex items-center gap-1 cursor-pointer"
            >
              <img src="/icons/solar_user-broken.png" alt="user" style={{ height: '24px', width: '24px' }} />
              <span className="text-[#0B2C5C] font-semibold text-sm">Login</span>
            </button>

            <div className='bg-[#0b2c5c] w-[2px] h-[50px]'></div>

            <div className="rounded-full p-[2px] bg-gradient-to-r from-[#4885FF] to-[#F68035] shadow-lg shadow-blue-900/20">
              <button className="shimmer-btn bg-[#035096] hover:bg-[#024078] text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors flex items-center gap-2 h-full w-full">
                Post Property
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 19L19 5M19 5v10M19 5H9"></path>
                </svg>
              </button>
            </div>
          </div>

        </nav>
      </div>

      <AuthDialog isOpen={isAuthDialogOpen} onClose={() => setIsAuthDialogOpen(false)} />
    </>
  );
};
import React, { useState } from 'react';
import { AuthDialog } from '../ui/AuthDialog';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Add this to your global CSS or a <style> tag:
// @keyframes spin-border {
//   0% { --angle: 0deg; }
//   100% { --angle: 360deg; }
// }

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <style>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes spin-border {
          0%   { --angle: 0deg; }
          100% { --angle: 360deg; }
        }

        .animated-border-btn {
          position: relative;
          border-radius: 9999px;
          padding: 2px;
          background: conic-gradient(
            from var(--angle),
            #4885FF,
            #F68035,
            #4885FF
          );
          animation: spin-border 2.5s linear infinite;
          box-shadow: 0 8px 25px rgba(8, 66, 152, 0.3);
        }

        .animated-border-btn:hover {
          box-shadow: 0 8px 32px rgba(8, 66, 152, 0.5);
        }
      `}</style>

      <div className="pt-6 px-4 sm:px-6 lg:px-8 font-poppins bg-[#FAFAFA]">
        <nav className="max-w-7xl mx-auto bg-[#F0F4F9] rounded-full px-6 py-3 flex justify-between items-center shadow-sm">

          {/* Logo Section */}
          <div onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer">
            <img src="/images/main-logo-2.png" alt="logo" />
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
            <div onClick={() => navigate('/membership')} className="hidden md:flex items-start gap-1 cursor-pointer">
              <img src="/images/diamond.png" alt="membership" style={{ height: '30px', width: '30px' }} />
              <div className="flex flex-col leading-tight">
                <span className="text-[#E67E22] font-semibold text-[20px]">Member</span>
                <span className="text-[#E67E22] font-semibold text-center text-[12px]">Ship</span>
              </div>
            </div>

            {!isAuthenticated ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsAuthDialogOpen(true)}
                  className="hidden md:flex items-center gap-1 cursor-pointer"
                >
                  <img src="/icons/solar_user-broken.png" alt="user" style={{ height: '24px', width: '24px' }} />
                  <span className="text-[#0B2C5C] font-semibold text-sm">Login</span>
                </button>

                <div className='bg-[#0b2c5c] w-[2px] h-[50px]'></div>
              </>
            ) : null}

            {/* ✅ Animated rotating border button */}
            <div className="animated-border-btn">
              <button className="bg-[#035096] hover:bg-[#024078] text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors flex items-center gap-2 h-full w-full">
                Post Property
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 19L19 5M19 5v10M19 5H9"></path>
                </svg>
              </button>
            </div>

            {/* Profile Avatar and Dropdown when authenticated */}
            {isAuthenticated && (
              <div className="relative flex items-center">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-[#0B56A2] p-[2px] overflow-hidden focus:outline-none"
                >
                  <img
                    src={user?.avatarUrl || "/images/profile_avatar.png"}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsDropdownOpen(false)}
                    ></div>
                    <div className="absolute right-0 top-full mt-3 w-52 bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-slate-100 py-1.5 z-50">
                      {/* Upward pointer arrow */}
                      <div className="absolute -top-[6px] right-4 w-3 h-3 bg-white border-t border-l border-slate-100 rotate-45"></div>
                      
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                        }}
                        className="relative flex items-center gap-4 w-full px-5 py-3 text-left text-[15px] font-normal text-black hover:bg-slate-50/80 transition-colors"
                      >
                        <svg className="w-5 h-5 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        My Profile
                      </button>

                      <div className="border-t border-slate-100 my-1 mx-4"></div>

                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          logout();
                        }}
                        className="relative flex items-center gap-4 w-full px-5 py-3 text-left text-[15px] font-normal text-black hover:bg-slate-50/80 transition-colors"
                      >
                        <svg className="w-5 h-5 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18.36 5.64A9 9 0 1 0 18.36 18.36" />
                          <path d="M9 12h12M17 8l4 4-4 4" />
                        </svg>
                        Log Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

        </nav>
      </div>

      <AuthDialog isOpen={isAuthDialogOpen} onClose={() => setIsAuthDialogOpen(false)} />
    </>
  );
};
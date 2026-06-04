import React, { useState } from 'react';
import { AuthDialog } from '../ui/AuthDialog';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentPath = location.pathname;
  const stateCategory = location.state?.category;

  let activeTab = 'projects';
  if (currentPath.startsWith('/map-view')) {
    activeTab = 'map-view';
  } else if (currentPath === '/search' && stateCategory === 'Commercial') {
    activeTab = 'commercial';
  } else if (currentPath === '/search' && stateCategory === 'CRM') {
    activeTab = 'crm';
  } else if (currentPath === '/search') {
    activeTab = 'projects';
  }

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

      <div className="pt-6 px-4 sm:px-6 lg:px-8 font-poppins bg-[#FAFAFA] relative z-40">
        <nav className="max-w-7xl mx-auto bg-[#F0F4F9] rounded-full px-6 py-3 flex justify-between items-center shadow-sm">

          {/* Logo Section */}
          <div onClick={() => { setIsMobileMenuOpen(false); navigate('/'); }} className="flex items-center gap-3 cursor-pointer z-50">
            <img src="/images/main-logo-2.png" alt="logo" className="h-8 sm:h-10 w-auto object-contain" />
          </div>

          {/* Center Links - White Pill */}
          <div className="hidden lg:flex items-center bg-white rounded-full px-8 py-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)] gap-8">
            <div className="relative group cursor-pointer" onClick={() => navigate('/search', { state: { category: 'Projects' } })}>
              <span className={`text-sm ${activeTab === 'projects' ? 'text-[#0B2C5C] font-bold' : 'text-[#173F8D] font-medium hover:text-[#F6931D] transition-colors'}`}>Projects</span>
              {activeTab === 'projects' && <div className="absolute -bottom-3 left-0 w-full h-[3px] bg-[#F6931D] rounded-full"></div>}
            </div>
            
            <div className="relative group cursor-pointer" onClick={() => navigate('/map-view')}>
              <span className={`text-sm ${activeTab === 'map-view' ? 'text-[#0B2C5C] font-bold' : 'text-[#173F8D] font-medium hover:text-[#F6931D] transition-colors'}`}>Map-View</span>
              {activeTab === 'map-view' && <div className="absolute -bottom-3 left-0 w-full h-[3px] bg-[#F6931D] rounded-full"></div>}
            </div>

            <div className="relative group cursor-pointer" onClick={() => navigate('/search', { state: { category: 'Commercial' } })}>
              <span className={`text-sm ${activeTab === 'commercial' ? 'text-[#0B2C5C] font-bold' : 'text-[#173F8D] font-medium hover:text-[#F6931D] transition-colors'}`}>Commercial</span>
              {activeTab === 'commercial' && <div className="absolute -bottom-3 left-0 w-full h-[3px] bg-[#F6931D] rounded-full"></div>}
            </div>

            <div className="relative group cursor-pointer" onClick={() => navigate('/search', { state: { category: 'CRM' } })}>
              <span className={`text-sm ${activeTab === 'crm' ? 'text-[#0B2C5C] font-bold' : 'text-[#173F8D] font-medium hover:text-[#F6931D] transition-colors'}`}>CRM</span>
              {activeTab === 'crm' && <div className="absolute -bottom-3 left-0 w-full h-[3px] bg-[#F6931D] rounded-full"></div>}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 lg:gap-6">
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

                <div className='hidden md:block bg-[#0b2c5c] w-[2px] h-[50px]'></div>
              </>
            ) : null}

            {/* ✅ Animated rotating border button */}
            <div className="animated-border-btn hidden sm:block">
              <button className="bg-[#035096] hover:bg-[#024078] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 h-full w-full">
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
                  className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-[#0B56A2] p-[2px] overflow-hidden focus:outline-none"
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
                          navigate('/profile');
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
                        <LogOut className="w-5 h-5" />
                        Log Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-[#0B2C5C] hover:text-[#F68035] transition-colors focus:outline-none p-1.5 rounded-full hover:bg-gray-200/50"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </nav>

        {/* Mobile Quick Navigation Pills */}
        <div className="flex lg:hidden items-center gap-2 mt-4 px-4 overflow-x-auto whitespace-nowrap scrollbar-none scroll-smooth">
          {[
            { name: 'Projects', active: activeTab === 'projects', path: '/search', state: { category: 'Projects' } },
            { name: 'Map-View', active: activeTab === 'map-view', path: '/map-view' },
            { name: 'Commercial', active: activeTab === 'commercial', path: '/search', state: { category: 'Commercial' } },
            { name: 'CRM', active: activeTab === 'crm', path: '/search', state: { category: 'CRM' } }
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path, { state: item.state })}
              className={`px-4 py-1.5 rounded-full mb-2 font-medium text-[13px] border transition-all shadow-sm shrink-0 ${
                item.active
                  ? 'bg-[#0B2C5C] text-white border-transparent font-semibold'
                  : 'bg-white text-[#173F8D] border-gray-200/80 hover:border-[#173F8D] active:bg-gray-50'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Drawer Menu Sidebar */}
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-[100] lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      
      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-[110] lg:hidden flex flex-col pt-6 px-6 pb-8 shadow-2xl transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <img src="/images/main-logo-2.png" alt="logo" className="h-8 w-auto object-contain" />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 flex flex-col justify-between overflow-y-auto scrollbar-none">
          <div>
            {/* Profile / Auth Section at the Top */}
            <div className="mb-6">
              {!isAuthenticated ? (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAuthDialogOpen(true);
                  }}
                  className="w-full flex items-center gap-3 p-4 rounded-xl bg-[#F8FAFC] border border-slate-100 hover:bg-[#F1F5F9] transition-all"
                >
                  <img src="/icons/solar_user-broken.png" alt="user" className="h-6 w-6 object-contain" />
                  <span className="text-[#0B2C5C] font-semibold text-[15px]">Log In / Sign Up</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/profile');
                  }}
                  className="w-full flex items-center gap-3 p-4 rounded-xl bg-[#F8FAFC] border border-slate-100 hover:bg-[#F1F5F9] transition-all"
                >
                  <svg className="w-6 h-6 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <div className="flex flex-col text-left">
                    <span className="text-[#0B2C5C] font-semibold text-[15px]">My Profile</span>
                    {user?.email && <span className="text-xs text-slate-500 font-light mt-0.5">{user.email}</span>}
                  </div>
                </button>
              )}
            </div>

            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Quick Navigation</p>
            {/* Rounded pill tab design for nav links */}
            <div className="bg-[#F0F4F9] p-1.5 rounded-2xl flex flex-col gap-1.5 shadow-inner">
              {[
                { name: 'Projects', active: activeTab === 'projects', path: '/search', state: { category: 'Projects' } },
                { name: 'Map-View', active: activeTab === 'map-view', path: '/map-view' },
                { name: 'Commercial', active: activeTab === 'commercial', path: '/search', state: { category: 'Commercial' } },
                { name: 'CRM', active: activeTab === 'crm', path: '/search', state: { category: 'CRM' } }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate(item.path, { state: item.state });
                  }}
                  className={`w-full py-3 px-5 rounded-xl font-medium text-[15px] transition-all text-center ${
                    item.active
                      ? 'bg-white text-[#0B2C5C] shadow-sm font-semibold'
                      : 'text-[#173F8D] hover:bg-white/50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Extras */}
            <div className="mt-6 flex flex-col gap-4">
              <div
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/membership');
                }}
                className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-[#FFF5ED] to-[#FFEBE0] border border-orange-100 cursor-pointer hover:shadow-sm transition-all"
              >
                <img src="/images/diamond.png" alt="membership" className="h-8 w-8 object-contain" />
                <div className="flex flex-col">
                  <span className="text-[#E67E22] font-bold text-base leading-tight">Membership Plan</span>
                  <span className="text-[#E67E22]/80 text-xs mt-0.5">Explore premium benefits</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Actions: Post Property Call-to-action */}
          <div className="mt-8 flex flex-col gap-4">
            <div className="animated-border-btn w-full">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
                className="bg-[#035096] hover:bg-[#024078] text-white py-4 rounded-full font-bold text-center text-sm transition-colors flex items-center justify-center gap-2 w-full"
              >
                Post Property
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 19L19 5M19 5v10M19 5H9"></path>
                </svg>
              </button>
            </div>

            {isAuthenticated && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  logout();
                }}
                className="w-full py-4 text-center text-red-500 font-semibold border border-red-200 hover:bg-red-50 rounded-full transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            )}
          </div>
        </div>
      </div>

      <AuthDialog isOpen={isAuthDialogOpen} onClose={() => setIsAuthDialogOpen(false)} />
    </>
  );
};
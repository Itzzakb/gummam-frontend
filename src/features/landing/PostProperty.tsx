import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export const PostProperty: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, openAuthDialog } = useAuth();

  const handlePostPropertyClick = () => {
    if (!isAuthenticated) {
      openAuthDialog('agent');
    } else if (user?.role !== 'agent') {
      const confirmSwitch = window.confirm(
        "Only agents can post properties. Would you like to log in/register as an Agent?"
      );
      if (confirmSwitch) {
        logout();
        setTimeout(() => {
          openAuthDialog('agent');
        }, 100);
      }
    } else {
      navigate('/post-property');
    }
  };

  return (
    <section className="font-poppins py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EAF3FC] rounded-[20px] overflow-hidden flex flex-col md:flex-row items-center relative">

          {/* Left Side: Graphic */}
          <div className="w-full md:w-[55%] h-[300px] md:h-[400px] relative pl-8 py-8 md:pl-12 md:py-12 lg:pl-16 lg:py-16 pr-0">
            <img
              src="/images/post-property.png"
              alt="Post Property Blueprint"
              className="w-full h-full object-contain object-left"
            />
          </div>

          {/* Right Side: Content */}
          <div className="w-full md:w-[45%] p-8 md:py-12 md:pr-12 md:pl-4 lg:py-16 lg:pr-16 lg:pl-8 flex flex-col justify-center">
            <h2 className="text-[40px] md:text-[48px] font-bold mb-4 leading-[1.1] font-heading">
              <span className="text-[#0B4C8C]">Post Your</span><br />
              <span className="text-[#F58634]">Property</span>
            </h2>

            <p className="text-[16px] md:text-[18px] text-gray-600 mb-8 leading-relaxed pr-4">
              Reach thousands of buyers and renters by listing your property.
            </p>

            <div>
              <button 
                onClick={handlePostPropertyClick}
                className="bg-[#00478F] text-white px-7 py-3 rounded-[24px] flex items-center gap-2 font-semibold text-[15px] hover:bg-blue-900 transition-colors shadow-md border border-[#F58634]/50"
              >
                Post Property
                <ArrowUpRight className="w-[18px] h-[18px] stroke-[2]" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

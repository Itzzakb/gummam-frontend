import React from 'react';

export const AdSection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 justify-center items-center">
          <div className="w-full md:w-1/2 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <img
              src="/images/left-ad.png"
              alt="List and sell your property with Gummaam"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <img
              src="/images/right-ad.png"
              alt="List and sell your property with Gummaam"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';

export const PromoBanner: React.FC = () => {
  return (
    <section className="py-16 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <img 
          src="/images/promo-section.png" 
          alt="Promotional Banner" 
          className="w-full h-auto object-contain rounded-3xl shadow-xl"
        />
      </div>
    </section>
  );
};

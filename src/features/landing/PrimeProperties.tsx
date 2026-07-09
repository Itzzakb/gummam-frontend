import React, { useState } from 'react';
import { MapPin, BedDouble, Bath, Maximize, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PrimeProperty {
  id: number;
  title: string;
  description: string;
  location: string;
  beds: number;
  baths: number;
  sqft: string;
  images: string[];
}

const dummyPrimeProperties: PrimeProperty[] = [
  {
    id: 1,
    title: 'The Best View Villa',
    description: 'Experience modern living in this newly renovated 1,200 sq. ft. apartment. Features include a spacious open-concept living area, high-end stainless steel appliances, quartz countertops, and floor-to-ceiling windows with panoramic city views.',
    location: 'Hyderabad, Uppal',
    beds: 3,
    baths: 2,
    sqft: '1,200 sq. ft.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    ]
  },
  {
    id: 2,
    title: 'Luxury Heights',
    description: 'A stunning 4-bedroom penthouse with private terrace and infinity pool. Enjoy breathtaking views of the city skyline from your living room. Fully furnished with Italian marble and smart home features.',
    location: 'Hyderabad, Banjara Hills',
    beds: 4,
    baths: 4,
    sqft: '3,500 sq. ft.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    ]
  }
];

export const PrimeProperties: React.FC = () => {
  const [activePropIndex, setActivePropIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const currentProp = dummyPrimeProperties[activePropIndex];

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % currentProp.images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + currentProp.images.length) % currentProp.images.length);
  };

  return (
    <section className="font-poppins py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Heading */}
        <div className="flex justify-center mb-4">
          <div className="relative inline-block border-b-2 border-[#0B2C5C] pb-3">
            <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#0B2C5C] font-heading">
              Prime Properties
            </h2>
            <div className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#0B2C5C]"></div>
          </div>
        </div>

        {/* See All Link */}
        <div className="flex justify-end mb-8">
          <a href="#" className="text-[#0B2C5C] font-semibold text-[14px] underline hover:text-[#4885FF] transition-colors whitespace-nowrap">
            See all Properties
          </a>
        </div>

        {/* Main Card */}
        <div className="bg-[#F2F2F2] rounded-[24px] p-6 sm:p-10 lg:p-12 relative">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

            {/* Left Content */}
            <div className="w-full lg:w-[45%] flex flex-col justify-center">
              <h3 className="text-2xl sm:text-4xl font-bold text-black mb-4">{currentProp.title}</h3>
              <p className="text-gray-500 text-[15px] leading-relaxed mb-8">
                {currentProp.description}
              </p>

              <div className="mb-6">
                <p className="text-[15px] text-gray-600 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-gray-400" /> {currentProp.location}
                </p>
              </div>

              <div className="flex flex-wrap items-center text-[14px] sm:text-[15px] text-gray-600 mb-6 lg:mb-10 gap-3 sm:gap-6">
                <div className="flex items-center gap-2">
                  <BedDouble className="w-5 h-5 text-gray-400" />
                  <span>{currentProp.beds}</span>
                </div>
                <div className="hidden sm:block w-[1px] h-5 bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <Bath className="w-5 h-5 text-gray-400" />
                  <span>{currentProp.baths}</span>
                </div>
                <div className="hidden sm:block w-[1px] h-5 bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <Maximize className="w-5 h-5 text-gray-400" />
                  <span>{currentProp.sqft}</span>
                </div>
              </div>

              <div>
                <Link to={`/property/${currentProp.id}`} className="px-6 py-2 border border-[#0B2C5C] text-[#0B2C5C] rounded-lg text-[14px] font-semibold hover:bg-[#0B2C5C] hover:text-white transition-colors inline-block text-center">
                  View Detail
                </Link>
              </div>
            </div>

            {/* Right Image Slider */}
            <div className="w-full lg:w-[55%] relative flex items-center justify-center">
              <div className="w-full h-[250px] sm:h-[400px] bg-[#E3F2FD] rounded-xl border border-[#F6931D] p-3 relative">
                <img
                  src={currentProp.images[activeImageIndex]}
                  alt={currentProp.title}
                  className="w-full h-full object-cover rounded-lg"
                />

                {/* Arrows */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 sm:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-[#0B2C5C] hover:bg-[#0B2C5C] hover:text-white transition-colors z-10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 sm:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-[#0B2C5C] hover:bg-[#0B2C5C] hover:text-white transition-colors z-10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-10">
            {dummyPrimeProperties.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActivePropIndex(idx);
                  setActiveImageIndex(0);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ${idx === activePropIndex ? 'w-6 bg-black' : 'w-2.5 bg-black'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

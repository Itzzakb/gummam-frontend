import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    text: "Gummaam made finding our dream home incredibly easy. Their agents are professional and the platform is very user-friendly.",
    author: "Sneha Reddy",
    role: "Home Buyer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    text: "I sold my property within 2 weeks of listing it here. The premium placement and agent support was exceptional.",
    author: "Vikram Singh",
    role: "Property Seller",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    text: "What a great experience! I have visited one of the workshops and attended a masterclass, and both were super useful for young designers. Highly recommended.",
    author: "Ali Tufan",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 4,
    text: "The best real estate platform I've used. Accurate listings, great virtual tours, and transparent pricing.",
    author: "Anjali Desai",
    role: "Investor",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 5,
    text: "Absolutely phenomenal service. They took the time to understand exactly what I was looking for in a commercial property.",
    author: "Rajiv Menon",
    role: "Business Owner",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  }
];

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(2);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className="font-poppins py-20 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="flex justify-center mb-16">
          <div className="relative inline-block border-b-2 border-[#0B2C5C] pb-3">
            <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#0B2C5C] font-heading">
              Testimonials
            </h2>
            <div className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#0B2C5C]"></div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          
          {/* Quote Icon */}
          <div className="mb-6">
            <img src="/icons/quote.png" alt="Quote" className="w-[50px] h-[50px] object-contain" />
          </div>

          {/* Testimonial Text */}
          <p className="text-[18px] sm:text-[22px] font-bold text-[#1A1A1A] leading-[1.8] mb-8 min-h-[120px] flex items-center justify-center">
            {activeTestimonial.text}
          </p>

          {/* Author Info */}
          <div className="mb-12">
            <h4 className="font-bold text-[15px] text-black mb-1">{activeTestimonial.author}</h4>
            <p className="text-[13px] text-gray-500 font-medium">{activeTestimonial.role}</p>
          </div>

          {/* Avatars */}
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            {testimonials.map((testimonial, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={testimonial.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative rounded-full overflow-hidden transition-all duration-300 ease-in-out ${
                    isActive 
                      ? 'w-[75px] h-[75px] shadow-lg scale-110 z-10' 
                      : 'w-[60px] h-[60px] opacity-40 hover:opacity-70 scale-100 z-0'
                  }`}
                >
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    className="w-full h-full object-cover"
                  />
                  {isActive && (
                    <div className="absolute inset-0 rounded-full border-4 border-white pointer-events-none"></div>
                  )}
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

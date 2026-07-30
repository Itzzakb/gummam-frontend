import React from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';

const sponsoredAds = [
  {
    id: 1,
    badge: 'Sponsored',
    type: 'Builder Ad',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80',
    title: 'Aparna Cyberzon',
    subtitle: 'Premium 2 & 3 BHK apartments starting at ₹85 Lakh',
    location: 'Gachibowli, Hyderabad',
    cta: 'View Project',
    advertiser: 'Aparna Constructions',
  },
  {
    id: 2,
    badge: 'Sponsored',
    type: 'Agent Ad',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
    title: 'Exclusive Villa Listings',
    subtitle: 'Handpicked luxury villas by verified agents',
    location: 'Jubilee Hills, Hyderabad',
    cta: 'Contact Agent',
    advertiser: 'Rachel Dan Realty',
  },
];

export const SmartSolutions: React.FC = () => {
  return (
    <section className="font-poppins py-16 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {sponsoredAds.map((ad) => (
            <article
              key={ad.id}
              className="group relative h-[280px] sm:h-[320px] rounded-[16px] overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={ad.image}
                alt={ad.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-white/95 text-[#1A1A1A] text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-md">
                  {ad.badge}
                </span>
                <span className="bg-[#0B2C5C]/90 text-white text-[11px] font-medium px-2.5 py-1 rounded-md">
                  {ad.type}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white">
                <p className="text-[12px] text-white/80 mb-1.5">{ad.advertiser}</p>
                <h3 className="text-[22px] sm:text-[24px] font-bold leading-tight mb-1.5">
                  {ad.title}
                </h3>
                <p className="text-[13px] sm:text-[14px] text-white/85 mb-3 line-clamp-2">
                  {ad.subtitle}
                </p>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-[13px] text-white/80 min-w-0">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{ad.location}</span>
                  </div>
                  <button
                    type="button"
                    className="shrink-0 bg-[#E67E22] hover:bg-[#d97706] text-white text-[13px] font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 transition-colors"
                  >
                    {ad.cta}
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

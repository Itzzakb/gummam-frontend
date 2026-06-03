import React from 'react';
import { HeroSection } from '../features/landing/HeroSection';
import { TrendingHomes } from '../features/landing/TrendingHomes';
import { PropertyCarousel } from '../features/landing/PropertyCarousel';
import { PromoBanner } from '../features/landing/PromoBanner';
import { CityExplore } from '../features/landing/CityExplore';
import { AgentSection } from '../features/landing/AgentSection';
import { Testimonials } from '../features/landing/Testimonials';
import { NewLaunch } from '../features/landing/NewLaunch';
import { PrimeProperties } from '../features/landing/PrimeProperties';
import { AdSection } from '../features/landing/AdSection';
import { SmartSolutions } from '../features/landing/SmartSolutions';
import { BlogSection } from '../features/landing/BlogSection';
import { PostProperty } from '../features/landing/PostProperty';

// Dummy data for property carousels
const dummyProperties = [
  { id: 101, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=80', title: 'High-Rise Townhouse', location: 'Hyderabad, Uppal', price: '₹ 12,999', type: 'For Rent', beds: 3, baths: 2, sqft: 122.280 },
  { id: 102, image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&q=80', title: 'Land / Plots', location: 'Hyderabad, Uppal', price: '₹ 1.70 Cr.', type: 'For Sale', sqft: 1500 },
  { id: 103, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80', title: 'High-Rise Townhouse', location: 'Hyderabad, Uppal', price: '₹ 12,999', type: 'For Rent', beds: 3, baths: 2, sqft: 122.280 },
  { id: 104, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80', title: 'Luxury Apartment', location: 'Hyderabad, Hi-Tech City', price: '₹ 45,000', type: 'For Rent', beds: 4, baths: 4, sqft: 2200 },
];

const commercialProperties = [
  { id: 201, image: 'https://images.unsplash.com/photo-1542361345-89e58247f2d5?w=500&q=80', title: 'Shop For Rent', location: 'Hyderabad, Uppal', price: '₹ 12,999', type: 'For Rent', sqft: 122.280 },
  { id: 202, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80', title: 'Office Space', location: 'Hyderabad, Uppal', price: '₹ 12,999', type: 'For Rent', sqft: 122.280 },
  { id: 203, image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500&q=80', title: 'Work Place', location: 'Hyderabad, Uppal', price: '₹ 12,999', type: 'For Rent', sqft: 122.280 },
  { id: 204, image: 'https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?w=500&q=80', title: 'Commercial Shop', location: 'Hyderabad, Uppal', price: '₹ 15,000', type: 'For Rent', sqft: 200 },
];

export const LandingPage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <TrendingHomes />
      <PromoBanner />
      {/* <PropertyTypes /> */}
      <CityExplore />
      <PropertyCarousel title="Your Ultimate Hub for Hyderabad" properties={dummyProperties} />
      <NewLaunch />
      <PrimeProperties />
      <AdSection />
      <AgentSection />
      <SmartSolutions />
      <PropertyCarousel title="Commercial Real Estate" properties={commercialProperties} />
      <BlogSection />
      <Testimonials />
      <PostProperty />
    </>
  );
};

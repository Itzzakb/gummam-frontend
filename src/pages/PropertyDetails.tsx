import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, MapPin, Heart, Share2,
  BedDouble, Bath, Square, Calendar, Car,
  Play, Star, Phone, Clock, X
} from 'lucide-react';
import { PromoSidebarCard } from '../components/ui/PromoSidebarCard';
import { PropertyCarousel } from '../features/landing/PropertyCarousel';

type FlatStatus = 'available' | 'occupied' | 'sold' | 'mortgage';

type GalleryItem = {
  type: 'image' | 'video';
  src: string;
  poster?: string;
};

const FLAT_STATUS_COLORS: Record<FlatStatus, string> = {
  available: '#00C851',
  occupied: '#FFB74D',
  sold: '#FF0000',
  mortgage: '#E0E0E0',
};

const FLAT_STATUS_LEGEND: { status: FlatStatus; label: string }[] = [
  { status: 'available', label: 'Available' },
  { status: 'occupied', label: 'Occupied' },
  { status: 'sold', label: 'Sold' },
  { status: 'mortgage', label: 'Mortgage' },
];

// Dummy data for property
const propertyData = {
  id: 1,
  title: 'High-Rise Townhouse In',
  location: 'Ready Nager Main Road, Hyderabad',
  price: '₹7.46 Cr',
  rating: 4.8,
  reviews: 24,
  gallery: [
    {
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    },
    {
      type: 'video' as const,
      src: 'https://www.w3schools.com/html/mov_bbb.mp4',
      poster: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
    },
    {
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
    },
    {
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    },
    {
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    },
    {
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?w=800&q=80',
    },
  ] satisfies GalleryItem[],
  overview: {
    bedrooms: 2,
    bathrooms: 2,
    garage: 1,
    yearBuilt: 2022,
    areaSize: '12,900'
  },
  info: {
    type: 'Townhouse',
    purpose: 'For Sale',
    status: 'Ready To Move',
    area: '12900 Sft.',
    propertyId: 'ABX123456789'
  },
  features: [
    'Gym', 'Power Backup', 'Security', 'Balcony', 'Pool'
  ],
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  wings: [
    {
      id: 'a-block',
      label: 'A - Block',
      floors: [
        {
          label: '1st Floor',
          units: ['occupied', 'occupied', 'available', 'available', 'available', 'available', 'available'] as FlatStatus[],
        },
        {
          label: '2nd Floor',
          units: ['available', 'available', 'available', 'available', 'available', 'available', 'available'] as FlatStatus[],
        },
        {
          label: '3rd Floor',
          units: ['available', 'available', 'available', 'available', 'available', 'available', 'available'] as FlatStatus[],
        },
        {
          label: '4th Floor',
          units: ['occupied', 'occupied', 'available', 'available', 'available', 'available', 'available'] as FlatStatus[],
        },
      ],
    },
    {
      id: 'b-block',
      label: 'B - Block',
      floors: [
        {
          label: '1st Floor',
          units: ['sold', 'sold', 'occupied', 'available', 'available', 'mortgage', 'available'] as FlatStatus[],
        },
        {
          label: '2nd Floor',
          units: ['available', 'occupied', 'available', 'sold', 'available', 'available', 'mortgage'] as FlatStatus[],
        },
        {
          label: '3rd Floor',
          units: ['available', 'available', 'occupied', 'occupied', 'available', 'available', 'available'] as FlatStatus[],
        },
        {
          label: '4th Floor',
          units: ['mortgage', 'available', 'available', 'sold', 'available', 'occupied', 'available'] as FlatStatus[],
        },
      ],
    },
  ],
  floorPlans: [
    { title: 'Floor Plan 1', image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80' }
  ],
  videoImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  testimonials: [
    {
      id: 1,
      name: 'Anjali Sharma',
      avatar: 'https://i.pravatar.cc/150?u=anjali',
      role: 'Property Buyer',
      rating: 5,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
    },
    {
      id: 2,
      name: 'Rahul Verma',
      avatar: 'https://i.pravatar.cc/150?u=rahul',
      role: 'Property Investor',
      rating: 5,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
    }
  ],
  agent: {
    name: 'Amelia Jones',
    phone: '+91 9988776655',
    image: 'https://i.pravatar.cc/150?u=agent'
  },
  similarProperties: [
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
      title: 'High-Rise Townhouse',
      location: 'Ready Nager Main Road',
      price: '₹ 12,999',
      type: 'For Rent',
      beds: 3,
      baths: 2,
      sqft: 122280,
      description: 'Builder Floor Apartment Is Available For Sale. It Is A Good Location Property...',
      updatedAt: '6 day ago'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
      title: 'Luxury Villa',
      location: 'Ready Nager Main Road',
      price: '₹ 1.72 Cr.',
      type: 'For Sale',
      beds: 4,
      baths: 3,
      sqft: 2200,
      description: 'Builder Floor Apartment Is Available For Sale. It Is A Good Location Property...',
      updatedAt: '2 day ago'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
      title: 'High-Rise Townhouse',
      location: 'Ready Nager Main Road',
      price: '₹ 12,999',
      type: 'For Rent',
      beds: 3,
      baths: 2,
      sqft: 122280,
      description: 'Builder Floor Apartment Is Available For Sale. It Is A Good Location Property...',
      updatedAt: '6 day ago'
    }
  ]
};

export const PropertyDetails: React.FC = () => {

  // In a real app, we'd fetch property by ID here. Using dummy data for now.
  const data = propertyData;
  const gallery = data.gallery;
  const previewCount = Math.min(5, gallery.length);
  const extraCount = Math.max(0, gallery.length - previewCount);

  const [activeWingId, setActiveWingId] = useState(data.wings[0].id);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const activeWing = data.wings.find((wing) => wing.id === activeWingId) ?? data.wings[0];

  const openGallery = (index: number) => {
    setGalleryIndex(index);
    setGalleryOpen(true);
  };

  const closeGallery = () => setGalleryOpen(false);

  const showPrev = () => {
    setGalleryIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const showNext = () => {
    setGalleryIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (!galleryOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeGallery();
      if (event.key === 'ArrowLeft') {
        setGalleryIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
      }
      if (event.key === 'ArrowRight') {
        setGalleryIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [galleryOpen, gallery.length]);

  const thumbSrc = (item: GalleryItem) =>
    item.type === 'video' ? item.poster || item.src : item.src;

  const activeMedia = gallery[galleryIndex];

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-20 font-poppins">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Breadcrumb */}
        <div className="flex items-center text-[14px] text-gray-500 mb-6">
          <Link to="/" className="text-gray-900 hover:underline cursor-pointer font-medium">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          <span className="text-gray-400 font-normal">Project Details</span>
        </div>

        {/* Header Section */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-3">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <h1 className="text-[28px] lg:text-[32px] font-semibold text-[#1A1A1A]">
                  {data.title}
                </h1>
                <span className="hidden sm:block w-px h-8 bg-slate-300 shrink-0" aria-hidden="true" />
                <div className="flex items-baseline gap-2">
                  <div className="text-[28px] lg:text-[32px] font-bold text-[#E67E22] leading-none">
                    ₹7.46 Cr
                  </div>
                  <div className="text-[15px] text-gray-500">
                    6,800/Sft.
                  </div>
                </div>
              </div>
              <div className="flex items-center text-gray-500 text-[15px] mt-2">
                <MapPin className="w-[18px] h-[18px] mr-1.5 shrink-0" />
                Uppal, Hyderabad
              </div>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-2.5 shrink-0">
              <div className="flex items-center flex-wrap gap-y-2">
                <div className="flex text-[#F6931D] gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-[15px] h-[15px] fill-current" />
                  ))}
                </div>
                <span className="text-[14px] text-gray-500 ml-2">(2 Reviews)</span>
                <span className="ml-4 bg-[#0B2C5C] text-white text-[13px] px-3 py-1 rounded-md">For Rent</span>
              </div>

              <div className="flex gap-4">
                <button className="text-gray-700 hover:text-[#E67E22] transition-colors">
                  <Heart className="w-6 h-6" />
                </button>
                <button className="text-gray-700 hover:text-[#E67E22] transition-colors">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-2 mb-10 h-[400px] md:h-[500px]">
          {/* Main Large Image */}
          <button
            type="button"
            onClick={() => openGallery(0)}
            className="h-full rounded-[8px] overflow-hidden relative cursor-pointer text-left"
          >
            <img
              src={thumbSrc(gallery[0])}
              alt="Main"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </button>

          {/* 4 Small Images Grid */}
          <div className="hidden lg:grid grid-cols-2 grid-rows-2 gap-2 h-full">
            {gallery.slice(1, 5).map((item, offset) => {
              const index = offset + 1;
              const isVideo = item.type === 'video';
              const isLastPreview = index === 4;
              const showMoreOverlay = isLastPreview && extraCount > 0;

              return (
                <button
                  key={`${item.src}-${index}`}
                  type="button"
                  onClick={() => openGallery(index)}
                  className="rounded-[8px] overflow-hidden relative group cursor-pointer"
                >
                  <img
                    src={thumbSrc(item)}
                    alt={`Gallery ${index}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {isVideo && !showMoreOverlay && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
                      <div className="w-[50px] h-[50px] rounded-full border-2 border-white flex items-center justify-center bg-white/20 backdrop-blur-sm">
                        <Play className="w-5 h-5 text-white fill-current ml-1" />
                      </div>
                    </div>
                  )}
                  {showMoreOverlay && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center pointer-events-none">
                      <span className="text-white text-[28px] font-medium">+{extraCount}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Lightbox */}
        {galleryOpen && createPortal(
          <div
            className="fixed inset-0 z-[2000] bg-black/90 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Property gallery"
          >
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 text-white">
              <span className="text-sm font-medium">
                {galleryIndex + 1} / {gallery.length}
                {activeMedia?.type === 'video' ? ' · Video' : ''}
              </span>
              <button
                type="button"
                onClick={closeGallery}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close gallery"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative flex-1 flex items-center justify-center px-4 sm:px-16 pb-6 min-h-0">
              <button
                type="button"
                onClick={showPrev}
                className="absolute left-3 sm:left-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous media"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="w-full max-w-5xl h-full flex items-center justify-center">
                {activeMedia?.type === 'video' ? (
                  <video
                    key={activeMedia.src}
                    src={activeMedia.src}
                    poster={activeMedia.poster}
                    controls
                    autoPlay
                    className="max-h-full max-w-full rounded-lg bg-black"
                  />
                ) : (
                  <img
                    key={activeMedia?.src}
                    src={activeMedia?.src}
                    alt={`Gallery item ${galleryIndex + 1}`}
                    className="max-h-full max-w-full object-contain rounded-lg"
                  />
                )}
              </div>

              <button
                type="button"
                onClick={showNext}
                className="absolute right-3 sm:right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next media"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="px-4 sm:px-6 pb-5 overflow-x-auto">
              <div className="flex items-center justify-center gap-2 min-w-min mx-auto">
                {gallery.map((item, index) => (
                  <button
                    key={`thumb-${item.src}-${index}`}
                    type="button"
                    onClick={() => setGalleryIndex(index)}
                    className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-md overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      index === galleryIndex
                        ? 'border-[#E67E22] opacity-100'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    aria-label={`Go to gallery item ${index + 1}`}
                  >
                    <img
                      src={thumbSrc(item)}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    {item.type === 'video' && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                        <Play className="w-3.5 h-3.5 text-white fill-current" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}

        {/* List of plats (Flats & Wings) — full width, no card */}
        <div className="w-full mb-10">
          <h2 className="text-[20px] font-medium text-[#1A1A1A] mb-4 font-poppins">List of plats</h2>

          <div className="flex flex-wrap items-center gap-2 mb-6">
            {data.wings.map((wing) => {
              const isActive = wing.id === activeWingId;
              return (
                <button
                  key={wing.id}
                  type="button"
                  onClick={() => setActiveWingId(wing.id)}
                  className={`px-4 py-2 rounded-full text-[14px] font-medium transition-colors ${
                    isActive
                      ? 'bg-[#E8E8ED] text-[#1A1A1A] border border-[#1A1A1A]/25'
                      : 'bg-transparent text-[#1A1A1A] border border-transparent hover:bg-[#F3F4F6]'
                  }`}
                >
                  {wing.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start w-full">
            <div className="flex-1 w-full space-y-3 min-w-0">
              {activeWing.floors.map((floor) => (
                <div key={floor.label} className="flex items-center gap-3 sm:gap-4">
                  <span className="w-[72px] sm:w-[80px] shrink-0 text-[13px] sm:text-[14px] text-[#1A1A1A]">
                    {floor.label}
                  </span>
                  <div className="flex flex-1 gap-1.5 sm:gap-2 min-w-0">
                    {floor.units.map((status, index) => (
                      <div
                        key={`${floor.label}-${index}`}
                        title={FLAT_STATUS_LEGEND.find((item) => item.status === status)?.label}
                        className="h-8 sm:h-9 flex-1 min-w-0 rounded-[6px] border border-[#E0E0E0]"
                        style={{ backgroundColor: FLAT_STATUS_COLORS[status] }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden sm:block w-px self-stretch bg-[#E0E0E0] shrink-0" />

            <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:pt-0.5 shrink-0">
              {FLAT_STATUS_LEGEND.map((item) => (
                <div key={item.status} className="flex flex-col items-start gap-1.5">
                  <span className="text-[13px] text-[#1A1A1A]">{item.label}</span>
                  <span
                    className="w-10 h-5 rounded-[4px] border border-[#E0E0E0] shrink-0"
                    style={{ backgroundColor: FLAT_STATUS_COLORS[item.status] }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left Column */}
          <div className="flex-1 space-y-6 bg-white rounded-[10px]">
            {/* Overview */}
            <div>
              <h2 className="text-[20px] font-medium text-[#1A1A1A] mb-4 font-poppins">Overview</h2>
              <div className="bg-white p-6 rounded-xl border border-[#E0E0E0]">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <BedDouble className="w-[18px] h-[18px] text-[#8A8A8A]" />
                      <span className="text-[18px] font-semibold text-[#1A1A1A]">{data.overview.bedrooms}</span>
                    </div>
                    <span className="text-[14px] text-[#636366]">Bedrooms</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <Bath className="w-[18px] h-[18px] text-[#8A8A8A]" />
                      <span className="text-[18px] font-semibold text-[#1A1A1A]">{data.overview.bathrooms}</span>
                    </div>
                    <span className="text-[14px] text-[#636366]">Bathrooms</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <Car className="w-[18px] h-[18px] text-[#8A8A8A]" />
                      <span className="text-[18px] font-semibold text-[#1A1A1A]">{data.overview.garage}</span>
                    </div>
                    <span className="text-[14px] text-[#636366]">Garage</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-[18px] h-[18px] text-[#8A8A8A]" />
                      <span className="text-[18px] font-semibold text-[#1A1A1A]">{data.overview.yearBuilt}</span>
                    </div>
                    <span className="text-[14px] text-[#636366]">Year Built</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <Square className="w-[18px] h-[18px] text-[#8A8A8A]" />
                      <span className="text-[18px] font-semibold text-[#1A1A1A]">{data.overview.areaSize}</span>
                    </div>
                    <span className="text-[14px] text-[#636366]">Area Size</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Information */}
            <div>
              <h2 className="text-[20px] font-medium text-[#1A1A1A] mb-4 font-poppins">Information</h2>

              <div className="bg-white p-6 rounded-xl border border-[#E0E0E0]">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-y-6 gap-x-4 mb-4 pb-4 border-b border-[#E0E0E0]">
                  <div>
                    <div className="text-[13px] text-[#636366] mb-1">Price</div>
                    <div className="text-[14px] font-medium text-[#1A1A1A]">₹7.46 Cr</div>
                  </div>
                  <div>
                    <div className="text-[13px] text-[#636366] mb-1">Area Size</div>
                    <div className="text-[14px] font-medium text-[#1A1A1A]">6,800 Sft.</div>
                  </div>
                  <div>
                    <div className="text-[13px] text-[#636366] mb-1">Rooms</div>
                    <div className="text-[14px] font-medium text-[#1A1A1A]">5</div>
                  </div>
                  <div>
                    <div className="text-[13px] text-[#636366] mb-1">Year Built</div>
                    <div className="text-[14px] font-medium text-[#1A1A1A]">2022</div>
                  </div>
                  <div>
                    <div className="text-[13px] text-[#636366] mb-1">Land Area Size</div>
                    <div className="text-[14px] font-medium text-[#1A1A1A]">10,766 Sft.</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-y-6 gap-x-4">
                  <div>
                    <div className="text-[13px] text-[#636366] mb-1">Property ID</div>
                    <div className="text-[14px] font-medium text-[#1A1A1A]">HZ24</div>
                  </div>
                  <div>
                    <div className="text-[13px] text-[#636366] mb-1">Bedrooms</div>
                    <div className="text-[14px] font-medium text-[#1A1A1A]">6</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#E0E0E0] mt-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {data.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <img src="/icons/rounded-check.png" alt="check" className="w-[18px] h-[18px]" />
                      <span className="text-[14px] text-[#1A1A1A]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-[20px] font-medium text-[#1A1A1A] mb-4 font-poppins">Description</h2>
              <div className="bg-white p-6 rounded-xl border border-[#E0E0E0]">
                <p className="text-[14px] text-gray-600 leading-relaxed">
                  {data.description}
                </p>
              </div>
            </div>

            {/* Map Location */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[20px] font-medium text-[#1A1A1A] font-poppins">Map Location</h2>
                <button className="px-4 py-2 bg-[#035096] text-white rounded text-[13px] font-medium hover:bg-blue-900 transition-colors">
                  Open Map
                </button>
              </div>
              <div className="bg-white rounded-xl border border-[#E0E0E0]">
                <div className="w-full h-[300px] bg-gray-200 rounded-lg overflow-hidden relative">
                  <img src="/images/map.png" alt="Map Location" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Floor Plans */}
            <div>
              <h2 className="text-[20px] font-medium text-[#1A1A1A] mb-4 font-poppins">Floor Plans</h2>

              <div className="border border-[#E0E0E0] rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-b border-[#E0E0E0] cursor-pointer">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-5 h-5 text-gray-500 transform rotate-90" />
                    <span className="font-medium text-gray-900">Ground Floor</span>
                  </div>
                  <div className="flex items-center gap-4 text-[13px] text-gray-500 hidden sm:flex">
                    <span className="flex items-center gap-1"><BedDouble className="w-4 h-4" /> 2</span>
                    <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> 2</span>
                    <span className="flex items-center gap-1"><Square className="w-4 h-4" /> 1,290 Sft.</span>
                  </div>
                </div>
                <div className="p-4 bg-white flex justify-center">
                  <img src="/images/plan.png" alt="Floor Plan" className="max-w-full h-auto max-h-[400px] object-contain" />
                </div>
              </div>

            </div>

            {/* Video */}
            <div>
              <h2 className="text-[20px] font-medium text-[#1A1A1A] mb-4 font-poppins">Video</h2>
              <div className="bg-white rounded-xl">
                <div className="relative w-full h-[400px] rounded-lg overflow-hidden group cursor-pointer">
                  <img src={data.videoImage} alt="Property Video Thumbnail" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#F6931D] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-white fill-current ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-[24px] font-medium text-[#1A1A1A] font-poppins mb-2">What Our Customers Say</h2>
                  <div className="flex items-center gap-3">
                    <span className="text-[18px] font-medium text-gray-900">5.0</span>
                    <div className="flex text-[#F6931D] gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-[18px] h-[18px] fill-current" />
                      ))}
                    </div>
                    <span className="text-[14px] text-gray-500">1,540 reviews</span>
                  </div>
                </div>
                <button className="px-6 py-2.5 bg-[#035096] text-white rounded-lg text-[14px] font-medium hover:bg-blue-900 transition-colors">
                  Write A Review
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {data.testimonials.map((t) => (
                  <div key={t.id} className="p-6 border border-[#E0E0E0] rounded-xl bg-white">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <img src={t.avatar} alt={t.name} className="w-[50px] h-[50px] rounded-full object-cover" />
                        <div>
                          <div className="text-[16px] font-semibold text-gray-900 mb-1">{t.name}</div>
                          <div className="flex items-center gap-1.5 text-[13px] text-gray-500">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Today 09:36 AM</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex text-[#F6931D] gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-[16px] h-[16px] fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-[15px] text-[#636366] leading-relaxed">
                      Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim........
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <button className="text-[15px] font-medium text-[#035096] hover:underline">
                  View More
                </button>
              </div>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-[350px] flex-shrink-0 space-y-6">
            {/* Agent Sidebar */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">

              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 text-[#035096] fill-current" />
                <h3 className="text-[20px] font-semibold text-[#1A1A1A]">{data.title}</h3>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#035096] text-white text-[12px] px-3 py-1 rounded">For Rent</span>
                <div className="flex text-[#F6931D] gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-[14px] h-[14px] fill-current" />
                  ))}
                </div>
                <span className="text-[13px] text-gray-500">(2 Reviews)</span>
              </div>

              <div className="flex items-center text-gray-500 text-[14px] mb-6">
                <MapPin className="w-[16px] h-[16px] mr-1.5" />
                Uppal, Hyderabad
              </div>

              <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-gray-200">
                <div className="text-[32px] font-bold text-[#035096]">
                  ₹7.46 Cr
                </div>
                <div className="text-[14px] text-gray-500">
                  6,800/Sft.
                </div>
              </div>

              <h4 className="text-[16px] font-bold text-[#1A1A1A] mb-4">Contact With Us Now !</h4>

              <div className="bg-[#F3F4F6] rounded-xl p-4 flex items-center gap-4 mb-6">
                <img src={data.agent.image} alt="Rachel Dan" className="w-14 h-14 rounded-full object-cover" />
                <div>
                  <h5 className="text-[16px] font-bold text-gray-900">Rachel Dan</h5>
                  <div className="flex items-center gap-1.5 text-[#035096] mt-1 text-[14px]">
                    <Phone className="w-3.5 h-3.5" />
                    91.85.526.258
                  </div>
                </div>
              </div>

              <form className="space-y-4">
                <div>
                  <input type="text" placeholder="Name" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#035096] transition-colors" />
                </div>
                <div>
                  <input type="text" placeholder="Phone" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#035096] transition-colors" />
                </div>
                <div>
                  <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#035096] transition-colors" />
                </div>
                <div>
                  <textarea placeholder="Message" rows={3} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#035096] transition-colors resize-none"></textarea>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" className="flex-1 py-3 bg-white border border-[#035096] text-[#035096] rounded-lg text-[14px] font-semibold hover:bg-gray-50 transition-colors">
                    Call Now
                  </button>
                  <button type="button" className="flex-[1.2] py-3 bg-[#035096] text-white rounded-lg text-[14px] font-semibold hover:bg-blue-900 transition-colors">
                    Send A Message
                  </button>
                </div>
              </form>
            </div>

            <div className="sticky top-6">
              <PromoSidebarCard />
            </div>
          </div>

        </div>

        {/* Similar Properties Section */}
        <div className="mt-8">
          <PropertyCarousel title="Similar Properties" properties={data.similarProperties} />
        </div>

      </div>
    </div>
  );
};

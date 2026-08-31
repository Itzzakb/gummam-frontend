import React from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

export const SIMPLE_FURNISHINGS = [
  'Dining Table',
  'Washing Machine',
  'Cupboard',
  'Sofa',
  'Microwave',
  'Stove',
  'Fridge',
  'Water Purifier',
  'Gas Pipeline',
  'Chimney',
  'Modular Kitchen',
] as const;

export const QUANTITY_FURNISHINGS = [
  'Fan',
  'Light',
  'AC',
  'Wardrobe',
  'TV',
  'Bed',
  'Geyser',
] as const;

export const AMENITY_CATEGORIES: {
  title: string;
  items: string[];
}[] = [
  {
    title: "Children's Play Area",
    items: [
      'Dedicated, safe playgrounds with swings, slides etc',
      'Sandpits',
    ],
  },
  {
    title: 'Community Services & Management',
    items: [
      'Resident Association/Management Committee: For smooth functioning and decision-making',
      'Community Events: Organized festivals, sports tournaments and social gathering',
      'App-Based Community Management: For communication, raising requests and payments',
    ],
  },
  {
    title: 'Convenience & Lifestyle',
    items: [
      'Business Center',
      'Library/Reading Room',
      'Retail/Commercial Spaces (within the community)',
      'Power backup: 24/7 generator backup',
      'Water Supply',
      'Intercom',
      'Video Door Phone',
      'High Speed Internet / wi-fi',
      'Ample Parking',
      'Maintenance Staff',
      'Convenience stores/ Supermarket',
      'Cafeteria/Restaurant',
      'Salon/Spa',
      'Pharmacy',
      'Service Apartments',
      'Guest Rooms',
      'Amphitheater/Mini-Theater',
      'Creche/Daycare facility',
      'Co-working Spaces',
    ],
  },
  {
    title: 'Indoor Games',
    items: [
      'Carrom, Chess, and other board games.',
      'Billiards/Pool Table',
      'Table Tennis',
    ],
  },
  {
    title: 'Landscaped Gardens & Parks',
    items: [
      'Seating areas, gazebos.',
      'Green spaces for relaxation and strolls',
    ],
  },
  {
    title: 'Outdoor Sports Facilities',
    items: [
      'Badminton Courts',
      'Basketball Courts',
      'Cricket Practice Net',
      'Football/ Multi-purpose Sports Field',
      'Jogging/Walking Tracks',
      'Themed gardens (e.g., sensory gardens, herbs gardens)',
      'Tennis Courts',
    ],
  },
  {
    title: 'Recreational & Leisure/Clubhouse/Community Hall',
    items: [
      'Aerobics / Zumba Studio',
      'Lounge areas and seating.',
      'Party lawns or banquet facilities',
      'Swimming Pool',
      'Fitness & Wellness',
      'Gymnasium / Fitness Center',
      'Yoga / Meditation Room',
      'Spa/ Sauna/ Steam Room',
      'Multipurpose halls for events and gatherings.',
    ],
  },
  {
    title: 'Security & Safety',
    items: [
      'Intercom Facility',
      'Boom Barriers',
      '24/7 Manned Security',
      'CCTV Surveillance',
      'Controlled Access points',
      'Perimeter Fencing/ Walls',
    ],
  },
  {
    title: 'Sustainable & Eco-Friendly',
    items: [
      'Electric Vehicle charging stations',
      'Waste Segregation and Composting Facilities',
      'Sewage Treatment Plant',
      'Solar Panels for Common Area Lighting',
      'Rainwater Harvesting System',
    ],
  },
];

export const SOCIETY_AMENITY_ITEMS = AMENITY_CATEGORIES.flatMap((category) => category.items);

const cardClass = (selected: boolean) =>
  `flex flex-col items-center justify-center gap-2 min-h-[108px] rounded-xl border px-2 py-3 text-center transition-colors ${
    selected
      ? 'border-[#035096] bg-[#F0F7FF] text-[#035096]'
      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
  }`;

export interface AmenitiesPopupValue {
  furnishings: string[];
  counts: Record<string, number>;
  society: string[];
}

interface AmenitiesPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: AmenitiesPopupValue;
  onChange: (value: AmenitiesPopupValue) => void;
}

export const countFurnishingSelections = (value: AmenitiesPopupValue) =>
  value.furnishings.length + Object.values(value.counts).filter((qty) => qty > 0).length;

export const flattenAmenitiesPopup = (value: AmenitiesPopupValue): string[] => {
  const quantityLabels = Object.entries(value.counts)
    .filter(([, qty]) => qty > 0)
    .map(([name, qty]) => `${name} (${qty})`);
  return [...value.furnishings, ...quantityLabels, ...value.society];
};

export const AmenitiesPopup: React.FC<AmenitiesPopupProps> = ({
  open,
  onOpenChange,
  value,
  onChange,
}) => {
  const furnishingSelected = countFurnishingSelections(value);

  const toggleFurnishing = (item: string) => {
    const selected = value.furnishings.includes(item);
    onChange({
      ...value,
      furnishings: selected
        ? value.furnishings.filter((entry) => entry !== item)
        : [...value.furnishings, item],
    });
  };

  const setCount = (item: string, next: number) => {
    const qty = Math.max(0, Math.min(20, next));
    onChange({
      ...value,
      counts: { ...value.counts, [item]: qty },
    });
  };

  const toggleAmenity = (item: string) => {
    const selected = value.society.includes(item);
    onChange({
      ...value,
      society: selected
        ? value.society.filter((entry) => entry !== item)
        : [...value.society, item],
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] max-w-[1040px] overflow-y-auto bg-white px-5 py-5 sm:px-7 sm:py-6">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <DialogTitle className="text-lg sm:text-xl font-bold text-[#0B2C5C]">
              Add property furnishings and amenities
            </DialogTitle>
            <DialogDescription className="sr-only">
              Select flat furnishings and society amenities for this property.
            </DialogDescription>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
            aria-label="Close furnishings and amenities"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <section className="mb-8">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h3 className="text-base font-bold text-[#0B2C5C]">Flat Furnishings</h3>
            <span className="text-xs font-medium text-slate-400">{furnishingSelected} selected</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
            {QUANTITY_FURNISHINGS.map((item) => {
              const qty = value.counts[item] || 0;
              return (
                <div key={item} className={cardClass(qty > 0)}>
                  <span className="text-xs font-semibold leading-snug">{item}</span>
                  <div className="flex items-center gap-2 mt-auto">
                    <button
                      type="button"
                      aria-label={`Decrease ${item}`}
                      onClick={() => setCount(item, qty - 1)}
                      className="w-6 h-6 rounded-md text-slate-500 hover:bg-slate-100 text-sm font-semibold leading-none"
                    >
                      −
                    </button>
                    <span className="min-w-[1rem] text-xs font-semibold text-slate-700 text-center">{qty}</span>
                    <button
                      type="button"
                      aria-label={`Increase ${item}`}
                      onClick={() => setCount(item, qty + 1)}
                      className="w-6 h-6 rounded-md text-slate-500 hover:bg-slate-100 text-sm font-semibold leading-none"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
            {SIMPLE_FURNISHINGS.map((item) => {
              const selected = value.furnishings.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleFurnishing(item)}
                  className={cardClass(selected)}
                >
                  <span className="text-xs font-semibold leading-snug">{item}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between gap-3 mb-4">
            <h3 className="text-base font-bold text-[#0B2C5C]">Society Amenities</h3>
            <span className="text-xs font-medium text-slate-400">{value.society.length} selected</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
            {SOCIETY_AMENITY_ITEMS.map((item) => {
              const selected = value.society.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleAmenity(item)}
                  className={cardClass(selected)}
                >
                  <span className="text-xs font-semibold leading-snug">{item}</span>
                </button>
              );
            })}
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
};

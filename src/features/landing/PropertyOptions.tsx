import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CURRENT_CITY = 'Hyderabad';

const INTENT_OPTIONS = ['Buy', 'Rent'] as const;

const LOCALITIES = [
  'Gachibowli',
  'Madhapur',
  'Kondapur',
  'Hitech City',
  'Jubilee Hills',
  'Banjara Hills',
  'Kukatpally',
  'Miyapur',
  'Uppal',
  'Kompally',
];

const COLUMN_TEMPLATES = [
  { key: 'flats', title: `Flats in ${CURRENT_CITY}`, prefix: 'Flats in' },
  { key: 'house', title: `House for Sale in ${CURRENT_CITY}`, prefix: 'House for Sale in' },
  { key: 'property', title: `Property in ${CURRENT_CITY}`, prefix: 'Property in' },
  { key: 'plots', title: `Plots in ${CURRENT_CITY}`, prefix: 'Plots in' },
  { key: 'villa', title: `Villa in ${CURRENT_CITY}`, prefix: 'Villa in' },
  { key: 'office', title: `Office Space in ${CURRENT_CITY}`, prefix: 'Office Space in' },
] as const;

export const PropertyOptions: React.FC = () => {
  const [intent, setIntent] = useState<(typeof INTENT_OPTIONS)[number]>('Buy');
  const [columnStart, setColumnStart] = useState(0);

  const visibleColumns = useMemo(
    () => COLUMN_TEMPLATES.slice(columnStart, columnStart + 4),
    [columnStart]
  );

  const canPrevColumns = columnStart > 0;
  const canNextColumns = columnStart + 4 < COLUMN_TEMPLATES.length;
  const intentQuery = intent.toLowerCase();

  return (
    <section className="font-poppins bg-white border-t border-slate-100 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-8 flex flex-col items-center">
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#0B2C5C]">
            Property Options in {CURRENT_CITY}
          </h2>
          <div className="relative mt-3 w-[min(280px,70%)]">
            <div className="h-[2px] w-full bg-[#0B2C5C]" />
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-full -translate-x-1/2
                border-l-[7px] border-r-[7px] border-t-[8px]
                border-l-transparent border-r-transparent border-t-[#0B2C5C]"
            />
          </div>
        </div>

        {/* Buy / Rent tabs */}
        <div className="mb-8 flex items-center gap-8 border-b border-slate-200">
          {INTENT_OPTIONS.map((option) => {
            const isActive = option === intent;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setIntent(option)}
                className={`relative pb-3 text-[15px] transition-colors cursor-pointer ${
                  isActive
                    ? 'font-semibold text-[#0B2C5C]'
                    : 'font-medium text-slate-400 hover:text-[#035096]'
                }`}
              >
                {option}
                {isActive && (
                  <span className="absolute left-0 right-0 -bottom-px h-[3px] rounded-full bg-[#035096]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Property link columns */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {visibleColumns.map((column) => (
              <div key={column.key}>
                <h3 className="text-[15px] font-semibold text-[#0B2C5C] mb-4">
                  {column.title}
                </h3>
                <ul className="space-y-2.5">
                  {LOCALITIES.map((locality) => (
                    <li key={`${column.key}-${locality}`}>
                      <Link
                        to={`/search?intent=${intentQuery}&city=${encodeURIComponent(CURRENT_CITY)}&locality=${encodeURIComponent(locality)}&type=${column.key}`}
                        className="text-[13px] text-slate-600 hover:text-[#035096] transition-colors"
                      >
                        {column.prefix} {locality}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {canNextColumns && (
            <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-2 xl:-right-4">
              <button
                type="button"
                onClick={() => setColumnStart((prev) => prev + 1)}
                className="w-11 h-11 rounded-full bg-white border border-slate-200 shadow-md text-[#035096] hover:bg-[#E8F1FB] hover:border-[#035096] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Show more property categories"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {canPrevColumns && (
            <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -left-2 xl:-left-4">
              <button
                type="button"
                onClick={() => setColumnStart((prev) => Math.max(0, prev - 1))}
                className="w-11 h-11 rounded-full bg-white border border-slate-200 shadow-md text-[#035096] hover:bg-[#E8F1FB] hover:border-[#035096] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Show previous property categories"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          )}

          <div className="flex lg:hidden items-center justify-center gap-3 mt-8">
            <button
              type="button"
              disabled={!canPrevColumns}
              onClick={() => setColumnStart((prev) => Math.max(0, prev - 1))}
              className="w-9 h-9 rounded-full border border-slate-200 text-slate-600 hover:border-[#035096] hover:text-[#035096] flex items-center justify-center disabled:opacity-40 cursor-pointer"
              aria-label="Previous categories"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={!canNextColumns}
              onClick={() => setColumnStart((prev) => prev + 1)}
              className="w-9 h-9 rounded-full border border-slate-200 text-slate-600 hover:border-[#035096] hover:text-[#035096] flex items-center justify-center disabled:opacity-40 cursor-pointer"
              aria-label="Next categories"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';

interface Plan {
  id: number;
  name: string;
  price: string;
  isPrimaryButton: boolean;
  features: string[];
}

const plans: Plan[] = [
  {
    id: 1,
    name: 'Plan 1',
    price: '₹ 2999 /Year',
    isPrimaryButton: true,
    features: [
      'Nationwide GIS Parcel Viewer',
      'Extensive Parcel & Deed Data',
      'Home Owner Contact Lookup & data',
      'Residential Live Listings',
      'Residential Sales & Lease Comps',
    ],
  },
  {
    id: 2,
    name: 'Plan 2',
    price: '₹ 3999 /Year',
    isPrimaryButton: false,
    features: [
      'Nationwide GIS Parcel Viewer',
      'Extensive Parcel & Deed Data',
      'Home Owner Contact Lookup & data',
      'Business contact & Profile Lookup',
      'Residential Live Listings',
      'Residential Sales & Lease Comps',
      'Commercial Live Listings',
      'Residential Sales & Lease Comps',
      'Extensive Street Traffic Data + Visualization',
    ],
  },
  {
    id: 3,
    name: 'Plan 3',
    price: '₹ 4999 /Year',
    isPrimaryButton: false,
    features: [
      'Nationwide GIS Parcel Viewer',
      'Extensive Parcel & Deed Data',
      'Home Owner Contact Lookup & data',
      'Business contact & Profile Lookup',
      'Residential Live Listings',
      'Residential Sales & Lease Comps',
      'Commercial Live Listings',
      'Residential Sales & Lease Compiles',
      'Extensive Street Traffic Data + Visualization',
      'Countersign - AI Underwriting Analysis',
    ],
  },
];

const CheckIcon: React.FC = () => (
  <svg
    className="h-[18px] w-[18px] shrink-0 text-[#035096] mt-[3px]"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export const Membership: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 px-4 sm:px-6 lg:px-8 font-poppins">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-black mb-10 tracking-tight pl-2">
          Membership
        </h1>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-[24px] border border-slate-200 p-8 sm:p-9 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#035096]/20 flex flex-col h-full"
            >
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-[26px] font-medium text-[#0B2C5C] mb-2 font-poppins">
                  {plan.name}
                </h3>
                <p className="text-[20px] font-semibold text-black font-poppins">
                  {plan.price}
                </p>
              </div>

              {/* Upgrade Button */}
              <div className="mb-8">
                {plan.isPrimaryButton ? (
                  <button className="w-full py-3 bg-[#0B2C5C] hover:bg-[#071e3f] text-white rounded-full font-bold text-sm transition-colors duration-250 shadow-[0_4px_12px_rgba(11,44,92,0.15)]">
                    Upgrade
                  </button>
                ) : (
                  <button className="w-full py-3 border-2 border-[#0B2C5C] text-[#0B2C5C] hover:bg-[#0B2C5C]/5 rounded-full font-bold text-sm transition-colors duration-250">
                    Upgrade
                  </button>
                )}
              </div>

              {/* Features List */}
              <ul className="space-y-4 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-[14px] leading-relaxed text-[#71717A] font-medium font-poppins">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

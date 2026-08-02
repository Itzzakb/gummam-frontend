import React, { useState } from 'react';
import { Icon } from '@iconify/react';

interface PaymentRecord {
  date: string;
  plan: string;
  amount: string;
  status: string;
  invoice: string;
}

export const Subscription: React.FC = () => {
  const [payments] = useState<PaymentRecord[]>([
    { date: '20-12-2024', plan: 'Premium Pro', amount: '₹4,999', status: 'Paid', invoice: 'INV-2024-001' },
    { date: '20-11-2024', plan: 'Premium Pro', amount: '₹4,999', status: 'Paid', invoice: 'INV-2024-002' },
    { date: '20-10-2024', plan: 'Premium Pro', amount: '₹4,999', status: 'Paid', invoice: 'INV-2024-003' },
    { date: '20-09-2024', plan: 'Silver', amount: '₹2,999', status: 'Paid', invoice: 'INV-2024-004' }
  ]);

  const silverFeatures = {
    included: [
      'Up to 10 listings',
      '50 lead credits/month',
      'Basic analytics',
      'Email support',
      '1 featured boost/month',
      'Standard CRM'
    ],
    notIncluded: [
      'Advanced lead scoring',
      'WhatsApp integration',
      'Team management',
      'API access'
    ]
  };

  const goldFeatures = {
    included: [
      'Up to 20 listings',
      '100 lead credits/month',
      'Advanced analytics',
      'Priority support',
      '3 featured boosts/month',
      'Professional CRM',
      'WhatsApp integration',
      'Lead scoring AI'
    ],
    notIncluded: [
      'Team management',
      'API access',
      'Custom branding'
    ]
  };

  const platinumFeatures = {
    included: [
      'Unlimited listings',
      '500 lead credits/month',
      'Premium analytics',
      '24/7 support',
      '10 featured boosts/month',
      'Enterprise CRM',
      'WhatsApp + SMS integration',
      'Advanced lead scoring',
      'Team management',
      'Custom branding',
      'API access',
      'Dedicated account manager'
    ]
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    alert(`Downloading invoice file: ${invoiceId}.pdf`);
  };

  return (
    <div className="bg-white rounded-[5px] border border-gray-200/60 p-6 md:p-8 shadow-sm space-y-8 animate-fade-in font-poppins text-left">
      
      {/* ================= HEADER SECTION ================= */}
      <div className="text-left">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#0B2C5C] tracking-tight">Subscription & Billing</h1>
        <p className="text-xs md:text-sm text-gray-500 mt-1">Manage your plan, credits, and billing information</p>
      </div>

      {/* ================= CURRENT PLAN BANNER ================= */}
      <div className="bg-gradient-to-r from-[#1A5FDF] to-[#0A3D9E] rounded-2xl p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md border border-blue-400/25">
        <div className="space-y-4">
          <div>
            <span className="text-[10px] uppercase font-medium tracking-wider text-blue-100 opacity-90">Current Plan</span>
            <h2 className="text-2xl md:text-3xl font-semibold mt-1">Premium Pro</h2>
            <p className="text-xl font-medium mt-1">₹4,999</p>
          </div>
          <p className="text-xs text-blue-100 opacity-90">Renews on 20-01-2025</p>
        </div>

        <div className="flex flex-col sm:flex-row md:items-center gap-6 md:gap-12">
          {/* Features checkmarks */}
          <ul className="space-y-2.5 text-xs font-medium text-blue-50">
            <li className="flex items-center gap-2">
              <Icon icon="ri:check-line" className="w-4 h-4 text-blue-200" />
              <span>Unlimited property listings</span>
            </li>
            <li className="flex items-center gap-2">
              <Icon icon="ri:check-line" className="w-4 h-4 text-blue-200" />
              <span>Advanced analytics</span>
            </li>
            <li className="flex items-center gap-2">
              <Icon icon="ri:check-line" className="w-4 h-4 text-blue-200" />
              <span>Lead CRM system</span>
            </li>
          </ul>

          {/* Manage Billing button */}
          <button 
            type="button"
            className="bg-white hover:bg-blue-50 text-[#0A3D9E] font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors cursor-pointer text-center whitespace-nowrap"
          >
            Manage Billing
          </button>
        </div>
      </div>

      {/* ================= STATS CREDITS ROW ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Listing Credits */}
        <div className="bg-white border border-gray-150 rounded-xl p-5 shadow-sm space-y-3.5">
          <span className="text-xs text-slate-500 font-semibold tracking-wider uppercase">Listing Credits</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-semibold text-gray-900">15</span>
            <span className="text-xs text-gray-400 font-medium">of 20</span>
          </div>
          {/* Progress bar (blue) */}
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <span className="block text-[10px] text-gray-400 font-medium">5 credits used this month</span>
        </div>

        {/* Lead Credits */}
        <div className="bg-white border border-gray-150 rounded-xl p-5 shadow-sm space-y-3.5">
          <span className="text-xs text-slate-500 font-semibold tracking-wider uppercase">Lead Credits</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-semibold text-gray-900">65</span>
            <span className="text-xs text-gray-400 font-medium">of 100</span>
          </div>
          {/* Progress bar (green) */}
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#198754] rounded-full" style={{ width: '65%' }}></div>
          </div>
          <span className="block text-[10px] text-gray-400 font-medium">35 credits used this month</span>
        </div>

        {/* Featured Boosts */}
        <div className="bg-white border border-gray-150 rounded-xl p-5 shadow-sm space-y-3.5">
          <span className="text-xs text-slate-500 font-semibold tracking-wider uppercase">Featured Boosts</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-semibold text-gray-900">7</span>
            <span className="text-xs text-gray-400 font-medium">of 10</span>
          </div>
          {/* Progress bar (orange) */}
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: '70%' }}></div>
          </div>
          <span className="block text-[10px] text-gray-400 font-medium">3 boosts used this month</span>
        </div>
      </div>

      {/* ================= CHOOSE YOUR PLAN SECTION ================= */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-[#0B2C5C] tracking-tight">Choose Your Plan</h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Plan 1: Silver */}
          <div className="bg-white border border-gray-200 rounded-[10px] p-6 shadow-sm flex flex-col justify-between min-h-[580px] hover:shadow-md transition-shadow">
            <div className="space-y-5">
              <div>
                <h4 className="text-xl font-semibold text-gray-900">Silver</h4>
                <p className="text-xs text-gray-400 font-medium mt-1">Perfect for starting agents</p>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-semibold text-gray-900">₹2,999</span>
                <span className="text-xs text-gray-450 font-medium ml-1">/month</span>
              </div>
              <button 
                type="button"
                className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold text-sm py-2.5 rounded-lg transition-colors cursor-pointer text-center"
              >
                Upgrade Now
              </button>
              
              <hr className="border-gray-150" />
              
              <div className="space-y-4 text-xs font-medium">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Included</span>
                  <ul className="space-y-2 mt-2">
                    {silverFeatures.included.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-700">
                        <Icon icon="ri:check-line" className="w-4 h-4 text-green-600 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Not Included</span>
                  <ul className="space-y-2 mt-2">
                    {silverFeatures.notIncluded.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-400/80">
                        <Icon icon="ri:close-line" className="w-4 h-4 text-gray-300 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Plan 2: Gold */}
          <div className="bg-white border-2 border-[#1A5FDF] rounded-[10px] shadow-md flex flex-col justify-between min-h-[610px] relative overflow-hidden transform lg:-translate-y-2 hover:shadow-lg transition-all">
            {/* Ribbon */}
            <div className="bg-[#1A5FDF] text-white text-center py-2 text-xs font-semibold uppercase tracking-wider select-none">
              Most Popular
            </div>
            
            <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
              <div className="space-y-5">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">Gold</h4>
                  <p className="text-xs text-gray-400 font-medium mt-1">Most popular plan</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-semibold text-gray-900">₹4,999</span>
                  <span className="text-xs text-gray-450 font-medium ml-1">/month</span>
                </div>
                <button 
                  type="button"
                  className="w-full bg-[#1A5FDF] hover:bg-blue-700 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors cursor-pointer text-center shadow-sm"
                >
                  Current Plan
                </button>
                
                <hr className="border-gray-150" />
                
                <div className="space-y-4 text-xs font-medium">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Included</span>
                    <ul className="space-y-2 mt-2">
                      {goldFeatures.included.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-700">
                          <Icon icon="ri:check-line" className="w-4 h-4 text-green-600 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Not Included</span>
                    <ul className="space-y-2 mt-2">
                      {goldFeatures.notIncluded.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-400/80">
                          <Icon icon="ri:close-line" className="w-4 h-4 text-gray-300 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Plan 3: Platinum */}
          <div className="bg-white border border-gray-200 rounded-[10px] p-6 shadow-sm flex flex-col justify-between min-h-[580px] hover:shadow-md transition-shadow">
            <div className="space-y-5">
              <div>
                <h4 className="text-xl font-semibold text-gray-900">Platinum</h4>
                <p className="text-xs text-gray-400 font-medium mt-1">For agencies & teams</p>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-semibold text-gray-900">₹9,999</span>
                <span className="text-xs text-gray-455 font-medium ml-1">/month</span>
              </div>
              <button 
                type="button"
                className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold text-sm py-2.5 rounded-lg transition-colors cursor-pointer text-center"
              >
                Upgrade Now
              </button>
              
              <hr className="border-gray-150" />
              
              <div className="space-y-4 text-xs font-medium">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Included</span>
                  <ul className="space-y-2 mt-2">
                    {platinumFeatures.included.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-700">
                        <Icon icon="ri:check-line" className="w-4 h-4 text-green-600 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= PAYMENT HISTORY SECTION ================= */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-[#0B2C5C] tracking-tight">Payment History</h3>
        
        <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-gray-200 text-xs font-semibold text-gray-700 font-poppins">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Plan</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {payments.map((record, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 transition-colors text-sm">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 font-medium">
                      {record.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-semibold">
                      {record.plan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-semibold">
                      {record.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-[#D5F9DF] text-[#1E7D32] px-2.5 py-0.5 rounded text-[10px] font-semibold select-none">
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDownloadInvoice(record.invoice)}
                        className="text-[#1A5FDF] hover:text-[#0A3D9E] font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Icon icon="ri:download-line" className="w-4 h-4" />
                        <span>{record.invoice}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};

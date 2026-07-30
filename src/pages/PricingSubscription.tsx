import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Download,
  Eye,
  X,
  Plus,
  ChevronDown,
  Check,
  Pencil,
  Trash2,
  TrendingUp,
  Clock,
  Info,
  FileText,
  Star,
  Layers,
  Mail,
  FileDown
} from 'lucide-react';

interface SubscriptionPackage {
  id: string;
  name: string;
  userType: string;
  price: string;
  propertyLimit: string;
  featuredListings: string;
  activeSubscribers: number;
  status: string;
}

interface ExpiryRecord {
  id: string;
  subscriber: string;
  packageName: string;
  expiryDate: string;
  daysLeft: number;
  autoRenewal: boolean;
}

interface GstInvoice {
  id: string;
  customer: string;
  amount: string;
  gst: string;
  date: string;
  status: string;
}

interface TransactionRecord {
  id: string;
  customer: string;
  amount: string;
  gateway: string;
  date: string;
  status: string;
}

// Period Dropdown component (matching other pages)
interface PeriodDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const PeriodDropdown: React.FC<PeriodDropdownProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const options = ['Last Week', 'Last Month', 'Three Months', 'Six Months', 'Last Years'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 4,
        left: rect.right + window.scrollX - 112, // width is 112
        width: 112
      });
    }
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left animate-none" ref={dropdownRef}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 bg-[#E2F5EC] hover:bg-[#d4f0e2] rounded-full px-2.5 py-1 text-[10px] font-semibold text-slate-800 transition-all focus:outline-none cursor-pointer"
      >
        <span>{value}</span>
        <ChevronDown className={`w-2.5 h-2.5 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-slate-800' : 'text-slate-600'}`} />
      </button>

      {isOpen && createPortal(
        <div
          className="bg-white border border-slate-200 rounded-lg shadow-lg z-[9999] py-1 flex flex-col"
          style={{
            position: 'absolute',
            top: coords.top,
            left: coords.left,
            width: coords.width
          }}
        >
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-1.5 text-[10px] transition-colors flex items-center justify-between cursor-pointer ${
                option === value ? 'bg-[#F0F4F9]/60 font-semibold text-[#035096]' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{option}</span>
              {option === value && <Check className="w-3 h-3 text-[#035096] shrink-0" />}
            </button>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
};

export const PricingSubscription: React.FC = () => {
  // Stat periods
  const [periodActiveSubs, setPeriodActiveSubs] = useState('Last Month');
  const [periodRevenue, setPeriodRevenue] = useState('Last Month');
  const [periodFeatured, setPeriodFeatured] = useState('Last Month');
  const [periodExpiring, setPeriodExpiring] = useState('Last Month');
  const [periodPending, setPeriodPending] = useState('Last Month');
  const [periodGst, setPeriodGst] = useState('Last Month');

  // Modals state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states for creating a package
  const [newPackageForm, setNewPackageForm] = useState({
    packageName: '',
    userType: 'Agent',
    startDate: '',
    endDate: '',
    price: '',
    gstPercentage: '18',
    description: '',
    propertyLimit: '5',
    featuredListings: '1',
    boostCredits: '18',
    leadAccessLimit: '50',
    agentSeats: '1',
    prioritySupport: true,
    analyticsAccess: true,
    verificationBadge: true,
    homepagePromotion: true
  });

  // Mock initial Packages data
  const [packages, setPackages] = useState<SubscriptionPackage[]>([
    { id: 'P1', name: 'Silver', userType: 'Agent', price: '₹999', propertyLimit: '05', featuredListings: '01', activeSubscribers: 342, status: 'Active' },
    { id: 'P2', name: 'Gold', userType: 'Agent', price: '₹2,499', propertyLimit: '25', featuredListings: '05', activeSubscribers: 1256, status: 'Active' },
    { id: 'P3', name: 'Platinum', userType: 'Owner', price: '₹4,999', propertyLimit: '100', featuredListings: '20', activeSubscribers: 587, status: 'Active' },
    { id: 'P4', name: 'Enterprise', userType: 'Builders', price: '₹9,999', propertyLimit: 'Unlimited', featuredListings: 'Unlimited', activeSubscribers: 62, status: 'Active' }
  ]);

  // Expiry monitoring list
  const [expiryRecords] = useState<ExpiryRecord[]>([
    { id: 'E1', subscriber: 'Agent001', packageName: 'Silver', expiryDate: '05 Jun 2026', daysLeft: 5, autoRenewal: true },
    { id: 'E2', subscriber: 'Owner005', packageName: 'Gold', expiryDate: '05 Jun 2026', daysLeft: 10, autoRenewal: true },
    { id: 'E3', subscriber: 'Builder002', packageName: 'Platinum', expiryDate: '05 Jun 2026', daysLeft: 1, autoRenewal: false },
    { id: 'E4', subscriber: 'Agent023', packageName: 'Enterprise', expiryDate: '05 Jun 2026', daysLeft: 15, autoRenewal: true }
  ]);

  // GST Invoices list
  const [invoices] = useState<GstInvoice[]>([
    { id: 'INV-2024-001', customer: 'John Doe', amount: '₹2,499', gst: '₹450', date: '2024-02-01', status: 'Paid' },
    { id: 'INV-2024-002', customer: 'Jane Smith', amount: '₹4,999', gst: '₹900', date: '2024-02-02', status: 'Paid' },
    { id: 'INV-2024-003', customer: 'ABC Corp', amount: '₹9,999', gst: '₹1,800', date: '2024-02-03', status: 'Pending' },
    { id: 'INV-2024-004', customer: 'Agent023', amount: '₹999', gst: '₹180', date: '2024-02-04', status: 'Paid' }
  ]);

  // Recent Transactions list
  const [transactions] = useState<TransactionRecord[]>([
    { id: 'TXN-001', customer: 'John Doe', amount: '₹2,499', gateway: 'Razorpay', date: '2024-02-04', status: 'Success' },
    { id: 'TXN-002', customer: 'Jane Smith', amount: '₹4,999', gateway: 'Stripe', date: '2024-02-04', status: 'Success' },
    { id: 'TXN-003', customer: 'ABC Corp', amount: '₹9,999', gateway: 'Razorpay', date: '2024-02-03', status: 'Success' },
    { id: 'TXN-004', customer: 'Agent023', amount: '₹999', gateway: 'Stripe', date: '2024-02-03', status: 'Pending' }
  ]);

  const handleExportInvoices = () => {
    alert("Exporting GST invoices: gummam_gst_invoices.csv");
  };

  const handleRenew = (subscriber: string) => {
    alert(`Renewing plan for subscriber: ${subscriber}`);
  };

  const handleInvoiceAction = (action: string, id: string) => {
    alert(`${action} for invoice ${id}`);
  };

  const handleCreatePackageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPack: SubscriptionPackage = {
      id: `P${packages.length + 1}`,
      name: newPackageForm.packageName || 'Unnamed Package',
      userType: newPackageForm.userType,
      price: `₹${newPackageForm.price || '0'}`,
      propertyLimit: newPackageForm.propertyLimit === '0' ? 'Unlimited' : newPackageForm.propertyLimit,
      featuredListings: newPackageForm.featuredListings === '0' ? 'Unlimited' : newPackageForm.featuredListings,
      activeSubscribers: 0,
      status: 'Active'
    };

    setPackages([...packages, newPack]);
    setShowCreateModal(false);
    // Reset form
    setNewPackageForm({
      packageName: '',
      userType: 'Agent',
      startDate: '',
      endDate: '',
      price: '',
      gstPercentage: '18',
      description: '',
      propertyLimit: '5',
      featuredListings: '1',
      boostCredits: '18',
      leadAccessLimit: '50',
      agentSeats: '1',
      prioritySupport: true,
      analyticsAccess: true,
      verificationBadge: true,
      homepagePromotion: true
    });
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* ================= KPI CARDS GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Active Subscriptions */}
        <div className="bg-white border border-[#dddddd] rounded-[16px] p-4 flex flex-col justify-between min-h-[140px] shadow-none">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500">Total Active Subscriptions</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-2xl font-bold text-slate-900 leading-none">2,847</span>
            <div className="flex justify-between items-center mt-3">
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>+ 8.02%</span>
              </span>
              <PeriodDropdown value={periodActiveSubs} onChange={setPeriodActiveSubs} />
            </div>
          </div>
        </div>

        {/* Subscription Revenue */}
        <div className="bg-white border border-[#dddddd] rounded-[16px] p-4 flex flex-col justify-between min-h-[140px] shadow-none">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500">Subscription Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-[#0F8043]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-2xl font-bold text-slate-900 leading-none">₹45.23 Lakhs</span>
            <div className="flex justify-between items-center mt-3">
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>+ 8.02%</span>
              </span>
              <PeriodDropdown value={periodRevenue} onChange={setPeriodRevenue} />
            </div>
          </div>
        </div>

        {/* Featured Listings */}
        <div className="bg-white border border-[#dddddd] rounded-[16px] p-4 flex flex-col justify-between min-h-[140px] shadow-none">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500">Featured Listings</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-650">
              <Star className="w-4 h-4" />
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-2xl font-bold text-slate-900 leading-none">1,234</span>
            <div className="flex justify-between items-center mt-3">
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>+ 8.02%</span>
              </span>
              <PeriodDropdown value={periodFeatured} onChange={setPeriodFeatured} />
            </div>
          </div>
        </div>

        {/* Expiring Plans (30 Days) */}
        <div className="bg-white border border-[#dddddd] rounded-[16px] p-4 flex flex-col justify-between min-h-[140px] shadow-none">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500">Expiring Plans (30 Days)</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-2xl font-bold text-slate-900 leading-none">342</span>
            <div className="flex justify-between items-center mt-3">
              <span className="text-[10px] font-bold text-rose-600 flex items-center gap-0.5">
                <span className="font-semibold">- 2.3%</span>
              </span>
              <PeriodDropdown value={periodExpiring} onChange={setPeriodExpiring} />
            </div>
          </div>
        </div>

        {/* Pending Payments */}
        <div className="bg-white border border-[#dddddd] rounded-[16px] p-4 flex flex-col justify-between min-h-[140px] shadow-none">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500">Pending Payments</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
              <Info className="w-4 h-4" />
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-2xl font-bold text-slate-900 leading-none">₹8.75 Lakhs</span>
            <div className="flex justify-between items-center mt-3">
              <span className="text-[10px] font-bold text-rose-600 flex items-center gap-0.5">
                <span className="font-semibold">- 2.3%</span>
              </span>
              <PeriodDropdown value={periodPending} onChange={setPeriodPending} />
            </div>
          </div>
        </div>

        {/* GST Invoices Generated */}
        <div className="bg-white border border-[#dddddd] rounded-[16px] p-4 flex flex-col justify-between min-h-[140px] shadow-none">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500">GST Invoices Generated</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-650">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-2xl font-bold text-slate-900 leading-none">5,623</span>
            <div className="flex justify-between items-center mt-3">
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>+ 8.02%</span>
              </span>
              <PeriodDropdown value={periodGst} onChange={setPeriodGst} />
            </div>
          </div>
        </div>
      </div>

      {/* ================= SECTION 1: SUBSCRIPTION PACKAGES ================= */}
      <div className="space-y-3">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Subscription Packages</h3>
            <p className="text-[11px] font-medium text-slate-500">Manage and monitor all subscription plans</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="h-10 px-4 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[8px] flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Create New Package</span>
          </button>
        </div>

        <div className="bg-white rounded-[16px] overflow-hidden border border-[#dddddd] shadow-none">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs text-slate-700 font-medium">
              <thead>
                <tr className="bg-[#F0F2F3] border-b border-[#dddddd] text-xs font-semibold text-slate-700">
                  <th className="p-4 pl-6">Package Name</th>
                  <th className="p-4">User Type</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Property Limit</th>
                  <th className="p-4">Featured Listings</th>
                  <th className="p-4">Active Subscribers</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dddddd]">
                {packages.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="p-4 pl-6 font-semibold text-slate-900">{pkg.name}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-[5px] text-[10px] font-semibold ${
                        pkg.userType === 'Agent' ? 'bg-blue-50 text-blue-750' :
                        pkg.userType === 'Owner' ? 'bg-purple-50 text-purple-750' :
                        'bg-amber-50 text-amber-700'
                      }`}>
                        {pkg.userType}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-slate-900">{pkg.price}</td>
                    <td className="p-4 text-slate-550">{pkg.propertyLimit}</td>
                    <td className="p-4 text-slate-550">{pkg.featuredListings}</td>
                    <td className="p-4 text-slate-900 font-semibold">{pkg.activeSubscribers}</td>
                    <td className="p-4">
                      <span className="text-emerald-600 font-semibold bg-emerald-50 border border-emerald-250 px-2.5 py-0.5 rounded-[5px] text-[10px]">
                        {pkg.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="w-8 h-8 rounded-[5px] hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-700 transition cursor-pointer">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(pkg.id)}
                          className="w-8 h-8 rounded-[5px] hover:bg-slate-100 flex items-center justify-center text-rose-600 hover:text-rose-700 transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= SECTION 2: SUBSCRIPTION EXPIRY MONITORING ================= */}
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Subscription Expiry Monitoring</h3>
        </div>

        <div className="bg-white rounded-[16px] overflow-hidden border border-[#dddddd] shadow-none">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs text-slate-700 font-medium">
              <thead>
                <tr className="bg-[#F0F2F3] border-b border-[#dddddd] text-xs font-semibold text-slate-700">
                  <th className="p-4 pl-6">Subscriber</th>
                  <th className="p-4">Package</th>
                  <th className="p-4 min-w-[100px] whitespace-nowrap">Expiry Date</th>
                  <th className="p-4 min-w-[90px] whitespace-nowrap">Days Left</th>
                  <th className="p-4">Auto-Renewal</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dddddd]">
                {expiryRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="p-4 pl-6 font-semibold text-slate-900">{rec.subscriber}</td>
                    <td className="p-4 text-slate-600">{rec.packageName}</td>
                    <td className="p-4 text-slate-500 whitespace-nowrap">{rec.expiryDate}</td>
                    <td className="p-4 min-w-[90px] whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-[5px] text-[10px] font-semibold border whitespace-nowrap ${
                        rec.daysLeft <= 1 ? 'bg-red-50 text-red-700 border-red-200' :
                        rec.daysLeft <= 5 ? 'bg-orange-50 text-orange-700 border-orange-200' :
                        'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {rec.daysLeft} days
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        {rec.autoRenewal ? (
                          <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center text-rose-700">
                            <X className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <button
                        onClick={() => handleRenew(rec.subscriber)}
                        className="bg-[#035096] hover:bg-[#024078] text-white text-[10px] font-semibold h-7 px-3 rounded-[5px] transition cursor-pointer"
                      >
                        Renew
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= SECTION 3: GST INVOICE MANAGEMENT ================= */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-900">GST Invoice Management</h3>
          <button
            onClick={handleExportInvoices}
            className="h-10 px-4 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[8px] flex items-center gap-2 transition cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>

        <div className="bg-white rounded-[16px] overflow-hidden border border-[#dddddd] shadow-none">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs text-slate-700 font-medium">
              <thead>
                <tr className="bg-[#F0F2F3] border-b border-[#dddddd] text-xs font-semibold text-slate-700">
                  <th className="p-4 pl-6">Invoice #</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">GST</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dddddd]">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="p-4 pl-6 font-semibold text-slate-900">{inv.id}</td>
                    <td className="p-4 text-slate-700">{inv.customer}</td>
                    <td className="p-4 font-semibold text-slate-900">{inv.amount}</td>
                    <td className="p-4 text-slate-550">{inv.gst}</td>
                    <td className="p-4 text-slate-500">{inv.date}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-[5px] text-[10px] font-semibold border ${
                        inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleInvoiceAction('View', inv.id)}
                          className="w-8 h-8 rounded-[5px] hover:bg-slate-100 flex items-center justify-center text-blue-600 transition cursor-pointer"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleInvoiceAction('Download', inv.id)}
                          className="w-8 h-8 rounded-[5px] hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-700 transition cursor-pointer"
                          title="Download"
                        >
                          <FileDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleInvoiceAction('Mail', inv.id)}
                          className="w-8 h-8 rounded-[5px] hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-700 transition cursor-pointer"
                          title="Mail"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= SECTION 4: RECENT TRANSACTIONS ================= */}
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Recent Transactions</h3>
        </div>

        <div className="bg-white rounded-[16px] overflow-hidden border border-[#dddddd] shadow-none">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs text-slate-700 font-medium">
              <thead>
                <tr className="bg-[#F0F2F3] border-b border-[#dddddd] text-xs font-semibold text-slate-700">
                  <th className="p-4 pl-6">Transaction ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Gateway</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 pr-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dddddd]">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="p-4 pl-6 font-semibold text-slate-900">{tx.id}</td>
                    <td className="p-4 text-slate-700">{tx.customer}</td>
                    <td className="p-4 font-semibold text-slate-900">{tx.amount}</td>
                    <td className="p-4 text-slate-550">{tx.gateway}</td>
                    <td className="p-4 text-slate-500">{tx.date}</td>
                    <td className="p-4 pr-6">
                      <span className={`px-2.5 py-0.5 rounded-[5px] text-[10px] font-semibold border ${
                        tx.status === 'Success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= MODAL: CREATE NEW PACKAGE ================= */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-[1000] p-4">
          <div className="bg-white w-full max-w-[460px] rounded-[5px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Create New Package</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-[5px] hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleCreatePackageSubmit} className="flex flex-col overflow-hidden">
              <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-600">
                
                {/* Section: Package Info */}
                <div className="space-y-2.5">
                  <h4 className="text-[10px] font-bold text-[#035096] uppercase tracking-wider border-b border-slate-100 pb-1">Package Information</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-1">Package Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Silver, Gold..."
                        value={newPackageForm.packageName}
                        onChange={(e) => setNewPackageForm({...newPackageForm, packageName: e.target.value})}
                        className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-1">User type</label>
                      <select
                        value={newPackageForm.userType}
                        onChange={(e) => setNewPackageForm({...newPackageForm, userType: e.target.value})}
                        className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                      >
                        <option value="Agent">Agent</option>
                        <option value="Owner">Owner</option>
                        <option value="Builders">Builders</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={newPackageForm.startDate}
                        onChange={(e) => setNewPackageForm({...newPackageForm, startDate: e.target.value})}
                        className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-1">End Date</label>
                      <input
                        type="date"
                        value={newPackageForm.endDate}
                        onChange={(e) => setNewPackageForm({...newPackageForm, endDate: e.target.value})}
                        className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-1">Price *</label>
                      <div className="relative flex items-center">
                        <span className="absolute left-2.5 text-slate-400 font-semibold text-xs">₹</span>
                        <input
                          type="number"
                          required
                          placeholder="Price"
                          value={newPackageForm.price}
                          onChange={(e) => setNewPackageForm({...newPackageForm, price: e.target.value})}
                          className="w-full h-8 pl-6 pr-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-1">GST Percentage *</label>
                      <input
                        type="number"
                        required
                        value={newPackageForm.gstPercentage}
                        onChange={(e) => setNewPackageForm({...newPackageForm, gstPercentage: e.target.value})}
                        className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Description</label>
                    <textarea
                      rows={2}
                      placeholder="Brief description"
                      value={newPackageForm.description}
                      onChange={(e) => setNewPackageForm({...newPackageForm, description: e.target.value})}
                      className="w-full bg-white border border-slate-200 rounded-[5px] px-2.5 py-1.5 text-xs outline-none focus:border-[#035096] resize-none"
                    />
                  </div>
                </div>

                {/* Section: Package Limits */}
                <div className="space-y-2.5">
                  <h4 className="text-[10px] font-bold text-[#035096] uppercase tracking-wider border-b border-slate-100 pb-1">Package Limits</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-1">Property Limit</label>
                      <input
                        type="text"
                        placeholder="e.g. 5 or Unlimited"
                        value={newPackageForm.propertyLimit}
                        onChange={(e) => setNewPackageForm({...newPackageForm, propertyLimit: e.target.value})}
                        className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-1">Featured Listings</label>
                      <input
                        type="text"
                        placeholder="e.g. 1 or Unlimited"
                        value={newPackageForm.featuredListings}
                        onChange={(e) => setNewPackageForm({...newPackageForm, featuredListings: e.target.value})}
                        className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-1">Boost Credits</label>
                      <input
                        type="number"
                        value={newPackageForm.boostCredits}
                        onChange={(e) => setNewPackageForm({...newPackageForm, boostCredits: e.target.value})}
                        className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-1">Lead Access Limit</label>
                      <input
                        type="number"
                        value={newPackageForm.leadAccessLimit}
                        onChange={(e) => setNewPackageForm({...newPackageForm, leadAccessLimit: e.target.value})}
                        className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Agent Seats</label>
                    <input
                      type="number"
                      value={newPackageForm.agentSeats}
                      onChange={(e) => setNewPackageForm({...newPackageForm, agentSeats: e.target.value})}
                      className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                    />
                  </div>
                </div>

                {/* Section: Additional Benefits */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-1">
                    <h4 className="text-[10px] font-bold text-[#035096] uppercase tracking-wider">Additional Benefits</h4>
                    <button
                      type="button"
                      onClick={() => alert("Add custom benefit placeholder")}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-[5px] cursor-pointer"
                    >
                      + Add
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                      <input
                        type="checkbox"
                        checked={newPackageForm.prioritySupport}
                        onChange={(e) => setNewPackageForm({...newPackageForm, prioritySupport: e.target.checked})}
                        className="w-3.5 h-3.5 rounded border-slate-200 text-[#035096] focus:ring-[#035096]"
                      />
                      <span>Priority Support</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                      <input
                        type="checkbox"
                        checked={newPackageForm.analyticsAccess}
                        onChange={(e) => setNewPackageForm({...newPackageForm, analyticsAccess: e.target.checked})}
                        className="w-3.5 h-3.5 rounded border-slate-200 text-[#035096] focus:ring-[#035096]"
                      />
                      <span>Analytics Access</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                      <input
                        type="checkbox"
                        checked={newPackageForm.verificationBadge}
                        onChange={(e) => setNewPackageForm({...newPackageForm, verificationBadge: e.target.checked})}
                        className="w-3.5 h-3.5 rounded border-slate-200 text-[#035096] focus:ring-[#035096]"
                      />
                      <span>Verification Badge</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                      <input
                        type="checkbox"
                        checked={newPackageForm.homepagePromotion}
                        onChange={(e) => setNewPackageForm({...newPackageForm, homepagePromotion: e.target.checked})}
                        className="w-3.5 h-3.5 rounded border-slate-200 text-[#035096] focus:ring-[#035096]"
                      />
                      <span>Homepage Promotion</span>
                    </label>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-100 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-[5px] cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="flex-1 h-9 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[5px] cursor-pointer"
                >
                  Save Package
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ================= CONFIRM DELETE DIALOG ================= */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-[1100] p-4">
          <div className="bg-white w-full max-w-[380px] rounded-[5px] overflow-hidden shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-semibold text-slate-900">
              Confirm Delete
            </h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Are you sure you want to delete this subscription package? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-semibold rounded-[5px] hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setPackages(packages.filter((p) => p.id !== deleteConfirmId));
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-[5px] transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

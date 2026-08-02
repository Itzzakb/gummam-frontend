import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Download,
  ChevronDown,
  Check,
  Search,
  Layers,
  TrendingUp,
  Users,
  CreditCard,
  Target,
  UserCheck,
  Settings
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

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

export const AnalyticsPage: React.FC = () => {
  // Stat Card Periods
  const [periodRevenue, setPeriodRevenue] = useState('Last Month');
  const [periodInquiries, setPeriodInquiries] = useState('Last Month');
  const [periodConversion, setPeriodConversion] = useState('Last Month');
  const [periodActiveUsers, setPeriodActiveUsers] = useState('Last Month');

  // Search filter states
  const [agentSearch, setAgentSearch] = useState('');
  const [citySearch, setCitySearch] = useState('');

  // Initial Agent conversion records
  const initialAgents = [
    { name: 'Deepak Verma', conversions: 24, attempts: 95, ratio: 25.3 },
    { name: 'Rajesh Kumar', conversions: 22, attempts: 62, ratio: 35.5 },
    { name: 'Priya Singh', conversions: 28, attempts: 90, ratio: 31.0 },
    { name: 'Vikram Gupta', conversions: 15, attempts: 52, ratio: 28.8 },
    { name: 'Neha Sharma', conversions: 17, attempts: 68, ratio: 25.0 }
  ];

  // Initial Heatmap records
  const initialHeatmaps = [
    { city: 'City 1', inquiries: 369 },
    { city: 'City 2', inquiries: 258 },
    { city: 'City 3', inquiries: 175 },
    { city: 'City 4', inquiries: 235 },
    { city: 'City 5', inquiries: 426 },
    { city: 'City 6', inquiries: 760 }
  ];

  const filteredAgents = initialAgents.filter(a =>
    a.name.toLowerCase().includes(agentSearch.toLowerCase())
  );

  const filteredHeatmaps = initialHeatmaps.filter(h =>
    h.city.toLowerCase().includes(citySearch.toLowerCase())
  );

  // Chart data: User Growth
  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Active Users',
        data: [4500, 3200, 4800, 4250, 4900, 10200, 6800, 2200, 4400, 3900, 1950, 4800],
        borderColor: '#1E88E5',
        backgroundColor: 'rgba(30, 136, 229, 0.05)',
        tension: 0.45,
        fill: true,
        borderWidth: 2
      },
      {
        label: 'Agents',
        data: [2500, 1500, 2200, 3100, 3000, 5200, 3800, 3900, 3500, 4500, 2800, 3200],
        borderColor: '#0F8043',
        backgroundColor: 'transparent',
        tension: 0.45,
        borderWidth: 1.5,
        borderDash: [4, 4]
      },
      {
        label: 'Owners',
        data: [1500, 1200, 1800, 1400, 1300, 2400, 1900, 1600, 2100, 2000, 1400, 1800],
        borderColor: '#FF8F00',
        backgroundColor: 'transparent',
        tension: 0.45,
        borderWidth: 1.5,
        borderDash: [2, 2]
      }
    ]
  };

  // Chart data: Revenue Reports & Forecasts
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Actual Revenue',
        data: [45000, 75000, 95000, 115000, 145000, 185000, 195000, 245000, 285000, 315000, 345000, 375000],
        backgroundColor: '#FF8F00',
        borderRadius: 4
      },
      {
        label: 'Forecasted Revenue',
        data: [75000, 95000, 125000, 145000, 185000, 225000, 225000, 275000, 315000, 345000, 365000, 385000],
        backgroundColor: '#1E88E5',
        borderRadius: 4
      }
    ]
  };

  // Chart data: Lead Source Performance
  const leadSourceData = {
    labels: ['Website', 'Mobile App', 'Referral', 'Walk-in', 'Social Media', 'Call'],
    datasets: [
      {
        data: [2450, 1850, 680, 420, 1050, 1200],
        backgroundColor: [
          '#0D47A1',
          '#1565C0',
          '#29B6F6',
          '#FFA726',
          '#66BB6A',
          '#26A69A'
        ],
        borderWidth: 0
      }
    ]
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* ================= HEADER SECTION ================= */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Reports & Analytics</h1>
        <p className="text-xs font-medium text-slate-500 mt-1">
          Data-driven insights with comprehensive reports and performance metrics.
        </p>
      </div>

      {/* ================= KPI CARDS GRID (1 ROW OF 4 COLUMNS) ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Total Revenue */}
        <div className="bg-white border border-[#dddddd] rounded-[16px] p-4 flex flex-col justify-between min-h-[140px] shadow-none animate-none">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500">Total Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-[#0F8043]">
              <span className="text-sm font-bold">₹</span>
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-2xl font-bold text-slate-900 leading-none">₹19.90L</span>
            <div className="flex justify-between items-center mt-3">
              <span className="text-[10px] font-semibold text-emerald-600 bg-[#E2F5EC] border border-[#d4f0e2] px-2 py-0.5 rounded-[5px] flex items-center gap-0.5">
                <span>↑ 12.5%</span>
              </span>
              <PeriodDropdown value={periodRevenue} onChange={setPeriodRevenue} />
            </div>
          </div>
        </div>

        {/* Total Inquiries */}
        <div className="bg-white border border-[#dddddd] rounded-[16px] p-4 flex flex-col justify-between min-h-[140px] shadow-none animate-none">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500">Total Inquiries</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-2xl font-bold text-slate-900 leading-none">7690</span>
            <div className="flex justify-between items-center mt-3">
              <span className="text-[10px] font-semibold text-emerald-600 bg-[#E2F5EC] border border-[#d4f0e2] px-2 py-0.5 rounded-[5px] flex items-center gap-0.5">
                <span>↑ 24.3%</span>
              </span>
              <PeriodDropdown value={periodInquiries} onChange={setPeriodInquiries} />
            </div>
          </div>
        </div>

        {/* Avg Conversion Rate */}
        <div className="bg-white border border-[#dddddd] rounded-[16px] p-4 flex flex-col justify-between min-h-[140px] shadow-none animate-none">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500">Avg Conversion Rate</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-650">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-2xl font-bold text-slate-900 leading-none">29.8%</span>
            <div className="flex justify-between items-center mt-3">
              <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-[5px] flex items-center gap-0.5">
                <span>↓ 3.2%</span>
              </span>
              <PeriodDropdown value={periodConversion} onChange={setPeriodConversion} />
            </div>
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-white border border-[#dddddd] rounded-[16px] p-4 flex flex-col justify-between min-h-[140px] shadow-none animate-none">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500">Active Users</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-650">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-2xl font-bold text-slate-900 leading-none">16,800</span>
            <div className="flex justify-between items-center mt-3">
              <span className="text-[10px] font-semibold text-emerald-600 bg-[#E2F5EC] border border-[#d4f0e2] px-2 py-0.5 rounded-[5px] flex items-center gap-0.5">
                <span>↑ 15.8%</span>
              </span>
              <PeriodDropdown value={periodActiveUsers} onChange={setPeriodActiveUsers} />
            </div>
          </div>
        </div>

      </div>

      {/* ================= USER GROWTH LINE CHART ================= */}
      <div className="bg-white rounded-[16px] border border-[#dddddd] p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold text-slate-850 uppercase tracking-wide">User Growth Analytics</h3>
          </div>
          <button className="h-9 px-4 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[8px] flex items-center gap-2 transition cursor-pointer">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
        <div className="h-[300px] w-full relative">
          <Line
            data={userGrowthData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: {
                    boxWidth: 8,
                    usePointStyle: true,
                    font: { size: 10, weight: 'bold' }
                  }
                },
                tooltip: {
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  titleColor: '#1e293b',
                  bodyColor: '#475569',
                  borderColor: '#e2e8f0',
                  borderWidth: 1,
                  padding: 10,
                  boxPadding: 4,
                  usePointStyle: true
                }
              },
              scales: {
                x: {
                  grid: { display: false },
                  ticks: { font: { size: 9, weight: 'bold' }, color: '#64748b' }
                },
                y: {
                  grid: { color: '#f1f5f9' },
                  ticks: { font: { size: 9, weight: 'bold' }, color: '#64748b' }
                }
              }
            }}
          />
        </div>
      </div>

      {/* ================= REVENUE REPORTS & FORECASTS BAR CHART ================= */}
      <div className="bg-white rounded-[16px] border border-[#dddddd] p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold text-slate-850 uppercase tracking-wide">Revenue Reports & Forecasts</h3>
          </div>
          <button className="h-9 px-4 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[8px] flex items-center gap-2 transition cursor-pointer">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
        <div className="h-[300px] w-full relative">
          <Bar
            data={revenueData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: {
                    boxWidth: 8,
                    usePointStyle: true,
                    font: { size: 10, weight: 'bold' }
                  }
                }
              },
              scales: {
                x: {
                  grid: { display: false },
                  ticks: { font: { size: 9, weight: 'bold' }, color: '#64748b' }
                },
                y: {
                  grid: { color: '#f1f5f9' },
                  ticks: { font: { size: 9, weight: 'bold' }, color: '#64748b' }
                }
              }
            }}
          />
        </div>
      </div>

      {/* ================= LEAD SOURCES & AGENTS SUMMARY (2-COLUMN GRID) ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        
        {/* Lead Source Performance */}
        <div className="lg:col-span-4 bg-white rounded-[16px] border border-[#dddddd] p-6 flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
            <h3 className="text-sm font-bold text-slate-850 uppercase tracking-wide">Lead Source Performance</h3>
            <button className="h-8 px-3 bg-[#035096] hover:bg-[#024078] text-white text-[10px] font-semibold rounded-[6px] flex items-center gap-1.5 transition cursor-pointer">
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-around gap-6">
            <div className="w-[180px] h-[180px] relative shrink-0">
              <Pie
                data={leadSourceData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } }
                }}
              />
            </div>

            <div className="space-y-2 w-full text-xs font-semibold text-slate-700">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#0D47A1]" />Website :</span>
                <span className="text-slate-900">2450 <span className="text-slate-400 font-medium text-[10px]">(37.5%)</span></span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#1565C0]" />Mobile App :</span>
                <span className="text-slate-900">1850 <span className="text-slate-400 font-medium text-[10px]">(25.7%)</span></span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#29B6F6]" />Referral :</span>
                <span className="text-slate-900">680 <span className="text-slate-400 font-medium text-[10px]">(9%)</span></span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#FFA726]" />Walk-in :</span>
                <span className="text-slate-900">420 <span className="text-slate-400 font-medium text-[10px]">(5.6%)</span></span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#66BB6A]" />Social Media :</span>
                <span className="text-slate-900">1050 <span className="text-slate-400 font-medium text-[10px]">(13.9%)</span></span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#26A69A]" />Call :</span>
                <span className="text-slate-900">1200 <span className="text-slate-400 font-medium text-[10px]">(15.9%)</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Conversion Ratio Analysis */}
        <div className="lg:col-span-6 bg-white rounded-[16px] border border-[#dddddd] p-6 space-y-4 flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
            <h3 className="text-sm font-bold text-slate-850 uppercase tracking-wide">Agent Conversion Ratio Analysis</h3>
            <button className="h-8 px-3 bg-[#035096] hover:bg-[#024078] text-white text-[10px] font-semibold rounded-[6px] flex items-center gap-1.5 transition cursor-pointer">
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
            <input
              type="text"
              placeholder="Search agent..."
              value={agentSearch}
              onChange={(e) => setAgentSearch(e.target.value)}
              className="w-full h-8 pl-9 pr-4 bg-slate-50 border border-slate-200 rounded-[6px] text-xs outline-none focus:border-[#035096]"
            />
          </div>

          {/* List */}
          <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1 [scrollbar-width:thin]">
            {filteredAgents.map((agent, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-800">
                  <span>{agent.name}</span>
                  <span className="text-[#035096]">{agent.ratio}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#035096] h-full rounded-full transition-all duration-500"
                    style={{ width: `${agent.ratio}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                  <span>Conversions: {agent.conversions}</span>
                  <span>Attempts: {agent.attempts}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ================= PROPERTY INQUIRY HEATMAP ================= */}
      <div className="bg-white rounded-[16px] border border-[#dddddd] p-6 space-y-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-850 uppercase tracking-wide">Property Inquiry Heat-map by Location</h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
              <input
                type="text"
                placeholder="Search city..."
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                className="w-48 h-8 pl-8 pr-4 bg-slate-50 border border-slate-200 rounded-[6px] text-xs outline-none focus:border-[#035096]"
              />
            </div>
            <button className="h-8 px-4 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[6px] flex items-center gap-1.5 transition cursor-pointer">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {filteredHeatmaps.map((h, idx) => (
            <div key={idx} className="bg-[#EAF2FA] rounded-[8px] p-3 text-center flex flex-col justify-between min-h-[76px] transition-colors hover:bg-[#DEECFA]">
              <span className="text-[10px] font-bold text-slate-700 truncate">{h.city}</span>
              <span className="text-xl font-semibold text-[#0385F3] mt-0.5 leading-none">{h.inquiries}</span>
              <span className="text-[9px] font-bold text-slate-400">inquiries</span>
            </div>
          ))}
          {/* Duplicating City records for layout match in screenshot */}
          {filteredHeatmaps.map((h, idx) => (
            <div key={`dup-${idx}`} className="bg-[#EAF2FA] rounded-[8px] p-3 text-center flex flex-col justify-between min-h-[76px] transition-colors hover:bg-[#DEECFA]">
              <span className="text-[10px] font-bold text-slate-700 truncate">{h.city}</span>
              <span className="text-xl font-semibold text-[#0385F3] mt-0.5 leading-none">{h.inquiries}</span>
              <span className="text-[9px] font-bold text-slate-400">inquiries</span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= SCHEDULED REPORTS ================= */}
      <div className="bg-white rounded-[16px] border border-[#dddddd] p-6 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-850 uppercase tracking-wide">Scheduled Reports</h3>
        </div>

        <div className="space-y-2">
          
          {/* Report 1 */}
          <div className="bg-slate-50/50 border border-slate-150 rounded-[8px] px-4 py-3 flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <div className="font-bold text-slate-800">Weekly Performance Report</div>
              <div className="text-[10px] text-slate-400 font-semibold">Frequency: Weekly (Monday 9:00 AM) &nbsp;|&nbsp; Last sent: 12-05-2026</div>
            </div>
            <button className="h-8 w-8 bg-[#035096] hover:bg-[#024078] text-white rounded-[5px] flex items-center justify-center transition cursor-pointer">
              <Download className="w-4 h-4" />
            </button>
          </div>

          {/* Report 2 */}
          <div className="bg-slate-50/50 border border-slate-150 rounded-[8px] px-4 py-3 flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <div className="font-bold text-slate-800">Monthly Financial Summary</div>
              <div className="text-[10px] text-slate-400 font-semibold">Frequency: 1st of every month &nbsp;|&nbsp; Last sent: 01-05-2026</div>
            </div>
            <button className="h-8 w-8 bg-[#035096] hover:bg-[#024078] text-white rounded-[5px] flex items-center justify-center transition cursor-pointer">
              <Download className="w-4 h-4" />
            </button>
          </div>

          {/* Report 3 */}
          <div className="bg-slate-50/50 border border-slate-150 rounded-[8px] px-4 py-3 flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <div className="font-bold text-slate-800">Agent Performance Report</div>
              <div className="text-[10px] text-slate-400 font-semibold">Frequency: Daily (Today 5:00 PM) &nbsp;|&nbsp; Last sent: 15-05-2026</div>
            </div>
            <button className="h-8 w-8 bg-[#035096] hover:bg-[#024078] text-white rounded-[5px] flex items-center justify-center transition cursor-pointer">
              <Download className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* ================= CUSTOM REPORT GENERATION ================= */}
      <div className="bg-white rounded-[16px] border border-[#dddddd] p-6 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-850 uppercase tracking-wide">Custom Report Generation</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: User Demographics */}
          <div className="border border-slate-200/80 hover:border-slate-300 rounded-[12px] p-5 flex flex-col justify-between min-h-[160px] transition-all">
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <Users className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-800">User Demographics</h4>
                <p className="text-[10px] font-medium text-slate-450">Detailed user segmentation and profile analysis.</p>
                <ul className="text-[9px] font-bold text-slate-400 list-disc list-inside space-y-0.5 pt-1">
                  <li>User type breakdown</li>
                  <li>Geographic distribution</li>
                  <li>Age demographics</li>
                </ul>
              </div>
            </div>
            <button
              onClick={() => alert("Generating User Demographics Report...")}
              className="w-full mt-4 h-8 bg-[#035096] hover:bg-[#024078] text-white text-[10px] font-semibold rounded-[6px] transition cursor-pointer"
            >
              Generate Report
            </button>
          </div>

          {/* Card 2: Property Performance */}
          <div className="border border-slate-200/80 hover:border-slate-300 rounded-[12px] p-5 flex flex-col justify-between min-h-[160px] transition-all">
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#E2F5EC] flex items-center justify-center text-[#0F8043] shrink-0">
                <Layers className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-800">Property Performance</h4>
                <p className="text-[10px] font-medium text-slate-450">Top performing listings and property analytics.</p>
                <ul className="text-[9px] font-bold text-slate-400 list-disc list-inside space-y-0.5 pt-1">
                  <li>Top listing views</li>
                  <li>Category-wise popularity</li>
                  <li>Total listed ratio</li>
                </ul>
              </div>
            </div>
            <button
              onClick={() => alert("Generating Property Performance Report...")}
              className="w-full mt-4 h-8 bg-[#035096] hover:bg-[#024078] text-white text-[10px] font-semibold rounded-[6px] transition cursor-pointer"
            >
              Generate Report
            </button>
          </div>

          {/* Card 3: Financial Summary */}
          <div className="border border-slate-200/80 hover:border-slate-300 rounded-[12px] p-5 flex flex-col justify-between min-h-[160px] transition-all">
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                <CreditCard className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-800">Financial Summary</h4>
                <p className="text-[10px] font-medium text-slate-450">Revenue, commissions, and financial forecasts.</p>
                <ul className="text-[9px] font-bold text-slate-400 list-disc list-inside space-y-0.5 pt-1">
                  <li>Monthly revenue</li>
                  <li>Commission breakdown</li>
                  <li>Growth forecast</li>
                </ul>
              </div>
            </div>
            <button
              onClick={() => alert("Generating Financial Summary Report...")}
              className="w-full mt-4 h-8 bg-[#035096] hover:bg-[#024078] text-white text-[10px] font-semibold rounded-[6px] transition cursor-pointer"
            >
              Generate Report
            </button>
          </div>

          {/* Card 4: Lead Analysis */}
          <div className="border border-slate-200/80 hover:border-slate-300 rounded-[12px] p-5 flex flex-col justify-between min-h-[160px] transition-all">
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600 shrink-0">
                <Target className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-800">Lead Analysis</h4>
                <p className="text-[10px] font-medium text-slate-450">Lead quality, source ROI, and conversion metrics.</p>
                <ul className="text-[9px] font-bold text-slate-400 list-disc list-inside space-y-0.5 pt-1">
                  <li>Source ROI</li>
                  <li>Conversion rates</li>
                  <li>Lead quality score</li>
                </ul>
              </div>
            </div>
            <button
              onClick={() => alert("Generating Lead Analysis Report...")}
              className="w-full mt-4 h-8 bg-[#035096] hover:bg-[#024078] text-white text-[10px] font-semibold rounded-[6px] transition cursor-pointer"
            >
              Generate Report
            </button>
          </div>

          {/* Card 5: Agent Performance */}
          <div className="border border-slate-200/80 hover:border-slate-300 rounded-[12px] p-5 flex flex-col justify-between min-h-[160px] transition-all">
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center text-teal-650 shrink-0">
                <UserCheck className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-800">Agent Performance</h4>
                <p className="text-[10px] font-medium text-slate-450">Individual agent metrics and rankings.</p>
                <ul className="text-[9px] font-bold text-slate-400 list-disc list-inside space-y-0.5 pt-1">
                  <li>Conversions list</li>
                  <li>Response time</li>
                  <li>Activity ranking</li>
                </ul>
              </div>
            </div>
            <button
              onClick={() => alert("Generating Agent Performance Report...")}
              className="w-full mt-4 h-8 bg-[#035096] hover:bg-[#024078] text-white text-[10px] font-semibold rounded-[6px] transition cursor-pointer"
            >
              Generate Report
            </button>
          </div>

          {/* Card 6: Custom Query */}
          <div className="border border-slate-200/80 hover:border-slate-300 rounded-[12px] p-5 flex flex-col justify-between min-h-[160px] transition-all">
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                <Settings className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-800">Custom Query</h4>
                <p className="text-[10px] font-medium text-slate-450">Build your own report with custom parameters.</p>
                <ul className="text-[9px] font-bold text-slate-400 list-disc list-inside space-y-0.5 pt-1">
                  <li>Custom date range</li>
                  <li>Custom filters</li>
                  <li>Advanced analytics</li>
                </ul>
              </div>
            </div>
            <button
              onClick={() => alert("Opening Custom Query Builder...")}
              className="w-full mt-4 h-8 bg-[#035096] hover:bg-[#024078] text-white text-[10px] font-semibold rounded-[6px] transition cursor-pointer"
            >
              Generate Report
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

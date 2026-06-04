import React from 'react';
import { LayoutDashboard, Users, UserCheck, Briefcase, ChevronRight, BarChart3, Settings } from 'lucide-react';

export const CrmPortal: React.FC = () => {
  return (
    <div className="bg-[#FAFAFA] min-h-[calc(100vh-140px)] pb-20 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-[13px] text-gray-500 mb-6">
          <span className="hover:text-gray-900 cursor-pointer">Home</span>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-gray-900 font-medium">CRM Portal</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0B2C5C] font-merriweather">CRM Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your leads, properties, and agent communications in one integrated place.</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Leads', value: '1,248', desc: '+12% from last week', icon: Users, color: 'text-blue-600 bg-blue-50' },
            { label: 'Active Tasks', value: '42', desc: '8 pending review', icon: LayoutDashboard, color: 'text-orange-600 bg-orange-50' },
            { label: 'Assigned Agents', value: '18', desc: 'Across 4 sectors', icon: UserCheck, color: 'text-green-600 bg-green-50' },
            { label: 'Property Deals', value: '₹4.8 Cr', desc: '14 closed this month', icon: Briefcase, color: 'text-purple-600 bg-purple-50' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{item.label}</span>
                  <h3 className="text-2xl font-bold text-gray-950 mt-1">{item.value}</h3>
                  <span className="text-xs text-gray-500 mt-1 block">{item.desc}</span>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Modules Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Module 1: Recent Activity */}
          <div className="bg-white rounded-2xl border border-gray-200/60 p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#035096]" />
                Recent Lead Interactions
              </h3>
              <button className="text-xs text-[#035096] font-semibold hover:underline">View All</button>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                { name: 'Rajesh Kumar', action: 'Inquired about Laxmi Tower', time: '10 mins ago', status: 'New' },
                { name: 'Sneha Reddy', action: 'Requested site visit for Villa', time: '1 hr ago', status: 'Scheduled' },
                { name: 'Vikram Singh', action: 'Offered bid on Land plot', time: '4 hrs ago', status: 'Negotiation' },
                { name: 'Pooja Sharma', action: 'Sent document verification', time: 'Yesterday', status: 'Completed' },
              ].map((act, idx) => (
                <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold text-gray-900">{act.name}</span>
                    <span className="text-xs text-gray-500 ml-2">{act.action}</span>
                    <span className="block text-[11px] text-gray-400 mt-0.5">{act.time}</span>
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    act.status === 'New' ? 'bg-blue-100 text-blue-800' :
                    act.status === 'Scheduled' ? 'bg-orange-100 text-orange-800' :
                    act.status === 'Negotiation' ? 'bg-purple-100 text-purple-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {act.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Module 2: Tasks & Operations */}
          <div className="bg-white rounded-2xl border border-gray-200/60 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-gray-700" />
                  Quick Actions
                </h3>
              </div>
              <div className="space-y-3">
                <button className="w-full py-3 bg-[#035096] hover:bg-[#024078] text-white rounded-xl text-xs font-bold transition-colors">
                  Add New Lead
                </button>
                <button className="w-full py-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-xs font-bold transition-colors">
                  Assign Agent Assignment
                </button>
                <button className="w-full py-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-xs font-bold transition-colors">
                  Export Analytics Report
                </button>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-4 mt-6 text-center text-xs text-gray-400 font-medium">
              CRM Version 1.0.4 • Up to date
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

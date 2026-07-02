import React, { useState } from 'react';
import { Icon } from '@iconify/react';

type TabType = 'profile' | 'agency' | 'verification' | 'notifications' | 'security';

export const CrmSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  // Notifications state
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    whatsapp: true,
    leadAlerts: true,
    visitReminders: true,
    paymentAlerts: true,
    weeklyReport: true
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };

  // Agency info website state
  const [website, setWebsite] = useState('www.gummaamrealestate.com');

  const handleUpdateAgency = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Agency website updated to: ${website}`);
  };

  return (
    <div className="bg-white rounded-[5px] border border-gray-200/60 p-6 md:p-8 shadow-sm space-y-6 animate-fade-in font-poppins text-left">
      
      {/* ================= HEADER SECTION ================= */}
      <div className="text-left">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#0B2C5C] tracking-tight">Settings & Profile</h1>
        <p className="text-xs md:text-sm text-gray-500 mt-1">Manage your account, profile, and preferences</p>
      </div>

      {/* ================= TAB NAVIGATION ================= */}
      <div className="border-b border-gray-200 grid grid-cols-5 text-center whitespace-nowrap">
        {(['profile', 'agency', 'verification', 'notifications', 'security'] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 text-sm border-b-2 transition-all cursor-pointer capitalize w-full text-center ${
              activeTab === tab
                ? 'border-[#035096] text-[#035096] font-semibold'
                : 'border-transparent text-[#757575] hover:text-gray-800 font-medium'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ================= TAB CONTENTS ================= */}
      <div className="pt-4 font-poppins">
        
        {/* TAB 1: PROFILE */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {/* Profile Picture Section */}
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-[#0080FF] text-white flex items-center justify-center text-xl font-semibold select-none shadow-sm">
                RM
              </div>
              <div className="space-y-1 text-left">
                <span className="block text-[10px] uppercase font-semibold text-gray-400">Profile Picture</span>
                <button
                  type="button"
                  className="bg-white hover:bg-slate-50 border border-gray-250 rounded-lg px-4 py-2 text-xs font-semibold text-blue-600 flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <Icon icon="ri:upload-2-line" className="w-4 h-4 text-blue-650" />
                  <span>Change Photo</span>
                </button>
              </div>
            </div>

            {/* Profile Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div>
                <span className="block text-[10px] uppercase font-semibold text-gray-400">Name</span>
                <p className="text-sm font-semibold text-gray-800 mt-1">Ravi Kumar</p>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-semibold text-gray-400">Email</span>
                <p className="text-sm font-semibold text-gray-800 mt-1">ravi123@gummaam.com</p>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-semibold text-gray-400">Phone</span>
                <p className="text-sm font-semibold text-gray-800 mt-1">+91 98765 43210</p>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-semibold text-gray-400">Experience</span>
                <p className="text-sm font-semibold text-gray-800 mt-1">8 years</p>
              </div>
            </div>

            {/* About Me */}
            <div className="space-y-1">
              <span className="block text-[10px] uppercase font-semibold text-gray-400">About Me</span>
              <p className="text-xs text-gray-600 font-medium leading-relaxed bg-[#F8FAFC]/65 p-3 rounded-lg border border-gray-150 max-w-2xl">
                Experienced real estate agent with a proven track record in property sales and client satisfaction.
              </p>
            </div>

            {/* Edit Profile Button */}
            <div className="pt-2">
              <button
                type="button"
                className="bg-[#ECF5FF] hover:bg-[#D9EBFF] text-blue-600 font-semibold text-xs px-5 py-2.5 rounded-lg flex items-center gap-1.5 border border-blue-200/50 cursor-pointer shadow-xs transition-colors"
              >
                <Icon icon="ri:pencil-line" className="w-4 h-4 text-blue-600" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: AGENCY */}
        {activeTab === 'agency' && (
          <div className="space-y-6 w-full">
            {/* Agency info card */}
            <div className="bg-[#F0F4F9]/60 border border-blue-100 rounded-xl p-5 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-5 shadow-xs">
              <div className="space-y-4">
                <div>
                  <span className="block text-[10px] uppercase font-semibold text-[#035096] tracking-wider">Agency Name</span>
                  <p className="text-sm font-semibold text-gray-800 mt-1">Gummaam Real Estate</p>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-semibold text-[#035096] tracking-wider">Address</span>
                  <p className="text-sm font-semibold text-gray-800 mt-1">123 Business Street, Hyderabad</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="block text-[10px] uppercase font-semibold text-[#035096] tracking-wider">Registration Number</span>
                  <p className="text-sm font-semibold text-gray-800 mt-1">REG-2024-12345</p>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-semibold text-[#035096] tracking-wider">Phone</span>
                  <p className="text-sm font-semibold text-gray-800 mt-1">+91 22 1234 5678</p>
                </div>
              </div>
            </div>

            {/* Website input form */}
            <form onSubmit={handleUpdateAgency} className="space-y-4 pt-2">
              <div className="space-y-2">
                <span className="block text-xs font-semibold text-[#0B2C5C] uppercase tracking-wider">Website & Contact</span>
                <label className="block text-xs font-medium text-gray-500">Website</label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-[#035096] text-gray-700 shadow-xs"
                />
              </div>

              <button
                type="submit"
                className="bg-[#035096] hover:bg-[#024076] text-white font-semibold text-xs px-6 py-2.5 rounded-lg cursor-pointer transition-colors shadow-sm"
              >
                Update Agency Info
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: VERIFICATION */}
        {activeTab === 'verification' && (
          <div className="space-y-6">
            
            {/* Verification status cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: Profile Verified */}
              <div className="bg-[#EBF7EE] border border-green-200/50 rounded-xl p-5 shadow-xs flex flex-col justify-between min-h-[90px]">
                <div className="flex items-center gap-2.5 text-[#1E7D32]">
                  <Icon icon="ri:checkbox-circle-line" className="w-5 h-5" />
                  <span className="text-sm font-semibold">Profile Verified</span>
                </div>
                <span className="block text-[10px] text-gray-400 font-medium mt-3">Verified on Dec 15, 2024</span>
              </div>

              {/* Card 2: Pending Approval */}
              <div className="bg-[#FFF8E6] border border-amber-200/40 rounded-xl p-5 shadow-xs flex flex-col justify-between min-h-[90px]">
                <div className="flex items-center gap-2.5 text-[#D97706]">
                  <Icon icon="ri:error-warning-line" className="w-5 h-5" />
                  <span className="text-sm font-semibold">Pending Approval</span>
                </div>
                <span className="block text-[10px] text-gray-400 font-medium mt-3">Awaiting RERA verification</span>
              </div>

              {/* Card 3: Phone Verified */}
              <div className="bg-[#EBF7EE] border border-green-200/50 rounded-xl p-5 shadow-xs flex flex-col justify-between min-h-[90px]">
                <div className="flex items-center gap-2.5 text-[#1E7D32]">
                  <Icon icon="ri:checkbox-circle-line" className="w-5 h-5" />
                  <span className="text-sm font-semibold">Phone Verified</span>
                </div>
                <span className="block text-[10px] text-gray-400 font-medium mt-3">Verified on Dec 10, 2024</span>
              </div>
            </div>

            {/* RERA Details Card */}
            <div className="w-full space-y-3 pt-2">
              <span className="block text-xs font-semibold text-[#0B2C5C] uppercase tracking-wider">RERA Registration Details</span>
              <div className="bg-[#F0F4F9]/60 border border-blue-100 rounded-xl p-5 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-5 shadow-xs">
                <div className="space-y-4">
                  <div>
                    <span className="block text-[10px] uppercase font-semibold text-gray-400">RERA Number</span>
                    <p className="text-sm font-semibold text-gray-800 mt-1">TG-2024-REG-12345</p>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-semibold text-gray-400">Valid Until</span>
                    <p className="text-sm font-semibold text-gray-800 mt-1">2025-12-31</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="block text-[10px] uppercase font-semibold text-gray-400">State</span>
                    <p className="text-sm font-semibold text-gray-800 mt-1">Telangana</p>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-semibold text-gray-400">Status</span>
                    <div className="mt-1">
                      <span className="bg-[#D5F9DF] text-[#1E7D32] border border-green-200/50 px-2.5 py-0.5 rounded text-[10px] font-semibold inline-flex items-center gap-1">
                        <span>✓</span>
                        <span>Verified</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <div className="space-y-3 w-full">
            {/* Toggle row helper */}
            {(Object.keys(notifications) as Array<keyof typeof notifications>).map((key) => {
              let label = '';
              switch(key) {
                case 'email': label = 'Email Notifications'; break;
                case 'sms': label = 'SMS Notifications'; break;
                case 'whatsapp': label = 'WhatsApp Notifications'; break;
                case 'leadAlerts': label = 'Lead Alerts'; break;
                case 'visitReminders': label = 'Visit Reminders'; break;
                case 'paymentAlerts': label = 'Payment Alerts'; break;
                case 'weeklyReport': label = 'Weekly Report'; break;
              }
              const isChecked = notifications[key];
              return (
                <div 
                  key={key} 
                  className="bg-white border border-gray-150 rounded-xl p-4 flex items-center justify-between shadow-xs hover:border-gray-200 transition-colors"
                >
                  <span className="text-xs font-semibold text-gray-700">{label}</span>
                  
                  {/* Switch component */}
                  <button
                    type="button"
                    onClick={() => toggleNotification(key)}
                    className={`relative inline-flex h-5.5 w-10.5 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      isChecked ? 'bg-[#035096]' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        isChecked ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 5: SECURITY */}
        {activeTab === 'security' && (
          <div className="space-y-6 w-full">
            {/* Password section card */}
            <div className="bg-[#F0F4F9]/60 border border-blue-100 rounded-xl p-5 md:p-6 shadow-xs text-left space-y-4">
              <span className="block text-xs font-semibold text-[#035096] uppercase tracking-wider">Password & Security</span>
              <button
                type="button"
                className="bg-[#035096] hover:bg-[#024076] text-white font-semibold text-xs px-5 py-2.5 rounded-lg inline-flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
              >
                <Icon icon="ri:lock-line" className="w-4 h-4" />
                <span>Change Password</span>
              </button>
            </div>

            {/* Active Sessions */}
            <div className="space-y-3 pt-2">
              <span className="block text-xs font-semibold text-[#0B2C5C] uppercase tracking-wider">Active Sessions</span>
              
              <div className="space-y-3">
                {/* Session 1: Desktop */}
                <div className="bg-white border border-gray-150 rounded-xl p-4.5 flex items-center justify-between shadow-xs hover:border-gray-200 transition-colors">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-gray-800">Desktop - Chrome</span>
                    <span className="block text-[10px] text-gray-400 font-medium">Current session • Last active now</span>
                  </div>
                  <span className="bg-[#EBF7EE] text-[#1E7D32] border border-green-200/50 px-2.5 py-0.5 rounded text-[10px] font-semibold select-none">
                    Active
                  </span>
                </div>

                {/* Session 2: Mobile */}
                <div className="bg-white border border-gray-150 rounded-xl p-4.5 flex items-center justify-between shadow-xs hover:border-gray-200 transition-colors">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-gray-800">Mobile - Safari</span>
                    <span className="block text-[10px] text-gray-400 font-medium">Last active 2 hours ago</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert("Signing out from mobile session...")}
                    className="text-[#CC0000] hover:text-red-750 text-xs font-semibold hover:underline cursor-pointer bg-transparent border-0"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="space-y-3 pt-2">
              <span className="block text-xs font-semibold text-[#0B2C5C] uppercase tracking-wider">Two-Factor Authentication</span>
              
              <div className="bg-white border border-gray-150 rounded-xl p-4.5 flex items-center justify-between shadow-xs hover:border-gray-200 transition-colors">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-gray-850">Enable 2FA</span>
                  <span className="block text-[10px] text-gray-400 font-medium">Add an extra layer of security</span>
                </div>
                <button
                  type="button"
                  onClick={() => alert("Enabling two-factor authentication...")}
                  className="bg-white hover:bg-blue-50 border border-blue-600 text-blue-600 font-semibold text-xs px-5 py-2 rounded-lg cursor-pointer shadow-xs transition-colors"
                >
                  Enable
                </button>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};

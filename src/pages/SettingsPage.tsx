import React, { useState } from 'react';
import { X, Pencil, Lock, Upload } from 'lucide-react';

interface ProfileInfo {
  name: string;
  email: string;
  phone: string;
  experience: string;
  aboutMe: string;
}

export const SettingsPage: React.FC = () => {
  // Initial profile data matching mockup exactly
  const [profile, setProfile] = useState<ProfileInfo>({
    name: 'Ravi Kumar',
    email: 'ravi123@gummaam.com',
    phone: '+91 98765 43210',
    experience: '8 years',
    aboutMe: 'Experienced real estate agent with a proven track record in property sales and client satisfaction.'
  });

  // Modal toggle states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Form states
  const [editForm, setEditForm] = useState<ProfileInfo>({ ...profile });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(editForm);
    setShowEditModal(false);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    alert("Password updated successfully!");
    setShowPasswordModal(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* ================= HEADER SECTION ================= */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Profile Settings</h1>
        <p className="text-xs font-medium text-slate-500 mt-1">
          Configure platform-wide settings and administrative options.
        </p>
      </div>

      {/* ================= PROFILE INFO BOARD ================= */}
      <div className="bg-white rounded-[16px] border border-[#dddddd] p-6 space-y-6">
        
        {/* Avatar picture uploader area */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#3B82F6] flex items-center justify-center text-white text-2xl font-bold shrink-0">
            DK
          </div>
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-slate-400">Profile Picture</div>
            <button
              onClick={() => alert("Upload action triggered")}
              className="h-8 px-3 bg-white border border-slate-200 hover:border-slate-350 text-slate-700 text-xs font-semibold rounded-[6px] flex items-center gap-1.5 transition cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Change Photo</span>
            </button>
          </div>
        </div>

        {/* Display attributes grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-xs font-semibold">
          <div>
            <div className="text-slate-400 text-[10px] mb-0.5">Name</div>
            <div className="text-slate-900 font-bold">{profile.name}</div>
          </div>
          <div>
            <div className="text-slate-400 text-[10px] mb-0.5">Email</div>
            <div className="text-slate-900 font-bold">{profile.email}</div>
          </div>
          <div>
            <div className="text-slate-400 text-[10px] mb-0.5">Phone</div>
            <div className="text-slate-900 font-bold">{profile.phone}</div>
          </div>
          <div>
            <div className="text-slate-400 text-[10px] mb-0.5">Experience</div>
            <div className="text-slate-900 font-bold">{profile.experience}</div>
          </div>
          <div className="md:col-span-2">
            <div className="text-slate-400 text-[10px] mb-0.5">About Me</div>
            <div className="text-slate-650 font-medium leading-relaxed max-w-xl">{profile.aboutMe}</div>
          </div>
        </div>

        {/* CTA Button Edit Profile */}
        <div>
          <button
            onClick={() => {
              setEditForm({ ...profile });
              setShowEditModal(true);
            }}
            className="h-9 px-4 bg-[#EAF2FA] hover:bg-[#D3E3F8] text-[#035096] text-xs font-semibold rounded-[6px] flex items-center gap-1.5 transition cursor-pointer"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        </div>

      </div>

      {/* ================= SECURITY BOARD ================= */}
      <div className="bg-[#EDF3FC] border border-[#D5E3F8]/60 rounded-[16px] p-6 space-y-3">
        <div className="text-xs font-bold text-slate-800">Password & Security</div>
        <div>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="h-9 px-4 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[6px] flex items-center gap-1.5 transition cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Change Password</span>
          </button>
        </div>
      </div>

      {/* ================= MODAL: EDIT PROFILE ================= */}
      {showEditModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-[1000] p-4">
          <div className="bg-white w-full max-w-[460px] rounded-[5px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Edit Profile</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="w-8 h-8 rounded-[5px] hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleEditSubmit} className="flex flex-col overflow-hidden">
              <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-600">
                
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter name"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">Phone</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter phone"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                    className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">Experience</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 8 years"
                    value={editForm.experience}
                    onChange={(e) => setEditForm({...editForm, experience: e.target.value})}
                    className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">About Me</label>
                  <textarea
                    rows={4}
                    placeholder="Enter about description"
                    value={editForm.aboutMe}
                    onChange={(e) => setEditForm({...editForm, aboutMe: e.target.value})}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096] resize-none"
                  />
                </div>

              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-100 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-[5px] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-9 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[5px] cursor-pointer"
                >
                  Publish Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: CHANGE PASSWORD ================= */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-[1000] p-4">
          <div className="bg-white w-full max-w-[460px] rounded-[5px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Change Password</h2>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="w-8 h-8 rounded-[5px] hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handlePasswordSubmit} className="flex flex-col overflow-hidden">
              <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-600">
                
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">Current Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Enter current password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                    className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">New Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Enter new password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                    className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Confirm new password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                    className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                  />
                </div>

              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-100 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-[5px] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-9 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[5px] cursor-pointer"
                >
                  Publish Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

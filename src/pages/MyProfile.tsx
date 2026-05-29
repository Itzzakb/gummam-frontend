import React, { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  User as UserIcon,
  Building,
  Heart,
  Inbox,
  Key,
  LogOut,
  Pencil,
  Trash2,
  Plus,
  Check,
  ChevronDown,
  MapPin,
  Calendar
} from 'lucide-react';

// Custom Select Component for high visual fidelity
interface SelectProps {
  label: string;
  required?: boolean;
  value: string;
  options: string[];
  onChange: (val: string) => void;
  placeholder?: string;
}

const CustomSelect: React.FC<SelectProps> = ({ label, required, value, options, onChange, placeholder = "Select" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex flex-col w-full" ref={dropdownRef}>
      <label className="text-sm font-medium text-black mb-1.5 flex items-center gap-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-11 px-4 border border-gray-300 rounded-[10px] bg-white flex items-center justify-between text-sm font-regular text-left focus:outline-none focus:border-[#035096] focus:ring-1 focus:ring-[#035096] transition-all"
      >
        <span className={value ? 'text-black' : 'text-gray-400'}>
          {value || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-[10px] shadow-lg max-h-60 overflow-y-auto z-50 py-1">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2.5 text-left text-sm font-regular text-black hover:bg-slate-50 flex items-center justify-between transition-colors"
            >
              <span>{option}</span>
              {value === option && <Check className="w-4 h-4 text-[#035096]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const MyProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Tabs State
  const [activeTab, setActiveTab] = useState<'profile' | 'properties' | 'interest' | 'buyer' | 'password'>('profile');

  // Toast Notification State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // 1. Profile Information State
  const [name, setName] = useState(user?.name || 'Praveen XYZ');
  const [userRole, setUserRole] = useState('Agent'); // "I am"
  const [email, setEmail] = useState(user?.email || 'Praveen XYZ@gmail.com');
  const [phone, setPhone] = useState('9876543210');
  const [companyName, setCompanyName] = useState('XYZ Developers');
  const [experience, setExperience] = useState('8 Years');
  const [district, setDistrict] = useState('Hyderabad');
  const [mandal, setMandal] = useState('Gachibowli');
  const [city, setCity] = useState('Hyderabad');
  const [sectorDeals, setSectorDeals] = useState('Rent/lease, Pre-Launch, Resale...');
  const [aboutCompany, setAboutCompany] = useState(
    'XYZ Developers is a trusted real estate company specializing in premium residential properties. With a focus on quality and customer satisfaction.'
  );
  const [avatar, setAvatar] = useState(user?.avatarUrl || '/images/profile_avatar.png');

  // Company Images state
  const [companyImages, setCompanyImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=300&h=200&q=80',
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=300&h=200&q=80',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=300&h=200&q=80'
  ]);

  // File Inputs
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // 2. Change Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 3. Mock Properties
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: 'Premium 3BHK Villa',
      location: 'Kokapet, Hyderabad',
      price: '₹ 3.50 Cr',
      type: 'Sale',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80'
    },
    {
      id: 2,
      title: 'Modern Commercial Office',
      location: 'Hitech City, Hyderabad',
      price: '₹ 1.2 Lakhs/mo',
      type: 'Rent',
      status: 'Pending Approval',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80'
    }
  ]);

  // 4. Mock Interests
  const [interests] = useState([
    {
      id: 1,
      title: '250 Sq. Yds. Open Plot',
      location: 'Shadnagar, Hyderabad',
      price: '₹ 35 Lakhs',
      status: 'Interested',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80'
    }
  ]);

  // 5. Mock Buyer Queries
  const [buyerQueries, setBuyerQueries] = useState([
    {
      id: 1,
      buyerName: 'Amit Sharma',
      property: 'Premium 3BHK Villa',
      date: '2026-05-25',
      message: 'Hi, I am interested in your property in Kokapet. Can we arrange a site visit?',
      status: 'Unread'
    },
    {
      id: 2,
      buyerName: 'Sarah Khan',
      property: 'Modern Commercial Office',
      date: '2026-05-24',
      message: 'Is the pricing negotiable? I would like to move in by next month.',
      status: 'Replied'
    }
  ]);

  // Handle Form Saves
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !city || !district || !mandal) {
      showToast('Please fill out all required fields', 'error');
      return;
    }
    // Update local storage representation
    const updatedUser = { ...user, name, email, avatarUrl: avatar };
    localStorage.setItem('gummam_user', JSON.stringify(updatedUser));

    // In a fully integrated setup we would update context, let's trigger a page reload or state change alert
    showToast('Profile information updated successfully!');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast('All password fields are required', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }
    showToast('Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          const resultStr = uploadEvent.target.result as string;
          setAvatar(resultStr);
          const updatedUser = { ...user, name, email, avatarUrl: resultStr };
          localStorage.setItem('gummam_user', JSON.stringify(updatedUser));
          showToast('Profile picture updated!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCompanyImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setCompanyImages([...companyImages, uploadEvent.target.result as string]);
          showToast('Company image added successfully!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteCompanyImage = (indexToDelete: number) => {
    setCompanyImages(companyImages.filter((_, idx) => idx !== indexToDelete));
    showToast('Company image removed.');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // District - Mandal Mappings
  const districtMandals: { [key: string]: string[] } = {
    'Hyderabad': ['Ameerpet', 'Secunderabad', 'Khairatabad', 'Charminar', 'Gachibowli', 'Madhapur'],
    'Medchal-Malkajgiri': ['Malkajgiri', 'Alwal', 'Kukatpally', 'Quthbullapur', 'Medchal'],
    'Rangareddy': ['Rajendranagar', 'Serilingampally', 'Saroornagar', 'Ibrahimpatnam'],
    'Sangareddy': ['Sangareddy', 'Patancheru', 'Ramachandrapuram', 'Zaheerabad'],
    'Warangal': ['Hanamkonda', 'Warangal', 'Kazipet']
  };

  const districtList = Object.keys(districtMandals);
  const mandalList = districtMandals[district] || [];

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 px-4 sm:px-6 lg:px-8 font-poppins relative">

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-8 right-8 z-50 flex items-center gap-3 px-6 py-3.5 rounded-xl shadow-lg border transition-all duration-300 transform translate-y-0 ${toast.type === 'success'
          ? 'bg-[#EBFDF5] border-[#A7F3D0] text-[#065F46]'
          : 'bg-[#FEF2F2] border-[#FCA5A5] text-[#991B1B]'
          }`}>
          <div className={`w-2 h-2 rounded-full ${toast.type === 'success' ? 'bg-[#10B981]' : 'bg-[#EF4444]'}`}></div>
          <span className="text-sm font-semibold">{toast.message}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-start">

        {/* ================= LEFT SIDEBAR CARD ================= */}
        <div className="w-full md:w-80 bg-white rounded-[10px] border border-gray-200 overflow-hidden shadow-sm sticky top-6">
          {/* Header Banner Background */}
          <div className="relative h-32 w-full bg-[#E5E9F0]">
            <img
              src="/images/profile_banner.png"
              alt="Building banner"
              className="w-full h-full object-cover"
            />
            {/* Avatar overlapping bottom of banner */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
              <div className="relative w-[100px] h-[100px] rounded-full border-[3.5px] border-white shadow-md overflow-hidden bg-slate-100">
                <img
                  src={avatar}
                  alt="Profile Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Pencil Edit Icon */}
              <button
                type="button"
                onClick={() => avatarInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
                title="Edit avatar"
              >
                <Pencil className="w-3.5 h-3.5 text-gray-700" />
              </button>
              <input
                type="file"
                ref={avatarInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>
          </div>

          {/* Name Section */}
          <div className="pt-16 pb-5 text-center border-b border-slate-100">
            <h2 className="text-xl font-bold text-[#0B2C5C] leading-snug">{name}</h2>
          </div>

          {/* Sidebar Menu Items */}
          <nav className="p-4 space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3.5 px-4.5 py-3 rounded-[12px] text-left transition-all font-regular text-sm ${activeTab === 'profile'
                ? 'bg-[#EBF3FC] text-[#035096]'
                : 'text-[#7c7c7c] hover:bg-slate-50 hover:text-slate-800'
                }`}
            >
              <UserIcon className="w-5 h-5" />
              My Profile
            </button>

            <button
              onClick={() => setActiveTab('properties')}
              className={`w-full flex items-center gap-3.5 px-4.5 py-3 rounded-[12px] text-left transition-all font-regular text-sm ${activeTab === 'properties'
                ? 'bg-[#EBF3FC] text-[#035096]'
                : 'text-[#7c7c7c] hover:bg-slate-50 hover:text-slate-800'
                }`}
            >
              <Building className="w-5 h-5" />
              My Properties
            </button>

            <button
              onClick={() => setActiveTab('interest')}
              className={`w-full flex items-center gap-3.5 px-4.5 py-3 rounded-[12px] text-left transition-all font-regular text-sm ${activeTab === 'interest'
                ? 'bg-[#EBF3FC] text-[#035096]'
                : 'text-[#7c7c7c] hover:bg-slate-50 hover:text-slate-800'
                }`}
            >
              <Heart className="w-5 h-5" />
              My Interest
            </button>

            <button
              onClick={() => setActiveTab('buyer')}
              className={`w-full flex items-center gap-3.5 px-4.5 py-3 rounded-[12px] text-left transition-all font-regular text-sm ${activeTab === 'buyer'
                ? 'bg-[#EBF3FC] text-[#035096]'
                : 'text-[#7c7c7c] hover:bg-slate-50 hover:text-slate-800'
                }`}
            >
              <Inbox className="w-5 h-5" />
              Buyer’s Response
            </button>

            <button
              onClick={() => setActiveTab('password')}
              className={`w-full flex items-center gap-3.5 px-4.5 py-3 rounded-[12px] text-left transition-all font-regular text-sm ${activeTab === 'password'
                ? 'bg-[#EBF3FC] text-[#035096]'
                : 'text-[#7c7c7c] hover:bg-slate-50 hover:text-slate-800'
                }`}
            >
              <Key className="w-5 h-5" />
              Change Password
            </button>


            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3.5 px-4.5 py-3 rounded-[12px] text-left transition-all font-regular text-sm text-[#7c7c7c] hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="w-5 h-5" />
              Log out
            </button>
          </nav>
        </div>


        {/* ================= RIGHT MAIN CONTENT CARD ================= */}
        <div className="flex-1 w-full bg-white rounded-[10px] border border-gray-200 shadow-sm overflow-hidden min-h-[600px]">

          {/* Active Tab Panel Rendering */}

          {/* TAB 1: PROFILE FORM */}
          {activeTab === 'profile' && (
            <div>
              {/* Header */}
              <div className="flex items-center gap-4 p-6 sm:p-8">
                <img src="/icons/solar_user-broken.png" alt="user" style={{ height: '30px', width: '30px' }} />
                <div>
                  <h1 className="text-xl font-semibold text-[#000000] font-poppins">Profile information</h1>
                  <p className="text-sm font-regular text-gray-400 mt-0.5">Manage your personal and company details</p>
                </div>
              </div>
              <div className='bg-[#ececec] h-[1px] mx-[25px]'></div>

              {/* Form */}
              <form onSubmit={handleSaveProfile} className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                  {/* Name */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-black mb-1.5 flex items-center gap-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter name"
                      className="w-full h-11 px-4 border border-gray-300 rounded-[10px] bg-white focus:outline-none focus:border-[#035096] focus:ring-1 focus:ring-[#035096] transition-colors placeholder:text-gray-400 text-sm font-regular"
                      required
                    />
                  </div>

                  {/* I am */}
                  <CustomSelect
                    label="I am"
                    required
                    value={userRole}
                    options={['Agent', 'Builder', 'Individual Owner', 'Promoter']}
                    onChange={(val) => setUserRole(val)}
                  />

                  {/* Email */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-black mb-1.5 flex items-center gap-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                      className="w-full h-11 px-4 border border-gray-300 rounded-[10px] bg-white focus:outline-none focus:border-[#035096] focus:ring-1 focus:ring-[#035096] transition-colors placeholder:text-gray-400 text-sm font-regular"
                      required
                    />
                  </div>

                  {/* Phone no */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-black mb-1.5 flex items-center gap-1">
                      Phone no. <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter phone number"
                      className="w-full h-11 px-4 border border-gray-300 rounded-[10px] bg-white focus:outline-none focus:border-[#035096] focus:ring-1 focus:ring-[#035096] transition-colors placeholder:text-gray-400 text-sm font-regular"
                      required
                    />
                  </div>

                  {/* Company Name */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-black mb-1.5">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Enter company name"
                      className="w-full h-11 px-4 border border-gray-300 rounded-[10px] bg-white focus:outline-none focus:border-[#035096] focus:ring-1 focus:ring-[#035096] transition-colors placeholder:text-gray-400 text-sm font-regular"
                    />
                  </div>

                  {/* Experience */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-black mb-1.5">
                      Experience
                    </label>
                    <input
                      type="text"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="e.g. 8 Years"
                      className="w-full h-11 px-4 border border-gray-300 rounded-[10px] bg-white focus:outline-none focus:border-[#035096] focus:ring-1 focus:ring-[#035096] transition-colors placeholder:text-gray-400 text-sm font-regular"
                    />
                  </div>

                  {/* District */}
                  <CustomSelect
                    label="District"
                    required
                    value={district}
                    options={districtList}
                    onChange={(val) => {
                      setDistrict(val);
                      // Auto pick first mandal of new district
                      if (districtMandals[val] && districtMandals[val].length > 0) {
                        setMandal(districtMandals[val][0]);
                      } else {
                        setMandal('');
                      }
                    }}
                  />

                  {/* Mandal */}
                  <CustomSelect
                    label="Mandal"
                    required
                    value={mandal}
                    options={mandalList}
                    onChange={(val) => setMandal(val)}
                  />

                  {/* City */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-black mb-1.5 flex items-center gap-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Enter city"
                      className="w-full h-11 px-4 border border-gray-300 rounded-[10px] bg-white focus:outline-none focus:border-[#035096] focus:ring-1 focus:ring-[#035096] transition-colors placeholder:text-gray-400 text-sm font-regular"
                      required
                    />
                  </div>

                  {/* Sector Deals In */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-black mb-1.5">
                      Sector Deals In
                    </label>
                    <input
                      type="text"
                      value={sectorDeals}
                      onChange={(e) => setSectorDeals(e.target.value)}
                      placeholder="e.g. Rent/lease, Pre-Launch, Resale..."
                      className="w-full h-11 px-4 border border-gray-300 rounded-[10px] bg-white focus:outline-none focus:border-[#035096] focus:ring-1 focus:ring-[#035096] transition-colors placeholder:text-gray-400 text-sm font-regular"
                    />
                  </div>

                  {/* About Company */}
                  <div className="flex flex-col md:col-span-2">
                    <label className="text-sm font-medium text-black mb-1.5">
                      About Company
                    </label>
                    <textarea
                      value={aboutCompany}
                      onChange={(e) => setAboutCompany(e.target.value)}
                      placeholder="Write details about your company..."
                      className="w-full min-h-[100px] px-4 py-3 border border-gray-300 rounded-[10px] bg-white focus:outline-none focus:border-[#035096] focus:ring-1 focus:ring-[#035096] transition-colors placeholder:text-gray-400 text-sm font-regular resize-none leading-relaxed"
                    />
                  </div>
                </div>

                {/* Company Images */}
                <div className="space-y-2 pt-2">
                  <span className="text-sm font-medium text-black block">Company Images</span>
                  <div className="flex flex-wrap items-center gap-4">
                    {companyImages.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative w-50 h-38 rounded-xl overflow-hidden group shadow-sm border border-slate-100"
                      >
                        <img src={img} alt="Company gallery preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleDeleteCompanyImage(idx)}
                          className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                          title="Delete image"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}

                    {/* Add Image Button Box */}
                    <button
                      type="button"
                      onClick={() => imageInputRef.current?.click()}
                      className="w-50 h-38 rounded-xl border-2 border-dashed border-[#035096]/30 bg-[#EBF3FC]/50 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:bg-[#EBF3FC] transition-colors"
                    >
                      <img src="/icons/gallery-add-img.png" alt="add" className='w-18 h-18' />
                    </button>
                    <input
                      type="file"
                      ref={imageInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleCompanyImageAdd}
                    />
                  </div>
                </div>

                {/* Save Changes button */}
                <div className="flex justify-end pt-4 border-t border-slate-100 mt-4">
                  <button
                    type="submit"
                    className="bg-[#035096] hover:bg-[#024078] text-white px-7 py-3 rounded-[10px] font-semibold text-sm transition-all duration-200 shadow-sm shadow-[#035096]/20 cursor-pointer active:translate-y-px"
                  >
                    Save Change
                  </button>
                </div>
              </form>
            </div>
          )}


          {/* TAB 2: MY PROPERTIES */}
          {activeTab === 'properties' && (
            <div>
              {/* Header */}
              <div className="flex items-center justify-between p-6 sm:p-8 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="bg-[#EBF3FC] text-[#035096] p-3 rounded-full">
                    <Building className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-[#0B2C5C] font-poppins">My Properties</h1>
                    <p className="text-sm font-medium text-gray-400 mt-0.5">Manage and track your listed properties</p>
                  </div>
                </div>
                <button
                  onClick={() => showToast("Property creation dialog is not linked in this prototype.", "error")}
                  className="bg-[#035096] hover:bg-[#024078] text-white px-5 py-2.5 rounded-[10px] font-bold text-xs.5 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Property
                </button>
              </div>

              {/* Property list */}
              <div className="p-6 sm:p-8 space-y-4">
                {properties.map((prop) => (
                  <div key={prop.id} className="flex flex-col sm:flex-row gap-5 p-4 border border-slate-100 rounded-2xl bg-white hover:shadow-sm transition-shadow">
                    <img
                      src={prop.image}
                      alt={prop.title}
                      className="w-full sm:w-36 h-28 object-cover rounded-xl shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-bold text-base text-[#0B2C5C]">{prop.title}</h3>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${prop.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            : 'bg-amber-50 text-amber-700 border border-amber-100'
                            }`}>
                            {prop.status}
                          </span>
                        </div>
                        <p className="text-xs.5 text-gray-400 font-semibold flex items-center gap-1 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" /> {prop.location}
                        </p>
                      </div>

                      <div className="flex items-end justify-between mt-3">
                        <span className="text-base font-bold text-[#F6931D]">{prop.price}</span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => showToast("Editing property details...")}
                            className="text-xs.5 font-bold text-slate-600 hover:text-[#035096] transition-colors"
                          >
                            Edit
                          </button>
                          <span className="text-slate-200">|</span>
                          <button
                            onClick={() => {
                              setProperties(properties.filter(p => p.id !== prop.id));
                              showToast("Property listing deleted.");
                            }}
                            className="text-xs.5 font-bold text-red-500 hover:text-red-700 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}


          {/* TAB 3: MY INTERESTS */}
          {activeTab === 'interest' && (
            <div>
              {/* Header */}
              <div className="flex items-center gap-4 p-6 sm:p-8 border-b border-slate-100">
                <div className="bg-[#EBF3FC] text-[#035096] p-3 rounded-full">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#0B2C5C] font-poppins">My Interests</h1>
                  <p className="text-sm font-medium text-gray-400 mt-0.5">Properties you marked interest in</p>
                </div>
              </div>

              {/* Interest List */}
              <div className="p-6 sm:p-8 space-y-4">
                {interests.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-5 p-4 border border-slate-100 rounded-2xl bg-white hover:shadow-sm transition-shadow">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full sm:w-36 h-28 object-cover rounded-xl shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-base text-[#0B2C5C]">{item.title}</h3>
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#EBF3FC] text-[#035096] border border-[#035096]/10">
                            {item.status}
                          </span>
                        </div>
                        <p className="text-xs.5 text-gray-400 font-semibold flex items-center gap-1 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" /> {item.location}
                        </p>
                      </div>

                      <div className="flex items-end justify-between mt-3">
                        <span className="text-base font-bold text-[#F6931D]">{item.price}</span>
                        <button
                          onClick={() => showToast("Opening agent communication...")}
                          className="bg-[#035096] hover:bg-[#024078] text-white px-4 py-2 rounded-lg font-bold text-xs.5 transition-colors cursor-pointer"
                        >
                          Contact Builder
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}


          {/* TAB 4: BUYER'S RESPONSE */}
          {activeTab === 'buyer' && (
            <div>
              {/* Header */}
              <div className="flex items-center gap-4 p-6 sm:p-8 border-b border-slate-100">
                <div className="bg-[#EBF3FC] text-[#035096] p-3 rounded-full">
                  <Inbox className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#0B2C5C] font-poppins">Buyer's Responses</h1>
                  <p className="text-sm font-medium text-gray-400 mt-0.5">Inbox for client leads and inquires</p>
                </div>
              </div>

              {/* Inbox Table / Cards */}
              <div className="p-6 sm:p-8 space-y-4">
                {buyerQueries.map((query) => (
                  <div
                    key={query.id}
                    className={`p-5 border rounded-2xl transition-all relative ${query.status === 'Unread'
                      ? 'border-[#035096]/20 bg-slate-50/50 shadow-sm'
                      : 'border-slate-100 bg-white'
                      }`}
                  >
                    {query.status === 'Unread' && (
                      <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-[#035096]" title="New inquiry"></div>
                    )}
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-sm text-[#0B2C5C]">{query.buyerName}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-gray-400 font-semibold flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {query.date}
                      </span>
                    </div>

                    <div className="mt-2.5">
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                        Prop: {query.property}
                      </span>
                      <p className="text-sm text-gray-600 mt-2 font-medium leading-relaxed">{query.message}</p>
                    </div>

                    <div className="flex gap-3 justify-end mt-4 pt-3.5 border-t border-slate-100/50">
                      {query.status === 'Unread' && (
                        <button
                          onClick={() => {
                            setBuyerQueries(buyerQueries.map(q => q.id === query.id ? { ...q, status: 'Replied' } : q));
                            showToast("Marked as read.");
                          }}
                          className="px-4 py-2 border border-[#035096]/20 hover:bg-[#EBF3FC]/50 text-[#035096] rounded-lg font-bold text-xs.5 transition-colors cursor-pointer"
                        >
                          Mark Read
                        </button>
                      )}
                      <button
                        onClick={() => showToast("Opening reply dialogue...")}
                        className="px-4 py-2 bg-[#035096] hover:bg-[#024078] text-white rounded-lg font-bold text-xs.5 transition-colors cursor-pointer"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}


          {/* TAB 5: CHANGE PASSWORD */}
          {activeTab === 'password' && (
            <div>
              {/* Header */}
              <div className="flex items-center gap-4 p-6 sm:p-8 border-b border-slate-100">
                <div className="bg-[#EBF3FC] text-[#035096] p-3 rounded-full">
                  <Key className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#0B2C5C] font-poppins">Change Password</h1>
                  <p className="text-sm font-medium text-gray-400 mt-0.5">Secure your account with a strong password</p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleUpdatePassword} className="p-6 sm:p-8 max-w-lg space-y-5">
                {/* Current Password */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-black mb-1.5 flex items-center gap-1">
                    Current Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full h-11 px-4 border border-gray-300 rounded-[10px] bg-white focus:outline-none focus:border-[#035096] focus:ring-1 focus:ring-[#035096] transition-colors placeholder:text-gray-400 text-sm font-regular"
                    required
                  />
                </div>

                {/* New Password */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-black mb-1.5 flex items-center gap-1">
                    New Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full h-11 px-4 border border-gray-300 rounded-[10px] bg-white focus:outline-none focus:border-[#035096] focus:ring-1 focus:ring-[#035096] transition-colors placeholder:text-gray-400 text-sm font-regular"
                    required
                  />
                </div>

                {/* Confirm New Password */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-black mb-1.5 flex items-center gap-1">
                    Confirm New Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full h-11 px-4 border border-gray-300 rounded-[10px] bg-white focus:outline-none focus:border-[#035096] focus:ring-1 focus:ring-[#035096] transition-colors placeholder:text-gray-400 text-sm font-regular"
                    required
                  />
                </div>

                {/* Update Password button */}
                <div className="flex justify-end pt-4 border-t border-slate-100 mt-4">
                  <button
                    type="submit"
                    className="bg-[#035096] hover:bg-[#024078] text-white px-7 py-3 rounded-[10px] font-bold text-sm transition-all duration-200 shadow-sm shadow-[#035096]/20 cursor-pointer active:translate-y-px"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

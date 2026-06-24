import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronRight, Heart, Share2, 
  Calendar, Building2, Users, Key
} from 'lucide-react';
import { NewLaunch } from '../features/landing/NewLaunch';
import { SearchPropertyCard } from '../components/ui/SearchPropertyCard';

// Mock detailed agent database mapping url slug to properties details
const agentDatabase: { [key: string]: any } = {
  'vinod-reddy': {
    name: 'Vinod Reddy',
    agency: 'V R Home & Property',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    experience: '5+ Yrs',
    ageSize: 11,
    properties: 57,
    rentLease: 8,
    teamSize: 12
  },
  'sravanthi-rao': {
    name: 'Sravanthi Rao',
    agency: 'Rao Real Estate',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    experience: '4+ Yrs',
    ageSize: 8,
    properties: 42,
    rentLease: 10,
    teamSize: 9
  },
  'anil-kumar': {
    name: 'Anil Kumar',
    agency: 'Apex Housing Solutions',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    experience: '7+ Yrs',
    ageSize: 15,
    properties: 68,
    rentLease: 12,
    teamSize: 18
  }
};

const mockListings = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    title: 'Office Space For Rent In Dilsukhnagar',
    location: 'Apartment/Flat Sunny, Dilsukhnagar, Hyderabad',
    price: '₹ 12,000',
    type: 'For Rent',
    beds: 5,
    baths: 5,
    sqft: 1850,
    description: 'Builder floor Apartment is available For Rent. in A Good Location. Please Contact For More Details.',
    updatedAt: '6 day ago'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
    title: '3 BHK Premium Apartment For Sale In Madhapur',
    location: 'Sree Homes, Madhapur, Hyderabad',
    price: '₹ 1.65 Cr.',
    type: 'For Sale',
    beds: 3,
    baths: 3,
    sqft: 2200,
    description: 'Beautiful 3 BHK flat with modern amenities, prime location near IT Hub, fully gated community with parking.',
    updatedAt: '6 day ago'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
    title: 'Luxury Villa For Rent In Jubilee Hills',
    location: 'Jubilee Enclave, Jubilee Hills, Hyderabad',
    price: '₹ 85,000',
    type: 'For Rent',
    beds: 4,
    baths: 4,
    sqft: 3800,
    description: 'Fully furnished luxury villa with private lawn, power backup, servant quarters, top-notch security.',
    updatedAt: '6 day ago'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&q=80',
    title: 'Commercial Retail Shop For Rent In Kothapet',
    location: 'Sai Plaza, Kothapet, Hyderabad',
    price: '₹ 22,000',
    type: 'For Rent',
    beds: 1,
    baths: 1,
    sqft: 950,
    description: 'Main road facing commercial shop ideal for showrooms, clinics, salons, or offices. Heavy footfall area.',
    updatedAt: '6 day ago'
  }
];

export const AgentProperties: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [activeTab, setActiveTab] = useState<'all' | 'sale' | 'rent'>('all');
  const [isFavorite, setIsFavorite] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [contactSuccess, setContactSuccess] = useState(false);

  // Retrieve current agent profile or fallback to Vinod Reddy
  const currentKey = name ? name.toLowerCase() : 'vinod-reddy';
  const agent = agentDatabase[currentKey] || {
    name: name ? name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Vinod Reddy',
    agency: 'V R Home & Property',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    experience: '5+ Yrs',
    ageSize: 11,
    properties: 57,
    rentLease: 8,
    teamSize: 12
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setFormData({ name: '', phone: '', email: '', message: '' });
    }, 3000);
  };

  const filteredProperties = mockListings.filter(prop => {
    if (activeTab === 'all') return true;
    const isRentTab = activeTab === 'rent';
    const isPropRent = prop.type.toLowerCase().includes('rent');
    return isRentTab ? isPropRent : !isPropRent;
  });

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-20 font-poppins">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-[13px] text-gray-500 mb-6">
          <Link to="/" className="hover:text-gray-900 cursor-pointer">Home</Link>
          <ChevronRight className="w-4 h-4 mx-1" />
          <Link to="/agents" className="hover:text-gray-900 cursor-pointer">Agent</Link>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-gray-900 font-medium">{agent.name}</span>
        </div>

        {/* Profile Header Block */}
        <div className="bg-white rounded-[16px] border border-gray-200/60 p-6 mb-8 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar Image */}
          <div className="w-[110px] h-[110px] rounded-full overflow-hidden border-[3px] border-white shadow-md bg-gray-100 flex-shrink-0 relative">
            <img 
              src={agent.image} 
              alt={agent.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details Row */}
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-[26px] font-bold text-[#0B2C5C] font-merriweather">{agent.name}</h1>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-[#10B981] bg-[#E1FBF2] px-2 py-1 rounded-full border border-[#10B981] shrink-0">
                  <img
                    src="/icons/verified.png"
                    alt="Verified"
                    className="w-3.5 h-3.5 object-contain"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  Verified
                </span>
              </div>

              {/* Top Right Actions */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  title="Favorite agent"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
                </button>
                <button 
                  className="text-gray-400 hover:text-[#00478F] transition-colors p-1"
                  title="Share profile"
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <p className="text-[15px] text-[#00478F] font-semibold mb-6">{agent.agency}</p>
            
            {/* Stats list - exact match with screenshot */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-[13px] border-t border-gray-100 pt-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-[18px] h-[18px] text-gray-400" />
                <span className="text-gray-500">Experience:</span>
                <span className="font-bold text-[#00478F]">{agent.experience}</span>
              </div>
              
              <div className="w-px h-4 bg-gray-200 hidden sm:block"></div>

              <div className="flex items-center gap-2">
                <Users className="w-[18px] h-[18px] text-gray-400" />
                <span className="text-gray-500">Age size:</span>
                <span className="font-bold text-[#00478F]">{agent.ageSize}</span>
              </div>

              <div className="w-px h-4 bg-gray-200 hidden sm:block"></div>

              <div className="flex items-center gap-2">
                <Building2 className="w-[18px] h-[18px] text-gray-400" />
                <span className="text-gray-500">Properties:</span>
                <span className="font-bold text-[#00478F]">{agent.properties}</span>
              </div>

              <div className="w-px h-4 bg-gray-200 hidden sm:block"></div>

              <div className="flex items-center gap-2">
                <Key className="w-[18px] h-[18px] text-gray-400" />
                <span className="text-gray-500">Rent/Lease:</span>
                <span className="font-bold text-[#00478F]">{agent.rentLease < 10 ? `0${agent.rentLease}` : agent.rentLease}</span>
              </div>

              <div className="w-px h-4 bg-gray-200 hidden sm:block"></div>

              <div className="flex items-center gap-2">
                <Users className="w-[18px] h-[18px] text-gray-400" />
                <span className="text-gray-500">Team size:</span>
                <span className="font-bold text-[#00478F]">{agent.teamSize}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Main Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left properties column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Filter tab bar */}
            <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-2">
              <div className="flex gap-6">
                {(['all', 'sale', 'rent'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-[14px] font-bold pb-2 transition-all relative ${
                      activeTab === tab ? 'text-[#00478F]' : 'text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    {tab === 'all' ? 'All' : tab === 'sale' ? 'For Sale' : 'For Rent'}
                    {activeTab === tab && (
                      <span className="absolute bottom-[-1px] left-0 right-0 h-[2.5px] bg-[#00478F] rounded-full"></span>
                    )}
                  </button>
                ))}
              </div>

              <Link 
                to="/search" 
                className="text-[#0B2C5C] font-semibold text-[13px] underline hover:text-[#4885FF]"
              >
                See all Properties
              </Link>
            </div>

            {/* Properties List - Using SearchPropertyCard */}
            {filteredProperties.length > 0 ? (
              <div className="space-y-6">
                {filteredProperties.map((prop) => (
                  <SearchPropertyCard key={prop.id} {...prop} viewType="list" />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-200/60">
                No listings found matching this type.
              </div>
            )}

          </div>

          {/* Right Contact form sticky sidebar */}
          <div className="rounded-[16px] border border-gray-200/60 p-6 shadow-sm bg-white sticky top-6">
            <h2 className="text-[18px] font-bold text-[#0B2C5C] mb-4 font-merriweather">Contact</h2>
            
            {contactSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 rounded-lg text-[12px] font-semibold border border-emerald-100">
                Message sent successfully! The agent will contact you soon.
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-3.5">
              <div>
                <input 
                  type="text" 
                  placeholder="Name" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#035096] transition-colors placeholder:text-gray-400" 
                />
              </div>
              <div>
                <input 
                  type="tel" 
                  placeholder="Phone" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#035096] transition-colors placeholder:text-gray-400" 
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#035096] transition-colors placeholder:text-gray-400" 
                />
              </div>
              <div>
                <textarea 
                  placeholder="Message" 
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#035096] transition-colors resize-none placeholder:text-gray-400"
                ></textarea>
              </div>
              
              <div className="flex gap-2 pt-1">
                <a 
                  href="tel:+919988776655" 
                  className="flex-1 py-2.5 border border-[#00478F] text-[#00478F] rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors text-center inline-block"
                >
                  Call Now
                </a>
                <button 
                  type="submit" 
                  className="flex-1 py-2.5 bg-[#00478F] text-white rounded-lg text-[13px] font-semibold hover:bg-blue-900 transition-colors shadow-sm"
                >
                  Message
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>

      {/* New Launch Section */}
      <div className="border-t border-gray-200/50 mt-16 pt-12">
        <NewLaunch />
      </div>

    </div>
  );
};

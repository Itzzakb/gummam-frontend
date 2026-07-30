import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronRight, MapPin, Heart, Share2, 
  Calendar, Building2, Users, Home, Key, 
  BedDouble, Bath, Maximize, User
} from 'lucide-react';
import { NewLaunch } from '../features/landing/NewLaunch';

// Mock detailed agent data
const agentDatabase: { [key: string]: any } = {
  'vinod-reddy': {
    name: 'Vinod Reddy',
    agency: 'V R Home & Property',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    operatingSince: 2018,
    experience: '5+ Yrs',
    properties: 57,
    teamSize: '12 people',
    forSale: 11,
    rentLease: 8,
    about: "Vinod Reddy was founded in 2018. In the dynamic world of real estate, we specialize in helping clients buy, sell, and rent properties in India. And also interior design through our sister concern company, 'Urban Space' Interior Design. Under our overall experience, professional approach, and providing the highest level of service and support to our clients, helping them navigate the complex world of real estate with ease.",
    address: "Plot No 123, DRS Tower, MOTI NAGAR, opposite to Dr. YS. Varaprasad, Moti Nagar, Hyderabad.",
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18efc2297?w=600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80'
    ]
  },
  'sravanthi-rao': {
    name: 'Sravanthi Rao',
    agency: 'Rao Real Estate',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    operatingSince: 2019,
    experience: '4+ Yrs',
    properties: 42,
    teamSize: '8 people',
    forSale: 15,
    rentLease: 10,
    about: "Sravanthi Rao established Rao Real Estate with a mission to simplify the home acquisition process in Hyderabad's premier zones. We provide end-to-end guidance from property viewing through final legal documentation.",
    address: "Level 4, Zenith Towers, Hitech City, Hyderabad.",
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18efc2297?w=600&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80'
    ]
  }
};

// Generic mock properties representing Vinod's listings
const mockProperties = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
    tagLabel: 'For Rent',
    ownerName: 'Praveen Kumar',
    title: 'Townhouse For Rent In Ready Nager Main Road, Hyderabad',
    location: 'Hyderabad, Uppal',
    beds: 3,
    baths: 2,
    sqft: 122280,
    description: 'Builder Floor Apartment Is Available For Sale. It Is A Good Location Property. Please Contact For More Details.',
    price: '₹ 12,999',
    type: 'rent'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
    tagLabel: 'For Sale',
    ownerName: 'Praveen Kumar',
    title: 'Townhouse For Rent In Ready Nager Main Road, Hyderabad',
    location: 'Hyderabad, Uppal',
    beds: 3,
    baths: 2,
    sqft: 122280,
    description: 'Builder Floor Apartment Is Available For Sale. It Is A Good Location Property. Please Contact For More Details.',
    price: '₹ 1.72 Cr.',
    type: 'sale'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    tagLabel: 'For Rent',
    ownerName: 'Praveen Kumar',
    title: 'Townhouse For Rent In Ready Nager Main Road, Hyderabad',
    location: 'Hyderabad, Uppal',
    beds: 3,
    baths: 2,
    sqft: 122280,
    description: 'Builder Floor Apartment Is Available For Sale. It Is A Good Location Property. Please Contact For More Details.',
    price: '₹ 12,999',
    type: 'rent'
  }
];

export const AgentDetails: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [activeTab, setActiveTab] = useState<'all' | 'sale' | 'rent'>('all');
  const [isFavorite, setIsFavorite] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [contactSuccess, setContactSuccess] = useState(false);

  // Retrieve current agent profile or fallback to Vinod Reddy
  const currentKey = name ? name.toLowerCase() : 'vinod-reddy';
  const agent = agentDatabase[currentKey] || agentDatabase['vinod-reddy'];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setFormData({ name: '', phone: '', email: '', message: '' });
    }, 3000);
  };

  const filteredProperties = mockProperties.filter(prop => {
    if (activeTab === 'all') return true;
    return prop.type === activeTab;
  });

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-20 font-poppins">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Breadcrumb */}
        <div className="flex items-center text-[14px] text-gray-500 mb-6">
          <Link to="/" className="text-gray-900 hover:underline cursor-pointer font-medium">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          <Link to="/agents" className="text-gray-900 hover:underline cursor-pointer font-medium">Agent</Link>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          <span className="text-gray-400 font-normal">{agent.name}</span>
        </div>

        {/* Main Agent Info & Contact Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 items-start">
          
          {/* Left Column: About & Profile Details */}
          <div 
            className="md:col-span-2 min-w-0 rounded-2xl border border-gray-200/60 p-6 md:p-8 shadow-sm flex flex-col"
            style={{ background: 'linear-gradient(180deg, #D3EAFF 0%, #FFFFFF 360px)' }}
          >
            {/* Header profile row */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 relative">
              
              {/* Profile image with overlay badge */}
              <div className="flex flex-col items-center shrink-0">
                <div className="relative" style={{ width: '205px', height: '205px' }}>
                  {/* Profile image container */}
                  <div className="w-full h-full rounded-full overflow-hidden border-[3px] border-white shadow-sm bg-slate-100">
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="w-full h-full object-cover"
                      style={{ width: '200px', height: '200px' }}
                    />
                  </div>
                  {/* Gold Badge overlay positioned absolutely relative to profile wrapper */}
                  <div className="absolute -bottom-3 right-2 z-10">
                    <img
                      src="/icons/golden-badge.png"
                      alt="Golden Badge"
                      className="object-contain drop-shadow-sm"
                      style={{ width: '60px', height: '60px' }}
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                </div>
                <span className="text-sm text-gray-500 font-medium mt-3">
                  Operating since: {agent.name === 'Vinod Reddy' ? 2015 : agent.operatingSince}
                </span>
              </div>

              {/* Agent titles & stats */}
              <div className="flex-1 w-full mt-2 sm:mt-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                  <h1 className="text-3xl font-bold text-black leading-none text-center sm:text-left font-sans">{agent.name}</h1>
                  
                  {/* Actions & Verification Badge */}
                  <div className="flex items-center justify-center sm:justify-end gap-4">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-[#10B981] bg-[#E1FBF2] px-3 py-1.5 rounded-full border border-[#10B981] shrink-0">
                      <img
                        src="/icons/verified.png"
                        alt="Verified"
                        className="w-4 h-4 object-contain"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      Verified
                    </span>
                    <button 
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                      title="Save agent"
                    >
                      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
                    </button>
                    <button 
                      className="text-gray-500 hover:text-[#00478F] transition-colors"
                      title="Share agent profile"
                      onClick={() => navigator.clipboard.writeText(window.location.href)}
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <p className="text-base text-[#00478F] font-semibold mb-5 sm:text-left font-sans">{agent.agency}</p>
                
                {/* Faint Horizontal Divider Line */}
                <div className="h-px bg-gray-200/70 mb-5"></div>

                {/* Stats Grid - 2 columns */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                  
                  {/* Experience */}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-500 shrink-0" />
                    <span className="text-gray-500 font-sans">Experience:</span>
                    <span className="font-bold text-[#00478F] ml-1 font-sans">{agent.experience}</span>
                  </div>

                  {/* For Sale */}
                  <div className="flex items-center gap-2">
                    <Home className="w-5 h-5 text-gray-500 shrink-0" />
                    <span className="text-gray-500 font-sans">For Sale:</span>
                    <span className="font-bold text-[#00478F] ml-1 font-sans">{agent.forSale < 10 ? `0${agent.forSale}` : agent.forSale}</span>
                  </div>

                  {/* Properties */}
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-gray-500 shrink-0" />
                    <span className="text-gray-500 font-sans">Properties:</span>
                    <span className="font-bold text-[#00478F] ml-1 font-sans">{agent.properties}</span>
                  </div>

                  {/* Rent / Lease */}
                  <div className="flex items-center gap-2">
                    <Key className="w-5 h-5 text-gray-500 shrink-0" />
                    <span className="text-gray-500 font-sans">Rent / Lease:</span>
                    <span className="font-bold text-[#00478F] ml-1 font-sans">{agent.rentLease < 10 ? `0${agent.rentLease}` : agent.rentLease}</span>
                  </div>

                  {/* Team Size */}
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-500 shrink-0" />
                    <span className="text-gray-500 font-sans">Team Size:</span>
                    <span className="font-bold text-[#00478F] ml-1 font-sans">{agent.teamSize}</span>
                  </div>

                </div>

              </div>

            </div>

            {/* About text description */}
            <div className="mt-8 pt-4">
              <h2 className="text-xl font-bold text-black mb-3 font-sans">About :</h2>
              <p className="text-sm text-gray-600 leading-relaxed text-justify mb-5 font-normal font-sans">
                {agent.name === 'Vinod Reddy' ? 'PropLeader was founded with the goal of helping people navigate the complex world of real estate. We specialize in helping clients buy, sell, and rent properties in India and even interior design through our subsidiary company, UrbanCube™ Interio Private Limited. Our team of experienced professionals is dedicated to providing the highest level of service and support to our clients, helping them navigate the complex world of real estate with ease.' : agent.about}
              </p>
              
              <div className="mt-6">
                <span className="text-sm font-bold text-slate-700 block mb-1 font-sans">Address</span>
                <p className="text-sm text-gray-500 font-normal leading-relaxed font-sans">
                  {agent.name === 'Vinod Reddy' ? 'No 5/451, GBS Tower MCECHS Layout Dr Shivaramakaranth Nagar Hyderabad' : agent.address}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Sidebar - Takes 1 column */}
          <div className="rounded-2xl border border-gray-200/60 p-6 md:p-8 shadow-sm h-fit sticky top-6 bg-white w-full">
            <h2 className="text-xl font-bold text-black mb-6 font-sans">Contact</h2>
            
            {contactSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-semibold border border-emerald-100">
                Message sent successfully! The agent will contact you soon.
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Name" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#035096] transition-colors placeholder:text-gray-400 font-sans" 
                />
              </div>
              <div>
                <input 
                  type="tel" 
                  placeholder="Phone" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#035096] transition-colors placeholder:text-gray-400 font-sans" 
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#035096] transition-colors placeholder:text-gray-400 font-sans" 
                />
              </div>
              <div>
                <textarea 
                  placeholder="Message" 
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#035096] transition-colors resize-none placeholder:text-gray-400 font-sans"
                ></textarea>
              </div>
              
              <div className="flex gap-3 pt-2">
                <a 
                  href="tel:+919988776655" 
                  className="flex-1 py-3 border border-[#035096] text-[#035096] rounded-lg text-[14px] font-semibold hover:bg-gray-50 transition-colors text-center inline-block font-sans"
                >
                  Call Now
                </a>
                <button type="submit" className="px-8 py-2.5 bg-[#00478F] text-white rounded-lg text-[14px] font-medium hover:bg-blue-900 transition-colors shadow-sm">Send A Message</button>
              </div>
            </form>
          </div>

        </div>

        {/* Gallery Section */}
        <div className="mb-10">
          <h2 className="text-[22px] font-bold text-[#0B2C5C] mb-4">Gallery :</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-2 h-[380px] md:h-[480px]">
            {/* Main Large Image */}
            <div className="h-full rounded-xl overflow-hidden relative border border-gray-100 shadow-sm">
              <img 
                src={agent.gallery[0]} 
                alt="Highlight Main" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
              />
            </div>

            {/* 4 Small Images Grid */}
            <div className="hidden lg:grid grid-cols-2 grid-rows-2 gap-2 h-full">
              <div className="rounded-xl overflow-hidden relative border border-gray-100 shadow-sm cursor-pointer group">
                <img 
                  src={agent.gallery[1]} 
                  alt="Gallery 1" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="rounded-xl overflow-hidden relative border border-gray-100 shadow-sm cursor-pointer group">
                <img 
                  src={agent.gallery[2]} 
                  alt="Gallery 2" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="rounded-xl overflow-hidden relative border border-gray-100 shadow-sm cursor-pointer group">
                <img 
                  src={agent.gallery[3]} 
                  alt="Gallery 3" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="rounded-xl overflow-hidden relative border border-gray-100 shadow-sm cursor-pointer group">
                <img 
                  src={agent.gallery[4]} 
                  alt="Gallery 4" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                {/* Count Overlay */}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center transition-colors group-hover:bg-black/50">
                  <span className="text-white text-[28px] font-bold">+1</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filterable Properties Tab Section */}
        <div className="mb-10">
          
          {/* Tab buttons & See All Link */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-3 mb-6 gap-4">
            
            {/* Tabs */}
            <div className="flex items-center gap-6">
              {(['all', 'sale', 'rent'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-[15px] font-bold capitalize pb-1 transition-all relative ${activeTab === tab ? 'text-[#00478F]' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  {tab === 'all' ? 'All' : tab === 'sale' ? 'For Sale' : 'For Rent'}
                  {activeTab === tab && (
                    <div className="absolute bottom-[-13px] left-0 right-0 h-[2.5px] bg-[#00478F] rounded-full"></div>
                  )}
                </button>
              ))}
            </div>

            {/* See all properties link */}
            <Link 
              to="/search" 
              className="text-[#0B2C5C] font-semibold text-[14px] underline hover:text-[#4885FF] transition-colors"
            >
              See all Properties
            </Link>

          </div>

          {/* Properties Grid */}
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((prop) => (
                <div key={prop.id} className="bg-white rounded-xl overflow-hidden border border-gray-200/60 shadow-sm font-poppins flex flex-col h-[480px]">
                  
                  {/* Photo & Icons overlays */}
                  <div className="relative h-[240px] overflow-hidden">
                    <img src={prop.image} alt={prop.title} className="w-full h-full object-cover" />

                    <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 rounded text-[13px] font-normal border border-[#E67E22] shadow-sm font-poppins">
                      {prop.tagLabel}
                    </div>

                    <div className="absolute top-4 right-4 flex gap-3 z-10">
                      <button className="text-white hover:text-red-500 transition-colors drop-shadow">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button className="text-white hover:text-blue-500 transition-colors drop-shadow">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="absolute top-0 right-0 h-full w-[110px] bg-black/60 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-white text-[18px] font-medium leading-none mb-1">10+</span>
                      <span className="text-white text-[13px] font-medium">Photos</span>
                    </div>

                    <div className="absolute bottom-0 left-0 bg-black/70 px-4 py-1.5">
                      <span className="text-white text-[13px] font-normal font-poppins">Updated 6 day ago</span>
                    </div>
                  </div>

                  {/* Core contents */}
                  <div className="p-5 flex-1 flex flex-col">
                    
                    {/* Owner detail row */}
                    <div className="flex items-center gap-1.5 mb-2.5 text-gray-500">
                      <User className="w-4 h-4 text-[#00478F]" />
                      <span className="text-[13px]">Owner: <span className="font-semibold text-[#00478F]">{prop.ownerName}</span></span>
                    </div>

                    <div className="flex items-start gap-1 mb-3">
                      <MapPin className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
                      <h3 className="text-[14px] font-bold text-[#33353A] leading-tight line-clamp-2">{prop.title}</h3>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center text-[13px] text-gray-600 mb-4 h-5">
                      <div className="flex items-center gap-1.5">
                        <BedDouble className="w-4 h-4 text-gray-400" />
                        <span>{prop.beds}</span>
                      </div>
                      <div className="w-[1px] h-3 bg-gray-300 mx-3"></div>
                      <div className="flex items-center gap-1.5">
                        <Bath className="w-4 h-4 text-gray-400" />
                        <span>{prop.baths}</span>
                      </div>
                      <div className="w-[1px] h-3 bg-gray-300 mx-3"></div>
                      <div className="flex items-center gap-1.5">
                        <Maximize className="w-4 h-4 text-gray-400" />
                        <span>{prop.sqft.toLocaleString()} Sft.</span>
                      </div>
                    </div>

                    <p className="text-[12px] text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                      {prop.description}
                    </p>

                    {/* Footer price & view details button */}
                    <div className="border-t border-gray-100 mt-auto pt-4 flex justify-between items-center">
                      <div className="text-[20px] font-bold text-[#0B2C5C] flex items-baseline">
                        {prop.price}
                        {prop.type === 'rent' && <span className="text-[11px] font-medium text-gray-500 ml-1">/Month</span>}
                      </div>
                      <Link 
                        to={`/property/${prop.id}`}
                        className="px-5 py-1.5 border border-[#0B2C5C] text-[#0B2C5C] rounded-md text-[12px] font-semibold hover:bg-[#0B2C5C] hover:text-white transition-colors text-center inline-block"
                      >
                        View Detail
                      </Link>
                    </div>

                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-200/60">
              No listings found matching this type.
            </div>
          )}

        </div>

      </div>

      {/* New Launch Section */}
      <NewLaunch />
    </div>
  );
};

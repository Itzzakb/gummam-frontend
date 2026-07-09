import React, { type ReactNode, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Send } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DropdownFieldProps {
  icon?: ReactNode;
  label: string;
  options: string[];
}

const DropdownField: React.FC<DropdownFieldProps> = ({ icon, label, options }) => {
  return (
    <div className="flex-1 w-full relative h-full">
      <Select>
        <SelectTrigger
          className="w-full border border-gray-100 rounded-xl px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors bg-white h-full min-h-[56px] shadow-none focus:ring-0 [&>svg]:ml-2 [&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-gray-800"
          style={{ boxShadow: 'none' }}
        >
          <div className="flex items-center gap-3 shrink-0">
            {icon}
            <span className="text-[14px] font-medium text-gray-800 whitespace-nowrap">
              <SelectValue placeholder={label} />
            </span>
          </div>
        </SelectTrigger>
        <SelectContent className="bg-white border-gray-100 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] py-2 font-poppins z-50">
          {options.map((opt, idx) => (
            <SelectItem
              key={idx}
              value={opt}
              className="px-5 py-3 cursor-pointer text-[14px] font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:bg-gray-50 focus:text-gray-900 rounded-none data-[state=checked]:bg-gray-50 data-[state=checked]:text-[#0B2C5C]"
            >
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [showMicModal, setShowMicModal] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');

  const [showAiSearchModal, setShowAiSearchModal] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiMessages, setAiMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([]);
  const [aiTyping, setAiTyping] = useState(false);

  const handleMicClick = () => {
    setShowMicModal(true);
    setIsListening(true);
    setRecognizedText('Listening...');
    setTimeout(() => {
      setRecognizedText('Recognizing: "Villas for sale in Hitec City"...');
    }, 2000);
    setTimeout(() => {
      setIsListening(false);
      setShowMicModal(false);
      navigate('/search');
    }, 4000);
  };

  const handleAiSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    const query = aiQuery;
    setAiMessages(prev => [...prev, { sender: 'user', text: query }]);
    setAiQuery('');
    setAiTyping(true);

    setTimeout(() => {
      setAiTyping(false);
      setAiMessages(prev => [...prev, {
        sender: 'ai',
        text: `Here are the AI-curated property matches for "${query}":\n\n1. 🌟 **Gummaam Premium Villa** - Hitec City, Hyderabad (3 BHK, ₹1.45 Cr)\n2. 💎 **Oakwood Gardens** - Kondapur, Hyderabad (3 BHK, ₹1.60 Cr)\n\nWould you like to schedule a site visit or contact the listing agents?`
      }]);
    }, 1200);
  };
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! Welcome to Gummaam Home Landz. How can I help you find your dream property today?' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [messages, isChatOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const userText = textToSend || messageInput;
    if (!userText.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    if (!textToSend) setMessageInput('');

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: `That's a great question! For property details or lands in Hyderabad, you can explore our Projects tab or use our interactive Map-View. Would you like me to guide you there?`
      }]);
    }, 1000);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 font-poppins bg-[#FAFAFA] pb-10">
      <div className="max-w-7xl mx-auto rounded-[24px] sm:rounded-[40px] relative overflow-hidden bg-gradient-to-r from-[#D7E5F0] via-[#EAEBE5] to-[#F1D7C2] pt-12 pb-16 lg:pt-16 lg:pb-20 px-6 sm:px-12 lg:px-16 flex flex-col lg:flex-row items-center min-h-[500px] lg:min-h-[600px] mt-4 shadow-sm">

        {/* Noise Texture Overlay */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.4] mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        ></div>

        {/* Left Content */}
        <div className="w-full lg:w-1/2 relative z-10 flex flex-col justify-center">
          <p className="text-black font-normal mb-2 text-[14px]">Welcome to Realstate</p>
          <h1 className="text-[28px] sm:text-[36px] font-bold font-heading text-[#0B2C5C] leading-[1.2] mb-4">
            Find The Perfect Place to <br className="hidden sm:inline" />
            Live With your favorites
          </h1>
          <p className="text-black font-normal text-[14px] mb-8 lg:mb-16">
            Let's find a place that's perfect for you
          </p>

          {/* Search Box Container */}
          <div className="mt-8 relative w-full lg:w-[130%] xl:w-[140%] z-20 font-poppins">
            {/* Floating Tabs */}
            <div className="bg-white rounded-t-2xl px-6 sm:px-8 py-4 sm:py-5 flex gap-6 sm:gap-8 w-full sm:w-max max-w-full overflow-x-auto whitespace-nowrap scrollbar-none shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
              <div className="relative cursor-pointer">
                <span className="text-[14px] font-medium text-gray-900">All</span>
                <div className="absolute -bottom-4 sm:-bottom-5 left-0 w-full h-[3px] bg-black rounded-full"></div>
              </div>
              <span className="text-[14px] font-medium text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">For Sale</span>
              <span className="text-[14px] font-medium text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">For Rent</span>
              <span className="text-[14px] font-medium text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">Commercial</span>
              <span className="text-[14px] font-medium text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">New Launch</span>
              <span className="text-[14px] font-medium text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">Plots/Land</span>
            </div>

            {/* Main Search Bar Pill */}
            <div className="bg-white rounded-b-2xl rounded-tr-none sm:rounded-tr-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] p-4 sm:p-5 flex flex-col lg:flex-row items-stretch lg:items-center gap-4 w-full lg:w-max">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
                {/* Location */}
                <DropdownField
                  label="Location"
                  options={['Hyderabad', 'Hitec City', 'Uppal', 'Lingampalli']}
                  icon={<svg className="w-5 h-5 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>}
                />

                {/* Property Type */}
                <DropdownField
                  label="Property Type"
                  options={['Apartment', 'Villa', 'Commercial', 'Land']}
                  icon={<svg className="w-5 h-5 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>}
                />

                {/* Budget */}
                <DropdownField
                  label="Budget"
                  options={['Under ₹50L', '₹50L - ₹1Cr', '₹1Cr - ₹5Cr', 'Above ₹5Cr']}
                  icon={<span className="font-medium text-gray-600 text-[16px] shrink-0 whitespace-nowrap">₹</span>}
                />
              </div>

              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
                {/* Mic Icon */}
                <button 
                  onClick={handleMicClick}
                  className="w-[52px] h-[52px] rounded-full bg-gray-100/80 flex items-center justify-center hover:bg-gray-200 transition-colors shrink-0 cursor-pointer"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                </button>

                {/* Regular Search */}
                <button 
                  onClick={() => navigate('/search')}
                  className="flex-1 sm:flex-initial bg-[#E67817] hover:bg-[#D5680E] text-white px-7 py-4 rounded-full font-medium text-[14px] transition-colors flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-orange-500/20 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  Regular Search
                </button>

                {/* AI Search */}
                <div className="flex-1 sm:flex-initial rounded-full p-[2px] bg-gradient-to-r from-[#4885FF] to-[#F68035] shrink-0 shadow-lg shadow-blue-900/20 cursor-pointer">
                  <button 
                    onClick={() => {
                      setShowAiSearchModal(true);
                      setAiMessages([]);
                    }}
                    className="bg-[#035096] hover:bg-[#024078] text-white px-7 py-4 rounded-full font-medium text-[14px] transition-colors flex items-center justify-center gap-2 w-full h-full cursor-pointer"
                  >
                    <img src="/icons/ai-brain.png" alt="AI Brain" className="w-5 h-5 object-contain" />
                    Ai Search
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Content - 3D House Image */}
        <div className="absolute right-0 top-10 bottom-auto lg:bottom-0 h-56 sm:h-72 md:h-[350px] lg:h-full w-[60%] sm:w-1/2 lg:w-1/2 flex justify-end pointer-events-none z-0 opacity-30 sm:opacity-40 lg:opacity-100">
          <img src="/images/hero-img.png" alt="hero-img" className="h-full object-contain object-right-top lg:object-right-bottom" />
        </div>

      </div>

      {/* Floating Ask Gummaam Button */}
      <div className="fixed bottom-4 sm:bottom-8 right-2 sm:right-8 z-50 scale-[0.6] sm:scale-100 origin-bottom-right select-none">
        <img src="/images/chat-support-woman.png" alt="chat" className='w-24 sm:w-30 m-auto' />
        <div 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="rounded-full bg-gradient-to-r from-[#EB6753] to-[#4885FF] p-[3px] shadow-2xl shadow-blue-900/40 cursor-pointer hover:scale-105 transition-transform"
        >
          <button className="bg-[#0B2C5C] hover:bg-[#082046] text-white px-5 py-3 rounded-full text-sm transition-colors flex items-center gap-1 h-full w-full cursor-pointer">
            <span className="font-bold">Ask</span> <span className="font-normal">Gummaam</span>
            <div className="w-7 h-7 rounded-full bg-[#37B2FF] flex items-center justify-center shadow-inner ml-1 overflow-hidden">
              <img
                src="/images/gummaam-logo.png"
                alt="Gummaam Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Chat Support Popup Overlay */}
      {isChatOpen && (
        <div className="fixed bottom-24 sm:bottom-28 right-4 sm:right-8 z-[200] w-[330px] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col font-poppins h-[450px] animate-in fade-in slide-in-from-bottom-5 duration-200 text-left">
          {/* Header */}
          <div className="bg-[#0B2C5C] text-white p-4 flex items-center justify-between shadow-md shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#37B2FF] flex items-center justify-center overflow-hidden border border-white/20">
                <img src="/images/gummaam-logo.png" alt="Gummaam Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold leading-tight">Gummaam Assistant</span>
                <span className="text-[10px] text-blue-200 font-medium mt-0.5">Online • Always helpful</span>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white cursor-pointer transition-colors"
              title="Close Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-slate-50 flex flex-col">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[75%] p-3 rounded-2xl text-[12px] leading-relaxed text-left font-medium ${
                  msg.sender === 'user'
                    ? 'bg-[#035096] text-white self-end rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200/60 self-start rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="bg-white text-slate-500 border border-slate-200/60 self-start rounded-2xl rounded-tl-none p-3 text-[11px] font-semibold italic animate-pulse">
                Gummaam Assistant is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="p-2 border-t border-slate-100 bg-white flex gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden shrink-0">
            {['Buy Property', 'Plots in Hyderabad', 'Verification info'].map((sug) => (
              <button
                key={sug}
                onClick={() => handleSendMessage(sug)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-[#EFF6FF] hover:text-[#0A56A2] text-slate-655 text-[10px] font-bold rounded-full whitespace-nowrap cursor-pointer transition-colors shrink-0"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t border-slate-100 bg-white flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              placeholder="Ask me anything..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#035096]"
            />
            <button
              type="submit"
              className="p-2 bg-[#0B2C5C] hover:bg-blue-900 text-white rounded-lg cursor-pointer transition-colors"
              title="Send Message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* ================= MIC MODAL VOICE SEARCH ================= */}
      {showMicModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-[1100] p-4 text-center">
          <div className="bg-white w-full max-w-[360px] rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-base font-bold text-slate-800">Voice Search</h3>
            
            {/* Pulsing Mic Graphic */}
            <div className="relative flex items-center justify-center">
              <div className={`absolute w-20 h-20 bg-blue-100 rounded-full ${isListening ? 'animate-ping opacity-60' : 'opacity-0'}`} />
              <div className={`absolute w-16 h-16 bg-blue-200 rounded-full ${isListening ? 'animate-pulse opacity-85' : 'opacity-0'}`} />
              <div className="relative w-12 h-12 rounded-full bg-[#035096] flex items-center justify-center text-white shadow-md">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-700">{recognizedText}</p>
              <p className="text-xs text-slate-400">Say location, BHK, or property category</p>
            </div>

            <button
              onClick={() => setShowMicModal(false)}
              className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-655 text-xs font-semibold rounded-full cursor-pointer border-none"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ================= AI SEARCH (GEMINI/CHATGPT STYLE) ================= */}
      {showAiSearchModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-[1100] p-4 text-left font-poppins">
          <div className="bg-white w-full max-w-[620px] h-[520px] rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 bg-[#0B2C5C] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <img src="/icons/ai-brain.png" alt="AI Brain" className="w-6 h-6 object-contain" />
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold leading-tight">Gummaam AI Search</span>
                  <span className="text-[10px] text-blue-200 font-medium mt-0.5">AI Powered Real Estate Search</span>
                </div>
              </div>
              <button
                onClick={() => setShowAiSearchModal(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white cursor-pointer transition-colors"
                title="Close AI Search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat list or suggestion states */}
            <div className="flex-1 p-6 overflow-y-auto bg-slate-50 space-y-4 flex flex-col">
              {aiMessages.length === 0 ? (
                <div className="my-auto flex flex-col items-center text-center max-w-sm mx-auto space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#035096]">
                    <img src="/icons/ai-brain.png" alt="AI Brain" className="w-8 h-8 object-contain" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-800">Ask in Natural Language</h4>
                    <p className="text-xs text-slate-500">Search houses, villas, pricing, or locations easily using regular sentences.</p>
                  </div>
                  {/* Examples */}
                  <div className="flex flex-col gap-2 w-full pt-2">
                    {[
                      '3 BHK Villa in Hyderabad under 1.5 Cr',
                      'Commercial shops for rent in Hitec City'
                    ].map((eg) => (
                      <button
                        key={eg}
                        onClick={() => {
                          setAiQuery(eg);
                        }}
                        className="w-full text-left px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-655 hover:bg-blue-50/50 hover:border-[#035096] transition-all cursor-pointer truncate"
                      >
                        "{eg}"
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {aiMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed text-left ${
                        msg.sender === 'user'
                          ? 'bg-[#035096] text-white self-end rounded-tr-none font-medium'
                          : 'bg-white text-slate-800 border border-slate-250/70 self-start rounded-tl-none font-medium whitespace-pre-line'
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                  {aiTyping && (
                    <div className="bg-white text-slate-500 border border-slate-200 self-start rounded-2xl rounded-tl-none p-3.5 text-xs font-semibold italic animate-pulse">
                      Analyzing criteria & scanning database...
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleAiSearchSubmit}
              className="p-4 border-t border-slate-100 bg-white flex items-center gap-3 shrink-0"
            >
              <input
                type="text"
                placeholder="Ask Gummaam AI Search..."
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#035096]"
              />
              <button
                type="submit"
                className="p-3 bg-[#0B2C5C] hover:bg-blue-900 text-white rounded-xl cursor-pointer transition-colors"
                title="Submit Query"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

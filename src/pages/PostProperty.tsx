import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  Building2, 
  Home, 
  Key, 
  Map, 
  User, 
  UserCheck, 
  Hammer, 
  Briefcase, 
  Upload, 
  Check,
  MapPin,
  Smartphone,
  Mail,
  Trash2,
  Shield,
  ArrowRight
} from 'lucide-react';

// Types for form state
interface PropertyFormData {
  // Step 1: Intent
  intent: 'sell' | 'rent' | '';
  role: string;
  
  // Step 2: Type
  propertyType: string; 
  category: 'Residential' | 'Commercial' | 'Lands' | '';

  // Step 3: Details (General)
  title: string;
  description: string;
  floorNumber: string;
  furnishing: string;
  builtUpArea: string;
  bathroomCount: string;
  balconyCount: string;
  suitableFor: string[]; 
  
  // Commercial Specific
  landArea: string;
  commercialZoneType: string;
  propertyFeatures: string[]; 
  suitableForCommercial: string[]; 
  utilities: string[]; 

  // Price Details
  expectedPrice: string;
  bookingAmount: string;
  maintenanceCharges: string;
  pricePerSqft: string;

  // Amenities
  amenities: string[]; 

  // Location
  city: string;
  locality: string;
  landmark: string;
  pinCode: string;
  busStopDistance: string;
  metroDistance: string;
  mmtsDistance: string;
  fullAddress: string;

  // Media
  images: File[];
  imagePreviews: string[];
  videoUrl: string;
  floorPlanUrl: string;

  // Contact
  contactName: string;
  contactPhone: string;
  contactEmail: string;

  // Sell-Residential-High Rise Apt Specific Fields
  byArea?: string;
  projectBuildingName?: string;
  developedBy?: string;
  propertyStage?: string;
  propertyAge?: string;
  availableFrom?: string;
  flatNo?: string;
  bedroomCount?: string;
  additionalRooms?: string;
  otherRoomsList?: string[]; 
  carpetArea?: string;
  carpetAreaUnit?: string;
  builtUpAreaUnit?: string;
  superBuiltUpArea?: string;
  superBuiltUpAreaUnit?: string;
  uds?: string;
  fourWheelerParking?: string;
  twoWheelerParking?: string;
  buildingTotalFloors?: string;
  facing?: string;
  pricePerUnit?: string;
  totalAreaVal?: string;
  totalAreaUnit?: string;
  otherTaxes?: string;
  priceNegotiable?: string;
  brokerageCharge?: string; 
  showAmenitiesOption?: string; 
  boostPostOption?: string; 
  rentPerMonth?: string;
  securityDepositType?: string;
  securityDepositVal?: string;
  maintenanceAmountType?: string;
  maintenanceAmountVal?: string;
  seatingsCount?: string;
  receptionAvailable?: string;
  cabinsCount?: string;
  conferenceRoomsCount?: string;
  meetingRoomsCount?: string;
  pantryCount?: string;
  washroomsCount?: string;
  storeRoomsCount?: string;
  propertyAreaVal?: string;
  propertyAreaUnit?: string;
  doorNo?: string;
  propertyAt?: string;
  shuttersCount?: string;
  workSpace?: string;
  garageShedCarpetArea?: string;
  garageShedCarpetAreaUnit?: string;
  showroomSpaceCarpetArea?: string;
  showroomSpaceCarpetAreaUnit?: string;
  totalCarpetAreaVal?: string;
  totalCarpetAreaUnit?: string;
  godownType?: string;
  closedShedCarpetArea?: string;
  closedShedCarpetAreaUnit?: string;
  openSpaceCarpetArea?: string;
  openSpaceCarpetAreaUnit?: string;
  workMode?: string;
  landAcre?: string;
  landGuntas?: string;
  costPerAcre?: string;
  totalCost?: string;
  plotFor?: string;
  boundary?: string;
  natureOfLand?: string;
  soilType?: string;
  district?: string;
  mandal?: string;
  village?: string;
  landLocalityArea?: string;
  landUseZone?: string;
  highway?: string;
  distanceFromOrr?: string;
  roadFacedProperties?: string;
  approachRoad?: string;
  electricityConnection?: string;
  plantationCrop?: string;
  waterSource?: string;
  isPahaniAvailable?: string;
  moreBrief?: string;
  mapOptions?: string;
  mapOptionValue?: string;
  isMap?: string;
  plotAreaSqYds?: string;
  plotLength?: string;
  plotWidth?: string;
  costPerYd?: string;
  permissions?: string;
  roadsType?: string;
  tlpLpNumber?: string;
  reraNumber?: string;
  newProject?: string;
  resale?: string;
  developerDetails?: string;
  ventureStartedOn?: string;
  widthOfRoadfacing?: string;
  cornerPlot?: string;
  fenceSecurity?: string;
  manSecurity?: string;
  inPlotPlantation?: string;
  ventureInAcres?: string;
  nearFtl?: string;
  distanceFromNhw?: string;
  nearbyOrrExit?: string;
  ventureAmenities?: string[];
  additionalAmenities?: string;
  locationHighlights?: string;
}

const amenityCategories = {
  "Children's Play Area": [
    "Dedicated, safe playgrounds with swings, slides etc",
    "Sandpits"
  ],
  "Community Services & Management": [
    "Resident Association/Management Committee: For smooth functioning and decision-making",
    "Community Events: Organized festivals, sports tournaments and social gathering",
    "App-Based Community Management: For communication, raising requests and payments"
  ],
  "Convenience & Lifestyle": [
    "Business Center",
    "Library/Reading Room",
    "Retail/Commercial Spaces (within the community)",
    "Power backup: 24/7 generator backup",
    "Water Supply",
    "Intercom",
    "Video Door Phone",
    "High Speed Internet / wi-fi",
    "Ample Parking",
    "Maintenance Staff",
    "Convenience stores/ Supermarket",
    "Cafeteria/Restaurant",
    "Salon/Spa",
    "Pharmacy",
    "Service Apartments",
    "Guest Rooms",
    "Amphitheater/Mini-Theater",
    "Creche/Daycare facility",
    "Co-working Spaces"
  ],
  "Indoor Games": [
    "Carrom, Chess, and other board games.",
    "Billiards/Pool Table",
    "Table Tennis"
  ],
  "Landscaped Gardens & Parks": [
    "Seating areas, gazebos.",
    "Green spaces for relaxation and strolls"
  ],
  "Outdoor Sports Facilities": [
    "Badminton Courts",
    "Basketball Courts",
    "Cricket Practice Net",
    "Football/ Multi-purpose Sports Field",
    "Jogging/Walking Tracks",
    "Themed gardens (e.g., sensory gardens, herbs gardens)",
    "Tennis Courts"
  ],
  "Recreational & Leisure/Clubhouse/Community Hall": [
    "Aerobics / Zumba Studio",
    "Lounge areas and seating.",
    "Party lawns or banquet facilities",
    "Swimming Pool",
    "Fitness & Wellness",
    "Gymnasium / Fitness Center",
    "Yoga / Meditation Room",
    "Spa/ Sauna/ Steam Room",
    "Multipurpose halls for events and gatherings."
  ],
  "Security & Safety": [
    "Intercom Facility",
    "Boom Barriers",
    "24/7 Manned Security",
    "CCTV Surveillance",
    "Controlled Access points",
    "Perimeter Fencing/ Walls"
  ],
  "Sustainable & Eco-Friendly": [
    "Electric Vehicle charging stations",
    "Waste Segregation and Composting Facilities",
    "Sewage Treatment Plant",
    "Solar Panels for Common Area Lighting",
    "Rainwater Harvesting System"
  ]
};

const CustomSelect: React.FC<{
  value: string;
  onChange: (e: { target: { value: string } }) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}> = ({ value, onChange, children, className, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options: { value: string; label: string }[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === 'option') {
      const element = child as React.ReactElement<{ value?: any; children?: any }>;
      options.push({
        value: String(element.props.value || ''),
        label: String(element.props.children || '')
      });
    }
  });

  const selectedOption = options.find(o => o.value === value);
  const placeholder = options[0]?.label || 'Select...';
  const displayLabel = selectedOption && selectedOption.value !== '' ? selectedOption.label : placeholder;

  const isInputGroupAddon = className && (className.includes('border-l') || className.includes('border-r'));

  const borderClasses = isInputGroupAddon
    ? ''
    : isOpen
    ? 'border border-[#035096] ring-1 ring-[#035096]'
    : 'border border-slate-200 hover:border-slate-300';

  const roundedClasses = isInputGroupAddon
    ? className.includes('border-l') ? 'rounded-r-xl' : 'rounded-l-xl'
    : 'rounded-xl';

  return (
    <div className={isInputGroupAddon ? "relative" : "relative w-full"} ref={dropdownRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 ${roundedClasses} ${borderClasses} flex items-center justify-between text-sm transition-all bg-white ${
          disabled
            ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
            : isOpen
            ? 'text-[#035096] cursor-pointer font-medium'
            : 'text-slate-750 cursor-pointer font-normal'
        } ${className || ''}`}
      >
        <span className="truncate">{displayLabel}</span>
        <svg
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isOpen ? 'transform rotate-180 text-[#035096]' : 'text-slate-400'}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {!disabled && isOpen && (
        <div className="absolute right-0 mt-1.5 min-w-[120px] bg-white border border-slate-200 rounded-xl shadow-lg z-50 py-1.5 max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange({ target: { value: opt.value } });
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-slate-50 flex items-center justify-between ${
                value === opt.value ? 'bg-[#F0F4F9]/60 font-semibold text-[#035096]' : 'text-slate-700'
              }`}
            >
              <span className="truncate">{opt.label}</span>
              {value === opt.value && (
                <svg className="w-4 h-4 text-[#035096] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const initialFormData: PropertyFormData = {
  intent: '',
  role: '',
  propertyType: '',
  category: '',
  title: '',
  description: '',
  floorNumber: '',
  furnishing: '',
  builtUpArea: '',
  bathroomCount: '',
  balconyCount: '',
  suitableFor: [],
  landArea: '',
  commercialZoneType: '',
  propertyFeatures: [],
  suitableForCommercial: [],
  utilities: [],
  expectedPrice: '',
  bookingAmount: '',
  maintenanceCharges: '',
  pricePerSqft: '',
  amenities: [],
  city: '',
  locality: '',
  landmark: '',
  pinCode: '',
  busStopDistance: '',
  metroDistance: '',
  mmtsDistance: '',
  fullAddress: '',
  images: [],
  imagePreviews: [],
  videoUrl: '',
  floorPlanUrl: '',
  contactName: '',
  contactPhone: '',
  contactEmail: '',

  // Sell-Residential-High Rise Apt Specific Initial Values
  byArea: '',
  projectBuildingName: '',
  developedBy: '',
  propertyStage: '',
  propertyAge: '',
  availableFrom: '',
  flatNo: '',
  bedroomCount: '',
  additionalRooms: '',
  otherRoomsList: [],
  carpetArea: '',
  carpetAreaUnit: 'Sq.Ft',
  builtUpAreaUnit: 'Sq.Ft',
  superBuiltUpArea: '',
  superBuiltUpAreaUnit: 'Sq.Ft',
  uds: '',
  fourWheelerParking: '',
  twoWheelerParking: '',
  buildingTotalFloors: '',
  facing: '',
  pricePerUnit: '',
  totalAreaVal: '',
  totalAreaUnit: 'Sq.Ft',
  otherTaxes: 'Include',
  priceNegotiable: 'Yes',
  brokerageCharge: 'No',
  showAmenitiesOption: 'No',
  boostPostOption: 'regular',
  rentPerMonth: '',
  securityDepositType: 'Months',
  securityDepositVal: '',
  maintenanceAmountType: 'Select M',
  maintenanceAmountVal: '',
  seatingsCount: '',
  receptionAvailable: 'Select',
  cabinsCount: '',
  conferenceRoomsCount: '',
  meetingRoomsCount: '',
  pantryCount: '',
  washroomsCount: '',
  storeRoomsCount: '',
  propertyAreaVal: '',
  propertyAreaUnit: 'Sq.Ft',
  doorNo: '',
  propertyAt: 'Select',
  shuttersCount: 'Select',
  workSpace: '',
  garageShedCarpetArea: '',
  garageShedCarpetAreaUnit: 'Sq.Ft',
  showroomSpaceCarpetArea: '',
  showroomSpaceCarpetAreaUnit: 'Sq.Ft',
  totalCarpetAreaVal: '',
  totalCarpetAreaUnit: 'Sq.Ft',
  godownType: 'AC',
  closedShedCarpetArea: '',
  closedShedCarpetAreaUnit: 'Sq.Ft',
  openSpaceCarpetArea: '',
  openSpaceCarpetAreaUnit: 'Sq.Ft',
  workMode: 'Factory',
  plotAreaSqYds: '',
  plotLength: '',
  plotWidth: '',
  costPerYd: '',
  permissions: 'HMDA',
  roadsType: 'Blacktap',
  tlpLpNumber: '',
  reraNumber: '',
  newProject: 'Yes',
  resale: 'Yes',
  developerDetails: '',
  ventureStartedOn: '',
  widthOfRoadfacing: '',
  cornerPlot: 'Yes',
  fenceSecurity: 'Wire Fencing',
  manSecurity: 'Yes',
  inPlotPlantation: 'Yes',
  ventureInAcres: '',
  nearFtl: 'Yes',
  distanceFromNhw: '',
  nearbyOrrExit: 'Select',
  ventureAmenities: [],
  additionalAmenities: '',
  locationHighlights: '',
};

export const PostProperty: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, openAuthDialog } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      openAuthDialog('agent');
    } else if (user?.role !== 'agent') {
      alert("Only agents are allowed to access the Post Property page.");
      navigate('/');
      openAuthDialog('agent');
    }
  }, [isAuthenticated, user, navigate, openAuthDialog]);

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<PropertyFormData>(initialFormData);
  const [validationError, setValidationError] = useState<string>('');

  const isLandsAcre = formData.category === 'Lands' && formData.propertyType === 'Acre' && (formData.intent === 'sell' || formData.intent === 'rent');
  const isLandsPlots = formData.category === 'Lands' && formData.propertyType === 'Plots' && (formData.intent === 'sell' || formData.intent === 'rent');
  const isCommercialShed = formData.category === 'Commercial' && formData.propertyType === 'Industrial Space/shed' && (formData.intent === 'sell' || formData.intent === 'rent');
  const isCommercialIndustrial = formData.category === 'Commercial' && formData.propertyType === 'Industrial Buildings' && (formData.intent === 'sell' || formData.intent === 'rent');
  const isCommercialGodown = formData.category === 'Commercial' && formData.propertyType === 'Warehouse/Godown' && (formData.intent === 'sell' || formData.intent === 'rent');
  const isCommercialShowroom = formData.category === 'Commercial' && formData.propertyType === 'Showrooms' && (formData.intent === 'sell' || formData.intent === 'rent');
  const isCommercialShop = formData.category === 'Commercial' && formData.propertyType === 'Shops' && (formData.intent === 'sell' || formData.intent === 'rent');
  const isCommercialOfficeSpaceSell = formData.category === 'Commercial' && formData.propertyType === 'Office Space' && formData.intent === 'sell';
  const isHighRiseAptSell = (formData.category === 'Residential' && (formData.intent === 'sell' || formData.intent === 'rent')) || isCommercialOfficeSpaceSell || isCommercialShop || isCommercialShowroom || isCommercialGodown || isCommercialIndustrial || isCommercialShed || isLandsAcre || isLandsPlots;
  const isAmenitiesDisabled = formData.propertyType === 'Independent Houses' || formData.propertyType === 'PG/Hostel' || isLandsAcre || isLandsPlots;

  const updateFormData = (fields: Partial<PropertyFormData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
    setValidationError('');
  };

  const handlePriceOrAreaChange = (field: 'pricePerUnit' | 'totalAreaVal', value: string) => {
    const price = field === 'pricePerUnit' ? value : formData.pricePerUnit || '';
    const area = field === 'totalAreaVal' ? value : formData.totalAreaVal || '';
    const computed = (Number(price) || 0) * (Number(area) || 0);
    updateFormData({
      [field]: value,
      expectedPrice: computed > 0 ? String(computed) : ''
    });
  };

  const handleLandChange = (field: 'landAcre' | 'landGuntas' | 'costPerAcre', value: string) => {
    const acre = field === 'landAcre' ? value : formData.landAcre || '';
    const guntas = field === 'landGuntas' ? value : formData.landGuntas || '';
    const cost = field === 'costPerAcre' ? value : formData.costPerAcre || '';
    
    const acreNum = Number(acre) || 0;
    const guntasNum = Number(guntas) || 0;
    const costNum = Number(cost) || 0;
    
    const totalArea = acreNum + (guntasNum / 40);
    const computedTotalCost = totalArea * costNum;
    
    updateFormData({
      [field]: value,
      totalAreaVal: totalArea > 0 ? String(totalArea) : '',
      totalCost: computedTotalCost > 0 ? String(computedTotalCost) : '',
      expectedPrice: computedTotalCost > 0 ? String(computedTotalCost) : '',
    });
  };

  const handlePlotChange = (field: 'plotAreaSqYds' | 'plotLength' | 'plotWidth' | 'costPerYd', value: string) => {
    const area = field === 'plotAreaSqYds' ? value : formData.plotAreaSqYds || '';
    const cost = field === 'costPerYd' ? value : formData.costPerYd || '';
    
    const areaNum = Number(area) || 0;
    const costNum = Number(cost) || 0;
    const computedTotalCost = areaNum * costNum;
    
    updateFormData({
      [field]: value,
      totalAreaVal: Number(area) > 0 ? String(area) : '',
      totalCost: computedTotalCost > 0 ? String(computedTotalCost) : '',
      expectedPrice: computedTotalCost > 0 ? String(computedTotalCost) : '',
    });
  };

  const toggleOtherRoom = (room: string) => {
    const list = formData.otherRoomsList || [];
    const updated = list.includes(room) ? list.filter(r => r !== room) : [...list, room];
    updateFormData({ otherRoomsList: updated });
  };

  const toggleCategoryAmenities = (category: keyof typeof amenityCategories) => {
    const subItems = amenityCategories[category];
    const allSelected = subItems.every(item => formData.amenities.includes(item));
    
    let updatedAmenities = [...formData.amenities];
    if (allSelected) {
      updatedAmenities = updatedAmenities.filter(item => !subItems.includes(item));
    } else {
      subItems.forEach(item => {
        if (!updatedAmenities.includes(item)) {
          updatedAmenities.push(item);
        }
      });
    }
    updateFormData({ amenities: updatedAmenities });
  };

  const isCategoryChecked = (category: keyof typeof amenityCategories) => {
    const subItems = amenityCategories[category];
    return subItems.every(item => formData.amenities.includes(item));
  };

  // Helper validation for steps
  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (!formData.intent) {
        setValidationError('Please select what your property is for.');
        return false;
      }
      if (!formData.role) {
        setValidationError('Please select who is listing this property.');
        return false;
      }
    }
    if (step === 2) {
      if (!formData.propertyType) {
        setValidationError('Please select a property type.');
        return false;
      }
    }
    if (step === 3) {
      if (isHighRiseAptSell) {
        if (isLandsAcre) {
          if (!formData.landAcre) return triggerError('Acre is required.');
          if (!formData.costPerAcre) return triggerError('Cost per Acre is required.');
          if (!formData.boundary) return triggerError('Boundary is required.');
          if (!formData.village) return triggerError('Village is required.');
          if (!formData.highway) return triggerError('Highway is required.');
          if (!formData.distanceFromOrr) return triggerError('Distance from ORR is required.');
          
          formData.locality = formData.village;
          if (!formData.totalAreaVal) {
            const acreNum = Number(formData.landAcre) || 0;
            const guntasNum = Number(formData.landGuntas) || 0;
            formData.totalAreaVal = String(acreNum + (guntasNum / 40));
          }
          if (!formData.expectedPrice) {
            formData.expectedPrice = formData.totalCost || '0';
          }
        } else if (isLandsPlots) {
          if (!formData.plotAreaSqYds) return triggerError('Plot Area is required.');
          if (!formData.costPerYd) return triggerError('Cost per yds is required.');
          if (!formData.facing) return triggerError('Facing is required.');
          if (!formData.fenceSecurity) return triggerError('Fence Security is required.');
          if (!formData.village) return triggerError('Village is required.');
          if (!formData.highway) return triggerError('Highway is required.');
          if (!formData.distanceFromNhw) return triggerError('Distance from NHW is required.');
          
          formData.locality = formData.village;
          if (!formData.totalAreaVal) {
            formData.totalAreaVal = formData.plotAreaSqYds;
          }
          if (!formData.expectedPrice) {
            formData.expectedPrice = formData.totalCost || '0';
          }
        } else {
          if (!formData.locality) return triggerError('Locality is required.');
          if (!formData.totalAreaVal && (isCommercialOfficeSpaceSell || isCommercialShop || isCommercialShowroom || isCommercialGodown || isCommercialIndustrial || isCommercialShed) && formData.propertyAreaVal) {
            formData.totalAreaVal = formData.propertyAreaVal;
          }
          if (!formData.totalAreaVal) return triggerError('Total Area is required.');
          if (formData.intent === 'sell') {
            if (!formData.pricePerUnit) return triggerError('Property Price Per is required.');
          } else if (formData.intent === 'rent') {
            if (!formData.rentPerMonth) return triggerError('Rent per Month is required.');
          }
        }
        
        // Auto-populate required fields for step 4/api compatibility
        const isComm = isCommercialOfficeSpaceSell || isCommercialShop || isCommercialShowroom || isCommercialGodown || isCommercialIndustrial || isCommercialShed;
        const bedroomStr = (isCommercialOfficeSpaceSell || isCommercialIndustrial) 
          ? `${formData.seatingsCount || '0'} Seats` 
          : isCommercialShop 
          ? `${formData.shuttersCount || '0'} Shutters` 
          : isCommercialShowroom
          ? 'Showroom'
          : isCommercialGodown
          ? 'Godown'
          : isCommercialShed
          ? 'Shed'
          : formData.bedroomCount || '3 BHK';
        const propTypeLabel = formData.propertyType || 'Property';
        const projName = formData.projectBuildingName || formData.locality || 'Premium Locality';
        const derivedTitle = isLandsAcre
          ? `${formData.landAcre || '0'} Acre Lands in ${formData.village || 'Locality'}`
          : isLandsPlots
          ? `${formData.plotAreaSqYds || '0'} Sq.Yds Plot in ${formData.village || 'Locality'}`
          : isComm 
          ? `${bedroomStr} Commercial ${propTypeLabel} in ${projName}`
          : `${bedroomStr} ${propTypeLabel} in ${projName}`;
        const derivedDesc = isLandsAcre
          ? `Premium Lands of ${formData.landAcre || '0'} Acres and ${formData.landGuntas || '0'} Guntas in ${formData.village || 'Locality'}. Boundary: ${formData.boundary || 'N/A'}, soil type: ${formData.soilType || 'N/A'}, nature of land: ${formData.natureOfLand || 'N/A'}.`
          : isLandsPlots
          ? `Premium Plot of ${formData.plotAreaSqYds || '0'} Sq.Yds in ${formData.village || 'Locality'}. Facing: ${formData.facing || 'N/A'}, corner plot: ${formData.cornerPlot || 'No'}.`
          : isComm 
          ? ((isCommercialOfficeSpaceSell || isCommercialIndustrial)
            ? `Premium Commercial ${propTypeLabel} with ${formData.seatingsCount || '0'} seats and ${formData.cabinsCount || '0'} cabins ${formData.intent === 'rent' ? 'for rent' : 'for sale'} in ${projName}. Features: ${formData.furnishing || 'Unfurnished'}, facing ${formData.facing || 'East'}.`
            : isCommercialShop
            ? `Premium Commercial Shop with ${formData.shuttersCount || '0'} shutters ${formData.intent === 'rent' ? 'for rent' : 'for sale'} in ${projName}. Features: ${formData.furnishing || 'Unfurnished'}, facing ${formData.facing || 'East'}.`
            : isCommercialShowroom
            ? `Premium Commercial Showroom ${formData.intent === 'rent' ? 'for rent' : 'for sale'} in ${projName}. Features: ${formData.furnishing || 'Unfurnished'}, facing ${formData.facing || 'East'}.`
            : isCommercialGodown
            ? `Premium Commercial Warehouse/Godown ${formData.intent === 'rent' ? 'for rent' : 'for sale'} in ${projName}. Features: ${formData.furnishing || 'Unfurnished'}, facing ${formData.facing || 'East'}.`
            : `Premium Commercial Industrial Space/Shed ${formData.intent === 'rent' ? 'for rent' : 'for sale'} in ${projName}. Features: ${formData.furnishing || 'Unfurnished'}, facing ${formData.facing || 'East'}.`)
          : `A beautiful ${bedroomStr} ${propTypeLabel.toLowerCase()} ${formData.intent === 'rent' ? 'for rent' : 'for sale'} in ${projName}. Features: ${formData.furnishing || 'Unfurnished'}, facing ${formData.facing || 'East'}. Total Floors: ${formData.buildingTotalFloors || 'N/A'}.`;
        
        formData.title = formData.title || derivedTitle;
        formData.description = formData.description || derivedDesc;
        formData.builtUpArea = formData.builtUpArea || formData.totalAreaVal;
        formData.city = formData.city || 'Hyderabad';
        formData.pinCode = formData.pinCode || '500081';
        const unitNo = isComm ? formData.doorNo : formData.flatNo;
        formData.fullAddress = formData.fullAddress || `${unitNo ? 'Unit ' + unitNo + ', ' : ''}${projName}, ${formData.locality}, Hyderabad`;
        formData.contactName = formData.contactName || 'Listed Member';
        formData.contactPhone = formData.contactPhone || '9999999999';
        formData.contactEmail = formData.contactEmail || 'member@gummam.com';
        if (formData.intent === 'rent') {
          formData.expectedPrice = formData.expectedPrice || formData.rentPerMonth || '0';
        }
      } else {
        if (formData.category === 'Lands') {
          if (!formData.landArea) return triggerError('Land Area is required.');
          if (!formData.expectedPrice) return triggerError('Price is required.');
        } else {
          if (!formData.title) return triggerError('Property Title is required.');
          if (!formData.description) return triggerError('Property Description is required.');
          if (!formData.builtUpArea) return triggerError('Built-up Area is required.');
          if (!formData.expectedPrice) return triggerError('Expected Price is required.');
        }
        if (!formData.city) return triggerError('City is required.');
        if (!formData.locality) return triggerError('Locality is required.');
        if (!formData.pinCode) return triggerError('Pin Code is required.');
        if (!formData.fullAddress) return triggerError('Full Address is required.');
        if (formData.images.length < 3) {
          return triggerError('Please upload at least 3 property images.');
        }
        if (!formData.contactName) return triggerError('Contact Name is required.');
        if (!formData.contactPhone) return triggerError('Contact Phone is required.');
        if (!formData.contactEmail) return triggerError('Contact Email is required.');
      }
    }
    return true;
  };

  const triggerError = (msg: string): boolean => {
    setValidationError(msg);
    window.scrollTo({ top: 200, behavior: 'smooth' });
    return false;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    setValidationError('');
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStepClick = (targetStep: number) => {
    if (targetStep < currentStep) {
      setValidationError('');
      setCurrentStep(targetStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    let stepToValidate = currentStep;
    while (stepToValidate < targetStep) {
      if (!validateStep(stepToValidate)) {
        return;
      }
      stepToValidate++;
    }
    setValidationError('');
    setCurrentStep(targetStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    
    alert('Property listed successfully!');
    navigate('/');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newPreviews = filesArray.map(file => URL.createObjectURL(file));

      updateFormData({
        images: [...formData.images, ...filesArray],
        imagePreviews: [...formData.imagePreviews, ...newPreviews],
      });
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    const updatedPreviews = formData.imagePreviews.filter((_, i) => i !== index);
    updateFormData({
      images: updatedImages,
      imagePreviews: updatedPreviews
    });
  };

  const toggleSelection = (field: 'suitableFor' | 'amenities' | 'propertyFeatures' | 'suitableForCommercial' | 'utilities', item: string) => {
    const list = formData[field] as string[];
    const updated = list.includes(item) ? list.filter(i => i !== item) : [...list, item];
    updateFormData({ [field]: updated });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 px-4 sm:px-6 lg:px-8 font-poppins">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Title */}
        <div className="mb-8 text-left">
          <h1 className="text-3xl font-bold text-[#0B2C5C]">Post Property</h1>
          <p className="text-sm text-slate-500 mt-1">List your property and reach millions of buyers</p>
        </div>

        {/* Stepper Header */}
        <div className="bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-slate-100 p-8 mb-8">
          <div className="flex items-center justify-between w-full mb-8 overflow-x-auto pb-2 scrollbar-none">
            {/* Step 1 */}
            <div 
              onClick={() => handleStepClick(1)}
              className="flex items-center gap-3 shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-base transition-all ${
                currentStep > 1 
                  ? 'bg-[#00C800] text-white' 
                  : currentStep === 1 
                  ? 'bg-[#035096] text-white' 
                  : 'bg-[#D0E7FF] text-[#035096]'
              }`}>
                {currentStep > 1 ? <Check className="w-5 h-5" /> : '1'}
              </div>
              <span className={`text-base font-semibold ${currentStep === 1 ? 'text-[#0B2C5C]' : 'text-slate-800'}`}>Property Intent</span>
            </div>

            {/* Line 1-2 */}
            <div className={`h-1.5 flex-1 min-w-[30px] mx-4 rounded-full transition-all ${currentStep > 1 ? 'bg-[#00C800]' : 'bg-[#E5E9F0]'}`} />

            {/* Step 2 */}
            <div 
              onClick={() => handleStepClick(2)}
              className="flex items-center gap-3 shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-base transition-all ${
                currentStep > 2 
                  ? 'bg-[#00C800] text-white' 
                  : currentStep === 2 
                  ? 'bg-[#035096] text-white' 
                  : 'bg-[#D0E7FF] text-[#035096]'
              }`}>
                {currentStep > 2 ? <Check className="w-5 h-5" /> : '2'}
              </div>
              <span className={`text-base font-semibold ${currentStep === 2 ? 'text-[#0B2C5C]' : 'text-slate-800'}`}>Property Type</span>
            </div>

            {/* Line 2-3 */}
            <div className={`h-1.5 flex-1 min-w-[30px] mx-4 rounded-full transition-all ${currentStep > 2 ? 'bg-[#00C800]' : 'bg-[#E5E9F0]'}`} />

            {/* Step 3 */}
            <div 
              onClick={() => handleStepClick(3)}
              className="flex items-center gap-3 shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-base transition-all ${
                currentStep > 3 
                  ? 'bg-[#00C800] text-white' 
                  : currentStep === 3 
                  ? 'bg-[#035096] text-white' 
                  : 'bg-[#D0E7FF] text-[#035096]'
              }`}>
                {currentStep > 3 ? <Check className="w-5 h-5" /> : '3'}
              </div>
              <span className={`text-base font-semibold ${currentStep === 3 ? 'text-[#0B2C5C]' : 'text-slate-800'}`}>Property Details</span>
            </div>

            {/* Line 3-4 */}
            <div className={`h-1.5 flex-1 min-w-[30px] mx-4 rounded-full transition-all ${currentStep > 3 ? 'bg-[#00C800]' : 'bg-[#E5E9F0]'}`} />

            {/* Step 4 */}
            <div 
              onClick={() => handleStepClick(4)}
              className="flex items-center gap-3 shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-base transition-all ${
                currentStep === 4 
                  ? 'bg-[#035096] text-white' 
                  : 'bg-[#D0E7FF] text-[#035096]'
              }`}>
                4
              </div>
              <span className={`text-base font-semibold ${currentStep === 4 ? 'text-[#0B2C5C]' : 'text-slate-800'}`}>Review & Submit</span>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="w-full bg-[#E5E9F0] h-[8px] rounded-full relative overflow-hidden">
            <div 
              className="bg-[#035096] h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Validation Alert */}
        {validationError && (
          <div className="bg-red-50 text-red-700 text-sm font-medium border border-red-200 rounded-xl p-4 mb-6 text-left">
            {validationError}
          </div>
        )}

        {/* --- STEP 1: PROPERTY INTENT --- */}
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-slate-100 p-8 sm:p-10 text-left">
            {/* Intent Section */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-black mb-1">What is this property for?</h2>
              <p className="text-xs text-slate-400 mb-6">Choose whether you want to sell your property or rent/lease it out.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Sell Card */}
                <div 
                  onClick={() => updateFormData({ intent: 'sell' })}
                  className={`flex items-center justify-between p-6 rounded-2xl border cursor-pointer transition-all ${
                    formData.intent === 'sell' 
                      ? 'border-[#4885FF] bg-[#F0F4F9]/60 shadow-[0_4px_15px_rgba(72,133,255,0.1)]' 
                      : 'border-slate-100 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3.5 rounded-2xl ${formData.intent === 'sell' ? 'bg-white shadow-sm text-[#035096]' : 'bg-[#F0F4F9] text-slate-500'}`}>
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#0B2C5C]">Sell</h3>
                      <p className="text-xs text-slate-500 mt-0.5">List your property for sale</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                    formData.intent === 'sell' ? 'bg-[#4885FF] border-[#4885FF]' : 'border-slate-300'
                  }`}>
                    {formData.intent === 'sell' && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>

                {/* Rent Card */}
                <div 
                  onClick={() => updateFormData({ intent: 'rent' })}
                  className={`flex items-center justify-between p-6 rounded-2xl border cursor-pointer transition-all ${
                    formData.intent === 'rent' 
                      ? 'border-[#4885FF] bg-[#F0F4F9]/60 shadow-[0_4px_15px_rgba(72,133,255,0.1)]' 
                      : 'border-slate-100 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3.5 rounded-2xl ${formData.intent === 'rent' ? 'bg-white shadow-sm text-[#035096]' : 'bg-[#F0F4F9] text-slate-500'}`}>
                      <Key className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#0B2C5C]">Rent / Lease</h3>
                      <p className="text-xs text-slate-500 mt-0.5">List your property for rent or lease</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                    formData.intent === 'rent' ? 'bg-[#4885FF] border-[#4885FF]' : 'border-slate-300'
                  }`}>
                    {formData.intent === 'rent' && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>
              </div>
            </div>

            {/* Role Section */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-black mb-1">Who is listing this property?</h2>
              <p className="text-xs text-slate-400 mb-6">Select the role that best describes you.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Owner */}
                <div 
                  onClick={() => updateFormData({ role: 'owner' })}
                  className={`flex items-center justify-between p-6 rounded-2xl border cursor-pointer transition-all ${
                    formData.role === 'owner' 
                      ? 'border-[#4885FF] bg-[#F0F4F9]/60 shadow-[0_4px_15px_rgba(72,133,255,0.1)]' 
                      : 'border-slate-100 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3.5 rounded-2xl ${formData.role === 'owner' ? 'bg-white shadow-sm text-[#035096]' : 'bg-[#F0F4F9] text-slate-500'}`}>
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#0B2C5C]">Owner</h3>
                      <p className="text-xs text-slate-500 mt-0.5">I am the owner</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                    formData.role === 'owner' ? 'bg-[#4885FF] border-[#4885FF]' : 'border-slate-300'
                  }`}>
                    {formData.role === 'owner' && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>

                {/* Agent */}
                <div 
                  onClick={() => updateFormData({ role: 'agent' })}
                  className={`flex items-center justify-between p-6 rounded-2xl border cursor-pointer transition-all ${
                    formData.role === 'agent' 
                      ? 'border-[#4885FF] bg-[#F0F4F9]/60 shadow-[0_4px_15px_rgba(72,133,255,0.1)]' 
                      : 'border-slate-100 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3.5 rounded-2xl ${formData.role === 'agent' ? 'bg-white shadow-sm text-[#035096]' : 'bg-[#F0F4F9] text-slate-500'}`}>
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#0B2C5C]">Agent</h3>
                      <p className="text-xs text-slate-500 mt-0.5">I am a real estate agent</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                    formData.role === 'agent' ? 'bg-[#4885FF] border-[#4885FF]' : 'border-slate-300'
                  }`}>
                    {formData.role === 'agent' && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>

                {/* Builder/Developer */}
                <div 
                  onClick={() => updateFormData({ role: 'builder/developer' })}
                  className={`flex items-center justify-between p-6 rounded-2xl border cursor-pointer transition-all ${
                    formData.role === 'builder/developer' 
                      ? 'border-[#4885FF] bg-[#F0F4F9]/60 shadow-[0_4px_15px_rgba(72,133,255,0.1)]' 
                      : 'border-slate-100 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3.5 rounded-2xl ${formData.role === 'builder/developer' ? 'bg-white shadow-sm text-[#035096]' : 'bg-[#F0F4F9] text-slate-500'}`}>
                      <Hammer className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#0B2C5C]">Builder/Developer</h3>
                      <p className="text-xs text-slate-500 mt-0.5">I am a builder/developer</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                    formData.role === 'builder/developer' ? 'bg-[#4885FF] border-[#4885FF]' : 'border-slate-300'
                  }`}>
                    {formData.role === 'builder/developer' && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>

                {/* Marketing Employee */}
                <div 
                  onClick={() => updateFormData({ role: 'marketing employee' })}
                  className={`flex items-center justify-between p-6 rounded-2xl border cursor-pointer transition-all ${
                    formData.role === 'marketing employee' 
                      ? 'border-[#4885FF] bg-[#F0F4F9]/60 shadow-[0_4px_15px_rgba(72,133,255,0.1)]' 
                      : 'border-slate-100 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3.5 rounded-2xl ${formData.role === 'marketing employee' ? 'bg-white shadow-sm text-[#035096]' : 'bg-[#F0F4F9] text-slate-500'}`}>
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#0B2C5C]">Marketing Employee</h3>
                      <p className="text-xs text-slate-500 mt-0.5">I am a marketing employee</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                    formData.role === 'marketing employee' ? 'bg-[#4885FF] border-[#4885FF]' : 'border-slate-300'
                  }`}>
                    {formData.role === 'marketing employee' && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button 
                type="button"
                onClick={handleNext}
                className="bg-[#035096] hover:bg-[#024078] text-white px-11 py-3.5 rounded-2xl font-semibold text-[17px] transition-colors min-w-[160px] text-center focus:outline-none"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* --- STEP 2: PROPERTY TYPE --- */}
        {currentStep === 2 && (
          <div className="bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-slate-100 p-8 sm:p-10 text-left">
            {/* Residentials */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-black mb-1">Residentials</h2>
              <p className="text-xs text-slate-400 mb-6">Find the perfect home for you</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  { title: 'High-rise Apts', desc: 'Luxury apartments in towers', icon: Building2 },
                  { title: 'Standalone Apts', desc: 'Independent apartment complexes', icon: Building2 },
                  { title: 'Villa Gated Communities', desc: 'Private villas in secure communities', icon: Home },
                  { title: 'Independent Houses', desc: 'Stand-alone houses and homes', icon: Home },
                  { title: 'PG/Hostel', desc: 'Paying guest and shared hostels', icon: Home },
                ].map(item => (
                  <div 
                    key={item.title}
                    onClick={() => {
                      const updates: Partial<PropertyFormData> = { propertyType: item.title, category: 'Residential' };
                      if (item.title === 'Independent Houses' || item.title === 'PG/Hostel') {
                        updates.showAmenitiesOption = 'No';
                        updates.amenities = [];
                        updates.landmark = '';
                      }
                      updateFormData(updates);
                    }}
                    className={`flex items-center justify-between p-5 rounded-2xl border cursor-pointer transition-all ${
                      formData.propertyType === item.title 
                        ? 'border-[#4885FF] bg-[#F0F4F9]/60 shadow-[0_4px_15px_rgba(72,133,255,0.1)]' 
                        : 'border-slate-100 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl ${formData.propertyType === item.title ? 'bg-white text-[#035096]' : 'bg-[#F0F4F9] text-slate-500'}`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-[#0B2C5C]">{item.title}</h3>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">{item.desc}</p>
                      </div>
                    </div>
                    <div className={`w-5.5 h-5.5 rounded-full border flex items-center justify-center shrink-0 ${
                      formData.propertyType === item.title ? 'bg-[#4885FF] border-[#4885FF]' : 'border-slate-300'
                    }`}>
                      {formData.propertyType === item.title && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Commercials */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#0B2C5C] mb-1">Commercials</h2>
              <p className="text-xs text-slate-400 mb-6">Explore commercial spaces and opportunities</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  { title: 'Office Space', desc: 'Offices and co-working spaces', icon: Briefcase },
                  { title: 'Shops', desc: 'Retail stores and shops', icon: Briefcase },
                  { title: 'Showrooms', desc: 'Front-facing displays and showrooms', icon: Briefcase },
                  { title: 'Warehouse/Godown', desc: 'Storage and logistics warehouses', icon: Briefcase },
                  { title: 'Industrial Buildings', desc: 'Manufacturing plants and facilities', icon: Briefcase },
                  { title: 'Industrial Space/shed', desc: 'Industrial sheds and storage yards', icon: Briefcase },
                ].map(item => (
                  <div 
                    key={item.title}
                    onClick={() => updateFormData({ propertyType: item.title, category: 'Commercial' })}
                    className={`flex items-center justify-between p-5 rounded-2xl border cursor-pointer transition-all ${
                      formData.propertyType === item.title 
                        ? 'border-[#4885FF] bg-[#F0F4F9]/60 shadow-[0_4px_15px_rgba(72,133,255,0.1)]' 
                        : 'border-slate-100 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl ${formData.propertyType === item.title ? 'bg-white text-[#035096]' : 'bg-[#F0F4F9] text-slate-500'}`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-[#0B2C5C]">{item.title}</h3>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">{item.desc}</p>
                      </div>
                    </div>
                    <div className={`w-5.5 h-5.5 rounded-full border flex items-center justify-center shrink-0 ${
                      formData.propertyType === item.title ? 'bg-[#4885FF] border-[#4885FF]' : 'border-slate-300'
                    }`}>
                      {formData.propertyType === item.title && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lands */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#0B2C5C] mb-1">Lands</h2>
              <p className="text-xs text-slate-400 mb-6">Invest in land plots or agricultural areas</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  { title: 'Acre', desc: 'Large area lands and farms', icon: Map },
                  { title: 'Plots', desc: 'Residential and commercial plots', icon: Map },
                ].map(item => (
                  <div 
                    key={item.title}
                    onClick={() => {
                      const updates: Partial<PropertyFormData> = { propertyType: item.title, category: 'Lands' };
                      if (item.title === 'Acre' || item.title === 'Plots') {
                        updates.showAmenitiesOption = 'No';
                        updates.amenities = [];
                      }
                      updateFormData(updates);
                    }}
                    className={`flex items-center justify-between p-5 rounded-2xl border cursor-pointer transition-all ${
                      formData.propertyType === item.title 
                        ? 'border-[#4885FF] bg-[#F0F4F9]/60 shadow-[0_4px_15px_rgba(72,133,255,0.1)]' 
                        : 'border-slate-100 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl ${formData.propertyType === item.title ? 'bg-white text-[#035096]' : 'bg-[#F0F4F9] text-slate-500'}`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-[#0B2C5C]">{item.title}</h3>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">{item.desc}</p>
                      </div>
                    </div>
                    <div className={`w-5.5 h-5.5 rounded-full border flex items-center justify-center shrink-0 ${
                      formData.propertyType === item.title ? 'bg-[#4885FF] border-[#4885FF]' : 'border-slate-300'
                    }`}>
                      {formData.propertyType === item.title && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-end gap-5 pt-4 border-t border-slate-100">
              <button 
                type="button"
                onClick={handlePrevious}
                className="bg-[#035096] hover:bg-[#024078] text-white px-11 py-3.5 rounded-2xl font-semibold text-[17px] transition-colors min-w-[160px] text-center focus:outline-none"
              >
                Previous
              </button>
              <button 
                type="button"
                onClick={handleNext}
                className="bg-[#035096] hover:bg-[#024078] text-white px-11 py-3.5 rounded-2xl font-semibold text-[17px] transition-colors min-w-[160px] text-center focus:outline-none"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* --- STEP 3: PROPERTY DETAILS FORM --- */}
        {currentStep === 3 && (
          <form onSubmit={handleSubmit} className="space-y-8 text-left">
            {isHighRiseAptSell ? (
              <div className="bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-slate-100 p-8 sm:p-10 space-y-10">
                {isLandsAcre ? (
                  <>
                    {/* --- Land Acre Property Area & Cost Section --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Property Area Column */}
                      <div className="space-y-4">
                        <label className="block text-sm font-semibold text-[#0B2C5C]">Property Area <span className="text-red-500">*</span></label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="block text-[11px] font-semibold text-slate-500 uppercase">Acre</label>
                            <CustomSelect
                              value={formData.landAcre || ''}
                              onChange={e => handleLandChange('landAcre', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                            >
                              <option value="">Select Acres</option>
                              {Array.from({ length: 100 }, (_, i) => i + 1).map(num => (
                                <option key={num} value={String(num)}>{num} Acre{num > 1 ? 's' : ''}</option>
                              ))}
                            </CustomSelect>
                          </div>
                          <div className="space-y-2">
                            <label className="block text-[11px] font-semibold text-slate-500 uppercase">Guntas</label>
                            <CustomSelect
                              value={formData.landGuntas || ''}
                              onChange={e => handleLandChange('landGuntas', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                            >
                              <option value="">Select Guntas</option>
                              {Array.from({ length: 40 }, (_, i) => i).map(num => (
                                <option key={num} value={String(num)}>{num} Gunta{num !== 1 ? 's' : ''}</option>
                              ))}
                            </CustomSelect>
                          </div>
                        </div>
                      </div>

                      {/* Cost per Acre Column */}
                      <div className="space-y-4">
                        <label className="block text-sm font-semibold text-[#0B2C5C]">Cost per Acre <span className="text-red-500">*</span></label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="block text-[11px] font-semibold text-slate-500 uppercase">Amount</label>
                            <input
                              type="number"
                              placeholder="Enter cost"
                              value={formData.costPerAcre || ''}
                              onChange={e => handleLandChange('costPerAcre', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-[11px] font-semibold text-slate-500 uppercase">Total Cost</label>
                            <input
                              type="text"
                              placeholder="Total Cost"
                              value={formData.totalCost || ''}
                              disabled
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-500 font-medium"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* --- Land Details Cards Section --- */}
                    <div>
                      <h3 className="text-lg font-bold text-[#0B2C5C] mb-4 pb-2 border-b border-slate-100">Land Details</h3>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Plot For</label>
                          <CustomSelect
                            value={formData.plotFor || ''}
                            onChange={e => updateFormData({ plotFor: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                          >
                            <option value="">Select Plot Type(s)</option>
                            <option value="Farming">Farming</option>
                            <option value="Open Plot Development">Open Plot Development</option>
                            <option value="Residential Development">Residential Development</option>
                            <option value="Commercial Development">Commercial Development</option>
                            <option value="Industrial Development">Industrial Development</option>
                            <option value="Manufacturing Development">Manufacturing Development</option>
                            <option value="Others">Others</option>
                          </CustomSelect>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Boundry <span className="text-red-500">*</span></label>
                          <CustomSelect
                            value={formData.boundary || ''}
                            onChange={e => updateFormData({ boundary: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                          >
                            <option value="">Select Boundry</option>
                            <option value="Fenced">Fenced</option>
                            <option value="Open">Open</option>
                            <option value="Wall">Wall</option>
                            <option value="Others">Others</option>
                          </CustomSelect>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Nature of Land</label>
                          <CustomSelect
                            value={formData.natureOfLand || ''}
                            onChange={e => updateFormData({ natureOfLand: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                          >
                            <option value="">Select Nature of Land</option>
                            <option value="Agricultural">Agricultural</option>
                            <option value="Non-Agricultural">Non-Agricultural</option>
                            <option value="Semi-Commercial">Semi-Commercial</option>
                            <option value="Others">Others</option>
                          </CustomSelect>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Soil Type</label>
                          <CustomSelect
                            value={formData.soilType || ''}
                            onChange={e => updateFormData({ soilType: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                          >
                            <option value="">Select Soil Type</option>
                            <option value="Red Soil">Red Soil</option>
                            <option value="Black Soil">Black Soil</option>
                            <option value="Clay Soil">Clay Soil</option>
                            <option value="Sandy Soil">Sandy Soil</option>
                            <option value="Others">Others</option>
                          </CustomSelect>
                        </div>
                      </div>
                    </div>
                  </div>

                    {/* --- Locality Details Section --- */}
                    <div>
                      <h3 className="text-lg font-bold text-[#0B2C5C] mb-4 pb-2 border-b border-slate-100">Locality Details</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">District</label>
                          <CustomSelect
                            value={formData.district || ''}
                            onChange={e => updateFormData({ district: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                          >
                            <option value="">Select District</option>
                            <option value="Hyderabad">Hyderabad</option>
                            <option value="Rangareddy">Rangareddy</option>
                            <option value="Medchal">Medchal</option>
                            <option value="Sangareddy">Sangareddy</option>
                            <option value="Yadadri">Yadadri Bhuvanagiri</option>
                            <option value="Medak">Medak</option>
                            <option value="Nalgonda">Nalgonda</option>
                            <option value="Mahabubnagar">Mahabubnagar</option>
                            <option value="Others">Others</option>
                          </CustomSelect>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Mandal</label>
                          <CustomSelect
                            value={formData.mandal || ''}
                            onChange={e => updateFormData({ mandal: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                          >
                            <option value="">Select</option>
                            <option value="Shamshabad">Shamshabad</option>
                            <option value="Moinabad">Moinabad</option>
                            <option value="Chevella">Chevella</option>
                            <option value="Shankarpally">Shankarpally</option>
                            <option value="Ghatkesar">Ghatkesar</option>
                            <option value="Keesara">Keesara</option>
                            <option value="Maheshwaram">Maheshwaram</option>
                            <option value="Others">Others</option>
                          </CustomSelect>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Village <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            placeholder="Enter village"
                            value={formData.village || ''}
                            onChange={e => updateFormData({ village: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Area</label>
                          <CustomSelect
                            value={formData.landLocalityArea || ''}
                            onChange={e => updateFormData({ landLocalityArea: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                          >
                            <option value="">Select Area</option>
                            <option value="Rural">Rural</option>
                            <option value="Urban">Urban</option>
                            <option value="Sub-urban">Sub-urban</option>
                            <option value="Others">Others</option>
                          </CustomSelect>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Land Use Zone</label>
                          <CustomSelect
                            value={formData.landUseZone || ''}
                            onChange={e => updateFormData({ landUseZone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                          >
                            <option value="">Select Zone</option>
                            <option value="Agricultural Zone">Agricultural Zone</option>
                            <option value="Residential Zone">Residential Zone</option>
                            <option value="Commercial Zone">Commercial Zone</option>
                            <option value="Industrial Zone">Industrial Zone</option>
                            <option value="Conservation Zone">Conservation Zone</option>
                            <option value="Others">Others</option>
                          </CustomSelect>
                        </div>
                      </div>
                    </div>

                    {/* --- Upload Copy Section --- */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-[#0B2C5C]">Upload scan copy of passbook and Sale deed</label>
                      <div className="border-2 border-dashed border-slate-200 hover:border-[#4885FF] rounded-2xl p-8 text-center bg-slate-50/50 transition-colors relative cursor-pointer">
                        <input 
                          type="file" 
                          multiple 
                          accept=".pdf,image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={() => {
                            // Optional upload copy hooks
                          }}
                        />
                        <div className="flex flex-col items-center justify-center gap-2">
                          <div className="p-3 bg-white rounded-full shadow-sm text-[#035096]">
                            <Upload className="w-6 h-6" />
                          </div>
                          <span className="text-sm font-semibold text-[#0B2C5C]">Choose Files or drag them here</span>
                          <span className="text-xs text-slate-400">Supports PDF, PNG, JPG, JPEG</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                        <strong>Note:</strong> To ensure a speedy sale, we thoroughly review the passbook with the owner for complete accuracy. This meticulous approach allows our team to craft the most impactful marketing strategy for your property.
                      </p>
                    </div>

                    {/* --- Accessibility / Road connectivity Section --- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Highway <span className="text-red-500">*</span></label>
                        <CustomSelect
                          value={formData.highway || ''}
                          onChange={e => updateFormData({ highway: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                        >
                          <option value="">Select</option>
                          <option value="National Highway">National Highway</option>
                          <option value="State Highway">State Highway</option>
                          <option value="Regular Road">Regular Road</option>
                          <option value="No Highway Connectivity">No Highway Connectivity</option>
                        </CustomSelect>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Distance from ORR (KMs) <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          placeholder="KMs"
                          value={formData.distanceFromOrr || ''}
                          onChange={e => updateFormData({ distanceFromOrr: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Road Faced Properties</label>
                        <CustomSelect
                          value={formData.roadFacedProperties || ''}
                          onChange={e => updateFormData({ roadFacedProperties: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                        >
                          <option value="">Select</option>
                          <option value="1 Side Road">1 Side Road</option>
                          <option value="2 Side Corner">2 Side Corner</option>
                          <option value="3 Side Open">3 Side Open</option>
                          <option value="4 Side Open">4 Side Open</option>
                        </CustomSelect>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Approach Road</label>
                        <input
                          type="text"
                          placeholder="Approach Road (e.g. 40ft)"
                          value={formData.approachRoad || ''}
                          onChange={e => updateFormData({ approachRoad: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                        />
                      </div>
                    </div>

                    {/* --- Infrastructure / Crop Details --- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Having Electricity Connection</label>
                        <CustomSelect
                          value={formData.electricityConnection || ''}
                          onChange={e => updateFormData({ electricityConnection: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                        >
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </CustomSelect>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Plantation/Crop</label>
                        <input
                          type="text"
                          placeholder="Plantation/Crop"
                          value={formData.plantationCrop || ''}
                          onChange={e => updateFormData({ plantationCrop: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Water Source</label>
                        <CustomSelect
                          value={formData.waterSource || ''}
                          onChange={e => updateFormData({ waterSource: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                        >
                          <option value="">Select</option>
                          <option value="Borewell">Borewell</option>
                          <option value="Canal / River">Canal / River</option>
                          <option value="Open Well">Open Well</option>
                          <option value="None">None</option>
                        </CustomSelect>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Is Pahani's Available?</label>
                        <CustomSelect
                          value={formData.isPahaniAvailable || ''}
                          onChange={e => updateFormData({ isPahaniAvailable: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                        >
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </CustomSelect>
                      </div>
                    </div>

                    {/* --- Property Brief Textarea --- */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-[#0B2C5C]">More Brief about properties</label>
                      <textarea
                        placeholder="Write something more about your property"
                        value={formData.moreBrief || ''}
                        onChange={e => updateFormData({ moreBrief: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 h-24 resize-none"
                      />
                    </div>

                    {/* --- Map Configuration --- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Select Map options</label>
                        <CustomSelect
                          value={formData.mapOptions || ''}
                          onChange={e => updateFormData({ mapOptions: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                        >
                          <option value="">Select</option>
                          <option value="Google Map Link">Google Map Link</option>
                          <option value="Latitude & Longitude">Latitude & Longitude</option>
                          <option value="Survey Number">Survey Number</option>
                        </CustomSelect>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Map Option Value</label>
                        <input
                          type="text"
                          placeholder="Enter Map value"
                          value={formData.mapOptionValue || ''}
                          onChange={e => updateFormData({ mapOptionValue: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Is Map?</label>
                        <input
                          type="text"
                          value="Exactly"
                          disabled
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-500"
                        />
                        <p className="text-[11px] text-slate-400 mt-1 italic">
                          (Select any one as per your convinence)
                        </p>
                      </div>
                    </div>
                  </>
                ) : isLandsPlots ? (
                  <>
                    {/* --- Plot Demensions & Cost per yds Section --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Plot Demensions Column */}
                      <div className="space-y-4">
                        <label className="block text-sm font-semibold text-[#0B2C5C]">Plot Demensions <span className="text-red-500">*</span></label>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <label className="block text-[11px] font-semibold text-slate-500 uppercase">Plot Area(Sq.Yds) <span className="text-red-500">*</span></label>
                            <input
                              type="number"
                              placeholder="Plot Area"
                              value={formData.plotAreaSqYds || ''}
                              onChange={e => handlePlotChange('plotAreaSqYds', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-[11px] font-semibold text-slate-500 uppercase">Length (Sft)</label>
                            <input
                              type="number"
                              placeholder="Length"
                              value={formData.plotLength || ''}
                              onChange={e => handlePlotChange('plotLength', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-[11px] font-semibold text-slate-500 uppercase">Width (Sft)</label>
                            <input
                              type="number"
                              placeholder="Width"
                              value={formData.plotWidth || ''}
                              onChange={e => handlePlotChange('plotWidth', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Cost per yds Column */}
                      <div className="space-y-4">
                        <label className="block text-sm font-semibold text-[#0B2C5C]">Cost per yds <span className="text-red-500">*</span></label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="block text-[11px] font-semibold text-slate-500 uppercase">Amount</label>
                            <input
                              type="number"
                              placeholder="Enter cost"
                              value={formData.costPerYd || ''}
                              onChange={e => handlePlotChange('costPerYd', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-[11px] font-semibold text-slate-500 uppercase">Total Cost</label>
                            <input
                              type="text"
                              placeholder="Total Cost"
                              value={formData.totalCost || ''}
                              disabled
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-500 font-medium"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* --- General Specifications Section --- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Price Negotiable</label>
                        <CustomSelect
                          value={formData.priceNegotiable || 'Yes'}
                          onChange={e => updateFormData({ priceNegotiable: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </CustomSelect>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Plot For</label>
                        <CustomSelect
                          value={formData.plotFor || ''}
                          onChange={e => updateFormData({ plotFor: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                        >
                          <option value="">Select Plot Type(s)</option>
                          <option value="Farming">Farming</option>
                          <option value="Open Plot Development">Open Plot Development</option>
                          <option value="Residential Development">Residential Development</option>
                          <option value="Commercial Development">Commercial Development</option>
                          <option value="Industrial Development">Industrial Development</option>
                          <option value="Manufacturing Development">Manufacturing Development</option>
                          <option value="Others">Others</option>
                        </CustomSelect>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Permissions</label>
                        <CustomSelect
                          value={formData.permissions || 'HMDA'}
                          onChange={e => updateFormData({ permissions: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                        >
                          <option value="HMDA">HMDA</option>
                          <option value="YTDA">YTDA</option>
                          <option value="DTCP">DTCP</option>
                          <option value="FARM LAND">FARM LAND</option>
                          <option value="GP">GP</option>
                          <option value="HUDA">HUDA</option>
                          <option value="Others">Others</option>
                        </CustomSelect>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Roads type at property</label>
                        <CustomSelect
                          value={formData.roadsType || 'Blacktop'}
                          onChange={e => updateFormData({ roadsType: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                        >
                          <option value="Blacktap">Blacktap</option>
                          <option value="CC Road">CC Road</option>
                          <option value="Others">Others</option>
                        </CustomSelect>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">TLP/LP Number</label>
                        <input
                          type="text"
                          placeholder="TLP/LP Number"
                          value={formData.tlpLpNumber || ''}
                          onChange={e => updateFormData({ tlpLpNumber: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Facing <span className="text-red-500">*</span></label>
                        <CustomSelect
                          value={formData.facing || ''}
                          onChange={e => updateFormData({ facing: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                        >
                          <option value="">Select Facing</option>
                          <option value="East">East</option>
                          <option value="West">West</option>
                          <option value="North">North</option>
                          <option value="South">South</option>
                          <option value="North-East">North-East</option>
                          <option value="North-West">North-West</option>
                          <option value="South-East">South-East</option>
                          <option value="South-West">South-West</option>
                        </CustomSelect>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Rera Number</label>
                        <input
                          type="text"
                          placeholder="Rera Number"
                          value={formData.reraNumber || ''}
                          onChange={e => updateFormData({ reraNumber: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">New Project</label>
                        <CustomSelect
                          value={formData.newProject || 'Yes'}
                          onChange={e => updateFormData({ newProject: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </CustomSelect>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Resale</label>
                        <CustomSelect
                          value={formData.resale || 'Yes'}
                          onChange={e => updateFormData({ resale: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </CustomSelect>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2 md:col-span-1">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Developer Details</label>
                        <textarea
                          placeholder="Developer Details"
                          value={formData.developerDetails || ''}
                          onChange={e => updateFormData({ developerDetails: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 h-[50px] resize-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Venture Started on</label>
                        <input
                          type="text"
                          placeholder="DD-MM-YYYY"
                          value={formData.ventureStartedOn || ''}
                          onChange={e => updateFormData({ ventureStartedOn: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Width of Roadfacing</label>
                        <input
                          type="text"
                          placeholder="Enter in feetx"
                          value={formData.widthOfRoadfacing || ''}
                          onChange={e => updateFormData({ widthOfRoadfacing: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Corner Plot</label>
                        <CustomSelect
                          value={formData.cornerPlot || 'Yes'}
                          onChange={e => updateFormData({ cornerPlot: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </CustomSelect>
                      </div>
                    </div>

                    {/* --- Venture Details Section --- */}
                    <div>
                      <h3 className="text-lg font-bold text-[#0B2C5C] mb-4 pb-2 border-b border-slate-100">Venture Details</h3>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Fence Security <span className="text-red-500">*</span></label>
                          <CustomSelect
                            value={formData.fenceSecurity || 'Wire Fencing'}
                            onChange={e => updateFormData({ fenceSecurity: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                          >
                            <option value="Wire Fencing">Wire Fencing</option>
                            <option value="Compound Wall">Compound Wall</option>
                            <option value="None">None</option>
                            <option value="Others">Others</option>
                          </CustomSelect>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Man Security</label>
                          <CustomSelect
                            value={formData.manSecurity || 'Yes'}
                            onChange={e => updateFormData({ manSecurity: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                          >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </CustomSelect>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">In Plot any plantation</label>
                          <CustomSelect
                            value={formData.inPlotPlantation || 'Yes'}
                            onChange={e => updateFormData({ inPlotPlantation: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                          >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </CustomSelect>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Venture in Acres</label>
                          <input
                            type="text"
                            placeholder="Venture in Acres"
                            value={formData.ventureInAcres || ''}
                            onChange={e => updateFormData({ ventureInAcres: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Near any FTL</label>
                          <CustomSelect
                            value={formData.nearFtl || 'Yes'}
                            onChange={e => updateFormData({ nearFtl: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                          >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </CustomSelect>
                        </div>
                      </div>
                    </div>
                  </div>

                    {/* --- Locality Details Section --- */}
                    <div>
                      <h3 className="text-lg font-bold text-[#0B2C5C] mb-4 pb-2 border-b border-slate-100">Locality Details</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">District</label>
                          <CustomSelect
                            value={formData.district || ''}
                            onChange={e => updateFormData({ district: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                          >
                            <option value="">Select District</option>
                            <option value="Hyderabad">Hyderabad</option>
                            <option value="Rangareddy">Rangareddy</option>
                            <option value="Medchal">Medchal</option>
                            <option value="Sangareddy">Sangareddy</option>
                            <option value="Yadadri">Yadadri Bhuvanagiri</option>
                            <option value="Medak">Medak</option>
                            <option value="Nalgonda">Nalgonda</option>
                            <option value="Mahabubnagar">Mahabubnagar</option>
                            <option value="Others">Others</option>
                          </CustomSelect>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Mandal</label>
                          <CustomSelect
                            value={formData.mandal || ''}
                            onChange={e => updateFormData({ mandal: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                          >
                            <option value="">Select</option>
                            <option value="Shamshabad">Shamshabad</option>
                            <option value="Moinabad">Moinabad</option>
                            <option value="Chevella">Chevella</option>
                            <option value="Shankarpally">Shankarpally</option>
                            <option value="Ghatkesar">Ghatkesar</option>
                            <option value="Keesara">Keesara</option>
                            <option value="Maheshwaram">Maheshwaram</option>
                            <option value="Others">Others</option>
                          </CustomSelect>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Village <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            placeholder="Enter village"
                            value={formData.village || ''}
                            onChange={e => updateFormData({ village: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Area</label>
                          <CustomSelect
                            value={formData.landLocalityArea || ''}
                            onChange={e => updateFormData({ landLocalityArea: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                          >
                            <option value="">Select Area</option>
                            <option value="Rural">Rural</option>
                            <option value="Urban">Urban</option>
                            <option value="Sub-urban">Sub-urban</option>
                            <option value="Others">Others</option>
                          </CustomSelect>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Land Use Zone</label>
                          <CustomSelect
                            value={formData.landUseZone || ''}
                            onChange={e => updateFormData({ landUseZone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                          >
                            <option value="">Select Zone</option>
                            <option value="Agricultural Zone">Agricultural Zone</option>
                            <option value="Residential Zone">Residential Zone</option>
                            <option value="Commercial Zone">Commercial Zone</option>
                            <option value="Industrial Zone">Industrial Zone</option>
                            <option value="Conservation Zone">Conservation Zone</option>
                            <option value="Others">Others</option>
                          </CustomSelect>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Highway <span className="text-red-500">*</span></label>
                          <CustomSelect
                            value={formData.highway || ''}
                            onChange={e => updateFormData({ highway: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                          >
                            <option value="">Select</option>
                            <option value="National Highway">National Highway</option>
                            <option value="State Highway">State Highway</option>
                            <option value="Regular Road">Regular Road</option>
                            <option value="No Highway Connectivity">No Highway Connectivity</option>
                          </CustomSelect>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Distance from NHW <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            placeholder="Distance from NHW"
                            value={formData.distanceFromNhw || ''}
                            onChange={e => updateFormData({ distanceFromNhw: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Nearby ORR exit numer</label>
                          <CustomSelect
                            value={formData.nearbyOrrExit || 'Select'}
                            onChange={e => updateFormData({ nearbyOrrExit: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                          >
                            <option value="Select">Select</option>
                            <option value="Exit 1">Exit 1</option>
                            <option value="Exit 2">Exit 2</option>
                            <option value="Exit 3">Exit 3</option>
                            <option value="Exit 4">Exit 4</option>
                          </CustomSelect>
                        </div>
                      </div>
                    </div>

                    {/* --- Venture Amenities & Highlights --- */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-[#0B2C5C]">Venture Amenities</label>
                        <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2">
                          {[
                            "Park with play area",
                            "Walking track with landscape",
                            "Over head tanks",
                            "LED street lights around project",
                            "Under Ground electrification",
                            "Water supply and drainage system",
                            "Avenue plantation",
                            "60, 40 & 30 CC roads",
                            "Compound wall around the project"
                          ].map(item => (
                            <label key={item} className="flex items-start gap-2 cursor-pointer text-xs text-slate-800">
                              <input
                                type="checkbox"
                                checked={(formData.ventureAmenities || []).includes(item)}
                                onChange={() => {
                                  const current = formData.ventureAmenities || [];
                                  const updated = current.includes(item) ? current.filter(i => i !== item) : [...current, item];
                                  updateFormData({ ventureAmenities: updated });
                                }}
                                className="w-3.5 h-3.5 mt-0.5 rounded text-[#035096] border-slate-300 focus:ring-[#035096]"
                              />
                              <span>{item}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-[#0B2C5C]">Additional Amenities</label>
                        <textarea
                          placeholder="Enter Additional Amenities"
                          value={formData.additionalAmenities || ''}
                          onChange={e => updateFormData({ additionalAmenities: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 h-[200px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-[#0B2C5C]">Location Highlights</label>
                        <textarea
                          placeholder="Location Highlights"
                          value={formData.locationHighlights || ''}
                          onChange={e => updateFormData({ locationHighlights: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 h-[200px] resize-none"
                        />
                      </div>
                    </div>

                    {/* --- Property Brief Textarea --- */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-[#0B2C5C]">More Brief about properties</label>
                      <textarea
                        placeholder="Write something more about your property"
                        value={formData.moreBrief || ''}
                        onChange={e => updateFormData({ moreBrief: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 h-24 resize-none"
                      />
                    </div>

                    {/* --- Map Configuration --- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Select Map options</label>
                        <CustomSelect
                          value={formData.mapOptions || ''}
                          onChange={e => updateFormData({ mapOptions: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                        >
                          <option value="">Map Location link</option>
                          <option value="Google Map Link">Google Map Link</option>
                          <option value="Latitude & Longitude">Latitude & Longitude</option>
                          <option value="Survey Number">Survey Number</option>
                        </CustomSelect>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Map Link / Cordinates</label>
                        <input
                          type="text"
                          placeholder="Map Link / Cordinates"
                          value={formData.mapOptionValue || ''}
                          onChange={e => updateFormData({ mapOptionValue: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Is Map?</label>
                        <input
                          type="text"
                          value="Exactly"
                          disabled
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-500"
                        />
                        <p className="text-[11px] text-slate-400 mt-1 italic">
                          (Select any one as per your convinence)
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* --- Locality Details Section --- */}
                <div>
                  <h3 className="text-lg font-bold text-[#0B2C5C] mb-4 pb-2 border-b border-slate-100">Locality Details</h3>
                  <div className={`grid grid-cols-1 sm:grid-cols-2 ${(formData.intent === 'rent' && !(isCommercialOfficeSpaceSell || isCommercialIndustrial || isCommercialShed)) ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-6`}>
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-slate-500 uppercase">(by) Area</label>
                      <input 
                        type="text" 
                        placeholder="Area"
                        value={formData.byArea || ''}
                        onChange={e => updateFormData({ byArea: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-slate-500 uppercase">Locality <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        placeholder="Locality"
                        value={formData.locality || ''}
                        onChange={e => updateFormData({ locality: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-slate-500 uppercase">Project/ Building Name</label>
                      <input 
                        type="text" 
                        placeholder="Project/ Building Name"
                        value={formData.projectBuildingName || ''}
                        onChange={e => updateFormData({ projectBuildingName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                      />
                    </div>
                    {(isCommercialOfficeSpaceSell || isCommercialShop || isCommercialShowroom || isCommercialGodown || isCommercialIndustrial || isCommercialShed) ? (
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Property at</label>
                        <CustomSelect 
                          value={formData.propertyAt || 'Select'}
                          onChange={e => updateFormData({ propertyAt: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                        >
                          <option value="Select">Select</option>
                          <option value="IT Park">IT Park</option>
                          <option value="Business Park">Business Park</option>
                          <option value="Prime Location">Prime Location</option>
                          <option value="Others">Others</option>
                        </CustomSelect>
                      </div>
                    ) : (
                      formData.intent !== 'rent' && (
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Developed by</label>
                          <input 
                            type="text" 
                            placeholder="Developed by"
                            value={formData.developedBy || ''}
                            onChange={e => updateFormData({ developedBy: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* --- Property Details Section --- */}
                <div>
                  <h3 className="text-lg font-bold text-[#0B2C5C] mb-4 pb-2 border-b border-slate-100">Property Details</h3>
                  <div className="space-y-6">
                    {(isCommercialOfficeSpaceSell || isCommercialShop || isCommercialShowroom || isCommercialGodown || isCommercialIndustrial || isCommercialShed) ? (
                      <>
                        {(isCommercialOfficeSpaceSell || isCommercialShowroom || isCommercialIndustrial) && (
                          <>
                            {/* Commercial Row 1 */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                              <div className="space-y-2">
                                <label className="block text-xs font-semibold text-slate-500 uppercase">No. of Seatings</label>
                                <input 
                                  type="number" 
                                  placeholder="Seats"
                                  value={formData.seatingsCount || ''}
                                  onChange={e => updateFormData({ seatingsCount: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="block text-xs font-semibold text-slate-500 uppercase">Reception</label>
                                <CustomSelect 
                                  value={formData.receptionAvailable || 'Select'}
                                  onChange={e => updateFormData({ receptionAvailable: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                                >
                                  <option value="Select">Select</option>
                                  <option value="Yes">Yes</option>
                                  <option value="No">No</option>
                                </CustomSelect>
                              </div>
                              <div className="space-y-2">
                                <label className="block text-xs font-semibold text-slate-500 uppercase">Cabins</label>
                                <input 
                                  type="number" 
                                  placeholder="Cabins"
                                  value={formData.cabinsCount || ''}
                                  onChange={e => updateFormData({ cabinsCount: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="block text-xs font-semibold text-slate-500 uppercase">Conference Rooms</label>
                                <input 
                                  type="number" 
                                  placeholder="Conference Rooms"
                                  value={formData.conferenceRoomsCount || ''}
                                  onChange={e => updateFormData({ conferenceRoomsCount: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                                />
                              </div>
                            </div>

                            {/* Commercial Row 2 */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                              <div className="space-y-2">
                                <label className="block text-xs font-semibold text-slate-500 uppercase">Meeting Rooms</label>
                                <input 
                                  type="number" 
                                  placeholder="Meeting Rooms"
                                  value={formData.meetingRoomsCount || ''}
                                  onChange={e => updateFormData({ meetingRoomsCount: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="block text-xs font-semibold text-slate-500 uppercase">Pantry</label>
                                <input 
                                  type="number" 
                                  placeholder="Pantry"
                                  value={formData.pantryCount || ''}
                                  onChange={e => updateFormData({ pantryCount: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="block text-xs font-semibold text-slate-500 uppercase">Washrooms</label>
                                <input 
                                  type="number" 
                                  placeholder="Washrooms"
                                  value={formData.washroomsCount || ''}
                                  onChange={e => updateFormData({ washroomsCount: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="block text-xs font-semibold text-slate-500 uppercase">Store Rooms</label>
                                <input 
                                  type="number" 
                                  placeholder="Store Rooms"
                                  value={formData.storeRoomsCount || ''}
                                  onChange={e => updateFormData({ storeRoomsCount: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                                />
                              </div>
                            </div>
                          </>
                        )}

                        {isCommercialGodown && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="space-y-2">
                              <label className="block text-xs font-semibold text-slate-500 uppercase">Godown Type</label>
                              <CustomSelect 
                                value={formData.godownType || 'AC'}
                                onChange={e => updateFormData({ godownType: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                              >
                                <option value="AC">AC</option>
                                <option value="Non-AC">Non-AC</option>
                                <option value="Cold Storage">Cold Storage</option>
                              </CustomSelect>
                            </div>
                            <div className="space-y-2">
                              <label className="block text-xs font-semibold text-slate-500 uppercase">Closed Shed Carpet Area</label>
                              <div className="flex rounded-xl border border-slate-200 focus-within:border-[#4885FF] relative">
                                <input 
                                  type="text" 
                                  placeholder="Enter Carpet Area"
                                  value={formData.closedShedCarpetArea || ''}
                                  onChange={e => updateFormData({ closedShedCarpetArea: e.target.value })}
                                  className="w-full px-4 py-3 rounded-l-xl focus:outline-none text-sm text-slate-800"
                                />
                                <CustomSelect 
                                  value={formData.closedShedCarpetAreaUnit || 'Sq.Ft'}
                                  onChange={e => updateFormData({ closedShedCarpetAreaUnit: e.target.value })}
                                  className="px-2 bg-slate-50 border-l border-slate-200 focus:outline-none text-xs text-slate-600 bg-white"
                                >
                                  <option value="Sq.Ft">Sq.Ft</option>
                                  <option value="Sq.Yards">Sq.Yards</option>
                                </CustomSelect>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="block text-xs font-semibold text-slate-500 uppercase">Open Space Carpet Area</label>
                              <div className="flex rounded-xl border border-slate-200 focus-within:border-[#4885FF] relative">
                                <input 
                                  type="text" 
                                  placeholder="Enter Builtup Area"
                                  value={formData.openSpaceCarpetArea || ''}
                                  onChange={e => updateFormData({ openSpaceCarpetArea: e.target.value })}
                                  className="w-full px-4 py-3 rounded-l-xl focus:outline-none text-sm text-slate-800"
                                />
                                <CustomSelect 
                                  value={formData.openSpaceCarpetAreaUnit || 'Sq.Ft'}
                                  onChange={e => updateFormData({ openSpaceCarpetAreaUnit: e.target.value })}
                                  className="px-2 bg-slate-50 border-l border-slate-200 focus:outline-none text-xs text-slate-600 bg-white"
                                >
                                  <option value="Sq.Ft">Sq.Ft</option>
                                  <option value="Sq.Yards">Sq.Yards</option>
                                </CustomSelect>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="block text-xs font-semibold text-slate-500 uppercase">Total Carpet Area</label>
                              <div className="flex rounded-xl border border-slate-200 focus-within:border-[#4885FF] relative">
                                <input 
                                  type="text" 
                                  placeholder="Enter Total"
                                  value={formData.totalCarpetAreaVal || ''}
                                  onChange={e => updateFormData({ totalCarpetAreaVal: e.target.value })}
                                  className="w-full px-4 py-3 rounded-l-xl focus:outline-none text-sm text-slate-800"
                                />
                                <CustomSelect 
                                  value={formData.totalCarpetAreaUnit || 'Sq.Ft'}
                                  onChange={e => updateFormData({ totalCarpetAreaUnit: e.target.value })}
                                  className="px-2 bg-slate-50 border-l border-slate-200 focus:outline-none text-xs text-slate-600 bg-white"
                                >
                                  <option value="Sq.Ft">Sq.Ft</option>
                                  <option value="Sq.Yards">Sq.Yards</option>
                                </CustomSelect>
                              </div>
                            </div>
                          </div>
                        )}

                        {isCommercialShed && (
                          <>
                            {/* Shed Row 1 */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                              <div className="space-y-2">
                                <label className="block text-xs font-semibold text-slate-500 uppercase">Work Mode</label>
                                <CustomSelect 
                                  value={formData.workMode || 'Factory'}
                                  onChange={e => updateFormData({ workMode: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                                >
                                  <option value="Factory">Factory</option>
                                  <option value="Manufacturing">Manufacturing</option>
                                  <option value="Storage">Storage</option>
                                  <option value="Others">Others</option>
                                </CustomSelect>
                              </div>
                              <div className="space-y-2">
                                <label className="block text-xs font-semibold text-slate-500 uppercase">Closed Shed Carpet Area</label>
                                <div className="flex rounded-xl border border-slate-200 focus-within:border-[#4885FF] relative">
                                  <input 
                                    type="text" 
                                    placeholder="Enter Carpet Area"
                                    value={formData.closedShedCarpetArea || ''}
                                    onChange={e => updateFormData({ closedShedCarpetArea: e.target.value })}
                                    className="w-full px-4 py-3 rounded-l-xl focus:outline-none text-sm text-slate-800"
                                  />
                                  <CustomSelect 
                                    value={formData.closedShedCarpetAreaUnit || 'Sq.Ft'}
                                    onChange={e => updateFormData({ closedShedCarpetAreaUnit: e.target.value })}
                                    className="px-2 bg-slate-50 border-l border-slate-200 focus:outline-none text-xs text-slate-600 bg-white"
                                  >
                                    <option value="Sq.Ft">Sq.Ft</option>
                                    <option value="Sq.Yards">Sq.Yards</option>
                                  </CustomSelect>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <label className="block text-xs font-semibold text-slate-500 uppercase">Open Space Carpet Area</label>
                                <div className="flex rounded-xl border border-slate-200 focus-within:border-[#4885FF] relative">
                                  <input 
                                    type="text" 
                                    placeholder="Enter Builtup Area"
                                    value={formData.openSpaceCarpetArea || ''}
                                    onChange={e => updateFormData({ openSpaceCarpetArea: e.target.value })}
                                    className="w-full px-4 py-3 rounded-l-xl focus:outline-none text-sm text-slate-800"
                                  />
                                  <CustomSelect 
                                    value={formData.openSpaceCarpetAreaUnit || 'Sq.Ft'}
                                    onChange={e => updateFormData({ openSpaceCarpetAreaUnit: e.target.value })}
                                    className="px-2 bg-slate-50 border-l border-slate-200 focus:outline-none text-xs text-slate-600 bg-white"
                                  >
                                    <option value="Sq.Ft">Sq.Ft</option>
                                    <option value="Sq.Yards">Sq.Yards</option>
                                  </CustomSelect>
                                </div>
                              </div>
                            </div>
                            
                            {/* Shed Row 2 */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                              <div className="space-y-2">
                                <label className="block text-xs font-semibold text-slate-500 uppercase">Total Carpet Area</label>
                                <div className="flex rounded-xl border border-slate-200 focus-within:border-[#4885FF] relative">
                                  <input 
                                    type="text" 
                                    placeholder="Enter Total Carpet Area"
                                    value={formData.totalCarpetAreaVal || ''}
                                    onChange={e => updateFormData({ totalCarpetAreaVal: e.target.value })}
                                    className="w-full px-4 py-3 rounded-l-xl focus:outline-none text-sm text-slate-800"
                                  />
                                  <CustomSelect 
                                    value={formData.totalCarpetAreaUnit || 'Sq.Ft'}
                                    onChange={e => updateFormData({ totalCarpetAreaUnit: e.target.value })}
                                    className="px-2 bg-slate-50 border-l border-slate-200 focus:outline-none text-xs text-slate-600 bg-white"
                                  >
                                    <option value="Sq.Ft">Sq.Ft</option>
                                    <option value="Sq.Yards">Sq.Yards</option>
                                  </CustomSelect>
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        {isCommercialShowroom && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="space-y-2">
                              <label className="block text-xs font-semibold text-slate-500 uppercase">Work Space</label>
                              <input 
                                type="text" 
                                placeholder="Enter Garage/Repairing shed"
                                value={formData.workSpace || ''}
                                onChange={e => updateFormData({ workSpace: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="block text-xs font-semibold text-slate-500 uppercase">Garage Shed Carpet Area</label>
                              <div className="flex rounded-xl border border-slate-200 focus-within:border-[#4885FF] relative">
                                <input 
                                  type="text" 
                                  placeholder="Enter Garage"
                                  value={formData.garageShedCarpetArea || ''}
                                  onChange={e => updateFormData({ garageShedCarpetArea: e.target.value })}
                                  className="w-full px-4 py-3 rounded-l-xl focus:outline-none text-sm text-slate-800"
                                />
                                <CustomSelect 
                                  value={formData.garageShedCarpetAreaUnit || 'Sq.Ft'}
                                  onChange={e => updateFormData({ garageShedCarpetAreaUnit: e.target.value })}
                                  className="px-2 bg-slate-50 border-l border-slate-200 focus:outline-none text-xs text-slate-600 bg-white"
                                >
                                  <option value="Sq.Ft">Sq.Ft</option>
                                  <option value="Sq.Yards">Sq.Yards</option>
                                </CustomSelect>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="block text-xs font-semibold text-slate-500 uppercase">Showroom Space Carpet Area</label>
                              <div className="flex rounded-xl border border-slate-200 focus-within:border-[#4885FF] relative">
                                <input 
                                  type="text" 
                                  placeholder="Enter Showroom"
                                  value={formData.showroomSpaceCarpetArea || ''}
                                  onChange={e => updateFormData({ showroomSpaceCarpetArea: e.target.value })}
                                  className="w-full px-4 py-3 rounded-l-xl focus:outline-none text-sm text-slate-800"
                                />
                                <CustomSelect 
                                  value={formData.showroomSpaceCarpetAreaUnit || 'Sq.Ft'}
                                  onChange={e => updateFormData({ showroomSpaceCarpetAreaUnit: e.target.value })}
                                  className="px-2 bg-slate-50 border-l border-slate-200 focus:outline-none text-xs text-slate-600 bg-white"
                                >
                                  <option value="Sq.Ft">Sq.Ft</option>
                                  <option value="Sq.Yards">Sq.Yards</option>
                                </CustomSelect>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="block text-xs font-semibold text-slate-500 uppercase">Total Carpet Area</label>
                              <div className="flex rounded-xl border border-slate-200 focus-within:border-[#4885FF] relative">
                                <input 
                                  type="text" 
                                  placeholder="Enter Total"
                                  value={formData.totalCarpetAreaVal || ''}
                                  onChange={e => updateFormData({ totalCarpetAreaVal: e.target.value })}
                                  className="w-full px-4 py-3 rounded-l-xl focus:outline-none text-sm text-slate-800"
                                />
                                <CustomSelect 
                                  value={formData.totalCarpetAreaUnit || 'Sq.Ft'}
                                  onChange={e => updateFormData({ totalCarpetAreaUnit: e.target.value })}
                                  className="px-2 bg-slate-50 border-l border-slate-200 focus:outline-none text-xs text-slate-600 bg-white"
                                >
                                  <option value="Sq.Ft">Sq.Ft</option>
                                  <option value="Sq.Yards">Sq.Yards</option>
                                </CustomSelect>
                              </div>
                            </div>
                          </div>
                        )}

                        {isCommercialShop && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="space-y-2">
                              <label className="block text-xs font-semibold text-slate-500 uppercase">Shutters Count</label>
                              <CustomSelect 
                                value={formData.shuttersCount || 'Select'}
                                onChange={e => updateFormData({ shuttersCount: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                              >
                                <option value="Select">Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="More than 5">More than 5</option>
                              </CustomSelect>
                            </div>
                          </div>
                        )}

                        {/* Commercial Row 3 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Property Stage</label>
                            <CustomSelect 
                              value={formData.propertyStage || ''}
                              onChange={e => updateFormData({ propertyStage: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                            >
                              <option value="">Select</option>
                              <option value="Ready to Move / New Project">Ready to Move / New Project</option>
                              <option value="Resale">Resale</option>
                              <option value="Bare Shell Property">Bare Shell Property</option>
                            </CustomSelect>
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Property Area</label>
                            <div className="flex rounded-xl border border-slate-200 focus-within:border-[#4885FF] relative">
                              <input 
                                type="text" 
                                placeholder="Enter Bare Property Area"
                                value={formData.propertyAreaVal || ''}
                                onChange={e => updateFormData({ propertyAreaVal: e.target.value })}
                                className="w-full px-4 py-3 rounded-l-xl focus:outline-none text-sm text-slate-800"
                              />
                              <CustomSelect 
                                value={formData.propertyAreaUnit || 'Sq.Ft'}
                                onChange={e => updateFormData({ propertyAreaUnit: e.target.value })}
                                className="px-2 bg-slate-50 border-l border-slate-200 focus:outline-none text-xs text-slate-600 bg-white"
                              >
                                <option value="Sq.Ft">Sq.Ft</option>
                                <option value="Sq.Yards">Sq.Yards</option>
                              </CustomSelect>
                            </div>
                          </div>
                        </div>

                        {/* Commercial Row 4 */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Property Age in Years</label>
                            <input 
                              type="text" 
                              placeholder="Age"
                              value={formData.propertyAge || ''}
                              onChange={e => updateFormData({ propertyAge: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Property Available From</label>
                            <input 
                              type="text" 
                              placeholder="Available From"
                              value={formData.availableFrom || ''}
                              onChange={e => updateFormData({ availableFrom: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Door No.</label>
                            <input 
                              type="text" 
                              placeholder="Door No."
                              value={formData.doorNo || ''}
                              onChange={e => updateFormData({ doorNo: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                        </div>
                        
                        {/* Commercial Row 5 */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Additional Rooms</label>
                            <input 
                              type="text" 
                              placeholder="Additional Rooms"
                              value={formData.additionalRooms || ''}
                              onChange={e => updateFormData({ additionalRooms: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Number of Bathrooms</label>
                            <input 
                              type="text" 
                              placeholder="Bathrooms"
                              value={formData.bathroomCount || ''}
                              onChange={e => updateFormData({ bathroomCount: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Number of Balconies</label>
                            <input 
                              type="text" 
                              placeholder="Balconies"
                              value={formData.balconyCount || ''}
                              onChange={e => updateFormData({ balconyCount: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Property Stage</label>
                            <CustomSelect 
                              value={formData.propertyStage || ''}
                              onChange={e => updateFormData({ propertyStage: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                            >
                              <option value="">Select</option>
                              <option value="Ready to Move">Ready to Move</option>
                              <option value="Under Construction">Under Construction</option>
                            </CustomSelect>
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Property Age in Years</label>
                            <input 
                              type="text" 
                              placeholder="Age"
                              value={formData.propertyAge || ''}
                              onChange={e => updateFormData({ propertyAge: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Property Available From</label>
                            <input 
                              type="text" 
                              placeholder="Available From"
                              value={formData.availableFrom || ''}
                              onChange={e => updateFormData({ availableFrom: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Flat No.</label>
                            <input 
                              type="text" 
                              placeholder="Flat No."
                              value={formData.flatNo || ''}
                              onChange={e => updateFormData({ flatNo: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Number of Bedrooms</label>
                            <CustomSelect 
                              value={formData.bedroomCount || ''}
                              onChange={e => updateFormData({ bedroomCount: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                            >
                              <option value="">Select</option>
                              <option value="1 BHK">1 BHK</option>
                              <option value="2 BHK">2 BHK</option>
                              <option value="3 BHK">3 BHK</option>
                              <option value="4 BHK">4 BHK</option>
                              <option value="5 BHK">5 BHK</option>
                            </CustomSelect>
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Additional Rooms</label>
                            <input 
                              type="text" 
                              placeholder="Additional Rooms"
                              value={formData.additionalRooms || ''}
                              onChange={e => updateFormData({ additionalRooms: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Number of Bathrooms</label>
                            <input 
                              type="text" 
                              placeholder="Bathrooms"
                              value={formData.bathroomCount || ''}
                              onChange={e => updateFormData({ bathroomCount: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Number of Balconies</label>
                            <input 
                              type="text" 
                              placeholder="Balconies"
                              value={formData.balconyCount || ''}
                              onChange={e => updateFormData({ balconyCount: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Other Rooms checkboxes */}
                    {(!isCommercialOfficeSpaceSell && !isCommercialShop && !isCommercialShowroom && !isCommercialGodown && !isCommercialShed) && (
                      <div className="space-y-2 pt-2">
                        <span className="block text-base font-bold text-[#0B2C5C]">Other Rooms</span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {['Pooja Room', 'Study Room', 'Servant Room', 'Store Room'].map(room => {
                            const isChecked = (formData.otherRoomsList || []).includes(room);
                            return (
                              <label key={room} className="flex items-center gap-2 cursor-pointer text-sm text-slate-800">
                                <input 
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => toggleOtherRoom(room)}
                                  className="w-4 h-4 rounded text-[#4885FF] border-slate-300 focus:ring-[#4885FF]"
                                />
                                {room}
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Distance Fields */}
                    {(!isCommercialOfficeSpaceSell && !isCommercialShop && !isCommercialShowroom && !isCommercialGodown && !isCommercialShed) && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Bus Stop</label>
                          <input 
                            type="text" 
                            placeholder="Enter nearest bus stop distance in KM"
                            value={formData.busStopDistance || ''}
                            onChange={e => updateFormData({ busStopDistance: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Metro</label>
                          <input 
                            type="text" 
                            placeholder="Enter nearest metro distance in KM"
                            value={formData.metroDistance || ''}
                            onChange={e => updateFormData({ metroDistance: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">MMTS</label>
                          <input 
                            type="text" 
                            placeholder="Enter nearest MMTS distance in KM"
                            value={formData.mmtsDistance || ''}
                            onChange={e => updateFormData({ mmtsDistance: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                          />
                        </div>
                      </div>
                    )}

                    {/* Areas and UDS */}
                    {(!isCommercialShop && !isCommercialShowroom && !isCommercialGodown && !isCommercialShed) && (
                      <div className={`grid grid-cols-1 ${(isCommercialOfficeSpaceSell || isCommercialIndustrial) ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-6 pt-2`}>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Property Carpet Area</label>
                          <div className="flex rounded-xl border border-slate-200 focus-within:border-[#4885FF] relative">
                            <input 
                              type="text" 
                              placeholder="Enter Carpet Area"
                              value={formData.carpetArea || ''}
                              onChange={e => updateFormData({ carpetArea: e.target.value })}
                              className="w-full px-4 py-3 rounded-l-xl focus:outline-none text-sm text-slate-800"
                            />
                            <CustomSelect 
                              value={formData.carpetAreaUnit || 'Sq.Ft'}
                              onChange={e => updateFormData({ carpetAreaUnit: e.target.value })}
                              className="px-3 bg-slate-50 border-l border-slate-200 focus:outline-none text-sm text-slate-600 bg-white"
                            >
                              <option value="Sq.Ft">Sq.Ft</option>
                              <option value="Sq.Yards">Sq.Yards</option>
                              <option value="Sq.Meters">Sq.Meters</option>
                            </CustomSelect>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Property Builtup Area</label>
                          <div className="flex rounded-xl border border-slate-200 focus-within:border-[#4885FF] relative">
                            <input 
                              type="text" 
                              placeholder="Enter Builtup Area"
                              value={formData.builtUpArea || ''}
                              onChange={e => updateFormData({ builtUpArea: e.target.value })}
                              className="w-full px-4 py-3 rounded-l-xl focus:outline-none text-sm text-slate-800"
                            />
                            <CustomSelect 
                              value={formData.builtUpAreaUnit || 'Sq.Ft'}
                              onChange={e => updateFormData({ builtUpAreaUnit: e.target.value })}
                              className="px-3 bg-slate-50 border-l border-slate-200 focus:outline-none text-sm text-slate-600 bg-white"
                            >
                              <option value="Sq.Ft">Sq.Ft</option>
                              <option value="Sq.Yards">Sq.Yards</option>
                              <option value="Sq.Meters">Sq.Meters</option>
                            </CustomSelect>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Property Super Builtup Area</label>
                          <div className="flex rounded-xl border border-slate-200 focus-within:border-[#4885FF] relative">
                            <input 
                              type="text" 
                              placeholder="Enter Super Builtup Area"
                              value={formData.superBuiltUpArea || ''}
                              onChange={e => updateFormData({ superBuiltUpArea: e.target.value })}
                              className="w-full px-4 py-3 rounded-l-xl focus:outline-none text-sm text-slate-800"
                            />
                            <CustomSelect 
                              value={formData.superBuiltUpAreaUnit || 'Sq.Ft'}
                              onChange={e => updateFormData({ superBuiltUpAreaUnit: e.target.value })}
                              className="px-3 bg-slate-50 border-l border-slate-200 focus:outline-none text-sm text-slate-600 bg-white"
                            >
                              <option value="Sq.Ft">Sq.Ft</option>
                              <option value="Sq.Yards">Sq.Yards</option>
                              <option value="Sq.Meters">Sq.Meters</option>
                            </CustomSelect>
                          </div>
                        </div>
                        {!(isCommercialOfficeSpaceSell || isCommercialIndustrial) && (
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">UDS</label>
                            <input 
                              type="text" 
                              placeholder="Enter UDS"
                              value={formData.uds || ''}
                              onChange={e => updateFormData({ uds: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Parking, Floor details & facing */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-2">
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Furnished</label>
                        <CustomSelect 
                          value={formData.furnishing || 'Unfurnished'}
                          onChange={e => updateFormData({ furnishing: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                        >
                          <option value="Unfurnished">Unfurnished</option>
                          <option value="Semi-Furnished">Semi-Furnished</option>
                          <option value="Fully Furnished">Fully Furnished</option>
                        </CustomSelect>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Four Wheeler Parking</label>
                        <input 
                          type="text" 
                          placeholder="Enter Number"
                          value={formData.fourWheelerParking || ''}
                          onChange={e => updateFormData({ fourWheelerParking: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Two Wheeler Parking</label>
                        <input 
                          type="text" 
                          placeholder="Enter Number"
                          value={formData.twoWheelerParking || ''}
                          onChange={e => updateFormData({ twoWheelerParking: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Building Total Floors</label>
                        <input 
                          type="text" 
                          placeholder="Only Numbers"
                          value={formData.buildingTotalFloors || ''}
                          onChange={e => updateFormData({ buildingTotalFloors: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Property on which Floor</label>
                        <CustomSelect 
                          value={formData.floorNumber || 'Cellar 1'}
                          onChange={e => updateFormData({ floorNumber: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                        >
                          <option value="Cellar 1">Cellar 1</option>
                          <option value="Cellar 2">Cellar 2</option>
                          <option value="Ground">Ground</option>
                          <option value="1st">1st</option>
                          <option value="2nd">2nd</option>
                          <option value="3rd">3rd</option>
                          <option value="4th">4th</option>
                          <option value="5th">5th</option>
                          <option value="6th">6th</option>
                          <option value="7th">7th</option>
                          <option value="8th">8th</option>
                          <option value="9th">9th</option>
                          <option value="10th+">10th+</option>
                        </CustomSelect>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Facing</label>
                        <CustomSelect 
                          value={formData.facing || 'East'}
                          onChange={e => updateFormData({ facing: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                        >
                          <option value="East">East</option>
                          <option value="West">West</option>
                          <option value="North">North</option>
                          <option value="South">South</option>
                          <option value="North-East">North-East</option>
                          <option value="North-West">North-West</option>
                          <option value="South-East">South-East</option>
                          <option value="South-West">South-West</option>
                        </CustomSelect>
                      </div>
                    </div>

                    {/* Rental specific pricing inputs */}
                    {formData.intent === 'rent' && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Rent per Month <span className="text-red-500">*</span></label>
                          <input 
                            type="text" 
                            placeholder="Enter Rent"
                            value={formData.rentPerMonth || ''}
                            onChange={e => updateFormData({ rentPerMonth: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Security Deposit</label>
                          <div className="flex rounded-xl border border-slate-200 focus-within:border-[#4885FF] relative">
                            <CustomSelect 
                              value={formData.securityDepositType || 'Months'}
                              onChange={e => updateFormData({ securityDepositType: e.target.value })}
                              className="px-2 bg-slate-50 border-r border-slate-200 focus:outline-none text-xs text-slate-600 bg-white"
                            >
                              <option value="Months">Months</option>
                              <option value="Amount">Amount</option>
                            </CustomSelect>
                            <input 
                              type="text" 
                              placeholder="Enter Amount"
                              value={formData.securityDepositVal || ''}
                              onChange={e => updateFormData({ securityDepositVal: e.target.value })}
                              className="w-full px-4 py-3 rounded-l-xl focus:outline-none text-sm text-slate-800"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Maintenance Amount</label>
                          <div className="flex rounded-xl border border-slate-200 focus-within:border-[#4885FF] relative">
                            <CustomSelect 
                              value={formData.maintenanceAmountType || 'Select M'}
                              onChange={e => updateFormData({ maintenanceAmountType: e.target.value })}
                              className="px-2 bg-slate-50 border-r border-slate-200 focus:outline-none text-xs text-slate-600 bg-white"
                            >
                              <option value="Select M">Select M</option>
                              <option value="Select Month">Select Month</option>
                              <option value="Select Year">Select Year</option>
                            </CustomSelect>
                            <input 
                              type="text" 
                              placeholder="Enter Amount"
                              value={formData.maintenanceAmountVal || ''}
                              onChange={e => updateFormData({ maintenanceAmountVal: e.target.value })}
                              className="w-full px-4 py-3 rounded-l-xl focus:outline-none text-sm text-slate-800"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Pricing block */}
                    {formData.intent !== 'rent' && (
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 pt-2">
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">
                            {(isCommercialOfficeSpaceSell || isCommercialIndustrial) ? 'Property Price' : 'Property Price Per'}
                          </label>
                          <div className="flex rounded-xl border border-slate-200 focus-within:border-[#4885FF] relative">
                            <input 
                              type="text" 
                              placeholder="Enter Price"
                              value={formData.pricePerUnit || ''}
                              onChange={e => handlePriceOrAreaChange('pricePerUnit', e.target.value)}
                              className="w-full px-4 py-3 rounded-l-xl focus:outline-none text-sm text-slate-800"
                            />
                            <CustomSelect 
                              value={formData.totalAreaUnit || 'Sq.Ft'}
                              onChange={e => updateFormData({ totalAreaUnit: e.target.value })}
                              className="px-2 bg-slate-50 border-l border-slate-200 focus:outline-none text-xs text-slate-600"
                            >
                              <option value="Sq.Ft">Sq.Ft</option>
                              <option value="Sq.Yards">Sq.Yards</option>
                            </CustomSelect>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Total Area</label>
                          <div className="flex rounded-xl border border-slate-200 focus-within:border-[#4885FF] relative">
                            <input 
                              type="text" 
                              placeholder="Enter Area"
                              value={formData.totalAreaVal || ''}
                              onChange={e => handlePriceOrAreaChange('totalAreaVal', e.target.value)}
                              className="w-full px-4 py-3 rounded-l-xl focus:outline-none text-sm text-slate-800"
                            />
                            <CustomSelect 
                              value={formData.totalAreaUnit || 'Sq.Ft'}
                              onChange={e => updateFormData({ totalAreaUnit: e.target.value })}
                              className="px-2 bg-slate-50 border-l border-slate-200 focus:outline-none text-xs text-slate-600"
                            >
                              <option value="Sq.Ft">Sq.Ft</option>
                              <option value="Sq.Yards">Sq.Yards</option>
                            </CustomSelect>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Total Price</label>
                          <input 
                            type="text" 
                            disabled
                            value={((Number(formData.pricePerUnit) || 0) * (Number(formData.totalAreaVal) || 0)) || ''}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 font-bold"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Other Taxes etc.</label>
                          <CustomSelect 
                            value={formData.otherTaxes || 'Include'}
                            onChange={e => updateFormData({ otherTaxes: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                          >
                            <option value="Include">Include</option>
                            <option value="Exclude">Exclude</option>
                          </CustomSelect>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Price Negotiable</label>
                          <CustomSelect 
                            value={formData.priceNegotiable || 'Yes'}
                            onChange={e => updateFormData({ priceNegotiable: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                          >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </CustomSelect>
                        </div>
                      </div>
                    )}

                    {/* Brokerage Charge */}
                    <div className="space-y-2 pt-2">
                      <label className="block text-sm font-semibold text-[#0B2C5C]">Brokerage Charge</label>
                      <div className="flex gap-6 mt-1">
                        {['Yes', 'No'].map(item => (
                          <label key={item} className="flex items-center gap-2 cursor-pointer text-sm text-slate-800">
                            <input 
                              type="radio"
                              name="brokerageCharge"
                              checked={formData.brokerageCharge === item}
                              onChange={() => updateFormData({ brokerageCharge: item })}
                              className="w-4 h-4 text-[#4885FF] border-slate-300 focus:ring-[#4885FF]"
                            />
                            {item}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

                {/* --- Amenities & Features Section --- */}
                <div>
                  <h3 className="text-lg font-bold text-[#0B2C5C] mb-4 pb-2 border-b border-slate-100">Amenities & Features</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <span className="block text-sm font-semibold text-slate-600">Do you want to select amenities?</span>
                      <div className="flex gap-6 mt-1">
                        {['Yes', 'No'].map(item => {
                          const isChecked = isAmenitiesDisabled ? item === 'No' : formData.showAmenitiesOption === item;
                          return (
                            <label key={item} className={`flex items-center gap-2 text-sm text-slate-800 ${isAmenitiesDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
                              <input 
                                type="radio"
                                name="showAmenitiesOption"
                                checked={isChecked}
                                disabled={isAmenitiesDisabled}
                                onChange={() => !isAmenitiesDisabled && updateFormData({ showAmenitiesOption: item })}
                                className="w-4 h-4 text-[#035096] border-slate-300 focus:ring-[#035096]"
                              />
                              {item}
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Detailed Nested Checkboxes if "Yes" */}
                    {formData.showAmenitiesOption === 'Yes' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
                        {/* Column 1 */}
                        <div className="space-y-6">
                          {/* Children's Play Area */}
                          <div className="space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input 
                                type="checkbox"
                                checked={isCategoryChecked("Children's Play Area")}
                                onChange={() => toggleCategoryAmenities("Children's Play Area")}
                                className="w-4 h-4 rounded text-[#035096] border-slate-300 focus:ring-[#035096]"
                              />
                              <span className="font-bold text-sm text-[#0B2C5C]">Children's Play Area</span>
                            </label>
                            <div className="pl-6 space-y-2">
                              {["Dedicated, safe playgrounds with swings, slides etc", "Sandpits"].map(item => (
                                <label key={item} className="flex items-start gap-2 cursor-pointer text-xs text-slate-800">
                                  <input 
                                    type="checkbox"
                                    checked={formData.amenities.includes(item)}
                                    onChange={() => toggleSelection('amenities', item)}
                                    className="w-3.5 h-3.5 mt-0.5 rounded text-[#035096] border-slate-300 focus:ring-[#035096]"
                                  />
                                  <span>{item}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Community Services & Management */}
                          <div className="space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input 
                                type="checkbox"
                                checked={isCategoryChecked("Community Services & Management")}
                                onChange={() => toggleCategoryAmenities("Community Services & Management")}
                                className="w-4 h-4 rounded text-[#035096] border-slate-300 focus:ring-[#035096]"
                              />
                              <span className="font-bold text-sm text-[#0B2C5C]">Community Services & Management</span>
                            </label>
                            <div className="pl-6 space-y-2">
                              {[
                                "Resident Association/Management Committee: For smooth functioning and decision-making",
                                "Community Events: Organized festivals, sports tournaments and social gathering",
                                "App-Based Community Management: For communication, raising requests and payments"
                              ].map(item => (
                                <label key={item} className="flex items-start gap-2 cursor-pointer text-xs text-slate-800">
                                  <input 
                                    type="checkbox"
                                    checked={formData.amenities.includes(item)}
                                    onChange={() => toggleSelection('amenities', item)}
                                    className="w-3.5 h-3.5 mt-0.5 rounded text-[#035096] border-slate-300 focus:ring-[#035096]"
                                  />
                                  <span>{item}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Convenience & Lifestyle */}
                          <div className="space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input 
                                type="checkbox"
                                checked={isCategoryChecked("Convenience & Lifestyle")}
                                onChange={() => toggleCategoryAmenities("Convenience & Lifestyle")}
                                className="w-4 h-4 rounded text-[#035096] border-slate-300 focus:ring-[#035096]"
                              />
                              <span className="font-bold text-sm text-[#0B2C5C]">Convenience & Lifestyle</span>
                            </label>
                            <div className="pl-6 space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {[
                                "Business Center",
                                "Library/Reading Room",
                                "Retail/Commercial Spaces (within the community)",
                                "Power backup: 24/7 generator backup",
                                "Water Supply",
                                "Intercom",
                                "Video Door Phone",
                                "High Speed Internet / wi-fi",
                                "Ample Parking",
                                "Maintenance Staff",
                                "Convenience stores/ Supermarket",
                                "Cafeteria/Restaurant",
                                "Salon/Spa",
                                "Pharmacy",
                                "Service Apartments",
                                "Guest Rooms",
                                "Amphitheater/Mini-Theater",
                                "Creche/Daycare facility",
                                "Co-working Spaces"
                              ].map(item => (
                                <label key={item} className="flex items-start gap-2 cursor-pointer text-xs text-slate-800">
                                  <input 
                                    type="checkbox"
                                    checked={formData.amenities.includes(item)}
                                    onChange={() => toggleSelection('amenities', item)}
                                    className="w-3.5 h-3.5 mt-0.5 rounded text-[#035096] border-slate-300 focus:ring-[#035096]"
                                  />
                                  <span>{item}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Indoor Games */}
                          <div className="space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input 
                                type="checkbox"
                                checked={isCategoryChecked("Indoor Games")}
                                onChange={() => toggleCategoryAmenities("Indoor Games")}
                                className="w-4 h-4 rounded text-[#035096] border-slate-300 focus:ring-[#035096]"
                              />
                              <span className="font-bold text-sm text-[#0B2C5C]">Indoor Games</span>
                            </label>
                            <div className="pl-6 space-y-2">
                              {[
                                "Carrom, Chess, and other board games.",
                                "Billiards/Pool Table",
                                "Table Tennis"
                              ].map(item => (
                                <label key={item} className="flex items-start gap-2 cursor-pointer text-xs text-slate-800">
                                  <input 
                                    type="checkbox"
                                    checked={formData.amenities.includes(item)}
                                    onChange={() => toggleSelection('amenities', item)}
                                    className="w-3.5 h-3.5 mt-0.5 rounded text-[#035096] border-slate-300 focus:ring-[#035096]"
                                  />
                                  <span>{item}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Landscaped Gardens & Parks */}
                          <div className="space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input 
                                type="checkbox"
                                checked={isCategoryChecked("Landscaped Gardens & Parks")}
                                onChange={() => toggleCategoryAmenities("Landscaped Gardens & Parks")}
                                className="w-4 h-4 rounded text-[#035096] border-slate-300 focus:ring-[#035096]"
                              />
                              <span className="font-bold text-sm text-[#0B2C5C]">Landscaped Gardens & Parks</span>
                            </label>
                            <div className="pl-6 space-y-2">
                              {[
                                "Seating areas, gazebos.",
                                "Green spaces for relaxation and strolls"
                              ].map(item => (
                                <label key={item} className="flex items-start gap-2 cursor-pointer text-xs text-slate-800">
                                  <input 
                                    type="checkbox"
                                    checked={formData.amenities.includes(item)}
                                    onChange={() => toggleSelection('amenities', item)}
                                    className="w-3.5 h-3.5 mt-0.5 rounded text-[#035096] border-slate-300 focus:ring-[#035096]"
                                  />
                                  <span>{item}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-6">
                          {/* Outdoor Sports Facilities */}
                          <div className="space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input 
                                type="checkbox"
                                checked={isCategoryChecked("Outdoor Sports Facilities")}
                                onChange={() => toggleCategoryAmenities("Outdoor Sports Facilities")}
                                className="w-4 h-4 rounded text-[#035096] border-slate-300 focus:ring-[#035096]"
                              />
                              <span className="font-bold text-sm text-[#0B2C5C]">Outdoor Sports Facilities</span>
                            </label>
                            <div className="pl-6 space-y-2">
                              {[
                                "Badminton Courts",
                                "Basketball Courts",
                                "Cricket Practice Net",
                                "Football/ Multi-purpose Sports Field",
                                "Jogging/Walking Tracks",
                                "Themed gardens (e.g., sensory gardens, herbs gardens)",
                                "Tennis Courts"
                              ].map(item => (
                                <label key={item} className="flex items-start gap-2 cursor-pointer text-xs text-slate-800">
                                  <input 
                                    type="checkbox"
                                    checked={formData.amenities.includes(item)}
                                    onChange={() => toggleSelection('amenities', item)}
                                    className="w-3.5 h-3.5 mt-0.5 rounded text-[#035096] border-slate-300 focus:ring-[#035096]"
                                  />
                                  <span>{item}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Recreational & Leisure/Clubhouse/Community Hall */}
                          <div className="space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input 
                                type="checkbox"
                                checked={isCategoryChecked("Recreational & Leisure/Clubhouse/Community Hall")}
                                onChange={() => toggleCategoryAmenities("Recreational & Leisure/Clubhouse/Community Hall")}
                                className="w-4 h-4 rounded text-[#035096] border-slate-300 focus:ring-[#035096]"
                              />
                              <span className="font-bold text-sm text-[#0B2C5C]">Recreational & Leisure/Clubhouse/Community Hall</span>
                            </label>
                            <div className="pl-6 space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {[
                                "Aerobics / Zumba Studio",
                                "Lounge areas and seating.",
                                "Party lawns or banquet facilities",
                                "Swimming Pool",
                                "Fitness & Wellness",
                                "Gymnasium / Fitness Center",
                                "Yoga / Meditation Room",
                                "Spa/ Sauna/ Steam Room",
                                "Multipurpose halls for events and gatherings."
                              ].map(item => (
                                <label key={item} className="flex items-start gap-2 cursor-pointer text-xs text-slate-800">
                                  <input 
                                    type="checkbox"
                                    checked={formData.amenities.includes(item)}
                                    onChange={() => toggleSelection('amenities', item)}
                                    className="w-3.5 h-3.5 mt-0.5 rounded text-[#035096] border-slate-300 focus:ring-[#035096]"
                                  />
                                  <span>{item}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Security & Safety */}
                          <div className="space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input 
                                type="checkbox"
                                checked={isCategoryChecked("Security & Safety")}
                                onChange={() => toggleCategoryAmenities("Security & Safety")}
                                className="w-4 h-4 rounded text-[#035096] border-slate-300 focus:ring-[#035096]"
                              />
                              <span className="font-bold text-sm text-[#0B2C5C]">Security & Safety</span>
                            </label>
                            <div className="pl-6 space-y-2">
                              {[
                                "Intercom Facility",
                                "Boom Barriers",
                                "24/7 Manned Security",
                                "CCTV Surveillance",
                                "Controlled Access points",
                                "Perimeter Fencing/ Walls"
                              ].map(item => (
                                <label key={item} className="flex items-start gap-2 cursor-pointer text-xs text-slate-800">
                                  <input 
                                    type="checkbox"
                                    checked={formData.amenities.includes(item)}
                                    onChange={() => toggleSelection('amenities', item)}
                                    className="w-3.5 h-3.5 mt-0.5 rounded text-[#035096] border-slate-300 focus:ring-[#035096]"
                                  />
                                  <span>{item}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Sustainable & Eco-Friendly */}
                          <div className="space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input 
                                type="checkbox"
                                checked={isCategoryChecked("Sustainable & Eco-Friendly")}
                                onChange={() => toggleCategoryAmenities("Sustainable & Eco-Friendly")}
                                className="w-4 h-4 rounded text-[#035096] border-slate-300 focus:ring-[#035096]"
                              />
                              <span className="font-bold text-sm text-[#0B2C5C]">Sustainable & Eco-Friendly</span>
                            </label>
                            <div className="pl-6 space-y-2">
                              {[
                                "Electric Vehicle charging stations",
                                "Waste Segregation and Composting Facilities",
                                "Sewage Treatment Plant",
                                "Solar Panels for Common Area Lighting",
                                "Rainwater Harvesting System"
                              ].map(item => (
                                <label key={item} className="flex items-start gap-2 cursor-pointer text-xs text-slate-800">
                                  <input 
                                    type="checkbox"
                                    checked={formData.amenities.includes(item)}
                                    onChange={() => toggleSelection('amenities', item)}
                                    className="w-3.5 h-3.5 mt-0.5 rounded text-[#035096] border-slate-300 focus:ring-[#035096]"
                                  />
                                  <span>{item}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-[#0B2C5C]">More Amenities</label>
                        <input 
                          type="text" 
                          placeholder={isAmenitiesDisabled ? "Amenities selection disabled" : "If more amenities add few more"}
                          value={isAmenitiesDisabled ? '' : formData.landmark || ''}
                          disabled={isAmenitiesDisabled}
                          onChange={e => !isAmenitiesDisabled && updateFormData({ landmark: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl border focus:outline-none text-sm ${
                            isAmenitiesDisabled 
                              ? 'bg-slate-50 border-slate-100 cursor-not-allowed text-slate-400' 
                              : 'border-slate-200 focus:border-[#035096] text-slate-800'
                          }`}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-[#0B2C5C]">More about your Property</label>
                        <textarea 
                          rows={2}
                          placeholder="How unique your property add few words"
                          value={formData.description || ''}
                          onChange={e => updateFormData({ description: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#035096] text-sm text-slate-800"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="block text-sm font-semibold text-[#0B2C5C]">Property Location</label>
                        <input 
                          type="text" 
                          placeholder="Google map location"
                          value={formData.floorPlanUrl || ''}
                          onChange={e => updateFormData({ floorPlanUrl: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#035096] text-sm text-slate-800"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- Media Upload Section --- */}
                <div>
                  <h3 className="text-lg font-bold text-[#0B2C5C] mb-4 pb-2 border-b border-slate-100">Media Upload</h3>
                  
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-[#0B2C5C]">
                      Property Images <span className="text-red-500">*</span> <span className="text-xs text-slate-400 font-normal">(Minimum 3)</span>
                    </label>
                    
                    {/* Drag & Drop Area */}
                    <div className="border-2 border-dashed border-slate-200 hover:border-[#4885FF] rounded-2xl p-8 text-center bg-slate-50/50 transition-colors relative cursor-pointer">
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="p-3 bg-white rounded-full shadow-sm text-[#035096]">
                          <Upload className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-semibold text-[#0B2C5C]">Drag and drop images here or click to browse</span>
                        <span className="text-xs text-slate-400">Supports PNG, JPG, JPEG (Max 5MB each)</span>
                      </div>
                    </div>

                    {/* Previews grid */}
                    {formData.imagePreviews.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                        {formData.imagePreviews.map((preview, index) => (
                          <div key={index} className="relative group rounded-xl overflow-hidden aspect-square border border-slate-200">
                            <img src={preview} alt="preview" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1.5 right-1.5 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full shadow transition-all duration-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-[#0B2C5C]">Video URL (Optional)</label>
                        <input 
                          type="url" 
                          placeholder="e.g., YouTube or Vimeo link"
                          value={formData.videoUrl || ''}
                          onChange={e => updateFormData({ videoUrl: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-[#0B2C5C]">Floor Plan URL (Optional)</label>
                        <input 
                          type="url" 
                          placeholder="e.g., Floor plan image or PDF link"
                          value={formData.floorPlanUrl || ''}
                          onChange={e => updateFormData({ floorPlanUrl: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- Promotion options --- */}
                <div>
                  <h3 className="text-lg font-bold text-[#0B2C5C] mb-4 pb-2 border-b border-slate-100">Promotion Options</h3>
                  {/* Boost Post Radio Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      formData.boostPostOption === 'regular' 
                        ? 'border-[#035096] bg-[#035096]/5' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}>
                      <div className="flex items-center gap-3">
                        <input 
                          type="radio" 
                          name="boostPostOption"
                          value="regular"
                          checked={formData.boostPostOption === 'regular'}
                          onChange={() => updateFormData({ boostPostOption: 'regular' })}
                          className="w-4 h-4 text-[#035096] border-slate-300 focus:ring-[#035096]"
                        />
                        <div>
                          <span className="font-bold text-base text-[#0B2C5C] block">Regular Post</span>
                          <span className="text-xs text-slate-500 mt-1 block">Our Team</span>
                        </div>
                      </div>
                    </label>

                    <label className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      formData.boostPostOption === 'boost' 
                        ? 'border-[#035096] bg-[#035096]/5' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <input 
                            type="radio" 
                            name="boostPostOption"
                            value="boost"
                            checked={formData.boostPostOption === 'boost'}
                            onChange={() => updateFormData({ boostPostOption: 'boost' })}
                            className="w-4 h-4 text-[#035096] border-slate-300 focus:ring-[#035096]"
                          />
                          <div>
                            <span className="font-bold text-base text-[#0B2C5C] block">Boost Post</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          A "boost post advertisement" refers to a paid promotion of an existing social media post to reach a wider audience beyond your followers. <strong>Our team will work for you.</strong>
                        </p>
                        <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                          <li>Eye-catching property banners designed just for you.</li>
                          <li>Showcase your property on our website with prominent banners.</li>
                          <li>Get notifications to our interested clients about your property.</li>
                          <li>Go beyond your reach with social media promotion on top platforms.</li>
                          <li>You'll be notified by SMS and WhatsApp of any inquiries from potential buyers/renters interested in your property.</li>
                        </ul>
                        <div className="pt-2 border-t border-slate-200">
                          <span className="font-bold text-xs text-[#0B2C5C] block">Benefits:</span>
                          <ul className="text-xs text-slate-500 space-y-1 pl-4 list-decimal mt-1">
                            <li>Reach a broader audience beyond your existing followers</li>
                            <li>Target specific demographics or interests for increased relevance</li>
                            <li>Increase engagement with your post (likes, comments, shares)</li>
                            <li>Drive traffic to your website or landing page</li>
                          </ul>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-slate-100 p-8 sm:p-10">
                
                <h2 className="text-2xl font-bold text-[#0B2C5C] mb-8 pb-3 border-b border-slate-100">
                  {formData.propertyType} Details
                </h2>

                {/* SECTION: Residential / General Details */}
                {formData.category !== 'Lands' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="md:col-span-2 space-y-2">
                      <label className="block text-sm font-semibold text-[#0B2C5C]">Property Title <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        placeholder="e.g., Premium 3 BHK Apartment in Gachibowli"
                        value={formData.title}
                        onChange={e => updateFormData({ title: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label className="block text-sm font-semibold text-[#0B2C5C]">Property Description <span className="text-red-500">*</span></label>
                      <textarea 
                        rows={4}
                        placeholder="Describe the key highlights, environment, spacing, etc."
                        value={formData.description}
                        onChange={e => updateFormData({ description: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                      />
                    </div>

                    {formData.category === 'Residential' && (
                      <>
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-[#0B2C5C]">Floor Number <span className="text-red-500">*</span></label>
                          <input 
                            type="text" 
                            placeholder="e.g., 3rd Floor"
                            value={formData.floorNumber}
                            onChange={e => updateFormData({ floorNumber: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-[#0B2C5C]">Furnishing <span className="text-red-500">*</span></label>
                          <CustomSelect 
                            value={formData.furnishing}
                            onChange={e => updateFormData({ furnishing: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                          >
                            <option value="">Select Furnishing</option>
                            <option value="Unfurnished">Unfurnished</option>
                            <option value="Semi-Furnished">Semi-Furnished</option>
                            <option value="Fully Furnished">Fully Furnished</option>
                          </CustomSelect>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-[#0B2C5C]">Built-up Area (sq ft) <span className="text-red-500">*</span></label>
                          <input 
                            type="number" 
                            placeholder="e.g., 1600"
                            value={formData.builtUpArea}
                            onChange={e => updateFormData({ builtUpArea: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-[#0B2C5C]">Bathroom Count <span className="text-red-500">*</span></label>
                          <input 
                            type="number" 
                            placeholder="e.g., 3"
                            value={formData.bathroomCount}
                            onChange={e => updateFormData({ bathroomCount: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-[#0B2C5C]">Balcony Count</label>
                          <input 
                            type="number" 
                            placeholder="e.g., 2"
                            value={formData.balconyCount}
                            onChange={e => updateFormData({ balconyCount: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                          />
                        </div>

                        <div className="space-y-3">
                          <label className="block text-sm font-semibold text-[#0B2C5C]">Suitable For</label>
                          <div className="flex gap-6 mt-1">
                            {['Bachelor', 'Family', 'Student'].map(item => (
                              <label key={item} className="flex items-center gap-2 cursor-pointer text-sm text-slate-800">
                                <input 
                                  type="checkbox"
                                  checked={formData.suitableFor.includes(item)}
                                  onChange={() => toggleSelection('suitableFor', item)}
                                  className="w-4 h-4 rounded text-[#4885FF] border-slate-300 focus:ring-[#4885FF]"
                                />
                                {item}
                              </label>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* SECTION: Land Details */}
                {formData.category === 'Lands' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-[#0B2C5C]">Land Area (sq ft) <span className="text-red-500">*</span></label>
                      <input 
                        type="number" 
                        placeholder="Enter Land Area"
                        value={formData.landArea}
                        onChange={e => updateFormData({ landArea: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-[#0B2C5C]">Commercial Zone Type</label>
                      <input 
                        type="text" 
                        placeholder="e.g., IT Park, Business District, Industrial Zone"
                        value={formData.commercialZoneType}
                        onChange={e => updateFormData({ commercialZoneType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-[#0B2C5C]">Property Features</label>
                      <div className="flex gap-6 mt-1">
                        {['Corner Property', 'Main Road Facing'].map(item => (
                          <label key={item} className="flex items-center gap-2 cursor-pointer text-sm text-slate-800">
                            <input 
                              type="checkbox"
                              checked={formData.propertyFeatures.includes(item)}
                              onChange={() => toggleSelection('propertyFeatures', item)}
                              className="w-4 h-4 rounded text-[#4885FF] border-slate-300 focus:ring-[#4885FF]"
                            />
                            {item}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-3">
                      <label className="block text-sm font-semibold text-[#0B2C5C]">Suitable For</label>
                      <div className="flex flex-wrap gap-6 mt-1">
                        {['Warehouse', 'Petrol Pump', 'Hotel', 'Mall', 'Industry'].map(item => (
                          <label key={item} className="flex items-center gap-2 cursor-pointer text-sm text-slate-800">
                            <input 
                              type="checkbox"
                              checked={formData.suitableForCommercial.includes(item)}
                              onChange={() => toggleSelection('suitableForCommercial', item)}
                              className="w-4 h-4 rounded text-[#4885FF] border-slate-300 focus:ring-[#4885FF]"
                            />
                            {item}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-3">
                      <label className="block text-sm font-semibold text-[#0B2C5C]">Available Utilities</label>
                      <div className="flex gap-6 mt-1">
                        {['Water Facility', 'Electricity', 'Drainage'].map(item => (
                          <label key={item} className="flex items-center gap-2 cursor-pointer text-sm text-slate-800">
                            <input 
                              type="checkbox"
                              checked={formData.utilities.includes(item)}
                              onChange={() => toggleSelection('utilities', item)}
                              className="w-4 h-4 rounded text-[#4885FF] border-slate-300 focus:ring-[#4885FF]"
                            />
                            {item}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* SECTION: Price Details */}
                <div className="mb-10">
                  <h3 className="text-lg font-bold text-[#0B2C5C] mb-4 pb-2 border-b border-slate-100">Price Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {formData.category === 'Lands' ? (
                      <>
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-[#0B2C5C]">Sale Price <span className="text-red-500">*</span></label>
                          <input 
                            type="number" 
                            placeholder="Enter total price"
                            value={formData.expectedPrice}
                            onChange={e => updateFormData({ expectedPrice: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-[#0B2C5C]">Price Per Sq.ft</label>
                          <input 
                            type="number" 
                            placeholder="e.g., 3500"
                            value={formData.pricePerSqft}
                            onChange={e => updateFormData({ pricePerSqft: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-[#0B2C5C]">Expected Price <span className="text-red-500">*</span></label>
                          <input 
                            type="number" 
                            placeholder="Enter price"
                            value={formData.expectedPrice}
                            onChange={e => updateFormData({ expectedPrice: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-[#0B2C5C]">Booking Amount</label>
                          <input 
                            type="number" 
                            placeholder="Enter booking amount"
                            value={formData.bookingAmount}
                            onChange={e => updateFormData({ bookingAmount: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-[#0B2C5C]">Maintenance Charges (Monthly)</label>
                          <input 
                            type="number" 
                            placeholder="e.g., 3000"
                            value={formData.maintenanceCharges}
                            onChange={e => updateFormData({ maintenanceCharges: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* SECTION: Amenities */}
                {formData.category === 'Residential' && formData.propertyType !== 'Residential Land / Plot' && (
                  <div className="mb-10">
                    <h3 className="text-lg font-bold text-[#0B2C5C] mb-4 pb-2 border-b border-slate-100">Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { key: 'lift', name: 'Lift' },
                        { key: 'gym', name: 'Gym' },
                        { key: 'pool', name: 'Swimming Pool' },
                        { key: 'security', name: 'Security' },
                        { key: 'power', name: 'Power Backup' },
                        { key: 'garden', name: 'Garden' },
                        { key: 'club', name: 'Club House' },
                        { key: 'play_area', name: 'Children Play Area' },
                      ].map(item => (
                        <label key={item.key} className="flex items-center gap-2 cursor-pointer text-sm text-slate-800">
                          <input 
                            type="checkbox"
                            checked={formData.amenities.includes(item.key)}
                            onChange={() => toggleSelection('amenities', item.key)}
                            className="w-4 h-4 rounded text-[#4885FF] border-slate-300 focus:ring-[#4885FF]"
                          />
                          {item.name}
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* SECTION: Location Details */}
                <div className="mb-10">
                  <h3 className="text-lg font-bold text-[#0B2C5C] mb-4 pb-2 border-b border-slate-100">Location Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-[#0B2C5C]">City <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        placeholder="e.g., Hyderabad"
                        value={formData.city}
                        onChange={e => updateFormData({ city: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-[#0B2C5C]">Locality <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        placeholder="e.g., Gachibowli"
                        value={formData.locality}
                        onChange={e => updateFormData({ locality: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-[#0B2C5C]">Landmark</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Near Sheraton Hotel"
                        value={formData.landmark}
                        onChange={e => updateFormData({ landmark: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-[#0B2C5C]">Pin Code <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        placeholder="Enter 6-digit pin code"
                        value={formData.pinCode}
                        onChange={e => updateFormData({ pinCode: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-[#0B2C5C]">Bus Stop (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="Enter nearest bus stop distance in KM"
                        value={formData.busStopDistance}
                        onChange={e => updateFormData({ busStopDistance: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-[#0B2C5C]">Metro Station (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="Enter nearest metro distance in KM"
                        value={formData.metroDistance}
                        onChange={e => updateFormData({ metroDistance: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-[#0B2C5C]">MMTS Station (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="Enter nearest MMTS distance in KM"
                        value={formData.mmtsDistance}
                        onChange={e => updateFormData({ mmtsDistance: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label className="block text-sm font-semibold text-[#0B2C5C]">Full Address <span className="text-red-500">*</span></label>
                      <textarea 
                        rows={3}
                        placeholder="Enter complete address details"
                        value={formData.fullAddress}
                        onChange={e => updateFormData({ fullAddress: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION: Media Upload */}
                <div className="mb-10">
                  <h3 className="text-lg font-bold text-[#0B2C5C] mb-4 pb-2 border-b border-slate-100">Media Upload</h3>
                  
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-[#0B2C5C]">
                      Property Images <span className="text-red-500">*</span> <span className="text-xs text-slate-400 font-normal">(Minimum 3)</span>
                    </label>
                    
                    {/* Drag & Drop Area */}
                    <div className="border-2 border-dashed border-slate-200 hover:border-[#4885FF] rounded-2xl p-8 text-center bg-slate-50/50 transition-colors relative cursor-pointer">
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="p-3 bg-white rounded-full shadow-sm text-[#035096]">
                          <Upload className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-semibold text-[#0B2C5C]">Drag and drop images here or click to browse</span>
                        <span className="text-xs text-slate-400">Supports PNG, JPG, JPEG (Max 5MB each)</span>
                      </div>
                    </div>

                    {/* Previews grid */}
                    {formData.imagePreviews.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                        {formData.imagePreviews.map((preview, index) => (
                          <div key={index} className="relative group rounded-xl overflow-hidden aspect-square border border-slate-200">
                            <img src={preview} alt="preview" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1.5 right-1.5 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full shadow transition-all duration-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-[#0B2C5C]">Video URL (Optional)</label>
                        <input 
                          type="url" 
                          placeholder="e.g., YouTube or Vimeo link"
                          value={formData.videoUrl}
                          onChange={e => updateFormData({ videoUrl: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-[#0B2C5C]">Floor Plan URL (Optional)</label>
                        <input 
                          type="url" 
                          placeholder="e.g., Floor plan image or PDF link"
                          value={formData.floorPlanUrl}
                          onChange={e => updateFormData({ floorPlanUrl: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION: Contact Details */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-[#0B2C5C] mb-4 pb-2 border-b border-slate-100">Contact Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-[#0B2C5C]">Name <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        placeholder="Enter contact person name"
                        value={formData.contactName}
                        onChange={e => updateFormData({ contactName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-[#0B2C5C]">Phone Number <span className="text-red-500">*</span></label>
                      <input 
                        type="tel" 
                        placeholder="Enter 10-digit phone number"
                        value={formData.contactPhone}
                        onChange={e => updateFormData({ contactPhone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-[#0B2C5C]">Email <span className="text-red-500">*</span></label>
                      <input 
                        type="email" 
                        placeholder="Enter contact email address"
                        value={formData.contactEmail}
                        onChange={e => updateFormData({ contactEmail: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                      />
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex justify-end gap-5 pt-4">
              <button 
                type="button"
                onClick={handlePrevious}
                className="bg-[#035096] hover:bg-[#024078] text-white px-11 py-3.5 rounded-2xl font-semibold text-[17px] transition-colors min-w-[160px] text-center focus:outline-none"
              >
                Previous
              </button>
              <button 
                type="button"
                onClick={handleNext}
                className="bg-[#035096] hover:bg-[#024078] text-white px-11 py-3.5 rounded-2xl font-semibold text-[17px] transition-colors min-w-[160px] text-center focus:outline-none"
              >
                Review & Preview
              </button>
            </div>
          </form>
        )}

        {/* --- STEP 4: REVIEW & SUBMIT (PREVIEW LAYOUT) --- */}
        {currentStep === 4 && (
          <div className="space-y-8 text-left">
            <div className="bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-slate-100 p-8 sm:p-10">
              
              {/* Preview Header Summary */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-8">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-[#0B2C5C]">
                      {formData.title || `${formData.propertyType} in ${formData.locality}, ${formData.city}`}
                    </h2>
                    <span className="bg-[#4885FF] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded">NEW</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500 text-sm mt-1.5">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{formData.locality}, {formData.city}</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Expected Price</span>
                  <span className="text-3xl font-extrabold text-[#F68035] mt-0.5 block">
                    ₹{Number(formData.expectedPrice).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Media Gallery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {formData.imagePreviews.length > 0 ? (
                  <>
                    <div className="md:col-span-2 rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] bg-slate-100 border border-slate-100 shadow-sm">
                      <img src={formData.imagePreviews[0]} alt="main" className="w-full h-full object-cover" />
                    </div>
                    <div className="grid grid-rows-2 gap-4">
                      <div className="rounded-xl overflow-hidden aspect-[16/10] bg-slate-100 border border-slate-100 shadow-sm">
                        <img src={formData.imagePreviews[1] || formData.imagePreviews[0]} alt="sub-1" className="w-full h-full object-cover" />
                      </div>
                      <div className="rounded-xl overflow-hidden aspect-[16/10] bg-slate-100 border border-slate-100 shadow-sm relative">
                        <img src={formData.imagePreviews[2] || formData.imagePreviews[0]} alt="sub-2" className="w-full h-full object-cover" />
                        {formData.imagePreviews.length > 3 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-lg">
                            +{formData.imagePreviews.length - 3} More
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="md:col-span-3 py-16 text-center text-slate-400 border border-slate-100 bg-slate-50/50 rounded-2xl">
                    No images uploaded
                  </div>
                )}
              </div>

              {/* Content Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Side Details */}
                <div className="lg:col-span-2 space-y-8">
                  
                  {/* Overview Quick Stats */}
                  {formData.category !== 'Lands' && (
                    <div>
                      <h3 className="text-lg font-bold text-[#0B2C5C] mb-4">Overview</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="p-4 bg-[#F0F4F9]/60 rounded-xl border border-slate-100">
                          <span className="text-[11px] font-semibold text-slate-400 block uppercase">Area</span>
                          <span className="text-sm font-bold text-[#0B2C5C] mt-1 block">{formData.builtUpArea} Sq-ft</span>
                        </div>
                        <div className="p-4 bg-[#F0F4F9]/60 rounded-xl border border-slate-100">
                          <span className="text-[11px] font-semibold text-slate-400 block uppercase">Bathrooms</span>
                          <span className="text-sm font-bold text-[#0B2C5C] mt-1 block">{formData.bathroomCount} Baths</span>
                        </div>
                        <div className="p-4 bg-[#F0F4F9]/60 rounded-xl border border-slate-100">
                          <span className="text-[11px] font-semibold text-slate-400 block uppercase">Balconies</span>
                          <span className="text-sm font-bold text-[#0B2C5C] mt-1 block">{formData.balconyCount || '0'} Balcony</span>
                        </div>
                        <div className="p-4 bg-[#F0F4F9]/60 rounded-xl border border-slate-100">
                          <span className="text-[11px] font-semibold text-slate-400 block uppercase">Furnishing</span>
                          <span className="text-sm font-bold text-[#0B2C5C] mt-1 block">{formData.furnishing || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.category === 'Lands' && (
                    <div>
                      <h3 className="text-lg font-bold text-[#0B2C5C] mb-4">Land Details</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-[#F0F4F9]/60 rounded-xl border border-slate-100">
                          <span className="text-[11px] font-semibold text-slate-400 block uppercase">Total Area</span>
                          <span className="text-sm font-bold text-[#0B2C5C] mt-1 block">{formData.landArea} Sq-ft</span>
                        </div>
                        <div className="p-4 bg-[#F0F4F9]/60 rounded-xl border border-slate-100">
                          <span className="text-[11px] font-semibold text-slate-400 block uppercase">Zone Type</span>
                          <span className="text-sm font-bold text-[#0B2C5C] mt-1 block">{formData.commercialZoneType || 'N/A'}</span>
                        </div>
                        <div className="p-4 bg-[#F0F4F9]/60 rounded-xl border border-slate-100">
                          <span className="text-[11px] font-semibold text-slate-400 block uppercase">Price/Sqft</span>
                          <span className="text-sm font-bold text-[#0B2C5C] mt-1 block">₹{formData.pricePerSqft || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Information Grid */}
                  <div>
                    <h3 className="text-lg font-bold text-[#0B2C5C] mb-4">Information</h3>
                    <div className="border border-slate-100 rounded-xl overflow-hidden">
                      <table className="w-full text-sm text-left">
                        <tbody>
                          <tr className="border-b border-slate-50">
                            <td className="px-5 py-3.5 bg-slate-50/50 font-semibold text-slate-500 w-1/3">Property For</td>
                            <td className="px-5 py-3.5 text-slate-800 capitalize">{formData.intent}</td>
                          </tr>
                          <tr className="border-b border-slate-50">
                            <td className="px-5 py-3.5 bg-slate-50/50 font-semibold text-slate-500">Property Type</td>
                            <td className="px-5 py-3.5 text-slate-800">{formData.propertyType}</td>
                          </tr>
                          <tr className="border-b border-slate-50">
                            <td className="px-5 py-3.5 bg-slate-50/50 font-semibold text-slate-500">Listing Role</td>
                            <td className="px-5 py-3.5 text-slate-800 capitalize">{formData.role}</td>
                          </tr>
                          {formData.category !== 'Lands' && (
                            <tr className="border-b border-slate-50">
                              <td className="px-5 py-3.5 bg-slate-50/50 font-semibold text-slate-500">Floor Number</td>
                              <td className="px-5 py-3.5 text-slate-800">{formData.floorNumber || 'Ground Floor'}</td>
                            </tr>
                          )}
                          <tr className="border-b border-slate-50">
                            <td className="px-5 py-3.5 bg-slate-50/50 font-semibold text-slate-500">Pin Code</td>
                            <td className="px-5 py-3.5 text-slate-800">{formData.pinCode}</td>
                          </tr>
                          <tr>
                            <td className="px-5 py-3.5 bg-slate-50/50 font-semibold text-slate-500">Booking Amount</td>
                            <td className="px-5 py-3.5 text-slate-800">
                              {formData.bookingAmount ? `₹${Number(formData.bookingAmount).toLocaleString('en-IN')}` : 'N/A'}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-bold text-[#0B2C5C] mb-3">Description</h3>
                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                      {formData.description || 'No description provided.'}
                    </p>
                  </div>

                  {/* Location Details Card */}
                  <div>
                    <h3 className="text-lg font-bold text-[#0B2C5C] mb-4">Location & Connectivity</h3>
                    <div className="p-5 bg-slate-50/60 border border-slate-100 rounded-xl space-y-4">
                      <div className="flex gap-2">
                        <MapPin className="w-5 h-5 text-[#035096] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-sm text-[#0B2C5C] block">Full Address</span>
                          <span className="text-xs text-slate-600 mt-0.5 block">{formData.fullAddress}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-200/60">
                        <div>
                          <span className="text-xs text-slate-400 block font-medium">Nearest Bus Stop</span>
                          <span className="text-sm font-bold text-[#0B2C5C] mt-1 block">
                            {formData.busStopDistance ? `${formData.busStopDistance} KM` : 'N/A'}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-slate-400 block font-medium">Nearest Metro</span>
                          <span className="text-sm font-bold text-[#0B2C5C] mt-1 block">
                            {formData.metroDistance ? `${formData.metroDistance} KM` : 'N/A'}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-slate-400 block font-medium">Nearest MMTS</span>
                          <span className="text-sm font-bold text-[#0B2C5C] mt-1 block">
                            {formData.mmtsDistance ? `${formData.mmtsDistance} KM` : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Side Sidebar (Contact Card) */}
                <div className="space-y-6">
                  <div className="p-6 bg-[#F0F4F9]/60 border border-slate-100 rounded-2xl shadow-sm text-left">
                    <h4 className="text-md font-bold text-[#0B2C5C] mb-4 pb-2 border-b border-slate-200">Contact Details</h4>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg text-[#035096] shadow-sm">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Contact Person</span>
                          <span className="text-sm font-bold text-slate-800">{formData.contactName}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg text-[#035096] shadow-sm">
                          <Smartphone className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Phone Number</span>
                          <span className="text-sm font-bold text-slate-800">{formData.contactPhone}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg text-[#035096] shadow-sm">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Email Address</span>
                          <span className="text-sm font-bold text-slate-800 break-all">{formData.contactEmail}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200/60">
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <Shield className="w-4 h-4 text-green-600 shrink-0" />
                        <span>Gummaam verified listing</span>
                      </div>
                    </div>
                  </div>

                  {formData.videoUrl && (
                    <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm text-left">
                      <h4 className="text-sm font-bold text-[#0B2C5C] mb-3">Property Video</h4>
                      <a 
                        href={formData.videoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-[#4885FF] hover:underline flex items-center gap-1"
                      >
                        Click to watch tour video
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>

              </div>

            </div>

            {/* Bottom Actions */}
            <div className="flex justify-end gap-5 pt-4">
              <button 
                type="button"
                onClick={handlePrevious}
                className="bg-[#035096] hover:bg-[#024078] text-white px-11 py-3.5 rounded-2xl font-semibold text-[17px] transition-colors min-w-[160px] text-center focus:outline-none"
              >
                Previous
              </button>
              <button 
                type="submit"
                className="bg-[#035096] hover:bg-[#024078] text-white px-11 py-3.5 rounded-2xl font-bold text-[17px] transition-colors min-w-[160px] text-center focus:outline-none"
              >
                Submit
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

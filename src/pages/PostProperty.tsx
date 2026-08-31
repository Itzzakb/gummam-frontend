import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { PropertyLocationMap } from '@/components/map/PropertyLocationMap';
import { DatePicker } from '@/components/ui/DatePicker';
import {
  UnitInventorySection,
  emptyUnitInventory,
  type UnitInventoryData,
  FLAT_STATUS_META,
} from '@/components/property/UnitInventorySection';
import {
  AmenitiesPopup,
  countFurnishingSelections,
  flattenAmenitiesPopup,
} from '@/components/property/AmenitiesPopup';
import {
  MediaUploadSection,
  getMediaCategories,
  type MediaItem,
} from '@/components/property/MediaUploadSection';
import { 
  Building2,
  Building,
  Home, 
  House,
  Hotel,
  Key, 
  Map, 
  MapPinned,
  User, 
  UserCheck, 
  Users,
  UserRound,
  Globe,
  Hammer, 
  Briefcase,
  Store,
  Presentation,
  Warehouse,
  Factory,
  LandPlot,
  Upload, 
  Check,
  MapPin,
  Smartphone,
  Mail,
  Trash2,
  Shield,
  ArrowRight
} from 'lucide-react';

interface RoomSize {
  length: string;
  width: string;
}

interface ShutterSize {
  length: string;
  width: string;
}

// Types for form state
interface PropertyFormData {
  // Step 1: Intent & Type
  intent: 'sell' | 'rent' | '';
  role: string;
  propertyType: string; 
  category: 'Residential' | 'Commercial' | 'Lands' | '';

  // Step 2: Details (General)
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
  furnishingSelections?: string[];
  furnishingCounts?: Record<string, number>;
  societyAmenitySelections?: string[]; 

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
  media: MediaItem[];
  thumbnailId: string;
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
  brokerageOnPropertyValue?: string;
  brokerageOnRentValue?: string;
  brokerageOnRentUnit?: string; 
  showAmenitiesOption?: string; 
  boostPostOption?: string; 
  rentPerMonth?: string;
  rentFor?: string;
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
  sublocality?: string;
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
  roomSizes?: RoomSize[];
  shutterSizes?: ShutterSize[];
  available?: string;
  pg_for?: string;
  room_type?: string;
  sharing_room?: string;
  pg_hostel_name?: string;
  attachedBathroom?: string;
  acRoomsAvailable?: string;
  pgMoreBrief?: string;
  pgPrivateRooms?: string;
  pgSharingRooms?: string;
  pgTotalBeds?: string;
  pgBedsFilled?: string;
  pgFeeDeposit?: string;
  pgFeeAdvanceDeposit?: string;
  pgEmployeeDeposits?: string;
  pgTvCount?: string;
  pgGeysersCount?: string;
  pgWashingMachineCount?: string;
  pgBuildingDeposit?: string;
  pgBuildingRentPerMonth?: string;
  pgOutrightSellPrice?: string;

  /** Multi-unit inventory for apartments / gated communities */
  unitInventory?: UnitInventoryData;
}

const ORR_EXIT_OPTIONS = [
  'Exit 1: Kokapet',
  'Exit 2: Edulanagulapally',
  'Exit 3: Patancheru',
  'Exit 4: Sultanpur',
  'Exit 5: Saregudem',
  'Exit 6: Kandlakoya',
  'Exit 7: Shamirpet',
  'Exit 8: Keeara',
  'Exit 9: Ghatkesar',
  'Exit 10: Taramatipet',
  'Exit 11: Pedda Amberpet',
  'Exit 12: Bongulur',
  'Exit 13: Raviryal',
  'Exit 14: Tukkuguda',
  'Exit 15: Pedda Golconda',
  'Exit 16: Shamshabad',
  'Exit 17: Rajendranagar',
  'Exit 18: TSPA',
  'Exit 19: Financial District',
] as const;

const formatAmountInLacCr = (value: string | number): string => {
  const amount = Number(value);
  if (!amount || Number.isNaN(amount)) return '';
  if (amount >= 1_00_00_000) {
    return `₹${parseFloat((amount / 1_00_00_000).toFixed(2))} Cr`;
  }
  if (amount >= 1_00_000) {
    return `₹${parseFloat((amount / 1_00_000).toFixed(2))} Lakhs`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
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
      const rawLabel = element.props.children;
      const label = Array.isArray(rawLabel)
        ? rawLabel.map((part) => (typeof part === 'string' || typeof part === 'number' ? String(part) : '')).join('').replace(/\s+/g, ' ').trim()
        : String(rawLabel ?? '');
      options.push({
        value: String(element.props.value || ''),
        label
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
        <div className="absolute left-0 mt-1.5 min-w-full w-max bg-white border border-slate-200 rounded-xl shadow-lg z-50 py-1.5 max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange({ target: { value: opt.value } });
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-slate-50 flex items-center justify-between gap-4 ${
                value === opt.value ? 'bg-[#F0F4F9]/60 font-semibold text-[#035096]' : 'text-slate-700'
              }`}
            >
              <span className="whitespace-nowrap">{opt.label}</span>
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

const SelectOptionCard: React.FC<{
  selected: boolean;
  onClick: () => void;
  icon: React.ElementType;
  title: string;
  desc: string;
}> = ({ selected, onClick, icon: Icon, title, desc }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center justify-between gap-3 w-full px-4 py-3.5 rounded-xl border text-left transition-all ${
      selected
        ? 'border-[#4A90E2] bg-[#EAF3FF]'
        : 'border-[#E0E0E0] bg-white hover:border-slate-300'
    }`}
  >
    <div className="flex items-center gap-3 min-w-0">
      <div className="shrink-0 w-[46px] h-[46px] rounded-[10px] bg-[#EEF7FF] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] flex items-center justify-center text-[#4A90E2]">
        <Icon className="w-[22px] h-[22px]" strokeWidth={1.75} />
      </div>
      <div className="min-w-0">
        <h3 className="font-bold text-sm text-black leading-tight">{title}</h3>
        <p className="text-xs text-[#757575] mt-0.5 leading-snug">{desc}</p>
      </div>
    </div>
    <div
      className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center shrink-0 ${
        selected ? 'bg-[#4A90E2] border-[#4A90E2]' : 'border-[#C4C4C4] bg-white'
      }`}
    >
      {selected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
    </div>
  </button>
);

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
  furnishingSelections: [],
  furnishingCounts: {},
  societyAmenitySelections: [],
  city: '',
  locality: '',
  landmark: '',
  pinCode: '',
  busStopDistance: '',
  metroDistance: '',
  mmtsDistance: '',
  fullAddress: '',
  media: [],
  thumbnailId: '',
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
  carpetAreaUnit: 'Sft.',
  builtUpAreaUnit: 'Sft.',
  superBuiltUpArea: '',
  superBuiltUpAreaUnit: 'Sft.',
  uds: '',
  fourWheelerParking: '',
  twoWheelerParking: '',
  buildingTotalFloors: '',
  facing: '',
  pricePerUnit: '',
  totalAreaVal: '',
  totalAreaUnit: 'Sft.',
  otherTaxes: 'Include',
  priceNegotiable: 'Yes',
  brokerageCharge: 'No',
  brokerageOnPropertyValue: '',
  brokerageOnRentValue: '15',
  brokerageOnRentUnit: 'Days',
  showAmenitiesOption: 'No',
  boostPostOption: 'regular',
  rentPerMonth: '',
  rentFor: '',
  securityDepositType: 'Months',
  securityDepositVal: '',
  maintenanceAmountType: '1',
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
  propertyAreaUnit: 'Sft.',
  doorNo: '',
  propertyAt: 'Select',
  shuttersCount: 'Select',
  workSpace: '',
  garageShedCarpetArea: '',
  garageShedCarpetAreaUnit: 'Sft.',
  showroomSpaceCarpetArea: '',
  showroomSpaceCarpetAreaUnit: 'Sft.',
  totalCarpetAreaVal: '',
  totalCarpetAreaUnit: 'Sft.',
  godownType: 'AC',
  closedShedCarpetArea: '',
  closedShedCarpetAreaUnit: 'Sft.',
  openSpaceCarpetArea: '',
  openSpaceCarpetAreaUnit: 'Sft.',
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
  nearbyOrrExit: '',
  ventureAmenities: [],
  additionalAmenities: '',
  locationHighlights: '',
  mapOptionValue: '',
  sublocality: '',
  roomSizes: [],
  shutterSizes: [],
  available: 'Girls',
  pg_for: 'Students',
  room_type: 'Sharing',
  sharing_room: '1',
  pg_hostel_name: '',
  attachedBathroom: 'Select',
  acRoomsAvailable: 'Select',
  pgMoreBrief: '',
  pgPrivateRooms: '',
  pgSharingRooms: '',
  pgTotalBeds: '',
  pgBedsFilled: '',
  pgFeeDeposit: '',
  pgFeeAdvanceDeposit: '',
  pgEmployeeDeposits: '',
  pgTvCount: '',
  pgGeysersCount: '',
  pgWashingMachineCount: '',
  pgBuildingDeposit: '',
  pgBuildingRentPerMonth: '',
  pgOutrightSellPrice: '',
  unitInventory: emptyUnitInventory(),
};

export const PostProperty: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, openAuthDialog } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      openAuthDialog('agent');
    } else if (user?.role !== 'agent') {
      alert('Only agents are allowed to access the Post Property page.');
      navigate('/');
      openAuthDialog('agent');
    }
  }, [isAuthenticated, user, navigate, openAuthDialog]);

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<PropertyFormData>(initialFormData);
  const [validationError, setValidationError] = useState<string>('');
  const [amenitiesPopupOpen, setAmenitiesPopupOpen] = useState(false);

  if (!isAuthenticated || user?.role !== 'agent') {
    return null;
  }

  const isLandsAcre = formData.category === 'Lands' && formData.propertyType === 'Acre' && (formData.intent === 'sell' || formData.intent === 'rent');
  const isLandsPlots = formData.category === 'Lands' && formData.propertyType === 'Plots' && (formData.intent === 'sell' || formData.intent === 'rent');
  const isCommercialShed = formData.category === 'Commercial' && formData.propertyType === 'Industrial Space/shed' && (formData.intent === 'sell' || formData.intent === 'rent');
  const isCommercialIndustrial = formData.category === 'Commercial' && formData.propertyType === 'Industrial Buildings' && (formData.intent === 'sell' || formData.intent === 'rent');
  const isCommercialGodown = formData.category === 'Commercial' && formData.propertyType === 'Warehouse/Godown' && (formData.intent === 'sell' || formData.intent === 'rent');
  const isCommercialShowroom = formData.category === 'Commercial' && formData.propertyType === 'Showrooms' && (formData.intent === 'sell' || formData.intent === 'rent');
  const isCommercialShop = formData.category === 'Commercial' && formData.propertyType === 'Shops' && (formData.intent === 'sell' || formData.intent === 'rent');
  const isCommercialOfficeSpace = formData.category === 'Commercial' && formData.propertyType === 'Office Space' && (formData.intent === 'sell' || formData.intent === 'rent');
  const isPgHostel = formData.category === 'Residential' && formData.propertyType === 'PG/Hostel' && (formData.intent === 'sell' || formData.intent === 'rent');
  const isHighRiseAptSell = (formData.category === 'Residential' && (formData.intent === 'sell' || formData.intent === 'rent')) || isCommercialOfficeSpace || isCommercialShop || isCommercialShowroom || isCommercialGodown || isCommercialIndustrial || isCommercialShed || isLandsAcre || isLandsPlots;
  const isAmenitiesDisabled = formData.propertyType === 'Independent Houses' || formData.propertyType === 'PG/Hostel' || isLandsAcre || isLandsPlots;
  const isApartmentInventory =
    formData.category === 'Residential' &&
    (formData.propertyType === 'High-rise Apts' ||
      formData.propertyType === 'Standalone Apts' ||
      formData.propertyType === 'Villa Gated Communities');
  const inventoryUnitLabel =
    formData.propertyType === 'Villa Gated Communities' ? 'villas' : 'flats';

  const updateFormData = (fields: Partial<PropertyFormData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
    setValidationError('');
  };

  const clampPgBrief = (value: string) => {
    const words = value.match(/\S+/g);
    if (!words || words.length <= 400) return value;
    return words.slice(0, 400).join(' ');
  };

  const clampPgRange = (value: string, min: number, max: number) => {
    if (value === '') return '';
    const n = Number(value);
    if (Number.isNaN(n)) return '';
    return String(Math.min(max, Math.max(min, Math.trunc(n))));
  };

  const rentPricingFields = (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-500 uppercase">Rent per month</label>
        <input
          type="text"
          inputMode="numeric"
          placeholder="e.g. 15000"
          value={formData.rentPerMonth || ''}
          onChange={e => updateFormData({ rentPerMonth: e.target.value.replace(/[^\d]/g, '') })}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-500 uppercase">Security Deposit</label>
        <div className="flex rounded-xl border border-slate-200 focus-within:border-[#4885FF] overflow-hidden">
          <input
            type="text"
            inputMode="numeric"
            placeholder="Number"
            value={formData.securityDepositVal || ''}
            onChange={e => updateFormData({ securityDepositVal: e.target.value.replace(/[^\d]/g, '') })}
            className="w-full px-4 py-3 focus:outline-none text-sm text-slate-800"
          />
          <CustomSelect
            value={formData.securityDepositType || 'Months'}
            onChange={e => updateFormData({ securityDepositType: e.target.value })}
            className="px-3 min-w-[7.5rem] bg-slate-50 border-l border-slate-200 focus:outline-none text-sm text-slate-600 bg-white"
          >
            <option value="Months">Months</option>
            <option value="Years">Years</option>
          </CustomSelect>
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-500 uppercase">Maintenance Amount</label>
        <div className="flex rounded-xl border border-slate-200 focus-within:border-[#4885FF] overflow-hidden">
          <input
            type="text"
            inputMode="numeric"
            placeholder="e.g. 1000"
            value={formData.maintenanceAmountVal || ''}
            onChange={e => updateFormData({ maintenanceAmountVal: e.target.value.replace(/[^\d]/g, '') })}
            className="w-full px-4 py-3 focus:outline-none text-sm text-slate-800"
          />
          <CustomSelect
            value={formData.maintenanceAmountType || '1'}
            onChange={e => updateFormData({ maintenanceAmountType: e.target.value })}
            className="px-3 min-w-[8.5rem] bg-slate-50 border-l border-slate-200 focus:outline-none text-sm text-slate-600 bg-white"
          >
            {Array.from({ length: 12 }, (_, i) => {
              const month = String(i + 1);
              const label = month === '1' ? '1 Month' : `${month} Months`;
              return (
                <option key={month} value={month}>{label}</option>
              );
            })}
          </CustomSelect>
        </div>
      </div>
    </div>
  );

  const handleBedroomCountChange = (value: string) => {
    const count = parseInt(value) || 0;
    const newRoomSizes = Array.from({ length: count }, (_, i) => ({
      length: formData.roomSizes?.[i]?.length || '',
      width: formData.roomSizes?.[i]?.width || '',
    }));
    updateFormData({ bedroomCount: value, roomSizes: newRoomSizes });
  };

  const handleShuttersCountChange = (value: string) => {
    const count = parseInt(value) || 0;
    const newShutterSizes = Array.from({ length: count }, (_, i) => ({
      length: formData.shutterSizes?.[i]?.length || '',
      width: formData.shutterSizes?.[i]?.width || '',
    }));
    updateFormData({ shuttersCount: value, shutterSizes: newShutterSizes });
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

  const amenitiesPopupValue = {
    furnishings: formData.furnishingSelections || [],
    counts: formData.furnishingCounts || {},
    society: formData.societyAmenitySelections || [],
  };
  const selectedAmenityLabels = flattenAmenitiesPopup(amenitiesPopupValue);

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
      if (!formData.propertyType) {
        setValidationError('Please select a property type.');
        return false;
      }
    }
    if (step === 2) {
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
          if (!formData.costPerYd) return triggerError('Amount per yd is required.');
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
        } else if (isPgHostel) {
          if (!formData.locality) return triggerError('Locality is required.');
          if (formData.intent === 'sell') {
            if (!formData.pgOutrightSellPrice) return triggerError('Outright sell price is required.');
            formData.expectedPrice = formData.pgOutrightSellPrice;
          } else if (!formData.rentPerMonth) {
            return triggerError('Per Month Fee is required.');
          }
          if (!formData.totalAreaVal) formData.totalAreaVal = '0';
        } else {
          if (!formData.locality) return triggerError('Locality is required.');
          if (!formData.totalAreaVal && (isCommercialOfficeSpace || isCommercialShop || isCommercialShowroom || isCommercialGodown || isCommercialIndustrial || isCommercialShed) && formData.propertyAreaVal) {
            formData.totalAreaVal = formData.propertyAreaVal;
          }
          if (!formData.totalAreaVal) return triggerError('Total Area is required.');
          if (formData.intent === 'sell') {
            if (!formData.pricePerUnit) return triggerError('Property Price Per is required.');
          } else if (formData.intent === 'rent') {
            if (!formData.rentPerMonth) return triggerError('Rent per Month is required.');
          }
        }
        
        // Auto-populate required fields for review/api compatibility
        const isComm = isCommercialOfficeSpace || isCommercialShop || isCommercialShowroom || isCommercialGodown || isCommercialIndustrial || isCommercialShed;
        const bedroomStr = (isCommercialOfficeSpace || isCommercialIndustrial) 
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
          : isPgHostel
          ? `${formData.pg_hostel_name || 'PG/Hostel'} in ${formData.locality || 'Premium Locality'}`
          : isComm 
          ? `${bedroomStr} Commercial ${propTypeLabel} in ${projName}`
          : `${bedroomStr} ${propTypeLabel} in ${projName}`;
        const derivedDesc = isLandsAcre
          ? `Premium Lands of ${formData.landAcre || '0'} Acres and ${formData.landGuntas || '0'} Guntas in ${formData.village || 'Locality'}. Boundary: ${formData.boundary || 'N/A'}, soil type: ${formData.soilType || 'N/A'}, nature of land: ${formData.natureOfLand || 'N/A'}.`
          : isLandsPlots
          ? `Premium Plot of ${formData.plotAreaSqYds || '0'} Sq.Yds in ${formData.village || 'Locality'}. Facing: ${formData.facing || 'N/A'}, corner plot: ${formData.cornerPlot || 'No'}.`
          : isPgHostel
          ? `${formData.pg_hostel_name || 'PG/Hostel'} ${formData.intent === 'rent' ? 'for rent' : 'for sale'} in ${formData.locality || 'Premium Locality'}.${formData.pgMoreBrief ? ' ' + formData.pgMoreBrief : ''}`
          : isComm 
          ? ((isCommercialOfficeSpace || isCommercialIndustrial)
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
        if ((formData.media || []).filter(item => item.kind === 'image').length < 3) {
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
      setCurrentStep((prev) => Math.min(prev + 1, 3));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    setValidationError('');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
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
    if (!validateStep(2)) return;
    
    alert('Property listed successfully!');
    navigate('/');
  };

  const mediaItems = formData.media || [];

  const mediaCategories = getMediaCategories({
    category: formData.category,
    propertyType: formData.propertyType,
    bedroomCount: formData.bedroomCount,
  });

  const uploadedImages = mediaItems.filter(item => item.kind === 'image');

  const galleryPreviews = [
    ...uploadedImages.filter(item => item.id === formData.thumbnailId),
    ...uploadedImages.filter(item => item.id !== formData.thumbnailId),
  ].map(item => item.preview);

  const mediaUploadSection = (
    <MediaUploadSection
      items={mediaItems}
      thumbnailId={formData.thumbnailId || ''}
      categories={mediaCategories}
      onChange={({ items, thumbnailId }) => updateFormData({ media: items, thumbnailId })}
    />
  );

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

        {/* Stepper Header — sticks below the site navbar while scrolling */}
        <div className="sticky top-[88px] z-40 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-100 p-8 mb-8">
          <div className="flex items-center justify-between w-full mb-6 overflow-x-auto pb-2 scrollbar-none">
            {/* Step 1: Intent + Type */}
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
              <span className={`text-base font-semibold ${currentStep === 1 ? 'text-[#0B2C5C]' : 'text-slate-800'}`}>Intent & Type</span>
            </div>

            <div className={`h-1.5 flex-1 min-w-[30px] mx-4 rounded-full transition-all ${currentStep > 1 ? 'bg-[#00C800]' : 'bg-[#E5E9F0]'}`} />

            {/* Step 2: Details */}
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
              <span className={`text-base font-semibold ${currentStep === 2 ? 'text-[#0B2C5C]' : 'text-slate-800'}`}>Property Details</span>
            </div>

            <div className={`h-1.5 flex-1 min-w-[30px] mx-4 rounded-full transition-all ${currentStep > 2 ? 'bg-[#00C800]' : 'bg-[#E5E9F0]'}`} />

            {/* Step 3: Review */}
            <div 
              onClick={() => handleStepClick(3)}
              className="flex items-center gap-3 shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-base transition-all ${
                currentStep === 3 
                  ? 'bg-[#035096] text-white' 
                  : 'bg-[#D0E7FF] text-[#035096]'
              }`}>
                3
              </div>
              <span className={`text-base font-semibold ${currentStep === 3 ? 'text-[#0B2C5C]' : 'text-slate-800'}`}>Review & Submit</span>
            </div>
          </div>

          {/* Step-1 selection breadcrumbs */}
          {(formData.intent || formData.role || formData.propertyType) && (
            <div className="pt-2 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 mr-1">
                  Selected
                </span>
                {[
                  formData.intent
                    ? {
                        key: 'intent',
                        label:
                          formData.intent === 'rent'
                            ? formData.rentFor
                              ? `Rent / Lease · ${formData.rentFor}`
                              : 'Rent / Lease'
                            : 'Sell',
                      }
                    : null,
                  formData.role
                    ? {
                        key: 'role',
                        label:
                          formData.role === 'builder/developer'
                            ? 'Builder/Developer'
                            : formData.role === 'marketing employee'
                              ? 'Marketing Employee'
                              : formData.role.charAt(0).toUpperCase() + formData.role.slice(1),
                      }
                    : null,
                  formData.category
                    ? { key: 'category', label: formData.category }
                    : null,
                  formData.propertyType
                    ? { key: 'type', label: formData.propertyType }
                    : null,
                ]
                  .filter(Boolean)
                  .map((crumb, index) => (
                    <React.Fragment key={(crumb as { key: string }).key}>
                      {index > 0 && (
                        <span className="text-slate-400 font-medium select-none" aria-hidden>
                          &gt;
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleStepClick(1)}
                        title="Edit in Intent & Type"
                        className={`text-sm font-medium transition-colors cursor-pointer ${
                          currentStep === 1
                            ? 'text-[#035096]'
                            : 'text-slate-700 hover:text-[#035096]'
                        }`}
                      >
                        {(crumb as { label: string }).label}
                      </button>
                    </React.Fragment>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Validation Alert */}
        {validationError && (
          <div className="bg-red-50 text-red-700 text-sm font-medium border border-red-200 rounded-xl p-4 mb-6 text-left">
            {validationError}
          </div>
        )}

        {/* --- STEP 1: INTENT & TYPE --- */}
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-slate-100 p-8 sm:p-10 text-left">
            {/* Intent Section */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-black mb-1">What is this property for?</h2>
              <p className="text-xs text-slate-400 mb-6">Choose whether you want to sell your property or rent/lease it out.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { key: 'sell' as const, title: 'Sell', desc: 'List your property for sale', icon: Building2 },
                  { key: 'rent' as const, title: 'Rent / Lease', desc: 'List your property for rent or lease', icon: Key },
                ].map(item => (
                  <SelectOptionCard
                    key={item.key}
                    selected={formData.intent === item.key}
                    onClick={() => updateFormData({ intent: item.key })}
                    icon={item.icon}
                    title={item.title}
                    desc={item.desc}
                  />
                ))}
              </div>
            </div>

            {formData.intent === 'rent' && (
              <div className="mb-10 pt-4 border-t border-slate-100">
                <h2 className="text-xl font-bold text-black mb-1">Rent For?</h2>
                <p className="text-xs text-slate-400 mb-6">Select the target tenants for your property.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { key: 'Family', title: 'Family', desc: 'For families and couples', icon: Users },
                    { key: 'Bachelors', title: 'Bachelors', desc: 'For students/bachelors', icon: UserRound },
                    { key: 'Company', title: 'Company', desc: 'For corporate/companies', icon: Building },
                    { key: 'Anyone', title: 'Anyone', desc: 'Open to any tenant type', icon: Globe }
                  ].map(item => (
                    <SelectOptionCard
                      key={item.key}
                      selected={formData.rentFor === item.key}
                      onClick={() => updateFormData({ rentFor: item.key })}
                      icon={item.icon}
                      title={item.title}
                      desc={item.desc}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Role Section */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-black mb-1">Who is listing this property?</h2>
              <p className="text-xs text-slate-400 mb-6">Select the role that best describes you.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { key: 'owner', title: 'Owner', desc: 'I am the owner', icon: User },
                  { key: 'agent', title: 'Agent', desc: 'I am a real estate agent', icon: UserCheck },
                  { key: 'builder/developer', title: 'Builder/Developer', desc: 'I am a builder/developer', icon: Hammer },
                  { key: 'marketing employee', title: 'Marketing Employee', desc: 'I am a marketing employee', icon: Briefcase },
                ].map(item => (
                  <SelectOptionCard
                    key={item.key}
                    selected={formData.role === item.key}
                    onClick={() => updateFormData({ role: item.key })}
                    icon={item.icon}
                    title={item.title}
                    desc={item.desc}
                  />
                ))}
              </div>
            </div>

            {/* Property Type (combined into Step 1) */}
            <div className="mb-10 pt-6 border-t border-slate-100">
              <h2 className="text-xl font-bold text-black mb-1">Select property type</h2>
              <p className="text-xs text-slate-400 mb-5">Choose the category that best matches your listing.</p>

              <div className="flex w-full overflow-hidden rounded-full border border-slate-300 divide-x divide-slate-300 mb-8">
                {[
                  { key: 'Residential' as const, label: 'Residential', icon: Home },
                  { key: 'Commercial' as const, label: 'Commercial', icon: Building2 },
                  { key: 'Lands' as const, label: 'Land', icon: MapPin },
                ].map((item) => {
                  const selected = (formData.category || 'Residential') === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => {
                        if (formData.category === item.key) return;
                        const updates: Partial<PropertyFormData> = {
                          category: item.key,
                          propertyType: '',
                          unitInventory: emptyUnitInventory(),
                        };
                        if (item.key === 'Lands') {
                          updates.showAmenitiesOption = 'No';
                          updates.amenities = [];
                          updates.furnishingSelections = [];
                          updates.furnishingCounts = {};
                          updates.societyAmenitySelections = [];
                        }
                        updateFormData(updates);
                      }}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-2 text-sm font-semibold transition-colors ${
                        selected
                          ? 'bg-[#4A90E2] text-white'
                          : 'bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" strokeWidth={1.75} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {(formData.category || 'Residential') === 'Residential' && (
                <div>
                  <p className="text-xs text-slate-400 mb-6">Find the perfect home for you</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { title: 'High-rise Apts', desc: 'Luxury apartments in towers', icon: Building2 },
                      { title: 'Standalone Apts', desc: 'Independent apartment complexes', icon: Building },
                      { title: 'Villa Gated Communities', desc: 'Private villas in secure communities', icon: Home },
                      { title: 'Independent Houses', desc: 'Stand-alone houses and homes', icon: House },
                      { title: 'PG/Hostel', desc: 'Paying guest and shared hostels', icon: Hotel },
                    ].map(item => (
                      <SelectOptionCard
                        key={item.title}
                        selected={formData.propertyType === item.title}
                        onClick={() => {
                          const updates: Partial<PropertyFormData> = { propertyType: item.title, category: 'Residential' };
                          if (item.title === 'Independent Houses' || item.title === 'PG/Hostel') {
                            updates.showAmenitiesOption = 'No';
                            updates.amenities = [];
                            updates.furnishingSelections = [];
                            updates.furnishingCounts = {};
                            updates.societyAmenitySelections = [];
                            updates.landmark = '';
                            updates.unitInventory = emptyUnitInventory();
                          }
                          updateFormData(updates);
                        }}
                        icon={item.icon}
                        title={item.title}
                        desc={item.desc}
                      />
                    ))}
                  </div>
                </div>
              )}

              {formData.category === 'Commercial' && (
                <div>
                  <p className="text-xs text-slate-400 mb-6">Explore commercial spaces and opportunities</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { title: 'Office Space', desc: 'Offices and co-working spaces', icon: Briefcase },
                      { title: 'Shops', desc: 'Retail stores and shops', icon: Store },
                      { title: 'Showrooms', desc: 'Front-facing displays and showrooms', icon: Presentation },
                      { title: 'Warehouse/Godown', desc: 'Storage and logistics warehouses', icon: Warehouse },
                      { title: 'Industrial Buildings', desc: 'Manufacturing plants and facilities', icon: Factory },
                      { title: 'Industrial Space/shed', desc: 'Industrial sheds and storage yards', icon: LandPlot },
                    ].map(item => (
                      <SelectOptionCard
                        key={item.title}
                        selected={formData.propertyType === item.title}
                        onClick={() =>
                          updateFormData({
                            propertyType: item.title,
                            category: 'Commercial',
                            unitInventory: emptyUnitInventory(),
                          })
                        }
                        icon={item.icon}
                        title={item.title}
                        desc={item.desc}
                      />
                    ))}
                  </div>
                </div>
              )}

              {formData.category === 'Lands' && (
                <div>
                  <p className="text-xs text-slate-400 mb-6">Invest in land plots or agricultural areas</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { title: 'Acre', desc: 'Large area lands and farms', icon: Map },
                      { title: 'Plots', desc: 'Residential and commercial plots', icon: MapPinned },
                    ].map(item => (
                      <SelectOptionCard
                        key={item.title}
                        selected={formData.propertyType === item.title}
                        onClick={() => {
                          const updates: Partial<PropertyFormData> = {
                            propertyType: item.title,
                            category: 'Lands',
                            unitInventory: emptyUnitInventory(),
                          };
                          updates.showAmenitiesOption = 'No';
                          updates.amenities = [];
                          updates.furnishingSelections = [];
                          updates.furnishingCounts = {};
                          updates.societyAmenitySelections = [];
                          updateFormData(updates);
                        }}
                        icon={item.icon}
                        title={item.title}
                        desc={item.desc}
                      />
                    ))}
                  </div>
                </div>
              )}
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

        {/* --- STEP 2: PROPERTY DETAILS FORM --- */}
        {currentStep === 2 && (
          <form onSubmit={handleSubmit} className="space-y-8 text-left">
            {isHighRiseAptSell ? (
              <div className="bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-slate-100 p-8 sm:p-10 space-y-10">
                {isLandsAcre ? (
                  <>
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
                            <option value="Commercial">Commercial</option>
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
                                <option key={num} value={String(num)}>{`${num} Acre${num > 1 ? 's' : ''}`}</option>
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
                                <option key={num} value={String(num)}>{`${num} Gunta${num !== 1 ? 's' : ''}`}</option>
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
                              value={formData.totalCost ? formatAmountInLacCr(formData.totalCost) : ''}
                              disabled
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-500 font-medium"
                            />
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
                            <option value="Agriculture use zone">Agriculture use zone</option>
                            <option value="Residential Use Zone-R1">Residential Use Zone-R1</option>
                            <option value="Residential Use Zone-R2">Residential Use Zone-R2</option>
                            <option value="Residential Use Zone-R3">Residential Use Zone-R3</option>
                            <option value="Residential Use Zone-R4">Residential Use Zone-R4</option>
                            <option value="Conservation Zone">Conservation Zone</option>
                            <option value="Peri-Urban Use Zone">Peri-Urban Use Zone</option>
                            <option value="Commercial Use Zone">Commercial Use Zone</option>
                            <option value="Manufacturing Use Zone">Manufacturing Use Zone</option>
                            <option value="Recreation and open space use zone">Recreation and open space use zone</option>
                            <option value="Multiple Use Zone">Multiple Use Zone</option>
                            <option value="Public, Semi-Public Facilities and Utilities Use Zone">Public, Semi-Public Facilities and Utilities Use Zone</option>
                            <option value="Forest Zone">Forest Zone</option>
                            <option value="Water Bodies Zone">Water Bodies Zone</option>
                            <option value="Agriculture Use Zone">Agriculture Use Zone</option>
                            <option value="Traffic and Transportation Use Zone">Traffic and Transportation Use Zone</option>
                            <option value="Recreation and Open Space Use Zone">Recreation and Open Space Use Zone</option>
                            <option value="Special Reservations Zone">Special Reservations Zone</option>
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
                          <option value="Vijayawada Highway">Vijayawada Highway</option>
                          <option value="Srisailam Highway">Srisailam Highway</option>
                          <option value="Bangalore Highway">Bangalore Highway</option>
                          <option value="Mumbai Highway">Mumbai Highway</option>
                          <option value="Warangal Highway">Warangal Highway</option>
                          <option value="Sagar Highway">Sagar Highway</option>
                          <option value="Karimnagar Highway">Karimnagar Highway</option>
                          <option value="Nizamabad Highway">Nizamabad Highway</option>
                          <option value="Nagpur Highway">Nagpur Highway</option>
                          <option value="Medak Highway">Medak Highway</option>
                          <option value="Kodangal Highway">Kodangal Highway</option>
                          <option value="Nanded Highway">Nanded Highway</option>
                        </CustomSelect>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">ORR Exit Number</label>
                        <CustomSelect
                          value={formData.nearbyOrrExit || ''}
                          onChange={e => updateFormData({ nearbyOrrExit: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                        >
                          <option value="">Select Exit</option>
                          {ORR_EXIT_OPTIONS.map((exit) => (
                            <option key={exit} value={exit}>{exit}</option>
                          ))}
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
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Permissions</label>
                        <CustomSelect
                          value={formData.permissions || ''}
                          onChange={e => updateFormData({ permissions: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                        >
                          <option value="">Select Permission</option>
                          <option value="HMDA">HMDA</option>
                          <option value="DTCP">DTCP</option>
                          <option value="FCDA">FCDA</option>
                          <option value="KUDA">KUDA</option>
                          <option value="SUDA">SUDA</option>
                          <option value="YTDA">YTDA</option>
                          <option value="VTADA">VTADA</option>
                          <option value="QQSUDA">QQSUDA</option>
                          <option value="HUDA">HUDA</option>
                          <option value="GP">GP</option>
                          <option value="FARM LAND">FARM LAND</option>
                          <option value="Other">Other</option>
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

                    {/* --- Property Location & Map --- */}
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Property Location</label>
                          <input
                            type="text"
                            placeholder="e.g. Ameerpet"
                            value={formData.mapOptionValue || ''}
                            onChange={e => updateFormData({ mapOptionValue: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Sublocality/Area/Street</label>
                          <input
                            type="text"
                            placeholder="e.g. Street / colony / landmark"
                            value={formData.sublocality || ''}
                            onChange={e => updateFormData({ sublocality: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                          />
                        </div>
                      </div>
                      <PropertyLocationMap
                        location={formData.mapOptionValue || ''}
                        sublocality={formData.sublocality || ''}
                      />
                    </div>
                    {formData.intent === 'rent' && (
                      <div>
                        <h3 className="text-lg font-bold text-[#0B2C5C] mb-4 pb-2 border-b border-slate-100">Rental Details</h3>
                        {rentPricingFields}
                      </div>
                    )}
                  </>
                ) : isLandsPlots ? (
                  <>
                    {/* --- Venture Details Section --- */}
                    <div>
                      <h3 className="text-lg font-bold text-[#0B2C5C] mb-4 pb-2 border-b border-slate-100">Venture Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Plot Dimensions Column */}
                        <div className="space-y-4">
                          <label className="block text-sm font-semibold text-[#0B2C5C]">Plot Dimensions <span className="text-red-500">*</span></label>
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

                        {/* Amount per yd / Total Cost */}
                        <div className="space-y-4">
                          <label className="block text-sm font-semibold text-[#0B2C5C] invisible select-none" aria-hidden="true">
                            &nbsp;
                          </label>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="block text-[11px] font-semibold text-slate-500 uppercase">Amount per yd <span className="text-red-500">*</span></label>
                              <input
                                type="number"
                                placeholder="Enter amount"
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
                                value={formData.totalCost ? formatAmountInLacCr(formData.totalCost) : ''}
                                disabled
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-500 font-medium"
                              />
                            </div>
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
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Permissions</label>
                        <CustomSelect
                          value={formData.permissions || ''}
                          onChange={e => updateFormData({ permissions: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                        >
                          <option value="">Select Permission</option>
                          <option value="HMDA">HMDA</option>
                          <option value="DTCP">DTCP</option>
                          <option value="FCDA">FCDA</option>
                          <option value="KUDA">KUDA</option>
                          <option value="SUDA">SUDA</option>
                          <option value="YTDA">YTDA</option>
                          <option value="VTADA">VTADA</option>
                          <option value="QQSUDA">QQSUDA</option>
                          <option value="HUDA">HUDA</option>
                          <option value="GP">GP</option>
                          <option value="FARM LAND">FARM LAND</option>
                          <option value="Other">Other</option>
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
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Rera Number</label>
                        <input
                          type="text"
                          placeholder="Rera Number"
                          value={formData.reraNumber || ''}
                          onChange={e => updateFormData({ reraNumber: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
                          type="month"
                          placeholder="MM-YYYY"
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
                            <option value="Agriculture use zone">Agriculture use zone</option>
                            <option value="Residential Use Zone-R1">Residential Use Zone-R1</option>
                            <option value="Residential Use Zone-R2">Residential Use Zone-R2</option>
                            <option value="Residential Use Zone-R3">Residential Use Zone-R3</option>
                            <option value="Residential Use Zone-R4">Residential Use Zone-R4</option>
                            <option value="Conservation Zone">Conservation Zone</option>
                            <option value="Peri-Urban Use Zone">Peri-Urban Use Zone</option>
                            <option value="Commercial Use Zone">Commercial Use Zone</option>
                            <option value="Manufacturing Use Zone">Manufacturing Use Zone</option>
                            <option value="Recreation and open space use zone">Recreation and open space use zone</option>
                            <option value="Multiple Use Zone">Multiple Use Zone</option>
                            <option value="Public, Semi-Public Facilities and Utilities Use Zone">Public, Semi-Public Facilities and Utilities Use Zone</option>
                            <option value="Forest Zone">Forest Zone</option>
                            <option value="Water Bodies Zone">Water Bodies Zone</option>
                            <option value="Agriculture Use Zone">Agriculture Use Zone</option>
                            <option value="Traffic and Transportation Use Zone">Traffic and Transportation Use Zone</option>
                            <option value="Recreation and Open Space Use Zone">Recreation and Open Space Use Zone</option>
                            <option value="Special Reservations Zone">Special Reservations Zone</option>
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
                            <option value="Vijayawada Highway">Vijayawada Highway</option>
                            <option value="Srisailam Highway">Srisailam Highway</option>
                            <option value="Bangalore Highway">Bangalore Highway</option>
                            <option value="Mumbai Highway">Mumbai Highway</option>
                            <option value="Warangal Highway">Warangal Highway</option>
                            <option value="Sagar Highway">Sagar Highway</option>
                            <option value="Karimnagar Highway">Karimnagar Highway</option>
                            <option value="Nizamabad Highway">Nizamabad Highway</option>
                            <option value="Nagpur Highway">Nagpur Highway</option>
                            <option value="Medak Highway">Medak Highway</option>
                            <option value="Kodangal Highway">Kodangal Highway</option>
                            <option value="Nanded Highway">Nanded Highway</option>
                          </CustomSelect>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">ORR Exit Number</label>
                          <CustomSelect
                            value={formData.nearbyOrrExit || ''}
                            onChange={e => updateFormData({ nearbyOrrExit: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                          >
                            <option value="">Select Exit</option>
                            {ORR_EXIT_OPTIONS.map((exit) => (
                              <option key={exit} value={exit}>{exit}</option>
                            ))}
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

                    {/* --- Property Location & Map --- */}
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Property Location</label>
                          <input
                            type="text"
                            placeholder="e.g. Ameerpet"
                            value={formData.mapOptionValue || ''}
                            onChange={e => updateFormData({ mapOptionValue: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">Sublocality/Area/Street</label>
                          <input
                            type="text"
                            placeholder="e.g. Street / colony / landmark"
                            value={formData.sublocality || ''}
                            onChange={e => updateFormData({ sublocality: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                          />
                        </div>
                      </div>
                      <PropertyLocationMap
                        location={formData.mapOptionValue || ''}
                        sublocality={formData.sublocality || ''}
                      />
                    </div>
                    {formData.intent === 'rent' && (
                      <div>
                        <h3 className="text-lg font-bold text-[#0B2C5C] mb-4 pb-2 border-b border-slate-100">Rental Details</h3>
                        {rentPricingFields}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {/* --- Locality Details Section --- */}
                <div>
                  <h3 className="text-lg font-bold text-[#0B2C5C] mb-4 pb-2 border-b border-slate-100">Locality Details</h3>
                  <div className={`grid grid-cols-1 sm:grid-cols-2 ${
                    isCommercialShed || isCommercialIndustrial || isCommercialGodown || isCommercialShowroom || isPgHostel || (formData.intent === 'rent' && !isCommercialOfficeSpace)
                      ? 'md:grid-cols-2'
                      : 'md:grid-cols-3'
                  } gap-6`}>
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-slate-500 uppercase">
                        Area, Locality <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center w-full px-3 py-3 rounded-xl border border-slate-200 focus-within:border-[#4885FF] bg-white">
                        <MapPin className="w-4 h-4 text-[#035096] shrink-0 mr-2" />
                        <input
                          type="text"
                          placeholder="Area"
                          aria-label="Area"
                          value={formData.byArea || ''}
                          onChange={e => updateFormData({ byArea: e.target.value })}
                          className="min-w-0 flex-1 bg-transparent focus:outline-none text-sm text-slate-800 placeholder:text-slate-400"
                        />
                        <span className="px-1.5 text-slate-400 select-none">,</span>
                        <input
                          type="text"
                          placeholder="Locality"
                          aria-label="Locality"
                          value={formData.locality || ''}
                          onChange={e => updateFormData({ locality: e.target.value })}
                          className="min-w-0 flex-1 bg-transparent focus:outline-none text-sm text-slate-800 placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                    {!(isCommercialShed || isCommercialIndustrial || isCommercialGodown || isCommercialShowroom || isPgHostel) && (
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
                    )}
                    {(isCommercialOfficeSpace || isCommercialShop || isCommercialShowroom || isCommercialGodown || isCommercialIndustrial || isCommercialShed) ? (
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
                      formData.intent !== 'rent' && !isPgHostel && (
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
                    {formData.propertyType === 'PG/Hostel' ? (
                      formData.intent === 'sell' ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Hostel</label>
                            <CustomSelect
                              value={formData.available === 'Others' ? 'Co-living' : (formData.available || 'Girls')}
                              onChange={e => updateFormData({ available: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                            >
                              <option value="Girls">Girls</option>
                              <option value="Boys">Boys</option>
                              <option value="Co-living">Co-living</option>
                            </CustomSelect>
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">For</label>
                            <CustomSelect
                              value={formData.pg_for || 'Students'}
                              onChange={e => updateFormData({ pg_for: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                            >
                              <option value="Students">Students</option>
                              <option value="Working People">Working People</option>
                              <option value="Both">Both</option>
                            </CustomSelect>
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Private Rooms</label>
                            <input
                              type="number"
                              min={1}
                              max={100}
                              placeholder="1-100"
                              value={formData.pgPrivateRooms || ''}
                              onChange={e => updateFormData({ pgPrivateRooms: clampPgRange(e.target.value, 1, 100) })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Sharing Rooms</label>
                            <input
                              type="number"
                              min={1}
                              max={100}
                              placeholder="1-100"
                              value={formData.pgSharingRooms || ''}
                              onChange={e => updateFormData({ pgSharingRooms: clampPgRange(e.target.value, 1, 100) })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Total Beds</label>
                            <input
                              type="number"
                              min={1}
                              max={500}
                              placeholder="1-500"
                              value={formData.pgTotalBeds || ''}
                              onChange={e => updateFormData({ pgTotalBeds: clampPgRange(e.target.value, 1, 500) })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Beds Filled</label>
                            <input
                              type="number"
                              min={1}
                              max={500}
                              placeholder="1-500"
                              value={formData.pgBedsFilled || ''}
                              onChange={e => updateFormData({ pgBedsFilled: clampPgRange(e.target.value, 1, 500) })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Fee Deposit</label>
                            <input
                              type="text"
                              placeholder="Enter fee deposit"
                              value={formData.pgFeeDeposit || ''}
                              onChange={e => updateFormData({ pgFeeDeposit: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Fee Advance Deposit</label>
                            <input
                              type="text"
                              placeholder="Enter advance deposit"
                              value={formData.pgFeeAdvanceDeposit || ''}
                              onChange={e => updateFormData({ pgFeeAdvanceDeposit: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Employee Deposits</label>
                            <input
                              type="text"
                              placeholder="Enter amount"
                              value={formData.pgEmployeeDeposits || ''}
                              onChange={e => updateFormData({ pgEmployeeDeposits: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">TV</label>
                            <input
                              type="number"
                              min={0}
                              placeholder="Count"
                              value={formData.pgTvCount || ''}
                              onChange={e => updateFormData({ pgTvCount: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Geysers</label>
                            <input
                              type="number"
                              min={0}
                              placeholder="Count"
                              value={formData.pgGeysersCount || ''}
                              onChange={e => updateFormData({ pgGeysersCount: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Washing Machine</label>
                            <input
                              type="number"
                              min={0}
                              placeholder="Count"
                              value={formData.pgWashingMachineCount || ''}
                              onChange={e => updateFormData({ pgWashingMachineCount: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Two Wheeler Parking</label>
                            <input
                              type="number"
                              min={0}
                              placeholder="Count"
                              value={formData.twoWheelerParking || ''}
                              onChange={e => updateFormData({ twoWheelerParking: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Four Wheeler Parking</label>
                            <input
                              type="number"
                              min={0}
                              placeholder="Count"
                              value={formData.fourWheelerParking || ''}
                              onChange={e => updateFormData({ fourWheelerParking: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Building Deposit</label>
                            <input
                              type="text"
                              placeholder="Enter amount"
                              value={formData.pgBuildingDeposit || ''}
                              onChange={e => updateFormData({ pgBuildingDeposit: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Building Rent per Month</label>
                            <input
                              type="text"
                              placeholder="Enter amount"
                              value={formData.pgBuildingRentPerMonth || ''}
                              onChange={e => updateFormData({ pgBuildingRentPerMonth: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Outright Sell Price</label>
                            <input
                              type="text"
                              placeholder="Enter price"
                              value={formData.pgOutrightSellPrice || ''}
                              onChange={e => updateFormData({ pgOutrightSellPrice: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">More Brief about PG</label>
                          <textarea
                            rows={5}
                            placeholder="Write about the PG (max 400 words)"
                            value={formData.pgMoreBrief || ''}
                            onChange={e => updateFormData({ pgMoreBrief: clampPgBrief(e.target.value) })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 resize-none"
                          />
                          <p className="text-xs text-slate-400">
                            {(formData.pgMoreBrief || '').trim() ? (formData.pgMoreBrief || '').trim().split(/\s+/).length : 0}/400 words
                          </p>
                        </div>
                      </div>
                      ) : (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Available</label>
                            <CustomSelect
                              value={formData.available === 'Co-living' ? 'Others' : (formData.available || 'Girls')}
                              onChange={e => updateFormData({ available: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                            >
                              <option value="Girls">Girls</option>
                              <option value="Boys">Boys</option>
                              <option value="Others">Others</option>
                            </CustomSelect>
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">For</label>
                            <CustomSelect
                              value={formData.pg_for || 'Students'}
                              onChange={e => updateFormData({ pg_for: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                            >
                              <option value="Students">Students</option>
                              <option value="Working People">Working People</option>
                              <option value="Both">Both</option>
                            </CustomSelect>
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Room Type</label>
                            <CustomSelect
                              value={formData.room_type || 'Sharing'}
                              onChange={e => updateFormData({ room_type: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                            >
                              <option value="Sharing">Sharing</option>
                              <option value="Private">Private</option>
                            </CustomSelect>
                          </div>
                          {formData.room_type !== 'Private' && (
                            <div className="space-y-2">
                              <label className="block text-xs font-semibold text-slate-500 uppercase">Sharing in Room</label>
                              <CustomSelect
                                value={formData.sharing_room || '1'}
                                onChange={e => updateFormData({ sharing_room: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                              >
                                {Array.from({ length: 10 }, (_, i) => String(i + 1)).map(num => (
                                  <option key={num} value={num}>{num} Sharing</option>
                                ))}
                              </CustomSelect>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Attached Bathroom</label>
                            <CustomSelect
                              value={formData.attachedBathroom || 'Select'}
                              onChange={e => updateFormData({ attachedBathroom: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                            >
                              <option value="Select">Select</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </CustomSelect>
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">AC Rooms Available</label>
                            <CustomSelect
                              value={formData.acRoomsAvailable || 'Select'}
                              onChange={e => updateFormData({ acRoomsAvailable: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 bg-white"
                            >
                              <option value="Select">Select</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </CustomSelect>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">PG/Hostel Name</label>
                            <input
                              type="text"
                              placeholder="PG Name"
                              value={formData.pg_hostel_name || ''}
                              onChange={e => updateFormData({ pg_hostel_name: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">More Brief about PG</label>
                          <textarea
                            rows={5}
                            placeholder="Write about the PG (max 400 words)"
                            value={formData.pgMoreBrief || ''}
                            onChange={e => updateFormData({ pgMoreBrief: clampPgBrief(e.target.value) })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800 resize-none"
                          />
                          <p className="text-xs text-slate-400">
                            {(formData.pgMoreBrief || '').trim() ? (formData.pgMoreBrief || '').trim().split(/\s+/).length : 0}/400 words
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                          <div className="space-y-2">
                            <span className="block text-sm font-semibold text-[#0B2C5C]">Includes</span>
                            <div className="grid grid-cols-2 gap-2">
                              {['Laundry', 'WiFi', 'Water', 'Electricity', 'TV', 'Geyser', 'Housekeeping', 'Lockers'].map(item => (
                                <label key={item} className="flex items-center gap-2 text-xs cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={(formData.amenities || []).includes(`inc_${item}`)}
                                    onChange={() => {
                                      const current = formData.amenities || [];
                                      const val = `inc_${item}`;
                                      const updated = current.includes(val) ? current.filter(x => x !== val) : [...current, val];
                                      updateFormData({ amenities: updated });
                                    }}
                                    className="w-3.5 h-3.5 rounded text-[#035096]"
                                  />
                                  {item}
                                </label>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <span className="block text-sm font-semibold text-[#0B2C5C]">Excludes</span>
                            <div className="grid grid-cols-2 gap-2">
                              {['Laundry', 'WiFi', 'Water', 'Electricity', 'TV', 'Geyser', 'Housekeeping', 'Lockers'].map(item => (
                                <label key={item} className="flex items-center gap-2 text-xs cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={(formData.amenities || []).includes(`exc_${item}`)}
                                    onChange={() => {
                                      const current = formData.amenities || [];
                                      const val = `exc_${item}`;
                                      const updated = current.includes(val) ? current.filter(x => x !== val) : [...current, val];
                                      updateFormData({ amenities: updated });
                                    }}
                                    className="w-3.5 h-3.5 rounded text-[#035096]"
                                  />
                                  {item}
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      )
                    ) : (isCommercialOfficeSpace || isCommercialShop || isCommercialShowroom || isCommercialGodown || isCommercialIndustrial || isCommercialShed) ? (
                      <>
                        {(isCommercialOfficeSpace || isCommercialShowroom || isCommercialIndustrial) && (
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
                                    value={formData.closedShedCarpetAreaUnit || 'Sft.'}
                                    onChange={e => updateFormData({ closedShedCarpetAreaUnit: e.target.value })}
                                    className="px-2 bg-slate-50 border-l border-slate-200 focus:outline-none text-xs text-slate-600 bg-white"
                                  >
                                    <option value="Sft.">Sft.</option>
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
                                    value={formData.openSpaceCarpetAreaUnit || 'Sft.'}
                                    onChange={e => updateFormData({ openSpaceCarpetAreaUnit: e.target.value })}
                                    className="px-2 bg-slate-50 border-l border-slate-200 focus:outline-none text-xs text-slate-600 bg-white"
                                  >
                                    <option value="Sft.">Sft.</option>
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
                                    value={formData.totalCarpetAreaUnit || 'Sft.'}
                                    onChange={e => updateFormData({ totalCarpetAreaUnit: e.target.value })}
                                    className="px-2 bg-slate-50 border-l border-slate-200 focus:outline-none text-xs text-slate-600 bg-white"
                                  >
                                    <option value="Sft.">Sft.</option>
                                    <option value="Sq.Yards">Sq.Yards</option>
                                  </CustomSelect>
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        {isCommercialShop && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="space-y-2">
                              <label className="block text-xs font-semibold text-slate-500 uppercase">Shutters Count</label>
                              <CustomSelect 
                                value={formData.shuttersCount || 'Select'}
                                onChange={e => handleShuttersCountChange(e.target.value)}
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

                            {formData.shutterSizes && formData.shutterSizes.length > 0 && (
                              <div className="col-span-full mt-4">
                                <span className="block text-sm font-semibold text-[#0B2C5C] mb-2">Shutter Dimensions (ft)</span>
                                <div className="border border-slate-100 rounded-xl overflow-hidden">
                                  <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-50 text-[#0B2C5C] font-semibold">
                                      <tr>
                                        <th className="px-4 py-3">Shutter</th>
                                        <th className="px-4 py-3">Length (ft)</th>
                                        <th className="px-4 py-3">Width (ft)</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                      {formData.shutterSizes.map((shutter, idx) => (
                                        <tr key={idx}>
                                          <td className="px-4 py-3 font-medium text-slate-700">Shutter {idx + 1}</td>
                                          <td className="px-4 py-3">
                                            <input
                                              type="number"
                                              placeholder="Length"
                                              value={shutter.length}
                                              onChange={e => {
                                                const updated = [...formData.shutterSizes!];
                                                updated[idx] = { ...updated[idx], length: e.target.value };
                                                updateFormData({ shutterSizes: updated });
                                              }}
                                              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#4885FF]"
                                            />
                                          </td>
                                          <td className="px-4 py-3">
                                            <input
                                              type="number"
                                              placeholder="Width"
                                              value={shutter.width}
                                              onChange={e => {
                                                const updated = [...formData.shutterSizes!];
                                                updated[idx] = { ...updated[idx], width: e.target.value };
                                                updateFormData({ shutterSizes: updated });
                                              }}
                                              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#4885FF]"
                                            />
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}
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
                                value={formData.propertyAreaUnit || 'Sft.'}
                                onChange={e => updateFormData({ propertyAreaUnit: e.target.value })}
                                className="px-2 bg-slate-50 border-l border-slate-200 focus:outline-none text-xs text-slate-600 bg-white"
                              >
                                <option value="Sft.">Sft.</option>
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
                            <DatePicker
                              value={formData.availableFrom || ''}
                              onChange={date => updateFormData({ availableFrom: date })}
                              placeholder="Available From"
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
                            <DatePicker
                              value={formData.availableFrom || ''}
                              onChange={date => updateFormData({ availableFrom: date })}
                              placeholder="Available From"
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
                              onChange={e => handleBedroomCountChange(e.target.value)}
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

                          {formData.roomSizes && formData.roomSizes.length > 0 && (
                            <div className="col-span-full mt-4">
                              <span className="block text-sm font-semibold text-[#0B2C5C] mb-2">Room Dimensions (ft)</span>
                              <div className="border border-slate-100 rounded-xl overflow-hidden">
                                <table className="w-full text-sm text-left">
                                  <thead className="bg-slate-50 text-[#0B2C5C] font-semibold">
                                    <tr>
                                      <th className="px-4 py-3">Room</th>
                                      <th className="px-4 py-3">Length (ft)</th>
                                      <th className="px-4 py-3">Width (ft)</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100">
                                    {formData.roomSizes.map((room, idx) => (
                                      <tr key={idx}>
                                        <td className="px-4 py-3 font-medium text-slate-700">Bedroom {idx + 1}</td>
                                        <td className="px-4 py-3">
                                          <input
                                            type="number"
                                            placeholder="Length"
                                            value={room.length}
                                            onChange={e => {
                                              const updated = [...formData.roomSizes!];
                                              updated[idx] = { ...updated[idx], length: e.target.value };
                                              updateFormData({ roomSizes: updated });
                                            }}
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#4885FF]"
                                          />
                                        </td>
                                        <td className="px-4 py-3">
                                          <input
                                            type="number"
                                            placeholder="Width"
                                            value={room.width}
                                            onChange={e => {
                                              const updated = [...formData.roomSizes!];
                                              updated[idx] = { ...updated[idx], width: e.target.value };
                                              updateFormData({ roomSizes: updated });
                                            }}
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#4885FF]"
                                          />
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}
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
                    {(!isCommercialOfficeSpace && !isCommercialShop && !isCommercialShowroom && !isCommercialGodown && !isCommercialIndustrial && !isCommercialShed && !isPgHostel) && (
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
                    {(!isCommercialOfficeSpace && !isCommercialShop && !isCommercialShowroom && !isCommercialGodown && !isCommercialShed) && (
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
                    {(!isCommercialShop && !isCommercialShowroom && !isCommercialGodown && !isCommercialShed && !isPgHostel) && (
                      <div className={`grid grid-cols-1 ${(formData.intent === 'rent' || isCommercialOfficeSpace || isCommercialIndustrial) ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-6 pt-2`}>
                        {formData.intent !== 'rent' && (
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
                                value={formData.carpetAreaUnit || 'Sft.'}
                                onChange={e => updateFormData({ carpetAreaUnit: e.target.value })}
                                className="px-3 bg-slate-50 border-l border-slate-200 focus:outline-none text-sm text-slate-600 bg-white"
                              >
                                <option value="Sft.">Sft.</option>
                                <option value="Sq.Yards">Sq.Yards</option>
                                <option value="Sq.Meters">Sq.Meters</option>
                              </CustomSelect>
                            </div>
                          </div>
                        )}
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
                              value={formData.builtUpAreaUnit || 'Sft.'}
                              onChange={e => updateFormData({ builtUpAreaUnit: e.target.value })}
                              className="px-3 bg-slate-50 border-l border-slate-200 focus:outline-none text-sm text-slate-600 bg-white"
                            >
                              <option value="Sft.">Sft.</option>
                              <option value="Sq.Yards">Sq.Yards</option>
                              <option value="Sq.Meters">Sq.Meters</option>
                            </CustomSelect>
                          </div>
                        </div>
                        {formData.intent !== 'rent' && (
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
                                value={formData.superBuiltUpAreaUnit || 'Sft.'}
                                onChange={e => updateFormData({ superBuiltUpAreaUnit: e.target.value })}
                                className="px-3 bg-slate-50 border-l border-slate-200 focus:outline-none text-sm text-slate-600 bg-white"
                              >
                                <option value="Sft.">Sft.</option>
                                <option value="Sq.Yards">Sq.Yards</option>
                                <option value="Sq.Meters">Sq.Meters</option>
                              </CustomSelect>
                            </div>
                          </div>
                        )}
                        {formData.intent !== 'rent' && !(isCommercialOfficeSpace || isCommercialIndustrial) && (
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
                    {!isPgHostel && (
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
                      {!isPgHostel && (
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase">Property on which Floor</label>
                        {/* Dropdown kept for revert if client asks
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
                        */}
                        <input
                          type="text"
                          placeholder="e.g., Ground, 3rd, 12"
                          value={formData.floorNumber || ''}
                          onChange={e => updateFormData({ floorNumber: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                        />
                      </div>
                      )}
                      {!isPgHostel && (
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
                      )}
                    </div>
                    )}



                    {/* Pricing block */}
                    {formData.intent !== 'rent' && !isPgHostel && (
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 pt-2">
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase">
                            {(isCommercialOfficeSpace || isCommercialIndustrial) ? 'Property Price' : 'Property Price Per'}
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
                              value={formData.totalAreaUnit || 'Sft.'}
                              onChange={e => updateFormData({ totalAreaUnit: e.target.value })}
                              className="px-2 bg-slate-50 border-l border-slate-200 focus:outline-none text-xs text-slate-600"
                            >
                              <option value="Sft.">Sft.</option>
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
                              value={formData.totalAreaUnit || 'Sft.'}
                              onChange={e => updateFormData({ totalAreaUnit: e.target.value })}
                              className="px-2 bg-slate-50 border-l border-slate-200 focus:outline-none text-xs text-slate-600"
                            >
                              <option value="Sft.">Sft.</option>
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

                    {formData.intent === 'rent' && rentPricingFields}

                    {/* Brokerage Charge */}
                    <div className="space-y-2 pt-2">
                      <label className="block text-sm font-semibold text-[#0B2C5C]">Brokerage Charge</label>
                      <div className="flex flex-wrap items-end gap-6 mt-1">
                        <div className="flex gap-6">
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
                        {formData.brokerageCharge === 'Yes' && formData.intent !== 'rent' && (
                          <div className="space-y-2 min-w-[220px]">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Brokerage on property value</label>
                            <div className="flex rounded-xl border border-slate-200 focus-within:border-[#4885FF] overflow-hidden">
                              <input
                                type="text"
                                inputMode="decimal"
                                placeholder="e.g. 1"
                                value={formData.brokerageOnPropertyValue || ''}
                                onChange={e => updateFormData({ brokerageOnPropertyValue: e.target.value.replace(/[^\d.]/g, '') })}
                                className="w-full px-4 py-3 focus:outline-none text-sm text-slate-800"
                              />
                              <span className="px-3 flex items-center bg-slate-50 border-l border-slate-200 text-sm text-slate-600">%</span>
                            </div>
                          </div>
                        )}
                        {formData.brokerageCharge === 'Yes' && formData.intent === 'rent' && (
                          <div className="space-y-2 min-w-[240px]">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">Brokerage on Rent</label>
                            <div className="flex rounded-xl border border-slate-200 focus-within:border-[#4885FF] overflow-hidden">
                              <input
                                type="text"
                                inputMode="numeric"
                                placeholder="e.g. 15"
                                value={formData.brokerageOnRentValue || ''}
                                onChange={e => updateFormData({ brokerageOnRentValue: e.target.value.replace(/[^\d]/g, '') })}
                                className="w-full px-4 py-3 focus:outline-none text-sm text-slate-800"
                              />
                              <CustomSelect
                                value={formData.brokerageOnRentUnit || 'Days'}
                                onChange={e => updateFormData({ brokerageOnRentUnit: e.target.value })}
                                className="px-3 bg-slate-50 border-l border-slate-200 focus:outline-none text-sm text-slate-600 bg-white"
                              >
                                <option value="Days">Days</option>
                                <option value="Months">Months</option>
                              </CustomSelect>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

                {/* --- Unit / Flat Inventory (apartments & gated communities) --- */}
                {isApartmentInventory && (
                  <div className="bg-white">
                    <UnitInventorySection
                      value={formData.unitInventory || emptyUnitInventory()}
                      onChange={(unitInventory) => updateFormData({ unitInventory })}
                      unitLabel={inventoryUnitLabel}
                    />
                  </div>
                )}

                {/* --- Amenities & Features Section --- */}
                {!isLandsAcre && !isLandsPlots && (
                <div>
                  <h3 className="text-lg font-bold text-[#0B2C5C] mb-4 pb-2 border-b border-slate-100">Amenities & Features</h3>
                  <div className="space-y-6">
                    {formData.propertyType !== 'PG/Hostel' && (
                      <>
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
                                    onChange={() => {
                                      if (isAmenitiesDisabled) return;
                                      if (item === 'Yes') {
                                        updateFormData({ showAmenitiesOption: 'Yes' });
                                        setAmenitiesPopupOpen(true);
                                      } else {
                                        updateFormData({
                                          showAmenitiesOption: 'No',
                                          amenities: [],
                                          furnishingSelections: [],
                                          furnishingCounts: {},
                                          societyAmenitySelections: [],
                                        });
                                        setAmenitiesPopupOpen(false);
                                      }
                                    }}
                                    className="w-4 h-4 text-[#035096] border-slate-300 focus:ring-[#035096]"
                                  />
                                  {item}
                                </label>
                              );
                            })}
                          </div>
                        </div>

                        {formData.showAmenitiesOption === 'Yes' && (
                          <div className="pt-4 border-t border-slate-100 space-y-4">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <p className="text-sm text-slate-600">
                                <span className="font-semibold text-[#0B2C5C]">{countFurnishingSelections(amenitiesPopupValue)}</span>
                                {' '}furnishings,{' '}
                                <span className="font-semibold text-[#0B2C5C]">{amenitiesPopupValue.society.length}</span>
                                {' '}amenities selected
                              </p>
                              <button
                                type="button"
                                onClick={() => setAmenitiesPopupOpen(true)}
                                className="px-4 py-2 rounded-xl border border-[#035096] text-[#035096] text-sm font-semibold hover:bg-[#F0F7FF] transition-colors"
                              >
                                Add furnishings & amenities
                              </button>
                            </div>
                            {selectedAmenityLabels.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {selectedAmenityLabels.map((item) => (
                                  <span
                                    key={item}
                                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#F0F7FF] text-[#035096] text-xs font-semibold"
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        <AmenitiesPopup
                          open={amenitiesPopupOpen}
                          onOpenChange={setAmenitiesPopupOpen}
                          value={amenitiesPopupValue}
                          onChange={(value) =>
                            updateFormData({
                              furnishingSelections: value.furnishings,
                              furnishingCounts: value.counts,
                              societyAmenitySelections: value.society,
                              amenities: flattenAmenitiesPopup(value),
                            })
                          }
                        />

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
                          <div className="space-y-2">
                            <label className="block text-sm font-semibold text-[#0B2C5C]">Property Location</label>
                            <input 
                              type="text" 
                              placeholder="Google map location"
                              value={formData.floorPlanUrl || ''}
                              onChange={e => updateFormData({ floorPlanUrl: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#035096] text-sm text-slate-800"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-semibold text-[#0B2C5C]">Video URL (Optional)</label>
                            <input 
                              type="url" 
                              placeholder="e.g., YouTube or Vimeo link"
                              value={formData.videoUrl || ''}
                              onChange={e => updateFormData({ videoUrl: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#035096] text-sm text-slate-800"
                            />
                            <p className="text-xs text-slate-400">Video should not contain a phone number.</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                )}

                {/* --- Media Upload Section --- */}
                <div>
                  <h3 className="text-lg font-bold text-[#0B2C5C] mb-4 pb-2 border-b border-slate-100">Media Upload</h3>
                  {mediaUploadSection}
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
                          <label className="block text-sm font-semibold text-[#0B2C5C]">Built-up Area (Sft.) <span className="text-red-500">*</span></label>
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
                      <label className="block text-sm font-semibold text-[#0B2C5C]">Land Area (Sft.) <span className="text-red-500">*</span></label>
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
                {formData.propertyType !== 'PG/Hostel' && (
                  <>
                    <div className="mb-10">
                      <h3 className="text-lg font-bold text-[#0B2C5C] mb-4 pb-2 border-b border-slate-100">
                        {formData.intent === 'rent' ? 'Rental Details' : 'Price Details'}
                      </h3>
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
                          <label className="block text-sm font-semibold text-[#0B2C5C]">Price Per Sft.</label>
                          <input 
                            type="number" 
                            placeholder="e.g., 3500"
                            value={formData.pricePerSqft}
                            onChange={e => updateFormData({ pricePerSqft: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                          />
                        </div>
                      </>
                    ) : formData.intent === 'rent' ? (
                      <>
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-[#0B2C5C]">Rent per month <span className="text-red-500">*</span></label>
                          <input 
                            type="text" 
                            inputMode="numeric"
                            placeholder="e.g. 15000"
                            value={formData.rentPerMonth || ''}
                            onChange={e => updateFormData({ rentPerMonth: e.target.value.replace(/[^\d]/g, '') })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-[#0B2C5C]">Security Deposit</label>
                          <div className="flex rounded-xl border border-slate-200 focus-within:border-[#4885FF] overflow-hidden">
                            <input 
                              type="text"
                              inputMode="numeric"
                              placeholder="Number"
                              value={formData.securityDepositVal || ''}
                              onChange={e => updateFormData({ securityDepositVal: e.target.value.replace(/[^\d]/g, '') })}
                              className="w-full px-4 py-3 focus:outline-none text-sm text-slate-800"
                            />
                            <CustomSelect 
                              value={formData.securityDepositType || 'Months'}
                              onChange={e => updateFormData({ securityDepositType: e.target.value })}
                              className="px-3 min-w-[7.5rem] bg-slate-50 border-l border-slate-200 focus:outline-none text-sm text-slate-600 bg-white"
                            >
                              <option value="Months">Months</option>
                              <option value="Years">Years</option>
                            </CustomSelect>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-[#0B2C5C]">Maintenance Amount</label>
                          <div className="flex rounded-xl border border-slate-200 focus-within:border-[#4885FF] overflow-hidden">
                            <input 
                              type="text"
                              inputMode="numeric"
                              placeholder="e.g. 1000"
                              value={formData.maintenanceAmountVal || ''}
                              onChange={e => updateFormData({ maintenanceAmountVal: e.target.value.replace(/[^\d]/g, '') })}
                              className="w-full px-4 py-3 focus:outline-none text-sm text-slate-800"
                            />
                            <CustomSelect 
                              value={formData.maintenanceAmountType || '1'}
                              onChange={e => updateFormData({ maintenanceAmountType: e.target.value })}
                              className="px-3 min-w-[8.5rem] bg-slate-50 border-l border-slate-200 focus:outline-none text-sm text-slate-600 bg-white"
                            >
                              {Array.from({ length: 12 }, (_, i) => {
                                const month = String(i + 1);
                                const label = month === '1' ? '1 Month' : `${month} Months`;
                                return (
                                  <option key={month} value={month}>{label}</option>
                                );
                              })}
                            </CustomSelect>
                          </div>
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
              </>
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
                  <div className="space-y-6">
                    {mediaUploadSection}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-[#0B2C5C]">Video URL (Optional)</label>
                        <input 
                          type="url" 
                          placeholder="e.g., YouTube or Vimeo link"
                          value={formData.videoUrl}
                          onChange={e => updateFormData({ videoUrl: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800"
                        />
                        <p className="text-xs text-slate-400">Video should not contain a phone number.</p>
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

        {/* --- STEP 3: REVIEW & SUBMIT (PREVIEW LAYOUT) --- */}
        {currentStep === 3 && (
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
                {galleryPreviews.length > 0 ? (
                  <>
                    <div className="md:col-span-2 rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] bg-slate-100 border border-slate-100 shadow-sm">
                      <img src={galleryPreviews[0]} alt="main" className="w-full h-full object-cover" />
                    </div>
                    <div className="grid grid-rows-2 gap-4">
                      <div className="rounded-xl overflow-hidden aspect-[16/10] bg-slate-100 border border-slate-100 shadow-sm">
                        <img src={galleryPreviews[1] || galleryPreviews[0]} alt="sub-1" className="w-full h-full object-cover" />
                      </div>
                      <div className="rounded-xl overflow-hidden aspect-[16/10] bg-slate-100 border border-slate-100 shadow-sm relative">
                        <img src={galleryPreviews[2] || galleryPreviews[0]} alt="sub-2" className="w-full h-full object-cover" />
                        {galleryPreviews.length > 3 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-lg">
                            +{galleryPreviews.length - 3} More
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

                  {isApartmentInventory && formData.unitInventory?.enabled && (formData.unitInventory?.blocks?.length || 0) > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-[#0B2C5C] mb-4">
                        {inventoryUnitLabel === 'villas' ? 'Villa' : 'Flat'} Inventory
                      </h3>
                      <div className="border border-slate-100 rounded-xl overflow-hidden">
                        <table className="w-full text-sm text-left">
                          <thead className="bg-slate-50 text-[#0B2C5C] font-semibold">
                            <tr>
                              <th className="px-4 py-3">Block</th>
                              <th className="px-4 py-3">Floor</th>
                              <th className="px-4 py-3">
                                {inventoryUnitLabel === 'villas' ? 'Villa No.' : 'Flat No.'}
                              </th>
                              <th className="px-4 py-3">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {formData.unitInventory!.blocks.flatMap((block) =>
                              block.floors.flatMap((floor) =>
                                floor.flats.map((flat) => (
                                  <tr key={flat.id}>
                                    <td className="px-4 py-3 text-slate-800">{block.name}</td>
                                    <td className="px-4 py-3 text-slate-800">{floor.label}</td>
                                    <td className="px-4 py-3 text-slate-800">{flat.unitNumber}</td>
                                    <td className="px-4 py-3 text-slate-800">
                                      {FLAT_STATUS_META[flat.status].label}
                                    </td>
                                  </tr>
                                ))
                              )
                            )}
                          </tbody>
                        </table>
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
                          <span className="text-[11px] font-semibold text-slate-400 block uppercase">Price/Sft.</span>
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
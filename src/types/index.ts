export type Currency = 'EUR' | 'USD';

export type Sector = 
  | 'Banking & Financial Services'
  | 'Pharmaceuticals & Healthcare'
  | 'Retail & Consumer Goods'
  | 'Energy & Utilities'
  | 'Technology & Telecom'
  | 'Automotive & Industrial';

export type TargetLevel = 
  | 'C-Suite & Board Members'
  | 'Senior Vice Presidents & Directors'
  | 'High-Potential Leaders'
  | 'Middle Management';

export type DeliveryFormat = 'In-Person (On-Campus)' | 'Blended (Hybrid)' | '100% Digital';

export type CampusLocation = 
  | 'Barcelona (Pedralbes)'
  | 'Madrid (Aravaca)'
  | 'New York (Manhattan)'
  | 'Munich Campus'
  | 'In-Company (Client HQ)';

export type StrategicObjective = 
  | 'Digital Transformation'
  | 'Executive Leadership & Change'
  | 'Sustainability & ESG'
  | 'Corporate Strategy & M&A'
  | 'Financial Value Creation'
  | 'Operational Excellence'
  | 'AI & Business Analytics'
  | 'Global Supply Chain';

export type Methodology = 'Case Method' | 'Action Learning Project' | 'Outdoor / Experiential' | 'Executive Coaching' | 'Simulations';

export interface CaseStudy {
  id: string;
  code: string;
  title: string;
  authors: string[];
  subjectArea: string;
  sectors: Sector[];
  objectives: StrategicObjective[];
  methodology: Methodology;
  summary: string;
  durationHours: number;
}

export type AvailabilityStatus = 'available' | 'pending_ad' | 'unavailable';

export interface FacultyMember {
  id: string;
  name: string;
  title: string;
  department: string;
  photoUrl: string;
  languages: ('ES' | 'EN' | 'PT')[];
  primarySectors: Sector[];
  availability: AvailabilityStatus;
  bio: string;
}

export interface ProgramSession {
  id: string;
  title: string;
  caseStudyId?: string;
  caseTitle?: string;
  facultyId?: string;
  facultyName?: string;
  methodology: Methodology;
  durationHours: number;
}

export interface ProgramModule {
  id: string;
  moduleNumber: number;
  title: string;
  durationDays: number;
  campus: CampusLocation;
  sessions: ProgramSession[];
}

export interface CostBreakdown {
  facultyHonorarios: number;
  caseLicensing: number;
  campusCateringFacilities: number;
  lmsPlatformSupport: number;
  totalDirectCosts: number;
}

export interface FinancialMetrics {
  basePrice: number;
  discountPercentage: number;
  discountAmount: number;
  finalPrice: number;
  pricePerParticipant: number;
  costs: CostBreakdown;
  grossMarginAmount: number;
  grossMarginPercentage: number;
  marginStatus: 'healthy' | 'warning' | 'critical';
}

export interface ClientProfile {
  companyName: string;
  sector: Sector;
  cohortSize: number;
  targetLevel: TargetLevel;
  format: DeliveryFormat;
  primaryCampus: CampusLocation;
  strategicObjectives: StrategicObjective[];
}

export interface ProposalState {
  clientProfile: ClientProfile;
  modules: ProgramModule[];
  assignedFacultyIds: string[];
  discountPercentage: number;
  currency: Currency;
  isClientView: boolean;
  activeStep: number;
  crmSaved: boolean;
  proposalCode: string;
}

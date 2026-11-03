import type { CaseStudy, FacultyMember, Sector, StrategicObjective, CampusLocation, ProgramModule } from '../types';

export const SECTORS: Sector[] = [
  'Banking & Financial Services',
  'Pharmaceuticals & Healthcare',
  'Retail & Consumer Goods',
  'Energy & Utilities',
  'Technology & Telecom',
  'Automotive & Industrial'
];

export const CAMPUSES: { name: CampusLocation; city: string; image: string }[] = [
  {
    name: 'Barcelona (Pedralbes)',
    city: 'Barcelona, Spain',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Madrid (Aravaca)',
    city: 'Madrid, Spain',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'New York (Manhattan)',
    city: 'New York, USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Munich Campus',
    city: 'Munich, Germany',
    image: 'https://images.unsplash.com/photo-1595867818082-083862f3d630?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'In-Company (Client HQ)',
    city: 'Client Premises',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80'
  }
];

export const OBJECTIVES: StrategicObjective[] = [
  'Digital Transformation',
  'Executive Leadership & Change',
  'Sustainability & ESG',
  'Corporate Strategy & M&A',
  'Financial Value Creation',
  'Operational Excellence',
  'AI & Business Analytics',
  'Global Supply Chain'
];

export const MOCK_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-01',
    code: 'IESE-ST-482',
    title: 'BBVA: Navigating Neobank Disruption & Cloud Migration',
    authors: ['Prof. Pedro Nueno', 'Prof. Sandra Sieber'],
    subjectArea: 'Information Systems & Strategy',
    sectors: ['Banking & Financial Services', 'Technology & Telecom'],
    objectives: ['Digital Transformation', 'Corporate Strategy & M&A'],
    methodology: 'Case Method',
    summary: 'Analyzes BBVA’s multi-billion dollar digital transformation, legacy IT decoupling, and organizational culture shift towards agile squad teams.',
    durationHours: 3
  },
  {
    id: 'cs-02',
    code: 'IESE-DP-319',
    title: 'Sanofi: Leading Global R&D Teams in Times of Crisis',
    authors: ['Prof. Marta Elvira', 'Prof. Carlos Rodríguez-Lluesma'],
    subjectArea: 'Managing People in Organizations',
    sectors: ['Pharmaceuticals & Healthcare'],
    objectives: ['Executive Leadership & Change', 'Operational Excellence'],
    methodology: 'Case Method',
    summary: 'Focuses on cross-cultural leadership, psychological safety, and accelerating trial phases across distributed international lab teams.',
    durationHours: 3
  },
  {
    id: 'cs-03',
    code: 'IESE-ST-512',
    title: 'Inditex: Next-Gen Omnichannel & Circular Supply Chain',
    authors: ['Prof. Victor Martínez de Albéniz'],
    subjectArea: 'Operations & Supply Chain',
    sectors: ['Retail & Consumer Goods', 'Automotive & Industrial'],
    objectives: ['Operational Excellence', 'Sustainability & ESG', 'Global Supply Chain'],
    methodology: 'Case Method',
    summary: 'Examines Inditex’s RFID integration, automated distribution hubs, and carbon-neutral logistics initiatives across 90+ markets.',
    durationHours: 4
  },
  {
    id: 'cs-04',
    code: 'IESE-FN-601',
    title: 'Iberdrola: Capital Allocation for the Green Energy Transition',
    authors: ['Prof. Javier Díaz-Giménez', 'Prof. Pablo Fernández'],
    subjectArea: 'Financial Management',
    sectors: ['Energy & Utilities'],
    objectives: ['Financial Value Creation', 'Sustainability & ESG', 'Corporate Strategy & M&A'],
    methodology: 'Case Method',
    summary: 'Evaluates project finance, ESG debt issuances, and regulatory risk mitigation for offshore wind and hydrogen investments.',
    durationHours: 3
  },
  {
    id: 'cs-05',
    code: 'IESE-AL-104',
    title: 'Action Learning Capstone: Strategic Growth Opportunity Audit',
    authors: ['IESE Executive Faculty Team'],
    subjectArea: 'Applied Strategy & Innovation',
    sectors: ['Banking & Financial Services', 'Pharmaceuticals & Healthcare', 'Retail & Consumer Goods', 'Energy & Utilities', 'Technology & Telecom', 'Automotive & Industrial'],
    objectives: ['Corporate Strategy & M&A', 'Executive Leadership & Change'],
    methodology: 'Action Learning Project',
    summary: 'Participant teams formulate a real-world strategic solution for their business unit, presented directly to C-suite sponsors.',
    durationHours: 12
  },
  {
    id: 'cs-06',
    code: 'IESE-AI-208',
    title: 'AI Governance & Generative Tools in Enterprise Decision Making',
    authors: ['Prof. Sandra Sieber'],
    subjectArea: 'Strategy & Technology',
    sectors: ['Technology & Telecom', 'Banking & Financial Services', 'Retail & Consumer Goods'],
    objectives: ['AI & Business Analytics', 'Digital Transformation'],
    methodology: 'Simulations',
    summary: 'Hands-on executive simulation exploring ethical AI deployment, data privacy frameworks, and ROI estimation.',
    durationHours: 4
  },
  {
    id: 'cs-07',
    code: 'IESE-EX-009',
    title: 'High-Performance Team Dynamics: Outdoor Experiential Challenge',
    authors: ['Prof. Mike Rosenberg'],
    subjectArea: 'Leadership & High Performance',
    sectors: ['Banking & Financial Services', 'Pharmaceuticals & Healthcare', 'Retail & Consumer Goods', 'Energy & Utilities', 'Technology & Telecom', 'Automotive & Industrial'],
    objectives: ['Executive Leadership & Change'],
    methodology: 'Outdoor / Experiential',
    summary: 'Simulated high-stakes scenario driving trust building, crisis decision-making, and constructive conflict resolution.',
    durationHours: 6
  }
];

export const MOCK_FACULTY: FacultyMember[] = [
  {
    id: 'fac-01',
    name: 'Prof. Pedro Nueno',
    title: 'Professor of Technical Management & General Management',
    department: 'Strategic Management',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    languages: ['ES', 'EN'],
    primarySectors: ['Banking & Financial Services', 'Automotive & Industrial', 'Technology & Telecom'],
    availability: 'available',
    bio: 'Founder of CEIBS and author of over 20 books on entrepreneurship, corporate restructuring, and global strategy.'
  },
  {
    id: 'fac-02',
    name: 'Prof. Marta Elvira',
    title: 'Professor of Managing People in Organizations & Strategic Leadership',
    department: 'Managing People in Organizations',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    languages: ['ES', 'EN'],
    primarySectors: ['Pharmaceuticals & Healthcare', 'Retail & Consumer Goods'],
    availability: 'available',
    bio: 'Specialist in talent governance, executive incentive alignment, and leading organizational transformation.'
  },
  {
    id: 'fac-03',
    name: 'Prof. Javier Díaz-Giménez',
    title: 'Professor of Economics & Financial Markets',
    department: 'Economics',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    languages: ['ES', 'EN'],
    primarySectors: ['Banking & Financial Services', 'Energy & Utilities'],
    availability: 'pending_ad',
    bio: 'Renowned expert in macroeconomics, central bank digital currencies (CBDCs), and fiscal policy impact on enterprises.'
  },
  {
    id: 'fac-04',
    name: 'Prof. Sandra Sieber',
    title: 'Professor of Information Systems & Digital Business',
    department: 'Information Systems',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    languages: ['ES', 'EN', 'PT'],
    primarySectors: ['Technology & Telecom', 'Banking & Financial Services', 'Retail & Consumer Goods'],
    availability: 'available',
    bio: 'Focuses on digital ecosystem dynamics, AI strategy adoption, and technology-enabled business models.'
  },
  {
    id: 'fac-05',
    name: 'Prof. Victor Martínez de Albéniz',
    title: 'Professor of Operations, Information and Technology',
    department: 'Operations Management',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    languages: ['ES', 'EN'],
    primarySectors: ['Retail & Consumer Goods', 'Automotive & Industrial'],
    availability: 'available',
    bio: 'Expert in retail analytics, supply chain resilience, revenue management, and omnichannel distribution.'
  },
  {
    id: 'fac-06',
    name: 'Prof. Mike Rosenberg',
    title: 'Professor of Strategic Management & Sustainability',
    department: 'Strategic Management',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    languages: ['EN', 'ES'],
    primarySectors: ['Energy & Utilities', 'Automotive & Industrial'],
    availability: 'pending_ad',
    bio: 'Author of Strategy and Sustainability and Strategy and Geopolitics. Expert on ESG integration.'
  }
];

export const DEFAULT_INITIAL_MODULES: ProgramModule[] = [
  {
    id: 'mod-1',
    moduleNumber: 1,
    title: 'Módulo 1: Strategic Foundations & Market Disruption',
    durationDays: 3,
    campus: 'Barcelona (Pedralbes)',
    sessions: [
      {
        id: 'sess-1',
        title: 'Digital Disruption & Competitive Advantage',
        caseStudyId: 'cs-01',
        caseTitle: 'BBVA: Navigating Neobank Disruption & Cloud Migration',
        facultyId: 'fac-01',
        facultyName: 'Prof. Pedro Nueno',
        methodology: 'Case Method',
        durationHours: 3
      },
      {
        id: 'sess-2',
        title: 'Macroeconomic Outlook & Financial Value Drivers',
        caseStudyId: 'cs-04',
        caseTitle: 'Iberdrola: Capital Allocation for the Green Energy Transition',
        facultyId: 'fac-03',
        facultyName: 'Prof. Javier Díaz-Giménez',
        methodology: 'Case Method',
        durationHours: 3
      }
    ]
  },
  {
    id: 'mod-2',
    moduleNumber: 2,
    title: 'Inter-sessional Work: Applied Action Learning Capstone',
    durationDays: 2,
    campus: 'In-Company (Client HQ)',
    sessions: [
      {
        id: 'sess-3',
        title: 'Action Learning Capstone Project Definition',
        caseStudyId: 'cs-05',
        caseTitle: 'Action Learning Capstone: Strategic Growth Opportunity Audit',
        facultyId: 'fac-02',
        facultyName: 'Prof. Marta Elvira',
        methodology: 'Action Learning Project',
        durationHours: 6
      }
    ]
  },
  {
    id: 'mod-3',
    moduleNumber: 3,
    title: 'Módulo 2: Leading High-Performance Transformation',
    durationDays: 3,
    campus: 'Madrid (Aravaca)',
    sessions: [
      {
        id: 'sess-4',
        title: 'Leading R&D and Cross-Functional Transformation Teams',
        caseStudyId: 'cs-02',
        caseTitle: 'Sanofi: Leading Global R&D Teams in Times of Crisis',
        facultyId: 'fac-02',
        facultyName: 'Prof. Marta Elvira',
        methodology: 'Case Method',
        durationHours: 3
      },
      {
        id: 'sess-5',
        title: 'AI Governance & Executive Decision Making',
        caseStudyId: 'cs-06',
        caseTitle: 'AI Governance & Generative Tools in Enterprise Decision Making',
        facultyId: 'fac-04',
        facultyName: 'Prof. Sandra Sieber',
        methodology: 'Simulations',
        durationHours: 4
      }
    ]
  }
];

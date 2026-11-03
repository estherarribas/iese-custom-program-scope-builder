import type { ClientProfile, ProgramModule, FinancialMetrics, Currency } from '../types';

const EUR_TO_USD_RATE = 1.08;
const MINIMUM_MARGIN_THRESHOLD = 45; // 45%

export const calculateFinancials = (
  clientProfile: ClientProfile,
  modules: ProgramModule[],
  discountPercentage: number,
  currency: Currency
): FinancialMetrics => {
  const { cohortSize, primaryCampus } = clientProfile;
  
  // 1. Calculate Total Teaching Sessions and Total Days
  const totalDays = modules.reduce((sum, mod) => sum + mod.durationDays, 0);
  const totalSessions = modules.reduce((sum, mod) => sum + mod.sessions.length, 0);
  const totalCasesUsed = modules.reduce((sum, mod) => {
    return sum + mod.sessions.filter((s) => s.caseStudyId).length;
  }, 0);

  // 2. Direct Costs Calculations
  // Faculty fees: ~ 2,800 EUR per session
  const facultyHonorarios = totalSessions * 2800;

  // Case Licensing: ~ 45 EUR per case per participant
  const caseLicensing = totalCasesUsed * cohortSize * 45;

  // Campus Facilities & Catering per day per participant
  let dailyCampusRatePerParticipant = 180; // Default Barcelona/Madrid
  if (primaryCampus.includes('New York') || primaryCampus.includes('Munich')) {
    dailyCampusRatePerParticipant = 240;
  } else if (primaryCampus.includes('In-Company')) {
    dailyCampusRatePerParticipant = 75;
  }
  const campusCateringFacilities = totalDays * cohortSize * dailyCampusRatePerParticipant;

  // LMS Platform & Tech Support
  const lmsPlatformSupport = 3500 + cohortSize * 50;

  // Sum Direct Costs
  const totalDirectCostsEUR = facultyHonorarios + caseLicensing + campusCateringFacilities + lmsPlatformSupport;

  // 3. Pricing Strategy (Target Gross Margin ~ 55% before discount)
  // Target Price = Direct Costs / (1 - Target Gross Margin)
  const targetGrossMargin = 0.55; // 55%
  const basePriceEUR = Math.round(totalDirectCostsEUR / (1 - targetGrossMargin));

  // Apply Discount
  const discountAmountEUR = Math.round(basePriceEUR * (discountPercentage / 100));
  const finalPriceEUR = basePriceEUR - discountAmountEUR;

  // Gross Margin Calculation
  const grossMarginAmountEUR = finalPriceEUR - totalDirectCostsEUR;
  const grossMarginPercentage = Math.round(((grossMarginAmountEUR / finalPriceEUR) * 100) * 10) / 10;

  // Margin Status
  let marginStatus: 'healthy' | 'warning' | 'critical' = 'healthy';
  if (grossMarginPercentage < MINIMUM_MARGIN_THRESHOLD) {
    marginStatus = 'critical';
  } else if (grossMarginPercentage < 50) {
    marginStatus = 'warning';
  }

  // Convert to target currency if USD
  const rate = currency === 'USD' ? EUR_TO_USD_RATE : 1;

  const costs = {
    facultyHonorarios: Math.round(facultyHonorarios * rate),
    caseLicensing: Math.round(caseLicensing * rate),
    campusCateringFacilities: Math.round(campusCateringFacilities * rate),
    lmsPlatformSupport: Math.round(lmsPlatformSupport * rate),
    totalDirectCosts: Math.round(totalDirectCostsEUR * rate)
  };

  const finalPrice = Math.round(finalPriceEUR * rate);
  const basePrice = Math.round(basePriceEUR * rate);
  const discountAmount = Math.round(discountAmountEUR * rate);
  const grossMarginAmount = Math.round(grossMarginAmountEUR * rate);
  const pricePerParticipant = Math.round(finalPrice / Math.max(1, cohortSize));

  return {
    basePrice,
    discountPercentage,
    discountAmount,
    finalPrice,
    pricePerParticipant,
    costs,
    grossMarginAmount,
    grossMarginPercentage,
    marginStatus
  };
};

export const formatCurrency = (amount: number, currency: Currency): string => {
  const symbol = currency === 'EUR' ? '€' : '$';
  return `${symbol}${amount.toLocaleString('es-ES')}`;
};

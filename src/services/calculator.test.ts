import { describe, it, expect } from 'vitest';
import { calculateFinancials, formatCurrency } from './calculator';
import type { ClientProfile, ProgramModule } from '../types';

describe('calculator service', () => {
  const mockClientProfile: ClientProfile = {
    companyName: 'Acme Corp',
    sector: 'Banking & Financial Services',
    cohortSize: 30,
    targetLevel: 'Senior Vice Presidents & Directors',
    format: 'In-Person (On-Campus)',
    primaryCampus: 'Barcelona (Pedralbes)',
    strategicObjectives: ['Digital Transformation']
  };

  const mockModules: ProgramModule[] = [
    {
      id: 'mod-1',
      moduleNumber: 1,
      title: 'Module 1',
      durationDays: 3,
      campus: 'Barcelona (Pedralbes)',
      sessions: [
        {
          id: 'sess-1',
          title: 'Session 1',
          caseStudyId: 'cs-01',
          methodology: 'Case Method',
          durationHours: 3
        },
        {
          id: 'sess-2',
          title: 'Session 2',
          methodology: 'Case Method',
          durationHours: 3
        }
      ]
    }
  ];

  describe('calculateFinancials - Cost Breakdown', () => {
    it('calculates faculty honorarios accurately based on total sessions', () => {
      // 2 sessions * 2800 = 5600 EUR
      const financials = calculateFinancials(mockClientProfile, mockModules, 0, 'EUR');
      expect(financials.costs.facultyHonorarios).toBe(5600);
    });

    it('calculates case licensing based on case count and cohort size', () => {
      // 1 case * 30 participants * 45 EUR = 1350 EUR
      const financials = calculateFinancials(mockClientProfile, mockModules, 0, 'EUR');
      expect(financials.costs.caseLicensing).toBe(1350);
    });

    it('calculates campus facilities for Barcelona/Madrid at 180 EUR per participant day', () => {
      // 3 days * 30 participants * 180 EUR = 16200 EUR
      const financials = calculateFinancials(mockClientProfile, mockModules, 0, 'EUR');
      expect(financials.costs.campusCateringFacilities).toBe(16200);
    });

    it('calculates campus facilities for New York / Munich campus at 240 EUR per participant day', () => {
      const nyProfile: ClientProfile = {
        ...mockClientProfile,
        primaryCampus: 'New York (Manhattan)'
      };
      // 3 days * 30 participants * 240 EUR = 21600 EUR
      const financials = calculateFinancials(nyProfile, mockModules, 0, 'EUR');
      expect(financials.costs.campusCateringFacilities).toBe(21600);
    });

    it('calculates campus facilities for In-Company campus at 75 EUR per participant day', () => {
      const inCompanyProfile: ClientProfile = {
        ...mockClientProfile,
        primaryCampus: 'In-Company (Client HQ)'
      };
      // 3 days * 30 participants * 75 EUR = 6750 EUR
      const financials = calculateFinancials(inCompanyProfile, mockModules, 0, 'EUR');
      expect(financials.costs.campusCateringFacilities).toBe(6750);
    });

    it('calculates LMS platform support correctly', () => {
      // 3500 + 30 * 50 = 5000 EUR
      const financials = calculateFinancials(mockClientProfile, mockModules, 0, 'EUR');
      expect(financials.costs.lmsPlatformSupport).toBe(5000);
    });

    it('sums total direct costs correctly', () => {
      // 5600 (faculty) + 1350 (cases) + 16200 (campus) + 5000 (LMS) = 28150 EUR
      const financials = calculateFinancials(mockClientProfile, mockModules, 0, 'EUR');
      expect(financials.costs.totalDirectCosts).toBe(28150);
    });
  });

  describe('calculateFinancials - Gross Margin & Margin Status Thresholds', () => {
    it('returns "healthy" status for gross margin >= 50%', () => {
      // With 0% discount, gross margin percentage is ~55%
      const financials = calculateFinancials(mockClientProfile, mockModules, 0, 'EUR');
      expect(financials.grossMarginPercentage).toBeGreaterThanOrEqual(50);
      expect(financials.marginStatus).toBe('healthy');
    });

    it('returns "warning" status for gross margin between 45% and 49.9%', () => {
      // Discounting by 15%: base price = 62556, final price = 53173, costs = 28150.
      // Margin = (53173 - 28150) / 53173 = 47.1%
      const financials = calculateFinancials(mockClientProfile, mockModules, 15, 'EUR');
      expect(financials.grossMarginPercentage).toBeGreaterThanOrEqual(45);
      expect(financials.grossMarginPercentage).toBeLessThan(50);
      expect(financials.marginStatus).toBe('warning');
    });

    it('returns "critical" status for gross margin < 45%', () => {
      // Discounting by 25%: base price = 62556, final price = 46917, costs = 28150.
      // Margin = (46917 - 28150) / 46917 = 40.0%
      const financials = calculateFinancials(mockClientProfile, mockModules, 25, 'EUR');
      expect(financials.grossMarginPercentage).toBeLessThan(45);
      expect(financials.marginStatus).toBe('critical');
    });
  });

  describe('calculateFinancials - Currency Conversion', () => {
    it('calculates metrics in EUR when currency is EUR', () => {
      const financials = calculateFinancials(mockClientProfile, mockModules, 0, 'EUR');
      expect(financials.costs.totalDirectCosts).toBe(28150);
      expect(financials.basePrice).toBe(62556);
    });

    it('converts metrics using 1.08 exchange rate when currency is USD', () => {
      const financialsEUR = calculateFinancials(mockClientProfile, mockModules, 0, 'EUR');
      const financialsUSD = calculateFinancials(mockClientProfile, mockModules, 0, 'USD');

      expect(financialsUSD.costs.totalDirectCosts).toBe(Math.round(financialsEUR.costs.totalDirectCosts * 1.08));
      expect(financialsUSD.basePrice).toBe(Math.round(financialsEUR.basePrice * 1.08));
      expect(financialsUSD.finalPrice).toBe(Math.round(financialsEUR.finalPrice * 1.08));
      expect(financialsUSD.grossMarginAmount).toBe(Math.round(financialsEUR.grossMarginAmount * 1.08));
    });
  });

  describe('formatCurrency', () => {
    it('formats EUR amounts with € symbol', () => {
      const result = formatCurrency(5000, 'EUR');
      expect(result).toContain('€');
      expect(result).toBe(`€${(5000).toLocaleString('es-ES')}`);
    });

    it('formats USD amounts with $ symbol', () => {
      const result = formatCurrency(5000, 'USD');
      expect(result).toContain('$');
      expect(result).toBe(`$${(5000).toLocaleString('es-ES')}`);
    });
  });
});

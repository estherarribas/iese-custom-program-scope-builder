import { describe, it, expect } from 'vitest';
import { recommendCases, recommendFaculty } from './recommender';

describe('recommender service', () => {
  describe('recommendCases - Sector Filtering', () => {
    it('filters case studies for Banking & Financial Services', () => {
      const cases = recommendCases('Banking & Financial Services', []);
      const caseIds = cases.map((cs) => cs.id);

      // Should include BBVA (cs-01), Capstone (cs-05: >3 sectors), AI Governance (cs-06), Outdoor (cs-07: >3 sectors)
      expect(caseIds).toContain('cs-01');
      expect(caseIds).toContain('cs-05');
      expect(caseIds).toContain('cs-06');
      expect(caseIds).toContain('cs-07');

      // Should NOT include Sanofi (cs-02: Pharma) or Iberdrola (cs-04: Energy)
      expect(caseIds).not.toContain('cs-02');
      expect(caseIds).not.toContain('cs-04');
    });

    it('filters case studies for Pharmaceuticals & Healthcare', () => {
      const cases = recommendCases('Pharmaceuticals & Healthcare', []);
      const caseIds = cases.map((cs) => cs.id);

      // Should include Sanofi (cs-02) and general cases (cs-05, cs-07)
      expect(caseIds).toContain('cs-02');
      expect(caseIds).toContain('cs-05');
      expect(caseIds).toContain('cs-07');

      // Should NOT include BBVA (cs-01) or Inditex (cs-03)
      expect(caseIds).not.toContain('cs-01');
      expect(caseIds).not.toContain('cs-03');
    });
  });

  describe('recommendCases - Strategic Objectives Filtering', () => {
    it('filters cases matching at least one selected strategic objective', () => {
      const cases = recommendCases('Banking & Financial Services', ['Digital Transformation']);
      const caseIds = cases.map((cs) => cs.id);

      // cs-01 (BBVA) and cs-06 (AI Governance) have Digital Transformation
      expect(caseIds).toContain('cs-01');
      expect(caseIds).toContain('cs-06');

      // cs-07 does not have Digital Transformation
      expect(caseIds).not.toContain('cs-07');
    });

    it('returns all sector-matching cases when selectedObjectives is empty', () => {
      const cases = recommendCases('Banking & Financial Services', []);
      expect(cases.length).toBeGreaterThan(0);
    });

    it('filters cases matching multiple strategic objectives', () => {
      const cases = recommendCases('Banking & Financial Services', [
        'Digital Transformation',
        'Executive Leadership & Change'
      ]);
      const caseIds = cases.map((cs) => cs.id);

      expect(caseIds).toContain('cs-01'); // Digital Transformation
      expect(caseIds).toContain('cs-05'); // Executive Leadership & Change
      expect(caseIds).toContain('cs-06'); // Digital Transformation
      expect(caseIds).toContain('cs-07'); // Executive Leadership & Change
    });
  });

  describe('recommendFaculty - Sector Filtering', () => {
    it('recommends faculty specializing in Pharmaceuticals & Healthcare or generalists', () => {
      const faculty = recommendFaculty('Pharmaceuticals & Healthcare');
      const facultyIds = faculty.map((f) => f.id);

      // Marta Elvira (fac-02) has Pharma in primarySectors
      expect(facultyIds).toContain('fac-02');

      // Pedro Nueno (fac-01) and Sandra Sieber (fac-04) have > 2 primarySectors (generalists)
      expect(facultyIds).toContain('fac-01');
      expect(facultyIds).toContain('fac-04');

      // Javier Díaz-Giménez (fac-03: Banking, Energy) and Victor Martínez (fac-05: Retail, Automotive) should be excluded
      expect(facultyIds).not.toContain('fac-03');
      expect(facultyIds).not.toContain('fac-05');
    });

    it('recommends faculty for Energy & Utilities', () => {
      const faculty = recommendFaculty('Energy & Utilities');
      const facultyIds = faculty.map((f) => f.id);

      expect(facultyIds).toContain('fac-03'); // Javier Díaz-Giménez
      expect(facultyIds).toContain('fac-06'); // Mike Rosenberg
      expect(facultyIds).toContain('fac-01'); // Generalist
      expect(facultyIds).toContain('fac-04'); // Generalist

      expect(facultyIds).not.toContain('fac-02'); // Marta Elvira (Pharma, Retail)
      expect(facultyIds).not.toContain('fac-05'); // Victor Martínez (Retail, Automotive)
    });
  });
});

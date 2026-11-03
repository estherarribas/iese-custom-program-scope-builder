import type { CaseStudy, FacultyMember, Sector, StrategicObjective } from '../types';
import { MOCK_CASE_STUDIES, MOCK_FACULTY } from '../data/mockData';

export const recommendCases = (
  selectedSector: Sector,
  selectedObjectives: StrategicObjective[]
): CaseStudy[] => {
  return MOCK_CASE_STUDIES.filter((cs) => {
    // Matches sector or is general
    const sectorMatch = cs.sectors.includes(selectedSector) || cs.sectors.length > 3;
    // Matches at least one objective if any selected
    const objectiveMatch =
      selectedObjectives.length === 0 ||
      cs.objectives.some((obj) => selectedObjectives.includes(obj));

    return sectorMatch && objectiveMatch;
  });
};

export const recommendFaculty = (selectedSector: Sector): FacultyMember[] => {
  return MOCK_FACULTY.filter((faculty) => {
    return faculty.primarySectors.includes(selectedSector) || faculty.primarySectors.length > 2;
  });
};

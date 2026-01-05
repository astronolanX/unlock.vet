/**
 * Location-based benefit lookup
 *
 * Core logic: Given a zip code, return all applicable benefits
 * from federal down to local level.
 */

import type { Benefit, BenefitMatch, VeteranProfile } from '../data/schema';

// Zip code to location mapping (would be loaded from data file)
interface ZipLocation {
  zip: string;
  city: string;
  county: string;
  countyFips: string;
  state: string;
  stateCode: string;
}

/**
 * Get all benefits available at a location
 */
export function getBenefitsForLocation(
  zipCode: string,
  allBenefits: Benefit[]
): Benefit[] {
  const location = lookupZipCode(zipCode);
  if (!location) {
    // Return only federal benefits if we can't resolve location
    return allBenefits.filter(b => b.level === 'federal');
  }

  return allBenefits.filter(benefit => {
    // Federal benefits always apply
    if (benefit.level === 'federal') return true;

    const { coverage } = benefit;

    // Check state match
    if (coverage.states?.length) {
      if (!coverage.states.includes(location.stateCode)) return false;
    }

    // Check county match (if specified)
    if (coverage.counties?.length) {
      if (!coverage.counties.includes(location.countyFips)) return false;
    }

    // Check city match (if specified)
    if (coverage.cities?.length) {
      const cityKey = `${location.city}, ${location.stateCode}`;
      if (!coverage.cities.includes(cityKey)) return false;
    }

    // Check zip match (if specified)
    if (coverage.zipCodes?.length) {
      if (!coverage.zipCodes.includes(zipCode)) return false;
    }

    return true;
  });
}

/**
 * Match benefits to a veteran's profile
 */
export function matchBenefits(
  profile: VeteranProfile,
  benefits: Benefit[]
): BenefitMatch[] {
  const locationBenefits = getBenefitsForLocation(profile.zipCode, benefits);

  return locationBenefits.map(benefit => {
    const { matchScore, eligibilityStatus, matchedRequirements, missingInfo } =
      calculateMatch(profile, benefit);

    return {
      benefit,
      matchScore,
      eligibilityStatus,
      matchedRequirements,
      missingInfo,
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Calculate how well a veteran matches a benefit's eligibility
 */
function calculateMatch(
  profile: VeteranProfile,
  benefit: Benefit
): {
  matchScore: number;
  eligibilityStatus: 'likely' | 'possible' | 'unlikely' | 'unknown';
  matchedRequirements: string[];
  missingInfo: string[];
} {
  const matchedRequirements: string[] = [];
  const missingInfo: string[] = [];
  let totalRequirements = benefit.eligibility.requirements.length;
  let metRequirements = 0;

  for (const req of benefit.eligibility.requirements) {
    const { met, needsInfo } = checkRequirement(profile, req);
    if (met === true) {
      metRequirements++;
      matchedRequirements.push(req.description);
    } else if (met === null || needsInfo) {
      missingInfo.push(req.description);
    }
  }

  // Calculate score
  const matchScore = totalRequirements > 0
    ? Math.round((metRequirements / totalRequirements) * 100)
    : 50; // Default if no requirements

  // Determine status
  let eligibilityStatus: 'likely' | 'possible' | 'unlikely' | 'unknown';
  if (missingInfo.length === totalRequirements) {
    eligibilityStatus = 'unknown';
  } else if (matchScore >= 80) {
    eligibilityStatus = 'likely';
  } else if (matchScore >= 50) {
    eligibilityStatus = 'possible';
  } else {
    eligibilityStatus = 'unlikely';
  }

  return { matchScore, eligibilityStatus, matchedRequirements, missingInfo };
}

/**
 * Check if a veteran meets a specific requirement
 */
function checkRequirement(
  profile: VeteranProfile,
  req: { type: string; criteria?: any }
): { met: boolean | null; needsInfo: boolean } {
  const { criteria } = req;

  if (!criteria) {
    // No structured criteria, can't auto-check
    return { met: null, needsInfo: true };
  }

  switch (req.type) {
    case 'disability':
      if (profile.disabilityRating === undefined) {
        return { met: null, needsInfo: true };
      }
      if (criteria.minDisabilityRating !== undefined) {
        return {
          met: profile.disabilityRating >= criteria.minDisabilityRating,
          needsInfo: false
        };
      }
      break;

    case 'service':
      if (criteria.dischargeTypes && profile.dischargeStatus) {
        return {
          met: criteria.dischargeTypes.includes(profile.dischargeStatus),
          needsInfo: false
        };
      }
      if (criteria.minServiceDays !== undefined && profile.yearsOfService !== undefined) {
        const serviceDays = profile.yearsOfService * 365;
        return {
          met: serviceDays >= criteria.minServiceDays,
          needsInfo: false
        };
      }
      return { met: null, needsInfo: true };

    case 'income':
      if (profile.incomeLevel === undefined) {
        return { met: null, needsInfo: true };
      }
      // Simplified income check
      return { met: null, needsInfo: true };

    case 'family':
      if (criteria.requiresSpouse && profile.hasSpouse === undefined) {
        return { met: null, needsInfo: true };
      }
      if (criteria.requiresSpouse) {
        return { met: profile.hasSpouse === true, needsInfo: false };
      }
      break;
  }

  return { met: null, needsInfo: true };
}

/**
 * Lookup zip code to location info
 * TODO: Load from actual zip code database
 */
function lookupZipCode(zip: string): ZipLocation | null {
  // Placeholder - would load from a zip code database
  const sampleData: Record<string, ZipLocation> = {
    '78701': {
      zip: '78701',
      city: 'Austin',
      county: 'Travis County',
      countyFips: '48453',
      state: 'Texas',
      stateCode: 'TX'
    },
    '78205': {
      zip: '78205',
      city: 'San Antonio',
      county: 'Bexar County',
      countyFips: '48029',
      state: 'Texas',
      stateCode: 'TX'
    },
    '77001': {
      zip: '77001',
      city: 'Houston',
      county: 'Harris County',
      countyFips: '48201',
      state: 'Texas',
      stateCode: 'TX'
    }
  };

  return sampleData[zip] || null;
}

/**
 * Group benefits by category for display
 */
export function groupBenefitsByCategory(
  matches: BenefitMatch[]
): Record<string, BenefitMatch[]> {
  const groups: Record<string, BenefitMatch[]> = {};

  for (const match of matches) {
    const category = match.benefit.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(match);
  }

  return groups;
}

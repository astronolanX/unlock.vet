/**
 * Core data types for unlock.vet
 *
 * Design principle: Benefits exist at different geographic levels.
 * A veteran in Austin, TX can access:
 *   - Federal (VA) benefits
 *   - Texas state benefits
 *   - Travis County benefits
 *   - City of Austin benefits
 *   - Local nonprofit programs
 */

export type BenefitLevel = 'federal' | 'state' | 'county' | 'city' | 'nonprofit';

export type BenefitCategory =
  | 'healthcare'
  | 'disability'
  | 'education'
  | 'housing'
  | 'employment'
  | 'financial'
  | 'burial'
  | 'family';

export interface Benefit {
  id: string;
  name: string;
  summary: string;           // Plain language, 1-2 sentences
  description: string;       // Fuller explanation
  category: BenefitCategory;
  level: BenefitLevel;

  // Geographic scope
  coverage: {
    states?: string[];       // State codes, empty = all states
    counties?: string[];     // FIPS codes
    cities?: string[];       // City names + state
    zipCodes?: string[];     // Specific zips if hyper-local
  };

  // Who qualifies
  eligibility: {
    summary: string;         // Plain language
    requirements: EligibilityRequirement[];
  };

  // What to do
  action: {
    type: 'online' | 'phone' | 'in-person' | 'mail';
    url?: string;
    phone?: string;
    address?: string;
    formNumber?: string;     // e.g., "VA Form 21-526EZ"
    instructions: string;    // Step by step
  };

  // Trust signals
  source: {
    name: string;            // "U.S. Department of Veterans Affairs"
    url: string;             // Official source link
    lastVerified: string;    // ISO date
  };

  // Metadata
  tags: string[];
  relatedBenefits?: string[]; // IDs of related benefits
}

export interface EligibilityRequirement {
  type: 'service' | 'disability' | 'income' | 'age' | 'family' | 'other';
  description: string;
  // Structured data for matching (optional, for automated eligibility)
  criteria?: {
    minServiceDays?: number;
    dischargeTypes?: string[];   // 'honorable', 'general', etc.
    minDisabilityRating?: number;
    maxIncome?: number;
    minAge?: number;
    maxAge?: number;
  };
}

export interface VeteranProfile {
  // Location
  zipCode: string;
  state?: string;
  county?: string;

  // Service
  serviceEras?: string[];        // 'vietnam', 'gulf', 'post-911', etc.
  branchOfService?: string;
  dischargeStatus?: string;
  yearsOfService?: number;

  // Current situation
  disabilityRating?: number;     // 0-100
  incomeLevel?: 'low' | 'medium' | 'high';

  // Family
  hasSpouse?: boolean;
  hasDependents?: boolean;
  isSurvivor?: boolean;          // Spouse/child of deceased veteran
}

// Result of matching a veteran to benefits
export interface BenefitMatch {
  benefit: Benefit;
  matchScore: number;            // 0-100, how well they match
  eligibilityStatus: 'likely' | 'possible' | 'unlikely' | 'unknown';
  matchedRequirements: string[]; // Which requirements they meet
  missingInfo: string[];         // What we'd need to know to be certain
}

/**
 * Texas State Veteran Benefits
 *
 * Texas has one of the most comprehensive state veteran benefit programs.
 * Source: Texas Veterans Commission (tvc.texas.gov)
 */

import type { Benefit } from '../../schema';

export const texasBenefits: Benefit[] = [
  {
    id: 'tx-hazlewood',
    name: 'Hazlewood Act Education Benefits',
    summary: 'Free tuition at Texas public colleges for qualifying veterans and their children.',
    description: `The Hazlewood Act provides qualified veterans, spouses, and dependent
      children with up to 150 hours of tuition exemption at Texas public colleges and
      universities. This is one of the most generous state education benefits in the country.
      The Legacy provision allows unused hours to transfer to children.`,
    category: 'education',
    level: 'state',
    coverage: { states: ['TX'] },
    eligibility: {
      summary: 'Texas resident veteran who served at least 181 days of active duty.',
      requirements: [
        {
          type: 'service',
          description: 'Texas resident at time of entry into service, or resident for 12+ months',
        },
        {
          type: 'service',
          description: 'At least 181 days of active duty service',
          criteria: { minServiceDays: 181 }
        },
        {
          type: 'service',
          description: 'Honorable discharge or separation',
          criteria: { dischargeTypes: ['honorable'] }
        },
        {
          type: 'other',
          description: 'Not in default on any education loans'
        }
      ]
    },
    action: {
      type: 'in-person',
      url: 'https://www.tvc.texas.gov/education/hazlewood-act/',
      instructions: `1. Complete the Hazlewood application at your school's VA office
2. Provide DD214, proof of Texas residency
3. Apply separately for each semester
4. Can be combined with federal GI Bill benefits (use Hazlewood first)`
    },
    source: {
      name: 'Texas Veterans Commission',
      url: 'https://www.tvc.texas.gov/education/hazlewood-act/',
      lastVerified: '2025-01-01'
    },
    tags: ['education', 'tuition', 'college', 'free tuition', 'children'],
    relatedBenefits: ['gi-bill-post-911']
  },
  {
    id: 'tx-property-tax',
    name: 'Texas Disabled Veteran Property Tax Exemption',
    summary: '100% property tax exemption for veterans rated 100% disabled.',
    description: `Texas offers property tax exemptions based on disability rating:
      10-29%: $5,000 exemption
      30-49%: $7,500 exemption
      50-69%: $10,000 exemption
      70-99%: $12,000 exemption
      100%: Total exemption from property taxes
      Surviving spouses may also qualify.`,
    category: 'financial',
    level: 'state',
    coverage: { states: ['TX'] },
    eligibility: {
      summary: 'Texas resident with VA disability rating.',
      requirements: [
        {
          type: 'disability',
          description: 'Have a VA disability rating of 10% or higher',
          criteria: { minDisabilityRating: 10 }
        },
        {
          type: 'other',
          description: 'Own property in Texas as your residence'
        }
      ]
    },
    action: {
      type: 'in-person',
      url: 'https://comptroller.texas.gov/taxes/property-tax/exemptions/',
      instructions: `1. Get VA disability rating letter
2. Visit your county appraisal district office
3. Complete the exemption application
4. Provide DD214 and VA rating letter
5. File before April 30 for current tax year`
    },
    source: {
      name: 'Texas Comptroller',
      url: 'https://comptroller.texas.gov/taxes/property-tax/exemptions/disabled-veterans.php',
      lastVerified: '2025-01-01'
    },
    tags: ['property tax', 'disability', 'exemption', 'housing'],
    relatedBenefits: ['va-disability']
  },
  {
    id: 'tx-veterans-land-board',
    name: 'Texas Veterans Land Board Loans',
    summary: 'Low-interest loans for land, homes, and home improvements exclusive to Texas veterans.',
    description: `The Texas Veterans Land Board offers three loan programs:
      - Land Loans: Up to $150,000 for 5+ acres
      - Housing Loans: Up to $726,200 for home purchase
      - Home Improvement Loans: Up to $50,000
      Features below-market interest rates and can be combined with VA loan benefits.`,
    category: 'housing',
    level: 'state',
    coverage: { states: ['TX'] },
    eligibility: {
      summary: 'Texas veteran with honorable service.',
      requirements: [
        {
          type: 'service',
          description: 'At least 90 days active duty (unless discharged for service-connected disability)',
          criteria: { minServiceDays: 90 }
        },
        {
          type: 'service',
          description: 'Honorable discharge',
          criteria: { dischargeTypes: ['honorable'] }
        },
        {
          type: 'other',
          description: 'Texas resident or intend to live in Texas'
        }
      ]
    },
    action: {
      type: 'online',
      url: 'https://vlb.texas.gov/',
      phone: '1-800-252-8387',
      instructions: `1. Check eligibility at vlb.texas.gov
2. Get pre-qualified online
3. Find a VLB participating lender
4. Complete loan application with lender
5. Provide DD214 and standard mortgage documents`
    },
    source: {
      name: 'Texas Veterans Land Board',
      url: 'https://vlb.texas.gov/',
      lastVerified: '2025-01-01'
    },
    tags: ['housing', 'land', 'loan', 'low interest'],
    relatedBenefits: ['va-home-loan']
  },
  {
    id: 'tx-veteran-license-plates',
    name: 'Texas Veteran License Plates',
    summary: 'Specialty plates including free plates for disabled veterans.',
    description: `Texas offers various veteran license plates. Disabled veterans with
      50%+ rating get one set of plates free. 100% disabled veterans get free registration.
      Plates include: Purple Heart, Combat Action Badge, Bronze Star, and many more.`,
    category: 'financial',
    level: 'state',
    coverage: { states: ['TX'] },
    eligibility: {
      summary: 'Veteran with proof of service or specific award.',
      requirements: [
        {
          type: 'service',
          description: 'Proof of military service or specific award/decoration'
        }
      ]
    },
    action: {
      type: 'in-person',
      url: 'https://www.txdmv.gov/motorists/license-plates/specialty-license-plates',
      instructions: `1. Visit your county tax office
2. Bring DD214 or military orders showing award
3. For disabled veteran plates: bring VA rating letter
4. Pay applicable fees (free for 50%+ disabled)`
    },
    source: {
      name: 'Texas DMV',
      url: 'https://www.txdmv.gov/motorists/license-plates/specialty-license-plates',
      lastVerified: '2025-01-01'
    },
    tags: ['license plates', 'vehicle', 'discount'],
    relatedBenefits: []
  }
];

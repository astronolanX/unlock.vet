/**
 * Federal (VA) Benefits
 *
 * These apply to all veterans regardless of location.
 * Source: va.gov
 */

import type { Benefit } from '../schema';

export const federalBenefits: Benefit[] = [
  {
    id: 'va-healthcare',
    name: 'VA Health Care',
    summary: 'Free or low-cost health care at VA medical centers and clinics.',
    description: `The VA health care program covers a wide range of services including
      preventive care, primary care, specialty care, mental health services,
      prescriptions, and more. Cost depends on your priority group, which is
      based on factors like service-connected disabilities and income.`,
    category: 'healthcare',
    level: 'federal',
    coverage: {},  // All states
    eligibility: {
      summary: 'Most veterans who served on active duty and were discharged under conditions other than dishonorable qualify.',
      requirements: [
        {
          type: 'service',
          description: 'Served on active duty (not just training)',
          criteria: { minServiceDays: 1 }
        },
        {
          type: 'service',
          description: 'Discharged under conditions other than dishonorable',
          criteria: { dischargeTypes: ['honorable', 'general', 'other-than-honorable'] }
        }
      ]
    },
    action: {
      type: 'online',
      url: 'https://www.va.gov/health-care/apply/application/introduction',
      phone: '1-877-222-8387',
      formNumber: 'VA Form 10-10EZ',
      instructions: `1. Apply online at va.gov/health-care/apply
2. Or call 1-877-222-8387
3. Or visit your local VA medical center
4. You'll need: DD214, Social Security number, income information`
    },
    source: {
      name: 'U.S. Department of Veterans Affairs',
      url: 'https://www.va.gov/health-care/',
      lastVerified: '2025-01-01'
    },
    tags: ['healthcare', 'medical', 'prescriptions', 'mental health'],
    relatedBenefits: ['va-disability', 'va-mental-health']
  },
  {
    id: 'va-disability',
    name: 'VA Disability Compensation',
    summary: 'Monthly tax-free payment for injuries or illnesses caused or worsened by military service.',
    description: `Disability compensation is a tax-free monetary benefit paid to veterans
      with disabilities that are the result of a disease or injury incurred or aggravated
      during active military service. Compensation varies by disability rating (0-100%).`,
    category: 'disability',
    level: 'federal',
    coverage: {},
    eligibility: {
      summary: 'You served on active duty and have a service-connected disability.',
      requirements: [
        {
          type: 'service',
          description: 'Served on active duty, active duty for training, or inactive duty training'
        },
        {
          type: 'disability',
          description: 'Have a service-connected disability (injury or illness caused or worsened by service)'
        },
        {
          type: 'service',
          description: 'Discharged under other than dishonorable conditions',
          criteria: { dischargeTypes: ['honorable', 'general', 'other-than-honorable'] }
        }
      ]
    },
    action: {
      type: 'online',
      url: 'https://www.va.gov/disability/file-disability-claim-form-21-526ez/',
      phone: '1-800-827-1000',
      formNumber: 'VA Form 21-526EZ',
      instructions: `1. Gather evidence: medical records, service records, buddy statements
2. Apply online at va.gov or with a VSO (Veterans Service Organization)
3. Attend a C&P exam if scheduled
4. Processing typically takes 3-6 months`
    },
    source: {
      name: 'U.S. Department of Veterans Affairs',
      url: 'https://www.va.gov/disability/',
      lastVerified: '2025-01-01'
    },
    tags: ['disability', 'compensation', 'monthly payment', 'service-connected'],
    relatedBenefits: ['va-healthcare', 'va-tdiu']
  },
  {
    id: 'gi-bill-post-911',
    name: 'Post-9/11 GI Bill',
    summary: 'Pays for college, graduate school, and training programs. Includes housing allowance.',
    description: `The Post-9/11 GI Bill provides up to 36 months of education benefits.
      It can pay full tuition at public schools, a housing allowance, and a books/supplies
      stipend. Benefits can be used for college, graduate school, vocational training,
      and more. You may be able to transfer benefits to dependents.`,
    category: 'education',
    level: 'federal',
    coverage: {},
    eligibility: {
      summary: 'Served at least 90 days on active duty after September 10, 2001.',
      requirements: [
        {
          type: 'service',
          description: 'Served at least 90 aggregate days on active duty after Sept 10, 2001',
          criteria: { minServiceDays: 90 }
        },
        {
          type: 'service',
          description: 'Discharged honorably',
          criteria: { dischargeTypes: ['honorable'] }
        }
      ]
    },
    action: {
      type: 'online',
      url: 'https://www.va.gov/education/how-to-apply/',
      phone: '1-888-442-4551',
      formNumber: 'VA Form 22-1990',
      instructions: `1. Apply for a Certificate of Eligibility (COE) at va.gov
2. Choose your school and program
3. Submit enrollment certification through your school
4. Benefits pay directly to school; housing allowance pays to you`
    },
    source: {
      name: 'U.S. Department of Veterans Affairs',
      url: 'https://www.va.gov/education/about-gi-bill-benefits/post-9-11/',
      lastVerified: '2025-01-01'
    },
    tags: ['education', 'college', 'tuition', 'housing allowance', 'training'],
    relatedBenefits: ['va-voc-rehab']
  },
  {
    id: 'va-home-loan',
    name: 'VA Home Loan',
    summary: 'Buy a home with no down payment and no private mortgage insurance.',
    description: `VA-backed home loans help veterans purchase, build, or refinance a home.
      Key benefits include no down payment (in most cases), no private mortgage insurance,
      competitive interest rates, and limited closing costs. The VA guarantees a portion
      of the loan, reducing risk for lenders.`,
    category: 'housing',
    level: 'federal',
    coverage: {},
    eligibility: {
      summary: 'Served on active duty and meet minimum service requirements.',
      requirements: [
        {
          type: 'service',
          description: 'Meet minimum active duty service requirements (varies by era)',
          criteria: { minServiceDays: 90 }
        },
        {
          type: 'service',
          description: 'Discharged under other than dishonorable conditions'
        },
        {
          type: 'other',
          description: 'Meet lender credit and income requirements'
        }
      ]
    },
    action: {
      type: 'online',
      url: 'https://www.va.gov/housing-assistance/home-loans/how-to-apply/',
      phone: '1-877-827-3702',
      formNumber: 'VA Form 26-1880',
      instructions: `1. Get your Certificate of Eligibility (COE) from va.gov
2. Find a VA-approved lender
3. Get pre-approved for your loan amount
4. Find a home and make an offer
5. Complete the VA appraisal and close on your home`
    },
    source: {
      name: 'U.S. Department of Veterans Affairs',
      url: 'https://www.va.gov/housing-assistance/home-loans/',
      lastVerified: '2025-01-01'
    },
    tags: ['housing', 'home loan', 'mortgage', 'no down payment'],
    relatedBenefits: ['va-sah-grant']
  }
];

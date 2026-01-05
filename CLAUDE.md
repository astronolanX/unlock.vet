# unlock.vet

## Mission
Cut through the noise. Help veterans and their families find and access the benefits they've earned - by location, by situation, by need.

## Problem
- Benefits fragmented across federal (VA), state, county, city, and nonprofit orgs
- No single source of truth
- Eligibility rules buried in bureaucratic language
- Veterans give up or miss benefits they qualify for
- Families in crisis don't have time to research

## Solution
Location-first benefits intelligence:
1. **Where are you?** - Zip code unlocks the full stack of available benefits
2. **What's your situation?** - Service history, disability rating, income, family status
3. **What can you get?** - Matched benefits with clear eligibility and next steps

## Technical Direction
- Start simple: static data, fast lookups
- Location hierarchy: federal → state → county → city → local nonprofits
- Plain language summaries over legalese
- Mobile-first (veterans need this in waiting rooms, not at desks)

## MVP Scope
1. Core benefit categories: healthcare, disability, education, housing, employment
2. Coverage: Start with 1-3 states, expand
3. Basic eligibility matching
4. Clear action items: "Call this number" / "Go to this office" / "Fill out this form"

## Principles
- No account required to search
- No selling data
- Accuracy over comprehensiveness
- Update timestamps on everything (stale info is dangerous)
- Cite sources always

## Commands
```bash
# Dev
npm run dev        # Start local server
npm run build      # Production build
npm test           # Run tests

# Data
npm run scrape     # Update benefit data (when implemented)
npm run validate   # Check data integrity
```

## Structure
```
src/
  data/           # Benefit definitions, eligibility rules
  lib/            # Core logic
  app/            # UI components
docs/
  research/       # Source documentation
  api/            # API specs when needed
```

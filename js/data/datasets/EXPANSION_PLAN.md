# Dataset Expansion Plan

**Generated:** January 27, 2026
**Target:** ~250 entities per dataset
**Date Range:** June 2025 - January 27, 2026

## Current State Summary

| Dataset | Docs | Persons | Orgs | Events | Narratives | Themes | Topics | Locations | Total |
|---------|------|---------|------|--------|------------|--------|--------|-----------|-------|
| American Politics | 31 | 26 | 23 | 22 | 7 | 22 | 5 | 8 | ~170 |
| China Semiconductor | 35 | 19 | 26 | 14 | 7 | 17 | 7 | 10 | ~170 |
| Walmart Brand | 23 | 17 | 15 | 14 | 7 | 16 | 7 | 10 | ~150 |

## Target Additions Per Dataset

| Entity Type | Add Each | Priority |
|-------------|----------|----------|
| Documents | 25 | HIGH |
| Persons | 10 | MEDIUM |
| Organizations | 8 | MEDIUM |
| Events | 12 | MEDIUM |
| Narratives | 4 | HIGH |
| Themes | 10 | HIGH |
| Topics | 3 | LOW |
| Locations | 2 | LOW |

---

# AMERICAN POLITICS EXPANSION

## Starting IDs
- Next person: person-027
- Next org: org-024
- Next event: event-027
- Next narrative: narr-011
- Next theme: sub-028
- Next doc: doc-032
- Next topic: topic-006
- Next location: loc-010

## New Narratives (4) - 50% new storylines, 50% deepening existing

### narr-011: "2024 Election certification challenges and Capitol security concerns" (NEW)
- **Timeline:** June-November 2025
- **Related existing:** narr-005 (Trump foreign policy)
- **Factions:** faction-001, faction-002, faction-004
- **Theme IDs:** sub-028, sub-029, sub-030

### narr-012: "Federal budget showdown threatens government shutdown" (NEW)
- **Timeline:** September-December 2025
- **Factions:** faction-001, faction-002
- **Theme IDs:** sub-031, sub-032

### narr-013: "Opioid settlement funds distribution sparks controversy" (DEEPENS narr-003 health)
- **Timeline:** July-October 2025
- **Factions:** faction-005, faction-006
- **Theme IDs:** sub-033, sub-034

### narr-014: "Border state governors form coalition on immigration policy" (DEEPENS narr-006 immigration)
- **Timeline:** August-December 2025
- **Factions:** faction-001, faction-002, faction-003, faction-004
- **Theme IDs:** sub-035, sub-036, sub-037

## New Persons (10)

| ID | Name | Type | Org | Factions | Appears in Narratives |
|----|------|------|-----|----------|----------------------|
| person-027 | Greg Abbott | politician | org-024 (TX Gov) | faction-001 | narr-014 |
| person-028 | Ron DeSantis | politician | org-025 (FL Gov) | faction-001 | narr-014, narr-011 |
| person-029 | Gavin Newsom | politician | org-026 (CA Gov) | faction-002 | narr-014, narr-012 |
| person-030 | Merrick Garland | government_official | org-010 (DOJ) | faction-002 | narr-011, narr-006 |
| person-031 | John Roberts | judge | org-027 (SCOTUS) | faction-004 | narr-011 |
| person-032 | Mike Johnson | politician | org-020 (Congress) | faction-001 | narr-011, narr-012 |
| person-033 | Chuck Schumer | politician | org-020 (Congress) | faction-002 | narr-011, narr-012 |
| person-034 | Anne Milgram | government_official | org-028 (DEA) | faction-004 | narr-013 |
| person-035 | Xavier Becerra | government_official | org-022 (HHS) | faction-002 | narr-013 |
| person-036 | Kash Patel | government_official | org-012 (FBI) | faction-001 | narr-011 |

## New Organizations (8)

| ID | Name | Type | Factions | Narratives |
|----|------|------|----------|------------|
| org-024 | Office of the Governor of Texas | government | faction-001 | narr-014 |
| org-025 | Office of the Governor of Florida | government | faction-001 | narr-014 |
| org-026 | Office of the Governor of California | government | faction-002 | narr-014 |
| org-027 | Supreme Court of the United States | judicial | faction-004 | narr-011 |
| org-028 | Drug Enforcement Administration | government | faction-004 | narr-013 |
| org-029 | Texas National Guard | military | faction-001, faction-004 | narr-014 |
| org-030 | ACLU | nonprofit | faction-002, faction-003 | narr-014, narr-011 |
| org-031 | Heritage Foundation | nonprofit | faction-001 | narr-011, narr-012 |

## New Locations (2)

| ID | Name | Type | Coordinates |
|----|------|------|-------------|
| loc-010 | Austin, Texas | city | 30.2672, -97.7431 |
| loc-011 | Eagle Pass, Texas | city | 28.7091, -100.4995 |

## New Events (12)

| ID | Text | Date | Location | Persons | Orgs | Parent |
|----|------|------|----------|---------|------|--------|
| event-027 | Texas deploys additional National Guard to border | 2025-06-15 | loc-011 | person-027 | org-024, org-029 | null |
| event-028 | DeSantis signs Florida border security bill | 2025-07-10 | loc-new | person-028 | org-025 | null |
| event-029 | California sues federal government over border policy | 2025-08-05 | loc-new | person-029 | org-026 | null |
| event-030 | DOJ announces investigation into state border actions | 2025-08-20 | loc-001 | person-030 | org-010 | null |
| event-031 | Border governors summit in Texas | 2025-09-01 | loc-010 | person-027, person-028 | org-024, org-025 | null |
| event-032 | House passes border security funding bill | 2025-09-15 | loc-004 | person-032 | org-020 | null |
| event-033 | Senate blocks border funding bill | 2025-09-22 | loc-004 | person-033 | org-020 | event-032 |
| event-034 | Government shutdown begins | 2025-10-01 | loc-001 | person-032, person-033 | org-020 | null |
| event-035 | Opioid settlement distribution begins | 2025-07-01 | loc-001 | person-034, person-035 | org-028, org-022 | null |
| event-036 | States challenge settlement allocation formula | 2025-08-15 | loc-009 | | org-027 | event-035 |
| event-037 | Supreme Court agrees to hear election cases | 2025-11-15 | loc-009 | person-031 | org-027 | null |
| event-038 | FBI leadership transition announced | 2025-12-01 | loc-001 | person-036 | org-012 | null |

## New Documents (25) - Timeline June 2025 to Jan 2026

### June 2025
| ID | Title | Date | Publisher | Type | Narratives | Themes | Factions |
|----|-------|------|-----------|------|------------|--------|----------|
| doc-032 | Texas Governor Deploys 5,000 Guardsmen to Border | 2025-06-15 | pub-nat-fox | news_article | narr-014 | sub-035 | faction-001: 0.72, faction-002: -0.65 |
| doc-033 | Immigration advocates condemn Texas border surge | 2025-06-18 | pub-nat-cnn | news_article | narr-014 | sub-035 | faction-001: -0.55, faction-002: 0.62, faction-003: 0.78 |

### July 2025
| ID | Title | Date | Publisher | Type | Narratives | Themes | Factions |
|----|-------|------|-----------|------|------------|--------|----------|
| doc-034 | DeSantis signs aggressive border enforcement bill | 2025-07-10 | pub-nat-fox | news_article | narr-014 | sub-035 | faction-001: 0.75, faction-002: -0.68 |
| doc-035 | Opioid settlement checks begin arriving in hardest-hit communities | 2025-07-05 | pub-nat-nyt | news_article | narr-013 | sub-033 | faction-005: 0.45, faction-006: 0.38 |
| doc-036 | Health officials debate best use of opioid funds | 2025-07-20 | pub-nat-wapo | news_article | narr-013 | sub-033, sub-034 | faction-005: 0.35, faction-006: 0.42 |

### August 2025
| ID | Title | Date | Publisher | Type | Narratives | Themes | Factions |
|----|-------|------|-----------|------|------------|--------|----------|
| doc-037 | California files federal lawsuit over border policies | 2025-08-05 | pub-nat-cnn | news_article | narr-014 | sub-036 | faction-001: -0.72, faction-002: 0.68 |
| doc-038 | DOJ opens investigation into Texas border operations | 2025-08-20 | pub-nat-nyt | news_article | narr-014 | sub-036 | faction-001: -0.58, faction-002: 0.55 |
| doc-039 | States sue over opioid settlement formula | 2025-08-15 | pub-nat-wapo | news_article | narr-013 | sub-034 | faction-005: -0.42, faction-006: -0.35 |

### September 2025
| ID | Title | Date | Publisher | Type | Narratives | Themes | Factions |
|----|-------|------|-----------|------|------------|--------|----------|
| doc-040 | Border governors announce unified strategy at Texas summit | 2025-09-01 | pub-nat-fox | news_article | narr-014 | sub-035, sub-037 | faction-001: 0.78, faction-002: -0.72 |
| doc-041 | House narrowly passes border security funding | 2025-09-15 | pub-int-reuters | news_article | narr-012, narr-014 | sub-031 | faction-001: 0.62, faction-002: -0.45 |
| doc-042 | Senate Democrats block border bill, shutdown looms | 2025-09-22 | pub-nat-cnn | news_article | narr-012 | sub-031, sub-032 | faction-001: -0.68, faction-002: 0.52 |
| doc-043 | Budget negotiations collapse as deadline approaches | 2025-09-28 | pub-nat-nyt | news_article | narr-012 | sub-031 | faction-001: -0.35, faction-002: -0.42 |

### October 2025
| ID | Title | Date | Publisher | Type | Narratives | Themes | Factions |
|----|-------|------|-----------|------|------------|--------|----------|
| doc-044 | Government shutdown begins, blame game intensifies | 2025-10-01 | pub-nat-wapo | news_article | narr-012 | sub-032 | faction-001: -0.52, faction-002: -0.55 |
| doc-045 | Federal workers furloughed as shutdown enters second week | 2025-10-08 | pub-nat-cnn | news_article | narr-012 | sub-032 | faction-001: -0.48, faction-002: -0.45 |
| doc-046 | Compromise reached, government reopens after 18 days | 2025-10-19 | pub-int-reuters | news_article | narr-012 | sub-031, sub-032 | faction-001: 0.25, faction-002: 0.28 |

### November 2025
| ID | Title | Date | Publisher | Type | Narratives | Themes | Factions |
|----|-------|------|-----------|------|------------|--------|----------|
| doc-047 | Supreme Court agrees to expedite election certification cases | 2025-11-15 | pub-nat-nyt | news_article | narr-011 | sub-028 | faction-001: 0.55, faction-002: -0.62, faction-004: 0.48 |
| doc-048 | Security preparations ramp up ahead of January certification | 2025-11-20 | pub-nat-wapo | news_article | narr-011 | sub-029 | faction-004: 0.65 |
| doc-049 | ACLU announces legal challenges to state election laws | 2025-11-25 | pub-nat-cnn | news_article | narr-011 | sub-030 | faction-001: -0.72, faction-002: 0.68, faction-003: 0.55 |

### December 2025
| ID | Title | Date | Publisher | Type | Narratives | Themes | Factions |
|----|-------|------|-----------|------|------------|--------|----------|
| doc-050 | FBI leadership shake-up announced amid transition | 2025-12-01 | pub-nat-fox | news_article | narr-011 | sub-028 | faction-001: 0.72, faction-002: -0.78 |
| doc-051 | Capitol Police expand security perimeter for certification | 2025-12-10 | pub-nat-wapo | news_article | narr-011 | sub-029 | faction-004: 0.58 |
| doc-052 | Heritage Foundation releases transition policy recommendations | 2025-12-15 | pub-nat-fox | news_article | narr-011, narr-012 | sub-028, sub-031 | faction-001: 0.82, faction-002: -0.75 |
| doc-053 | Opioid funding disputes continue as year ends | 2025-12-20 | pub-nat-nyt | news_article | narr-013 | sub-034 | faction-005: -0.38, faction-006: -0.32 |
| doc-054 | Border crossings reach five-year low, debate continues | 2025-12-28 | pub-int-reuters | news_article | narr-014 | sub-037 | faction-001: 0.65, faction-002: -0.42 |

### January 2026 (early, before current events)
| ID | Title | Date | Publisher | Type | Narratives | Themes | Factions |
|----|-------|------|-----------|------|------------|--------|----------|
| doc-055 | Election certification expected to proceed smoothly | 2026-01-02 | pub-nat-nyt | news_article | narr-011 | sub-028, sub-029 | faction-001: 0.45, faction-002: 0.38, faction-004: 0.52 |
| doc-056 | New Congress sworn in amid partisan tensions | 2026-01-03 | pub-nat-cnn | news_article | narr-011, narr-012 | sub-028, sub-031 | faction-001: 0.35, faction-002: 0.32 |

## New Themes (10)

| ID | Text | Parent Narrative | Sentiment |
|----|------|------------------|-----------|
| sub-028 | Electoral certification process under heightened scrutiny | narr-011 | -0.35 |
| sub-029 | Capitol security preparations for January 2025 certification | narr-011 | 0.15 |
| sub-030 | Legal challenges to state election procedures | narr-011 | -0.42 |
| sub-031 | Budget negotiations stall over border funding priorities | narr-012 | -0.48 |
| sub-032 | Government shutdown impacts federal workers and services | narr-012 | -0.55 |
| sub-033 | Opioid settlement funds distribution begins | narr-013 | 0.25 |
| sub-034 | States dispute opioid settlement allocation formula | narr-013 | -0.38 |
| sub-035 | Republican governors coordinate border enforcement | narr-014 | 0.45 |
| sub-036 | Federal-state conflict over immigration authority | narr-014 | -0.52 |
| sub-037 | Border policy effectiveness debate | narr-014 | -0.15 |

## New Topics (3)

| ID | Headline | Doc IDs | Start Date | End Date |
|----|----------|---------|------------|----------|
| topic-006 | Border State Governors Form Coalition on Immigration | doc-032 to doc-040, doc-054 | 2025-06-15 | null |
| topic-007 | Federal Budget Showdown Leads to October Shutdown | doc-041 to doc-046 | 2025-09-15 | 2025-10-19 |
| topic-008 | Opioid Settlement Distribution Sparks Legal Battles | doc-035, doc-036, doc-039, doc-053 | 2025-07-01 | null |

---

# CHINA SEMICONDUCTOR EXPANSION

## Starting IDs
- Next person: person-020
- Next org: org-027
- Next event: event-015
- Next narrative: narr-008
- Next theme: sub-018
- Next doc: doc-036
- Next topic: topic-008
- Next location: loc-011

## New Narratives (4)

### narr-008: "Intel struggles to compete as foundry business falters" (NEW)
- **Timeline:** June-October 2025
- **Factions:** faction-002, faction-005, faction-006
- **Theme IDs:** sub-018, sub-019

### narr-009: "South Korea semiconductor subsidies spark trade tensions" (NEW)
- **Timeline:** July-November 2025
- **Factions:** faction-002, faction-006
- **Theme IDs:** sub-020, sub-021

### narr-010: "China rare earth export restrictions tighten chip supply chain" (DEEPENS narr-002 export controls)
- **Timeline:** August-December 2025
- **Factions:** faction-001, faction-002, faction-004
- **Theme IDs:** sub-022, sub-023

### narr-011: "Nvidia AI chip demand outpaces production capacity" (DEEPENS narr-001 SMIC)
- **Timeline:** September 2025-January 2026
- **Factions:** faction-002, faction-003, faction-005, faction-006
- **Theme IDs:** sub-024, sub-025

## New Persons (10)

| ID | Name | Type | Org | Factions | Narratives |
|----|------|------|-----|----------|------------|
| person-020 | Pat Gelsinger | executive | org-027 (Intel) | faction-005 | narr-008 |
| person-021 | Jensen Huang | executive | org-028 (Nvidia) | faction-005 | narr-011 |
| person-022 | Lee Jae-yong | executive | org-014 (Samsung) | faction-006 | narr-009 |
| person-023 | Kwon Young-soo | executive | org-029 (SK Hynix) | faction-006 | narr-009 |
| person-024 | Alan Estevez | government_official | org-006 (BIS) | faction-002 | narr-010 |
| person-025 | Wang Wentao | government_official | org-030 (MOFCOM) | faction-001, faction-004 | narr-010 |
| person-026 | Lisa Su | executive | org-031 (AMD) | faction-005 | narr-011 |
| person-027 | Lip-Bu Tan | executive | org-019 (Cadence) | faction-005 | narr-006 |
| person-028 | Christophe Fouquet | executive | org-002 (ASML) | faction-006 | narr-002 |
| person-029 | Gary Dickerson | executive | org-003 (Applied Materials) | faction-005 | narr-004 |

## New Organizations (8)

| ID | Name | Type | Factions | Narratives |
|----|------|------|----------|------------|
| org-027 | Intel Corporation | corporation | faction-005 | narr-008 |
| org-028 | Nvidia Corporation | corporation | faction-005 | narr-011 |
| org-029 | SK Hynix | corporation | faction-006 | narr-009 |
| org-030 | Ministry of Commerce of China (MOFCOM) | government | faction-001, faction-004 | narr-010 |
| org-031 | Advanced Micro Devices (AMD) | corporation | faction-005 | narr-011 |
| org-032 | Korea Ministry of Trade | government | faction-006 | narr-009 |
| org-033 | Taiwan Ministry of Economic Affairs | government | faction-005 | narr-007 |
| org-034 | Arm Holdings | corporation | faction-005, faction-006 | narr-011 |

## New Locations (2)

| ID | Name | Type | Coordinates |
|----|------|------|-------------|
| loc-011 | Seoul, South Korea | city | 37.5665, 126.9780 |
| loc-012 | Santa Clara, California | city | 37.3541, -121.9552 |

## New Events (12)

| ID | Text | Date | Location | Persons | Orgs | Parent |
|----|------|------|----------|---------|------|--------|
| event-015 | Intel announces major restructuring and layoffs | 2025-06-20 | loc-012 | person-020 | org-027 | null |
| event-016 | Samsung announces $17B chip investment in South Korea | 2025-07-05 | loc-011 | person-022 | org-014 | null |
| event-017 | US objects to Korean semiconductor subsidies at WTO | 2025-07-25 | loc-004 | | org-005, org-032 | event-016 |
| event-018 | China announces rare earth export quotas | 2025-08-10 | loc-006 | person-025 | org-030 | null |
| event-019 | US semiconductor firms warn of supply chain impacts | 2025-08-25 | loc-004 | person-024 | org-005, org-006 | event-018 |
| event-020 | Intel reports quarterly loss, stock plunges | 2025-09-15 | loc-012 | person-020 | org-027 | event-015 |
| event-021 | Nvidia reports record AI chip demand | 2025-09-20 | loc-012 | person-021 | org-028 | null |
| event-022 | SK Hynix announces HBM production expansion | 2025-10-01 | loc-011 | person-023 | org-029 | null |
| event-023 | China tightens gallium and germanium export controls | 2025-10-15 | loc-006 | person-025 | org-030, org-009 | event-018 |
| event-024 | ASML CEO warns of prolonged China restrictions | 2025-11-05 | loc-003 | person-028 | org-002 | null |
| event-025 | AMD unveils new AI accelerator to compete with Nvidia | 2025-11-20 | loc-012 | person-026 | org-031 | null |
| event-026 | Intel secures $8.5B in CHIPS Act funding | 2025-12-10 | loc-004 | person-020 | org-027, org-005 | null |

## New Documents (25)

### June 2025
| ID | Title | Date | Publisher | Type | Narratives | Themes | Factions |
|----|-------|------|-----------|------|------------|--------|----------|
| doc-036 | Intel announces 15,000 layoffs in major restructuring | 2025-06-20 | pub-bloomberg | news_article | narr-008 | sub-018 | faction-002: -0.55, faction-005: -0.72, faction-006: 0.35 |
| doc-037 | Can Intel survive the foundry wars? | 2025-06-25 | pub-semiengi | news_article | narr-008 | sub-018, sub-019 | faction-003: -0.42, faction-005: -0.65 |

### July 2025
| ID | Title | Date | Publisher | Type | Narratives | Themes | Factions |
|----|-------|------|-----------|------|------------|--------|----------|
| doc-038 | Samsung pledges $17 billion chip investment in Korea | 2025-07-05 | pub-reuters | news_article | narr-009 | sub-020 | faction-006: 0.72 |
| doc-039 | US raises concerns over Korean semiconductor subsidies | 2025-07-25 | pub-wsj | news_article | narr-009 | sub-020, sub-021 | faction-002: 0.58, faction-006: -0.45 |

### August 2025
| ID | Title | Date | Publisher | Type | Narratives | Themes | Factions |
|----|-------|------|-----------|------|------------|--------|----------|
| doc-040 | China imposes rare earth export quotas in escalation | 2025-08-10 | pub-scmp | news_article | narr-010 | sub-022 | faction-001: 0.75, faction-002: -0.78, faction-004: 0.82 |
| doc-041 | Chip industry sounds alarm on rare earth restrictions | 2025-08-25 | pub-bloomberg | news_article | narr-010 | sub-022, sub-023 | faction-002: -0.65, faction-005: -0.58 |
| doc-042 | Analysis: How China's rare earth controls reshape chip supply chains | 2025-08-30 | pub-eetimes | news_article | narr-010 | sub-023 | faction-003: -0.35 |

### September 2025
| ID | Title | Date | Publisher | Type | Narratives | Themes | Factions |
|----|-------|------|-----------|------|------------|--------|----------|
| doc-043 | Intel reports $1.6B quarterly loss | 2025-09-15 | pub-reuters | news_article | narr-008 | sub-018 | faction-005: -0.68, faction-006: 0.42 |
| doc-044 | Nvidia crushes earnings expectations on AI demand | 2025-09-20 | pub-bloomberg | news_article | narr-011 | sub-024 | faction-005: 0.85, faction-006: 0.72 |
| doc-045 | The AI chip shortage is getting worse | 2025-09-25 | pub-wsj | news_article | narr-011 | sub-024, sub-025 | faction-003: -0.38, faction-005: 0.55 |

### October 2025
| ID | Title | Date | Publisher | Type | Narratives | Themes | Factions |
|----|-------|------|-----------|------|------------|--------|----------|
| doc-046 | SK Hynix ramps HBM production to meet AI demand | 2025-10-01 | pub-semiengi | news_article | narr-011 | sub-024 | faction-006: 0.78 |
| doc-047 | China further restricts gallium and germanium exports | 2025-10-15 | pub-xinhua | news_article | narr-010 | sub-022 | faction-001: 0.82, faction-004: 0.85 |
| doc-048 | US firms scramble for rare earth alternatives | 2025-10-20 | pub-bloomberg | news_article | narr-010 | sub-023 | faction-002: -0.52, faction-005: -0.48 |
| doc-049 | Korea-US tensions rise over chip subsidies | 2025-10-25 | pub-ft | news_article | narr-009 | sub-021 | faction-002: -0.42, faction-006: -0.55 |

### November 2025
| ID | Title | Date | Publisher | Type | Narratives | Themes | Factions |
|----|-------|------|-----------|------|------------|--------|----------|
| doc-050 | ASML CEO: China restrictions will persist for years | 2025-11-05 | pub-reuters | news_article | narr-002 | sub-006 | faction-001: -0.62, faction-006: -0.48 |
| doc-051 | AMD launches new AI chip to challenge Nvidia dominance | 2025-11-20 | pub-eetimes | news_article | narr-011 | sub-025 | faction-003: 0.55, faction-005: 0.62 |
| doc-052 | Analysis: Can anyone catch Nvidia in AI chips? | 2025-11-25 | pub-semiengi | news_article | narr-011 | sub-024, sub-025 | faction-003: 0.42 |

### December 2025
| ID | Title | Date | Publisher | Type | Narratives | Themes | Factions |
|----|-------|------|-----------|------|------------|--------|----------|
| doc-053 | Intel secures $8.5B CHIPS Act funding | 2025-12-10 | pub-wsj | news_article | narr-008 | sub-019 | faction-002: 0.65, faction-005: 0.72 |
| doc-054 | Year in review: China semiconductor progress exceeds expectations | 2025-12-20 | pub-scmp | news_article | narr-001 | sub-002 | faction-001: 0.78, faction-003: 0.45 |
| doc-055 | US-Korea chip subsidy dispute heads to WTO | 2025-12-28 | pub-reuters | news_article | narr-009 | sub-021 | faction-002: -0.35, faction-006: -0.42 |

### January 2026 (early)
| ID | Title | Date | Publisher | Type | Narratives | Themes | Factions |
|----|-------|------|-----------|------|------------|--------|----------|
| doc-056 | Nvidia announces next-gen AI chip at CES | 2026-01-05 | pub-bloomberg | news_article | narr-011 | sub-024 | faction-005: 0.82, faction-006: 0.68 |
| doc-057 | Intel CEO outlines turnaround strategy at CES | 2026-01-06 | pub-eetimes | news_article | narr-008 | sub-019 | faction-005: 0.45 |
| doc-058 | China rare earth restrictions show limited impact so far | 2026-01-08 | pub-ft | news_article | narr-010 | sub-023 | faction-001: -0.35, faction-002: 0.42 |
| doc-059 | TSMC reports strong Q4 driven by AI chip demand | 2026-01-10 | pub-reuters | news_article | narr-007, narr-011 | sub-016, sub-024 | faction-005: 0.72, faction-006: 0.65 |
| doc-060 | Samsung and SK Hynix announce HBM alliance | 2026-01-12 | pub-semiengi | news_article | narr-009 | sub-020 | faction-006: 0.75 |

## New Themes (10)

| ID | Text | Parent Narrative | Sentiment |
|----|------|------------------|-----------|
| sub-018 | Intel restructuring amid foundry business struggles | narr-008 | -0.58 |
| sub-019 | CHIPS Act funding helps struggling US chipmakers | narr-008 | 0.42 |
| sub-020 | South Korea ramps semiconductor investment | narr-009 | 0.55 |
| sub-021 | US-Korea trade tensions over chip subsidies | narr-009 | -0.45 |
| sub-022 | China rare earth export controls escalate | narr-010 | -0.62 |
| sub-023 | Semiconductor supply chain adapts to rare earth restrictions | narr-010 | -0.35 |
| sub-024 | AI chip demand outstrips global production capacity | narr-011 | 0.48 |
| sub-025 | Competition intensifies in AI accelerator market | narr-011 | 0.35 |

## New Topics (3)

| ID | Headline | Doc IDs | Start Date | End Date |
|----|----------|---------|------------|----------|
| topic-008 | Intel Struggles While Nvidia Soars in Chip Wars | doc-036, doc-037, doc-043, doc-053, doc-057 | 2025-06-20 | null |
| topic-009 | China Rare Earth Controls Disrupt Chip Supply Chain | doc-040, doc-041, doc-042, doc-047, doc-048, doc-058 | 2025-08-10 | null |
| topic-010 | AI Chip Shortage Intensifies Global Competition | doc-044, doc-045, doc-046, doc-051, doc-052, doc-056 | 2025-09-20 | null |

---

# WALMART BRAND EXPANSION

## Starting IDs
- Next person: person-018
- Next org: org-016
- Next event: event-015
- Next narrative: narr-008
- Next theme: sub-017
- Next doc: doc-024
- Next topic: topic-008
- Next location: loc-011

## New Narratives (4)

### narr-008: "Walmart faces scrutiny over Great Value supplier practices" (NEW)
- **Timeline:** June-September 2025
- **Factions:** faction-003, faction-004
- **Theme IDs:** sub-017, sub-018

### narr-009: "E-commerce fulfillment center workers push for unionization" (NEW)
- **Timeline:** July-November 2025
- **Factions:** faction-002, faction-003
- **Theme IDs:** sub-019, sub-020

### narr-010: "Walmart expands healthcare services amid rural hospital closures" (DEEPENS narr-007 rural)
- **Timeline:** August-December 2025
- **Factions:** faction-001, faction-004, faction-005
- **Theme IDs:** sub-021, sub-022

### narr-011: "Holiday season delivery failures damage Walmart's reputation" (DEEPENS narr-006 delivery)
- **Timeline:** November 2025-January 2026
- **Factions:** faction-001, faction-005, faction-006
- **Theme IDs:** sub-023, sub-024

## New Persons (10)

| ID | Name | Type | Org | Factions | Narratives |
|----|------|------|-----|----------|------------|
| person-018 | Cedric Clark | executive | org-001 (Walmart) | | narr-002, narr-011 |
| person-019 | Tom Ward | executive | org-001 (Walmart) | | narr-011 |
| person-020 | Stuart Appelbaum | labor_leader | org-016 (RWDSU) | faction-002, faction-003 | narr-009 |
| person-021 | Chris Smalls | activist | org-017 (Amazon Labor Union) | faction-003 | narr-009 |
| person-022 | Lina Khan | government_official | org-018 (FTC) | faction-004 | narr-008 |
| person-023 | Ron Wahlen | executive | org-019 (Walmart Health) | | narr-010 |
| person-024 | John Rainey | executive | org-001 (Walmart) | faction-005 | narr-002, narr-005 |
| person-025 | Kelvin Buncum | activist | org-006 (United for Respect) | faction-003 | narr-003, narr-009 |
| person-026 | Chris Kirkpatrick | journalist | | faction-005 | narr-005 |
| person-027 | Craig Jelinek | executive | org-011 (Costco) | faction-006 | narr-006 |

## New Organizations (8)

| ID | Name | Type | Factions | Narratives |
|----|------|------|----------|------------|
| org-016 | Retail, Wholesale and Department Store Union (RWDSU) | union | faction-002, faction-003 | narr-009 |
| org-017 | Amazon Labor Union | union | faction-003 | narr-009 |
| org-018 | Federal Trade Commission | government | faction-004 | narr-008 |
| org-019 | Walmart Health | corporation | | narr-010 |
| org-020 | Dollar General | corporation | faction-006 | narr-007 |
| org-021 | CVS Health | corporation | | narr-010 |
| org-022 | Instacart | corporation | faction-006 | narr-006, narr-011 |
| org-023 | Kroger | corporation | faction-006 | narr-005, narr-006 |

## New Locations (2)

| ID | Name | Type | Coordinates |
|----|------|------|-------------|
| loc-011 | Dallas, Texas | city | 32.7767, -96.7970 |
| loc-012 | Atlanta, Georgia | city | 33.7490, -84.3880 |

## New Events (12)

| ID | Text | Date | Location | Persons | Orgs | Parent |
|----|------|------|----------|---------|------|--------|
| event-015 | Investigation reveals Great Value supplier labor violations | 2025-06-15 | loc-007 | | org-001, org-018 | null |
| event-016 | FTC opens inquiry into Walmart supplier practices | 2025-07-01 | loc-007 | person-022 | org-018, org-001 | event-015 |
| event-017 | Walmart fulfillment center workers file for union election | 2025-07-20 | loc-011 | person-020 | org-016, org-001 | null |
| event-018 | Walmart announces expansion of healthcare clinics | 2025-08-05 | loc-001 | person-023 | org-019 | null |
| event-019 | Union election fails at Dallas fulfillment center | 2025-09-15 | loc-011 | person-020 | org-016, org-001 | event-017 |
| event-020 | Second fulfillment center files for union election | 2025-10-01 | loc-012 | person-020, person-025 | org-016, org-006 | event-019 |
| event-021 | Walmart Health expands to 15 new rural communities | 2025-10-15 | loc-001 | person-023 | org-019 | event-018 |
| event-022 | Black Friday delivery system overwhelmed | 2025-11-29 | loc-001 | person-018, person-019 | org-001 | null |
| event-023 | Walmart apologizes for holiday delivery failures | 2025-12-05 | loc-001 | person-001, person-018 | org-001 | event-022 |
| event-024 | Consumer groups file FTC complaint over delivery promises | 2025-12-15 | loc-007 | person-007, person-022 | org-008, org-018 | event-022 |
| event-025 | Walmart announces $500M delivery infrastructure investment | 2025-12-28 | loc-001 | person-001, person-019 | org-001 | event-023 |
| event-026 | Atlanta fulfillment center votes to unionize | 2026-01-10 | loc-012 | person-020, person-025 | org-016, org-001 | event-020 |

## New Documents (25)

### June 2025
| ID | Title | Date | Publisher | Type | Narratives | Themes | Factions |
|----|-------|------|-----------|------|------------|--------|----------|
| doc-024 | Investigation reveals unsafe conditions at Great Value supplier | 2025-06-15 | pub-reuters | news_article | narr-008 | sub-017 | faction-003: -0.72, faction-004: -0.68 |
| doc-025 | Walmart faces pressure over supply chain transparency | 2025-06-22 | pub-wsj | news_article | narr-008 | sub-017, sub-018 | faction-003: -0.65, faction-005: -0.42 |

### July 2025
| ID | Title | Date | Publisher | Type | Narratives | Themes | Factions |
|----|-------|------|-----------|------|------------|--------|----------|
| doc-026 | FTC opens inquiry into retail supply chain practices | 2025-07-01 | pub-bloomberg | news_article | narr-008 | sub-018 | faction-004: 0.55, faction-005: -0.48 |
| doc-027 | Walmart fulfillment workers in Texas seek union vote | 2025-07-20 | pub-ap | news_article | narr-009 | sub-019 | faction-002: 0.72, faction-003: 0.78 |
| doc-028 | Why warehouse workers are organizing in record numbers | 2025-07-28 | pub-usatoday | news_article | narr-009 | sub-019, sub-020 | faction-002: 0.68, faction-003: 0.75 |

### August 2025
| ID | Title | Date | Publisher | Type | Narratives | Themes | Factions |
|----|-------|------|-----------|------|------------|--------|----------|
| doc-029 | Walmart bets big on healthcare as rural hospitals struggle | 2025-08-05 | pub-wsj | news_article | narr-010 | sub-021 | faction-001: 0.45, faction-004: 0.52, faction-005: 0.58 |
| doc-030 | Can Walmart fill the rural healthcare gap? | 2025-08-15 | pub-localnews | news_article | narr-010 | sub-021, sub-022 | faction-001: 0.55, faction-004: 0.48 |
| doc-031 | Critics question Walmart's healthcare motives | 2025-08-25 | pub-consumeraffairs | news_article | narr-010 | sub-022 | faction-001: -0.35, faction-004: 0.42 |

### September 2025
| ID | Title | Date | Publisher | Type | Narratives | Themes | Factions |
|----|-------|------|-----------|------|------------|--------|----------|
| doc-032 | Union vote fails at Texas Walmart fulfillment center | 2025-09-15 | pub-reuters | news_article | narr-009 | sub-020 | faction-002: -0.65, faction-003: -0.72 |
| doc-033 | Workers vow to continue organizing despite setback | 2025-09-18 | pub-ap | news_article | narr-009 | sub-019 | faction-002: 0.58, faction-003: 0.65 |
| doc-034 | Walmart's anti-union tactics come under scrutiny | 2025-09-25 | pub-bloomberg | news_article | narr-009 | sub-020 | faction-002: -0.72, faction-003: -0.78, faction-005: -0.35 |

### October 2025
| ID | Title | Date | Publisher | Type | Narratives | Themes | Factions |
|----|-------|------|-----------|------|------------|--------|----------|
| doc-035 | Second Walmart fulfillment center files for union election | 2025-10-01 | pub-usatoday | news_article | narr-009 | sub-019 | faction-002: 0.72, faction-003: 0.75 |
| doc-036 | Walmart Health opens 15 new clinics in underserved areas | 2025-10-15 | pub-localnews | news_article | narr-010 | sub-021 | faction-001: 0.62, faction-004: 0.55 |
| doc-037 | Rural communities embrace Walmart healthcare expansion | 2025-10-25 | pub-ap | news_article | narr-010 | sub-021, sub-022 | faction-001: 0.68, faction-004: 0.52 |

### November 2025
| ID | Title | Date | Publisher | Type | Narratives | Themes | Factions |
|----|-------|------|-----------|------|------------|--------|----------|
| doc-038 | Black Friday online sales surge overwhelms Walmart delivery | 2025-11-29 | pub-wsj | news_article | narr-011 | sub-023 | faction-001: -0.72, faction-005: -0.65, faction-006: 0.48 |
| doc-039 | Thousands of Walmart orders stuck in transit | 2025-11-30 | pub-x | social_post | narr-011 | sub-023 | faction-001: -0.82 |

### December 2025
| ID | Title | Date | Publisher | Type | Narratives | Themes | Factions |
|----|-------|------|-----------|------|------------|--------|----------|
| doc-040 | Walmart CEO apologizes for holiday delivery failures | 2025-12-05 | pub-reuters | news_article | narr-011 | sub-023, sub-024 | faction-001: -0.58, faction-005: -0.42 |
| doc-041 | Customer fury mounts as Walmart gifts arrive late | 2025-12-10 | pub-tiktok | social_post | narr-011 | sub-023 | faction-001: -0.85 |
| doc-042 | Consumer groups file FTC complaint over Walmart delivery | 2025-12-15 | pub-consumeraffairs | news_article | narr-011 | sub-024 | faction-001: 0.62, faction-004: 0.72 |
| doc-043 | How Walmart's delivery system failed during peak season | 2025-12-20 | pub-retaildive | news_article | narr-011 | sub-023, sub-024 | faction-005: -0.52, faction-006: 0.45 |
| doc-044 | Walmart announces $500M investment in delivery infrastructure | 2025-12-28 | pub-bloomberg | news_article | narr-011 | sub-024 | faction-001: 0.35, faction-005: 0.58 |

### January 2026 (early)
| ID | Title | Date | Publisher | Type | Narratives | Themes | Factions |
|----|-------|------|-----------|------|------------|--------|----------|
| doc-045 | Walmart delivery still struggling as new year begins | 2026-01-02 | pub-x | social_post | narr-011 | sub-023 | faction-001: -0.72 |
| doc-046 | Historic: Atlanta Walmart fulfillment center votes to unionize | 2026-01-10 | pub-reuters | news_article | narr-009 | sub-019 | faction-002: 0.85, faction-003: 0.88 |
| doc-047 | What the Atlanta union vote means for retail workers | 2026-01-12 | pub-wsj | news_article | narr-009 | sub-020 | faction-002: 0.72, faction-003: 0.78, faction-005: -0.35 |
| doc-048 | Walmart responds to union victory with new worker benefits | 2026-01-15 | pub-bloomberg | news_article | narr-009, narr-003 | sub-008, sub-019 | faction-002: 0.45, faction-003: 0.52 |

## New Themes (10)

| ID | Text | Parent Narrative | Sentiment |
|----|------|------------------|-----------|
| sub-017 | Great Value supplier labor and safety violations exposed | narr-008 | -0.68 |
| sub-018 | FTC investigates retail supply chain practices | narr-008 | -0.45 |
| sub-019 | Fulfillment center workers organize for union representation | narr-009 | 0.55 |
| sub-020 | Walmart responds to union organizing efforts | narr-009 | -0.42 |
| sub-021 | Walmart Health expands into underserved rural communities | narr-010 | 0.52 |
| sub-022 | Debate over corporate healthcare in rural America | narr-010 | 0.15 |
| sub-023 | Holiday season delivery system failures | narr-011 | -0.72 |
| sub-024 | Consumer backlash and regulatory scrutiny over delivery promises | narr-011 | -0.55 |

## New Topics (3)

| ID | Headline | Doc IDs | Start Date | End Date |
|----|----------|---------|------------|----------|
| topic-008 | FTC Investigates Walmart Supply Chain Practices | doc-024, doc-025, doc-026 | 2025-06-15 | null |
| topic-009 | Walmart Fulfillment Workers Push for Unionization | doc-027, doc-028, doc-032, doc-033, doc-034, doc-035, doc-046, doc-047, doc-048 | 2025-07-20 | null |
| topic-010 | Holiday Delivery Failures Damage Walmart Reputation | doc-038 through doc-045 | 2025-11-29 | null |

---

# CROSS-DATASET VERIFICATION CHECKLIST

## Structural Consistency
- [ ] Same entity types in all 3 datasets
- [ ] Same field names and types
- [ ] Same ID prefix conventions
- [ ] Same relationship patterns

## Per-Dataset Targets
| Dataset | Target Total | Estimated After Expansion |
|---------|-------------|---------------------------|
| American Politics | 250 | ~255 |
| China Semiconductor | 250 | ~255 |
| Walmart Brand | 250 | ~250 |

## Implementation Order
1. [ ] Locations (all 3 datasets)
2. [ ] Persons (all 3 datasets)
3. [ ] Organizations (all 3 datasets)
4. [ ] Events (all 3 datasets)
5. [ ] Narratives (all 3 datasets)
6. [ ] Themes (all 3 datasets)
7. [ ] Documents (all 3 datasets)
8. [ ] Topics (all 3 datasets)
9. [ ] Update bidirectional references

## Validation Checks
- [ ] All referenced IDs exist
- [ ] Bidirectional relationships complete
- [ ] No orphaned entities
- [ ] Date ranges valid (June 2025 - Jan 27, 2026)
- [ ] Faction sentiments in valid range (-1.0 to 1.0)

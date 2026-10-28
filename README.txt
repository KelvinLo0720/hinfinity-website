H Infinity Cohort 02 — Deadline Extension Update

CONFIRMED NEW DEADLINE
14 Nov 2026 (Saturday)

PUBLIC REASON
Potential applicants asked for more time to:
- develop / clarify their idea
- prepare their application / proposal direction
- form a team

IMPORTANT POSITIONING
H Infinity still does NOT require a complete or perfect proposal at application stage.
The added copy is written to preserve this message.

REPLACE THESE FILES
1. lib/application-form-config.ts
2. app/apply/page.tsx
3. app/page.tsx

PATCH THIS FILE
4. components/programme-snapshot.tsx
   Follow components/PROGRAMME-SNAPSHOT-PATCH.txt

REPOSITORY SEARCH COMPLETED
The old deadline "31 Oct 2026" was found in:
- lib/application-form-config.ts
- app/page.tsx
- components/programme-snapshot.tsx

The Apply page uses applicationConfig.applicationClose, so updating the config changes its displayed period.

AFTER DEPLOY — CHECK
- Homepage: Applications close = 14 Nov 2026
- Homepage extension explanation is visible
- /apply: application period = 1 Sep 2026 – 14 Nov 2026
- /apply: extension notice is visible
- Programme Snapshot: Applications close = 14 Nov 2026

Then search the repository / live site for:
31 Oct 2026

There should be no remaining public occurrence.

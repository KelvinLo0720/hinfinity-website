# H Infinity Application Fix V3

This supersedes V2.

## Confirmed design changes

### Interview Time Preference
It is now a **dedicated required step immediately before Final Review**.

Flow:

1. Application Type
2. About You / Your Team
3. CV
4. Your View
5. Your Idea
6. Why H Infinity
7. **Interview Availability — required**
8. Final Review & Submit

Options:
- Weekday Daytime
- Weekday Evening
- Weekend Daytime
- Weekend Evening
- Flexible

Applicants may choose multiple options.
`Flexible` is mutually exclusive with the other options.

For team applications, one shared preference is collected for the whole team.

### Notion property is mandatory
Before deploying this patch, add this property to the existing **Applications** database:

**Interview Time Preference**
Type: **Multi-select**

Options:
- Weekday Daytime
- Weekday Evening
- Weekend Daytime
- Weekend Evening
- Flexible

The final submission will fail deliberately if this property is missing or has the wrong type, because the interview preference is required operational data and must remain filterable in Notion.

The selected values are also written into the application page body for human-readable context.

## Existing fixes retained

- Exact field-level validation
- Invalid field red border + inline message
- Scroll to first invalid field
- International phone validation (8–15 digits)
- Team CV files uploaded one by one
- Final application submit is small JSON
- Plain-text / 413 responses are handled cleanly
- One team submission = one Applications record

## Notion operating model for applicant / participant notes

Do NOT split a team application into multiple Applications records.

Use the existing Applications record as the **recruitment / selection profile**:
- Status
- Interview Time Preference
- Reviewer / interview fields already in the database
- Interview summary / internal notes in the page body
- selection and follow-up notes

For long-term programme delivery after acceptance:
- keep Applications as the historical application source of truth;
- use the existing **People & Network** database for individual accepted participants when individual-level tracking is needed;
- use **Projects** for group / project progress;
- use Tasks / Notes / Documents for operational follow-up where appropriate.

This avoids turning Applications into the permanent delivery database while still preserving interview and selection context.

## Files

Replace:
- `lib/application-options.ts`
- `lib/application-submit-schema.ts`
- `app/api/application/submit/route.ts`
- `app/apply/[token]/page.tsx`
- `components/application-wizard-v2.tsx`

Add if not already present:
- `app/api/application/upload-cv/route.ts`

## Commit

`Move interview preference before review and require Notion classification`

## Test

1. Confirm Notion property exists and is Multi-select.
2. Vercel Preview = Ready.
3. Step 02 invalid email / phone shows exact inline error.
4. Interview Availability appears as Step 07 before Final Review.
5. Try continuing without a preference → blocked with inline error.
6. Team + 2 PDFs submit.
7. Success ref = `HI-2026-XXXXXX`.
8. ONE Notion Applications record.
9. `Interview Time Preference` property populated.
10. Both CVs attached.

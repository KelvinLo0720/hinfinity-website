# H Infinity Application → Notion Integration V2

## Confirmed Notion targets

Applications Database ID:
`ce523f31-8cdd-46e8-8289-7825e23dc8f3`

H Infinity Cohort 02 Page ID:
`56d8c7d6-1733-49a1-a996-6d453c5c6cd8`

Title property:
`Applicant Name`

Status:
`Status` (Select)

Cohort relation:
`Cohort`

## Architecture

Website form
→ browser localStorage draft
→ final multipart submit
→ Next.js server API
→ Notion Applications database

One individual/team submission = one Applications record.

Team lead becomes Primary Contact; all member details are also written into the page body.

## Vercel Environment Variables

Required:

```env
NOTION_API_KEY=ntn_...
NOTION_APPLICATIONS_DATABASE_ID=ce523f31-8cdd-46e8-8289-7825e23dc8f3
NOTION_COHORT02_PAGE_ID=56d8c7d6-1733-49a1-a996-6d453c5c6cd8
APPLICATION_TEST_MODE=true
NEXT_PUBLIC_APPLICATION_TEST_MODE=true
```

Optional only if the Applications database ever contains multiple data sources:

```env
NOTION_APPLICATIONS_DATA_SOURCE_ID=...
```

V2 automatically calls `GET /v1/databases/{database_id}` and resolves the Applications data source ID, so you do not need to find the raw data source ID for the current single-data-source setup.

Never expose `NOTION_API_KEY` with a `NEXT_PUBLIC_` prefix.

## Important Notion Connection access

The `H Infinity Website Applications` internal connection should be connected to:

1. `Applications` — needed to create application records and attach CVs.
2. `H Infinity Cohorts` — needed so the API can see and write the `Cohort` relation to the Cohort 02 page.

Do not grant Finance access.

## Test Mode

While both test variables are `true`:

- CV can be omitted.
- A real Notion record is still created.
- `Status = Test Submission`.
- Server errors are shown in more detail to help debugging.

Before public recruitment launch, set both variables to `false`.

Production behavior:

- one PDF CV is required per applicant;
- `Status = Submitted`;
- public users receive a generic server error rather than internal Notion diagnostics.

## CV handling

- PDF only
- max 4 MB per applicant in this implementation
- server validates extension, MIME type and `%PDF-` file header
- uploaded through Notion File Upload API
- attached to `CV Files` in the same final-submit request

## Required Notion website properties

- Applicant Name — Title
- Application Reference — Rich text
- Application Type — Select
- Team Size — Number
- Submitted At — Date
- Status — Select
- Primary Contact — Chinese Name — Rich text
- Primary Contact — English Name — Rich text
- Primary Contact — Email — Email
- Primary Contact — Phone — Phone
- Primary Contact — Institution — Rich text
- Primary Contact — Programme — Rich text
- Primary Contact — Year — Rich text
- Q1 — Rich text
- Q2 — Rich text
- Q3 — Rich text
- Q4 — Rich text
- Q5 — Rich text
- Additional Note — Rich text
- CV Files — Files
- Privacy Consent — Checkbox
- Source — Select
- Cohort — Relation

## Files in this patch

- `components/application-wizard.tsx`
- `lib/application-form-config.ts`
- `lib/application-submit-schema.ts`
- `lib/notion-applications.ts`
- `app/api/application/submit/route.ts`
- `app/apply/[token]/page.tsx`
- `README-NOTION-INTEGRATION.md`

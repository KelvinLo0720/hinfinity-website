# H Infinity Website Demo

A full Next.js demo for **Hong Kong Culture Limited / H Infinity**, based on the selected **Styleframe C — Youth Energy Lab × Creative Agency × Living Cultural Archive** direction.

The demo includes:

- Public brand website and homepage motion
- About, programme, first cohort, projects, stories, people, partners and support pages
- Project case-study pages
- Passwordless application start flow
- Multi-step application form with local auto-save
- Supabase-ready application Draft / Submit API routes
- Resend-ready resume link email
- Static internal dashboard demo
- Supabase SQL migration
- Optional Notion content adapter for public portfolio content
- Responsive mobile layout and reduced-motion support

## Important demo notes

- Portfolio project names and detailed case-study copy are **demo placeholders** and must be replaced with verified first-cohort information.
- The activity images were cropped from the H Infinity social media plan supplied for this project. Confirm image rights and participant consent before public launch.
- Public applicant counts in the Admin page are static demo figures, not real records.
- The privacy page is a product/content scaffold, not legal advice.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

With blank Supabase credentials, the application flow uses **Demo Mode**:

- Enter an email on `/apply`
- A local resume token is created
- Draft answers auto-save to the browser
- Demo submission returns a reference number

## Deploy to GitHub and Vercel

1. Create a new private GitHub repository.
2. Upload all files in this folder.
3. Import the repository into Vercel.
4. Add the environment variables from `.env.example`.
5. Deploy. Vercel will provide a temporary `*.vercel.app` URL before you purchase a domain.
6. When your domain is ready, add it under **Vercel → Project → Settings → Domains**.

## Supabase setup

1. Create a Supabase project.
2. Open the SQL Editor.
3. Run `supabase/migrations/001_initial_schema.sql`.
4. Copy the Project URL, anon key and service-role key into Vercel environment variables.
5. Keep `SUPABASE_SERVICE_ROLE_KEY` server-only. Never prefix it with `NEXT_PUBLIC_`.
6. Update the seeded cohort dates and title before public recruitment.

Required variables:

```env
NEXT_PUBLIC_SITE_URL=https://your-vercel-url.vercel.app
NEXT_PUBLIC_DEMO_MODE=false
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## Resend setup

After domain verification, add:

```env
RESEND_API_KEY=...
EMAIL_FROM=H Infinity <apply@yourdomain.hk>
```

Until the domain is ready, keep `NEXT_PUBLIC_DEMO_MODE=true`; the start API returns a direct resume URL rather than relying on email delivery.

## Notion integration strategy

The repository includes `lib/content/notion.ts` as an optional server-side adapter.

Recommended division of responsibility:

### Suitable for Notion

- Public project case studies
- Stories and editorial drafts
- Mentor and partner profiles
- Content calendar
- Internal project notes that do not contain sensitive applicant data

### Keep in Supabase/Postgres

- Applicant personal data
- Draft answers and uploaded files
- Consent records
- Review scores and internal comments
- Interview decisions
- Participant and alumni master records
- Role and permission data

Notion can later receive a **minimal operational sync** such as applicant reference number, stage and assigned reviewer, but it should not become the primary personal-data database.

To enable Notion content later:

```env
CONTENT_SOURCE=notion
NOTION_TOKEN=...
NOTION_PROJECTS_DATA_SOURCE_ID=...
NOTION_STORIES_DATA_SOURCE_ID=...
```

The mapping from Notion properties to the local `Project` and `Story` types still needs to be completed after the final Notion schema is agreed.

## Main routes

- `/` Homepage
- `/about`
- `/h-infinity`
- `/first-chapter`
- `/projects`
- `/projects/[slug]`
- `/stories`
- `/people`
- `/partners`
- `/support`
- `/contact`
- `/apply`
- `/admin` static dashboard demo

## Production work still required

- Replace demo case studies and quotes with verified content
- Confirm accurate cohort metrics
- Obtain logo SVG/AI and rebuild the animated mark accurately
- Confirm all image, video and participant permissions
- Add admin authentication and role-based access
- Add reviewer workspace and interview scheduling
- Implement private file upload and malware/type/size validation
- Build consent versioning and data-retention jobs
- Add audit logs and backup/recovery tests
- Complete bilingual content if required
- Legal review of privacy notices and application declarations
- Accessibility and browser QA
- Analytics consent decision

## Technology

- Next.js App Router
- React
- Motion for React
- Supabase/Postgres and Storage
- Resend
- Optional Notion Data Source API
- Vercel hosting

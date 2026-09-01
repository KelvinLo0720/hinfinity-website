# H Infinity Final Audit Fixes

Apply these files to `feat/launch-ready` before opening/merging the launch PR.

Fixes:
1. Restore missing `/about` route.
2. Remove homepage-only canonical and og:url from global metadata.
3. Prevent generated `/apply/<token>` pages from being indexed.
4. Add explicit `noindex` metadata to application token/submission pages.
5. Add two current local post-secondary institutions missing from the strict institution allow-list:
   - Caritas Institute of Community Education
   - Hong Kong Adventist College

Commit message:
`Fix final launch audit issues`

After commit:
- Wait for Vercel Preview = Ready.
- Test `/about`.
- Test `/sitemap.xml` and click/check `/about`.
- Test `/apply`.
- Confirm generated `/apply/<token>` still works.
- Re-test one institution selection (no need for another full Notion submission unless desired).

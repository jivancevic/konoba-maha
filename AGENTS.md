<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

Every change follows `~/.agents/STANDARDS.md` (unit of work, branches, PR body, gates, `/ship`). This file keeps only this repo's facts.

## How work ships

- **Base branch:** `main`. **A merge to `main` deploys** to production through the Vercel Git integration (project `jivancevics-projects/konoba-maha`, served at https://konobamaha.com). Every other branch push gets a Vercel preview URL. Never run `vercel --prod` by hand.
- **Required checks:** `Vercel` (the status the Vercel integration reports on each pushed commit, as `gh pr checks` shows it) and `ship-review`. No GitHub Actions in this repo; `npm run build` and `npm run lint` run locally, with the evidence in the PR body.
- **Post-merge check:** the Vercel production deployment for the merge commit is `Ready` (`vercel ls konoba-maha`), and https://konobamaha.com/hr and https://konobamaha.com/en answer 200.
- **Rollback:** `vercel rollback` (restores the previous production deployment), then a revert PR. Runbook: `docs/deploy.md`.
- **UI paths:** `src/app/**`, `src/components/**`, `src/lib/translations.ts`, `src/lib/menuData.ts`, `src/lib/prices.ts`, `src/app/globals.css`, `public/**`
- **Visual pages:** `/hr`, `/en`, `/hr/menu`, `/hr/cjenik`

# Valnea gets its own repository, not a section of the Konoba Maha site

**Context:** Valnea ("Weddings and More Korčula") is a wedding- and event-planning brand run by the Konoba Maha owner's wife. It is family-connected to the restaurant but intends to expand to other ventures and venues beyond Konoba Maha.

**Decision:** Valnea lives in a **separate git repository** with its own brand identity (logo, palette, typography), scaffolded fresh from the same stack (Next.js App Router + Tailwind v4 + Framer Motion) and reusing the Konoba Maha HR/EN i18n routing pattern as boilerplate — not as shared code. The Konoba Maha site refers visitors to Valnea from its existing `Weddings` section.

**Why:** An independent, growing business should not have its code coupled to a restaurant marketing site. Sharing a design system is an anti-goal — Valnea must look distinct. Repo structure and domain/hosting are treated as independent decisions: Valnea can deploy to `weddings.konobamaha.com` initially and swap to its own domain later via DNS with zero code migration.

**Rejected:** Building Valnea inside the konoba-maha repo as a route section — faster v1 but creates extraction debt payable exactly when Valnea is busiest.

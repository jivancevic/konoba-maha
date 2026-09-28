# Konoba Maha funnels weddings to Valnea: keep the section, repoint the redirect URLs

**Context:** Valnea (see [ADR-0001](0001-valnea-separate-repo.md)) becomes the wedding/event *planner*; Konoba Maha remains a wedding *venue*. The KM homepage already has a `Weddings` section, and `/en/weddings` + `/hr/vjencanja` currently 301 to brochure PDFs that hold legacy WordPress SEO authority.

**Decision:**
- **Keep** the on-page `Weddings` section (`src/components/Weddings.tsx`) — KM retains its venue identity and venue SEO — and **add a CTA to the Valnea site**. The existing brochure-download button stays.
- **Repoint** the standalone `/en/weddings` and `/hr/vjencanja` redirects from the brochure PDFs to the live Valnea site, transferring their search authority to the planner brand.

**Hard dependency:** the redirect repointing is **gated on Valnea being deployed at a stable URL**. Until then the PDF redirects remain — never 301 indexed URLs to a 404.

**Why:** Preserves KM's venue search visibility while channeling wedding *planning* intent to Valnea, without losing the brochure (still reachable via the section's own button).

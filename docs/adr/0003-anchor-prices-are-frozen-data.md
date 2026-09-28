---
status: accepted
---

# Anchor prices are frozen data, never derived from current prices

**Context:** Odluka NN 101/2026 (in force 1 Oct 2026) requires every price shown on the site to be accompanied by the *anchor price* — the amount charged on 10 Sep 2026. On the day this was implemented every anchor price equalled the current price, so `anchor = current` would have been a one-liner.

**Decision:** Every `Price` in `src/lib/prices.ts` stores `anchor` as a literal amount, required by the type, entered once and never touched again. Nothing in the codebase computes an anchor from a current amount, and a build-time check fails if a Price is missing either amount. The Menu and the machine-readable Price List both read from this one record.

**Why:** The moment a current price changes, a derived anchor would silently follow it and the site would publish a false anchor price — an offence (1,000–20,000 € for a sole trader, plus possible temporary closure) that no visual check would catch, because the two numbers would still look plausible together. Duplicating the number today costs a few minutes; a derived anchor would cost the owner the first time a price moves.

**Consequences:** Adding a new item requires deciding its anchor explicitly (for items introduced after 10 Sep 2026 the law says: the price at first listing). Changing a price never touches `anchor`. `anchor` is not a "previous price" and must not be repurposed for promotions.

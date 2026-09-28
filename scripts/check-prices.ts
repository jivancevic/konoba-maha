/**
 * Build-time parity check between `src/lib/prices.ts`, the Menu and the published
 * Price List. Runs as `prebuild`, so a forgotten `npm run cjenik` cannot ship.
 *
 *   npm run check:prices
 *
 * Two guarantees are already TypeScript's and are deliberately not re-checked here:
 * a menu item referencing an unknown id, and a Price missing its `anchor`.
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { MenuTabData } from '../src/types/index.ts';
import { prices } from '../src/lib/prices.ts';
import { menuPageData } from '../src/lib/menuData.ts';
import { generateCsv, type CjenikManifestEntry } from '../src/lib/cjenik.ts';

const CJENIK_DIR = join(process.cwd(), 'public', 'cjenik');
const MANIFEST_PATH = join(CJENIK_DIR, 'manifest.json');

const problems: string[] = [];

/** Every Price id one language block of the Menu points at. */
function referencedIds(block: MenuTabData): Set<string> {
  const ids = new Set<string>();
  for (const sec of block.food.sections) {
    for (const item of sec.items) ids.add(item.priceId);
  }
  for (const sec of block.wine.sections) {
    for (const item of sec.items) {
      if (item.glassId) ids.add(item.glassId);
      ids.add(item.bottleId);
    }
  }
  for (const p of [block.tasting.price1, block.tasting.price2, block.group.price1, block.group.price2]) {
    ids.add(p.priceId);
  }
  return ids;
}

const en = referencedIds(menuPageData.en);
const hr = referencedIds(menuPageData.hr);

/* 1. Orphan amounts — a Price nothing on the menu shows. */
for (const id of Object.keys(prices)) {
  if (!en.has(id) && !hr.has(id)) {
    problems.push(
      `Orphan Price "${id}" — it is in prices.ts but no menu item references it. Reference it from menuData.ts or delete the entry.`,
    );
  }
}

/* 2. Language divergence — the two blocks must price the same things. */
for (const id of en) {
  if (!hr.has(id)) problems.push(`Price "${id}" is referenced by the EN menu block but not the HR one — add the matching item to menuData.hr.`);
}
for (const id of hr) {
  if (!en.has(id)) problems.push(`Price "${id}" is referenced by the HR menu block but not the EN one — add the matching item to menuData.en.`);
}

/* 3. Amounts must be real money. */
for (const [id, price] of Object.entries(prices)) {
  for (const field of ['current', 'anchor'] as const) {
    const amount = price[field];
    if (!Number.isFinite(amount) || amount < 0) {
      problems.push(`Price "${id}" has an invalid ${field} amount (${String(amount)}) — it must be a finite number of EUR, 0 or more.`);
    }
  }
}

/* 4. The published Price List must still match the amounts. */
const manifest: CjenikManifestEntry[] = existsSync(MANIFEST_PATH)
  ? (JSON.parse(readFileSync(MANIFEST_PATH, 'utf8')) as CjenikManifestEntry[])
  : [];
const latest = manifest.at(-1);

if (!latest) {
  problems.push('No Price List has been published yet — run `npm run cjenik` and commit public/cjenik/.');
} else if (!existsSync(join(CJENIK_DIR, latest.file))) {
  problems.push(`manifest.json names "${latest.file}" but that file is missing from public/cjenik/ — restore it, or run \`npm run cjenik\`.`);
} else if (readFileSync(join(CJENIK_DIR, latest.file), 'utf8') !== generateCsv()) {
  problems.push(
    `Prices have changed since the last published Price List ("${latest.file}"). Run \`npm run cjenik\` and commit the new CSV together with public/cjenik/manifest.json.`,
  );
}

if (problems.length > 0) {
  console.error(`\ncheck-prices: ${problems.length} problem(s) found\n`);
  for (const problem of problems) console.error(`  ✗ ${problem}`);
  console.error('');
  process.exit(1);
}

console.log(`check-prices: ok — ${Object.keys(prices).length} Prices, Price List ${latest?.file ?? '(none)'} is current`);

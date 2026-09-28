/**
 * Publishes a new version of the machine-readable Price List.
 *
 *   npm run cjenik
 *
 * Writes `public/cjenik/<filename>.csv` and appends an entry to
 * `public/cjenik/manifest.json`. Never deletes anything — the owner removes files
 * older than 30 days by hand (see docs/cjenik-postupak.md). Idempotent: if the CSV
 * body is identical to the latest published file, nothing is written.
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  CJENIK_DIR,
  MANIFEST_PATH,
  generateCsv,
  latestManifestEntry,
  readManifest,
} from '../src/lib/cjenik.ts';

/** Prescribed pattern: <vrsta objekta>_<adresa>_<oznaka objekta>_<broj pohrane>_<datum i vrijeme> */
const VENUE_KIND = 'konoba';
const ADDRESS = 'Vrsi bb 20275 Žrnovo';
const PREMISES = '1';

/** Generation time in Europe/Zagreb. `.` instead of `:` in the time — `:` is not a legal filename character everywhere. */
function timestampParts(now: Date): { date: string; time: string } {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Zagreb',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return {
    date: `${get('day')}.${get('month')}.${get('year')}`,
    time: `${get('hour')}.${get('minute')}`,
  };
}

function buildFilename(sequence: number, now: Date): string {
  const { date, time } = timestampParts(now);
  const seq = String(sequence).padStart(3, '0');
  return `${VENUE_KIND}_${ADDRESS}_${PREMISES}_${seq}_${date}_${time}.csv`;
}

const csv = generateCsv();
const manifest = readManifest();
const latest = latestManifestEntry(manifest);

if (latest && existsSync(join(CJENIK_DIR, latest.file))) {
  const published = readFileSync(join(CJENIK_DIR, latest.file), 'utf8');
  if (published === csv) {
    console.log(`unchanged — ${latest.file} is already up to date, nothing written`);
    process.exit(0);
  }
}

const now = new Date();
// Never reuse a sequence number, even after the owner prunes old entries.
const sequence = (latest?.sequence ?? 0) + 1;
const file = buildFilename(sequence, now);

mkdirSync(CJENIK_DIR, { recursive: true });
writeFileSync(join(CJENIK_DIR, file), csv, 'utf8');

manifest.push({ file, publishedAt: now.toISOString(), sequence });
writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

console.log(`written public/cjenik/${file}`);
console.log(`manifest now holds ${manifest.length} version(s) — commit both files`);

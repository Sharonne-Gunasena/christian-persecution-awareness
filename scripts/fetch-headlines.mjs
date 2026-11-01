// Reads the enabled feeds in scripts/feeds.json and writes public/data/headlines.json.
// Runs in GitHub Actions before every build (see .github/workflows/deploy.yml) and can be
// run locally with `npm run headlines`. If every feed fails, the existing file is kept.
import { readFile, writeFile } from 'node:fs/promises';
import { isRelevant, mergeHeadlines, parseFeed } from './headlines-lib.mjs';

const OUT = new URL('../public/data/headlines.json', import.meta.url);
const { feeds } = JSON.parse(await readFile(new URL('./feeds.json', import.meta.url), 'utf8'));

const groups = [];
// Only sources we actually read a feed from get a "feed terms" link; others come from curation.json.
const termsUrls = new Map(feeds.filter((f) => f.enabled).map((f) => [f.source, f.termsUrl]));

for (const feed of feeds.filter((f) => f.enabled)) {
  try {
    const res = await fetch(feed.url, {
      headers: { 'User-Agent': 'christian-persecution-awareness headline fetcher (GitHub Pages, non-commercial)' },
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const items = parseFeed(await res.text()).filter((i) => !feed.filter || isRelevant(i.title));
    groups.push({ source: feed.source, items });
    console.log(`${feed.source} (${feed.url}): ${items.length} relevant`);
  } catch (err) {
    console.warn(`Skipped ${feed.url}: ${err.message}`);
  }
}

if (groups.length === 0) {
  console.warn('No feeds could be read; keeping the existing headlines.json.');
  process.exit(0);
}

// Keep earlier headlines that are still recent, so quiet news days don't empty the page.
let previous = [];
try {
  previous = JSON.parse(await readFile(OUT, 'utf8')).items ?? [];
} catch {
  // First run.
}
const previousGroups = Object.entries(Object.groupBy(previous, (i) => i.source)).map(([source, items]) => ({
  source,
  items,
}));

const curation = JSON.parse(await readFile(new URL('./curation.json', import.meta.url), 'utf8'));
const excluded = new Set(curation.exclude.map((link) => link.split('?')[0]));
const manual = Object.entries(Object.groupBy(curation.add, (i) => i.source)).map(([source, items]) => ({
  source,
  items: items.map((i) => ({ title: i.title, link: i.link, date: new Date(i.date).toISOString() })),
}));

const items = mergeHeadlines([...manual, ...groups, ...previousGroups]).filter(
  (i) => !excluded.has(i.link.split('?')[0]),
);
const output = {
  updated: new Date().toISOString(),
  sources: [...new Set(items.map((i) => i.source))].map((name) => ({ name, termsUrl: termsUrls.get(name) })),
  items,
};
await writeFile(OUT, JSON.stringify(output, null, 2) + '\n');
console.log(`Wrote ${items.length} headlines.`);

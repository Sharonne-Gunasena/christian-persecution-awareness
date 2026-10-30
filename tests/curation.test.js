// Guards scripts/curation.json, which the daily search agent edits and publishes without a
// human review. If any of these fail, the agent must not push.
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

const curation = JSON.parse(readFileSync(new URL('../scripts/curation.json', import.meta.url), 'utf8'));

// Publishers whose terms forbid showing their content or links (see README).
const BLOCKED_HOSTS = ['vaticannews.va', 'vatican.va', 'catholicnewsagency.com', 'theguardian.com'];

describe('curation.json', () => {
  it('has the expected shape', () => {
    expect(Array.isArray(curation.exclude)).toBe(true);
    expect(Array.isArray(curation.add)).toBe(true);
  });

  it.each(curation.add.map((item, i) => [i, item]))('add[%i] is a valid headline entry', (_, item) => {
    expect(Object.keys(item).sort()).toEqual(expect.arrayContaining(['date', 'link', 'source', 'title']));

    expect(typeof item.title).toBe('string');
    expect(item.title.length).toBeGreaterThanOrEqual(10);
    expect(item.title.length).toBeLessThanOrEqual(200);
    expect(item.title).not.toMatch(/[\n<>]/);

    expect(typeof item.source).toBe('string');
    expect(item.source.trim().length).toBeGreaterThan(1);

    expect(item.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    const date = new Date(`${item.date}T00:00:00Z`);
    expect(Number.isNaN(date.getTime())).toBe(false);
    expect(date.getTime()).toBeLessThanOrEqual(Date.now() + 86_400_000);

    const url = new URL(item.link);
    expect(url.protocol).toBe('https:');
    expect(BLOCKED_HOSTS.some((h) => url.hostname === h || url.hostname.endsWith(`.${h}`))).toBe(false);
  });

  it('has no duplicate links or excluded links in add', () => {
    const strip = (l) => l.split('?')[0].replace(/\/$/, '');
    const links = curation.add.map((i) => strip(i.link));
    expect(new Set(links).size).toBe(links.length);
    const excluded = new Set(curation.exclude.map(strip));
    expect(links.filter((l) => excluded.has(l))).toEqual([]);
  });
});

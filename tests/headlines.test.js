import { describe, expect, it } from 'vitest';
import { isRelevant, mergeHeadlines, parseFeed } from '../scripts/headlines-lib.mjs';
import { sources } from '../src/data/statistics.js';
import { charities } from '../src/data/charities.js';

describe('isRelevant', () => {
  it('keeps stories about Christians being harmed', () => {
    expect(isRelevant('Gunmen kill 20 worshippers in church attack')).toBe(true);
    expect(isRelevant('Pastor arrested over blasphemy claim')).toBe(true);
  });

  it('drops general church news and unrelated violence', () => {
    expect(isRelevant('Church of England synod votes on new rules')).toBe(false);
    expect(isRelevant('Flooding kills dozens after heavy rain')).toBe(false);
    expect(isRelevant('Killed almost 430 years ago, 5 Catholic friars will soon be one step from sainthood')).toBe(false);
  });
});

describe('parseFeed', () => {
  it('reads RSS items and keeps only title, link and date', () => {
    const xml = `<rss><channel><item><title><![CDATA[Church &amp; school attacked]]></title>
      <link>https://example.org/a?at_medium=RSS</link><description>Long text</description>
      <pubDate>Wed, 29 Oct 2026 10:00:00 GMT</pubDate></item></channel></rss>`;
    expect(parseFeed(xml)).toEqual([
      { title: 'Church & school attacked', link: 'https://example.org/a?at_medium=RSS', date: '2026-10-29T10:00:00.000Z' },
    ]);
  });

  it('reads Atom entries', () => {
    const xml = `<feed><entry><title>Priest kidnapped</title><link rel="alternate" href="https://example.org/b"/>
      <updated>2026-10-28T08:00:00Z</updated></entry></feed>`;
    expect(parseFeed(xml)[0]).toMatchObject({ title: 'Priest kidnapped', link: 'https://example.org/b' });
  });
});

describe('mergeHeadlines', () => {
  const now = new Date('2026-10-30T00:00:00Z');
  it('dedupes, drops old items and sorts newest first', () => {
    const a = { title: 'A', link: 'https://x/a?x=1', date: '2026-10-20T00:00:00Z' };
    const b = { title: 'B', link: 'https://x/b', date: '2026-10-29T00:00:00Z' };
    const old = { title: 'Old', link: 'https://x/old', date: '2026-01-01T00:00:00Z' };
    const dup = { title: 'A', link: 'https://x/a?x=2', date: '2026-10-20T00:00:00Z' };
    const out = mergeHeadlines([{ source: 'S', items: [a, b, old, dup] }], { now });
    expect(out.map((i) => i.title)).toEqual(['B', 'A']);
  });
});

describe('content data', () => {
  it('gives every statistic a source link, period and method note', () => {
    for (const s of sources) {
      expect(s.url).toMatch(/^https:\/\//);
      expect(s.period).toBeTruthy();
      expect(s.method).toBeTruthy();
      for (const f of s.figures) expect(f.note).toBeTruthy();
    }
  });

  it('gives every charity an official https link and description', () => {
    for (const c of charities) {
      expect(c.url).toMatch(/^https:\/\//);
      expect(c.description).toBeTruthy();
    }
  });
});

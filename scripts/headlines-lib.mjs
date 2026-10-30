// Pure helpers for fetch-headlines.mjs, kept separate so they can be unit tested.
import { XMLParser } from 'fast-xml-parser';

// A story is kept only if it mentions Christians AND some form of harm. Both lists are
// deliberately specific so general church news (synods, appointments) is left out.
const CHRISTIAN = /\b(christians?|church(es)?|catholics?|priests?|pastors?|nuns?|parish(ioners)?|clergy|bishops?|worshippers?|congregations?|evangelicals?|coptic|copts?|orthodox|protestants?)\b/i;
const HARM = /\b(kill(ed|ing|ings)?|attack(s|ed)?|persecut\w*|abduct\w*|kidnap\w*|massacre\w*|arrest(s|ed)?|detain(ed)?|bomb(s|ed|ing)?|shot|shooting|murder(s|ed)?|violence|blasphemy|burn(ed|t)?|torched|raid(s|ed)?|jailed|imprison\w*|displaced|gunmen|militants?|executed|martyr\w*)\b/i;

export function isRelevant(title) {
  return CHRISTIAN.test(title) && HARM.test(title);
}

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });

function text(value) {
  if (value == null) return '';
  if (typeof value === 'object') return String(value['#text'] ?? '');
  return String(value);
}

function decode(s) {
  return s
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1')
    .replace(/<[^>]*>/g, '')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#039;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

// Parses RSS 2.0 or Atom into { title, link, date } items. Only the headline and link are
// kept: article text and summaries are never stored.
export function parseFeed(xml) {
  const doc = parser.parse(xml);
  const rssItems = doc?.rss?.channel?.item;
  const atomItems = doc?.feed?.entry;
  const items = [].concat(rssItems ?? atomItems ?? []);
  return items
    .map((item) => {
      let link = item.link;
      if (Array.isArray(link)) link = link.find((l) => !l.rel || l.rel === 'alternate') ?? link[0];
      if (typeof link === 'object') link = link.href ?? text(link);
      const date = new Date(text(item.pubDate ?? item.published ?? item.updated ?? item['dc:date']));
      return {
        title: decode(text(item.title)),
        link: String(link ?? '').trim(),
        date: Number.isNaN(date.getTime()) ? null : date.toISOString(),
      };
    })
    .filter((i) => i.title && /^https:\/\//.test(i.link));
}

// Merges items from all feeds: removes duplicates (same link or same headline), drops
// anything older than maxAgeDays, and sorts newest first.
export function mergeHeadlines(groups, { now = new Date(), maxAgeDays = 60, limit = 40 } = {}) {
  const cutoff = now.getTime() - maxAgeDays * 86_400_000;
  const seenLinks = new Set();
  const seenTitles = new Set();
  const out = [];
  for (const { source, items } of groups) {
    for (const item of items) {
      if (!item.date || new Date(item.date).getTime() < cutoff) continue;
      const key = item.title.toLowerCase();
      const link = item.link.split('?')[0];
      if (seenLinks.has(link) || seenTitles.has(key)) continue;
      seenLinks.add(link);
      seenTitles.add(key);
      out.push({ ...item, source });
    }
  }
  return out.sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}

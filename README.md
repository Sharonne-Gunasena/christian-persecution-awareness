# Persecuted for Faith
https://sharonne-gunasena.github.io/christian-persecution-awareness/

An awareness site about the persecution and killing of Christians around the world. It has four pages:

- **Home**: an introduction, two key figures, and how the site uses words like "persecution" and "genocide".
- **Headlines**: recent news headlines, each linking to the original article.
- **Statistics**: figures from Open Doors, Aid to the Church in Need, Pew Research Center and USCIRF, each with its source, period and method.
- **Charities**: organisations that support persecuted Christians. The site links out and never takes donations.

Built with Vite, React and Tailwind, and deployed to GitHub Pages by GitHub Actions.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # checks the headline filter and that every figure/charity has a source
npm run build      # production build in dist/
npm run headlines  # refresh public/data/headlines.json from the feeds
```

## How the headlines stay current

GitHub Pages can only serve static files, so headlines are fetched at build time:

1. `.github/workflows/deploy.yml` runs on every push to `main`, **every 6 hours** on a schedule, and on demand from the Actions tab ("Run workflow").
2. It runs `scripts/fetch-headlines.mjs`, which reads each **enabled** feed in `scripts/feeds.json`.
3. Feeds marked `"filter": true` are general news feeds, so only headlines that mention Christians (church, pastor, priest…) **and** some form of harm (killed, attacked, abducted, arrested…) are kept.
4. Only the headline, source name, date and link are stored. Article text and summaries are never stored.
5. Results are merged with the existing `public/data/headlines.json`, de-duplicated, limited to the last 60 days and the newest 40, and written back.
6. The workflow commits the updated JSON to the repo (feeds only hold a day or two of stories, so this keeps the history), then builds and deploys the site. If every feed fails, the existing file is kept.

The Headlines page loads `data/headlines.json` when it opens.

> GitHub turns off scheduled workflows in public repos after 60 days without any activity. The workflow's own headline commits count as activity, but if updates stop, re-enable the workflow from the Actions tab.

### Fixing a wrong match, or adding a headline by hand

Edit `scripts/curation.json`:

- `exclude`: links the keyword filter picked up that aren't about faith-based persecution (e.g. a political arrest that happens to involve a bishop's family).
- `add`: headlines you've checked yourself, as `{ "title", "source", "date": "YYYY-MM-DD", "link" }`. Use the outlet's headline exactly, never article text.

Then run `npm run headlines` (or push and let the workflow do it).

### Daily search agent

Feeds only cover outlets whose terms allow automatic use. To find reporting from other reputable outlets, a scheduled Claude cloud agent ("routine") runs **every day at 8am Dublin time**:

1. It searches the web for reporting from the last few days on Christians killed, attacked, abducted, detained or otherwise persecuted for their faith.
2. It keeps only stories from established news organisations, specialist religious-freedom outlets or the charities listed on the site, where the article itself reports faith as a motive or context. It opens each link to check that it works and that the headline and date match.
3. It adds each one to `add` in `scripts/curation.json` (headline exactly as published, source, date, link), skipping duplicates and blocked publishers, and removes entries older than 60 days.
4. It runs `npm test`. `tests/curation.test.js` checks every entry, so a malformed entry stops the update. If the tests pass, it commits to `main` and the deploy workflow publishes the site.
5. If a **new edition** of the Open Doors, ACN, Pew or USCIRF report is out, it does **not** change the statistics. It opens a GitHub issue with the new figures and links, so a person can check them before `src/data/statistics.js` is updated.

The routine is managed at [claude.ai/code/routines](https://claude.ai/code/routines). Pause or delete it there. To undo something it added, delete the entry from `add` (or add its link to `exclude`) and push.

### Feed terms (checked 30–31 October 2026)

A feed is only enabled after checking that its publisher allows headlines to be shown on another website.

| Source | Status | Why |
| --- | --- | --- |
| BBC News (World, Africa, Asia, Middle East) | **Enabled** | The [BBC feeds page](https://www.bbc.co.uk/news/10628494) says "We encourage the use of BBC News feeds as part of a website", with attribution as "BBC News" and no BBC logos. |
| Christian Today | **Enabled** | Its [RSS page](https://www.christiantoday.com/rss-feeds) says "We encourage the use of Christian Today RSS feeds ... as part of a non-commercial Web site or blog", with proper attribution. |
| Global Christian Relief | Off | Terms allow personal, non-commercial use only; other reproduction needs written permission. Ask first. |
| Crux | Off | No reuse terms found. Ask first. |
| International Christian Concern | Off | Charity news feed on persecution; no reuse terms found. Ask first. |
| UCA News | Off | Footer says no part may be reproduced without prior permission. Ask first. |
| Christianity Today | Off | The old RSS terms allowed non-commercial use with attribution, but that page no longer loads, and the current [terms of use](https://www.christianitytoday.com/terms-of-use/) forbid copying content to another site "unless otherwise authorized". Ask CT first. |
| Open Doors UK & Ireland news | Off | Covers persecution directly, but no feed terms are published. Ask Open Doors first. |
| Morning Star News | Off | Specialist persecution news service; no reuse terms found. Ask first. |
| Vatican News | Excluded | Its legal notes forbid reproducing content, or even linking to it, without written permission. |
| Catholic News Agency | Excluded | Reuse of material from its RSS feeds requires its Service for Editors or express permission. |
| The Guardian | Excluded | Terms limit use to personal, non-commercial use; aggregators need an NLA licence. |

To enable a feed once you have permission, set `"enabled": true` in `scripts/feeds.json` and record what you were told in `termsNote`.

## Keeping statistics and charities accurate

- Statistics live in `src/data/statistics.js`, and charities in `src/data/charities.js`.
- Copy figures **exactly** as published. Never round, add up figures from different sources or estimate.
- When a new edition comes out (Open Doors' World Watch List each January, Pew usually mid-year, USCIRF each spring, ACN every two years), replace the whole entry and update `checked`.
- Use "genocide" only where a government or court has formally recognised it, and link the recognition.
- Barnabas Aid is listed with a note about the UK Charity Commission's ongoing statutory inquiry. Check [gov.uk](https://www.gov.uk/government/news/charity-regulator-appoints-interim-managers-to-international-aid-charity-amidst-ongoing-investigation) for its outcome and update the note when it concludes.
- USCIRF's website blocks automated checks, so its 2026 figures (18 Countries of Particular Concern, 11 Special Watch List) were confirmed through news coverage of the report. Check them against [uscirf.gov](https://www.uscirf.gov/countries/2026-recommendations) in a browser.

## Deploying

1. Create a GitHub repository and push this folder to `main`.
2. In the repository's **Settings → Pages**, set **Source** to **GitHub Actions**.
3. The workflow builds and deploys on every push and every 6 hours.

The Vite `base` is `./`, so the site works at any repository name.

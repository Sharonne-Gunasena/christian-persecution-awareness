import { useEffect, useState } from 'react';
import { ExternalLink, PageHeader } from '../components/ui.jsx';

const dateFormat = new Intl.DateTimeFormat('en-IE', { day: 'numeric', month: 'long', year: 'numeric' });

export default function Headlines() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Relative path so it works under any GitHub Pages repo name.
    fetch('./data/headlines.json', { cache: 'no-cache' })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(res.statusText))))
      .then(setData)
      .catch(() => setError(true));
  }, []);

  return (
    <>
      <PageHeader title="Headlines">
        <p>
          Recent reporting on Christians killed, attacked or detained because of their faith. Each headline links to
          the original article. Only the headline is shown here; read the full story on the publisher's site.
        </p>
      </PageHeader>

      {error && (
        <p className="rounded-lg border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
          Headlines couldn't be loaded right now. Please try again later.
        </p>
      )}

      {!data && !error && <p className="text-stone-500">Loading headlines…</p>}

      {data && (
        <>
          {data.items.length === 0 ? (
            <p className="rounded-lg border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
              No matching headlines in the last 60 days from the sources below.
            </p>
          ) : (
            <ol className="divide-y divide-stone-200 border-y border-stone-200 dark:divide-stone-800 dark:border-stone-800">
              {data.items.map((item) => (
                <li key={item.link} className="py-5">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-xl font-medium leading-snug text-stone-900 no-underline hover:text-sky-900 hover:underline dark:text-stone-100 dark:hover:text-sky-300"
                  >
                    {item.title}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  <p className="mt-1.5 text-sm text-stone-500 dark:text-stone-400">
                    <span className="font-medium text-stone-700 dark:text-stone-300">{item.source}</span>
                    <span aria-hidden="true"> · </span>
                    <time dateTime={item.date}>{dateFormat.format(new Date(item.date))}</time>
                  </p>
                </li>
              ))}
            </ol>
          )}

          <section className="mt-10 max-w-2xl space-y-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
            <h2 className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-100">About these headlines</h2>
            <p>
              Updated automatically from two places: news feeds whose publishers allow their headlines to be shown on
              other sites, and a daily search of specialist outlets and charity news pages, where each article is opened
              and checked before it is listed. Last updated{' '}
              <time dateTime={data.updated}>{dateFormat.format(new Date(data.updated))}</time>.
            </p>
            <p>
              Feed headlines are picked by keyword matching, which can include a story where faith was not the main cause,
              or miss a relevant one. Mistaken matches are removed by hand when spotted. Headlines are the publishers' own
              words, not this site's.
            </p>
            {data.sources.length > 0 && (
              <p>
                Sources:{' '}
                {data.sources.map((s, i) => (
                  <span key={s.name}>
                    {i > 0 && ', '}
                    {s.name}
                    {s.termsUrl && (
                      <>
                        {' '}(<ExternalLink href={s.termsUrl}>feed terms</ExternalLink>)
                      </>
                    )}
                  </span>
                ))}
                .
              </p>
            )}
          </section>
        </>
      )}
    </>
  );
}

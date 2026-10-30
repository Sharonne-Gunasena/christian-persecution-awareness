import { ExternalLink, PageHeader } from '../components/ui.jsx';
import { checked, differences, sources } from '../data/statistics.js';

export default function Statistics() {
  return (
    <>
      <PageHeader title="Statistics">
        <p>
          Figures from four of the most widely cited sources, quoted exactly as each one published them. Every figure
          shows where it comes from, the period it covers and how it was counted.
        </p>
        <p className="text-base">Sources last checked {checked}.</p>
      </PageHeader>

      <div className="space-y-12">
        {sources.map((s) => (
          <section key={s.id} aria-labelledby={`src-${s.id}`} className="border-t border-stone-200 pt-8 dark:border-stone-800">
            <div className="grid gap-6 lg:grid-cols-[18rem_1fr] lg:gap-10">
              <div>
                <h2 id={`src-${s.id}`} className="font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50">
                  {s.org}
                </h2>
                <dl className="mt-3 space-y-1.5 text-sm text-stone-600 dark:text-stone-400">
                  <Meta term="Report">
                    <ExternalLink href={s.url}>{s.report}</ExternalLink>
                  </Meta>
                  <Meta term="Published">{s.published}</Meta>
                  <Meta term="Covers">{s.period}</Meta>
                  <Meta term="Scope">{s.scope}</Meta>
                </dl>
              </div>
              <div>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {s.figures.map((f) => (
                    <li key={f.label} className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
                      <p className="font-serif text-3xl font-semibold text-sky-900 dark:text-sky-300">{f.value}</p>
                      <p className="mt-1 font-medium text-stone-800 dark:text-stone-200">{f.label}</p>
                      <p className="mt-3 text-sm leading-relaxed text-stone-500 dark:text-stone-400">{f.note}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  <span className="font-medium text-stone-800 dark:text-stone-200">How it was counted: </span>
                  {s.method} <ExternalLink href={s.methodUrl}>Read the methodology</ExternalLink>
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section aria-labelledby="differences" className="mt-16 rounded-xl border border-amber-300/60 bg-amber-50 p-6 sm:p-8 dark:border-amber-500/30 dark:bg-amber-950/30">
        <h2 id="differences" className="font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50">
          Why these numbers can't be added or compared directly
        </h2>
        <dl className="mt-6 grid gap-6 sm:grid-cols-2">
          {differences.map((d) => (
            <div key={d.title}>
              <dt className="font-medium text-stone-900 dark:text-stone-100">{d.title}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-stone-700 dark:text-stone-300">{d.body}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}

function Meta({ term, children }) {
  return (
    <div className="flex gap-2">
      <dt className="w-20 shrink-0 text-stone-500 dark:text-stone-500">{term}</dt>
      <dd>{children}</dd>
    </div>
  );
}

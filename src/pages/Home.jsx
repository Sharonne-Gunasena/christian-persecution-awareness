import { ExternalLink } from '../components/ui.jsx';
import { sources } from '../data/statistics.js';

const openDoors = sources.find((s) => s.id === 'open-doors');
const pew = sources.find((s) => s.id === 'pew');

const sections = [
  {
    href: '#/headlines',
    title: 'Headlines',
    text: 'Recent reporting from established news outlets, linking to the original articles.',
  },
  {
    href: '#/statistics',
    title: 'Statistics',
    text: 'Figures from Open Doors, Aid to the Church in Need, Pew Research and USCIRF, with how each was counted.',
  },
  {
    href: '#/charities',
    title: 'Charities',
    text: 'Organisations that support persecuted Christians. This site links to them and takes no donations.',
  },
];

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-widest text-sky-800 dark:text-sky-400">An awareness project</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl dark:text-stone-50">
          Christians are persecuted for their faith in many parts of the world.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-stone-600 dark:text-stone-400">
          This site brings together recent news, published research and the charities working on the issue, so you can
          read the evidence for yourself. Every figure links to the organisation that published it.
        </p>
      </section>

      <section aria-label="Key figures" className="grid gap-4 sm:grid-cols-2">
        <Figure
          value={openDoors.figures[0].value}
          label={`Christians killed for faith-related reasons, ${openDoors.period}`}
          source={`Open Doors, ${openDoors.report}`}
          url={openDoors.url}
        />
        <Figure
          value={`${pew.figures[0].value} of 198`}
          label="countries and territories where Christians faced harassment from governments or social groups in 2023"
          source="Pew Research Center, published June 2026"
          url={pew.url}
        />
      </section>

      <section aria-label="Sections" className="grid gap-4 sm:grid-cols-3">
        {sections.map((s) => (
          <a
            key={s.href}
            href={s.href}
            className="group rounded-xl border border-stone-200 bg-white p-6 no-underline transition hover:border-sky-800/40 hover:shadow-sm dark:border-stone-800 dark:bg-stone-900 dark:hover:border-sky-400/40"
          >
            <h2 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-50">
              {s.title} <span aria-hidden="true" className="inline-block transition group-hover:translate-x-1">→</span>
            </h2>
            <p className="mt-2 text-stone-600 dark:text-stone-400">{s.text}</p>
          </a>
        ))}
      </section>

      <section className="max-w-3xl space-y-4 rounded-xl border border-stone-200 bg-stone-100/60 p-6 sm:p-8 dark:border-stone-800 dark:bg-stone-900/60">
        <h2 className="font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50">How this site uses words</h2>
        <p className="leading-relaxed">
          <strong>Persecution</strong> and <strong>killings</strong> are used with the source that reports them. Sources
          define these terms differently, and the{' '}
          <a href="#/statistics" className="text-sky-800 underline dark:text-sky-300">
            Statistics
          </a>{' '}
          page explains how.
        </p>
        <p className="leading-relaxed">
          <strong>Genocide</strong> is a legal term. It is used here only where a government or court has formally
          recognised it. For example, on 17 March 2016 US Secretary of State John Kerry declared that ISIS (Daesh) was{' '}
          <ExternalLink href="https://2009-2017.state.gov/secretary/remarks/2016/03/254782.htm">
            responsible for genocide
          </ExternalLink>{' '}
          against Yezidis, Christians and Shia Muslims in areas under its control.
        </p>
        <p className="leading-relaxed">
          Persecution of Christians has many causes, including authoritarian governments, armed groups, criminal
          networks and local hostility, and they differ from country to country. People of other faiths, and people of
          no faith, are also persecuted for what they believe.
        </p>
      </section>
    </div>
  );
}

function Figure({ value, label, source, url }) {
  return (
    <figure className="rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
      <p className="font-serif text-4xl font-semibold text-sky-900 sm:text-5xl dark:text-sky-300">{value}</p>
      <p className="mt-2 text-stone-700 dark:text-stone-300">{label}</p>
      <figcaption className="mt-4 text-sm text-stone-500 dark:text-stone-400">
        Source: <ExternalLink href={url}>{source}</ExternalLink>
      </figcaption>
    </figure>
  );
}

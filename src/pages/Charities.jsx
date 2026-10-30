import { ExternalLink, PageHeader } from '../components/ui.jsx';
import { charities, checked } from '../data/charities.js';

export default function Charities() {
  return (
    <>
      <PageHeader title="Charities">
        <p>
          Organisations that support Christians facing persecution, with what each says it does. This site does not take
          donations. To give or get involved, go directly to the charity's own website.
        </p>
        <p className="text-base">
          Listing is not an endorsement. Before giving, check the charity's registration and latest accounts with your
          country's regulator, such as the{' '}
          <ExternalLink href="https://www.charitiesregulator.ie/">Charities Regulator</ExternalLink> in Ireland or the{' '}
          <ExternalLink href="https://register-of-charities.charitycommission.gov.uk/">Charity Commission</ExternalLink>{' '}
          in England and Wales. Websites last checked {checked}.
        </p>
      </PageHeader>

      <ul className="grid gap-5 md:grid-cols-2">
        {charities.map((c) => (
          <li key={c.name} className="flex flex-col rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
            <h2 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-50">{c.name}</h2>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{c.based}</p>
            <p className="mt-3 flex-1 leading-relaxed text-stone-700 dark:text-stone-300">{c.description}</p>

            {c.caution && (
              <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm leading-relaxed text-amber-950 dark:bg-amber-950/40 dark:text-amber-100">
                <span className="font-medium">Note: </span>
                {c.caution.text} <ExternalLink href={c.caution.url}>Charity Commission notice</ExternalLink>
              </p>
            )}

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <ExternalLink href={c.url} className="font-medium">
                Official website
              </ExternalLink>
              {c.local && <ExternalLink href={c.local.url}>{c.local.label}</ExternalLink>}
              {c.registration && <ExternalLink href={c.registration.url}>{c.registration.label}</ExternalLink>}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

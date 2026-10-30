import { useEffect, useState } from 'react';

export default function Layout({ routes, path, children }) {
  const [open, setOpen] = useState(false);

  // Close the phone menu whenever the page changes, including via the back button.
  useEffect(() => setOpen(false), [path]);

  const navLink = (r) => {
    const active = r.path === path;
    return (
      <a
        key={r.path}
        href={`#${r.path}`}
        onClick={() => setOpen(false)}
        aria-current={active ? 'page' : undefined}
        className={`block rounded-md px-3 py-2 text-sm font-medium no-underline transition-colors ${
          active
            ? 'bg-stone-200/70 text-stone-900 dark:bg-stone-800 dark:text-stone-50'
            : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-900 dark:hover:text-stone-100'
        }`}
      >
        {r.label}
      </a>
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('main')?.focus();
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-stone-200 bg-stone-50/90 backdrop-blur dark:border-stone-800 dark:bg-stone-950/90">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#/" className="flex items-center gap-2.5 no-underline" onClick={() => setOpen(false)}>
            <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
              <rect width="32" height="32" rx="6" className="fill-sky-900 dark:fill-sky-700" />
              <path d="M16 7v18M10 13h12" stroke="white" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <span className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-50">Persecuted for Faith</span>
          </a>
          <nav aria-label="Main" className="hidden gap-1 sm:flex">
            {routes.map(navLink)}
          </nav>
          <button
            type="button"
            className="rounded-md p-2 text-stone-700 hover:bg-stone-100 sm:hidden dark:text-stone-300 dark:hover:bg-stone-900"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
        {open && (
          <nav id="mobile-nav" aria-label="Main" className="border-t border-stone-200 px-4 py-2 sm:hidden dark:border-stone-800">
            {routes.map(navLink)}
          </nav>
        )}
      </header>

      <main id="main" tabIndex={-1} className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 outline-none sm:px-6 sm:py-14">
        {children}
      </main>

      <footer className="border-t border-stone-200 dark:border-stone-800">
        <div className="mx-auto max-w-5xl space-y-2 px-4 py-8 text-sm text-stone-500 sm:px-6 dark:text-stone-400">
          <p>
            An independent awareness project. This site does not take donations or collect any data; it only links to
            original reporting, published research and the charities' own websites.
          </p>
          <p>Figures are quoted exactly as published, with their source, period and method. Spotted an error? Please report it.</p>
        </div>
      </footer>
    </div>
  );
}

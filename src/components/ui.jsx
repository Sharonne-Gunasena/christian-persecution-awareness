export function ExternalLink({ href, children, className = '' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-sky-800 underline decoration-sky-800/30 hover:decoration-sky-800 dark:text-sky-300 dark:decoration-sky-300/30 dark:hover:decoration-sky-300 ${className}`}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function PageHeader({ title, children }) {
  return (
    <header className="mb-10 max-w-2xl">
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl dark:text-stone-50">
        {title}
      </h1>
      <div className="mt-4 space-y-3 text-lg leading-relaxed text-stone-600 dark:text-stone-400">{children}</div>
    </header>
  );
}

export function InsightBanner() {
  return (
    <section className="dda-insight-banner" aria-label="Insights call to action">
      <span className="dda-insight-banner__icon" aria-hidden>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2l1.2 4.2L17.4 7.5l-4.2 1.3L12 13l-1.2-4.2L6.6 7.5l4.2-1.3L12 2z"
            fill="currentColor"
          />
          <path
            d="M18 14l.6 2.1 2.1.7-2.1.6L18 20l-.6-2.1-2.1-.6 2.1-.7L18 14z"
            fill="currentColor"
            opacity="0.9"
          />
        </svg>
      </span>
      <p className="dda-insight-banner__text">
        Ask questions, uncover insights, and build custom dashboards in seconds. Explore what your data can tell
        you.
      </p>
      <button type="button" className="dda-insight-banner__cta" aria-label="Continue">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </section>
  );
}

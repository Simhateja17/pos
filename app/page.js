export const metadata = {
  title: "Couture POS — Choose workspace",
  description: "Select a point-of-sale workspace: Retail or Pharmacy.",
};

export default function ChooserPage() {
  return (
    <main className="chooser">
      <div className="chooser-inner">
        <div className="chooser-head">
          <div className="chooser-mark">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 7l1.5 12.5A2 2 0 0 0 5.5 21h13a2 2 0 0 0 2-1.5L22 7" />
              <path d="M2 7h20" />
              <path d="M8 7V5a4 4 0 0 1 8 0v2" />
            </svg>
          </div>
          <h1 className="chooser-title serif">Couture POS</h1>
          <p className="chooser-sub">Choose your workspace to continue</p>
        </div>

        <div className="chooser-grid">
          <a className="chooser-card" href="/retail">
            <span className="chooser-card-icon retail">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l1.5-5h15L21 9" />
                <path d="M3 9h18v3a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z" />
                <path d="M4 12v8h16v-8" />
                <path d="M9 20v-5h6v5" />
              </svg>
            </span>
            <div className="chooser-card-title">Retail POS</div>
            <div className="chooser-card-desc">Billing, inventory, customers & store operations</div>
            <span className="btn btn-primary chooser-card-cta">Open Retail →</span>
          </a>

          <a className="chooser-card" href="/pharmacy">
            <span className="chooser-card-icon pharmacy">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 21h14" />
                <path d="M6 21v-7a6 6 0 0 1 12 0v7" />
                <path d="M4 11h16" />
                <path d="M12 4.5C12 3 11 2 9.5 2S7 3 7 4.5" />
                <path d="M12 14v4M10 16h4" />
              </svg>
            </span>
            <div className="chooser-card-title">Pharmacy POS</div>
            <div className="chooser-card-desc">Dispensing, Rx queue, patients & PBM claims</div>
            <span className="btn btn-primary chooser-card-cta">Open Pharmacy →</span>
          </a>
        </div>
      </div>
    </main>
  );
}

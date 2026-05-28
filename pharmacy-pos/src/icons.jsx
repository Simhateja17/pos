// Minimal icon library — outline, single weight, currentColor
const Icon = (() => {
  const mk = (path, vb = '0 0 24 24') => ({ size = 16, sw = 1.6, ...rest }) => (
    <svg width={size} height={size} viewBox={vb} fill="none" stroke="currentColor"
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" {...rest}>
      {path}
    </svg>
  );
  return {
    // Brand mark — mortar & pestle abstract
    Pill: mk(<g><rect x="3" y="9" width="18" height="6" rx="3"/><path d="M12 9v6"/></g>),
    Capsule: mk(<g><rect x="3" y="9" width="18" height="6" rx="3"/><path d="M12 9v6"/></g>),
    Rx: mk(<g><path d="M6 4h6a3 3 0 0 1 0 6H6V4z"/><path d="M6 10v10"/><path d="M10 12l8 8"/><path d="M18 12l-4 4"/></g>),

    // Nav icons
    Home: mk(<g><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/></g>),
    Queue: mk(<g><rect x="3" y="4" width="6" height="16" rx="1.5"/><rect x="11" y="4" width="6" height="16" rx="1.5"/><rect x="19" y="4" width="2" height="16" rx="1"/></g>),
    NewRx: mk(<g><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><path d="M9 14h6"/><path d="M12 11v6"/></g>),
    Cart: mk(<g><circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/><path d="M3 4h2l2.4 11.5a2 2 0 0 0 2 1.5h7.6a2 2 0 0 0 2-1.5L21 7H6"/></g>),
    Patients: mk(<g><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 20a5 5 0 0 1 5-5"/></g>),
    Box: mk(<g><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/></g>),
    Truck: mk(<g><path d="M3 7h11v10H3z"/><path d="M14 10h4l3 3v4h-7"/><circle cx="7" cy="18" r="1.5"/><circle cx="17" cy="18" r="1.5"/></g>),
    Building: mk(<g><path d="M4 21V5l8-2 8 2v16"/><path d="M9 9h1m4 0h1M9 13h1m4 0h1M9 17h1m4 0h1"/></g>),
    Shield: mk(<g><path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6z"/></g>),
    Coin: mk(<g><circle cx="12" cy="12" r="8"/><path d="M14 9.5c-.5-.8-1.5-1.2-2.5-1.2-1.4 0-2.5.9-2.5 2s1.1 1.6 2.5 2 2.5 1 2.5 2-1.1 2-2.5 2c-1 0-2-.4-2.5-1.2"/><path d="M12 7v1m0 8v1"/></g>),
    File: mk(<g><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/></g>),
    Chart: mk(<g><path d="M3 21h18"/><rect x="6" y="11" width="3" height="8"/><rect x="11" y="6" width="3" height="13"/><rect x="16" y="14" width="3" height="5"/></g>),
    People: mk(<g><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 20a5 5 0 0 1 5-5"/></g>),
    Plug: mk(<g><path d="M9 2v6M15 2v6"/><path d="M6 8h12v4a6 6 0 0 1-12 0z"/><path d="M12 18v4"/></g>),
    Cog: mk(<g><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></g>),

    // Action icons
    Search: mk(<g><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></g>),
    Bell: mk(<g><path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8z"/><path d="M10 21a2 2 0 0 0 4 0"/></g>),
    Plus: mk(<g><path d="M12 5v14M5 12h14"/></g>),
    Minus: mk(<g><path d="M5 12h14"/></g>),
    X: mk(<g><path d="M6 6l12 12M18 6 6 18"/></g>),
    Check: mk(<g><path d="M5 12l5 5L20 7"/></g>),
    Chevron: mk(<g><path d="M9 6l6 6-6 6"/></g>),
    ChevronDown: mk(<g><path d="M6 9l6 6 6-6"/></g>),
    ArrowUp: mk(<g><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></g>),
    ArrowDown: mk(<g><path d="M12 5v14"/><path d="M19 12l-7 7-7-7"/></g>),
    ArrowRight: mk(<g><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></g>),
    ArrowLeft: mk(<g><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></g>),
    More: mk(<g><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></g>),
    Edit: mk(<g><path d="M3 21l4-1L20 7l-3-3L4 17z"/><path d="M14 6l4 4"/></g>),
    Trash: mk(<g><path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13"/></g>),
    Filter: mk(<g><path d="M3 5h18l-7 9v6l-4-2v-4z"/></g>),
    Calendar: mk(<g><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></g>),
    Clock: mk(<g><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></g>),
    Phone: mk(<g><path d="M22 17v3a2 2 0 0 1-2.2 2A19 19 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.5 2.6a2 2 0 0 1-.5 2L8 9.5a16 16 0 0 0 6.5 6.5l1.2-1.2a2 2 0 0 1 2-.5c.8.2 1.7.4 2.6.5A2 2 0 0 1 22 17z"/></g>),
    Mail: mk(<g><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></g>),
    Print: mk(<g><path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="9" rx="2"/><path d="M6 14h12v7H6z"/></g>),
    Download: mk(<g><path d="M12 4v12"/><path d="M7 11l5 5 5-5"/><path d="M5 20h14"/></g>),
    Upload: mk(<g><path d="M12 20V8"/><path d="M7 13l5-5 5 5"/><path d="M5 4h14"/></g>),
    Alert: mk(<g><path d="M12 3 2 21h20z"/><path d="M12 10v5M12 18v.5"/></g>),
    Info: mk(<g><circle cx="12" cy="12" r="9"/><path d="M12 8v.5M11 12h1v5h1"/></g>),
    Star: mk(<g><path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/></g>),
    Lock: mk(<g><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></g>),
    Eye: mk(<g><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></g>),
    Wifi: mk(<g><path d="M5 13a10 10 0 0 1 14 0"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><circle cx="12" cy="20" r="1"/></g>),
    Heart: mk(<g><path d="M12 21s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9z"/></g>),
    Stethoscope: mk(<g><path d="M6 3v6a5 5 0 0 0 10 0V3"/><path d="M6 3h2M14 3h2"/><path d="M11 14v3a4 4 0 0 0 8 0v-2"/><circle cx="19" cy="11" r="2"/></g>),
    Vial: mk(<g><path d="M9 3h6"/><path d="M10 3v12a3 3 0 0 0 6 0V3"/><path d="M10 10h6"/></g>),
    Mortar: mk(<g><path d="M4 9h16l-2 7a3 3 0 0 1-3 2H9a3 3 0 0 1-3-2z"/><path d="M16 9V7a4 4 0 0 0-8 0v2"/><path d="M10 3l4 4"/></g>),
    Book: mk(<g><path d="M4 4h12a3 3 0 0 1 3 3v14H7a3 3 0 0 1-3-3z"/><path d="M19 18H7a3 3 0 0 0-3 3"/></g>),
    Refresh: mk(<g><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></g>),
    Cloud: mk(<g><path d="M7 18a5 5 0 1 1 1.4-9.8A6 6 0 0 1 20 11a4 4 0 0 1 0 8z"/></g>),
    Tag: mk(<g><path d="M3 12V4h8l10 10-8 8z"/><circle cx="8" cy="8" r="1.5"/></g>),
    Layers: mk(<g><path d="M12 3 2 8l10 5 10-5z"/><path d="M2 13l10 5 10-5"/><path d="M2 18l10 5 10-5"/></g>),
  };
})();

window.Icon = Icon;

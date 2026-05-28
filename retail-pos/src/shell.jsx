// Shell: sidebar + topbar
const { useState } = React;

function Sidebar({ active, setActive }) {
  const NAV = window.AppData.NAV;
  const Icon = window.Icon;
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <Icon.Book size={18} sw={2}/>
        </div>
        <div>
          <div className="brand-title">Couture POS</div>
          <div className="brand-sub">Retail operations suite</div>
        </div>
      </div>
      {NAV.map((g,gi) => (
        <div key={gi}>
          <div className="nav-group-label">{g.group}</div>
          {g.items.filter(it => !it.hidden).map(it => {
            const Ic = Icon[it.icon];
            const isActive = active === it.id || (active === 'inventory-detail' && it.id === 'inventory') || (active === 'po-detail' && it.id === 'purchases');
            return (
              <div key={it.id} className={"nav-item " + (isActive ? 'active' : '')} onClick={() => setActive(it.id)}>
                <span className="nav-ic"><Ic size={15}/></span>
                <span>{it.label}</span>
                {it.badge && <span className="nav-badge">{it.badge}</span>}
              </div>
            );
          })}
        </div>
      ))}
      <div style={{marginTop:18, padding:'12px', background:'white', border:'1px solid var(--border)', borderRadius:10}}>
        <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:6}}>
          <span style={{width:8, height:8, borderRadius:4, background:'var(--success)', boxShadow:'0 0 0 3px rgba(16,185,129,.18)'}}></span>
          <div style={{fontSize:12, fontWeight:600}}>All systems operational</div>
        </div>
        <div style={{fontSize:11, color:'var(--muted)'}}>Sync · UPI · Card terminal · Cloud printer</div>
      </div>
      <a href="/" className="nav-item" style={{marginTop:12, textDecoration:'none', border:'1px solid var(--border)', background:'white'}}>
        <span className="nav-ic">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
        </span>
        <span>Switch app</span>
      </a>
    </aside>
  );
}

function Topbar({ crumbs, onSearch }) {
  const Icon = window.Icon;
  return (
    <div className="topbar">
      <div className="crumbs">
        {crumbs.map((c,i) => (
          <span key={i}>
            {i>0 && <span style={{margin:'0 8px', color:'var(--muted-2)'}}>/</span>}
            {i === crumbs.length-1 ? <strong>{c}</strong> : c}
          </span>
        ))}
      </div>
      <div className="search">
        <Icon.Search size={15}/>
        <input placeholder="Search orders, products, customers, suppliers…  ⌘K"/>
      </div>
      <div className="topbar-actions">
        <div className="seg" title="Store">
          <button className="on">Mumbai · Bandra</button>
          <button>Pune · FC Rd</button>
        </div>
        <button className="icon-btn" title="Notifications" style={{position:'relative'}}>
          <Icon.Bell size={16}/>
          <span style={{position:'absolute', top:6, right:7, width:8, height:8, background:'var(--danger)', borderRadius:4, border:'2px solid white'}}/>
        </button>
        <div className="user-chip">
          <div className="avatar">PM</div>
          <div>
            <div className="user-chip-name">Pooja Menon</div>
            <div className="user-chip-role">Store Manager · Bandra</div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.Shell = { Sidebar, Topbar };


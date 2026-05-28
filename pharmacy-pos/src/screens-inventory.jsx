// Inventory · Purchases · Wholesalers

function Inventory({ goDetail }) {
  const D = window.AppData;
  const Icon = window.Icon;
  return (
    <div className="main">
      <div className="page-head">
        <div>
          <div className="page-title">Inventory</div>
          <div className="page-sub">{D.INVENTORY.length} active NDCs · Mission Bay · last full count Apr 28</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-ghost"><Icon.Download size={14}/> Export</button>
          <button className="btn btn-ghost"><Icon.Upload size={14}/> Cycle count</button>
          <button className="btn btn-primary"><Icon.Plus size={14}/> Add NDC</button>
        </div>
      </div>

      <div className="kpi-grid cols-4" style={{marginBottom:16}}>
        <div className="kpi accent"><div className="kpi-label">On-hand value</div><div className="kpi-value num">$142,820</div><div className="kpi-sub"><span className="delta-up">+$3,420 this week</span></div></div>
        <div className="kpi"><div className="kpi-label">Below par</div><div className="kpi-value num">7</div><div className="kpi-sub muted">3 controlled</div></div>
        <div className="kpi"><div className="kpi-label">Expiring {'<'} 90 days</div><div className="kpi-value num">14</div><div className="kpi-sub muted">$1,860 at risk</div></div>
        <div className="kpi"><div className="kpi-label">Cold-chain alarms</div><div className="kpi-value num">1</div><div className="kpi-sub"><span className="delta-down">Fridge 2 · May 20</span></div></div>
      </div>

      <div className="card">
        <div className="card-head">
          <div className="tabs">
            <div className="tab active">All</div>
            <div className="tab">Below par</div>
            <div className="tab">Expiring</div>
            <div className="tab">Controlled</div>
            <div className="tab">Fridge</div>
            <div className="tab">Out of stock</div>
          </div>
          <div className="row">
            <button className="btn btn-ghost btn-sm"><Icon.Filter size={12}/> Velocity</button>
            <button className="btn btn-ghost btn-sm"><Icon.Filter size={12}/> Mfr</button>
          </div>
        </div>
        <div className="table-wrap" style={{borderRadius:0, border:'none', boxShadow:'none'}}>
          <table>
            <thead><tr>
              <th>NDC</th><th>Drug</th><th>Strength · Form</th><th>Sched</th><th>Loc</th>
              <th className="right">On-hand</th><th className="right">Par</th><th className="right">Cost</th><th>Expiry</th><th>Status</th><th></th>
            </tr></thead>
            <tbody>
              {D.INVENTORY.map(it => {
                const lo = it.stock < it.par;
                const oos = it.stock === 0;
                const ctl = it.sched && it.sched.startsWith('C-');
                const exp = it.expiry && /2026-0[6-9]/.test(it.expiry);
                return (
                  <tr key={it.ndc} onClick={() => goDetail(it)} style={{cursor:'pointer'}}>
                    <td className="mono muted">{it.ndc}</td>
                    <td>
                      <div className="strong">{it.drug}</div>
                      <div className="muted" style={{fontSize:11.5}}>{it.generic} · {it.mfr}</div>
                    </td>
                    <td>{it.strength} · {it.form}</td>
                    <td>
                      {ctl ? <span className="pill pill-purple">{it.sched}</span> :
                       (it.sched === 'Rx' ? <span className="pill pill-neutral">Rx</span> : <span className="pill pill-info">{it.sched}</span>)}
                    </td>
                    <td className="mono">{it.loc}</td>
                    <td className="right num strong" style={{color: oos ? 'var(--danger)' : 'inherit'}}>{it.stock}</td>
                    <td className="right num muted">{it.par}</td>
                    <td className="right num">${it.cost.toFixed(2)}</td>
                    <td className="mono" style={{color: exp ? 'var(--warning)' : 'inherit'}}>{it.expiry}</td>
                    <td>
                      {oos ? <span className="pill pill-danger"><span className="dot"/>OOS</span> :
                       lo ? <span className="pill pill-warning"><span className="dot"/>Below par</span> :
                       it.flag === 'fridge' ? <span className="pill pill-info"><Icon.Vial size={10}/> 2-8°C</span> :
                       <span className="pill pill-success"><span className="dot"/>In stock</span>}
                    </td>
                    <td><Icon.Chevron size={14}/></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function InventoryDetail({ item, onBack }) {
  const Icon = window.Icon;
  const { Donut, Spark } = window.Charts;
  const pct = Math.min(100, Math.round((item.stock / item.par) * 100));
  return (
    <div className="main">
      <div className="page-head">
        <div>
          <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:4}}>
            <button className="btn btn-ghost btn-sm" onClick={onBack}><Icon.ArrowLeft size={12}/> Back</button>
            <span className="pill pill-neutral mono">{item.ndc}</span>
            {item.sched && item.sched.startsWith('C-') && <span className="pill pill-purple">{item.sched}</span>}
            {item.flag === 'fridge' && <span className="pill pill-info"><Icon.Vial size={10}/> 2–8°C</span>}
          </div>
          <div className="page-title">{item.drug} <span className="muted" style={{fontWeight:500, fontSize:18}}>{item.strength} · {item.form}</span></div>
          <div className="page-sub">{item.generic} · {item.mfr} · Location <span className="mono strong">{item.loc}</span></div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-ghost"><Icon.Edit size={14}/> Edit</button>
          <button className="btn btn-soft"><Icon.Refresh size={14}/> Cycle count</button>
          <button className="btn btn-primary"><Icon.Truck size={14}/> Reorder</button>
        </div>
      </div>

      <div className="kpi-grid cols-4" style={{marginBottom:16}}>
        <div className="kpi accent"><div className="kpi-label">On hand</div><div className="kpi-value num">{item.stock}</div><div className="kpi-sub muted">par {item.par} · reorder at {Math.round(item.par * 0.7)}</div></div>
        <div className="kpi"><div className="kpi-label">30-day velocity</div><div className="kpi-value num">{item.velocity === 'high' ? '88' : (item.velocity === 'med' ? '42' : '12')}</div><div className="kpi-sub muted">units / day</div></div>
        <div className="kpi"><div className="kpi-label">Acquisition cost</div><div className="kpi-value num">${item.cost.toFixed(2)}</div><div className="kpi-sub muted">AWP ${item.awp.toFixed(2)}</div></div>
        <div className="kpi"><div className="kpi-label">Avg margin / fill</div><div className="kpi-value num">$4.80</div><div className="kpi-sub"><span className="delta-up">+0.20 vs Apr</span></div></div>
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-head"><h3>Daily dispense · 30 day</h3><span className="card-sub">units</span></div>
          <div className="card-pad">
            <Spark data={Array.from({length:30}, (_,i)=>({total: 30 + Math.round(Math.sin(i/3)*15 + Math.random()*20)}))} width={680} height={180} color="var(--brand-1)"/>
          </div>
        </div>
        <div className="card card-pad">
          <div className="h4" style={{marginBottom:12}}>Stock health</div>
          <div style={{display:'flex', alignItems:'center', gap:14}}>
            <Donut pct={pct} size={130} label={pct + '%'} sub="of par"/>
            <div style={{fontSize:12.5, lineHeight:1.8, flex:1}}>
              <div className="row-between"><span className="muted">Lot</span><span className="mono strong">LT-2024-1148</span></div>
              <div className="row-between"><span className="muted">Expiry</span><span className="mono strong">{item.expiry}</span></div>
              <div className="row-between"><span className="muted">Last delivery</span><span>May 14</span></div>
              <div className="row-between"><span className="muted">Next ship</span><span>May 23 · McKesson</span></div>
            </div>
          </div>
        </div>
      </div>

      <div style={{height:16}}/>

      <div className="two-col">
        <div className="card">
          <div className="card-head"><h3>Recent dispenses</h3><span className="card-sub">past 7 days</span></div>
          <div className="table-wrap" style={{borderRadius:0, border:'none', boxShadow:'none'}}>
            <table>
              <thead><tr><th>Rx</th><th>Patient</th><th className="right">Qty</th><th>Prescriber</th><th>Filled</th><th>Tech</th></tr></thead>
              <tbody>
                {[
                  ['RX-78421','Margaret Chen',30,'Dr. Okafor','May 21 09:42','S. Lin'],
                  ['RX-78388','Daniel Rivera',90,'Dr. Patel','May 20 11:12','A. Petrov'],
                  ['RX-78340','Aisha Bello',30,'Dr. Liu','May 19 16:08','H. Aoki'],
                  ['RX-78295','Henrik Vogel',60,'Dr. Okafor','May 18 10:34','S. Lin'],
                ].map((r,i) => (
                  <tr key={i}><td className="mono">{r[0]}</td><td>{r[1]}</td><td className="right num">{r[2]}</td><td className="muted">{r[3]}</td><td className="muted mono">{r[4]}</td><td>{r[5]}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <div className="card-head"><h3>Pricing & contract</h3></div>
          <div className="card-pad">
            <div className="row-between" style={{padding:'6px 0'}}><span className="muted">AWP</span><span className="num strong">${item.awp.toFixed(2)}</span></div>
            <div className="row-between" style={{padding:'6px 0'}}><span className="muted">Acquisition</span><span className="num strong">${item.cost.toFixed(2)}</span></div>
            <div className="row-between" style={{padding:'6px 0'}}><span className="muted">Cash price</span><span className="num strong">${(item.awp*1.15).toFixed(2)}</span></div>
            <div className="row-between" style={{padding:'6px 0'}}><span className="muted">340B eligible</span><span>{item.flag === 'fridge' ? <span className="pill pill-success">Yes</span> : <span className="pill pill-neutral">No</span>}</span></div>
            <div className="divider"/>
            <div className="h4" style={{marginBottom:6}}>Wholesaler contracts</div>
            <div className="status-row" style={{margin:'6px 0'}}>
              <span className="status-pip" style={{background:'var(--brand-1)'}}/>
              <div style={{flex:1}}>
                <div className="strong" style={{fontSize:13}}>McKesson primary</div>
                <div className="muted" style={{fontSize:11.5}}>${item.cost.toFixed(2)} · lead 1 day</div>
              </div>
              <span className="pill pill-success">Best</span>
            </div>
            <div className="status-row" style={{margin:'6px 0'}}>
              <span className="status-pip" style={{background:'var(--muted-2)'}}/>
              <div style={{flex:1}}>
                <div className="strong" style={{fontSize:13}}>AmerisourceBergen</div>
                <div className="muted" style={{fontSize:11.5}}>${(item.cost*1.04).toFixed(2)} · lead 1 day</div>
              </div>
            </div>
            <div className="status-row" style={{margin:'6px 0'}}>
              <span className="status-pip" style={{background:'var(--muted-2)'}}/>
              <div style={{flex:1}}>
                <div className="strong" style={{fontSize:13}}>Cardinal Health</div>
                <div className="muted" style={{fontSize:11.5}}>${(item.cost*1.09).toFixed(2)} · lead 2 day</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Purchases() {
  const D = window.AppData;
  const Icon = window.Icon;
  return (
    <div className="main">
      <div className="page-head">
        <div>
          <div className="page-title">Purchases</div>
          <div className="page-sub">EDI 850 / 855 / 856 · 4 wholesalers active</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-ghost"><Icon.Layers size={14}/> Auto-suggest order</button>
          <button className="btn btn-primary"><Icon.Plus size={14}/> New PO</button>
        </div>
      </div>

      <div className="kpi-grid cols-4" style={{marginBottom:16}}>
        <div className="kpi"><div className="kpi-label">MTD spend</div><div className="kpi-value num">$89,340</div><div className="kpi-sub muted">vs $94,120 last month</div></div>
        <div className="kpi"><div className="kpi-label">Open POs</div><div className="kpi-value num">2</div><div className="kpi-sub muted">in transit / pending</div></div>
        <div className="kpi"><div className="kpi-label">Avg lead time</div><div className="kpi-value num">1.2 d</div><div className="kpi-sub"><span className="delta-up">-0.3 d vs Q1</span></div></div>
        <div className="kpi"><div className="kpi-label">Discrepancies</div><div className="kpi-value num">3</div><div className="kpi-sub muted">$240 contested</div></div>
      </div>

      <div className="card">
        <div className="card-head">
          <div className="tabs">
            <div className="tab active">All</div>
            <div className="tab">Pending</div>
            <div className="tab">In transit</div>
            <div className="tab">Received</div>
            <div className="tab">Discrepancy</div>
          </div>
        </div>
        <div className="table-wrap" style={{borderRadius:0, border:'none', boxShadow:'none'}}>
          <table>
            <thead><tr><th>PO #</th><th>Wholesaler</th><th className="right">Items</th><th className="right">Total</th><th>Placed</th><th>Received</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {D.PURCHASES.map(p => (
                <tr key={p.po}>
                  <td className="mono strong">{p.po}</td>
                  <td>{p.wholesaler}</td>
                  <td className="right num">{p.items}</td>
                  <td className="right num strong">${p.total.toLocaleString('en-US', {minimumFractionDigits:2})}</td>
                  <td className="muted">{p.placed}</td>
                  <td className="muted">{p.received}</td>
                  <td>
                    {p.status === 'received' && <span className="pill pill-success"><span className="dot"/>Received</span>}
                    {p.status === 'transit' && <span className="pill pill-info"><span className="dot"/>In transit</span>}
                    {p.status === 'pending' && <span className="pill pill-warning"><span className="dot"/>Pending</span>}
                  </td>
                  <td><button className="btn btn-ghost btn-sm">Open</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{height:16}}/>

      <div className="card">
        <div className="card-head"><h3>Suggested reorder</h3><span className="card-sub">Generated 06:00 · ML model v2.4</span></div>
        <div className="table-wrap" style={{borderRadius:0, border:'none', boxShadow:'none'}}>
          <table>
            <thead><tr><th>Drug</th><th>Reason</th><th className="right">Suggest qty</th><th className="right">Cost</th><th>Best vendor</th><th></th></tr></thead>
            <tbody>
              {[
                ['Lipitor 80 mg','Stock 0 · velocity 22/day',120,'$110.40','McKesson'],
                ['Pantoprazole 40 mg','Below par · stock 6',240,'$43.20','AmerisourceBergen'],
                ['Advair Diskus 250/50','Below par · stock 14',25,'$4,550.00','McKesson'],
                ['Humira Pen 40 mg','Below par · stock 8 (fridge)',6,'$17,040.00','Cardinal Health'],
              ].map((r,i) => (
                <tr key={i}>
                  <td className="strong">{r[0]}</td>
                  <td className="muted">{r[1]}</td>
                  <td className="right num">{r[2]}</td>
                  <td className="right num strong">{r[3]}</td>
                  <td>{r[4]}</td>
                  <td><button className="btn btn-soft btn-sm">Add to PO</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Wholesalers() {
  const D = window.AppData;
  const Icon = window.Icon;
  return (
    <div className="main">
      <div className="page-head">
        <div>
          <div className="page-title">Wholesalers</div>
          <div className="page-sub">Primary, secondary, and specialty suppliers</div>
        </div>
        <button className="btn btn-primary"><Icon.Plus size={14}/> Add wholesaler</button>
      </div>

      <div className="three-col" style={{gridTemplateColumns:'repeat(4, 1fr)'}}>
        {D.WHOLESALERS.map(w => (
          <div key={w.id} className="card card-pad-lg">
            <div className="row" style={{justifyContent:'space-between'}}>
              <div className="hub-icon"><Icon.Truck size={18}/></div>
              <span className="pill pill-success"><span className="dot"/>Connected</span>
            </div>
            <div className="serif" style={{fontSize:24, marginTop:14, lineHeight:1.2}}>{w.name}</div>
            <div className="muted" style={{fontSize:12, marginBottom:10}}>{w.contact}</div>
            <div className="row-between" style={{fontSize:12.5, padding:'4px 0'}}><span className="muted">Terms</span><span className="strong">{w.terms}</span></div>
            <div className="row-between" style={{fontSize:12.5, padding:'4px 0'}}><span className="muted">MTD</span><span className="strong num">${w.mtd.toLocaleString()}</span></div>
            <div className="row-between" style={{fontSize:12.5, padding:'4px 0'}}><span className="muted">YTD</span><span className="strong num">${w.ytd.toLocaleString()}</span></div>
            <div className="row-between" style={{fontSize:12.5, padding:'4px 0'}}>
              <span className="muted">Rating</span>
              <span style={{display:'inline-flex', gap:1, color:'var(--warning)'}}>
                {[1,2,3,4,5].map(i => <Icon.Star key={i} size={12} fill={i <= Math.floor(w.rating) ? 'var(--warning)' : 'none'}/>)}
                <span className="ink mono" style={{marginLeft:6}}>{w.rating}</span>
              </span>
            </div>
            <div style={{display:'flex', gap:8, marginTop:12}}>
              <button className="btn btn-ghost btn-sm" style={{flex:1, justifyContent:'center'}}>Open</button>
              <button className="btn btn-soft btn-sm" style={{flex:1, justifyContent:'center'}}>New PO</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{height:16}}/>

      <div className="card">
        <div className="card-head"><h3>Cost comparison · top 8 SKUs</h3><span className="card-sub">Best price highlighted</span></div>
        <div className="table-wrap" style={{borderRadius:0, border:'none', boxShadow:'none'}}>
          <table>
            <thead><tr><th>NDC</th><th>Drug</th><th className="right">McKesson</th><th className="right">AmerisourceBergen</th><th className="right">Cardinal</th><th className="right">H.D. Smith</th></tr></thead>
            <tbody>
              {D.INVENTORY.slice(0,8).map(it => {
                const base = it.cost;
                const prices = [base, base*1.04, base*1.09, base*1.13];
                const min = Math.min(...prices);
                return (
                  <tr key={it.ndc}>
                    <td className="mono muted">{it.ndc}</td>
                    <td>{it.drug} <span className="muted">{it.strength}</span></td>
                    {prices.map((p,i) => (
                      <td key={i} className="right num" style={{color: p === min ? 'var(--brand-1)' : 'inherit', fontWeight: p === min ? 700 : 400}}>${p.toFixed(2)}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

window.ScreensInventory = { Inventory, InventoryDetail, Purchases, Wholesalers };

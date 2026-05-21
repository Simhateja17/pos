// Inventory, Inventory Detail, Purchases, PO Detail, Suppliers
const { useState: useS2 } = React;

const Page2 = ({ title, sub, actions, back, onBack, children }) => (
  <div className="main">
    <div className="page-head">
      <div>
        {back && <a onClick={onBack} style={{cursor:'pointer', color:'var(--brand-1)', fontSize:12.5, fontWeight:600, display:'inline-flex', alignItems:'center', gap:4, marginBottom:4}}>← {back}</a>}
        <div className="page-title">{title}</div>
        {sub && <div className="page-sub">{sub}</div>}
      </div>
      {actions && <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>{actions}</div>}
    </div>
    {children}
  </div>
);

const Kpi2 = ({ label, value, sub, accent }) => (
  <div className={"kpi " + (accent ? "accent" : "")}>
    <div className="kpi-label">{label}</div>
    <div className="kpi-value num">{value}</div>
    {sub && <div className="kpi-sub">{sub}</div>}
  </div>
);

function Inventory({ goDetail }) {
  const D = window.AppData;
  const Icon = window.Icon;
  const [tab, setTab] = useS2('all');
  const [q, setQ] = useS2('');
  const [flow, setFlow] = useS2(null);
  const items = D.INVENTORY.filter(i => {
    if (tab==='low' && i.status!=='Low stock') return false;
    if (tab==='out' && i.status!=='Out of stock') return false;
    if (tab==='exp' && i.status!=='Near expiry') return false;
    if (q && !i.name.toLowerCase().includes(q.toLowerCase()) && !i.sku.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });
  const statusPill = (s) => ({'In stock':'pill-success','Low stock':'pill-warning','Out of stock':'pill-danger','Near expiry':'pill-info'}[s]||'pill-neutral');

  return (
    <Page2 title="Inventory" sub="Stock levels, valuation, batches, expiry" actions={
      <>
        <button className="btn btn-ghost" onClick={() => setFlow('export')}><Icon.Download size={14}/>Export CSV</button>
        <button className="btn btn-ghost" onClick={() => setFlow('import')}><Icon.Upload size={14}/>Import</button>
        <button className="btn btn-primary" onClick={() => setFlow('add')}><Icon.Plus size={14}/>Add Inventory</button>
      </>
    }>
      <div className="kpi-grid" style={{marginBottom:14}}>
        <Kpi2 label="Total SKUs" value="1,284" sub={<span>+22 this month</span>} accent/>
        <Kpi2 label="Inventory value" value="₹84.2 L" sub={<span>Weighted avg cost</span>}/>
        <Kpi2 label="Low stock" value="14" sub={<span className="delta-down">3 critical</span>}/>
        <Kpi2 label="Out of stock" value="6" sub={<span>4 fast movers</span>}/>
        <Kpi2 label="Near expiry" value="9" sub={<span>Within 90 days</span>}/>
        <Kpi2 label="Pending POs" value="3" sub={<span>₹6.0 L incoming</span>}/>
      </div>

      <div className="row-between" style={{marginBottom:12, flexWrap:'wrap', gap:8}}>
        <div className="tabs">
          {[['all','All Stock'],['low','Low Stock'],['out','Out of Stock'],['exp','Near Expiry'],['adj','Stock Adjustment'],['mov','Movement History']].map(([id,l])=>(
            <div key={id} className={"tab " + (tab===id?'active':'')} onClick={()=>setTab(id)}>{l}</div>
          ))}
        </div>
        <div style={{display:'flex', gap:8}}>
          <select className="btn btn-ghost"><option>All categories</option><option>Womens Ethnic</option><option>Mens Western</option><option>Beauty</option></select>
          <select className="btn btn-ghost"><option>All suppliers</option></select>
          <div style={{position:'relative'}}>
            <Icon.Search size={14} style={{position:'absolute', left:10, top:11, color:'var(--muted)'}}/>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="SKU or product" style={{height:36, padding:'0 10px 0 30px', border:'1px solid var(--border)', borderRadius:8, background:'white'}}/>
          </div>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead><tr><th>SKU</th><th>Product</th><th>Category</th><th className="right">Available</th><th className="right">Reserved</th><th className="right">Reorder</th><th>Expiry</th><th className="right">Value</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {items.map(i => (
              <tr key={i.sku} style={{cursor:'pointer'}} onClick={() => goDetail(i)}>
                <td className="mono" style={{fontSize:12}}>{i.sku}</td>
                <td><div className="strong">{i.name}</div><div className="muted" style={{fontSize:11.5}}>{i.supplier}</div></td>
                <td>{i.cat}</td>
                <td className="right num strong">{i.avail}</td>
                <td className="right num muted">{i.reserved}</td>
                <td className="right num muted">{i.reorder}</td>
                <td className="muted" style={{fontSize:12}}>{i.expiry}</td>
                <td className="right num">{D.fmtINRRaw(i.value)}</td>
                <td><span className={"pill " + statusPill(i.status)}><span className="dot"></span>{i.status}</span></td>
                <td><button className="btn btn-ghost btn-sm" onClick={(e)=>{e.stopPropagation(); goDetail(i);}}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {flow && (
        <div style={{ position:'fixed', inset:0, background:'rgba(15,23,41,.38)', zIndex:40, display:'grid', placeItems:'center', padding:20 }}>
          <div className="card" style={{ width:'min(520px, 100%)', borderRadius:14, overflow:'hidden' }}>
            <div className="card-head"><h3>{flow==='export'?'Export inventory':flow==='import'?'Import inventory':'Add inventory item'}</h3><button className="icon-btn" onClick={()=>setFlow(null)}><Icon.X size={14}/></button></div>
            <div className="card-pad-lg"><div className="muted">This {flow} flow is now wired for Inventory.</div><div style={{display:'flex', justifyContent:'flex-end', marginTop:12}}><button className="btn btn-primary" onClick={()=>setFlow(null)}>Continue</button></div></div>
          </div>
        </div>
      )}
    </Page2>
  );
}

function InventoryDetail({ item, onBack }) {
  const D = window.AppData;
  const Icon = window.Icon;
  const it = item || D.INVENTORY[0];
  return (
    <Page2 title={it.name} sub={<><span className="mono">{it.sku}</span> · {it.cat} · {it.supplier}</>} back="Back to Inventory" onBack={onBack} actions={
      <>
        <button className="btn btn-ghost"><Icon.Edit size={14}/>Edit Product</button>
        <button className="btn btn-ghost"><Icon.Box size={14}/>Adjust Stock</button>
        <button className="btn btn-primary"><Icon.Truck size={14}/>Receive Stock</button>
      </>
    }>
      <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:16}}>
        <div className="card card-pad" style={{display:'grid', gridTemplateColumns:'180px 1fr', gap:18}}>
          <div className="img-ph" style={{aspectRatio:'1/1'}}>product shot</div>
          <div>
            <div style={{display:'flex', gap:8, marginBottom:10, flexWrap:'wrap'}}>
              <span className={"pill " + (it.status==='In stock'?'pill-success':it.status==='Low stock'?'pill-warning':it.status==='Out of stock'?'pill-danger':'pill-info')}><span className="dot"></span>{it.status}</span>
              <span className="pill pill-neutral">Selling</span>
              <span className="pill pill-info">GST 5%</span>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, fontSize:13}}>
              {[
                ['Brand','Couture House'],['Unit','Each (1)'],['HSN/SAC','61039000'],['MRP', D.fmtINRRaw(it.mrp)],
                ['Selling price', D.fmtINRRaw(Math.round(it.mrp*0.95))],['Cost price', D.fmtINRRaw(it.cost)],
                ['Margin', ((it.mrp-it.cost)/it.mrp*100).toFixed(1)+'%'],['Reorder level', it.reorder+' units'],
              ].map(([k,v])=>(
                <div key={k}><div className="muted" style={{fontSize:11}}>{k}</div><div className="strong">{v}</div></div>
              ))}
            </div>
          </div>
        </div>

        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Stock at a glance</div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:14}}>
            <div style={{padding:12, background:'var(--bg)', borderRadius:10}}><div className="muted" style={{fontSize:11}}>On hand</div><div className="num strong" style={{fontSize:22}}>{it.avail}</div></div>
            <div style={{padding:12, background:'var(--bg)', borderRadius:10}}><div className="muted" style={{fontSize:11}}>Reserved</div><div className="num strong" style={{fontSize:22}}>{it.reserved}</div></div>
            <div style={{padding:12, background:'var(--bg)', borderRadius:10}}><div className="muted" style={{fontSize:11}}>Available</div><div className="num strong" style={{fontSize:22}}>{it.avail - it.reserved}</div></div>
          </div>
          <div className="h4" style={{marginBottom:6}}>Reorder threshold</div>
          <div className="progress"><div style={{width: Math.min(100, it.avail/it.reorder*100)+'%'}}></div></div>
          <div className="muted" style={{fontSize:11.5, marginTop:6, display:'flex', justifyContent:'space-between'}}><span>{it.avail} on hand</span><span>Reorder at {it.reorder}</span></div>
        </div>
      </div>

      <div className="three-col" style={{marginTop:16}}>
        <div className="card">
          <div className="card-head"><h3>Batch & expiry</h3><button className="btn btn-ghost btn-sm">+ Add batch</button></div>
          <table>
            <thead><tr><th>Batch</th><th className="right">Qty</th><th>Expiry</th><th>Status</th></tr></thead>
            <tbody>
              {[
                {b:'B-2410-A',q:42,e:'—',s:'Active'},
                {b:'B-2410-B',q:30,e:'—',s:'Active'},
                {b:'B-2310-Z',q:12,e:'—',s:'Old stock'},
              ].map(b => (
                <tr key={b.b}><td className="mono" style={{fontSize:12}}>{b.b}</td><td className="right num">{b.q}</td><td className="muted">{b.e}</td><td><span className={"pill "+(b.s==='Active'?'pill-success':'pill-neutral')}>{b.s}</span></td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-head"><h3>Stock movement</h3><span className="muted" style={{fontSize:12}}>Last 30 days</span></div>
          <div className="card-pad" style={{display:'grid', gap:10}}>
            {[
              {ic:'Truck', t:'Purchase received', s:'PO-2026-0184 · +120 units', amt:'+120', tone:'success'},
              {ic:'Cart', t:'Sold via POS', s:'24 bills · 28 units', amt:'−28', tone:'info'},
              {ic:'Alert', t:'Damaged adjustment', s:'2 units · stitching defect', amt:'−2', tone:'danger'},
              {ic:'Edit', t:'Stock correction', s:'Karan Bhatia · audit', amt:'−6', tone:'warn'},
            ].map((m,i)=>{
              const Ic = Icon[m.ic];
              const cm = {success:'var(--success)', info:'var(--brand-1)', danger:'var(--danger)', warn:'var(--warning)'};
              const bm = {success:'var(--success-soft)', info:'var(--brand-soft)', danger:'var(--danger-soft)', warn:'var(--warning-soft)'};
              return (
                <div key={i} style={{display:'flex', gap:10, alignItems:'center'}}>
                  <div style={{width:30, height:30, borderRadius:8, background:bm[m.tone], color:cm[m.tone], display:'grid', placeItems:'center'}}><Ic size={14}/></div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:12.5, fontWeight:600}}>{m.t}</div>
                    <div className="muted" style={{fontSize:11}}>{m.s}</div>
                  </div>
                  <div className="num strong" style={{color:cm[m.tone]}}>{m.amt}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card">
          <div className="card-head"><h3>Price history</h3><span className="muted" style={{fontSize:12}}>Last 6 months</span></div>
          <div className="card-pad">
            <window.Charts.AreaChart data={[1450,1470,1480,1499,1499,1499]} height={120} color="#6C9FFF"/>
            <div style={{display:'grid', gap:6, fontSize:12, marginTop:10}}>
              {[
                ['01 Nov','MRP raised to ₹1,499'],['12 Sep','Promo: ₹1,299 (3-day)'],['18 Aug','Cost up to ₹820 from ₹780'],
              ].map(([d,t])=>(
                <div key={d} className="row-between"><span className="muted mono" style={{fontSize:11}}>{d}</span><span>{t}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="two-col" style={{marginTop:16}}>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Quick actions</div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8}}>
            {[['Edit','Edit Product'],['Box','Adjust Stock'],['Truck','Receive Stock'],['Plus','Create PO'],['Alert','Mark Damaged'],['Chart','Stock Report']].map(([ic,l])=>{
              const Ic = Icon[ic];
              return <button key={l} className="btn btn-ghost" style={{justifyContent:'flex-start', height:44}}><Ic size={14}/>{l}</button>;
            })}
          </div>
        </div>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Audit trail</div>
          <div className="muted" style={{fontSize:12.5, display:'grid', gap:6}}>
            <div>• Today 11:42 · Stock corrected −6 by Karan Bhatia</div>
            <div>• 28 Apr · Received +120 from Fabindia Mills (PO-184)</div>
            <div>• 19 Apr · Price updated to ₹1,499 by Pooja Menon</div>
            <div>• 03 Apr · Reorder threshold raised 25 → 30</div>
          </div>
        </div>
      </div>
    </Page2>
  );
}

function Purchases({ goPO }) {
  const D = window.AppData;
  const Icon = window.Icon;
  const [tab, setTab] = useS2('all');
  const [flow, setFlow] = useS2(null);
  const statusPill = s => ({'Received':'pill-success','Partially Received':'pill-warning','Sent':'pill-info','Draft':'pill-neutral','Bill Matching':'pill-warning','Returns':'pill-danger'}[s]||'pill-neutral');
  return (
    <Page2 title="Purchases" sub="Purchase orders, GRN and supplier bills" actions={
      <>
        <button className="btn btn-ghost" onClick={() => setFlow('export')}><Icon.Download size={14}/>Export CSV</button>
        <button className="btn btn-primary" onClick={() => setFlow('create')}><Icon.Plus size={14}/>Create PO</button>
      </>
    }>
      <div className="kpi-grid" style={{marginBottom:14}}>
        <Kpi2 label="Open POs" value="9" sub={<span>₹14.2 L value</span>} accent/>
        <Kpi2 label="Due today" value="2" sub={<span>Aravind, HUL</span>}/>
        <Kpi2 label="GRN pending" value="3" sub={<span>1 partial · 2 sent</span>}/>
        <Kpi2 label="Bill matching" value="1" sub={<span>Hidesign · ₹600 diff</span>}/>
        <Kpi2 label="Pending delivery" value="₹5.4 L" sub={<span>Across 3 suppliers</span>}/>
        <Kpi2 label="Returns" value="1" sub={<span>FE/26/2204 · 4 units</span>}/>
      </div>

      <div className="row-between" style={{marginBottom:12, flexWrap:'wrap', gap:8}}>
        <div className="tabs">
          {[['all','All POs'],['draft','Draft'],['sent','Sent'],['part','Partially Received'],['recv','Received'],['bill','Bill Matching'],['ret','Returns']].map(([id,l])=>(
            <div key={id} className={"tab "+(tab===id?'active':'')} onClick={()=>setTab(id)}>{l}</div>
          ))}
        </div>
        <div style={{display:'flex', gap:8}}>
          <select className="btn btn-ghost"><option>All suppliers</option></select>
          <select className="btn btn-ghost"><option>All statuses</option></select>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead><tr><th>PO #</th><th>Supplier</th><th>Expected</th><th className="right">Ordered</th><th className="right">Received</th><th>Supplier bill</th><th className="right">Landed cost</th><th className="right">Total</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {D.PURCHASES.map(p => (
              <tr key={p.po} style={{cursor:'pointer'}} onClick={()=>goPO(p)}>
                <td className="mono strong">{p.po}</td>
                <td>{p.sup}</td>
                <td className="muted">{p.exp}</td>
                <td className="right num">{p.ordered}</td>
                <td className="right num">{p.recv}<span className="muted" style={{fontSize:11}}>/{p.ordered}</span></td>
                <td className="mono muted" style={{fontSize:11.5}}>{p.invNum}</td>
                <td className="right num">{p.landed?D.fmtINRRaw(p.landed):'—'}</td>
                <td className="right num strong">{D.fmtINRRaw(p.total)}</td>
                <td><span className={"pill "+statusPill(p.status)}>{p.status}</span></td>
                <td><button className="btn btn-ghost btn-sm" onClick={(e)=>{e.stopPropagation(); goPO(p);}}>Open</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {flow && (
        <div style={{ position:'fixed', inset:0, background:'rgba(15,23,41,.38)', zIndex:40, display:'grid', placeItems:'center', padding:20 }}>
          <div className="card" style={{ width:'min(520px, 100%)', borderRadius:14, overflow:'hidden' }}>
            <div className="card-head"><h3>{flow==='export'?'Export purchases':'Create purchase order'}</h3><button className="icon-btn" onClick={()=>setFlow(null)}><Icon.X size={14}/></button></div>
            <div className="card-pad-lg"><div className="muted">This {flow} flow is now wired for Purchases.</div><div style={{display:'flex', justifyContent:'flex-end', marginTop:12}}><button className="btn btn-primary" onClick={()=>setFlow(null)}>Continue</button></div></div>
          </div>
        </div>
      )}
    </Page2>
  );
}

function PODetail({ po, onBack }) {
  const D = window.AppData;
  const Icon = window.Icon;
  const p = po || D.PURCHASES[1];
  return (
    <Page2 title={p.po} sub={<>{p.sup} · Expected {p.exp}</>} back="Back to Purchases" onBack={onBack} actions={
      <>
        <button className="btn btn-ghost"><Icon.Print size={14}/>Print PO</button>
        <button className="btn btn-ghost">Mark short received</button>
        <button className="btn btn-primary"><Icon.Truck size={14}/>Receive stock</button>
      </>
    }>
      <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:16}}>
        <div className="card">
          <div className="card-head">
            <div>
              <h3>Ordered vs received</h3>
              <div className="card-sub">Update qty when boxes are unpacked. Overages need manager approval.</div>
            </div>
            <span className={"pill " + (p.status==='Received'?'pill-success':'pill-warning')}>{p.status}</span>
          </div>
          <table>
            <thead><tr><th>Item</th><th className="right">Ordered</th><th className="right">Received</th><th className="right">Pending</th><th className="right">Cost</th><th>Status</th></tr></thead>
            <tbody>
              {[
                {n:'Silk Saree — Maroon', s:'COU-WTC-0871', o:30, r:18, c:2200},
                {n:'Banarasi Dupatta — Gold', s:'COU-FRG-1108', o:20, r:0, c:850},
                {n:'Embroidered Lehenga (S)', s:'COU-WMS-0044', o:10, r:4, c:12000},
              ].map((x,i) => (
                <tr key={i}>
                  <td><div className="strong">{x.n}</div><div className="muted mono" style={{fontSize:11}}>{x.s}</div></td>
                  <td className="right num">{x.o}</td>
                  <td className="right">
                    <input defaultValue={x.r} className="num" style={{width:60, textAlign:'right', height:30, border:'1px solid var(--border)', borderRadius:6, padding:'0 8px'}}/>
                  </td>
                  <td className="right num"><span style={{color:x.o-x.r>0?'var(--warning)':'var(--muted)'}}>{x.o-x.r}</span></td>
                  <td className="right num">{D.fmtINRRaw(x.c)}</td>
                  <td><span className={"pill " + (x.r===x.o?'pill-success':x.r===0?'pill-neutral':'pill-warning')}>{x.r===x.o?'Complete':x.r===0?'Awaiting':'Partial'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card card-pad" style={{display:'grid', gap:14}}>
          <div>
            <div className="h4" style={{marginBottom:6}}>Supplier</div>
            <div className="strong">{p.sup}</div>
            <div className="muted" style={{fontSize:12}}>09ZXCVB7766G2H1 · Net 15 · Lead 7 days</div>
            <div className="muted" style={{fontSize:12}}>Vandana Tripathi · +91 99114 22008</div>
          </div>
          <div className="divider"></div>
          <div>
            <div className="h4" style={{marginBottom:6}}>Bill matching</div>
            <div style={{display:'grid', gap:6, fontSize:13}}>
              <div className="row-between"><span className="muted">Supplier invoice</span><span className="num">{D.fmtINRRaw(p.total + 1200)}</span></div>
              <div className="row-between"><span className="muted">System amount</span><span className="num">{D.fmtINRRaw(p.total)}</span></div>
              <div className="row-between"><span className="muted">Difference</span><span className="num delta-down">+₹1,200</span></div>
            </div>
            <button className="btn btn-soft btn-sm" style={{marginTop:8, width:'100%'}}>Request approval</button>
          </div>
          <div className="divider"></div>
          <div>
            <div className="h4" style={{marginBottom:6}}>Landed cost</div>
            <div style={{display:'grid', gap:6, fontSize:13}}>
              <div className="row-between"><span className="muted">Freight</span><span className="num">₹1,200</span></div>
              <div className="row-between"><span className="muted">Handling</span><span className="num">₹600</span></div>
              <div className="row-between"><span className="strong">Apply per unit</span><span className="num strong">₹30/unit</span></div>
            </div>
            <button className="btn btn-ghost btn-sm" style={{marginTop:8, width:'100%'}}>Apply landed cost</button>
          </div>
        </div>
      </div>

      <div className="three-col" style={{marginTop:16}}>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:8}}>Purchase return</div>
          <div className="muted" style={{fontSize:12, marginBottom:10}}>Damaged or wrong items can be returned to supplier.</div>
          <div style={{display:'grid', gap:8, fontSize:13}}>
            <div className="row-between"><span className="muted">Damaged qty</span><span className="num strong">2</span></div>
            <div className="row-between"><span className="muted">Return value</span><span className="num strong">₹4,400</span></div>
          </div>
          <button className="btn btn-ghost btn-sm" style={{marginTop:10, width:'100%'}}>Create purchase return</button>
        </div>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:8}}>Approval status</div>
          <div style={{display:'grid', gap:6, fontSize:12.5}}>
            <div className="row-between"><span>PO created</span><span className="pill pill-success"><span className="dot"></span>Karan B.</span></div>
            <div className="row-between"><span>PO approved</span><span className="pill pill-success"><span className="dot"></span>Pooja M.</span></div>
            <div className="row-between"><span>Stock received</span><span className="pill pill-warning"><span className="dot"></span>Partial</span></div>
            <div className="row-between"><span>Bill matched</span><span className="pill pill-warning"><span className="dot"></span>Diff ₹1,200</span></div>
            <div className="row-between"><span>Posted to ledger</span><span className="pill pill-neutral"><span className="dot"></span>Pending</span></div>
          </div>
        </div>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:8}}>Audit trail</div>
          <div className="muted" style={{fontSize:12, display:'grid', gap:6}}>
            <div>• 28 Apr · PO drafted by Karan Bhatia</div>
            <div>• 28 Apr · PO sent to {p.sup}</div>
            <div>• 02 May · Partial GRN: 22 of 60 units</div>
            <div>• 03 May · Supplier bill received: BW/26/0142</div>
          </div>
        </div>
      </div>
    </Page2>
  );
}

function Suppliers() {
  const D = window.AppData;
  const Icon = window.Icon;
  const [sel, setSel] = useS2(D.SUPPLIERS[0]);
  const [flow, setFlow] = useS2(null);
  return (
    <Page2 title="Suppliers" sub="Vendor master, payables and lead time" actions={
      <>
        <button className="btn btn-ghost" onClick={() => setFlow('export')}><Icon.Download size={14}/>Export CSV</button>
        <button className="btn btn-primary" onClick={() => setFlow('add')}><Icon.Plus size={14}/>Add Supplier</button>
      </>
    }>
      <div className="kpi-grid" style={{marginBottom:14}}>
        <Kpi2 label="Total suppliers" value="42" sub={<span>+3 this quarter</span>} accent/>
        <Kpi2 label="Total payables" value="₹4.92 L" sub={<span>3 due this week</span>}/>
        <Kpi2 label="Avg. lead time" value="5.2 days" sub={<span>Across 42 vendors</span>}/>
        <Kpi2 label="Late orders" value="2" sub={<span className="delta-down">Aravind, Surat</span>}/>
        <Kpi2 label="Bill mismatch" value="1" sub={<span>Hidesign · ₹600</span>}/>
        <Kpi2 label="GST missing" value="1" sub={<span>HUL Distribution</span>}/>
      </div>

      <div className="row-between" style={{marginBottom:12}}>
        <div className="seg">
          <button className="on">All</button><button>Active</button><button>Late</button><button>GST issues</button>
        </div>
        <div style={{display:'flex', gap:8}}>
          <select className="btn btn-ghost"><option>All categories</option></select>
          <select className="btn btn-ghost"><option>All payment terms</option></select>
        </div>
      </div>

      <div className="list-detail">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Supplier</th><th>GSTIN</th><th>Terms</th><th className="right">Lead</th><th className="right">Payable</th><th>Status</th></tr></thead>
            <tbody>
              {D.SUPPLIERS.map(s => (
                <tr key={s.id} className={sel.id===s.id?'selected':''} onClick={()=>setSel(s)} style={{cursor:'pointer'}}>
                  <td><div className="strong">{s.name}</div><div className="muted" style={{fontSize:11.5}}>{s.cat} · {s.contact}</div></td>
                  <td className="mono" style={{fontSize:11.5}}>{s.gstin}</td>
                  <td>{s.terms}</td>
                  <td className="right num">{s.lead}d</td>
                  <td className="right num strong">{D.fmtINRRaw(s.payable)}</td>
                  <td><span className={"pill " + (s.status==='Active'?'pill-success':s.status==='Late'?'pill-warning':'pill-danger')}><span className="dot"></span>{s.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-head"><div><h3>{sel.name}</h3><div className="muted" style={{fontSize:12}}>{sel.cat}</div></div><span className={"pill "+(sel.status==='Active'?'pill-success':sel.status==='Late'?'pill-warning':'pill-danger')}>{sel.status}</span></div>
          <div className="card-pad" style={{display:'grid', gap:12, fontSize:13}}>
            <div>
              <div className="h4" style={{marginBottom:6}}>Contact</div>
              <div>{sel.contact}</div>
              <div className="muted" style={{fontSize:12}}>{sel.phone} · {sel.email}</div>
            </div>
            <div className="divider"></div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
              <div><div className="muted" style={{fontSize:11}}>GSTIN</div><div className="mono" style={{fontSize:12}}>{sel.gstin}</div></div>
              <div><div className="muted" style={{fontSize:11}}>Terms</div><div>{sel.terms}</div></div>
              <div><div className="muted" style={{fontSize:11}}>Credit limit</div><div className="num">{D.fmtINRRaw(sel.credit)}</div></div>
              <div><div className="muted" style={{fontSize:11}}>Outstanding</div><div className="num strong">{D.fmtINRRaw(sel.payable)}</div></div>
              <div><div className="muted" style={{fontSize:11}}>Lead time</div><div>{sel.lead} days</div></div>
              <div><div className="muted" style={{fontSize:11}}>POs (12 mo)</div><div className="num">{sel.recentPOs}</div></div>
            </div>
            <div className="divider"></div>
            <div className="h4">Recent ledger</div>
            <div style={{display:'grid', gap:6, fontSize:12.5}}>
              <div className="row-between"><span>03 May · GRN PO-0185</span><span className="num delta-down">+₹52,800</span></div>
              <div className="row-between"><span>28 Apr · Payment NEFT</span><span className="num delta-up">−₹1,20,000</span></div>
              <div className="row-between"><span>22 Apr · GRN PO-0181</span><span className="num delta-down">+₹84,400</span></div>
            </div>
          </div>
          <div style={{display:'flex', gap:8, padding:14, borderTop:'1px solid var(--border-soft)'}}>
            <button className="btn btn-ghost btn-sm" style={{flex:1}} onClick={() => setFlow('edit')}><Icon.Edit size={12}/>Edit</button>
            <button className="btn btn-ghost btn-sm" style={{flex:1}} onClick={() => setFlow('ledger')}>View ledger</button>
            <button className="btn btn-primary btn-sm" style={{flex:1}} onClick={() => setFlow('createpo')}>Create PO</button>
          </div>
        </div>
      </div>

      <div className="three-col" style={{marginTop:16}}>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Payables & follow-up</div>
          <div style={{display:'grid', gap:8, fontSize:12.5}}>
            {D.SUPPLIERS.filter(s=>s.payable>0).slice(0,4).map(s => (
              <div key={s.id} className="row-between" style={{padding:8, border:'1px solid var(--border-soft)', borderRadius:8}}>
                <div><div className="strong">{s.name}</div><div className="muted">Due: 12 May · {s.terms}</div></div>
                <div className="num strong">{D.fmtINRRaw(s.payable)}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Supplier performance</div>
          <div style={{display:'grid', gap:10}}>
            {[['On-time delivery','92%',true],['Bill match accuracy','96%',true],['Quality acceptance','98.4%',true],['Avg. lead variance','+0.8d',false]].map(([k,v,ok])=>(
              <div key={k} className="row-between" style={{fontSize:12.5}}><span className="muted">{k}</span><span className={"strong "+(ok?'delta-up':'delta-down')}>{v}</span></div>
            ))}
          </div>
        </div>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Remove supplier</div>
          <div className="muted" style={{fontSize:12.5, marginBottom:10}}>Inactive suppliers can be archived. Active POs and ledger entries are preserved.</div>
          <button className="btn btn-ghost btn-sm" style={{color:'var(--danger)', width:'100%'}} onClick={() => setFlow('archive')}><Icon.Trash size={12}/>Archive supplier</button>
        </div>
      </div>
      {flow && (
        <div style={{ position:'fixed', inset:0, background:'rgba(15,23,41,.38)', zIndex:40, display:'grid', placeItems:'center', padding:20 }}>
          <div className="card" style={{ width:'min(560px, 100%)', borderRadius:14, overflow:'hidden' }}>
            <div className="card-head"><h3>{({export:'Export suppliers',add:'Add supplier',edit:'Edit supplier',ledger:'Supplier ledger',createpo:'Create PO',archive:'Archive supplier'})[flow]}</h3><button className="icon-btn" onClick={()=>setFlow(null)}><Icon.X size={14}/></button></div>
            <div className="card-pad-lg"><div className="muted">This action flow is now wired for <strong>{sel.name}</strong>.</div><div style={{display:'flex', justifyContent:'flex-end', marginTop:12}}><button className={"btn "+(flow==='archive'?'btn-danger-ghost':'btn-primary')} onClick={()=>setFlow(null)}>Continue</button></div></div>
          </div>
        </div>
      )}
    </Page2>
  );
}

window.Screens2 = { Inventory, InventoryDetail, Purchases, PODetail, Suppliers };


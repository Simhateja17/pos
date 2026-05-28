// Reports, Analytics
const { useState: useS5 } = React;

const PageI = ({ title, sub, actions, children }) => (
  <div className="main">
    <div className="page-head"><div><div className="page-title">{title}</div>{sub && <div className="page-sub">{sub}</div>}</div>
    {actions && <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>{actions}</div>}</div>
    {children}
  </div>
);
const KI = ({ label, value, sub, accent }) => (
  <div className={"kpi "+(accent?'accent':'')}><div className="kpi-label">{label}</div><div className="kpi-value num">{value}</div>{sub && <div className="kpi-sub">{sub}</div>}</div>
);

function Reports() {
  const D = window.AppData;
  const Icon = window.Icon;
  const [sel, setSel] = useS5(D.REPORTS[0]);
  const [range, setRange] = useS5('7d');
  const [flow, setFlow] = useS5(null);
  const trends = {today:{s:'₹4.84 L',b:'342',g:'₹62 K',r:'₹18.4 K',e:'₹1.32 L',x:'12'},'7d':{s:'₹32.4 L',b:'2,418',g:'₹4.2 L',r:'₹98 K',e:'₹6.8 L',x:'74'},'30d':{s:'₹1.42 Cr',b:'10,184',g:'₹18.6 L',r:'₹3.4 L',e:'₹28.4 L',x:'310'},month:{s:'₹84 L',b:'5,920',g:'₹11.2 L',r:'₹2.1 L',e:'₹17.6 L',x:'182'},custom:{s:'—',b:'—',g:'—',r:'—',e:'—',x:'—'}}[range];
  return (
    <PageI title="Reports" sub="Audit-ready, GST-compliant exports" actions={
      <>
        <button className="btn btn-ghost" onClick={() => setFlow('schedule')}><Icon.Calendar size={14}/>Schedule</button>
        <button className="btn btn-primary" onClick={() => setFlow('generate')}><Icon.Download size={14}/>Generate Report</button>
      </>
    }>
      <div className="kpi-grid" style={{marginBottom:14}}>
        <KI label="Today's sales" value={trends.s} sub={<span>{trends.b} bills</span>} accent/>
        <KI label="GST output" value={trends.g} sub={<span>5% · 12% · 18% slabs</span>}/>
        <KI label="Stock value" value="₹84.2 L" sub={<span>Weighted avg cost</span>}/>
        <KI label="Purchases" value="₹6.8 L" sub={<span>9 POs in window</span>}/>
        <KI label="Expenses" value={trends.e} sub={<span>62% budget used</span>}/>
        <KI label="Exports done" value={trends.x} sub={<span>PDF/XLSX/Email</span>}/>
      </div>

      <div className="card card-pad" style={{marginBottom:14}}>
        <div className="row-between">
          <div className="h3">Trend range</div>
          <div className="seg">
            {[['today','Today'],['7d','7 Days'],['30d','30 Days'],['month','This Month'],['custom','Custom']].map(([id,l])=>(
              <button key={id} className={range===id?'on':''} onClick={()=>setRange(id)}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:10, marginTop:14}}>
          {[['Sales',trends.s],['Bills',trends.b],['GST',trends.g],['Refunds',trends.r],['Expenses',trends.e],['Exports',trends.x]].map(([k,v])=>(
            <div key={k} style={{padding:12, background:'var(--bg)', borderRadius:10}}>
              <div className="muted" style={{fontSize:11}}>{k}</div>
              <div className="num strong" style={{fontSize:18}}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="row-between" style={{marginBottom:12}}>
        <div className="seg"><button className="on">All</button><button>Sales</button><button>GST</button><button>Stock</button><button>Audit</button></div>
        <div style={{display:'flex', gap:8}}>
          <select className="btn btn-ghost"><option>PDF + XLSX</option></select>
          <select className="btn btn-ghost"><option>All branches</option></select>
        </div>
      </div>

      <div className="list-detail">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Report</th><th>Purpose</th><th>Updated</th><th>Owner</th><th></th></tr></thead>
            <tbody>
              {D.REPORTS.map(r => (
                <tr key={r.name} className={sel.name===r.name?'selected':''} onClick={()=>setSel(r)} style={{cursor:'pointer'}}>
                  <td className="strong">{r.name}</td>
                  <td className="muted">{r.purpose}</td>
                  <td className="muted">{r.updated}</td>
                  <td>{r.owner}</td>
                  <td><button className="btn btn-ghost btn-sm" onClick={(e)=>{e.stopPropagation(); setSel(r); setFlow('open');}}>Open</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-head"><div><h3>{sel.name}</h3><div className="muted" style={{fontSize:12}}>{sel.purpose}</div></div><span className="pill pill-info">Preview</span></div>
          <div className="card-pad" style={{display:'grid', gap:12, fontSize:13}}>
            <div className="muted" style={{fontSize:12}}>Period · 03 May 2026</div>
            <div style={{display:'grid', gap:6}}>
              <div className="row-between"><span className="muted">Net sales</span><span className="num strong">₹4.84 L</span></div>
              <div className="row-between"><span className="muted">Bills</span><span className="num">342</span></div>
              <div className="row-between"><span className="muted">GST collected (CGST+SGST)</span><span className="num">₹38,420</span></div>
              <div className="row-between"><span className="muted">Discounts</span><span className="num delta-up">−₹14,280</span></div>
              <div className="row-between"><span className="muted">Refunds</span><span className="num delta-down">−₹18,420</span></div>
            </div>
            <div className="divider"></div>
            <div className="h4">Included sections</div>
            <div style={{display:'grid', gap:6, fontSize:12.5}}>
              {['Hourly sales heat-map','Cashier-wise sales','Method split (Cash/Card/UPI/Wallet)','Tax slab summary','Discount & promo usage','Refund reasons','HSN summary'].map(s=>(
                <div key={s} className="row" style={{gap:8}}><span className="check on"></span><span>{s}</span></div>
              ))}
            </div>
          </div>
          <div style={{display:'flex', gap:8, padding:14, borderTop:'1px solid var(--border-soft)'}}>
            <button className="btn btn-ghost btn-sm" style={{flex:1}} onClick={() => setFlow('pdf')}><Icon.Download size={12}/>PDF</button>
            <button className="btn btn-ghost btn-sm" style={{flex:1}} onClick={() => setFlow('xlsx')}><Icon.Download size={12}/>XLSX</button>
            <button className="btn btn-primary btn-sm" style={{flex:1}} onClick={() => setFlow('email')}><Icon.Mail size={12}/>Email</button>
          </div>
        </div>
      </div>

      <div className="two-col" style={{marginTop:16}}>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Scheduled reports</div>
          <div style={{display:'grid', gap:8, fontSize:12.5}}>
            {[['Daily Sales Summary','Daily 08:00 IST · pooja@store.in','daily'],['GST Output (GSTR-1)','Monthly · 1st by 09:00','monthly'],['Cashier Performance','Weekly · Mondays 09:00','weekly'],['Stock Valuation','Monthly · 1st by 02:00','monthly']].map(([n,s])=>(
              <div key={n} className="row-between" style={{padding:10, border:'1px solid var(--border-soft)', borderRadius:8}}><div><div className="strong">{n}</div><div className="muted" style={{fontSize:11}}>{s}</div></div><span className="pill pill-success"><span className="dot"></span>Active</span></div>
            ))}
          </div>
        </div>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Report audit log</div>
          <div className="muted" style={{fontSize:12, display:'grid', gap:6}}>
            <div>• 03 May 14:42 · Daily Sales emailed to pooja@</div>
            <div>• 03 May 02:00 · GST Output snapshot taken</div>
            <div>• 02 May 18:14 · Tax Audit Pack downloaded · Pooja Menon</div>
            <div>• 01 May 09:00 · Cashier Performance · weekly run</div>
            <div>• 30 Apr 14:21 · Custom range exported · 12 reports</div>
          </div>
        </div>
      </div>
      {flow && (
        <div style={{ position:'fixed', inset:0, background:'rgba(15,23,41,.38)', zIndex:40, display:'grid', placeItems:'center', padding:20 }}>
          <div className="card" style={{ width:'min(540px, 100%)', borderRadius:14, overflow:'hidden' }}>
            <div className="card-head"><h3>{({schedule:'Schedule report',generate:'Generate report',open:'Open report',pdf:'Download PDF',xlsx:'Download XLSX',email:'Email report'})[flow]}</h3><button className="icon-btn" onClick={()=>setFlow(null)}><Icon.X size={14}/></button></div>
            <div className="card-pad-lg"><div className="muted">Flow wired for <strong>{sel.name}</strong>.</div><div style={{display:'flex', justifyContent:'flex-end', marginTop:12}}><button className="btn btn-primary" onClick={()=>setFlow(null)}>Continue</button></div></div>
          </div>
        </div>
      )}
    </PageI>
  );
}

function Analytics() {
  const D = window.AppData;
  const Icon = window.Icon;
  const { DualAreaBar, AreaChart, HBar, Donut } = window.Charts;
  const [range, setRange] = useS5('30d');
  const t = {today:{s:'+12.4%',m:'37.8%',sku:'Indigo Kurta',risk:'4',rep:'48%',f:'₹5.2 L'},'7d':{s:'+8.2%',m:'38.1%',sku:'Maroon Saree',risk:'9',rep:'46%',f:'₹34 L'},'30d':{s:'+14.6%',m:'37.4%',sku:'Cotton Kurta',risk:'14',rep:'48%',f:'₹1.52 Cr'},month:{s:'+10.2%',m:'37.9%',sku:'Cotton Kurta',risk:'12',rep:'47%',f:'₹92 L'},custom:{s:'—',m:'—',sku:'—',risk:'—',rep:'—',f:'—'}}[range];
  return (
    <PageI title="Analytics" sub="Trends, margin, churn and forecasts" actions={
      <>
        <button className="btn btn-ghost"><Icon.Refresh size={14}/>Refresh</button>
        <button className="btn btn-ghost"><Icon.Download size={14}/>Export</button>
      </>
    }>
      <div className="kpi-grid" style={{marginBottom:14}}>
        <KI label="Sales growth" value={t.s} sub={<span>vs prior period</span>} accent/>
        <KI label="Gross margin" value={t.m} sub={<span>Target 40%</span>}/>
        <KI label="Top SKU" value={t.sku} sub={<span>318 units · ₹4.6 L</span>}/>
        <KI label="Inventory at risk" value={t.risk} sub={<span>Near-expiry SKUs</span>}/>
        <KI label="Repeat rate" value={t.rep} sub={<span className="delta-up">▲ 4% MoM</span>}/>
        <KI label="30-day forecast" value={t.f} sub={<span>±6% confidence</span>}/>
      </div>

      <div className="card card-pad" style={{marginBottom:14}}>
        <div className="row-between" style={{flexWrap:'wrap', gap:10}}>
          <div className="h3">Trend range</div>
          <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
            <div className="seg">
              {[['today','Today'],['7d','7 Days'],['30d','30 Days'],['month','This Month'],['custom','Custom']].map(([id,l])=>(
                <button key={id} className={range===id?'on':''} onClick={()=>setRange(id)}>{l}</button>
              ))}
            </div>
            <select className="btn btn-ghost"><option>Compare with: prior period</option><option>Last year</option></select>
            <select className="btn btn-ghost"><option>Breakdown: Category</option><option>Cashier</option><option>Method</option></select>
          </div>
        </div>
      </div>

      <div className="two-col" style={{marginBottom:14}}>
        <div className="card">
          <div className="card-head"><div><h3>Sales & profit trend</h3><div className="card-sub">Area: revenue · Bars: profit · ₹ in lakhs</div></div>
            <div className="legend"><span><span className="lg-dot" style={{background:'#0058BA'}}></span>Revenue</span><span><span className="lg-dot" style={{background:'#6C9FFF'}}></span>Profit</span></div></div>
          <div className="card-pad"><DualAreaBar data={D.MONTH_TREND} height={240}/></div>
        </div>
        <div className="card">
          <div className="card-head"><h3>Most sold products</h3><span className="muted" style={{fontSize:12}}>Last 30 days</span></div>
          <div className="card-pad" style={{display:'grid', gap:14}}>
            {D.TOP_PRODUCTS.map((p,i) => (
              <div key={i}>
                <div className="row-between" style={{marginBottom:4}}>
                  <div style={{minWidth:0, maxWidth:'70%'}}>
                    <div style={{fontSize:12.5, fontWeight:600}} className="truncate">{p.name}</div>
                    <div className="muted mono" style={{fontSize:10.5}}>{p.sku}</div>
                  </div>
                  <div className="num strong">{p.qty}<span className="muted" style={{fontSize:11, fontWeight:400}}> units</span></div>
                </div>
                <div style={{display:'flex', gap:8, alignItems:'center'}}>
                  <HBar value={p.qty} max={150}/>
                  <div className="muted mono" style={{fontSize:11, minWidth:80, textAlign:'right'}}>{D.fmtINR(p.rev)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="three-col" style={{marginBottom:14}}>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Margin by category</div>
          <div style={{display:'grid', gap:12, alignItems:'center', gridTemplateColumns:'auto 1fr'}}>
            <Donut value={37.8} max={50} size={120} label="37.8%" sub="Gross margin"/>
            <div style={{display:'grid', gap:6, fontSize:12.5}}>
              {[['Womens Ethnic','42.1%'],['Mens Ethnic','38.4%'],['Mens Western','34.2%'],['Beauty','28.6%'],['Footwear','40.8%'],['Accessories','46.2%']].map(([k,v])=>(
                <div key={k} className="row-between"><span>{k}</span><span className="num strong">{v}</span></div>
              ))}
            </div>
          </div>
        </div>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Hour-of-day footfall</div>
          <AreaChart data={[8,12,18,22,28,34,42,48,52,46,38,32,28,22,18,14]} height={140} color="#0058BA"/>
          <div className="muted" style={{fontSize:11, marginTop:6, display:'flex', justifyContent:'space-between'}}><span>10 AM</span><span>2 PM</span><span>6 PM</span><span>10 PM</span></div>
          <div className="divider"></div>
          <div className="row-between" style={{fontSize:12.5}}><span>Peak hour</span><span className="strong num">5–6 PM · 52 bills/hr</span></div>
        </div>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Method mix</div>
          <div style={{display:'grid', gap:10}}>
            {[['UPI',58,'#0058BA'],['Card',24,'#6C9FFF'],['Cash',12,'#A4C0F8'],['Wallet',4,'#D9E5F4'],['Split',2,'#EAF1FB']].map(([n,p,c])=>(
              <div key={n}>
                <div className="row-between" style={{fontSize:12.5, marginBottom:4}}><span>{n}</span><span className="num strong">{p}%</span></div>
                <div style={{height:6, background:'#EEF0F2', borderRadius:999, overflow:'hidden'}}><div style={{width:p+'%', height:'100%', background:c}}/></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="two-col">
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Actionable insights</div>
          <div style={{display:'grid', gap:10}}>
            {[
              {ic:'Truck',t:'Raise PO for Banarasi Dupatta',s:'Out of stock 12 hrs · est. lost ₹14K/day',cta:'Create PO',tone:'warn'},
              {ic:'Tag',t:'Promote 9 near-expiry SKUs',s:'Lakmé Lipstick · Argan Hair Oil · expires &lt; 90 days',cta:'Run promo',tone:'info'},
              {ic:'Users',t:'Add evening cashier',s:'5–7 PM peak gets 2.4 bills/min · queue forming',cta:'Schedule',tone:'warn'},
              {ic:'Heart',t:'Push offer to 612 lapsed customers',s:'90+ days · est. ₹3.2L revenue lift',cta:'Send offer',tone:'info'},
              {ic:'CardChip',t:'Review card payment failures',s:'Decline rate up 1.8% this week · check terminal',cta:'Investigate',tone:'danger'},
            ].map((a,i)=>{
              const Ic = Icon[a.ic];
              const cm = {warn:'var(--warning)', danger:'var(--danger)', info:'var(--brand-1)'};
              const bm = {warn:'var(--warning-soft)', danger:'var(--danger-soft)', info:'var(--brand-soft)'};
              return (
                <div key={i} style={{display:'flex', gap:10, alignItems:'center', padding:10, border:'1px solid var(--border-soft)', borderRadius:10}}>
                  <div style={{width:32, height:32, borderRadius:8, background:bm[a.tone], color:cm[a.tone], display:'grid', placeItems:'center', flex:'none'}}><Ic size={14}/></div>
                  <div style={{flex:1, minWidth:0}}><div style={{fontSize:13, fontWeight:600}}>{a.t}</div><div className="muted" style={{fontSize:11.5}}>{a.s}</div></div>
                  <button className="btn btn-soft btn-sm">{a.cta}</button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Operational signals</div>
          <div style={{display:'grid', gap:10, fontSize:12.5}}>
            <div className="row-between"><span className="muted">Best cashier</span><span className="strong">Aarav Pillai · ₹1.84 L · 31 bills</span></div>
            <div className="row-between"><span className="muted">Busiest counter</span><span className="strong">Counter 2 · 5–7 PM</span></div>
            <div className="row-between"><span className="muted">Top tender</span><span className="strong">UPI · 58% of value</span></div>
            <div className="row-between"><span className="muted">Category lift</span><span className="strong delta-up">Womens Ethnic +18%</span></div>
            <div className="row-between"><span className="muted">Lost-sales risk</span><span className="strong delta-down">~₹42K (out-of-stock)</span></div>
            <div className="row-between"><span className="muted">Churn risk (Gold)</span><span className="strong delta-down">42 customers</span></div>
            <div style={{padding:12, background:'linear-gradient(135deg, rgba(0,88,186,.04), rgba(108,159,255,.06))', border:'1px solid #D9E5F4', borderRadius:10}}>
              <div className="h4" style={{marginBottom:4}}>Suggested action</div>
              <div style={{fontSize:13}}>Run a 3-day "Gold Tier 2x points" weekend campaign and reorder Banarasi Dupatta + 2 saree SKUs.</div>
              <div className="muted" style={{fontSize:11.5, marginTop:4}}>Expected impact: +₹2.4 L revenue · +6% repeat rate</div>
            </div>
          </div>
        </div>
      </div>
    </PageI>
  );
}

window.Screens5 = { Reports, Analytics };


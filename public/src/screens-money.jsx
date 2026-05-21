// Payments, Expenses
const { useState: useS4 } = React;

const PageM = ({ title, sub, actions, children }) => (
  <div className="main">
    <div className="page-head">
      <div><div className="page-title">{title}</div>{sub && <div className="page-sub">{sub}</div>}</div>
      {actions && <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>{actions}</div>}
    </div>
    {children}
  </div>
);
const KM = ({ label, value, sub, accent }) => (
  <div className={"kpi "+(accent?'accent':'')}><div className="kpi-label">{label}</div><div className="kpi-value num">{value}</div>{sub && <div className="kpi-sub">{sub}</div>}</div>
);

function Payments() {
  const D = window.AppData;
  const Icon = window.Icon;
  const [sel, setSel] = useS4(D.PAYMENTS[0]);
  const [flow, setFlow] = useS4(null);
  const statusPill = s => ({Captured:'pill-success', Pending:'pill-warning', Failed:'pill-danger', Refunded:'pill-info', 'In drawer':'pill-neutral'}[s]||'pill-neutral');

  return (
    <PageM title="Payments" sub="Collection, settlement and reconciliation" actions={
      <>
        <button className="btn btn-ghost" onClick={() => setFlow('export')}><Icon.Download size={14}/>Export CSV</button>
        <button className="btn btn-primary" onClick={() => setFlow('settle')}><Icon.Refresh size={14}/>Run Settlement</button>
      </>
    }>
      <div className="kpi-grid" style={{marginBottom:14}}>
        <KM label="Today collected" value="₹4.84 L" sub={<span>342 transactions</span>} accent/>
        <KM label="UPI settlement" value="₹2.18 L" sub={<span>Expected today by 8 PM</span>}/>
        <KM label="Card batch" value="₹1.62 L" sub={<span>Closes at 23:00 · HDFC Pinelabs</span>}/>
        <KM label="Cash drawer" value="₹50,240" sub={<span>3 counters · −₹140 var</span>}/>
        <KM label="Failed payments" value="3" sub={<span className="delta-down">UPI timeout × 2, Card decline × 1</span>}/>
        <KM label="Refund payouts" value="₹18.4 K" sub={<span>11 today · 4 pending</span>}/>
      </div>

      <div className="row-between" style={{marginBottom:12, flexWrap:'wrap', gap:8}}>
        <div className="tabs">
          <div className="tab active">All payments</div>
          <div className="tab">UPI</div>
          <div className="tab">Card</div>
          <div className="tab">Cash</div>
          <div className="tab">Wallet</div>
          <div className="tab">Failed</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <select className="btn btn-ghost"><option>Today</option><option>Yesterday</option></select>
          <div style={{position:'relative'}}>
            <Icon.Search size={14} style={{position:'absolute', left:10, top:11, color:'var(--muted)'}}/>
            <input placeholder="Invoice, customer, UTR" style={{height:36, padding:'0 10px 0 30px', border:'1px solid var(--border)', borderRadius:8, background:'white'}}/>
          </div>
        </div>
      </div>

      <div className="list-detail">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Payment</th><th>Invoice</th><th>Customer</th><th>Method</th><th className="right">Amount</th><th>Settlement</th><th>Status</th></tr></thead>
            <tbody>
              {D.PAYMENTS.map(p => (
                <tr key={p.id} className={sel.id===p.id?'selected':''} onClick={()=>setSel(p)} style={{cursor:'pointer'}}>
                  <td className="mono strong" style={{fontSize:12}}>{p.id}</td>
                  <td className="mono" style={{fontSize:12}}>{p.inv}</td>
                  <td>{p.cust}</td>
                  <td>{p.method}</td>
                  <td className="right num strong">{D.fmtINRRaw(p.amount)}</td>
                  <td className="muted" style={{fontSize:12}}>{p.settle}</td>
                  <td><span className={"pill "+statusPill(p.status)}><span className="dot"></span>{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-head"><div><h3 className="mono">{sel.id}</h3><div className="muted" style={{fontSize:12}}>{sel.method} · {sel.inv}</div></div><span className={"pill "+statusPill(sel.status)}>{sel.status}</span></div>
          <div className="card-pad" style={{display:'grid', gap:12, fontSize:13}}>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
              <div><div className="muted" style={{fontSize:11}}>Customer</div><div className="strong">{sel.cust}</div></div>
              <div><div className="muted" style={{fontSize:11}}>Amount</div><div className="num strong">{D.fmtINRRaw(sel.amount)}</div></div>
              <div><div className="muted" style={{fontSize:11}}>Reference / UTR</div><div className="mono" style={{fontSize:11.5}}>{sel.utr}</div></div>
              <div><div className="muted" style={{fontSize:11}}>Settlement</div><div>{sel.settle}</div></div>
            </div>
            <div className="divider"></div>
            <div className="h4">Reconciliation checklist</div>
            <div style={{display:'grid', gap:8, fontSize:12.5}}>
              {[['Captured at gateway',true],['Posted to ledger',true],['Matched to invoice',true],['Settled to bank',sel.status==='Captured'?false:false],['Refund initiated',sel.status==='Refunded']].map(([k,v],i)=>(
                <div key={i} className="row" style={{gap:8}}><span className={"check "+(v?'on':'')}></span><span>{k}</span></div>
              ))}
            </div>
            <div className="divider"></div>
            <div className="h4">Payment trail</div>
            <div className="muted" style={{fontSize:12, display:'grid', gap:4}}>
              <div>• 14:42 · Initiated at counter C-1</div>
              <div>• 14:42 · {sel.method} captured</div>
              <div>• 14:43 · Posted to invoice {sel.inv}</div>
            </div>
          </div>
          <div style={{display:'flex', gap:8, padding:14, borderTop:'1px solid var(--border-soft)'}}>
            <button className="btn btn-ghost btn-sm" style={{flex:1}} onClick={() => setFlow('receipt')}><Icon.Print size={12}/>Receipt</button>
            <button className="btn btn-ghost btn-sm" style={{flex:1}} onClick={() => setFlow('invoice')}>View invoice</button>
            {sel.status==='Failed' && <button className="btn btn-primary btn-sm" style={{flex:1}} onClick={() => setFlow('retry')}>Retry</button>}
          </div>
        </div>
      </div>

      <div className="three-col" style={{marginTop:16}}>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Payment method health</div>
          <div style={{display:'grid', gap:10}}>
            {[
              {n:'Cash',ok:true,d:'3 drawers · 1 mismatch'},
              {n:'Card · Pinelabs',ok:true,d:'Batch closes 23:00'},
              {n:'UPI QR · Razorpay',ok:true,d:'T+0 settlement'},
              {n:'Paytm Wallet',ok:true,d:'T+1 settlement'},
              {n:'Split pay',ok:true,d:'Card + UPI · 12 today'},
            ].map(m=>(
              <div key={m.n} className="row-between" style={{fontSize:12.5}}>
                <span>{m.n}</span>
                <span className="muted" style={{fontSize:11}}>{m.d}</span>
                <span className={"pill "+(m.ok?'pill-success':'pill-danger')}><span className="dot"></span>{m.ok?'Healthy':'Issue'}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Needs attention</div>
          <div style={{display:'grid', gap:8, fontSize:12.5}}>
            <div style={{padding:10, background:'var(--danger-soft)', borderRadius:8}}><strong style={{color:'#B91C1C'}}>3 failed UPI · ₹6,420</strong><div className="muted" style={{fontSize:11}}>Auto-retry sent · contact customer if &gt; 1 hr</div></div>
            <div style={{padding:10, background:'var(--warning-soft)', borderRadius:8}}><strong style={{color:'#B45309'}}>4 refunds awaiting payout</strong><div className="muted" style={{fontSize:11}}>Card refunds: T+5 working days</div></div>
            <div style={{padding:10, background:'var(--warning-soft)', borderRadius:8}}><strong style={{color:'#B45309'}}>Cash variance C-3 · −₹100</strong><div className="muted" style={{fontSize:11}}>Reason required from cashier</div></div>
          </div>
        </div>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Remove payment</div>
          <div className="muted" style={{fontSize:12.5, marginBottom:10}}>Voiding a payment reverses the bill to "Held" and restores stock. Allowed only within 30 minutes by Manager+.</div>
          <button className="btn btn-ghost btn-sm" style={{color:'var(--danger)', width:'100%'}} onClick={() => setFlow('void')}><Icon.Trash size={12}/>Void payment</button>
        </div>
      </div>
      {flow && (
        <div style={{ position:'fixed', inset:0, background:'rgba(15,23,41,.38)', zIndex:40, display:'grid', placeItems:'center', padding:20 }}>
          <div className="card" style={{ width:'min(520px, 100%)', borderRadius:14, overflow:'hidden' }}>
            <div className="card-head"><h3>{({export:'Export payments',settle:'Run settlement',receipt:'Print receipt',invoice:'View invoice',retry:'Retry payment',void:'Void payment'})[flow]}</h3><button className="icon-btn" onClick={()=>setFlow(null)}><Icon.X size={14}/></button></div>
            <div className="card-pad-lg"><div className="muted">Action flow for payment <span className="mono">{sel.id}</span> is wired.</div><div style={{display:'flex', justifyContent:'flex-end', marginTop:12}}><button className={"btn "+(flow==='void'?'btn-danger-ghost':'btn-primary')} onClick={()=>setFlow(null)}>Continue</button></div></div>
          </div>
        </div>
      )}
    </PageM>
  );
}

function Expenses() {
  const D = window.AppData;
  const Icon = window.Icon;
  const [sel, setSel] = useS4(D.EXPENSES[2]);
  const [flow, setFlow] = useS4(null);
  const statusPill = s => ({Approved:'pill-success', 'Pending approval':'pill-warning', Rejected:'pill-danger'}[s]||'pill-neutral');
  return (
    <PageM title="Expenses" sub="Store running expenses and approvals" actions={
      <>
        <button className="btn btn-ghost" onClick={() => setFlow('export')}><Icon.Download size={14}/>Export CSV</button>
        <button className="btn btn-primary" onClick={() => setFlow('add')}><Icon.Plus size={14}/>Add Expense</button>
      </>
    }>
      <div className="kpi-grid" style={{marginBottom:14}}>
        <KM label="Today expenses" value="₹1.32 L" sub={<span>8 entries</span>} accent/>
        <KM label="Petty cash" value="₹14,200" sub={<span>From counter drawer</span>}/>
        <KM label="Pending approval" value="3" sub={<span>₹17,700 total</span>}/>
        <KM label="Missing receipt" value="3" sub={<span className="delta-down">Upload required</span>}/>
        <KM label="Budget used (May)" value="62%" sub={<span>₹1.86 L of ₹3.00 L</span>}/>
        <KM label="Vendor bills" value="₹84,500" sub={<span>4 bills · 1 due</span>}/>
      </div>

      <div className="row-between" style={{marginBottom:12}}>
        <div className="seg"><button className="on">All</button><button>Pending</button><button>Approved</button><button>Petty cash</button><button>Vendor bills</button></div>
        <div style={{display:'flex', gap:8}}><select className="btn btn-ghost"><option>All categories</option></select><select className="btn btn-ghost"><option>All sources</option></select></div>
      </div>

      <div className="list-detail">
        <div className="table-wrap">
          <table>
            <thead><tr><th>ID</th><th>Category</th><th>Paid to</th><th className="right">Amount</th><th>Source</th><th>Receipt</th><th>Status</th></tr></thead>
            <tbody>
              {D.EXPENSES.map(e => (
                <tr key={e.id} className={sel.id===e.id?'selected':''} onClick={()=>setSel(e)} style={{cursor:'pointer'}}>
                  <td className="mono">{e.id}</td>
                  <td><div className="strong">{e.cat}</div><div className="muted" style={{fontSize:11}}>{e.date}</div></td>
                  <td>{e.to}</td>
                  <td className="right num strong">{D.fmtINRRaw(e.amount)}</td>
                  <td>{e.src}</td>
                  <td>{e.recv==='Yes' ? <span className="pill pill-success">Attached</span> : <span className="pill pill-warning">Missing</span>}</td>
                  <td><span className={"pill "+statusPill(e.status)}><span className="dot"></span>{e.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-head"><div><h3 className="mono">{sel.id}</h3><div className="muted" style={{fontSize:12}}>{sel.cat} · {sel.date}</div></div><span className={"pill "+statusPill(sel.status)}>{sel.status}</span></div>
          <div className="card-pad" style={{display:'grid', gap:12, fontSize:13}}>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
              <div><div className="muted" style={{fontSize:11}}>Amount</div><div className="num strong" style={{fontSize:18}}>{D.fmtINRRaw(sel.amount)}</div></div>
              <div><div className="muted" style={{fontSize:11}}>Paid to</div><div className="strong">{sel.to}</div></div>
              <div><div className="muted" style={{fontSize:11}}>Paid from</div><div>{sel.src}</div></div>
              <div><div className="muted" style={{fontSize:11}}>Receipt</div><div>{sel.recv==='Yes'?'Attached':'Not attached'}</div></div>
            </div>
            <div className="divider"></div>
            <div className="h4">Approval checklist</div>
            <div style={{display:'grid', gap:6, fontSize:12.5}}>
              <div className="row" style={{gap:8}}><span className="check on"></span><span>Logged by cashier</span></div>
              <div className="row" style={{gap:8}}><span className={"check "+(sel.recv==='Yes'?'on':'')}></span><span>Receipt uploaded</span></div>
              <div className="row" style={{gap:8}}><span className={"check "+(sel.status==='Approved'?'on':'')}></span><span>Manager approved</span></div>
              <div className="row" style={{gap:8}}><span className="check"></span><span>Posted to GL</span></div>
            </div>
          </div>
          <div style={{display:'flex', gap:8, padding:14, borderTop:'1px solid var(--border-soft)'}}>
            {sel.status==='Pending approval' ? (<>
              <button className="btn btn-ghost btn-sm" style={{flex:1, color:'var(--danger)'}} onClick={() => setFlow('reject')}>Reject</button>
              <button className="btn btn-ghost btn-sm" style={{flex:1}} onClick={() => setFlow('upload')}><Icon.Upload size={12}/>Upload</button>
              <button className="btn btn-primary btn-sm" style={{flex:1}} onClick={() => setFlow('approve')}><Icon.Check size={12}/>Approve</button>
            </>) : (<>
              <button className="btn btn-ghost btn-sm" style={{flex:1}} onClick={() => setFlow('print')}><Icon.Print size={12}/>Print</button>
              <button className="btn btn-ghost btn-sm" style={{flex:1}} onClick={() => setFlow('view')}><Icon.Eye size={12}/>View receipt</button>
            </>)}
          </div>
        </div>
      </div>

      <div className="three-col" style={{marginTop:16}}>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Monthly budget by category</div>
          <div style={{display:'grid', gap:10}}>
            {[['Rent',85000,85000],['Electricity',14200,18000],['Marketing',12000,30000],['Cleaning',4500,8000],['Repairs',6800,10000],['Packaging',8200,15000]].map(([n,u,b])=>(
              <div key={n}>
                <div className="row-between" style={{fontSize:12.5, marginBottom:4}}><span>{n}</span><span className="muted">{D.fmtINRRaw(u)} / {D.fmtINRRaw(b)}</span></div>
                <window.Charts.HBar value={u} max={b} color={u/b>0.9?'#EF4444':u/b>0.7?'#F59E0B':'var(--brand-grad)'}/>
              </div>
            ))}
          </div>
        </div>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Needs attention</div>
          <div style={{display:'grid', gap:8, fontSize:12.5}}>
            <div style={{padding:10, background:'var(--warning-soft)', borderRadius:8}}><strong style={{color:'#B45309'}}>3 missing receipts · ₹17,700</strong><div className="muted" style={{fontSize:11}}>Cleaning, snacks, marketing</div></div>
            <div style={{padding:10, background:'var(--warning-soft)', borderRadius:8}}><strong style={{color:'#B45309'}}>3 pending approvals</strong><div className="muted" style={{fontSize:11}}>Total ₹17,700</div></div>
            <div style={{padding:10, background:'var(--brand-soft)', borderRadius:8}}><strong style={{color:'var(--brand-1)'}}>Rent due · 06 May</strong><div className="muted" style={{fontSize:11}}>Sai Properties · ₹85,000</div></div>
          </div>
        </div>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Remove expense</div>
          <div className="muted" style={{fontSize:12.5, marginBottom:10}}>Deleting an expense reverses petty cash and ledger entries. Logged in audit trail.</div>
          <button className="btn btn-ghost btn-sm" style={{color:'var(--danger)', width:'100%'}} onClick={() => setFlow('delete')}><Icon.Trash size={12}/>Delete expense</button>
        </div>
      </div>
      {flow && (
        <div style={{ position:'fixed', inset:0, background:'rgba(15,23,41,.38)', zIndex:40, display:'grid', placeItems:'center', padding:20 }}>
          <div className="card" style={{ width:'min(520px, 100%)', borderRadius:14, overflow:'hidden' }}>
            <div className="card-head"><h3>{({export:'Export expenses',add:'Add expense',reject:'Reject expense',upload:'Upload receipt',approve:'Approve expense',print:'Print voucher',view:'View receipt',delete:'Delete expense'})[flow]}</h3><button className="icon-btn" onClick={()=>setFlow(null)}><Icon.X size={14}/></button></div>
            <div className="card-pad-lg"><div className="muted">Action flow for expense <span className="mono">{sel.id}</span> is wired.</div><div style={{display:'flex', justifyContent:'flex-end', marginTop:12}}><button className={"btn "+(flow==='delete'?'btn-danger-ghost':'btn-primary')} onClick={()=>setFlow(null)}>Continue</button></div></div>
          </div>
        </div>
      )}
    </PageM>
  );
}

window.Screens4 = { Payments, Expenses };


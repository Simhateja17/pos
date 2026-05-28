// Customers, Staff
const { useState: useS3 } = React;

const Page3 = ({ title, sub, actions, children }) => (
  <div className="main">
    <div className="page-head">
      <div><div className="page-title">{title}</div>{sub && <div className="page-sub">{sub}</div>}</div>
      {actions && <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>{actions}</div>}
    </div>
    {children}
  </div>
);
const K3 = ({ label, value, sub, accent }) => (
  <div className={"kpi "+(accent?'accent':'')}>
    <div className="kpi-label">{label}</div><div className="kpi-value num">{value}</div>{sub && <div className="kpi-sub">{sub}</div>}
  </div>
);

function Customers() {
  const D = window.AppData;
  const Icon = window.Icon;
  const [rows, setRows] = useS3(D.CUSTOMERS);
  const [sel, setSel] = useS3(D.CUSTOMERS[0]);
  const [tab, setTab] = useS3('all');
  const [segment, setSegment] = useS3('all');
  const [query, setQuery] = useS3('');
  const [flow, setFlow] = useS3(null);
  const [offerMsg, setOfferMsg] = useS3('Hi! You have an exclusive loyalty offer waiting in-store.');
  const [editName, setEditName] = useS3('');
  const [editPhone, setEditPhone] = useS3('');
  const [newName, setNewName] = useS3('');
  const [newPhone, setNewPhone] = useS3('');
  const [newEmail, setNewEmail] = useS3('');
  const tierPill = t => ({Gold:'pill-warning', Silver:'pill-neutral', Bronze:'pill-info'}[t]||'pill-neutral');
  const openEdit = (c) => {
    setEditName(c.name);
    setEditPhone(c.phone);
    setFlow('edit');
  };
  const openAdd = () => {
    setNewName('');
    setNewPhone('');
    setNewEmail('');
    setFlow('add');
  };
  const isInactive = (c) => /yesterday|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|jan|feb/i.test(c.lastVisit);
  const filtered = rows.filter((c) => {
    if (tab === 'loyal' && c.points <= 0) return false;
    if (tab === 'gold' && c.tier !== 'Gold') return false;
    if (tab === 'silver' && c.tier !== 'Silver') return false;
    if (tab === 'inactive' && !isInactive(c)) return false;
    if (tab === 'gift' && c.gift <= 0) return false;
    if (segment === 'gold' && c.tier !== 'Gold') return false;
    if (segment === 'silver' && c.tier !== 'Silver') return false;
    if (segment === 'bronze' && c.tier !== 'Bronze') return false;
    if (segment === 'gift' && c.gift <= 0) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.phone.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
  });
  const activeSel = filtered.find(c => c.id === sel?.id) || filtered[0] || null;
  const activeTabLabel = ({all:'All Customers', loyal:'Loyalty Members', gold:'Gold Tier', silver:'Silver Tier', inactive:'Inactive', gift:'Gift Card Users'})[tab];

  return (
    <Page3 title="Customers" sub="CRM, loyalty, gift cards and segments" actions={
      <>
        <button className="btn btn-ghost" onClick={() => setFlow('export')}><Icon.Download size={14}/>Export CSV</button>
        <button className="btn btn-primary" onClick={openAdd}><Icon.Plus size={14}/>Add Customer</button>
      </>
    }>
      <div className="kpi-grid" style={{marginBottom:14}}>
        <K3 label="Total customers" value="4,182" sub={<span>+128 this month</span>} accent/>
        <K3 label="Loyalty members" value="2,840" sub={<span>68% of base</span>}/>
        <K3 label="Gift card balance" value="₹84,500" sub={<span>122 active cards</span>}/>
        <K3 label="Active campaigns" value="3" sub={<span>Diwali · Bridal · Loyalty 2x</span>}/>
        <K3 label="Repeat rate" value="48%" sub={<span className="delta-up">▲ 4% MoM</span>}/>
        <K3 label="Inactive (90d+)" value="612" sub={<span>Re-engage candidates</span>}/>
      </div>

      <div className="row-between" style={{marginBottom:12, flexWrap:'wrap', gap:8}}>
        <div className="tabs">
          {[['all','All Customers'],['loyal','Loyalty Members'],['gold','Gold Tier'],['silver','Silver Tier'],['inactive','Inactive'],['gift','Gift Card Users']].map(([id,l])=>(
            <div key={id} className={"tab "+(tab===id?'active':'')} onClick={()=>setTab(id)}>{l}</div>
          ))}
        </div>
        <div style={{display:'flex', gap:8}}>
          <select className="btn btn-ghost" value={segment} onChange={(e)=>setSegment(e.target.value)}>
            <option value="all">All segments</option>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
            <option value="bronze">Bronze</option>
            <option value="gift">Gift card users</option>
          </select>
          <div style={{position:'relative'}}>
            <Icon.Search size={14} style={{position:'absolute', left:10, top:11, color:'var(--muted)'}}/>
            <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Name or phone" style={{height:36, padding:'0 10px 0 30px', border:'1px solid var(--border)', borderRadius:8, background:'white'}}/>
          </div>
        </div>
      </div>

      <div className="list-detail">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Customer</th><th>Phone</th><th>Tier</th><th className="right">Points</th><th className="right">Lifetime spend</th><th>Last visit</th></tr></thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} className={activeSel?.id===c.id?'selected':''} onClick={()=>setSel(c)} style={{cursor:'pointer'}}>
                  <td><div style={{display:'flex', gap:8, alignItems:'center'}}><div className="avatar" style={{width:28, height:28, fontSize:11}}>{c.name.split(' ').map(p=>p[0]).join('').slice(0,2)}</div><div><div className="strong">{c.name}</div><div className="muted" style={{fontSize:11}}>{c.email}</div></div></div></td>
                  <td className="mono" style={{fontSize:12}}>{c.phone}</td>
                  <td><span className={"pill "+tierPill(c.tier)}>{c.tier}</span></td>
                  <td className="right num">{c.points.toLocaleString('en-IN')}</td>
                  <td className="right num strong">{D.fmtINRRaw(c.spend)}</td>
                  <td className="muted">{c.lastVisit}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="6" style={{padding:'28px 14px', textAlign:'center', color:'var(--muted)'}}>No customers in {activeTabLabel.toLowerCase()} for current filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="card">
          {!activeSel && (
            <div className="card-pad" style={{color:'var(--muted)'}}>Select a customer to view details.</div>
          )}
          {activeSel && (
          <>
          <div className="card-head">
            <div style={{display:'flex', gap:10, alignItems:'center'}}>
              <div className="avatar" style={{width:40, height:40}}>{activeSel.name.split(' ').map(p=>p[0]).join('').slice(0,2)}</div>
              <div><h3>{activeSel.name}</h3><div className="muted" style={{fontSize:12}}>{activeSel.phone}</div></div>
            </div>
            <span className={"pill "+tierPill(activeSel.tier)}>{activeSel.tier}</span>
          </div>
          <div className="card-pad" style={{display:'grid', gap:12, fontSize:13}}>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
              <div><div className="muted" style={{fontSize:11}}>Loyalty points</div><div className="num strong" style={{fontSize:18}}>{activeSel.points.toLocaleString('en-IN')}</div></div>
              <div><div className="muted" style={{fontSize:11}}>Gift card balance</div><div className="num strong" style={{fontSize:18}}>{D.fmtINRRaw(activeSel.gift)}</div></div>
              <div><div className="muted" style={{fontSize:11}}>Lifetime spend</div><div className="num strong">{D.fmtINRRaw(activeSel.spend)}</div></div>
              <div><div className="muted" style={{fontSize:11}}>Avg. bill</div><div className="num strong">{D.fmtINRRaw(activeSel.avgBill)}</div></div>
              <div><div className="muted" style={{fontSize:11}}>Visits</div><div className="num strong">{activeSel.visits}</div></div>
              <div><div className="muted" style={{fontSize:11}}>Last visit</div><div className="strong">{activeSel.lastVisit}</div></div>
            </div>
            <div className="divider"></div>
            <div className="h4">Recent purchases</div>
            <div style={{display:'grid', gap:6, fontSize:12.5}}>
              <div className="row-between"><span>INV-24850 · 3 items</span><span className="num">₹4,280</span></div>
              <div className="row-between"><span>INV-24732 · 5 items</span><span className="num">₹8,640</span></div>
              <div className="row-between"><span>INV-24620 · 2 items</span><span className="num">₹2,140</span></div>
            </div>
          </div>
          <div style={{display:'flex', gap:8, padding:14, borderTop:'1px solid var(--border-soft)'}}>
            <button className="btn btn-ghost btn-sm" style={{flex:1}} onClick={() => openEdit(activeSel)}><Icon.Edit size={12}/>Edit</button>
            <button className="btn btn-ghost btn-sm" style={{flex:1}}><Icon.Heart size={12}/>Add points</button>
            <button className="btn btn-primary btn-sm" style={{flex:1}} onClick={() => setFlow('offer')}><Icon.Mail size={12}/>Send offer</button>
          </div>
          </>
          )}
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:14, marginTop:16}}>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:8}}>Loyalty program</div>
          <div className="muted" style={{fontSize:12, marginBottom:10}}>1 point per ₹100 spent. Tier upgrade at ₹50K (Silver) and ₹1.5L (Gold).</div>
          <div style={{display:'grid', gap:6, fontSize:12.5}}>
            <div className="row-between"><span>Points issued (30d)</span><span className="num strong">28,420</span></div>
            <div className="row-between"><span>Points redeemed (30d)</span><span className="num strong">14,180</span></div>
            <div className="row-between"><span>Liability</span><span className="num strong">₹2.84 L</span></div>
          </div>
          <button className="btn btn-soft btn-sm" style={{width:'100%', marginTop:10}}>Manage program</button>
        </div>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:8}}>Gift cards & campaigns</div>
          <div style={{display:'grid', gap:6, fontSize:12.5}}>
            <div className="row-between"><span>Active gift cards</span><span className="num strong">122</span></div>
            <div className="row-between"><span>Outstanding balance</span><span className="num strong">₹84,500</span></div>
            <div className="row-between"><span>Diwali Pre-launch</span><span className="pill pill-success">Live</span></div>
            <div className="row-between"><span>Bridal Trousseau</span><span className="pill pill-info">Scheduled</span></div>
          </div>
          <button className="btn btn-soft btn-sm" style={{width:'100%', marginTop:10}}>New campaign</button>
        </div>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:8}}>Segments needing action</div>
          <div style={{display:'grid', gap:8, fontSize:12.5}}>
            <div className="row-between" style={{padding:8, background:'var(--warning-soft)', borderRadius:8}}><span style={{color:'#B45309'}}>Lapsed Gold (60d+)</span><span className="num strong">42</span></div>
            <div className="row-between" style={{padding:8, background:'var(--brand-soft)', borderRadius:8}}><span style={{color:'var(--brand-1)'}}>Birthday this week</span><span className="num strong">18</span></div>
            <div className="row-between" style={{padding:8, background:'var(--success-soft)', borderRadius:8}}><span style={{color:'#047857'}}>Tier upgrade ready</span><span className="num strong">7</span></div>
          </div>
        </div>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:8}}>Remove customer</div>
          <div className="muted" style={{fontSize:12, marginBottom:10}}>Anonymise the profile per data policy. Bills and ledger remain intact under the customer ID.</div>
          <button className="btn btn-ghost btn-sm" style={{color:'var(--danger)', width:'100%'}}><Icon.Trash size={12}/>Anonymise & archive</button>
        </div>
      </div>
      {flow && (
        <div style={{ position:'fixed', inset:0, background:'rgba(15,23,41,.38)', zIndex:40, display:'grid', placeItems:'center', padding:20 }}>
          <div className="card" style={{ width:'min(560px, 100%)', borderRadius:14, overflow:'hidden' }}>
            <div className="card-head">
              <h3>{
                flow === 'export' ? 'Export customers' :
                flow === 'add' ? 'Add customer' :
                flow === 'edit' ? 'Edit customer' : 'Send offer'
              }</h3>
              <button className="icon-btn" onClick={() => setFlow(null)}><Icon.X size={14}/></button>
            </div>
            <div className="card-pad-lg" style={{display:'grid', gap:12}}>
              {flow === 'export' && (
                <>
                  <div className="muted">Export current customer view with active filters and segment selection.</div>
                  <div style={{display:'grid', gap:6}}>
                    <label className="row" style={{border:'1px solid var(--border)', borderRadius:8, padding:10}}><input type="radio" name="fmt" defaultChecked/> CSV (.csv)</label>
                    <label className="row" style={{border:'1px solid var(--border)', borderRadius:8, padding:10}}><input type="radio" name="fmt"/> Excel (.xlsx)</label>
                  </div>
                  <div className="row-between"><span className="pill pill-info">{filtered.length} records</span><button className="btn btn-primary" onClick={() => setFlow(null)}><Icon.Download size={13}/>Export now</button></div>
                </>
              )}
              {flow === 'add' && (
                <>
                  <div className="field"><label>Customer name</label><input value={newName} onChange={(e)=>setNewName(e.target.value)} placeholder="Enter full name"/></div>
                  <div className="field"><label>Phone</label><input value={newPhone} onChange={(e)=>setNewPhone(e.target.value)} placeholder="+91 ..."/></div>
                  <div className="field"><label>Email (optional)</label><input value={newEmail} onChange={(e)=>setNewEmail(e.target.value)} placeholder="name@email.com"/></div>
                  <div style={{display:'flex', justifyContent:'flex-end'}}><button className="btn btn-primary" onClick={() => {
                    if (!newName.trim() || !newPhone.trim()) return;
                    const n = { id: 'C' + Date.now(), name: newName.trim(), email: newEmail.trim() || '—', phone: newPhone.trim(), tier: 'Bronze', points: 0, spend: 0, gift: 0, avgBill: 0, visits: 0, lastVisit: 'Never' };
                    setRows([n, ...rows]); setSel(n); setFlow(null);
                  }}><Icon.Plus size={13}/>Add customer</button></div>
                </>
              )}
              {flow === 'edit' && activeSel && (
                <>
                  <div className="field"><label>Customer name</label><input value={editName} onChange={(e)=>setEditName(e.target.value)}/></div>
                  <div className="field"><label>Phone</label><input value={editPhone} onChange={(e)=>setEditPhone(e.target.value)}/></div>
                  <div style={{display:'flex', justifyContent:'flex-end'}}><button className="btn btn-primary" onClick={() => {
                    const next = rows.map(c => c.id === activeSel.id ? { ...c, name: editName.trim() || c.name, phone: editPhone.trim() || c.phone } : c);
                    setRows(next);
                    setSel(next.find(c => c.id === activeSel.id) || activeSel);
                    setFlow(null);
                  }}><Icon.Check size={13}/>Save changes</button></div>
                </>
              )}
              {flow === 'offer' && activeSel && (
                <>
                  <div className="muted">Campaign target: <strong>{activeSel.name}</strong> · {activeTabLabel}</div>
                  <div className="field"><label>Offer message</label><textarea value={offerMsg} onChange={(e)=>setOfferMsg(e.target.value)}/></div>
                  <div className="row-between"><span className="pill pill-neutral">Channel: SMS + WhatsApp</span><button className="btn btn-primary" onClick={() => setFlow(null)}><Icon.Mail size={13}/>Send offer</button></div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </Page3>
  );
}

function Staff() {
  const D = window.AppData;
  const Icon = window.Icon;
  const [sel, setSel] = useS3(D.STAFF[1]);
  const [flow, setFlow] = useS3(null);
  const statusPill = s => ({'On shift':'pill-success','Late clock-in':'pill-warning','Off shift':'pill-neutral'}[s]||'pill-neutral');
  return (
    <Page3 title="Staff" sub="Roster, shifts, roles and permissions" actions={
      <>
        <button className="btn btn-ghost" onClick={() => setFlow('schedule')}><Icon.Calendar size={14}/>Schedule Shift</button>
        <button className="btn btn-primary" onClick={() => setFlow('add')}><Icon.Plus size={14}/>Add Staff</button>
      </>
    }>
      <div className="kpi-grid" style={{marginBottom:14}}>
        <K3 label="Active staff" value="14" sub={<span>3 on shift now</span>} accent/>
        <K3 label="Late clock-ins" value="2" sub={<span>This week</span>}/>
        <K3 label="Open shifts" value="1" sub={<span>Evening · Counter 1</span>}/>
        <K3 label="Role issues" value="1" sub={<span>Anjali Rao · view only</span>}/>
        <K3 label="Cash variance" value="−₹140" sub={<span>2 cashiers</span>}/>
        <K3 label="Sales / staff today" value="₹52,800" sub={<span>avg · Aarav leads</span>}/>
      </div>

      <div className="row-between" style={{marginBottom:12}}>
        <div className="seg"><button className="on">All</button><button>On shift</button><button>Cashiers</button><button>Managers</button></div>
        <div style={{display:'flex', gap:8}}><select className="btn btn-ghost"><option>All shifts</option></select></div>
      </div>

      <div className="list-detail">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Staff</th><th>Role</th><th>Shift</th><th>Register</th><th>Clock-in</th><th>Status</th></tr></thead>
            <tbody>
              {D.STAFF.map(s => (
                <tr key={s.id} className={sel.id===s.id?'selected':''} onClick={()=>setSel(s)} style={{cursor:'pointer'}}>
                  <td><div style={{display:'flex', gap:8, alignItems:'center'}}><div className="avatar" style={{width:28, height:28, fontSize:11}}>{s.name.split(' ').map(p=>p[0]).join('')}</div><div><div className="strong">{s.name}</div><div className="muted" style={{fontSize:11}}>{s.id}</div></div></div></td>
                  <td>{s.role}</td>
                  <td className="muted" style={{fontSize:12}}>{s.shift}</td>
                  <td>{s.register}</td>
                  <td className="mono">{s.clock}</td>
                  <td><span className={"pill "+statusPill(s.status)}><span className="dot"></span>{s.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-head">
            <div style={{display:'flex', gap:10, alignItems:'center'}}>
              <div className="avatar" style={{width:40, height:40}}>{sel.name.split(' ').map(p=>p[0]).join('')}</div>
              <div><h3>{sel.name}</h3><div className="muted" style={{fontSize:12}}>{sel.role} · {sel.id}</div></div>
            </div>
            <span className={"pill "+statusPill(sel.status)}><span className="dot"></span>{sel.status}</span>
          </div>
          <div className="card-pad" style={{display:'grid', gap:12, fontSize:13}}>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
              <div><div className="muted" style={{fontSize:11}}>Phone</div><div className="mono">{sel.phone}</div></div>
              <div><div className="muted" style={{fontSize:11}}>Shift</div><div>{sel.shift}</div></div>
              <div><div className="muted" style={{fontSize:11}}>Register</div><div>{sel.register}</div></div>
              <div><div className="muted" style={{fontSize:11}}>Clock-in</div><div className="mono">{sel.clock}</div></div>
              <div><div className="muted" style={{fontSize:11}}>Sales today</div><div className="num strong">{D.fmtINRRaw(sel.sales)}</div></div>
              <div><div className="muted" style={{fontSize:11}}>Bills handled</div><div className="num strong">{sel.bills}</div></div>
              <div><div className="muted" style={{fontSize:11}}>Cash variance</div><div className={"num strong "+(sel.variance<0?'delta-down':'')}>{sel.variance===0?'₹0':D.fmtINRRaw(sel.variance)}</div></div>
              <div><div className="muted" style={{fontSize:11}}>Avg. ticket</div><div className="num strong">{sel.bills?D.fmtINRRaw(sel.sales/sel.bills):'—'}</div></div>
            </div>
            <div className="divider"></div>
            <div>
              <div className="h4" style={{marginBottom:6}}>Permissions</div>
              <div className="muted" style={{fontSize:12.5}}>{sel.perm}</div>
            </div>
          </div>
          <div style={{display:'flex', gap:8, padding:14, borderTop:'1px solid var(--border-soft)'}}>
            <button className="btn btn-ghost btn-sm" style={{flex:1}} onClick={() => setFlow('edit')}><Icon.Edit size={12}/>Edit</button>
            <button className="btn btn-ghost btn-sm" style={{flex:1}} onClick={() => setFlow('role')}>Change role</button>
            <button className="btn btn-primary btn-sm" style={{flex:1}} onClick={() => setFlow('end')}>End shift</button>
          </div>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:14, marginTop:16}}>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Shift coverage</div>
          <div style={{display:'grid', gap:8, fontSize:12.5}}>
            {[['Morning · 10-18','3 of 3','ok'],['Mid · 12-20','1 of 1','ok'],['Evening · 14-22','1 of 2','warn'],['Night · 18-22','—','off']].map(([s,c,t]) => (
              <div key={s} className="row-between"><span>{s}</span><span className={"pill "+(t==='ok'?'pill-success':t==='warn'?'pill-warning':'pill-neutral')}>{c}</span></div>
            ))}
          </div>
        </div>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Roles & permissions</div>
          <div style={{display:'grid', gap:6, fontSize:12.5}}>
            {['Cashier','Senior Cashier','Inventory Lead','Manager','Admin'].map(r=><div key={r} className="row-between"><span>{r}</span><span className="muted">{r==='Admin'?'2':r==='Manager'?'2':r==='Cashier'?'4':'3'} staff</span></div>)}
          </div>
          <button className="btn btn-soft btn-sm" style={{width:'100%', marginTop:10}} onClick={() => setFlow('perm')}>Edit permission matrix</button>
        </div>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Manager attention</div>
          <div style={{display:'grid', gap:8, fontSize:12.5}}>
            <div style={{padding:8, background:'var(--warning-soft)', borderRadius:8}}><strong style={{color:'#B45309'}}>Meera Desai · 8 min late</strong><div className="muted" style={{fontSize:11}}>3rd late clock-in this month</div></div>
            <div style={{padding:8, background:'var(--danger-soft)', borderRadius:8}}><strong style={{color:'#B91C1C'}}>Aarav · cash variance −₹120</strong><div className="muted" style={{fontSize:11}}>Reason pending</div></div>
          </div>
        </div>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Remove staff</div>
          <div className="muted" style={{fontSize:12.5, marginBottom:10}}>Off-board staff: revoke logins, settle pending shifts, archive payroll record.</div>
          <button className="btn btn-ghost btn-sm" style={{color:'var(--danger)', width:'100%'}} onClick={() => setFlow('offboard')}><Icon.Trash size={12}/>Off-board staff</button>
        </div>
      </div>
      {flow && (
        <div style={{ position:'fixed', inset:0, background:'rgba(15,23,41,.38)', zIndex:40, display:'grid', placeItems:'center', padding:20 }}>
          <div className="card" style={{ width:'min(560px, 100%)', borderRadius:14, overflow:'hidden' }}>
            <div className="card-head">
              <h3>{({schedule:'Schedule shift', add:'Add staff', edit:'Edit staff profile', role:'Change role', end:'End shift', perm:'Permission matrix', offboard:'Off-board staff'})[flow]}</h3>
              <button className="icon-btn" onClick={() => setFlow(null)}><Icon.X size={14}/></button>
            </div>
            <div className="card-pad-lg" style={{display:'grid', gap:12}}>
              <div className="muted">Action screen for <strong>{sel.name}</strong>. This flow is now wired in the Staff module.</div>
              <div style={{display:'flex', justifyContent:'flex-end'}}>
                <button className={"btn " + (flow==='offboard' ? 'btn-danger-ghost' : 'btn-primary')} onClick={() => setFlow(null)}>
                  {flow==='offboard' ? 'Confirm off-board' : 'Continue'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Page3>
  );
}

window.Screens3 = { Customers, Staff };


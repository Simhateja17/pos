// Clinical screens: Dashboard, Rx Queue, New Prescription, Pickup & Checkout, Returns

function Dashboard() {
  const D = window.AppData;
  const Icon = window.Icon;
  const { AreaChart, Donut, Spark } = window.Charts;

  const kpis = [
    { label:'Rx filled today', value:'142', sub:'+12% vs yesterday', deltaUp:true },
    { label:'In queue', value:'23', sub:'4 urgent', pill:'pill-warning' },
    { label:'Avg fill time', value:'8m 24s', sub:'Goal: under 10m', deltaUp:true },
    { label:'Ready for pickup', value:'37', sub:'14 over 24h', pill:'pill-brand' },
    { label:'Revenue (today)', value:'$8,420', sub:'+$640 vs yesterday', deltaUp:true },
    { label:'DIR exposure', value:'-$3,940', sub:'Projected · May', deltaDown:true },
  ];

  return (
    <div className="main">
      <div className="page-head">
        <div>
          <div className="page-title">Good morning, Dr. Vasquez</div>
          <div className="page-sub">Wednesday, May 21 · Mission Bay · Shift covered through 6:00 PM</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-ghost"><Icon.Print size={14}/> Daily handoff</button>
          <button className="btn btn-primary"><Icon.Plus size={14}/> New prescription</button>
        </div>
      </div>

      <div className="kpi-grid" style={{marginBottom:16}}>
        {kpis.map((k, i) => (
          <div key={i} className={"kpi " + (i === 0 ? 'accent' : '')}>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value num">{k.value}</div>
            <div className="kpi-sub">
              {k.deltaUp && <Icon.ArrowUp size={11}/>}{k.deltaDown && <Icon.ArrowDown size={11}/>}
              <span className={k.deltaUp ? 'delta-up' : (k.deltaDown ? 'delta-down' : '')}>{k.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-head">
            <div>
              <h3>Prescription volume · last 14 days</h3>
              <div className="card-sub">Total filled + Schedule II breakdown</div>
            </div>
            <div className="legend">
              <span><span className="lg-dot" style={{background:'var(--brand-1)'}}/>Total Rx</span>
              <span><span className="lg-dot" style={{background:'var(--warning)'}}/>C-II</span>
            </div>
          </div>
          <div className="card-pad">
            <AreaChart data={D.RX_VOLUME} valueKey="total" width={680} height={200}/>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <h3>Today’s queue</h3>
            <span className="pill pill-warning"><span className="dot"/>4 urgent</span>
          </div>
          <div style={{padding:'4px 8px 12px'}}>
            {[
              { stage:'Intake', count:4, c:'#98A29A', desc:'Awaiting data entry' },
              { stage:'Verify · DUR', count:3, c:'var(--info)', desc:'Drug-interaction check' },
              { stage:'Fill', count:5, c:'var(--warning)', desc:'Counting / robotics' },
              { stage:'Final check', count:3, c:'var(--purple)', desc:'Pharmacist verification' },
              { stage:'Ready', count:8, c:'var(--success)', desc:'In pickup bin' },
            ].map((s, i) => (
              <div key={i} className="status-row" style={{margin:'8px 0', border:'none', background:'transparent', padding:'8px 8px'}}>
                <span className="status-pip" style={{background:s.c}}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:13, fontWeight:600}}>{s.stage}</div>
                  <div style={{fontSize:11.5, color:'var(--muted)'}}>{s.desc}</div>
                </div>
                <div className="num" style={{fontWeight:700, fontSize:18}}>{s.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{height:16}}/>

      <div className="three-col">
        <div className="card">
          <div className="card-head">
            <h3>Alerts & exceptions</h3>
            <span className="pill pill-danger"><span className="dot"/>7 open</span>
          </div>
          <div style={{padding:'4px 8px 12px'}}>
            {[
              { icon:'Alert', tone:'danger', t:'Drug interaction flagged', s:'RX-78415 · Warfarin + Bactrim · James O’Brien' },
              { icon:'Alert', tone:'danger', t:'Out of stock', s:'Lipitor 80 mg · NDC 00006-0117-31 · backorder' },
              { icon:'Info',  tone:'warning', t:'PA required', s:'RX-78394 · Latanoprost · OptumRx · fax sent 09:14' },
              { icon:'Info',  tone:'warning', t:'Refrigerator excursion', s:'Fridge 2 · 1.2°F above range for 22 min on May 20' },
              { icon:'Info',  tone:'info',    t:'Refill due tomorrow', s:'4 patients on auto-refill plan · see list' },
            ].map((a, i) => {
              const I = Icon[a.icon];
              return (
                <div key={i} style={{display:'flex', gap:10, padding:'10px 8px', borderBottom: i < 4 ? '1px solid var(--border-soft)' : 'none'}}>
                  <span className={"pill pill-" + a.tone} style={{width:24, height:24, padding:0, justifyContent:'center', borderRadius:6}}>
                    <I size={13}/>
                  </span>
                  <div style={{minWidth:0}}>
                    <div style={{fontSize:13, fontWeight:600}}>{a.t}</div>
                    <div style={{fontSize:11.5, color:'var(--muted)'}}>{a.s}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <h3>Pickup board</h3>
            <span className="card-sub mono">37 waiting</span>
          </div>
          <div style={{padding:'10px 14px 14px'}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center', padding:'12px 0 16px'}}>
              <Donut pct={64} size={130} label="64%" sub="Picked up <24h"/>
            </div>
            <div className="grid" style={{gridTemplateColumns:'1fr 1fr', gap:10, fontSize:12.5}}>
              <div>
                <div className="muted" style={{fontSize:11}}>Average wait</div>
                <div className="strong num" style={{fontSize:16}}>4h 18m</div>
              </div>
              <div>
                <div className="muted" style={{fontSize:11}}>Over 7 days</div>
                <div className="strong num" style={{fontSize:16, color:'var(--danger)'}}>5</div>
              </div>
              <div>
                <div className="muted" style={{fontSize:11}}>Will-call A</div>
                <div className="strong num" style={{fontSize:16}}>21</div>
              </div>
              <div>
                <div className="muted" style={{fontSize:11}}>Will-call B</div>
                <div className="strong num" style={{fontSize:16}}>11</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <h3>Top dispensed · 30 day</h3>
            <span className="card-sub">By Rx count</span>
          </div>
          <div style={{padding:'4px 8px 12px'}}>
            {[
              { d:'Atorvastatin 20 mg', n:284, t:[12,14,11,16,18,19,17,21,22,24,23,25,24,28] },
              { d:'Metformin XR 1000', n:241, t:[11,12,14,15,16,15,17,18,17,19,18,20,21,22] },
              { d:'Lisinopril 10 mg', n:198, t:[8,9,10,11,11,12,13,14,14,15,16,17,18,18] },
              { d:'Levothyroxine 50 mcg', n:184, t:[10,11,12,12,13,14,14,15,15,16,16,17,18,19] },
              { d:'Amlodipine 5 mg', n:162, t:[9,9,10,10,11,11,12,12,13,13,14,14,15,15] },
            ].map((x, i) => (
              <div key={i} style={{display:'grid', gridTemplateColumns:'1fr auto auto', alignItems:'center', gap:14, padding:'10px 8px', borderBottom: i < 4 ? '1px solid var(--border-soft)' : 'none'}}>
                <div>
                  <div style={{fontSize:13, fontWeight:600}}>{x.d}</div>
                  <div style={{fontSize:11.5, color:'var(--muted)'}}>{x.n} dispensed</div>
                </div>
                <Spark data={x.t.map(v => ({total:v}))} width={80} height={28}/>
                <Icon.ArrowRight size={14}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RxQueue() {
  const D = window.AppData;
  const Icon = window.Icon;
  const stages = [
    { key:'intake', label:'Intake', desc:'Awaiting entry', tone:'#98A29A' },
    { key:'verify', label:'Verify · DUR', desc:'Pharmacist review', tone:'var(--info)' },
    { key:'fill', label:'Fill', desc:'Counting / robotics', tone:'var(--warning)' },
    { key:'check', label:'Final check', desc:'Pharmacist sign-off', tone:'var(--purple)' },
    { key:'ready', label:'Ready', desc:'Will-call bin', tone:'var(--success)' },
  ];
  return (
    <div className="main">
      <div className="page-head">
        <div>
          <div className="page-title">Rx Queue</div>
          <div className="page-sub">Real-time workflow board · drag a card to advance · <span className="key">N</span> new <span className="key">F</span> filter <span className="key">/</span> search</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <div className="tabs">
            <div className="tab active">All</div>
            <div className="tab">Mine</div>
            <div className="tab">Urgent</div>
            <div className="tab">C-II</div>
            <div className="tab">PA pending</div>
          </div>
          <button className="btn btn-ghost"><Icon.Filter size={14}/> Filter</button>
          <button className="btn btn-primary"><Icon.Plus size={14}/> New Rx</button>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'repeat(5, minmax(0,1fr))', gap:12}}>
        {stages.map(s => {
          const items = D.RX_QUEUE[s.key] || [];
          return (
            <div key={s.key} className="queue-col">
              <div className="queue-head">
                <div style={{display:'flex', alignItems:'center', gap:8}}>
                  <span style={{width:8, height:8, borderRadius:50, background:s.tone}}/>
                  <span className="ttl">{s.label}</span>
                </div>
                <span className="ct">{items.length}</span>
              </div>
              <div style={{fontSize:11, color:'var(--muted)', padding:'0 4px 4px'}}>{s.desc}</div>
              {items.map(r => (
                <div key={r.id} className={"rx-card " + s.key}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div className="rx-pt">{r.pt}</div>
                    <span className="mono" style={{fontSize:10.5, color:'var(--muted-2)'}}>{r.id}</span>
                  </div>
                  <div className="rx-drug">{r.drug} <span className="muted">· {r.qty}</span></div>
                  <div className="rx-meta">
                    <span>{r.prescriber}</span>
                    <span>·</span>
                    <span>{r.recv}</span>
                  </div>
                  <div style={{display:'flex', gap:6, marginTop:4, flexWrap:'wrap'}}>
                    {r.priority === 'urgent' && <span className="pill pill-danger">Urgent</span>}
                    {r.tag === 'C-II' && <span className="pill pill-purple">C-II</span>}
                    {r.tag === 'eRx' && <span className="pill pill-neutral">eRx</span>}
                    {r.tag === 'phone' && <span className="pill pill-warning">Phone</span>}
                    {r.tag === 'refill' && <span className="pill pill-brand">Refill</span>}
                    {r.interactions && <span className="pill pill-danger"><Icon.Alert size={10}/> DUR</span>}
                    {r.bin && <span className="pill pill-success">Bin {r.bin}</span>}
                    {r.station && <span className="pill pill-info">{r.station}</span>}
                  </div>
                </div>
              ))}
              <div className="empty-tile" style={{marginTop:'auto'}}>+ drag here</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NewRx() {
  const Icon = window.Icon;
  return (
    <div className="main">
      <div className="page-head">
        <div>
          <div className="page-title">New Prescription</div>
          <div className="page-sub">Entry workflow · keyboard-first · <span className="key">Tab</span> next field <span className="key">⌘S</span> save & verify</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-ghost">Save draft</button>
          <button className="btn btn-primary">Save & queue for verify <Icon.ArrowRight size={14}/></button>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 360px', gap:16}}>
        <div className="card card-pad-lg">
          <div className="h4" style={{marginBottom:12}}>Patient</div>
          <div className="grid" style={{gridTemplateColumns:'2fr 1fr 1fr', gap:12}}>
            <div className="field"><label>Patient (search MRN, name, DOB)</label><input defaultValue="Margaret Chen — P-100482 — DOB 1958-03-14"/></div>
            <div className="field"><label>Age / Sex</label><input defaultValue="67 / F" readOnly/></div>
            <div className="field"><label>Insurance plan</label><input defaultValue="Medicare Part D · Humana" readOnly/></div>
          </div>
          <div style={{display:'flex', gap:8, marginTop:10, flexWrap:'wrap'}}>
            <span className="pill pill-warning"><Icon.Alert size={10}/> Allergy: Penicillin</span>
            <span className="pill pill-warning"><Icon.Alert size={10}/> Allergy: Sulfa</span>
            <span className="pill pill-info">7 active Rx</span>
            <span className="pill pill-brand">Adherence 94%</span>
          </div>

          <div className="divider"/>

          <div className="h4" style={{marginBottom:12}}>Prescriber</div>
          <div className="grid" style={{gridTemplateColumns:'2fr 1fr 1fr', gap:12}}>
            <div className="field"><label>Prescriber</label><input defaultValue="Dr. Rashida Okafor"/></div>
            <div className="field"><label>NPI</label><input defaultValue="1497582034" className="mono"/></div>
            <div className="field"><label>DEA</label><input defaultValue="BO4827193" className="mono"/></div>
          </div>

          <div className="divider"/>

          <div className="h4" style={{marginBottom:12}}>Medication</div>
          <div className="grid" style={{gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:12}}>
            <div className="field"><label>Drug (search NDC, name, strength)</label><input defaultValue="Lisinopril 10 mg tablet — NDC 00781-1410-01"/></div>
            <div className="field"><label>Quantity</label><input defaultValue="30" className="mono"/></div>
            <div className="field"><label>Days supply</label><input defaultValue="30" className="mono"/></div>
            <div className="field"><label>Refills</label><input defaultValue="5" className="mono"/></div>
          </div>
          <div className="grid" style={{gridTemplateColumns:'1fr 1fr 1fr', gap:12, marginTop:12}}>
            <div className="field"><label>SIG</label><input defaultValue="Take 1 tablet by mouth daily"/></div>
            <div className="field"><label>DAW</label>
              <select defaultValue="0"><option value="0">0 — Generic OK</option><option>1 — Substitution not allowed</option><option>2 — Patient requested brand</option></select>
            </div>
            <div className="field"><label>Date written</label><input defaultValue="2026-05-21" className="mono"/></div>
          </div>

          <div className="divider"/>

          <div className="h4" style={{marginBottom:12}}>Drug utilization review</div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
            {[
              { ok:true, t:'No drug-drug interactions', s:'Cross-checked against 7 active medications' },
              { ok:true, t:'No allergy conflict', s:'Penicillin, Sulfa — not in chain' },
              { ok:true, t:'Dose within range', s:'10 mg/day · max 80 mg/day' },
              { ok:true, t:'Duplicate therapy clear', s:'No other ACE-I on profile' },
            ].map((d, i) => (
              <div key={i} style={{display:'flex', gap:10, padding:'10px 12px', border:'1px solid var(--border)', borderRadius:10}}>
                <span className="pill pill-success" style={{width:22, height:22, padding:0, justifyContent:'center', borderRadius:6}}><Icon.Check size={12}/></span>
                <div>
                  <div style={{fontSize:13, fontWeight:600}}>{d.t}</div>
                  <div style={{fontSize:11.5, color:'var(--muted)'}}>{d.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid">
          <div className="card card-pad">
            <div className="h4" style={{marginBottom:10}}>Insurance preview</div>
            <div className="row-between" style={{padding:'6px 0'}}><span className="muted">Billed</span><span className="num strong">$12.10</span></div>
            <div className="row-between" style={{padding:'6px 0'}}><span className="muted">Plan pays</span><span className="num strong" style={{color:'var(--success)'}}>$9.80</span></div>
            <div className="row-between" style={{padding:'6px 0'}}><span className="muted">Patient copay</span><span className="num strong">$2.30</span></div>
            <div className="divider"/>
            <div className="row-between" style={{padding:'6px 0'}}><span className="muted">DIR projected</span><span className="num" style={{color:'var(--danger)'}}>-$1.20</span></div>
            <div className="row-between" style={{padding:'6px 0'}}><span className="muted">Margin</span><span className="num strong">$5.40</span></div>
            <button className="btn btn-soft" style={{width:'100%', justifyContent:'center', marginTop:10}}>Adjudicate now</button>
          </div>

          <div className="card card-pad">
            <div className="h4" style={{marginBottom:10}}>Stock</div>
            <div style={{display:'flex', alignItems:'center', gap:12}}>
              <Donut pct={78} size={84} label="312" sub="on hand"/>
              <div style={{fontSize:12.5, lineHeight:1.7}}>
                <div><span className="muted">Location</span> <span className="strong mono">A-04</span></div>
                <div><span className="muted">Par</span> <span className="strong mono">200</span></div>
                <div><span className="muted">Expiry</span> <span className="strong mono">2027-03</span></div>
                <div><span className="muted">Source</span> <span className="strong">Robot A</span></div>
              </div>
            </div>
          </div>

          <div className="card card-pad">
            <div className="h4" style={{marginBottom:8}}>Counsel notes</div>
            <div className="field"><textarea placeholder="May cause dizziness on first dose. Avoid potassium supplements. Monitor BP weekly for first month."/></div>
            <div className="row" style={{marginTop:8, gap:6}}>
              <button className="btn btn-ghost btn-sm">Insert template</button>
              <button className="btn btn-ghost btn-sm">Send via SMS</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Checkout() {
  const Icon = window.Icon;
  const ready = window.AppData.RX_QUEUE.ready;
  const items = ready.slice(0, 3);
  const subtotal = 142.40, copay = 16.80, otc = 12.99, tax = 1.04, total = copay + otc + tax;
  return (
    <div className="main">
      <div className="bill-grid">
        <div className="card" style={{display:'flex', flexDirection:'column', minWidth:0}}>
          <div className="card-head">
            <div>
              <h3>Pickup — Margaret Chen <span className="mono muted" style={{fontWeight:500, fontSize:12, marginLeft:8}}>P-100482</span></h3>
              <div className="card-sub">DOB 1958-03-14 · Medicare Part D · Humana · Caregiver pickup allowed</div>
            </div>
            <div style={{display:'flex', gap:8}}>
              <button className="btn btn-ghost btn-sm"><Icon.Phone size={12}/> Call</button>
              <button className="btn btn-ghost btn-sm"><Icon.File size={12}/> Profile</button>
            </div>
          </div>

          <div style={{padding:'14px 16px', display:'flex', gap:8, flexWrap:'wrap'}}>
            <span className="pill pill-warning"><Icon.Alert size={10}/> Penicillin allergy</span>
            <span className="pill pill-brand">7 active Rx</span>
            <span className="pill pill-success">Adherence 94%</span>
            <span className="pill pill-info">HIPAA acknowledged 2024-11</span>
          </div>

          <div style={{padding:'4px 16px 16px', flex:1, overflowY:'auto'}}>
            <div className="h4" style={{margin:'8px 0'}}>Prescriptions ready ({items.length})</div>
            <div style={{display:'flex', flexDirection:'column', gap:10}}>
              {items.map((r, i) => (
                <div key={r.id} className="card" style={{padding:14, display:'grid', gridTemplateColumns:'auto 1fr auto auto', gap:14, alignItems:'center'}}>
                  <div className="chk on"/>
                  <div>
                    <div style={{fontWeight:600, fontSize:14}}>{r.drug} <span className="muted" style={{fontWeight:500}}>· {r.qty}</span></div>
                    <div style={{fontSize:11.5, color:'var(--muted)', marginTop:2}}>
                      <span className="mono">{r.id}</span> · {r.prescriber} · Bin {r.bin}
                    </div>
                    <div style={{fontSize:11, color:'var(--muted-2)', marginTop:2}}>SIG: Take 1 tablet by mouth daily</div>
                  </div>
                  <div className="right">
                    <div className="num strong">${(8.20 + i*1.4).toFixed(2)}</div>
                    <div className="muted" style={{fontSize:11}}>copay</div>
                  </div>
                  <button className="btn btn-ghost btn-icon"><Icon.More size={14}/></button>
                </div>
              ))}
            </div>

            <div className="h4" style={{margin:'18px 0 8px'}}>Add to order</div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:10}}>
              {[
                { n:'OTC: Tylenol Extra 100ct', p:'$12.99', tag:'OTC' },
                { n:'OTC: Multivitamin 90ct', p:'$9.49', tag:'FSA' },
                { n:'Pill organizer 7-day', p:'$6.20', tag:'OTC' },
                { n:'Blood-pressure cuff', p:'$28.00', tag:'HSA' },
              ].map((p, i) => (
                <div key={i} style={{border:'1px solid var(--border)', borderRadius:10, padding:12, cursor:'pointer'}}>
                  <div className="img-ph" style={{height:60, marginBottom:8}}>{p.n.split(':')[0]}</div>
                  <div style={{fontSize:12.5, fontWeight:600}}>{p.n.split(':').slice(-1)[0].trim()}</div>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:6}}>
                    <span className="num strong" style={{fontSize:13}}>{p.p}</span>
                    <span className={"pill " + (p.tag==='FSA'?'pill-info':(p.tag==='HSA'?'pill-purple':'pill-neutral'))}>{p.tag}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="h4" style={{margin:'18px 0 8px'}}>Signature · HIPAA & Rx pickup</div>
            <div style={{height:120, border:'1px dashed var(--border)', borderRadius:10, display:'grid', placeItems:'center', background:'#FAFCFA'}}>
              <div className="serif" style={{fontStyle:'italic', fontSize:32, color:'var(--brand-1)'}}>Margaret Chen</div>
            </div>
            <div style={{fontSize:11.5, color:'var(--muted)', marginTop:6}}>Signed 10:14 AM · device WACOM-3 · acknowledges receipt of medication & counseling offered</div>
          </div>
        </div>

        <div className="card" style={{display:'flex', flexDirection:'column'}}>
          <div className="card-head">
            <h3>Payment</h3>
            <span className="mono muted" style={{fontSize:12}}>Register 2 · Robin C.</span>
          </div>
          <div style={{padding:'14px 16px', flex:1}}>
            <div className="row-between" style={{padding:'8px 0'}}><span className="muted">Rx copay (3)</span><span className="num strong">${copay.toFixed(2)}</span></div>
            <div className="row-between" style={{padding:'8px 0'}}><span className="muted">OTC items</span><span className="num strong">${otc.toFixed(2)}</span></div>
            <div className="row-between" style={{padding:'8px 0'}}><span className="muted">Tax (Rx exempt)</span><span className="num strong">${tax.toFixed(2)}</span></div>
            <div className="divider"/>
            <div className="row-between" style={{padding:'8px 0'}}><span className="strong">Patient owes</span><span className="num" style={{fontSize:22, fontWeight:700}}>${total.toFixed(2)}</span></div>
            <div className="row-between" style={{padding:'4px 0'}}><span className="muted">Billed to plan</span><span className="num">${subtotal.toFixed(2)}</span></div>

            <div className="h4" style={{margin:'14px 0 8px'}}>Tender</div>
            <div className="grid" style={{gridTemplateColumns:'1fr 1fr', gap:8}}>
              {['Credit card','Debit / PIN','FSA / HSA','Cash','Check','Gift card'].map((t, i) => (
                <button key={i} className={"btn " + (i === 2 ? 'btn-primary' : 'btn-ghost')} style={{justifyContent:'center', height:44}}>{t}</button>
              ))}
            </div>

            <div className="h4" style={{margin:'14px 0 8px'}}>FSA · IIAS eligibility</div>
            <div className="card" style={{padding:'10px 12px', borderColor:'var(--brand-soft)', background:'var(--brand-soft-2)'}}>
              <div className="row-between"><span className="strong" style={{fontSize:12.5}}>2 eligible items detected</span><span className="pill pill-success">$22.48</span></div>
              <div style={{fontSize:11.5, color:'var(--muted)', marginTop:4}}>Multivitamin · BP cuff — auto-tagged from IIAS catalog</div>
            </div>

            <div className="h4" style={{margin:'14px 0 8px'}}>Counsel offer</div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
              <button className="btn btn-ghost" style={{justifyContent:'center'}}>Offered · accepted</button>
              <button className="btn btn-ghost" style={{justifyContent:'center'}}>Offered · declined</button>
            </div>
          </div>

          <div style={{padding:14, borderTop:'1px solid var(--border-soft)', display:'flex', gap:10}}>
            <button className="btn btn-ghost" style={{flex:1, justifyContent:'center'}}>Hold</button>
            <button className="btn btn-primary" style={{flex:2, justifyContent:'center', height:44, fontSize:14}}>Charge ${total.toFixed(2)} <Icon.ArrowRight size={14}/></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Returns() {
  const Icon = window.Icon;
  return (
    <div className="main">
      <div className="page-head">
        <div>
          <div className="page-title">Returns & Reverse Claims</div>
          <div className="page-sub">Reverse a PBM adjudication, restock, and refund — single workflow.</div>
        </div>
        <button className="btn btn-primary"><Icon.Plus size={14}/> New return</button>
      </div>

      <div className="card">
        <div className="card-head">
          <div className="tabs">
            <div className="tab active">Pending (3)</div>
            <div className="tab">Processed (18)</div>
            <div className="tab">Disputed (1)</div>
          </div>
          <div className="row">
            <div className="seg"><button className="on">Today</button><button>7d</button><button>30d</button></div>
          </div>
        </div>
        <div className="table-wrap" style={{borderRadius:0, border:'none', boxShadow:'none'}}>
          <table>
            <thead><tr><th>Return ID</th><th>Original Rx</th><th>Patient</th><th>Drug</th><th>Reason</th><th className="right">Refund</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {[
                { id:'RTN-2014', rx:'RX-78320', pt:'Daniel Rivera', dr:'Atorvastatin 20 mg', rsn:'Adverse reaction', amt:38.20, st:'pending' },
                { id:'RTN-2013', rx:'RX-78298', pt:'Olivia Park', dr:'Amoxicillin 500 mg', rsn:'Wrong strength', amt:14.40, st:'pending' },
                { id:'RTN-2012', rx:'RX-78284', pt:'Henrik Vogel', dr:'Eliquis 5 mg', rsn:'Not picked up · 14d', amt:218.40, st:'pending' },
                { id:'RTN-2011', rx:'RX-78262', pt:'Bashir Idris', dr:'Pantoprazole 40 mg', rsn:'Therapy changed', amt:24.10, st:'processed' },
              ].map(r => (
                <tr key={r.id}>
                  <td className="mono">{r.id}</td>
                  <td className="mono">{r.rx}</td>
                  <td>{r.pt}</td>
                  <td>{r.dr}</td>
                  <td className="muted">{r.rsn}</td>
                  <td className="right num strong">${r.amt.toFixed(2)}</td>
                  <td><span className={"pill " + (r.st === 'pending' ? 'pill-warning' : 'pill-success')}><span className="dot"/>{r.st}</span></td>
                  <td><button className="btn btn-ghost btn-sm">Review</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

window.ScreensClinical = { Dashboard, RxQueue, NewRx, Checkout, Returns };

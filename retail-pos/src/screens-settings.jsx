// Settings hub + 10 detail screens
const { useState: useSet } = React;

const SetHead = ({ onBack, title, sub, actions }) => {
  const Icon = window.Icon;
  return (
    <div className="page-head">
      <div>
        <div onClick={onBack} style={{display:'inline-flex', alignItems:'center', gap:6, color:'var(--brand-1)', fontSize:12.5, fontWeight:600, cursor:'pointer', marginBottom:6}}>
          <Icon.ChevLeft size={14}/> Back to Settings
        </div>
        <div className="page-title">{title}</div>
        {sub && <div className="page-sub">{sub}</div>}
      </div>
      {actions && <div style={{display:'flex', gap:8}}>{actions}</div>}
    </div>
  );
};

function SettingsHub({ go }) {
  const D = window.AppData;
  const Icon = window.Icon;
  const [q, setQ] = useSet('');
  const cards = D.SETTINGS_PAGES.filter(s => s.title.toLowerCase().includes(q.toLowerCase()) || s.desc.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="main">
      <div className="page-head">
        <div>
          <div className="page-title">Settings</div>
          <div className="page-sub">Configure your store, taxes, payments, hardware and team</div>
        </div>
        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <span className="muted" style={{fontSize:12}}>Last saved · 03 May 2026 · 11:42 AM by Pooja Menon</span>
          <button className="btn btn-ghost"><Icon.Download size={14}/>Backup config</button>
          <button className="btn btn-primary"><Icon.Check size={14}/>Save all</button>
        </div>
      </div>

      <div className="card card-pad" style={{marginBottom:16, display:'flex', gap:12, alignItems:'center'}}>
        <div style={{position:'relative', flex:1, maxWidth:420}}>
          <Icon.Search size={14}/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search settings…" style={{width:'100%', height:36, paddingLeft:34, paddingRight:12, border:'1px solid var(--border)', borderRadius:8, background:'var(--bg)', fontSize:13, outline:'none'}}/>
          <span style={{position:'absolute', left:11, top:11, color:'var(--muted)', pointerEvents:'none'}}><Icon.Search size={14}/></span>
        </div>
        <div className="muted" style={{fontSize:12, display:'flex', gap:14}}>
          <span><span className="strong ink">10</span> modules</span>
          <span><span className="strong ink">8</span> active</span>
          <span><span className="strong" style={{color:'var(--warning)'}}>2</span> need attention</span>
        </div>
      </div>

      <div className="hub-grid">
        {cards.map(c => {
          const Ic = Icon[c.icon] || Icon.Gear;
          const targetId = c.id === 'payments' ? 'payments-set' : c.id;
          return (
            <div key={c.id} className="hub-card" onClick={()=>go(targetId)}>
              <div style={{display:'flex', alignItems:'center', gap:10}}>
                <div className="hub-icon"><Ic size={18}/></div>
                <div style={{flex:1}}>
                  <div style={{fontSize:14.5, fontWeight:700}}>{c.title}</div>
                  <div className="muted" style={{fontSize:12}}>{c.desc}</div>
                </div>
                <Icon.ChevRight size={16} />
              </div>
              <div style={{flex:1}}/>
              <div className="row-between">
                <span className={"pill " + (c.warn ? 'pill-warning' : 'pill-success')}>
                  <span className="dot"></span>{c.status}
                </span>
                {c.warn && <span className="muted" style={{fontSize:11.5}}><Icon.Alert size={12}/> {c.warn}</span>}
              </div>
              <button className="btn btn-soft btn-sm" style={{justifyContent:'center'}}>Open · Manage</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Detail screens ─────────────────────────────────────────

function SetBusiness({ go }) {
  const Icon = window.Icon;
  return (
    <div className="main">
      <SetHead onBack={()=>go('settings')} title="Business Profile" sub="Identity, address and invoice presentation" actions={
        <><button className="btn btn-ghost">Cancel</button><button className="btn btn-primary"><Icon.Check size={14}/>Save Profile</button></>
      }/>
      <div className="two-col">
        <div className="card card-pad-lg" style={{display:'grid', gap:14}}>
          <div className="h3">Identity</div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
            <div className="field"><label>Store name</label><input defaultValue="Couture Bandra Flagship"/></div>
            <div className="field"><label>Legal entity</label><input defaultValue="Couture Retail Pvt Ltd"/></div>
            <div className="field"><label>GSTIN</label><input className="mono" defaultValue="27AABCC1234R1Z5"/></div>
            <div className="field"><label>PAN</label><input className="mono" defaultValue="AABCC1234R"/></div>
            <div className="field"><label>Business phone</label><input defaultValue="+91 22 4938 1820"/></div>
            <div className="field"><label>Email</label><input defaultValue="bandra@couturepos.in"/></div>
          </div>
          <div className="field"><label>Registered address</label><textarea defaultValue="Shop 14, Linking Road, Bandra West, Mumbai, Maharashtra 400050"/></div>

          <div className="divider"></div>
          <div className="h3">Invoice presentation</div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
            <div className="field"><label>Invoice prefix</label><input className="mono" defaultValue="CTR/26-27/"/></div>
            <div className="field"><label>Starting number</label><input className="mono" defaultValue="00342"/></div>
          </div>
          <div className="field"><label>Receipt footer</label><textarea defaultValue="Thank you for shopping with Couture. Returns accepted within 7 days with original tag and invoice. T&Cs apply."/></div>
        </div>

        <div style={{display:'grid', gap:14}}>
          <div className="card card-pad">
            <div className="h3" style={{marginBottom:8}}>Invoice logo</div>
            <div className="img-ph" style={{height:120, marginBottom:8}}>logo · 320×120 PNG</div>
            <div style={{display:'flex', gap:8}}>
              <button className="btn btn-ghost btn-sm" style={{flex:1}}>Upload</button>
              <button className="btn btn-ghost btn-sm" style={{flex:1}}>Remove</button>
            </div>
          </div>
          <div className="card card-pad">
            <div className="h3" style={{marginBottom:10}}>Live preview</div>
            <div style={{padding:14, border:'1px dashed var(--border)', borderRadius:10, background:'var(--bg)', fontSize:11.5, fontFamily:'JetBrains Mono, monospace'}}>
              <div style={{fontWeight:700, fontSize:13, fontFamily:'Inter'}}>Couture Bandra Flagship</div>
              <div className="muted">Linking Rd · Bandra W</div>
              <div className="muted">GSTIN 27AABCC1234R1Z5</div>
              <div style={{borderTop:'1px dashed #C4C9D0', margin:'8px 0'}}></div>
              <div className="row-between"><span>Invoice #</span><span>CTR/26-27/00342</span></div>
              <div className="row-between"><span>Date</span><span>03 May 2026</span></div>
              <div className="row-between"><span>Cashier</span><span>Aarav P.</span></div>
              <div style={{borderTop:'1px dashed #C4C9D0', margin:'8px 0'}}></div>
              <div className="muted" style={{textAlign:'center', fontSize:10.5}}>Thank you for shopping with Couture.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Toggle({ on: initial=true, label }) {
  const [on, setOn] = useSet(initial);
  return (
    <div className="row-between" style={{padding:'8px 0'}}>
      <div style={{fontSize:13}}>{label}</div>
      <div className={"toggle " + (on?'on':'')} onClick={()=>setOn(!on)}/>
    </div>
  );
}

function SetTax({ go }) {
  const Icon = window.Icon;
  return (
    <div className="main">
      <SetHead onBack={()=>go('settings')} title="Tax & GST" sub="Slabs, HSN/SAC, round-off and report readiness" actions={
        <><button className="btn btn-ghost"><Icon.Download size={14}/>Export config</button><button className="btn btn-primary"><Icon.Check size={14}/>Save</button></>
      }/>
      <div className="two-col">
        <div style={{display:'grid', gap:14}}>
          <div className="card card-pad">
            <div className="h3" style={{marginBottom:10}}>Tax mode</div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
              <label style={{padding:14, border:'2px solid var(--brand-1)', borderRadius:10, cursor:'pointer', background:'var(--brand-soft)'}}>
                <div className="strong">Tax exclusive <span className="pill pill-info" style={{marginLeft:6}}>Recommended</span></div>
                <div className="muted" style={{fontSize:12, marginTop:4}}>Prices entered without GST. Tax computed at billing.</div>
              </label>
              <label style={{padding:14, border:'1px solid var(--border)', borderRadius:10, cursor:'pointer', background:'white'}}>
                <div className="strong">Tax inclusive</div>
                <div className="muted" style={{fontSize:12, marginTop:4}}>Prices entered include GST. Reverse-calculated.</div>
              </label>
            </div>
          </div>

          <div className="card">
            <div className="card-head"><h3>GST slabs</h3><button className="btn btn-soft btn-sm">Edit slabs</button></div>
            <table>
              <thead><tr><th>Slab</th><th>CGST</th><th>SGST</th><th>IGST</th><th>Used by</th><th>Status</th></tr></thead>
              <tbody>
                {[['0%','0','0','0','42 SKUs','Active'],['5%','2.5','2.5','5','318 SKUs','Active'],['12%','6','6','12','142 SKUs','Active'],['18%','9','9','18','86 SKUs','Active'],['28%','14','14','28','—','Inactive']].map((r,i)=>(
                  <tr key={i}><td className="strong">{r[0]}</td><td className="num">{r[1]}</td><td className="num">{r[2]}</td><td className="num">{r[3]}</td><td className="muted">{r[4]}</td><td><span className={"pill " + (r[5]==='Active'?'pill-success':'pill-neutral')}><span className="dot"></span>{r[5]}</span></td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card card-pad">
            <div className="h3" style={{marginBottom:6}}>HSN/SAC validation</div>
            <Toggle label="Block billing if HSN missing on item"/>
            <Toggle label="Auto-suggest HSN from product name"/>
            <Toggle on={false} label="Require 8-digit HSN for ₹5 Cr+ turnover"/>
          </div>

          <div className="card card-pad">
            <div className="h3" style={{marginBottom:10}}>Round-off</div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:8}}>
              {['Nearest ₹1','Nearest ₹0.50','No round-off'].map((s,i)=>(
                <label key={s} style={{padding:10, border: i===0?'2px solid var(--brand-1)':'1px solid var(--border)', borderRadius:8, fontSize:12.5, cursor:'pointer', background:i===0?'var(--brand-soft)':'white', textAlign:'center'}}>{s}</label>
              ))}
            </div>
          </div>
        </div>

        <div style={{display:'grid', gap:14}}>
          <div className="card card-pad">
            <div className="h3" style={{marginBottom:10}}>GST report readiness</div>
            <div style={{display:'grid', gap:8, fontSize:12.5}}>
              <div className="row-between"><span>HSN coverage</span><span className="strong num">96.2%</span></div>
              <div className="progress"><div style={{width:'96%'}}/></div>
              <div className="row-between" style={{marginTop:4}}><span>Slab assignment</span><span className="strong num">100%</span></div>
              <div className="progress"><div style={{width:'100%'}}/></div>
              <div className="row-between" style={{marginTop:4}}><span>Place of supply</span><span className="strong num">100%</span></div>
              <div className="progress"><div style={{width:'100%'}}/></div>
            </div>
            <div className="divider"></div>
            <div style={{padding:12, background:'var(--warning-soft)', borderRadius:8, fontSize:12.5}}>
              <div className="strong" style={{color:'#B45309', display:'flex', alignItems:'center', gap:6}}><Icon.Alert size={13}/>12 products missing HSN</div>
              <div className="muted" style={{marginTop:4}}>Banarasi Dupatta, Lakmé Lipstick (3 SKUs), Argan Hair Oil…</div>
              <button className="btn btn-soft btn-sm" style={{marginTop:8}}>Fix now</button>
            </div>
          </div>

          <div className="card card-pad">
            <div className="h3" style={{marginBottom:10}}>Place of supply</div>
            <div className="field" style={{marginBottom:8}}><label>Default state</label><select defaultValue="MH"><option value="MH">Maharashtra (27)</option><option>Karnataka (29)</option><option>Tamil Nadu (33)</option></select></div>
            <Toggle label="Trigger IGST for inter-state customers"/>
          </div>
        </div>
      </div>
    </div>
  );
}

function SetPayments({ go }) {
  const Icon = window.Icon;
  const methods = [
    { name:'Cash', ic:'Money', on:true, sub:'Default tender · drawer linked' },
    { name:'Card terminal', ic:'CardChip', on:true, sub:'PineLabs A920 · ID PNLB-A920-2841' },
    { name:'UPI QR', ic:'Qr', on:true, sub:'Razorpay merchant · auto-settle T+1' },
    { name:'Wallets', ic:'Wallet', on:true, sub:'PhonePe · Paytm · Amazon Pay' },
    { name:'Split payment', ic:'Split', on:true, sub:'Up to 4 tenders per bill' },
    { name:'Gift card', ic:'Gift', on:true, sub:'CTR-prefixed · 3,184 active' },
  ];
  return (
    <div className="main">
      <SetHead onBack={()=>go('settings')} title="Payment Methods" sub="Tenders accepted at the till and their settlement" actions={
        <><button className="btn btn-ghost"><Icon.Bolt size={14}/>Test connection</button><button className="btn btn-primary"><Icon.Check size={14}/>Save changes</button></>
      }/>
      <div className="card" style={{marginBottom:14}}>
        <table>
          <thead><tr><th>Method</th><th>Provider / status</th><th>Settlement</th><th>Last test</th><th>Enabled</th></tr></thead>
          <tbody>
            {methods.map(m => {
              const Ic = Icon[m.ic];
              return (
                <tr key={m.name}>
                  <td><div style={{display:'flex', gap:10, alignItems:'center'}}><div style={{width:32,height:32,borderRadius:8,background:'var(--brand-soft)',color:'var(--brand-1)',display:'grid',placeItems:'center'}}><Ic size={14}/></div><div className="strong">{m.name}</div></div></td>
                  <td className="muted">{m.sub}</td>
                  <td>{m.name==='UPI QR'?'T+1 · ICICI ****4421':m.name==='Card terminal'?'T+2 · HDFC ****8800':m.name==='Cash'?'Counter drawer':'Instant'}</td>
                  <td className="muted mono">{m.name==='Card terminal'?'02 May 18:10':m.name==='UPI QR'?'03 May 09:14':'—'}</td>
                  <td><div className={"toggle on"}/></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="three-col">
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Settlement account</div>
          <div className="field" style={{marginBottom:8}}><label>Bank</label><input defaultValue="ICICI Bank · Bandra Kurla Branch"/></div>
          <div className="field" style={{marginBottom:8}}><label>Account</label><input className="mono" defaultValue="XXXX XXXX 4421"/></div>
          <div className="field"><label>IFSC</label><input className="mono" defaultValue="ICIC0000104"/></div>
        </div>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>UPI / QR</div>
          <Toggle label="Show static QR at counter"/>
          <Toggle label="Auto-mark paid on bank webhook"/>
          <Toggle on={false} label="Allow customer-presented QR"/>
        </div>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Receipts</div>
          <Toggle label="Email receipt by default"/>
          <Toggle label="Send WhatsApp receipt"/>
          <Toggle on={false} label="Print only when explicitly asked"/>
        </div>
      </div>
    </div>
  );
}

function SetHardware({ go }) {
  const Icon = window.Icon;
  const dev = [
    { name:'Receipt printer', model:'Epson TM-T82III · USB', status:'Connected', tone:'success', test:'Test print' },
    { name:'Barcode scanner', model:'Honeywell 1900GHD · USB', status:'Connected', tone:'success', test:'Scan test' },
    { name:'Cash drawer', model:'Sintron CD-410 · linked to printer', status:'Connected', tone:'success', test:'Open drawer' },
    { name:'Weighing scale', model:'Essae DS-252 · COM3', status:'Idle', tone:'neutral', test:'Calibrate' },
    { name:'Customer display', model:'Bematech LV1010 · HDMI', status:'Disconnected', tone:'danger', test:'Reconnect' },
  ];
  return (
    <div className="main">
      <SetHead onBack={()=>go('settings')} title="Hardware" sub="Counter devices, drivers and diagnostics"/>
      <div className="two-col">
        <div className="card">
          <div className="card-head"><h3>Devices</h3><button className="btn btn-ghost btn-sm"><Icon.Refresh size={12}/>Re-scan</button></div>
          <table>
            <thead><tr><th>Device</th><th>Model</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {dev.map(d=>(
                <tr key={d.name}>
                  <td className="strong">{d.name}</td>
                  <td className="muted">{d.model}</td>
                  <td><span className={"pill pill-"+(d.tone==='neutral'?'neutral':d.tone)}><span className="dot"></span>{d.status}</span></td>
                  <td><button className="btn btn-ghost btn-sm">{d.test}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{display:'grid', gap:14}}>
          <div className="card card-pad">
            <div className="h3" style={{marginBottom:10}}>Default counter</div>
            <div className="field" style={{marginBottom:8}}><label>This device is</label><select><option>Counter 1 — Front</option><option>Counter 2 — Centre</option><option>Counter 3 — Back</option></select></div>
            <Toggle label="Auto-open drawer on cash sale"/>
            <Toggle label="Beep on barcode scan"/>
            <Toggle on={false} label="Print kitchen-style ticket"/>
          </div>
          <div className="card card-pad" style={{background:'var(--warning-soft)', borderColor:'#FBE3B6'}}>
            <div className="h3" style={{display:'flex', gap:6, alignItems:'center', color:'#B45309'}}><Icon.Alert size={14}/>Troubleshooting</div>
            <ul className="muted" style={{margin:'8px 0 0 16px', padding:0, fontSize:12.5, lineHeight:1.7}}>
              <li>Customer display LV1010 disconnected since 02 May, 19:42 — try a different HDMI port.</li>
              <li>Printer driver Epson TM-T82III is one minor version behind. Update available.</li>
              <li>If scale weight reads 0, run Calibrate with the supplied 1kg reference.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function SetTeam({ go }) {
  const Icon = window.Icon;
  const roles = ['Admin','Manager','Inventory Lead','Cashier'];
  const perms = ['Billing','Discounts','Refunds','Cash drawer','Stock adjustment','Purchase receiving','Reports','Settings'];
  // 4 roles x 8 perms matrix
  const M = [
    [1,1,1,1,1,1,1,1], // Admin
    [1,1,1,1,1,1,1,0], // Manager
    [0,0,0,0,1,1,1,0], // Inventory Lead
    [1,'L',0,1,0,0,0,0], // Cashier
  ];
  return (
    <div className="main">
      <SetHead onBack={()=>go('settings')} title="Team & Roles" sub="Permissions, approval limits and overrides" actions={<button className="btn btn-primary"><Icon.Check size={14}/>Save roles</button>}/>
      <div className="card" style={{marginBottom:14, overflow:'hidden'}}>
        <div className="card-head"><h3>Permission matrix</h3><button className="btn btn-soft btn-sm">+ Add role</button></div>
        <div style={{overflowX:'auto'}}>
          <table>
            <thead><tr><th>Role</th>{perms.map(p=><th key={p} style={{textAlign:'center'}}>{p}</th>)}</tr></thead>
            <tbody>
              {roles.map((r,ri)=>(
                <tr key={r}>
                  <td className="strong">{r} <span className="muted" style={{fontSize:11.5, fontWeight:400}}>· {r==='Admin'?'2':r==='Manager'?'4':r==='Inventory Lead'?'2':'10'} users</span></td>
                  {M[ri].map((v,ci)=>(
                    <td key={ci} style={{textAlign:'center'}}>
                      {v===1 && <span className="check on"></span>}
                      {v===0 && <span className="check"></span>}
                      {v==='L' && <span className="pill pill-warning" style={{fontSize:10}}>Limited</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="three-col">
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Discount approval limit</div>
          <div className="field" style={{marginBottom:8}}><label>Cashier (no approval)</label><input className="mono" defaultValue="Up to 10%"/></div>
          <div className="field" style={{marginBottom:8}}><label>Manager override</label><input className="mono" defaultValue="Up to 30%"/></div>
          <div className="field"><label>Above 30%</label><input className="mono" defaultValue="Admin PIN required"/></div>
        </div>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Refund approval limit</div>
          <div className="field" style={{marginBottom:8}}><label>Cashier (auto)</label><input className="mono" defaultValue="Up to ₹500"/></div>
          <div className="field" style={{marginBottom:8}}><label>Manager (PIN)</label><input className="mono" defaultValue="₹500 — ₹10,000"/></div>
          <div className="field"><label>Above ₹10,000</label><input className="mono" defaultValue="Admin + reason required"/></div>
        </div>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Override rules</div>
          <Toggle label="Manager PIN required for void"/>
          <Toggle label="Manager PIN required for cash drop"/>
          <Toggle label="Audit log all overrides"/>
          <Toggle on={false} label="Restrict refunds to original cashier"/>
        </div>
      </div>
    </div>
  );
}

function SetNotifications({ go }) {
  const Icon = window.Icon;
  const rules = [
    ['Low stock alerts','Triggered when item drops below reorder level',[1,1,1,1]],
    ['Near expiry alerts','SKUs expiring within 60 days',[1,0,1,1]],
    ['Pending refund approvals','Refunds &gt; ₹10K awaiting manager',[1,1,1,1]],
    ['Cash variance alerts','End-of-shift mismatch &gt; ₹100',[1,1,0,1]],
    ['Payment settlement delay','UPI/Card not settled past expected ETA',[1,0,1,1]],
    ['Purchase order due','PO past expected delivery date',[1,1,0,1]],
    ['Staff shift alerts','Late clock-in or no-show',[0,1,1,1]],
  ];
  const channels = ['Email','SMS','WhatsApp','In-app'];
  return (
    <div className="main">
      <SetHead onBack={()=>go('settings')} title="Notifications" sub="Choose what to alert and where" actions={<button className="btn btn-primary"><Icon.Check size={14}/>Save rules</button>}/>
      <div className="card">
        <table>
          <thead><tr><th>Rule</th>{channels.map(c=><th key={c} style={{textAlign:'center'}}>{c}</th>)}</tr></thead>
          <tbody>
            {rules.map(r=>(
              <tr key={r[0]}>
                <td><div className="strong">{r[0]}</div><div className="muted" style={{fontSize:12}} dangerouslySetInnerHTML={{__html:r[1]}}/></td>
                {r[2].map((v,i)=>(
                  <td key={i} style={{textAlign:'center'}}><div className={"toggle "+(v?'on':'')} style={{margin:'0 auto'}}/></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="two-col" style={{marginTop:14}}>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Recipients</div>
          <div style={{display:'grid', gap:8}}>
            {[['Pooja Menon','Manager','pooja@couturepos.in · +91 98201 41028'],['Aarav Pillai','Cashier','aarav@couturepos.in'],['Sneha Iyer','Inventory Lead','sneha@couturepos.in']].map((p)=>(
              <div key={p[0]} className="row-between" style={{padding:10, border:'1px solid var(--border-soft)', borderRadius:8}}>
                <div><div className="strong">{p[0]} · <span className="muted" style={{fontWeight:400}}>{p[1]}</span></div><div className="muted" style={{fontSize:11.5}}>{p[2]}</div></div>
                <button className="btn btn-ghost btn-sm">Edit</button>
              </div>
            ))}
          </div>
          <button className="btn btn-soft btn-sm" style={{marginTop:10}}>+ Add recipient</button>
        </div>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Quiet hours</div>
          <Toggle label="Mute SMS & WhatsApp 10 PM — 9 AM"/>
          <Toggle label="Always allow critical alerts"/>
          <Toggle on={false} label="Pause all on holidays"/>
          <div className="divider"></div>
          <div className="h4">Channels</div>
          <div className="muted" style={{fontSize:12.5, marginTop:4}}>Email · MailGun · OK · SMS · MSG91 · OK · WhatsApp · Gupshup · OK · In-app · always on</div>
        </div>
      </div>
    </div>
  );
}

function SetPlan({ go }) {
  const Icon = window.Icon;
  return (
    <div className="main">
      <SetHead onBack={()=>go('settings')} title="Billing & Plan" sub="Subscription, invoices and usage" actions={<><button className="btn btn-ghost btn-danger-ghost">Cancel plan</button><button className="btn btn-primary">Upgrade plan</button></>}/>
      <div className="two-col" style={{marginBottom:14}}>
        <div className="card card-pad-lg" style={{background:'linear-gradient(135deg, rgba(0,88,186,.04), rgba(108,159,255,.06))', borderColor:'#D9E5F4'}}>
          <div className="row-between" style={{marginBottom:12}}>
            <div>
              <div className="muted" style={{fontSize:12, textTransform:'uppercase', letterSpacing:'.06em'}}>Current plan</div>
              <div style={{fontSize:24, fontWeight:700, marginTop:4}}>Couture Pro</div>
              <div className="muted" style={{fontSize:13}}>3 stores · 12 users · unlimited invoices</div>
            </div>
            <span className="pill pill-success"><span className="dot"></span>Active</span>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10}}>
            <div><div className="muted" style={{fontSize:11}}>Renews</div><div className="strong">14 May 2026</div></div>
            <div><div className="muted" style={{fontSize:11}}>Billing amount</div><div className="strong num">₹4,999 / mo</div></div>
            <div><div className="muted" style={{fontSize:11}}>Method</div><div className="strong">Card · HDFC ****8800</div></div>
          </div>
        </div>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Usage limits</div>
          {[['Stores','2 / 3',66],['Users','12 / 15',80],['Products','614 / 5,000',12],['Invoices (this month)','5,920 / unlimited',8],['Reports/day','12 / 50',24]].map(r=>(
            <div key={r[0]} style={{marginBottom:10}}>
              <div className="row-between" style={{fontSize:12.5, marginBottom:4}}><span>{r[0]}</span><span className="num strong">{r[1]}</span></div>
              <div className="progress"><div style={{width:r[2]+'%'}}/></div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-head"><h3>Billing history</h3><button className="btn btn-ghost btn-sm"><Icon.Download size={12}/>Download all</button></div>
        <table>
          <thead><tr><th>Invoice</th><th>Date</th><th>Period</th><th>Amount</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {[['INV-2026-04','14 Apr 2026','Apr 2026','₹4,999','Paid'],['INV-2026-03','14 Mar 2026','Mar 2026','₹4,999','Paid'],['INV-2026-02','14 Feb 2026','Feb 2026','₹4,999','Paid'],['INV-2026-01','14 Jan 2026','Jan 2026','₹4,999','Paid'],['INV-2025-12','14 Dec 2025','Dec 2025','₹4,999','Paid']].map(r=>(
              <tr key={r[0]}><td className="mono">{r[0]}</td><td className="muted">{r[1]}</td><td>{r[2]}</td><td className="num strong">{r[3]}</td><td><span className="pill pill-success"><span className="dot"></span>{r[4]}</span></td><td><button className="btn btn-ghost btn-sm"><Icon.Download size={12}/>PDF</button></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SetIntegrations({ go }) {
  const Icon = window.Icon;
  const ints = [
    { name:'Tally Prime', desc:'Sync sales, purchases, expenses to Tally', status:'Disconnected', tone:'danger', last:'02 May 14:00 (failed auth)' },
    { name:'WhatsApp Business', desc:'Send receipts, offers, refund updates', status:'Connected', tone:'success', last:'03 May 11:18' },
    { name:'Razorpay', desc:'UPI QR + card payments + payouts', status:'Connected', tone:'success', last:'03 May 14:42' },
    { name:'PineLabs', desc:'Card terminal & EMI', status:'Connected', tone:'success', last:'03 May 14:38' },
    { name:'MSG91 SMS', desc:'OTP and transactional SMS', status:'Connected', tone:'success', last:'03 May 09:12' },
    { name:'Google Drive', desc:'Backup invoices and reports', status:'Disconnected', tone:'neutral', last:'—' },
    { name:'Shiprocket', desc:'Optional: dispatch online orders', status:'Available', tone:'neutral', last:'—' },
    { name:'Zoho Books', desc:'Alternative accounting export', status:'Available', tone:'neutral', last:'—' },
  ];
  return (
    <div className="main">
      <SetHead onBack={()=>go('settings')} title="Integrations" sub="Accounting, communication, payments and exports"/>
      <div className="hub-grid">
        {ints.map(it => (
          <div key={it.name} className="card card-pad" style={{display:'flex', flexDirection:'column', gap:10}}>
            <div className="row-between">
              <div>
                <div className="strong" style={{fontSize:14}}>{it.name}</div>
                <div className="muted" style={{fontSize:12}}>{it.desc}</div>
              </div>
              <span className={"pill pill-"+(it.tone==='neutral'?'neutral':it.tone)}><span className="dot"></span>{it.status}</span>
            </div>
            <div className="muted" style={{fontSize:11.5, fontFamily:'JetBrains Mono'}}>Last sync · {it.last}</div>
            <div style={{display:'flex', gap:8}}>
              {it.status==='Connected' && <><button className="btn btn-ghost btn-sm" style={{flex:1}}>Configure</button><button className="btn btn-ghost btn-danger-ghost btn-sm">Disconnect</button></>}
              {it.status==='Disconnected' && <button className="btn btn-primary btn-sm" style={{flex:1}}><Icon.Plug size={12}/>Reconnect</button>}
              {it.status==='Available' && <button className="btn btn-soft btn-sm" style={{flex:1}}>Connect</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SetModules({ go }) {
  const Icon = window.Icon;
  const mods = [
    ['Inventory','Box','Stock master, batches, expiry',true,'Required for billing tax-correct items'],
    ['Purchases','Truck','PO, GRN, supplier bills',true,'Depends on Inventory'],
    ['Suppliers','Building','Supplier ledger, payables',true,'Depends on Purchases'],
    ['Customers','Users','CRM and segments',true,null],
    ['Loyalty','Gift','Points, tiers, expiry',true,'Depends on Customers'],
    ['Gift Cards','Gift','Issue & redeem gift cards',true,null],
    ['Campaigns','Tag','Coupons, promos and pushes',true,'Depends on Customers'],
    ['Expenses','Wallet','Petty cash, vendor bills, approvals',true,null],
    ['Reports','Chart','Audit-ready downloadable reports',true,null],
    ['Analytics','Brain','Trend, margin, forecast',true,null],
    ['Hardware','Printer2','Receipt, scanner, drawer, scale',true,null],
    ['Multi-store','Building','Sync across branches',false,'Available on Couture Pro+'],
  ];
  return (
    <div className="main">
      <SetHead onBack={()=>go('settings')} title="Modules" sub="Turn modules on/off for this store" actions={<button className="btn btn-primary"><Icon.Check size={14}/>Save modules</button>}/>
      <div className="hub-grid">
        {mods.map(m => {
          const Ic = Icon[m[1]] || Icon.Box;
          const disabled = !m[3];
          return (
            <div key={m[0]} className="card card-pad" style={{display:'flex', flexDirection:'column', gap:10, opacity: disabled && m[4]?.includes('Pro+') ? .6 : 1}}>
              <div className="row-between">
                <div style={{display:'flex', gap:10, alignItems:'center'}}>
                  <div className="hub-icon"><Ic size={16}/></div>
                  <div>
                    <div className="strong" style={{fontSize:14}}>{m[0]}</div>
                    <div className="muted" style={{fontSize:12}}>{m[2]}</div>
                  </div>
                </div>
                <div className={"toggle "+(m[3]?'on':'')}/>
              </div>
              {m[4] && <div className="muted" style={{fontSize:11.5, padding:'6px 8px', background:'var(--bg)', borderRadius:6}}><Icon.Alert size={11}/> {m[4]}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SetPreferences({ go }) {
  const Icon = window.Icon;
  return (
    <div className="main">
      <SetHead onBack={()=>go('settings')} title="Store Preferences" sub="Locale, formats and numbering rules" actions={<button className="btn btn-primary"><Icon.Check size={14}/>Save preferences</button>}/>
      <div className="three-col" style={{marginBottom:14}}>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Locale</div>
          <div className="field" style={{marginBottom:8}}><label>Currency</label><select><option>INR (₹) — Indian Rupee</option></select></div>
          <div className="field" style={{marginBottom:8}}><label>Language</label><select><option>English (India)</option><option>हिन्दी</option><option>मराठी</option></select></div>
          <div className="field" style={{marginBottom:8}}><label>Timezone</label><select><option>Asia/Kolkata · IST (UTC+05:30)</option></select></div>
          <div className="field"><label>Decimal precision</label><select><option>2 decimals (₹0.00)</option><option>0 decimals (₹0)</option></select></div>
        </div>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Format</div>
          <div className="field" style={{marginBottom:8}}><label>Date format</label><select><option>DD MMM YYYY · 03 May 2026</option><option>DD/MM/YYYY · 03/05/2026</option></select></div>
          <div className="field" style={{marginBottom:8}}><label>Time format</label><select><option>12-hour · 02:42 PM</option><option>24-hour · 14:42</option></select></div>
          <div className="field" style={{marginBottom:8}}><label>Number grouping</label><select><option>Indian · 1,00,000</option><option>International · 100,000</option></select></div>
          <div className="field"><label>Default tax mode</label><select><option>Tax exclusive</option><option>Tax inclusive</option></select></div>
        </div>
        <div className="card card-pad">
          <div className="h3" style={{marginBottom:10}}>Numbering rules</div>
          <div className="field" style={{marginBottom:8}}><label>Invoice prefix</label><input className="mono" defaultValue="CTR/26-27/"/></div>
          <div className="field" style={{marginBottom:8}}><label>Hold bill prefix</label><input className="mono" defaultValue="HOLD-"/></div>
          <div className="field" style={{marginBottom:8}}><label>SKU pattern</label><input className="mono" defaultValue="{CAT}-{BRAND}-{SEQ4}"/></div>
          <div className="field"><label>Barcode rules</label><select><option>EAN-13 (auto-generate)</option><option>Code 128</option><option>Manual</option></select></div>
        </div>
      </div>
      <div className="card card-pad">
        <div className="h3" style={{marginBottom:10}}>Preview</div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, fontSize:13}}>
          {[['Currency','₹4,84,210.50'],['Date','03 May 2026'],['Time','02:42 PM'],['Invoice','CTR/26-27/00342'],['SKU','SAR-RAY-0184'],['Barcode','8901234567890'],['Tax mode','Exclusive (default)'],['Group','Indian (lakh/crore)']].map(([k,v])=>(
            <div key={k} style={{padding:10, background:'var(--bg)', borderRadius:8}}><div className="muted" style={{fontSize:11}}>{k}</div><div className="strong mono" style={{marginTop:2}}>{v}</div></div>
          ))}
        </div>
      </div>
    </div>
  );
}

window.Settings = { SettingsHub, SetBusiness, SetTax, SetPayments, SetHardware, SetTeam, SetNotifications, SetPlan, SetIntegrations, SetModules, SetPreferences };


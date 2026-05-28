// Integrations + Settings

function Integrations() {
  const D = window.AppData;
  const Icon = window.Icon;
  return (
    <div className="main">
      <div className="page-head">
        <div>
          <div className="page-title">Integrations</div>
          <div className="page-sub">Open API · RESTful + webhooks · 6 categories · 19 certified connectors</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-ghost"><Icon.Book size={14}/> API docs</button>
          <button className="btn btn-primary"><Icon.Plus size={14}/> Connect new</button>
        </div>
      </div>

      <div className="kpi-grid cols-4" style={{marginBottom:16}}>
        <div className="kpi accent"><div className="kpi-label">Connected</div><div className="kpi-value num">14</div><div className="kpi-sub muted">of 19 available</div></div>
        <div className="kpi"><div className="kpi-label">Sync events / hour</div><div className="kpi-value num">1,840</div><div className="kpi-sub"><span className="delta-up">All within SLA</span></div></div>
        <div className="kpi"><div className="kpi-label">API calls today</div><div className="kpi-value num">42.8k</div><div className="kpi-sub muted">88% under 200ms</div></div>
        <div className="kpi"><div className="kpi-label">Failed webhooks</div><div className="kpi-value num">0</div><div className="kpi-sub muted">Last 24h</div></div>
      </div>

      {D.INTEGRATIONS.map((cat, ci) => (
        <div key={ci} style={{marginBottom:16}}>
          <div className="row-between" style={{margin:'8px 4px 12px'}}>
            <div className="h2">{cat.cat}</div>
            <div className="muted" style={{fontSize:12}}>{cat.items.filter(i => i.status === 'on').length} of {cat.items.length} connected</div>
          </div>
          <div className="hub-grid" style={{gridTemplateColumns:'repeat(3, 1fr)'}}>
            {cat.items.map((it, i) => (
              <div key={i} className="card card-pad" style={{display:'flex', flexDirection:'column', gap:8}}>
                <div className="row-between">
                  <div className="hub-icon" style={{background: it.status === 'on' ? 'var(--brand-soft)' : '#EEF0EE', color: it.status === 'on' ? 'var(--brand-1)' : 'var(--muted)'}}>
                    <Icon.Plug size={16}/>
                  </div>
                  {it.status === 'on' ? <span className="pill pill-success"><span className="dot"/>Connected</span> : <span className="pill pill-neutral"><span className="dot"/>Off</span>}
                </div>
                <div className="strong" style={{fontSize:14, marginTop:4}}>{it.name}</div>
                <div className="muted mono" style={{fontSize:11.5}}>{it.meta}</div>
                <div style={{display:'flex', gap:8, marginTop:6}}>
                  <button className="btn btn-ghost btn-sm" style={{flex:1, justifyContent:'center'}}>{it.status === 'on' ? 'Configure' : 'Connect'}</button>
                  <button className="btn btn-ghost btn-icon btn-sm"><Icon.More size={12}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SettingsHub({ go }) {
  const D = window.AppData;
  const Icon = window.Icon;
  return (
    <div className="main">
      <div className="page-head">
        <div>
          <div className="page-title">Settings</div>
          <div className="page-sub">Configure pharmacy operations, compliance, and team access</div>
        </div>
      </div>

      <div className="hub-grid">
        {D.SETTINGS_PAGES.map(p => {
          const Ic = Icon[p.icon] || Icon.Cog;
          return (
            <div key={p.id} className="hub-card" onClick={() => go('set-' + p.id)}>
              <div className="hub-icon"><Ic size={18}/></div>
              <div className="serif" style={{fontSize:21, lineHeight:1.2, marginTop:8}}>{p.title}</div>
              <div className="muted" style={{fontSize:13, flex:1}}>{settingDescription(p.id)}</div>
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <span className="pill pill-neutral">{settingStatus(p.id)}</span>
                <Icon.Chevron size={14}/>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function settingDescription(id) {
  return {
    pharmacy:'NPI, NABP, DEA, store hours, locations.',
    compliance:'State licenses, controlled-substance reporting, HIPAA officer.',
    pricing:'Cash pricing, DIR rules, tier and contract overrides.',
    hardware:'Label printers, signature pads, cash drawers, scanners.',
    roles:'Staff roles, scope of practice, override codes.',
    notifications:'SMS, email, IVR, mobile-app messaging templates.',
    plan:'PharmOS subscription, seats, locations, invoice history.',
    integrations:'PBMs, wholesalers, EHRs, robotics, drug databases.',
    preferences:'Default views, keyboard shortcuts, locale.',
  }[id] || '';
}
function settingStatus(id) {
  return {
    pharmacy:'Configured',
    compliance:'3 licenses on file',
    pricing:'Default rules',
    hardware:'4 devices',
    roles:'5 roles',
    notifications:'12 templates',
    plan:'Growth tier',
    integrations:'14 connected',
    preferences:'Default',
  }[id] || '';
}

function SettingsPage({ id, go }) {
  const D = window.AppData;
  const Icon = window.Icon;
  const page = D.SETTINGS_PAGES.find(p => p.id === id);
  if (!page) return null;
  return (
    <div className="main">
      <div className="page-head">
        <div>
          <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:6}}>
            <button className="btn btn-ghost btn-sm" onClick={() => go('settings')}><Icon.ArrowLeft size={12}/> Settings</button>
          </div>
          <div className="page-title">{page.title}</div>
          <div className="page-sub">{settingDescription(id)}</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-ghost">Discard</button>
          <button className="btn btn-primary">Save changes</button>
        </div>
      </div>

      <div className="settings-detail">
        <div className="settings-side card card-pad">
          <div className="h4" style={{marginBottom:8}}>Sections</div>
          {settingSections(id).map((s, i) => (
            <a key={i} className={i === 0 ? 'on' : ''}>{s}</a>
          ))}
        </div>
        <div style={{display:'grid', gap:16, minWidth:0}}>
          {renderSettingBody(id)}
        </div>
      </div>
    </div>
  );
}

function settingSections(id) {
  return {
    pharmacy:['Profile','Locations','Hours','Identifiers'],
    compliance:['Licenses','HIPAA','Controlled substances','Audit log'],
    pricing:['Cash pricing','DIR rules','Discount programs','Tax'],
    hardware:['Label printers','Signature pads','Scanners','Cash drawers'],
    roles:['Roles','Permissions','Override codes','Sessions'],
    notifications:['Channels','Templates','Quiet hours','Patient app'],
    plan:['Subscription','Seats','Invoices','Payment method'],
    integrations:['PBMs','Wholesalers','EHR/EMR','Robotics','Accounting'],
    preferences:['Default view','Shortcuts','Locale','Density'],
  }[id] || ['General'];
}

function renderSettingBody(id) {
  if (id === 'pharmacy') return <PharmacySettings/>;
  if (id === 'compliance') return <ComplianceSettings/>;
  if (id === 'pricing') return <PricingSettings/>;
  if (id === 'hardware') return <HardwareSettings/>;
  if (id === 'roles') return <RolesSettings/>;
  if (id === 'notifications') return <NotificationsSettings/>;
  if (id === 'plan') return <PlanSettings/>;
  if (id === 'preferences') return <PreferencesSettings/>;
  return <GenericSettings/>;
}

function PharmacySettings() {
  return (
    <React.Fragment>
      <div className="card card-pad-lg">
        <div className="h2" style={{marginBottom:14}}>Pharmacy profile</div>
        <div className="grid" style={{gridTemplateColumns:'1fr 1fr', gap:14}}>
          <div className="field"><label>Pharmacy name</label><input defaultValue="Mission Bay Apothecary"/></div>
          <div className="field"><label>DBA</label><input defaultValue="Mission Bay Pharmacy"/></div>
          <div className="field"><label>NPI</label><input defaultValue="1093847562" className="mono"/></div>
          <div className="field"><label>NABP</label><input defaultValue="3849284" className="mono"/></div>
          <div className="field"><label>DEA registration</label><input defaultValue="AB9384720" className="mono"/></div>
          <div className="field"><label>State board license</label><input defaultValue="CA-PHY-9482" className="mono"/></div>
        </div>
      </div>
      <div className="card card-pad-lg">
        <div className="h2" style={{marginBottom:14}}>Locations</div>
        {[
          { n:'Mission Bay (HQ)', a:'1850 4th Street, San Francisco CA 94158', npi:'1093847562' },
          { n:'Sunset', a:'2014 Irving Street, San Francisco CA 94122', npi:'1093847599' },
        ].map((l, i) => (
          <div key={i} style={{display:'flex', alignItems:'center', gap:14, padding:'12px 0', borderBottom: i < 1 ? '1px solid var(--border-soft)' : 'none'}}>
            <div className="hub-icon"><span style={{fontWeight:700, fontSize:13}}>{i+1}</span></div>
            <div style={{flex:1}}>
              <div className="strong">{l.n}</div>
              <div className="muted" style={{fontSize:12.5}}>{l.a}</div>
              <div className="mono muted" style={{fontSize:11.5, marginTop:2}}>NPI {l.npi}</div>
            </div>
            <button className="btn btn-ghost btn-sm">Edit</button>
          </div>
        ))}
        <button className="btn btn-soft btn-sm" style={{marginTop:8}}>+ Add location</button>
      </div>
    </React.Fragment>
  );
}

function ComplianceSettings() {
  const Icon = window.Icon;
  return (
    <React.Fragment>
      <div className="card card-pad-lg">
        <div className="h2" style={{marginBottom:14}}>Active licenses</div>
        {[
          { t:'State pharmacy license', n:'CA-PHY-9482', exp:'2027-04-30', ok:true },
          { t:'DEA registration', n:'AB9384720', exp:'2026-09-30', ok:true },
          { t:'Federal HIPAA acknowledgment', n:'—', exp:'2026-01-15', ok:true },
          { t:'CLIA certificate of waiver', n:'05D2148273', exp:'2026-07-12', ok:false },
        ].map((l, i) => (
          <div key={i} className="row-between" style={{padding:'12px 0', borderBottom: i < 3 ? '1px solid var(--border-soft)' : 'none'}}>
            <div>
              <div className="strong">{l.t}</div>
              <div className="muted mono" style={{fontSize:11.5}}>{l.n} · exp {l.exp}</div>
            </div>
            {l.ok ? <span className="pill pill-success"><span className="dot"/>Current</span> : <span className="pill pill-warning"><Icon.Alert size={11}/>Renewal due in 52d</span>}
          </div>
        ))}
      </div>
      <div className="card card-pad-lg">
        <div className="h2" style={{marginBottom:14}}>HIPAA officer</div>
        <div className="grid" style={{gridTemplateColumns:'1fr 1fr', gap:14}}>
          <div className="field"><label>Privacy officer</label><input defaultValue="Dr. Elena Vasquez"/></div>
          <div className="field"><label>Security officer</label><input defaultValue="Dr. Marcus Okonkwo"/></div>
          <div className="field"><label>Breach notification email</label><input defaultValue="hipaa@missionbay.rx" type="email"/></div>
          <div className="field"><label>Annual risk assessment</label><input defaultValue="Last completed Mar 14, 2026" readOnly/></div>
        </div>
      </div>
    </React.Fragment>
  );
}

function PricingSettings() {
  return (
    <React.Fragment>
      <div className="card card-pad-lg">
        <div className="h2" style={{marginBottom:6}}>Cash pricing rules</div>
        <div className="muted" style={{fontSize:13, marginBottom:14}}>Applies when patient is uninsured or chooses to bypass insurance.</div>
        <div className="grid" style={{gridTemplateColumns:'1fr 1fr 1fr', gap:14}}>
          <div className="field"><label>Cost basis</label><select defaultValue="acq"><option value="acq">Acquisition cost</option><option>AWP</option><option>WAC</option></select></div>
          <div className="field"><label>Markup</label><input defaultValue="15%" className="mono"/></div>
          <div className="field"><label>Minimum fee</label><input defaultValue="$10.00" className="mono"/></div>
        </div>
      </div>
      <div className="card card-pad-lg">
        <div className="h2" style={{marginBottom:14}}>DIR fee rules</div>
        {[
          ['Auto-flag claims with projected DIR > $5', true],
          ['Block dispensing if net reimbursement < acquisition cost', true],
          ['Surface DIR-projection in patient profile', true],
          ['Email weekly DIR summary to owner', false],
        ].map((r, i) => (
          <div key={i} className="row-between" style={{padding:'10px 0', borderBottom: i < 3 ? '1px solid var(--border-soft)' : 'none'}}>
            <span style={{fontSize:13}}>{r[0]}</span>
            <div className={"toggle " + (r[1] ? 'on' : '')}/>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

function HardwareSettings() {
  const Icon = window.Icon;
  const devs = [
    { n:'Zebra ZD420 · Label printer', s:'Connected', loc:'Counter 1' },
    { n:'Zebra ZD420 · Label printer', s:'Connected', loc:'Counter 2' },
    { n:'WACOM STU-540 · Signature pad', s:'Connected', loc:'Register 1' },
    { n:'WACOM STU-540 · Signature pad', s:'Connected', loc:'Register 2' },
    { n:'Honeywell 1900GSR · NDC scanner', s:'Connected', loc:'Intake' },
    { n:'APG VPK-15B · Cash drawer', s:'Connected', loc:'Register 1' },
    { n:'Parata Max · Robotic dispenser', s:'Connected', loc:'Robot bay A' },
    { n:'TempSentry T1 · Fridge probe', s:'Alarm', loc:'Fridge 2' },
  ];
  return (
    <div className="card card-pad-lg">
      <div className="h2" style={{marginBottom:14}}>Hardware</div>
      {devs.map((d, i) => (
        <div key={i} className="row-between" style={{padding:'12px 0', borderBottom: i < devs.length - 1 ? '1px solid var(--border-soft)' : 'none'}}>
          <div style={{display:'flex', alignItems:'center', gap:14}}>
            <div className="hub-icon"><Icon.Print size={16}/></div>
            <div>
              <div className="strong">{d.n}</div>
              <div className="muted" style={{fontSize:12.5}}>{d.loc}</div>
            </div>
          </div>
          {d.s === 'Connected' ? <span className="pill pill-success"><span className="dot"/>Connected</span> : <span className="pill pill-warning"><Icon.Alert size={11}/>Alarm</span>}
        </div>
      ))}
      <button className="btn btn-soft btn-sm" style={{marginTop:10}}>+ Pair device</button>
    </div>
  );
}

function RolesSettings() {
  const roles = [
    { n:'Pharmacist-in-Charge', perms:['All', 'Override DUR', 'Adjust pricing', 'Export DEA 222'] },
    { n:'Staff Pharmacist', perms:['Verify Rx', 'Final check', 'Process returns'] },
    { n:'Pharmacy Technician', perms:['Intake', 'Fill', 'Pickup checkout'] },
    { n:'Cashier', perms:['Pickup checkout', 'OTC sale'] },
    { n:'Pharmacy Intern', perms:['Intake', 'Fill (supervised)'] },
  ];
  return (
    <div className="card card-pad-lg">
      <div className="h2" style={{marginBottom:14}}>Roles & permissions</div>
      {roles.map((r, i) => (
        <div key={i} style={{padding:'12px 0', borderBottom: i < roles.length - 1 ? '1px solid var(--border-soft)' : 'none'}}>
          <div className="row-between">
            <div className="strong">{r.n}</div>
            <button className="btn btn-ghost btn-sm">Edit</button>
          </div>
          <div style={{display:'flex', gap:6, flexWrap:'wrap', marginTop:6}}>
            {r.perms.map((p, j) => <span key={j} className="pill pill-brand">{p}</span>)}
          </div>
        </div>
      ))}
    </div>
  );
}

function NotificationsSettings() {
  const ch = [
    ['Refill ready · SMS', true],
    ['Refill ready · mobile app push', true],
    ['Refill ready · IVR call', false],
    ['Auto-refill processed · SMS', true],
    ['Annual prescription review reminder', true],
    ['Birthday outreach', false],
  ];
  return (
    <div className="card card-pad-lg">
      <div className="h2" style={{marginBottom:14}}>Patient notification templates</div>
      {ch.map((r, i) => (
        <div key={i} className="row-between" style={{padding:'12px 0', borderBottom: i < ch.length - 1 ? '1px solid var(--border-soft)' : 'none'}}>
          <span style={{fontSize:13}}>{r[0]}</span>
          <div className={"toggle " + (r[1] ? 'on' : '')}/>
        </div>
      ))}
    </div>
  );
}

function PlanSettings() {
  const Icon = window.Icon;
  return (
    <React.Fragment>
      <div className="card card-pad-lg" style={{background:'linear-gradient(135deg, var(--brand-soft-2), var(--brand-soft))', border:'1px solid #C7E1D2'}}>
        <div className="row-between" style={{alignItems:'flex-start'}}>
          <div>
            <div className="muted" style={{fontSize:12, letterSpacing:'.06em', textTransform:'uppercase'}}>Current plan</div>
            <div className="serif" style={{fontSize:32, marginTop:4}}>Growth</div>
            <div style={{fontSize:13, color:'var(--ink-2)', marginTop:6, maxWidth:520}}>Single location · unlimited Rx volume · advanced analytics · 24/7 pharmacist-trained support.</div>
          </div>
          <div className="right">
            <div className="num" style={{fontSize:34, fontWeight:700}}>$1,290 <span className="muted" style={{fontSize:14, fontWeight:500}}>/ month</span></div>
            <div className="muted" style={{fontSize:12, marginTop:4}}>Next invoice May 31</div>
          </div>
        </div>
        <div style={{display:'flex', gap:8, marginTop:18}}>
          <button className="btn btn-ghost">Compare tiers</button>
          <button className="btn btn-primary">Upgrade to Enterprise</button>
        </div>
      </div>
      <div className="card">
        <div className="card-head"><h3>Invoices</h3><button className="btn btn-ghost btn-sm"><Icon.Download size={12}/> Download all</button></div>
        <div className="table-wrap" style={{borderRadius:0, border:'none', boxShadow:'none'}}>
          <table>
            <thead><tr><th>Invoice</th><th>Date</th><th className="right">Amount</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {[
                ['INV-2026-005','May 01','$1,290.00','paid'],
                ['INV-2026-004','Apr 01','$1,290.00','paid'],
                ['INV-2026-003','Mar 01','$1,290.00','paid'],
                ['INV-2026-002','Feb 01','$1,290.00','paid'],
                ['INV-2026-001','Jan 01','$1,290.00','paid'],
              ].map((r, i) => (
                <tr key={i}>
                  <td className="mono strong">{r[0]}</td>
                  <td className="muted">{r[1]}</td>
                  <td className="right num strong">{r[2]}</td>
                  <td><span className="pill pill-success"><span className="dot"/>Paid</span></td>
                  <td><button className="btn btn-ghost btn-sm"><Icon.Download size={12}/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

function PreferencesSettings() {
  return (
    <div className="card card-pad-lg">
      <div className="h2" style={{marginBottom:14}}>Preferences</div>
      <div className="grid" style={{gridTemplateColumns:'1fr 1fr', gap:14}}>
        <div className="field"><label>Default landing page</label><select defaultValue="dash"><option value="dash">Dashboard</option><option>Rx Queue</option><option>Pickup</option></select></div>
        <div className="field"><label>Default queue view</label><select defaultValue="all"><option value="all">All</option><option>Mine</option><option>Urgent</option></select></div>
        <div className="field"><label>Density</label><select defaultValue="cmf"><option value="cmf">Comfortable</option><option>Compact</option></select></div>
        <div className="field"><label>Locale</label><select defaultValue="en-US"><option value="en-US">English (US)</option><option>Espa\u00f1ol</option></select></div>
        <div className="field"><label>Time format</label><select defaultValue="12"><option value="12">12-hour</option><option>24-hour</option></select></div>
        <div className="field"><label>Currency</label><select defaultValue="usd"><option value="usd">USD ($)</option></select></div>
      </div>
      <div className="divider"/>
      <div className="h4" style={{marginBottom:10}}>Keyboard shortcuts</div>
      <div className="grid" style={{gridTemplateColumns:'1fr 1fr', gap:10, fontSize:12.5}}>
        {[
          ['New Rx','N'], ['Search','/'], ['Toggle queue filter','F'],
          ['Pickup checkout','P'], ['Final check','C'], ['Print label','⌘P'],
        ].map((k, i) => (
          <div key={i} className="row-between"><span className="muted">{k[0]}</span><span className="key">{k[1]}</span></div>
        ))}
      </div>
    </div>
  );
}

function GenericSettings() {
  return <div className="card card-pad-lg muted" style={{padding:40, textAlign:'center'}}>Configure options here.</div>;
}

window.ScreensSettings = { Integrations, SettingsHub, SettingsPage };

// Patients + Staff

function Patients({ goDetail }) {
  const D = window.AppData;
  const Icon = window.Icon;
  return (
    <div className="main">
      <div className="page-head">
        <div>
          <div className="page-title">Patients</div>
          <div className="page-sub">{D.PATIENTS.length.toLocaleString()} active profiles · HIPAA-encrypted at rest</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-ghost"><Icon.Upload size={14}/> Import</button>
          <button className="btn btn-primary"><Icon.Plus size={14}/> New patient</button>
        </div>
      </div>

      <div className="kpi-grid cols-4" style={{marginBottom:16}}>
        <div className="kpi accent"><div className="kpi-label">Active patients</div><div className="kpi-value num">4,218</div><div className="kpi-sub"><span className="delta-up">+38 this month</span></div></div>
        <div className="kpi"><div className="kpi-label">Adherence avg</div><div className="kpi-value num">86%</div><div className="kpi-sub muted">Goal 90%</div></div>
        <div className="kpi"><div className="kpi-label">Below 70% adherence</div><div className="kpi-value num">142</div><div className="kpi-sub muted">Outreach queue</div></div>
        <div className="kpi"><div className="kpi-label">MTM eligible</div><div className="kpi-value num">312</div><div className="kpi-sub muted">Medicare Part D, 4+ Rx</div></div>
      </div>

      <div className="card">
        <div className="card-head">
          <div className="tabs">
            <div className="tab active">All</div>
            <div className="tab">Today</div>
            <div className="tab">Auto-refill</div>
            <div className="tab">Attention</div>
            <div className="tab">MTM</div>
          </div>
          <div className="row">
            <button className="btn btn-ghost btn-sm"><Icon.Filter size={12}/> Plan</button>
            <button className="btn btn-ghost btn-sm"><Icon.Filter size={12}/> Allergies</button>
          </div>
        </div>
        <div className="table-wrap" style={{borderRadius:0, border:'none', boxShadow:'none'}}>
          <table>
            <thead><tr>
              <th>MRN</th><th>Patient</th><th>DOB</th><th>Plan</th><th>Allergies</th>
              <th className="right">Active Rx</th><th className="right">Adherence</th><th>Last visit</th><th>Status</th><th></th>
            </tr></thead>
            <tbody>
              {D.PATIENTS.map(p => (
                <tr key={p.mrn} onClick={() => goDetail(p)} style={{cursor:'pointer'}}>
                  <td className="mono muted">{p.mrn}</td>
                  <td>
                    <div style={{display:'flex', alignItems:'center', gap:10}}>
                      <div className="avatar" style={{width:30, height:30, fontSize:11, background: p.status === 'attention' ? 'linear-gradient(135deg,#C58A1A,#E0B459)' : 'var(--brand-grad)'}}>
                        {p.name.split(' ').map(n => n[0]).slice(0,2).join('')}
                      </div>
                      <div>
                        <div className="strong">{p.name}</div>
                        <div className="muted" style={{fontSize:11.5}}>{p.age} · {p.sex} · {p.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="mono muted">{p.dob}</td>
                  <td>{p.plan}</td>
                  <td>{p.allergies.length === 0 ? <span className="muted">—</span> : p.allergies.map((a,i) => <span key={i} className="pill pill-warning" style={{marginRight:4}}><Icon.Alert size={10}/>{a}</span>)}</td>
                  <td className="right num strong">{p.rxCount}</td>
                  <td className="right">
                    <div style={{display:'inline-flex', alignItems:'center', gap:8}}>
                      <div className="progress" style={{width:60}}><div style={{width: p.adherence + '%', background: p.adherence < 75 ? 'var(--warning)' : 'var(--brand-grad)'}}/></div>
                      <span className="num strong">{p.adherence}%</span>
                    </div>
                  </td>
                  <td className="muted">{p.lastVisit}</td>
                  <td>
                    {p.status === 'attention' ? <span className="pill pill-warning"><span className="dot"/>Attention</span> : <span className="pill pill-success"><span className="dot"/>Active</span>}
                  </td>
                  <td><Icon.Chevron size={14}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PatientDetail({ patient, onBack }) {
  const Icon = window.Icon;
  const { Donut, AreaChart } = window.Charts;
  const p = patient;
  const fillHistory = Array.from({length:12}, (_,i) => ({m: ['Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May'][i], total: 3 + Math.round(Math.random()*4)}));
  return (
    <div className="main">
      <div className="page-head">
        <div>
          <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:6}}>
            <button className="btn btn-ghost btn-sm" onClick={onBack}><Icon.ArrowLeft size={12}/> Back</button>
            <span className="pill pill-neutral mono">{p.mrn}</span>
            <span className="pill pill-success"><span className="dot"/>Active</span>
            {p.allergies.length > 0 && <span className="pill pill-warning"><Icon.Alert size={10}/> {p.allergies.length} allergies</span>}
          </div>
          <div style={{display:'flex', alignItems:'center', gap:14}}>
            <div className="avatar" style={{width:52, height:52, fontSize:18}}>{p.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
            <div>
              <div className="page-title">{p.name}</div>
              <div className="page-sub">{p.age} · {p.sex} · DOB {p.dob} · {p.phone}</div>
            </div>
          </div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-ghost"><Icon.Phone size={14}/> Call</button>
          <button className="btn btn-ghost"><Icon.Mail size={14}/> Message</button>
          <button className="btn btn-primary"><Icon.Plus size={14}/> New Rx</button>
        </div>
      </div>

      <div className="kpi-grid cols-4" style={{marginBottom:16}}>
        <div className="kpi accent"><div className="kpi-label">Adherence</div><div className="kpi-value num">{p.adherence}%</div><div className="kpi-sub muted">90-day rolling</div></div>
        <div className="kpi"><div className="kpi-label">Active Rx</div><div className="kpi-value num">{p.rxCount}</div><div className="kpi-sub muted">Across 4 prescribers</div></div>
        <div className="kpi"><div className="kpi-label">Year-to-date copays</div><div className="kpi-value num">$248.40</div><div className="kpi-sub muted">Deductible met</div></div>
        <div className="kpi"><div className="kpi-label">MTM sessions</div><div className="kpi-value num">2</div><div className="kpi-sub muted">Last 12 mo</div></div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 340px', gap:16}}>
        <div className="grid">
          <div className="card">
            <div className="card-head"><h3>Active medications ({p.rxCount})</h3><span className="card-sub">DUR cross-checked</span></div>
            <div className="table-wrap" style={{borderRadius:0, border:'none', boxShadow:'none'}}>
              <table>
                <thead><tr><th>Drug</th><th>SIG</th><th>Prescriber</th><th>Last fill</th><th className="right">Refills</th><th>Status</th></tr></thead>
                <tbody>
                  {[
                    ['Lisinopril 10 mg','1 tab daily','Dr. Okafor','May 21',5,'active'],
                    ['Metformin XR 1000 mg','1 tab BID with meals','Dr. Patel','May 10',3,'active'],
                    ['Atorvastatin 20 mg','1 tab at bedtime','Dr. Liu','May 02',2,'active'],
                    ['Levothyroxine 50 mcg','1 tab AM, empty stomach','Dr. Liu','Apr 28',4,'active'],
                    ['Aspirin 81 mg','1 tab daily','Dr. Okafor','Apr 18',5,'active'],
                    ['Calcium 600 + D','1 tab BID','Dr. Liu','Apr 02',0,'refill-due'],
                    ['Vitamin B12 1000 mcg','1 tab daily','Dr. Liu','Mar 14',6,'active'],
                  ].map((r, i) => (
                    <tr key={i}>
                      <td className="strong">{r[0]}</td>
                      <td className="muted" style={{fontSize:12.5}}>{r[1]}</td>
                      <td>{r[2]}</td>
                      <td className="mono muted">{r[3]}</td>
                      <td className="right num">{r[4]}</td>
                      <td>{r[5] === 'active' ? <span className="pill pill-success"><span className="dot"/>Active</span> : <span className="pill pill-warning"><span className="dot"/>Refill due</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-head"><h3>Fill history</h3><span className="card-sub">12 months</span></div>
            <div className="card-pad">
              <AreaChart data={fillHistory} valueKey="total" width={760} height={180}/>
            </div>
          </div>

          <div className="card">
            <div className="card-head"><h3>Clinical notes</h3><button className="btn btn-soft btn-sm">+ Add note</button></div>
            <div style={{padding:'4px 16px 14px'}}>
              {[
                { d:'May 14', who:'Dr. Vasquez', t:'MTM consultation. Reviewed all 7 medications. No concerns. BP trending down on increased dose. Encouraged adherence to Vitamin D.' },
                { d:'Apr 02', who:'Dr. Vasquez', t:'Patient reports occasional dizziness on rising. Counseled on slow position changes. No change to therapy.' },
                { d:'Feb 18', who:'A. Petrov', t:'Vaccination: shingles (2nd dose). No adverse reaction observed during 15-min wait.' },
              ].map((n, i) => (
                <div key={i} style={{padding:'10px 0', borderBottom: i < 2 ? '1px solid var(--border-soft)' : 'none'}}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                    <div className="strong" style={{fontSize:13}}>{n.who}</div>
                    <div className="muted mono" style={{fontSize:11.5}}>{n.d}</div>
                  </div>
                  <div style={{fontSize:12.5, marginTop:4, color:'var(--ink-2)'}}>{n.t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid">
          <div className="card card-pad">
            <div className="h4" style={{marginBottom:12}}>Insurance</div>
            <div className="row-between" style={{padding:'4px 0', fontSize:12.5}}><span className="muted">Plan</span><span className="strong">{p.plan}</span></div>
            <div className="row-between" style={{padding:'4px 0', fontSize:12.5}}><span className="muted">Member ID</span><span className="mono strong">XJK-882-014-7</span></div>
            <div className="row-between" style={{padding:'4px 0', fontSize:12.5}}><span className="muted">Group</span><span className="mono strong">RXBIN 003858</span></div>
            <div className="row-between" style={{padding:'4px 0', fontSize:12.5}}><span className="muted">Effective</span><span>2025-01-01 to 2025-12-31</span></div>
            <div className="row-between" style={{padding:'4px 0', fontSize:12.5}}><span className="muted">Deductible</span><span className="strong">Met</span></div>
            <div className="divider"/>
            <div className="h4" style={{marginBottom:8}}>Secondary</div>
            <div className="muted" style={{fontSize:12.5}}>None on file</div>
          </div>

          <div className="card card-pad">
            <div className="h4" style={{marginBottom:12}}>Allergies & alerts</div>
            {p.allergies.length === 0 ? <div className="muted" style={{fontSize:12.5}}>No known drug allergies on file.</div> :
              p.allergies.map((a, i) => (
                <div key={i} style={{display:'flex', alignItems:'center', gap:8, padding:'8px 0', borderBottom: i < p.allergies.length - 1 ? '1px solid var(--border-soft)' : 'none'}}>
                  <span className="pill pill-warning" style={{width:22, height:22, padding:0, justifyContent:'center', borderRadius:6}}><Icon.Alert size={11}/></span>
                  <div style={{flex:1, fontSize:13, fontWeight:500}}>{a}</div>
                </div>
              ))
            }
          </div>

          <div className="card card-pad">
            <div className="h4" style={{marginBottom:12}}>Communications</div>
            <div className="row-between" style={{padding:'4px 0', fontSize:12.5}}><span className="muted">SMS refill reminders</span><div className="toggle on"/></div>
            <div className="row-between" style={{padding:'4px 0', fontSize:12.5}}><span className="muted">Auto-refill enrolled</span><div className="toggle on"/></div>
            <div className="row-between" style={{padding:'4px 0', fontSize:12.5}}><span className="muted">Mobile app</span><span className="pill pill-success">Connected</span></div>
            <div className="row-between" style={{padding:'4px 0', fontSize:12.5}}><span className="muted">Preferred contact</span><span>SMS</span></div>
          </div>

          <div className="card card-pad">
            <div className="h4" style={{marginBottom:12}}>Vaccinations</div>
            {[
              ['Influenza','Sep 2024'],
              ['COVID-19 bivalent','Oct 2023'],
              ['Shingles (Shingrix #2)','Feb 2024'],
              ['Pneumococcal','Mar 2022'],
            ].map((v, i) => (
              <div key={i} className="row-between" style={{padding:'6px 0', fontSize:12.5, borderBottom: i < 3 ? '1px solid var(--border-soft)' : 'none'}}>
                <span>{v[0]}</span><span className="mono muted">{v[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Staff() {
  const D = window.AppData;
  const Icon = window.Icon;
  return (
    <div className="main">
      <div className="page-head">
        <div>
          <div className="page-title">Staff</div>
          <div className="page-sub">{D.STAFF.length} active team members · Mission Bay location</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-ghost"><Icon.Calendar size={14}/> Schedule</button>
          <button className="btn btn-primary"><Icon.Plus size={14}/> Add team member</button>
        </div>
      </div>

      <div className="kpi-grid cols-4" style={{marginBottom:16}}>
        <div className="kpi accent"><div className="kpi-label">On shift now</div><div className="kpi-value num">4</div><div className="kpi-sub muted">2 RPh, 2 Tech</div></div>
        <div className="kpi"><div className="kpi-label">Rx / hour avg</div><div className="kpi-value num">28.4</div><div className="kpi-sub"><span className="delta-up">+1.2 vs Apr</span></div></div>
        <div className="kpi"><div className="kpi-label">Verification errors</div><div className="kpi-value num">1</div><div className="kpi-sub muted">Last 30 days</div></div>
        <div className="kpi"><div className="kpi-label">CE due {'<'} 60 days</div><div className="kpi-value num">2</div><div className="kpi-sub muted">License renewal</div></div>
      </div>

      <div className="card">
        <div className="card-head">
          <div className="tabs">
            <div className="tab active">All</div>
            <div className="tab">Pharmacists</div>
            <div className="tab">Technicians</div>
            <div className="tab">Cashiers</div>
            <div className="tab">Interns</div>
          </div>
        </div>
        <div className="table-wrap" style={{borderRadius:0, border:'none', boxShadow:'none'}}>
          <table>
            <thead><tr>
              <th>Team member</th><th>Role</th><th>License</th><th>NPI</th><th>Shift</th>
              <th className="right">Rx today</th><th className="right">Errors (30d)</th><th>Status</th>
            </tr></thead>
            <tbody>
              {D.STAFF.map(s => (
                <tr key={s.id}>
                  <td>
                    <div style={{display:'flex', alignItems:'center', gap:10}}>
                      <div className="avatar" style={{width:30, height:30, fontSize:11}}>{s.name.replace('Dr. ','').split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
                      <div className="strong">{s.name}</div>
                    </div>
                  </td>
                  <td><span className={"pill " + (s.role.includes('Pharmacist') ? 'pill-brand' : (s.role.includes('Technician') ? 'pill-info' : (s.role.includes('Intern') ? 'pill-purple' : 'pill-neutral')))}>{s.role}</span></td>
                  <td className="mono muted">{s.license}</td>
                  <td className="mono muted">{s.npi}</td>
                  <td className="muted" style={{fontSize:12.5}}>{s.shift}</td>
                  <td className="right num strong">{s.rxToday}</td>
                  <td className="right num" style={{color: s.errors > 0 ? 'var(--warning)' : 'inherit'}}>{s.errors}</td>
                  <td>{s.active ? <span className="pill pill-success"><span className="dot"/>Active</span> : <span className="pill pill-neutral"><span className="dot"/>Inactive</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{height:16}}/>

      <div className="two-col">
        <div className="card">
          <div className="card-head"><h3>This week’s schedule</h3><span className="card-sub">May 19 — May 25</span></div>
          <div className="card-pad" style={{overflowX:'auto'}}>
            <div style={{display:'grid', gridTemplateColumns:'120px repeat(7, 1fr)', gap:6, minWidth:700, fontSize:12}}>
              <div></div>
              {['Mon 19','Tue 20','Wed 21','Thu 22','Fri 23','Sat 24','Sun 25'].map(d => (
                <div key={d} className="muted strong" style={{textAlign:'center', padding:'6px 0'}}>{d}</div>
              ))}
              {D.STAFF.slice(0,5).map((s, i) => (
                <React.Fragment key={s.id}>
                  <div style={{display:'flex', alignItems:'center', padding:'8px 0', fontWeight:600}}>{s.name.replace('Dr. ','').split(' ')[0]} {s.name.replace('Dr. ','').split(' ')[1][0]}.</div>
                  {[0,1,2,3,4,5,6].map(d => {
                    const on = (i + d) % 7 < 5;
                    return (
                      <div key={d} style={{padding:6}}>
                        {on ? <div style={{background:'var(--brand-soft)', color:'var(--brand-1)', borderRadius:6, padding:'6px 8px', fontSize:11, textAlign:'center', fontWeight:600}}>9a–6p</div> : <div style={{padding:'6px 8px', fontSize:11, textAlign:'center', color:'var(--muted-2)'}}>off</div>}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-head"><h3>License & CE</h3></div>
          <div className="table-wrap" style={{borderRadius:0, border:'none', boxShadow:'none'}}>
            <table>
              <thead><tr><th>Team member</th><th>Type</th><th>Expires</th><th>Status</th></tr></thead>
              <tbody>
                {[
                  ['Dr. Elena Vasquez','CA RPh','2027-04-30','ok'],
                  ['Dr. Marcus Okonkwo','CA RPh','2026-07-15','soon'],
                  ['Sophie Lin','CA Tech','2026-09-22','ok'],
                  ['Andre Petrov','CA Tech','2026-06-30','soon'],
                  ['Hana Aoki','CA Intern','2026-12-31','ok'],
                ].map((r, i) => (
                  <tr key={i}>
                    <td>{r[0]}</td>
                    <td className="muted">{r[1]}</td>
                    <td className="mono">{r[2]}</td>
                    <td>{r[3] === 'soon' ? <span className="pill pill-warning"><span className="dot"/>Renewal soon</span> : <span className="pill pill-success"><span className="dot"/>Current</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

window.ScreensPeople = { Patients, PatientDetail, Staff };

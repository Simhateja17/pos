// Reports + Analytics

function Reports() {
  const D = window.AppData;
  const Icon = window.Icon;
  return (
    <div className="main">
      <div className="page-head">
        <div>
          <div className="page-title">Reports</div>
          <div className="page-sub">One-click compliance & financial reporting · export PDF, CSV, Excel</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-ghost"><Icon.Plus size={14}/> Custom report</button>
          <button className="btn btn-primary"><Icon.Download size={14}/> Export selected</button>
        </div>
      </div>

      <div className="kpi-grid cols-4" style={{marginBottom:16}}>
        <div className="kpi accent"><div className="kpi-label">Templates</div><div className="kpi-value num">{D.REPORTS.length}</div><div className="kpi-sub muted">Compliance + financial + ops</div></div>
        <div className="kpi"><div className="kpi-label">Scheduled</div><div className="kpi-value num">6</div><div className="kpi-sub muted">Auto-emailed</div></div>
        <div className="kpi"><div className="kpi-label">Generated this month</div><div className="kpi-value num">142</div><div className="kpi-sub muted">28 by audit team</div></div>
        <div className="kpi"><div className="kpi-label">Avg generation time</div><div className="kpi-value num">1.8 s</div><div className="kpi-sub"><span className="delta-up">No setup, no SQL</span></div></div>
      </div>

      <div className="card">
        <div className="card-head">
          <div className="tabs">
            <div className="tab active">All</div>
            <div className="tab">Compliance</div>
            <div className="tab">Finance</div>
            <div className="tab">Operations</div>
            <div className="tab">Scheduled</div>
          </div>
          <div className="row">
            <button className="btn btn-ghost btn-sm"><Icon.Filter size={12}/> Regulator</button>
          </div>
        </div>
        <div className="table-wrap" style={{borderRadius:0, border:'none', boxShadow:'none'}}>
          <table>
            <thead><tr><th></th><th>Report</th><th>Category</th><th>Regulator</th><th>Schedule</th><th>Last generated</th><th></th></tr></thead>
            <tbody>
              {D.REPORTS.map(r => (
                <tr key={r.id}>
                  <td><div className="chk"/></td>
                  <td>
                    <div className="strong">{r.name}</div>
                    <div className="muted" style={{fontSize:11.5}}>{r.id}</div>
                  </td>
                  <td><span className={"pill " + (r.cat === 'Compliance' ? 'pill-info' : r.cat === 'Finance' ? 'pill-brand' : 'pill-neutral')}>{r.cat}</span></td>
                  <td className="muted">{r.regulator}</td>
                  <td className="muted">{r.schedule}</td>
                  <td className="mono muted">{r.last}</td>
                  <td>
                    <div style={{display:'flex', gap:6}}>
                      <button className="btn btn-ghost btn-sm"><Icon.Eye size={12}/></button>
                      <button className="btn btn-soft btn-sm"><Icon.Download size={12}/> Run</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{height:16}}/>

      <div className="three-col">
        <div className="card card-pad-lg">
          <div className="hub-icon"><Icon.Shield size={18}/></div>
          <div className="serif" style={{fontSize:22, marginTop:12, lineHeight:1.2}}>DEA 222 Log</div>
          <div className="muted" style={{fontSize:13, marginTop:6}}>One-click export in DEA-compliant CSV. Audit-ready. Includes Schedule II receipts, dispenses, and reconciliations.</div>
          <div style={{display:'flex', gap:8, marginTop:14}}>
            <button className="btn btn-ghost btn-sm" style={{flex:1, justifyContent:'center'}}>Preview</button>
            <button className="btn btn-primary btn-sm" style={{flex:1, justifyContent:'center'}}>Generate</button>
          </div>
        </div>
        <div className="card card-pad-lg">
          <div className="hub-icon"><Icon.Lock size={18}/></div>
          <div className="serif" style={{fontSize:22, marginTop:12, lineHeight:1.2}}>HIPAA Access Audit</div>
          <div className="muted" style={{fontSize:13, marginTop:6}}>Complete PHI access log, searchable by patient, staff member, and date. Required for annual HIPAA security reviews.</div>
          <div style={{display:'flex', gap:8, marginTop:14}}>
            <button className="btn btn-ghost btn-sm" style={{flex:1, justifyContent:'center'}}>Preview</button>
            <button className="btn btn-primary btn-sm" style={{flex:1, justifyContent:'center'}}>Generate</button>
          </div>
        </div>
        <div className="card card-pad-lg">
          <div className="hub-icon"><Icon.Coin size={18}/></div>
          <div className="serif" style={{fontSize:22, marginTop:12, lineHeight:1.2}}>PBM Reconciliation</div>
          <div className="muted" style={{fontSize:13, marginTop:6}}>Expected vs actual reimbursement per claim, by PBM. Flags discrepancies above your $-threshold for review.</div>
          <div style={{display:'flex', gap:8, marginTop:14}}>
            <button className="btn btn-ghost btn-sm" style={{flex:1, justifyContent:'center'}}>Preview</button>
            <button className="btn btn-primary btn-sm" style={{flex:1, justifyContent:'center'}}>Generate</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Analytics() {
  const D = window.AppData;
  const Icon = window.Icon;
  const { AreaChart, BarChart, Donut } = window.Charts;

  return (
    <div className="main">
      <div className="page-head">
        <div>
          <div className="page-title">Analytics</div>
          <div className="page-sub">Operational and financial insights · last 30 days</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <div className="seg"><button>7d</button><button className="on">30d</button><button>90d</button><button>YTD</button></div>
          <button className="btn btn-ghost"><Icon.Download size={14}/> Export</button>
        </div>
      </div>

      <div className="kpi-grid cols-5" style={{marginBottom:16}}>
        <div className="kpi accent"><div className="kpi-label">Total Rx</div><div className="kpi-value num">8,420</div><div className="kpi-sub"><span className="delta-up">+6.2% MoM</span></div></div>
        <div className="kpi"><div className="kpi-label">Net revenue</div><div className="kpi-value num">$248K</div><div className="kpi-sub"><span className="delta-up">+4.8%</span></div></div>
        <div className="kpi"><div className="kpi-label">Gross margin</div><div className="kpi-value num">32.4%</div><div className="kpi-sub"><span className="delta-up">+0.6 pts</span></div></div>
        <div className="kpi"><div className="kpi-label">Avg fill time</div><div className="kpi-value num">8m 24s</div><div className="kpi-sub"><span className="delta-up">-42s</span></div></div>
        <div className="kpi"><div className="kpi-label">Rx / labor hour</div><div className="kpi-value num">28.4</div><div className="kpi-sub"><span className="delta-up">+1.2</span></div></div>
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-head"><h3>Rx volume + revenue</h3><span className="card-sub">14-day rolling</span></div>
          <div className="card-pad"><AreaChart data={D.RX_VOLUME} valueKey="total" width={680} height={220}/></div>
        </div>
        <div className="card card-pad">
          <div className="h4" style={{marginBottom:14}}>Payer mix</div>
          <div style={{display:'flex', alignItems:'center', gap:14}}>
            <Donut pct={68} size={130} label="68%" sub="3rd-party"/>
            <div style={{fontSize:12.5, lineHeight:1.8, flex:1}}>
              <div className="row-between"><span><span className="lg-dot" style={{background:'var(--brand-1)'}}/>Commercial</span><span className="strong num">41%</span></div>
              <div className="row-between"><span><span className="lg-dot" style={{background:'var(--brand-2)'}}/>Medicare D</span><span className="strong num">27%</span></div>
              <div className="row-between"><span><span className="lg-dot" style={{background:'var(--warning)'}}/>Medicaid</span><span className="strong num">14%</span></div>
              <div className="row-between"><span><span className="lg-dot" style={{background:'var(--info)'}}/>Cash</span><span className="strong num">11%</span></div>
              <div className="row-between"><span><span className="lg-dot" style={{background:'var(--purple)'}}/>FSA / HSA</span><span className="strong num">7%</span></div>
            </div>
          </div>
        </div>
      </div>

      <div style={{height:16}}/>

      <div className="two-col">
        <div className="card">
          <div className="card-head"><h3>Hourly Rx volume</h3><span className="card-sub">average weekday</span></div>
          <div className="card-pad">
            <BarChart data={[
              {label:'8a',total:8},{label:'9a',total:18},{label:'10a',total:24},{label:'11a',total:28},
              {label:'12p',total:22},{label:'1p',total:24},{label:'2p',total:26},{label:'3p',total:31},
              {label:'4p',total:34},{label:'5p',total:30},{label:'6p',total:21},{label:'7p',total:11},
            ]} valueKey="total" width={680} height={200}/>
          </div>
        </div>
        <div className="card">
          <div className="card-head"><h3>Top revenue drivers</h3><span className="card-sub">30-day net margin</span></div>
          <div style={{padding:'4px 16px 14px'}}>
            {[
              { d:'Eliquis 5 mg', rev:8420, m:42 },
              { d:'Humira Pen 40 mg', rev:6280, m:28 },
              { d:'Janumet 50/1000', rev:4180, m:36 },
              { d:'Advair Diskus 250/50', rev:3840, m:31 },
              { d:'Adderall XR 20 mg', rev:3120, m:48 },
            ].map((x, i) => (
              <div key={i} style={{display:'grid', gridTemplateColumns:'1fr auto auto', gap:14, padding:'10px 0', borderBottom: i < 4 ? '1px solid var(--border-soft)' : 'none'}}>
                <div className="strong">{x.d}</div>
                <div className="num strong">${x.rev.toLocaleString()}</div>
                <div className="num" style={{color:'var(--success)'}}>{x.m}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{height:16}}/>

      <div className="three-col">
        <div className="card card-pad">
          <div className="h4" style={{marginBottom:8}}>Adherence cohort</div>
          <div style={{display:'flex', alignItems:'center', gap:14, padding:'10px 0'}}>
            <Donut pct={86} size={110} label="86%" sub="PDC ≥0.8"/>
            <div style={{fontSize:12.5, flex:1}}>
              <div className="muted" style={{marginBottom:6}}>Cohort: chronic Rx, 90-day rolling</div>
              <div className="row-between"><span className="muted">Above 90%</span><span className="num strong">3,124</span></div>
              <div className="row-between"><span className="muted">70–90%</span><span className="num strong">962</span></div>
              <div className="row-between"><span className="muted">Below 70%</span><span className="num strong" style={{color:'var(--warning)'}}>142</span></div>
            </div>
          </div>
        </div>
        <div className="card card-pad">
          <div className="h4" style={{marginBottom:8}}>Pickup time</div>
          <div style={{display:'flex', alignItems:'center', gap:14, padding:'10px 0'}}>
            <Donut pct={64} size={110} label="4.3h" sub="median"/>
            <div style={{fontSize:12.5, flex:1}}>
              <div className="muted" style={{marginBottom:6}}>From ready \u2192 picked up</div>
              <div className="row-between"><span className="muted">Under 1h</span><span className="num strong">38%</span></div>
              <div className="row-between"><span className="muted">1–6h</span><span className="num strong">42%</span></div>
              <div className="row-between"><span className="muted">Over 24h</span><span className="num strong" style={{color:'var(--warning)'}}>14%</span></div>
            </div>
          </div>
        </div>
        <div className="card card-pad">
          <div className="h4" style={{marginBottom:8}}>Returns to stock</div>
          <div style={{display:'flex', alignItems:'center', gap:14, padding:'10px 0'}}>
            <Donut pct={4} size={110} label="4.2%" sub="of fills"/>
            <div style={{fontSize:12.5, flex:1}}>
              <div className="muted" style={{marginBottom:6}}>Reason breakdown</div>
              <div className="row-between"><span className="muted">Not picked up</span><span className="num strong">68%</span></div>
              <div className="row-between"><span className="muted">Therapy changed</span><span className="num strong">18%</span></div>
              <div className="row-between"><span className="muted">Other</span><span className="num strong">14%</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.ScreensInsights = { Reports, Analytics };

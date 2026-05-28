// PBM Claims + DIR Fee Tracker

function Claims() {
  const D = window.AppData;
  const Icon = window.Icon;
  const { BarChart } = window.Charts;

  const paid = D.CLAIMS.filter(c => c.status === 'paid');
  const totalBilled = D.CLAIMS.reduce((s,c) => s + c.billed, 0);
  const totalPaid = paid.reduce((s,c) => s + c.paid, 0);
  const totalDIR = D.CLAIMS.reduce((s,c) => s + c.dir, 0);

  const pbmMix = [
    { label:'CVS', total: 38400 },
    { label:'OptumRx', total: 28200 },
    { label:'Express Scripts', total: 24800 },
    { label:'Humana', total: 18900 },
    { label:'BCBS', total: 14200 },
    { label:'Cigna', total: 9800 },
    { label:'UHC', total: 8400 },
  ];

  return (
    <div className="main">
      <div className="page-head">
        <div>
          <div className="page-title">PBM Claims</div>
          <div className="page-sub">Real-time NCPDP D.0 adjudication · 6 PBMs connected</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-ghost"><Icon.Download size={14}/> Export 837</button>
          <button className="btn btn-primary"><Icon.Refresh size={14}/> Re-adjudicate selected</button>
        </div>
      </div>

      <div className="kpi-grid cols-5" style={{marginBottom:16}}>
        <div className="kpi accent"><div className="kpi-label">Claims today</div><div className="kpi-value num">{D.CLAIMS.length}</div><div className="kpi-sub muted">142 total / day avg</div></div>
        <div className="kpi"><div className="kpi-label">Approval rate</div><div className="kpi-value num">94.6%</div><div className="kpi-sub"><span className="delta-up">+0.4 vs Apr</span></div></div>
        <div className="kpi"><div className="kpi-label">Billed</div><div className="kpi-value num">${totalBilled.toFixed(2)}</div><div className="kpi-sub muted">Across all PBMs</div></div>
        <div className="kpi"><div className="kpi-label">Plan paid</div><div className="kpi-value num">${totalPaid.toFixed(2)}</div><div className="kpi-sub muted">Net of copays</div></div>
        <div className="kpi"><div className="kpi-label">DIR projection</div><div className="kpi-value num" style={{color:'var(--danger)'}}>${totalDIR.toFixed(2)}</div><div className="kpi-sub muted">Post-adjustment</div></div>
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-head"><h3>Volume by PBM · month-to-date</h3><span className="card-sub">$ billed</span></div>
          <div className="card-pad"><BarChart data={pbmMix} valueKey="total" width={680} height={200}/></div>
        </div>
        <div className="card">
          <div className="card-head"><h3>Rejection reasons</h3><span className="card-sub">Last 30 days</span></div>
          <div style={{padding:'4px 16px 14px'}}>
            {[
              { r:'PA required', n:18, pct:42 },
              { r:'NDC not covered', n:11, pct:26 },
              { r:'Refill too soon', n:6, pct:14 },
              { r:'Step-therapy required', n:4, pct:9 },
              { r:'Member not eligible', n:3, pct:7 },
              { r:'Other', n:1, pct:2 },
            ].map((x, i) => (
              <div key={i} style={{padding:'8px 0', borderBottom: i < 5 ? '1px solid var(--border-soft)' : 'none'}}>
                <div className="row-between" style={{marginBottom:6}}>
                  <span style={{fontSize:13, fontWeight:500}}>{x.r}</span>
                  <span className="num muted" style={{fontSize:12}}>{x.n} · {x.pct}%</span>
                </div>
                <div className="progress"><div style={{width: x.pct + '%'}}/></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{height:16}}/>

      <div className="card">
        <div className="card-head">
          <div className="tabs">
            <div className="tab active">All</div>
            <div className="tab">Pending</div>
            <div className="tab">Paid</div>
            <div className="tab">Rejected (5)</div>
            <div className="tab">Reversed</div>
          </div>
          <div className="row">
            <button className="btn btn-ghost btn-sm"><Icon.Filter size={12}/> PBM</button>
            <button className="btn btn-ghost btn-sm"><Icon.Calendar size={12}/> Date</button>
          </div>
        </div>
        <div className="table-wrap" style={{borderRadius:0, border:'none', boxShadow:'none'}}>
          <table>
            <thead><tr>
              <th>Claim ID</th><th>Rx</th><th>Patient</th><th>Drug</th><th>PBM</th>
              <th className="right">Billed</th><th className="right">Plan paid</th><th className="right">Copay</th><th className="right">DIR proj.</th>
              <th>Date</th><th>Status</th>
            </tr></thead>
            <tbody>
              {D.CLAIMS.map(c => (
                <tr key={c.id}>
                  <td className="mono strong">{c.id}</td>
                  <td className="mono muted">{c.rx}</td>
                  <td>{c.pt}</td>
                  <td className="muted">{c.drug}</td>
                  <td>{c.pbm}</td>
                  <td className="right num strong">${c.billed.toFixed(2)}</td>
                  <td className="right num" style={{color: c.paid > 0 ? 'var(--success)' : 'var(--muted-2)'}}>{c.paid > 0 ? '$' + c.paid.toFixed(2) : '—'}</td>
                  <td className="right num">{c.copay > 0 ? '$' + c.copay.toFixed(2) : '—'}</td>
                  <td className="right num" style={{color: c.dir < 0 ? 'var(--danger)' : 'var(--muted-2)'}}>{c.dir < 0 ? '$' + c.dir.toFixed(2) : '—'}</td>
                  <td className="muted">{c.date}</td>
                  <td>
                    {c.status === 'paid' && <span className="pill pill-success"><span className="dot"/>Paid</span>}
                    {c.status === 'rejected' && <span className="pill pill-danger"><span className="dot"/>{c.reason || 'Rejected'}</span>}
                    {c.status === 'pending' && <span className="pill pill-warning"><span className="dot"/>Pending</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DIRTracker() {
  const D = window.AppData;
  const Icon = window.Icon;
  const { Donut } = window.Charts;

  return (
    <div className="main">
      <div className="page-head">
        <div>
          <div className="page-title">DIR Fee Tracker</div>
          <div className="page-sub">Projected post-transaction adjustments · model v2.4 · 6 PBM data feeds</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-ghost"><Icon.Download size={14}/> Export</button>
          <button className="btn btn-soft"><Icon.Info size={14}/> Methodology</button>
        </div>
      </div>

      <div className="kpi-grid cols-4" style={{marginBottom:16}}>
        <div className="kpi accent">
          <div className="kpi-label">May projection</div>
          <div className="kpi-value num" style={{color:'var(--danger)'}}>-$3,940</div>
          <div className="kpi-sub muted">Net of all PBM adjustments</div>
        </div>
        <div className="kpi"><div className="kpi-label">YTD actual</div><div className="kpi-value num" style={{color:'var(--danger)'}}>-$20,880</div><div className="kpi-sub muted">Through April</div></div>
        <div className="kpi"><div className="kpi-label">YTD vs forecast</div><div className="kpi-value num">+$420</div><div className="kpi-sub"><span className="delta-up">Forecast within 2%</span></div></div>
        <div className="kpi"><div className="kpi-label">Performance score</div><div className="kpi-value num">83</div><div className="kpi-sub muted">of 100 · quartile 2</div></div>
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-head">
            <h3>Projected vs. actual · 6 months</h3>
            <div className="legend">
              <span><span className="lg-dot" style={{background:'var(--brand-1)'}}/>Projected</span>
              <span><span className="lg-dot" style={{background:'var(--danger)'}}/>Actual</span>
            </div>
          </div>
          <div className="card-pad">
            <svg viewBox="0 0 680 220" className="chart-area" style={{height:220}} preserveAspectRatio="none">
              {[0,1,2,3,4].map(i => <line key={i} className="grid-line" x1="24" x2="656" y1={20 + i*45} y2={20 + i*45}/>)}
              {D.DIR_HISTORY.map((d, i) => {
                const x = 60 + i * 105;
                const projH = Math.abs(d.proj) / 60;
                const actH = d.actual ? Math.abs(d.actual) / 60 : 0;
                return (
                  <g key={i}>
                    <rect x={x - 18} y={220 - projH - 30} width="16" height={projH} fill="url(#brandGrad)" rx="3"/>
                    {d.actual && <rect x={x + 2} y={220 - actH - 30} width="16" height={actH} fill="var(--danger)" rx="3" opacity="0.85"/>}
                    <text x={x} y={210} textAnchor="middle" fontSize="11" fill="var(--muted)" fontFamily="JetBrains Mono">{d.m}</text>
                    <text x={x} y={220 - projH - 36} textAnchor="middle" fontSize="10" fill="var(--brand-1)" fontFamily="JetBrains Mono" fontWeight="600">${Math.abs(d.proj/1000).toFixed(1)}k</text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="card card-pad">
          <div className="h4" style={{marginBottom:14}}>PBM performance score</div>
          <div style={{display:'flex', alignItems:'center', gap:14}}>
            <Donut pct={83} size={130} label="83" sub="of 100"/>
            <div style={{fontSize:12.5, lineHeight:1.7, flex:1}}>
              <div className="row-between"><span className="muted">Generic dispense rate</span><span className="strong num">92%</span></div>
              <div className="row-between"><span className="muted">Adherence (PDC ≥0.8)</span><span className="strong num">86%</span></div>
              <div className="row-between"><span className="muted">Medication therapy</span><span className="strong num">71%</span></div>
              <div className="row-between"><span className="muted">High-risk meds avoid.</span><span className="strong num">88%</span></div>
            </div>
          </div>
          <div className="divider"/>
          <div className="row-between" style={{fontSize:12.5, marginBottom:8}}><span className="muted">Quartile improvement \u2192 Q1</span><span className="strong" style={{color:'var(--brand-1)'}}>+$1,820 / month</span></div>
          <button className="btn btn-soft" style={{width:'100%', justifyContent:'center'}}>Open improvement playbook</button>
        </div>
      </div>

      <div style={{height:16}}/>

      <div className="card">
        <div className="card-head">
          <h3>DIR exposure by PBM · May projection</h3>
          <span className="card-sub">click a row to see contributing Rx</span>
        </div>
        <div className="table-wrap" style={{borderRadius:0, border:'none', boxShadow:'none'}}>
          <table>
            <thead><tr>
              <th>PBM</th><th className="right">Rx volume</th><th className="right">Billed</th>
              <th className="right">Plan paid</th><th className="right">DIR proj.</th><th className="right">Net per Rx</th>
              <th>Trend</th><th>Performance</th>
            </tr></thead>
            <tbody>
              {[
                { p:'CVS Caremark', rx:184, b:7820, paid:6920, dir:-1240, score:79 },
                { p:'OptumRx', rx:142, b:5840, paid:5180, dir:-880, score:84 },
                { p:'Express Scripts', rx:128, b:5120, paid:4480, dir:-720, score:81 },
                { p:'Humana Part D', rx:96, b:3680, paid:3240, dir:-520, score:88 },
                { p:'BCBS', rx:74, b:2840, paid:2480, dir:-320, score:86 },
                { p:'Cigna PPO', rx:42, b:2080, paid:1840, dir:-180, score:90 },
                { p:'UHC', rx:38, b:1480, paid:1280, dir:-80, score:91 },
              ].map((r, i) => {
                const netPerRx = (r.paid + r.dir) / r.rx;
                return (
                  <tr key={i}>
                    <td className="strong">{r.p}</td>
                    <td className="right num">{r.rx}</td>
                    <td className="right num">${r.b.toLocaleString()}</td>
                    <td className="right num">${r.paid.toLocaleString()}</td>
                    <td className="right num" style={{color:'var(--danger)'}}>${r.dir.toLocaleString()}</td>
                    <td className="right num strong">${netPerRx.toFixed(2)}</td>
                    <td>
                      <div style={{display:'inline-flex', alignItems:'center', gap:8}}>
                        <div className="progress" style={{width:80}}><div style={{width: r.score + '%'}}/></div>
                        <span className="num strong" style={{fontSize:12}}>{r.score}</span>
                      </div>
                    </td>
                    <td>{r.score >= 85 ? <span className="pill pill-success">Q1</span> : r.score >= 80 ? <span className="pill pill-info">Q2</span> : <span className="pill pill-warning">Q3</span>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{height:16}}/>

      <div className="card card-pad-lg" style={{background:'linear-gradient(135deg, var(--brand-soft-2), var(--brand-soft))', border:'1px solid #C7E1D2'}}>
        <div style={{display:'flex', gap:14, alignItems:'flex-start'}}>
          <div className="hub-icon"><Icon.Info size={18}/></div>
          <div style={{flex:1}}>
            <div className="h3" style={{marginBottom:4}}>Industry first: pre-transaction DIR visibility</div>
            <div style={{fontSize:13, color:'var(--ink-2)', maxWidth:780}}>
              PharmOS pulls adjudication signals from PBM feeds and models projected post-transaction adjustments before the PBM applies them. You can see net reimbursement per script before the patient walks out — not three months later when the chargeback hits.
            </div>
          </div>
          <button className="btn btn-primary">Configure rules</button>
        </div>
      </div>
    </div>
  );
}

window.ScreensBilling = { Claims, DIRTracker };

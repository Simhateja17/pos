// Sales-area screens: Dashboard, Billing, Sales/Orders, Register, Returns
const { useState: useS1 } = React;

function Page({ title, sub, actions, children }) {
  return (
    <div className="main">
      <div className="page-head">
        <div>
          <div className="page-title">{title}</div>
          {sub && <div className="page-sub">{sub}</div>}
        </div>
        {actions && <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{actions}</div>}
      </div>
      {children}
    </div>);

}

function Kpi({ label, value, sub, accent, icon, deltaClass }) {
  const Icon = window.Icon;
  const Ic = icon ? Icon[icon] : null;
  return (
    <div className={"kpi " + (accent ? "accent" : "")}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="kpi-label">{label}</span>
        {Ic && <span style={{ color: 'var(--brand-1)' }}><Ic size={14} /></span>}
      </div>
      <div className="kpi-value num">{value}</div>
      {sub && <div className={"kpi-sub " + (deltaClass || "")}>{sub}</div>}
    </div>);

}

// =============== DASHBOARD ===============
function Dashboard() {
  const D = window.AppData;
  const Icon = window.Icon;
  const { AreaChart, DualAreaBar, HBar } = window.Charts;
  return (
    <Page title="Dashboard" sub="Today · 03 May 2026 · Mumbai · Bandra" actions={
    <>
        <button className="btn btn-ghost"><Icon.Download size={14} />Export day</button>
        <button className="btn btn-primary"><Icon.Bolt size={14} />Open Register</button>
      </>
    }>
      <div className="kpi-grid" style={{ marginBottom: 16 }}>
        <div className="kpi accent">
          <div className="kpi-label">Today's sales</div>
          <div className="kpi-value">₹4.84 L</div>
          <div className="kpi-sub"><span className="delta-up">▲ 12.4%</span><span>vs yesterday · 342 bills</span></div>
        </div>
        <Kpi label="Avg. bill value" value="₹2,550" sub={<><span className="delta-up">▲ 8.0%</span><span>30-day avg ₹2,360</span></>} />
        <Kpi label="Gross margin" value="37.8%" sub={<><span className="delta-down">▼ 1.2%</span><span>Target 40%</span></>} />
        <Kpi label="Cash drawer" value="₹50,240" sub={<><span className="pill pill-warning"><span className="dot"></span>1 mismatch · C-3</span></>} icon="Drawer" />
        <Kpi label="Low stock alerts" value="14" sub={<span>3 critical · 11 reorder</span>} icon="Alert" />
        <Kpi label="UPI settlement" value="₹2.18 L" sub={<span>Expected today by 8:00 PM · Razorpay</span>} icon="QR" />
      </div>

      <div className="two-col" style={{ marginBottom: 16 }}>
        <div className="card">
          <div className="card-head">
            <div>
              <h3>Sales trend</h3>
              <div className="card-sub">Last 14 days · area shows revenue, bars are profit</div>
            </div>
            <div className="seg">
              <button>7D</button>
              <button className="on">14D</button>
              <button>30D</button>
            </div>
          </div>
          <div className="card-pad">
            <DualAreaBar data={D.MONTH_TREND.slice(-10)} height={220} />
          </div>
        </div>
        <div className="card">
          <div className="card-head">
            <h3>Action center</h3>
            <span className="pill pill-info">7 items</span>
          </div>
          <div style={{ padding: '4px 0' }}>
            {[
            { ic: 'Return', tone: 'warn', t: '2 refunds awaiting manager approval', s: 'RET-1143 · ₹1,499 · Karan Singh', cta: 'Review' },
            { ic: 'Scale', tone: 'warn', t: 'Counter 3 cash variance —₹100', s: 'Reason pending · Meera Desai', cta: 'Resolve' },
            { ic: 'Truck', tone: 'info', t: 'PO-2026-0186 due today', s: 'Aravind Mills · 180 units · 0 received', cta: 'Receive' },
            { ic: 'Alert', tone: 'danger', t: 'COU-FRG-1108 out of stock', s: 'Banarasi Dupatta · last sold 12 hrs ago', cta: 'Raise PO' },
            { ic: 'Clock', tone: 'info', t: '2 staff late clock-in today', s: 'Meera Desai 12:08 · Anjali Rao 10:11', cta: 'Open' },
            { ic: 'Coin', tone: 'success', t: 'GST output ready for April', s: 'Filing window opens 11 May', cta: 'Preview' }].
            map((a, i) => {
              const Ic = Icon[a.ic];
              const colorMap = { warn: '#D48A08', danger: '#DC3D43', info: '#2E5FC3', success: '#3BAA72' };
              const bgMap = { warn: '#F7EEDD', danger: '#F9E9EA', info: '#E9EEF9', success: '#E7F4ED' };
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderBottom: i < 5 ? '1px solid var(--border-soft)' : 'none' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: bgMap[a.tone], color: colorMap[a.tone], border: '1px solid rgba(15,23,41,.04)', display: 'grid', placeItems: 'center', flex: 'none' }}><Ic size={20} sw={2.1} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{a.t}</div>
                    <div className="muted" style={{ fontSize: 12 }}>{a.s}</div>
                  </div>
                  <button className="btn btn-soft btn-sm">{a.cta}</button>
                </div>);

            })}
          </div>
        </div>
      </div>

      <div className="three-col" style={{ marginBottom: 16 }}>
        <div className="card">
          <div className="card-head"><h3>Top selling now</h3><span className="muted" style={{ fontSize: 12 }}>Last 4 hours</span></div>
          <div className="card-pad" style={{ display: 'grid', gap: 12 }}>
            {D.TOP_PRODUCTS.slice(0, 5).map((p, i) =>
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 6, alignItems: 'center' }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600 }} className="truncate">{p.name}</div>
                  <div className="muted mono" style={{ fontSize: 10.5 }}>{p.sku}</div>
                </div>
                <div className="num strong" style={{ fontSize: 12.5 }}>{p.qty}</div>
                <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <HBar value={p.qty} max={150} />
                  <div className="muted mono" style={{ fontSize: 11 }}>{D.fmtINR(p.rev)}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-head"><h3>Counter performance</h3><span className="muted" style={{ fontSize: 12 }}>Today</span></div>
          <div className="card-pad" style={{ display: 'grid', gap: 14 }}>
            {[
            { c: 'Counter 1 · Riya', bills: 84, sales: 138400, var: 0 },
            { c: 'Counter 2 · Aarav', bills: 97, sales: 184200, var: -120 },
            { c: 'Counter 3 · Meera', bills: 42, sales: 62400, var: -100 }].
            map((r, i) =>
            <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600 }}>{r.c}</div>
                  <div className="num strong" style={{ fontSize: 13 }}>{D.fmtINR(r.sales)}</div>
                </div>
                <HBar value={r.sales} max={200000} />
                <div className="muted" style={{ fontSize: 11, marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
                  <span>{r.bills} bills</span>
                  <span style={{ color: r.var < 0 ? 'var(--danger)' : 'var(--muted)' }}>Cash variance {D.fmtINRRaw(r.var)}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-head"><h3>Current shift</h3><span className="pill pill-success"><span className="dot"></span>3 on shift</span></div>
          <div className="card-pad">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <div>
                <div className="muted" style={{ fontSize: 11 }}>Started</div>
                <div className="strong">10:00 AM</div>
              </div>
              <div>
                <div className="muted" style={{ fontSize: 11 }}>Bills so far</div>
                <div className="strong num">342</div>
              </div>
              <div>
                <div className="muted" style={{ fontSize: 11 }}>Avg / hr</div>
                <div className="strong num">73</div>
              </div>
            </div>
            <div className="divider"></div>
            <div style={{ display: 'grid', gap: 10 }}>
              {D.STAFF.filter((s) => s.status === 'On shift').slice(0, 4).map((s, i) =>
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="avatar" style={{ width: 28, height: 28, fontSize: 11 }}>{s.name.split(' ').map((p) => p[0]).join('')}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600 }} className="truncate">{s.name}</div>
                    <div className="muted" style={{ fontSize: 11 }}>{s.role} · {s.register}</div>
                  </div>
                  <div className="mono muted" style={{ fontSize: 11 }}>in {s.clock}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-head"><h3>Monthly sales & profit</h3><span className="muted" style={{ fontSize: 12 }}>10-month rolling · ₹ in lakhs</span></div>
          <div className="card-pad"><DualAreaBar data={D.MONTH_TREND} height={200} /></div>
        </div>
        <div className="card">
          <div className="card-head"><h3>Live queue</h3><span className="pill pill-info" style={{ backgroundColor: "rgb(255, 255, 255)" }}>2 holds · 1 pending</span></div>
          <div className="card-pad" style={{ display: 'grid', gap: 10 }}>
            {[
            { ic: 'Cart', t: 'Bill INV-24846 on hold', s: 'Walk-in · 4 items · ₹2,100 · Counter 1', tone: 'warn' },
            { ic: 'Truck', t: 'GRN waiting · PO-2026-0185', s: 'Banaras Weaves · 38 of 60 received', tone: 'info' },
            { ic: 'Return', t: 'Refund pending approval', s: 'RET-1143 · ₹1,499 · Cotton Kurta', tone: 'warn' }].
            map((q, i) => {
              const Ic = Icon[q.ic];
              return (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 10, border: '1px solid var(--border-soft)', borderRadius: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--brand-soft)', color: 'var(--brand-1)', display: 'grid', placeItems: 'center', backgroundColor: "rgb(0, 88, 186)" }}><Ic size={14} /></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{q.t}</div>
                    <div className="muted" style={{ fontSize: 11.5 }}>{q.s}</div>
                  </div>
                  <button className="btn btn-ghost btn-sm">Open</button>
                </div>);

            })}
          </div>
        </div>
      </div>
    </Page>);

}

// =============== BILLING ===============
function Billing() {
  const D = window.AppData;
  const Icon = window.Icon;
  const [cart, setCart] = useS1([
  { sku: 'COU-DSL-2410', name: 'Cotton Kurta — Indigo (M)', qty: 2, price: 1499, gst: 5 },
  { sku: 'COU-ACC-3392', name: 'Leather Belt — Tan (32)', qty: 1, price: 899, gst: 12 },
  { sku: 'COU-WTC-0871', name: 'Silk Saree — Maroon', qty: 1, price: 4400, gst: 5 }]
  );
  const [method, setMethod] = useS1('UPI');
  const [flow, setFlow] = useS1(null);
  const [giftCode, setGiftCode] = useS1('');
  const [giftApplied, setGiftApplied] = useS1(false);
  const [scanValue, setScanValue] = useS1('');
  const updateQty = (sku, d) => setCart((c) => c.map((it) => it.sku === sku ? { ...it, qty: Math.max(1, it.qty + d) } : it));
  const remove = (sku) => setCart((c) => c.filter((it) => it.sku !== sku));
  const subtotal = cart.reduce((s, i) => s + i.qty * i.price, 0);
  const tax = cart.reduce((s, i) => s + i.qty * i.price * i.gst / 100, 0);
  const discount = 250 + (giftApplied ? 300 : 0);
  const total = subtotal + tax - discount;

  return (
    <div style={{ padding: 24 }}>
      <div className="bill-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          <div className="card" style={{ padding: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Icon.Search size={15} style={{ position: 'absolute', left: 12, top: 11, color: 'var(--muted)' }} />
              <input placeholder="Scan barcode or search by SKU / product name…" autoFocus
              style={{ width: '100%', height: 40, border: '1px solid var(--border)', borderRadius: 8, padding: '0 14px 0 36px', fontSize: 14, outline: 'none', background: 'var(--bg)' }} />
            </div>
            <button className="btn btn-ghost" onClick={() => setFlow('scan')}><Icon.QR size={14} />Scan</button>
            <button className="btn btn-ghost"><Icon.Tag size={14} />Quick add</button>
          </div>

          <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-head">
              <h3>Cart · {cart.length} items</h3>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-ghost btn-sm"><Icon.Clock size={13} />Hold bill</button>
                <button className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)' }}><Icon.Trash size={13} />Clear</button>
              </div>
            </div>
            <div style={{ flex: 1, overflow: 'auto' }}>
              <table>
                <thead><tr><th>Item</th><th className="right">Qty</th><th className="right">Price</th><th className="right">GST</th><th className="right">Total</th><th></th></tr></thead>
                <tbody>
                  {cart.map((it) =>
                  <tr key={it.sku}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{it.name}</div>
                        <div className="muted mono" style={{ fontSize: 11 }}>{it.sku}</div>
                      </td>
                      <td className="right">
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 0, border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
                          <button className="icon-btn" style={{ width: 30, height: 30, border: 'none', borderRadius: 0 }} onClick={() => updateQty(it.sku, -1)}><Icon.Minus size={13} /></button>
                          <span className="num strong" style={{ padding: '0 12px' }}>{it.qty}</span>
                          <button className="icon-btn" style={{ width: 30, height: 30, border: 'none', borderRadius: 0 }} onClick={() => updateQty(it.sku, 1)}><Icon.Plus size={13} /></button>
                        </div>
                      </td>
                      <td className="right num">{D.fmtINRRaw(it.price)}</td>
                      <td className="right"><span className="pill pill-neutral">{it.gst}%</span></td>
                      <td className="right num strong">{D.fmtINRRaw(it.price * it.qty * (1 + it.gst / 100))}</td>
                      <td><button className="icon-btn" style={{ width: 28, height: 28, color: 'var(--muted)' }} onClick={() => remove(it.sku)}><Icon.X size={13} /></button></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div style={{ padding: 14, borderTop: '1px solid var(--border-soft)', background: '#FAFBFC' }}>
              <div className="muted" style={{ fontSize: 11, marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em' }}>Frequently sold together</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['Banarasi Dupatta — Gold', 'Juti Slip-on (UK 8)', 'Lakmé Lipstick — Berry', 'Embroidered Lehenga (S)'].map((p, i) =>
                <button key={i} className="btn btn-ghost btn-sm" style={{ borderStyle: 'dashed' }}>+ {p}</button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          <div className="card" style={{ padding: 14 }}>
            <div className="row-between" style={{ marginBottom: 8 }}>
              <div className="h4">Customer</div>
              <button className="btn btn-soft btn-sm"><Icon.Users size={12} />Change</button>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div className="avatar" style={{ width: 36, height: 36 }}>AK</div>
              <div style={{ flex: 1 }}>
                <div className="strong">Anika Kapoor</div>
                <div className="muted" style={{ fontSize: 12 }}>+91 98201 11420 · <span className="pill pill-warning" style={{ fontSize: 10 }}>Gold</span> · 1,840 pts</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}><Icon.Heart size={12} />Redeem 200 pts</button>
              <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => setFlow('gift')}><Icon.Gift size={12} />Apply gift card</button>
            </div>
          </div>

          <div className="card" style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className="h4" style={{ marginBottom: 10 }}>Bill summary</div>
            <div style={{ display: 'grid', gap: 8, fontSize: 13 }}>
              <div className="row-between"><span className="muted">Subtotal</span><span className="num">{D.fmtINRRaw(subtotal)}</span></div>
              <div className="row-between"><span className="muted">GST (CGST + SGST)</span><span className="num">{D.fmtINRRaw(tax)}</span></div>
              <div className="row-between"><span className="muted">Discount · LOYAL10</span><span className="num" style={{ color: 'var(--success)' }}>−{D.fmtINRRaw(discount)}</span></div>
              <div className="row-between"><span className="muted">Round off</span><span className="num">−₹0.40</span></div>
            </div>
            <div className="divider"></div>
            <div className="row-between"><span style={{ fontWeight: 700, fontSize: 14 }}>Total payable</span><span className="num" style={{ fontWeight: 700, fontSize: 22 }}>{D.fmtINRRaw(total)}</span></div>

            <div className="h4" style={{ margin: '14px 0 8px' }}>Payment method</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {[
              { id: 'Cash', ic: 'Money' },
              { id: 'Card', ic: 'CardChip' },
              { id: 'UPI', ic: 'QR' },
              { id: 'Wallet', ic: 'Wallet' },
              { id: 'Split', ic: 'Layers' },
              { id: 'Gift', ic: 'Gift' }].
              map((p) => {
                const Ic = Icon[p.ic];
                const on = method === p.id;
                return (
                  <button key={p.id} onClick={() => setMethod(p.id)} className="btn"
                  style={{ height: 54, flexDirection: 'column', gap: 4, padding: 0,
                    justifyContent: 'center', alignItems: 'center', textAlign: 'center',
                    background: on ? 'var(--brand-grad)' : 'white',
                    color: on ? 'white' : 'var(--ink)',
                    border: '1px solid ' + (on ? 'transparent' : 'var(--border)') }}>
                    <Ic size={16} />
                    <span style={{ fontSize: 11.5 }}>{p.id}</span>
                  </button>);

              })}
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }} onClick={() => setFlow('print')}><Icon.Print size={14} />Print</button>
              <button className="btn btn-primary" style={{ flex: 2, height: 44, fontSize: 14, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }} onClick={() => setFlow('success')}><Icon.Check size={15} />Charge {D.fmtINRRaw(total)}</button>
            </div>

          </div>
        </div>
      </div>
      {flow && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,41,.38)', zIndex: 40, display: 'grid', placeItems: 'center', padding: 20 }}>
          <div className="card" style={{ width: 'min(560px, 100%)', borderRadius: 14, overflow: 'hidden' }}>
            <div className="card-head">
              <h3>{
                flow === 'scan' ? 'Scan item' :
                flow === 'gift' ? 'Apply gift card' :
                flow === 'print' ? 'Print receipt' : 'Payment successful'
              }</h3>
              <button className="icon-btn" onClick={() => setFlow(null)}><Icon.X size={14} /></button>
            </div>
            <div className="card-pad-lg" style={{ display: 'grid', gap: 14 }}>
              {flow === 'scan' && (
                <>
                  <div className="muted" style={{ fontSize: 13 }}>Scan barcode or enter SKU manually to add an item to the cart.</div>
                  <div className="field">
                    <label>Barcode / SKU</label>
                    <input value={scanValue} onChange={(e) => setScanValue(e.target.value)} placeholder="Example: COU-DSL-2410" />
                  </div>
                  <div className="row-between">
                    <span className="pill pill-info"><span className="dot"></span>Scanner connected</span>
                    <button className="btn btn-primary" onClick={() => setFlow(null)}><Icon.Check size={13} />Add to cart</button>
                  </div>
                </>
              )}
              {flow === 'gift' && (
                <>
                  <div className="muted" style={{ fontSize: 13 }}>Apply customer gift card balance to this bill.</div>
                  <div className="field">
                    <label>Gift card code</label>
                    <input value={giftCode} onChange={(e) => setGiftCode(e.target.value)} placeholder="Enter code" />
                  </div>
                  <div className="row-between">
                    <span className="pill pill-neutral">Available balance: ₹300</span>
                    <button className="btn btn-primary" onClick={() => { setGiftApplied(true); setFlow(null); }}>
                      <Icon.Check size={13} />Apply ₹300
                    </button>
                  </div>
                </>
              )}
              {flow === 'print' && (
                <>
                  <div className="muted" style={{ fontSize: 13 }}>Choose receipt format and send to printer.</div>
                  <div style={{ display: 'grid', gap: 8 }}>
                    <label className="row" style={{ border: '1px solid var(--border)', borderRadius: 8, padding: 10 }}><input type="radio" name="printType" defaultChecked />Customer receipt · 3-inch</label>
                    <label className="row" style={{ border: '1px solid var(--border)', borderRadius: 8, padding: 10 }}><input type="radio" name="printType" />Gift receipt · no prices</label>
                  </div>
                  <div className="row-between">
                    <span className="pill pill-success"><span className="dot"></span>Printer online · TVS RP3200</span>
                    <button className="btn btn-primary" onClick={() => setFlow(null)}><Icon.Print size={13} />Print now</button>
                  </div>
                </>
              )}
              {flow === 'success' && (
                <>
                  <div style={{ display: 'grid', placeItems: 'center', gap: 10, padding: '6px 0 2px' }}>
                    <div style={{ width: 64, height: 64, borderRadius: 999, background: 'var(--success-soft)', color: '#0F8A55', display: 'grid', placeItems: 'center' }}>
                      <Icon.Check size={30} sw={2.4} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 20, fontWeight: 700 }}>Payment successful</div>
                      <div className="muted" style={{ marginTop: 3 }}>₹{total.toLocaleString('en-IN')} received via {method}</div>
                    </div>
                    <span className="pill pill-success">Invoice INV-24846 generated</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                    <button className="btn btn-ghost" onClick={() => setFlow('print')}><Icon.Print size={13} />Print receipt</button>
                    <button className="btn btn-primary" onClick={() => setFlow(null)}><Icon.Plus size={13} />New bill</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>);

}

// =============== SALES / ORDERS ===============
function SalesOrders() {
  const D = window.AppData;
  const Icon = window.Icon;
  const [sel, setSel] = useS1(D.RECENT_BILLS[0]);
  const [tab, setTab] = useS1('today');
  const [flow, setFlow] = useS1(null);

  const statusPill = (s) => ({
    Paid: 'pill-success', Held: 'pill-warning', Cancelled: 'pill-danger', Refunded: 'pill-info'
  })[s] || 'pill-neutral';

  return (
    <Page title="Sales / Orders" sub="Invoice and held bill history" actions={
    <>
        <button className="btn btn-ghost" onClick={() => setFlow('filters')}><Icon.Filter size={14} />Filters</button>
        <button className="btn btn-ghost" onClick={() => setFlow('export')}><Icon.Download size={14} />Export</button>
        <button className="btn btn-primary" onClick={() => setFlow('new')}><Icon.Plus size={14} />New Bill</button>
      </>
    }>
      <div className="kpi-grid cols-4" style={{ marginBottom: 14 }}>
        <div className="kpi accent">
          <div className="kpi-label">Today invoices</div>
          <div className="kpi-value">342</div>
          <div className="kpi-sub"><span className="delta-up">▲ 14</span><span>vs yesterday</span></div>
        </div>
        <Kpi label="Held bills" value="18" sub={<span>Waiting to resume · oldest 41 min</span>} />
        <Kpi label="Paid sales" value="₹8.72 L" sub={<span>318 completed · avg ₹2,742</span>} />
        <Kpi label="Cancelled / refunded" value="17" sub={<><span className="pill pill-danger">6 cancelled</span><span className="pill pill-info" style={{ marginLeft: 6 }}>11 refunded</span></>} />
      </div>

      <div className="row-between" style={{ marginBottom: 12, flexWrap: 'wrap', gap: 12 }}>
        <div className="seg">
          {['today', 'yesterday', 'last7', 'month', 'custom'].map((t) =>
          <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>
              {{ today: 'Today', yesterday: 'Yesterday', last7: 'Last 7 days', month: 'This month', custom: 'Custom' }[t]}
            </button>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <select className="btn btn-ghost" style={{ appearance: 'none', paddingRight: 24 }}>
            <option>All cashiers</option><option>Riya Sharma</option><option>Aarav Pillai</option>
          </select>
          <select className="btn btn-ghost"><option>All payment methods</option><option>UPI</option><option>Card</option><option>Cash</option></select>
          <select className="btn btn-ghost"><option>All statuses</option><option>Paid</option><option>Held</option><option>Refunded</option></select>
          <div style={{ position: 'relative' }}>
            <Icon.Search size={14} style={{ position: 'absolute', left: 10, top: 11, color: 'var(--muted)' }} />
            <input placeholder="Invoice or customer" style={{ height: 36, padding: '0 10px 0 30px', border: '1px solid var(--border)', borderRadius: 8, background: 'white' }} />
          </div>
        </div>
      </div>

      <div className="list-detail">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Invoice</th><th>Customer</th><th>Cashier</th><th>Time</th><th>Method</th><th>Status</th><th className="right">Amount</th><th></th></tr></thead>
            <tbody>
              {D.RECENT_BILLS.map((b) =>
              <tr key={b.id} className={sel.id === b.id ? 'selected' : ''} onClick={() => setSel(b)} style={{ cursor: 'pointer' }}>
                  <td className="mono strong">{b.id}</td>
                  <td>{b.cust}</td>
                  <td>{b.cashier}<div className="muted" style={{ fontSize: 11 }}>{b.counter}</div></td>
                  <td className="muted mono">{b.time}</td>
                  <td>{b.method}</td>
                  <td><span className={"pill " + statusPill(b.status)}>{b.status}</span></td>
                  <td className="right num strong">{D.fmtINRRaw(b.amount)}</td>
                  <td><button className="btn btn-ghost btn-sm" onClick={(e)=>{e.stopPropagation(); setSel(b); setFlow('view');}}><Icon.Eye size={12} />View</button></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-head">
            <div>
              <h3 className="mono">{sel.id}</h3>
              <div className="muted" style={{ fontSize: 12 }}>{sel.cashier} · {sel.counter} · {sel.time}</div>
            </div>
            <span className={"pill " + statusPill(sel.status)}>{sel.status}</span>
          </div>
          <div className="card-pad" style={{ display: 'grid', gap: 14 }}>
            <div>
              <div className="h4" style={{ marginBottom: 6 }}>Customer</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="avatar" style={{ width: 34, height: 34 }}>{sel.cust.split(' ').map((p) => p[0]).join('').slice(0, 2)}</div>
                <div>
                  <div className="strong">{sel.cust}</div>
                  <div className="muted" style={{ fontSize: 12 }}>{sel.cust === 'Walk-in' ? 'No profile' : '+91 98201 11420 · Gold'}</div>
                </div>
              </div>
            </div>
            <div>
              <div className="h4" style={{ marginBottom: 6 }}>Items ({sel.items})</div>
              <div style={{ display: 'grid', gap: 6 }}>
                <div className="row-between"><span>Cotton Kurta — Indigo (M) × 2</span><span className="num">₹2,998</span></div>
                <div className="row-between"><span>Leather Belt — Tan (32)</span><span className="num">₹899</span></div>
                {sel.items >= 3 && <div className="row-between"><span>Silk Saree — Maroon</span><span className="num">₹4,400</span></div>}
              </div>
            </div>
            <div>
              <div className="h4" style={{ marginBottom: 6 }}>Bill summary</div>
              <div style={{ display: 'grid', gap: 6, fontSize: 13 }}>
                <div className="row-between"><span className="muted">Subtotal</span><span className="num">{D.fmtINRRaw(sel.amount / 1.18 * 0.95)}</span></div>
                <div className="row-between"><span className="muted">GST</span><span className="num">{D.fmtINRRaw(sel.amount * 0.05)}</span></div>
                <div className="row-between"><span className="muted">Discount</span><span className="num" style={{ color: 'var(--success)' }}>−₹250</span></div>
                <div className="row-between" style={{ paddingTop: 6, borderTop: '1px solid var(--border-soft)' }}><span className="strong">Total</span><span className="num strong">{D.fmtINRRaw(sel.amount)}</span></div>
                <div className="row-between"><span className="muted">Paid via {sel.method}</span><span className="pill pill-success">Settled</span></div>
              </div>
            </div>
            <div>
              <div className="h4" style={{ marginBottom: 6 }}>Audit trail</div>
              <div className="muted" style={{ fontSize: 12, display: 'grid', gap: 4 }}>
                <div>• {sel.time} · Bill created by {sel.cashier}</div>
                <div>• {sel.time} · Payment captured ({sel.method})</div>
                {sel.status === 'Refunded' && <div>• 14:02 · Refund processed by Pooja Menon</div>}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, padding: 14, borderTop: '1px solid var(--border-soft)', flexWrap: 'wrap' }}>
            <button className="btn btn-ghost btn-sm" onClick={() => setFlow('reprint')}><Icon.Print size={12} />Reprint</button>
            <button className="btn btn-ghost btn-sm" onClick={() => setFlow('email')}><Icon.Mail size={12} />Email</button>
            {sel.status === 'Held' && <button className="btn btn-primary btn-sm" onClick={() => setFlow('resume')}>Resume</button>}
            {sel.status === 'Paid' && <button className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)' }} onClick={() => setFlow('refund')}><Icon.Return size={12} />Refund</button>}
          </div>
        </div>
      </div>

      <div className="two-col" style={{ marginTop: 16 }}>
        <div className="card card-pad">
          <div className="row-between" style={{ marginBottom: 10 }}><div className="h3">Held bills tracker</div><span className="muted" style={{ fontSize: 12 }}>18 bills · oldest 41 min</span></div>
          <div style={{ display: 'grid', gap: 8 }}>
            {[
            { id: 'INV-24846', age: '41 min', cashier: 'Riya S.', amount: 2100, items: 4 },
            { id: 'INV-24830', age: '28 min', cashier: 'Aarav P.', amount: 8400, items: 6 },
            { id: 'INV-24812', age: '12 min', cashier: 'Meera D.', amount: 1850, items: 2 }].
            map((h) =>
            <div key={h.id} className="row-between" style={{ padding: 10, border: '1px solid var(--border-soft)', borderRadius: 8 }}>
                <div><span className="mono strong">{h.id}</span> <span className="muted" style={{ fontSize: 11.5 }}>· {h.cashier} · {h.items} items</span></div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span className="num">{D.fmtINRRaw(h.amount)}</span>
                  <span className="pill pill-warning"><span className="dot"></span>{h.age}</span>
                  <button className="btn btn-soft btn-sm">Resume</button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="card card-pad">
          <div className="row-between" style={{ marginBottom: 10 }}><div className="h3">Refund tracker</div><span className="muted" style={{ fontSize: 12 }}>11 today · ₹18,420</span></div>
          <div style={{ display: 'grid', gap: 8 }}>
            {D.RETURNS.slice(0, 3).map((r) =>
            <div key={r.id} className="row-between" style={{ padding: 10, border: '1px solid var(--border-soft)', borderRadius: 8 }}>
                <div>
                  <div className="strong" style={{ fontSize: 12.5 }}>{r.id} · <span className="muted" style={{ fontWeight: 400 }}>{r.inv}</span></div>
                  <div className="muted" style={{ fontSize: 11.5 }}>{r.cust} · {r.reason}</div>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span className="num">{D.fmtINRRaw(r.amount)}</span>
                  <span className={"pill " + (r.status === 'Approved' ? 'pill-success' : r.status === 'Rejected' ? 'pill-danger' : 'pill-warning')}>{r.status}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {flow && (
        <div style={{ position:'fixed', inset:0, background:'rgba(15,23,41,.38)', zIndex:40, display:'grid', placeItems:'center', padding:20 }}>
          <div className="card" style={{ width:'min(520px, 100%)', borderRadius:14, overflow:'hidden' }}>
            <div className="card-head"><h3>{({filters:'Order filters',export:'Export sales/orders',new:'Create new bill',view:'View invoice',reprint:'Reprint invoice',email:'Email invoice',resume:'Resume held bill',refund:'Initiate refund'})[flow]}</h3><button className="icon-btn" onClick={()=>setFlow(null)}><Icon.X size={14}/></button></div>
            <div className="card-pad-lg"><div className="muted">Flow wired for invoice <span className="mono">{sel.id}</span>.</div><div style={{display:'flex', justifyContent:'flex-end', marginTop:12}}><button className={"btn "+(flow==='refund'?'btn-danger-ghost':'btn-primary')} onClick={()=>setFlow(null)}>Continue</button></div></div>
          </div>
        </div>
      )}
    </Page>);

}

// =============== REGISTER / CASH DRAWER ===============
function Register() {
  const D = window.AppData;
  const Icon = window.Icon;
  const [sel, setSel] = useS1(D.REGISTERS[0]);
  const [flow, setFlow] = useS1('main');
  const [tab, setTab] = useS1('today');
  const [counterFilter, setCounterFilter] = useS1('all');
  const [cashierFilter, setCashierFilter] = useS1('all');

  const filteredRows = D.REGISTERS.filter((r) => {
    if (counterFilter !== 'all' && r.counter !== counterFilter) return false;
    if (cashierFilter !== 'all' && r.cashier !== cashierFilter) return false;
    if (tab === 'mismatch' && r.variance === 0) return false;
    if (tab === 'open' && r.status !== 'Open') return false;
    if (tab === 'cashier' && r.cashier !== sel.cashier) return false;
    return true;
  });

  if (flow !== 'main') {
    const titleMap = {
      cashio: 'Cash In / Out',
      open: 'Open Register',
      reason: 'Variance Reason & Approval',
      drop: 'Cash Drop',
      close: 'Close Register',
      zreport: 'Print Z-Report',
      reopen: 'Reopen Register',
    };
    return (
      <Page
        title={titleMap[flow]}
        sub={`${sel.id} · ${sel.counter} · ${sel.cashier}`}
        actions={<button className="btn btn-ghost" onClick={() => setFlow('main')}><Icon.ArrowLeft size={14} />Back to Register</button>}
      >
        <div className="card card-pad-lg" style={{maxWidth:760}}>
          {flow === 'cashio' && (
            <div className="grid">
              <div className="h3">Record cash movement</div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                <div className="field"><label>Type</label><select><option>Cash out</option><option>Cash in</option></select></div>
                <div className="field"><label>Amount</label><input className="num" placeholder="₹0"/></div>
                <div className="field"><label>Category</label><select><option>Petty cash</option><option>Bank deposit</option><option>Correction</option></select></div>
                <div className="field"><label>Reference</label><input placeholder="Optional note"/></div>
              </div>
              <div className="row-between"><span className="pill pill-info">Register: {sel.id}</span><button className="btn btn-primary" onClick={() => setFlow('main')}><Icon.Check size={13}/>Save entry</button></div>
            </div>
          )}
          {flow === 'open' && (
            <div className="grid">
              <div className="h3">Open a new register session</div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                <div className="field"><label>Counter</label><select><option>Counter 1</option><option>Counter 2</option><option>Counter 3</option></select></div>
                <div className="field"><label>Cashier</label><select><option>Riya Sharma</option><option>Aarav Pillai</option><option>Meera Desai</option></select></div>
                <div className="field"><label>Opening float</label><input className="num" defaultValue="₹5,000"/></div>
              </div>
              <div style={{display:'flex', justifyContent:'flex-end'}}><button className="btn btn-primary" onClick={() => setFlow('main')}><Icon.Drawer size={13}/>Open register</button></div>
            </div>
          )}
          {flow === 'reason' && (
            <div className="grid">
              <div className="h3">Submit variance reason</div>
              <div className="field"><label>Variance</label><input className="num" value={D.fmtINRRaw(sel.variance)} readOnly/></div>
              <div className="field"><label>Reason</label><textarea placeholder="Describe short/excess cash reason"/></div>
              <div className="field"><label>Approval note</label><textarea placeholder="Add manager context if required"/></div>
              <div style={{display:'flex', justifyContent:'flex-end'}}><button className="btn btn-primary" onClick={() => setFlow('main')}><Icon.Mail size={13}/>Request approval</button></div>
            </div>
          )}
          {flow === 'drop' && (
            <div className="grid">
              <div className="h3">Cash drop</div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                <div className="field"><label>Drop amount</label><input className="num" placeholder="₹0"/></div>
                <div className="field"><label>Destination</label><select><option>Back office safe</option><option>Bank bag</option></select></div>
              </div>
              <div style={{display:'flex', justifyContent:'flex-end'}}><button className="btn btn-primary" onClick={() => setFlow('main')}><Icon.Check size={13}/>Confirm drop</button></div>
            </div>
          )}
          {flow === 'close' && (
            <div className="grid">
              <div className="h3">Close register</div>
              <div style={{display:'grid', gap:8, fontSize:13}}>
                <div className="row-between"><span className="muted">Expected</span><span className="num strong">{D.fmtINRRaw(sel.expected)}</span></div>
                <div className="row-between"><span className="muted">Counted</span><span className="num strong">{D.fmtINRRaw(sel.actual)}</span></div>
              </div>
              <div className="field"><label>Closing note</label><textarea placeholder="Any exceptions during this shift"/></div>
              <div style={{display:'flex', justifyContent:'flex-end'}}><button className="btn btn-primary" onClick={() => setFlow('main')}><Icon.Check size={13}/>Close now</button></div>
            </div>
          )}
          {flow === 'zreport' && (
            <div className="grid">
              <div className="h3">Print Z-report</div>
              <div className="field"><label>Template</label><select><option>Detailed</option><option>Summary</option></select></div>
              <div className="row-between"><span className="pill pill-success"><span className="dot"></span>Printer online</span><button className="btn btn-primary" onClick={() => setFlow('main')}><Icon.Print size={13}/>Print</button></div>
            </div>
          )}
          {flow === 'reopen' && (
            <div className="grid">
              <div className="h3">Reopen closed register</div>
              <div className="field"><label>Reason</label><textarea placeholder="Why this register needs to be reopened"/></div>
              <div className="row-between"><span className="pill pill-warning">Manager approval required</span><button className="btn btn-primary" onClick={() => setFlow('main')}><Icon.Refresh size={13}/>Reopen request</button></div>
            </div>
          )}
        </div>
      </Page>
    );
  }

  return (
    <Page title="Register / Cash Drawer" sub="Cashier shifts and cash reconciliation" actions={
    <>
        <button className="btn btn-ghost" onClick={() => setFlow('cashio')}><Icon.Plus size={14} />Cash in / out</button>
        <button className="btn btn-primary" onClick={() => setFlow('open')}><Icon.Drawer size={14} />Open Register</button>
      </>
    }>
      <div className="kpi-grid cols-4" style={{ marginBottom: 14 }}>
        <Kpi label="Open registers" value="3 of 3" sub={<span>All counters operational</span>} accent />
        <Kpi label="Total cash on hand" value="₹50,240" sub={<span>+₹15,000 opening · ₹35,240 sales</span>} />
        <Kpi label="Variance today" value="−₹140" sub={<span className="delta-down">2 counters affected</span>} />
        <Kpi label="Expenses from drawer" value="₹4,200" sub={<span>3 entries · 1 awaiting receipt</span>} />
      </div>

      <div className="row-between" style={{ marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
        <div className="tabs">
          <div className={"tab " + (tab === 'today' ? 'active' : '')} onClick={() => setTab('today')}>Today</div>
          <div className={"tab " + (tab === 'open' ? 'active' : '')} onClick={() => setTab('open')}>Open</div>
          <div className={"tab " + (tab === 'cashier' ? 'active' : '')} onClick={() => setTab('cashier')}>By cashier</div>
          <div className={"tab " + (tab === 'mismatch' ? 'active' : '')} onClick={() => setTab('mismatch')}>Mismatches</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <select className="btn btn-ghost" value={counterFilter} onChange={(e) => setCounterFilter(e.target.value)}>
            <option value="all">All counters</option><option value="Counter 1">Counter 1</option><option value="Counter 2">Counter 2</option><option value="Counter 3">Counter 3</option>
          </select>
          <select className="btn btn-ghost" value={cashierFilter} onChange={(e) => setCashierFilter(e.target.value)}>
            <option value="all">All cashiers</option><option value="Riya Sharma">Riya Sharma</option><option value="Aarav Pillai">Aarav Pillai</option><option value="Meera Desai">Meera Desai</option><option value="Suresh Kumar">Suresh Kumar</option>
          </select>
        </div>
      </div>

      <div className="list-detail">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Register</th><th>Counter</th><th>Cashier</th><th>Shift</th><th className="right">Opening</th><th className="right">Expected</th><th className="right">Actual</th><th>Variance</th><th>Status</th></tr></thead>
            <tbody>
              {filteredRows.map((r) =>
              <tr key={r.id} className={sel.id === r.id ? 'selected' : ''} onClick={() => setSel(r)} style={{ cursor: 'pointer' }}>
                  <td className="mono">{r.id}</td>
                  <td className="strong">{r.counter}</td>
                  <td>{r.cashier}</td>
                  <td className="muted mono" style={{ fontSize: 12 }}>{r.open} → {r.close || '—'}</td>
                  <td className="right num">{D.fmtINRRaw(r.opening)}</td>
                  <td className="right num">{D.fmtINRRaw(r.expected)}</td>
                  <td className="right num">{D.fmtINRRaw(r.actual)}</td>
                  <td><span className={"num strong " + (r.variance < 0 ? 'delta-down' : r.variance > 0 ? 'delta-up' : 'muted')}>{r.variance === 0 ? '—' : (r.variance > 0 ? '+' : '') + D.fmtINRRaw(r.variance)}</span></td>
                  <td><span className={"pill " + (r.status === 'Open' ? 'pill-success' : r.status === 'Mismatch' ? 'pill-warning' : 'pill-neutral')}><span className="dot"></span>{r.status}</span></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-head">
            <div>
              <h3 className="mono">{sel.id}</h3>
              <div className="muted" style={{ fontSize: 12 }}>{sel.counter} · {sel.cashier}</div>
            </div>
            <span className={"pill " + (sel.status === 'Open' ? 'pill-success' : sel.status === 'Mismatch' ? 'pill-warning' : 'pill-neutral')}><span className="dot"></span>{sel.status}</span>
          </div>
          <div className="card-pad" style={{ display: 'grid', gap: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div><div className="muted" style={{ fontSize: 11 }}>Opened</div><div className="strong mono">{sel.open}</div></div>
              <div><div className="muted" style={{ fontSize: 11 }}>Closed</div><div className="strong mono">{sel.close || 'In session'}</div></div>
              <div><div className="muted" style={{ fontSize: 11 }}>Opening cash</div><div className="strong num">{D.fmtINRRaw(sel.opening)}</div></div>
              <div><div className="muted" style={{ fontSize: 11 }}>Cash sales</div><div className="strong num">{D.fmtINRRaw(sel.sales)}</div></div>
            </div>
            <div className="divider"></div>
            <div className="h4">Reconciliation</div>
            <div style={{ display: 'grid', gap: 6, fontSize: 13 }}>
              <div className="row-between"><span className="muted">Expected in drawer</span><span className="num strong">{D.fmtINRRaw(sel.expected)}</span></div>
              <div className="row-between"><span className="muted">Actual counted</span><span className="num strong">{D.fmtINRRaw(sel.actual)}</span></div>
              <div className="row-between" style={{ paddingTop: 6, borderTop: '1px solid var(--border-soft)' }}>
                <span className="strong">Variance</span>
                <span className={"num strong " + (sel.variance < 0 ? 'delta-down' : sel.variance > 0 ? 'delta-up' : '')}>{sel.variance === 0 ? '₹0 · matched' : D.fmtINRRaw(sel.variance)}</span>
              </div>
            </div>
            {sel.variance !== 0 &&
            <div style={{ padding: 12, background: 'var(--warning-soft)', borderRadius: 8, fontSize: 12 }}>
                <div className="strong" style={{ color: '#B45309', marginBottom: 4 }}>Variance reason required</div>
                <div className="muted">Manager approval pending. Suggested: short change, dropped note, missed receipt.</div>
                <button className="btn btn-soft btn-sm" style={{ marginTop: 8 }} onClick={() => setFlow('reason')}>Add reason & request approval</button>
              </div>
            }
            <div className="divider"></div>
            <div className="h4">Drawer activity</div>
            <div className="muted" style={{ fontSize: 12, display: 'grid', gap: 4 }}>
              <div>• {sel.open} · Opened with {D.fmtINRRaw(sel.opening)} float</div>
              <div>• 11:42 · Cash out ₹4,200 · Petty cash · approved</div>
              <div>• 13:21 · Manager note: drawer left open 2 min</div>
              {sel.close ? <div>• {sel.close} · Closed by {sel.cashier}</div> : <div>• In session — last sale {D.fmtINRRaw(sel.sales)}</div>}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, padding: 14, borderTop: '1px solid var(--border-soft)' }}>
            {sel.status === 'Open' ? <>
              <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => setFlow('drop')}>Cash drop</button>
              <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => setFlow('close')}>Close register</button>
            </> : <>
              <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => setFlow('zreport')}><Icon.Print size={12} />Print Z-report</button>
              <button className="btn btn-soft btn-sm" style={{ flex: 1 }} onClick={() => setFlow('reopen')}>Reopen</button>
            </>}
          </div>
        </div>
      </div>
    </Page>);

}

// =============== RETURNS & REFUNDS ===============
function Returns() {
  const D = window.AppData;
  const Icon = window.Icon;
  const [sel, setSel] = useS1(D.RETURNS[1]);
  const [flow, setFlow] = useS1(null);

  const statusPill = (s) => ({
    Approved: 'pill-success', 'Pending approval': 'pill-warning', Rejected: 'pill-danger'
  })[s] || 'pill-neutral';

  return (
    <Page title="Returns & Refunds" sub="Customer returns, refunds and stock reversal" actions={
    <>
        <button className="btn btn-ghost" onClick={() => setFlow('filters')}><Icon.Filter size={14} />Filters</button>
        <button className="btn btn-primary" onClick={() => setFlow('new')}><Icon.Plus size={14} />New Return</button>
      </>
    }>
      <div className="kpi-grid cols-4" style={{ marginBottom: 14 }}>
        <Kpi label="Returns today" value="11" sub={<span>₹18,420 refunded · 4 pending</span>} accent />
        <Kpi label="Pending approval" value="4" sub={<span>Manager required for &gt; ₹2,000</span>} />
        <Kpi label="Refund methods" value="₹18.4 K" sub={<><span className="pill pill-info">9 cash/card</span><span className="pill pill-neutral" style={{ marginLeft: 4 }}>2 store credit</span></>} />
        <Kpi label="Rejected" value="2" sub={<span>Out of policy · post-7-day</span>} />
      </div>

      <div className="row-between" style={{ marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
        <div className="tabs">
          <div className="tab active">All returns</div>
          <div className="tab">Pending approval</div>
          <div className="tab">Approved</div>
          <div className="tab">Rejected</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => setFlow('search')}><Icon.Search size={13} />Search invoice</button>
          <select className="btn btn-ghost"><option>All cashiers</option></select>
          <select className="btn btn-ghost"><option>All reasons</option></select>
        </div>
      </div>

      <div className="list-detail">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Return</th><th>Invoice</th><th>Customer</th><th>Items</th><th>Reason</th><th>Method</th><th className="right">Amount</th><th>Status</th></tr></thead>
            <tbody>
              {D.RETURNS.map((r) =>
              <tr key={r.id} className={sel.id === r.id ? 'selected' : ''} onClick={() => setSel(r)} style={{ cursor: 'pointer' }}>
                  <td className="mono strong">{r.id}</td>
                  <td className="mono muted">{r.inv}</td>
                  <td>{r.cust}</td>
                  <td className="truncate" style={{ maxWidth: 180 }}>{r.items}</td>
                  <td className="muted truncate" style={{ maxWidth: 160, fontSize: 12 }}>{r.reason}</td>
                  <td>{r.method}</td>
                  <td className="right num strong">{D.fmtINRRaw(r.amount)}</td>
                  <td><span className={"pill " + statusPill(r.status)}>{r.status}</span></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-head">
            <div>
              <h3 className="mono">{sel.id}</h3>
              <div className="muted" style={{ fontSize: 12 }}>From invoice {sel.inv} · {sel.date}</div>
            </div>
            <span className={"pill " + statusPill(sel.status)}>{sel.status}</span>
          </div>
          <div className="card-pad" style={{ display: 'grid', gap: 12 }}>
            <div>
              <div className="h4" style={{ marginBottom: 6 }}>Customer</div>
              <div className="strong">{sel.cust}</div>
              <div className="muted" style={{ fontSize: 12 }}>+91 98201 11420 · 4 returns lifetime</div>
            </div>
            <div>
              <div className="h4" style={{ marginBottom: 6 }}>Returned items</div>
              <div style={{ padding: 10, background: 'var(--bg)', borderRadius: 8 }}>
                <div className="strong">{sel.items}</div>
                <div className="muted" style={{ fontSize: 11.5, marginTop: 2 }}>Reason: {sel.reason}</div>
              </div>
            </div>
            <div>
              <div className="h4" style={{ marginBottom: 6 }}>Refund details</div>
              <div style={{ display: 'grid', gap: 6, fontSize: 13 }}>
                <div className="row-between"><span className="muted">Refund amount</span><span className="num strong">{D.fmtINRRaw(sel.amount)}</span></div>
                <div className="row-between"><span className="muted">Method</span><span>{sel.method || '—'}</span></div>
                <div className="row-between"><span className="muted">Stock update</span><span className="pill pill-success"><span className="dot"></span>Restored to inventory</span></div>
                <div className="row-between"><span className="muted">Approval</span>
                  <span className={"pill " + statusPill(sel.status)}>{sel.status}</span>
                </div>
              </div>
            </div>
            {sel.status === 'Rejected' &&
            <div style={{ padding: 10, background: 'var(--danger-soft)', borderRadius: 8, fontSize: 12, color: '#B91C1C' }}>
                <strong>Rejection reason:</strong> Beyond 7-day return window per store policy.
              </div>
            }
            <div>
              <div className="h4" style={{ marginBottom: 6 }}>Audit trail</div>
              <div className="muted" style={{ fontSize: 12, display: 'grid', gap: 4 }}>
                <div>• {sel.date} · Return initiated by {sel.cust === 'Walk-in' ? 'Cashier' : 'Aarav P.'}</div>
                <div>• Stock check passed · Item in resellable condition</div>
                {sel.status === 'Approved' && <div>• Approved by Pooja Menon</div>}
                {sel.status === 'Pending approval' && <div>• Awaiting manager review (₹{sel.amount} &gt; ₹2,000 limit)</div>}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, padding: 14, borderTop: '1px solid var(--border-soft)' }}>
            {sel.status === 'Pending approval' ? <>
              <button className="btn btn-ghost btn-sm" style={{ flex: 1, color: 'var(--danger)' }} onClick={() => setFlow('reject')}>Reject</button>
              <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => setFlow('approve')}>Approve refund</button>
            </> : <>
              <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => setFlow('print')}><Icon.Print size={12} />Print credit note</button>
              <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => setFlow('view')}><Icon.Eye size={12} />View invoice</button>
            </>}
          </div>
        </div>
      </div>
      {flow && (
        <div style={{ position:'fixed', inset:0, background:'rgba(15,23,41,.38)', zIndex:40, display:'grid', placeItems:'center', padding:20 }}>
          <div className="card" style={{ width:'min(520px, 100%)', borderRadius:14, overflow:'hidden' }}>
            <div className="card-head"><h3>{({filters:'Return filters',new:'Create return',search:'Search invoice',reject:'Reject return',approve:'Approve refund',print:'Print credit note',view:'View invoice'})[flow]}</h3><button className="icon-btn" onClick={()=>setFlow(null)}><Icon.X size={14}/></button></div>
            <div className="card-pad-lg"><div className="muted">Flow wired for return <span className="mono">{sel.id}</span>.</div><div style={{display:'flex', justifyContent:'flex-end', marginTop:12}}><button className={"btn "+(flow==='reject'?'btn-danger-ghost':'btn-primary')} onClick={()=>setFlow(null)}>Continue</button></div></div>
          </div>
        </div>
      )}
    </Page>);

}

window.Screens1 = { Dashboard, Billing, SalesOrders, Register, Returns };


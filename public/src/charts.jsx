// Charts — pure SVG so they render crisply at any scale
const { useMemo } = React;

function smoothPath(pts) {
  if (pts.length < 2) return '';
  const d = ['M', pts[0].x, pts[0].y];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i-1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i+1];
    const p3 = pts[i+2] || p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d.push('C', cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
  }
  return d.join(' ');
}

function AreaChart({ data, height = 180, color = "#0058BA", showAxis = true, labels }) {
  const w = 100, h = 100; // viewBox units
  const max = Math.max(...data) * 1.1;
  const min = 0;
  const pts = data.map((v, i) => ({ x: (i/(data.length-1))*w, y: h - (v - min)/(max - min) * h }));
  const line = smoothPath(pts);
  const area = `${line} L ${w} ${h} L 0 ${h} Z`;
  const id = useMemo(() => 'g'+Math.random().toString(36).slice(2,7), []);
  return (
    <svg className="chart-area" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{height}}>
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      {showAxis && [0.25, 0.5, 0.75].map(f => (
        <line key={f} className="grid-line" x1="0" x2={w} y1={h*f} y2={h*f} vectorEffect="non-scaling-stroke"/>
      ))}
      <path d={area} fill={`url(#${id})`}/>
      <path d={line} fill="none" stroke={color} strokeWidth="0.6" vectorEffect="non-scaling-stroke"/>
    </svg>
  );
}

function DualAreaBar({ data, height = 220 }) {
  // data: [{m, s, p}]
  const w = 100, h = 100;
  const max = Math.max(...data.map(d => d.s)) * 1.15;
  const ptsS = data.map((d,i) => ({ x: (i/(data.length-1))*w, y: h - (d.s/max)*h }));
  const lineS = smoothPath(ptsS);
  const area = `${lineS} L ${w} ${h} L 0 ${h} Z`;
  const barW = w / data.length * 0.36;
  const id = 'g'+useMemo(()=>Math.random().toString(36).slice(2,7),[]);
  return (
    <div>
      <svg className="chart-area" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{height}}>
        <defs>
          <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#0058BA" stopOpacity="0.25"/>
            <stop offset="100%" stopColor="#0058BA" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id={id+'b'} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#6C9FFF"/>
            <stop offset="100%" stopColor="#0058BA"/>
          </linearGradient>
        </defs>
        {[0.25,0.5,0.75].map(f => (
          <line key={f} className="grid-line" x1="0" x2={w} y1={h*f} y2={h*f} vectorEffect="non-scaling-stroke"/>
        ))}
        {data.map((d,i) => {
          const x = (i/(data.length-1))*w;
          const bh = (d.p/max)*h;
          return <rect key={i} x={x - barW/2} y={h - bh} width={barW} height={bh} fill={`url(#${id+'b'})`} opacity="0.85" rx="0.5"/>;
        })}
        <path d={area} fill={`url(#${id})`}/>
        <path d={lineS} fill="none" stroke="#0058BA" strokeWidth="0.7" vectorEffect="non-scaling-stroke"/>
        {ptsS.map((p,i) => (
          <circle key={i} cx={p.x} cy={p.y} r="0.8" fill="#0058BA" stroke="white" strokeWidth="0.4" vectorEffect="non-scaling-stroke"/>
        ))}
      </svg>
      <div style={{display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--muted)', marginTop:6}}>
        {data.map((d,i) => <span key={i}>{d.m}</span>)}
      </div>
    </div>
  );
}

function Sparkline({ data, color = "#0058BA", height = 32, width = 90 }) {
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v,i) => ({ x:(i/(data.length-1))*width, y: height - ((v-min)/(max-min||1))*height }));
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path d={smoothPath(pts)} fill="none" stroke={color} strokeWidth="1.5"/>
    </svg>
  );
}

function HBar({ value, max, color = 'var(--brand-grad)' }) {
  const pct = Math.min(100, (value/max)*100);
  return (
    <div style={{flex:1, height:6, background:'#EEF0F2', borderRadius:999, overflow:'hidden'}}>
      <div style={{width:pct+'%', height:'100%', background:color}}/>
    </div>
  );
}

function Donut({ value, max = 100, size = 120, label, sub }) {
  const r = size/2 - 10;
  const c = 2*Math.PI*r;
  const off = c - (value/max)*c;
  return (
    <div style={{position:'relative', width:size, height:size}}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id="brandGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#0058BA"/>
            <stop offset="100%" stopColor="#6C9FFF"/>
          </linearGradient>
        </defs>
        <circle className="donut-track" cx={size/2} cy={size/2} r={r}/>
        <circle className="donut-fill" cx={size/2} cy={size/2} r={r} strokeDasharray={c} strokeDashoffset={off}/>
      </svg>
      <div style={{position:'absolute', inset:0, display:'grid', placeItems:'center'}}>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:20, fontWeight:700}}>{label}</div>
          <div style={{fontSize:11, color:'var(--muted)'}}>{sub}</div>
        </div>
      </div>
    </div>
  );
}

window.Charts = { AreaChart, DualAreaBar, Sparkline, HBar, Donut };


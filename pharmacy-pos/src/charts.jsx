// Chart helpers — pure SVG, no library
function AreaChart({ data, valueKey = 'total', width = 600, height = 180, pad = 24, showAxis = true, gradientId = 'brandGradV', strokeColor = 'var(--brand-1)' }) {
  const max = Math.max(...data.map(d => d[valueKey])) * 1.15;
  const min = 0;
  const w = width, h = height;
  const innerW = w - pad * 2, innerH = h - pad * 2;
  const x = i => pad + (innerW * i) / (data.length - 1);
  const y = v => pad + innerH - ((v - min) / (max - min)) * innerH;

  const pts = data.map((d, i) => [x(i), y(d[valueKey])]);
  // smooth curve
  const path = pts.map((p, i) => {
    if (i === 0) return `M ${p[0]},${p[1]}`;
    const prev = pts[i - 1];
    const cx1 = prev[0] + (p[0] - prev[0]) / 2;
    const cx2 = prev[0] + (p[0] - prev[0]) / 2;
    return ` C ${cx1},${prev[1]} ${cx2},${p[1]} ${p[0]},${p[1]}`;
  }).join('');
  const fillPath = path + ` L ${x(data.length - 1)},${h - pad} L ${x(0)},${h - pad} Z`;

  const ticks = 4;
  const tickVals = Array.from({ length: ticks + 1 }, (_, i) => min + (max - min) * (i / ticks));

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="chart-area" preserveAspectRatio="none">
      {tickVals.map((tv, i) => (
        <line key={i} className="grid-line" x1={pad} y1={y(tv)} x2={w - pad} y2={y(tv)}/>
      ))}
      <path d={fillPath} fill={`url(#${gradientId})`}/>
      <path d={path} fill="none" stroke={strokeColor} strokeWidth="2"/>
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="2.5" fill="white" stroke={strokeColor} strokeWidth="1.5"/>
      ))}
      {showAxis && data.map((d, i) => (
        (i % Math.max(1, Math.floor(data.length / 7)) === 0) &&
        <text key={i} x={x(i)} y={h - 6} textAnchor="middle" fontSize="10" fill="var(--muted-2)" fontFamily="JetBrains Mono">{d.d || d.m || d.label}</text>
      ))}
    </svg>
  );
}

function BarChart({ data, valueKey = 'total', width = 600, height = 180, pad = 24, color = 'var(--brand-1)' }) {
  const max = Math.max(...data.map(d => d[valueKey])) * 1.15;
  const w = width, h = height;
  const innerW = w - pad * 2, innerH = h - pad * 2;
  const bw = innerW / data.length * 0.7;
  const gap = innerW / data.length * 0.3;
  const y = v => pad + innerH - (v / max) * innerH;
  const ticks = 4;
  const tickVals = Array.from({ length: ticks + 1 }, (_, i) => (max / ticks) * i);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="chart-area" preserveAspectRatio="none">
      {tickVals.map((tv, i) => (
        <line key={i} className="grid-line" x1={pad} y1={y(tv)} x2={w - pad} y2={y(tv)}/>
      ))}
      {data.map((d, i) => {
        const xx = pad + (bw + gap) * i + gap / 2;
        const yy = y(d[valueKey]);
        return (
          <g key={i}>
            <rect x={xx} y={yy} width={bw} height={h - pad - yy} fill="url(#brandGrad)" rx="3"/>
            <text x={xx + bw / 2} y={h - 6} textAnchor="middle" fontSize="10" fill="var(--muted-2)" fontFamily="JetBrains Mono">{d.d || d.m || d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

function Donut({ pct = 0, size = 120, label, sub }) {
  const r = (size - 16) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - pct / 100);
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} className="donut-track"/>
        <circle cx={size / 2} cy={size / 2} r={r} className="donut-fill"
          strokeDasharray={c} strokeDashoffset={off} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.01em' }}>{label}</div>
          {sub && <div style={{ fontSize: 11, color: 'var(--muted)' }}>{sub}</div>}
        </div>
      </div>
    </div>
  );
}

// Compact spark line
function Spark({ data, valueKey = 'total', width = 120, height = 36, color = 'var(--brand-1)' }) {
  const max = Math.max(...data.map(d => d[valueKey]));
  const min = Math.min(...data.map(d => d[valueKey]));
  const pad = 2;
  const x = i => pad + ((width - pad * 2) * i) / (data.length - 1);
  const y = v => pad + (height - pad * 2) - ((v - min) / (max - min || 1)) * (height - pad * 2);
  const path = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i)},${y(d[valueKey])}`).join(' ');
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path d={path} fill="none" stroke={color} strokeWidth="1.5"/>
    </svg>
  );
}

window.Charts = { AreaChart, BarChart, Donut, Spark };

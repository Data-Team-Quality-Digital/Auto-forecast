'use client';

import { RF_DATA, formatBR } from '@/lib/rf-data';
import { RF_MONTHS } from '@/lib/constants';

interface MonthChartProps {
  monthKey: string;
}

// Metrics to chart: ROL, C.Total, MB
const METRIC_INDICES = [0, 1, 4]; // ROL, C. Total, MB
const METRIC_LABELS = ['ROL', 'C. Total', 'MB'];

function pct(realizado: number | null, prevYear: number | null): string {
  if (realizado === null || prevYear === null || prevYear === 0) return '-';
  const p = ((realizado - prevYear) / Math.abs(prevYear)) * 100;
  const rounded = Math.round(p);
  return (rounded >= 0 ? '+' : '') + rounded + '%';
}

export function MonthChart({ monthKey }: MonthChartProps) {
  const rows = RF_DATA[monthKey] ?? [];
  const monthMeta = RF_MONTHS.find((m) => m.key === monthKey);
  const label = monthMeta?.label ?? monthKey;

  // SVG dimensions
  const W = 280;
  const H = 160;
  const paddingLeft = 8;
  const paddingRight = 32;
  const paddingTop = 28;
  const paddingBottom = 24;
  const chartW = W - paddingLeft - paddingRight;
  const chartH = H - paddingTop - paddingBottom;

  const metrics = METRIC_INDICES.map((idx) => ({
    label: METRIC_LABELS[METRIC_INDICES.indexOf(idx)],
    prevYear: rows[idx]?.prevYear ?? null,
    realizado: rows[idx]?.realizado ?? null,
  }));

  // Find max for scaling (absolute values)
  const allVals = metrics.flatMap((m) => [
    m.prevYear !== null ? Math.abs(m.prevYear) : 0,
    m.realizado !== null ? Math.abs(m.realizado) : 0,
  ]);
  const maxVal = Math.max(...allVals, 1);

  const groupCount = metrics.length;
  const groupWidth = chartW / groupCount;
  const barPadding = 6;
  const barWidth = (groupWidth - barPadding * 3) / 2;

  const barHeight = (val: number | null) => {
    if (val === null) return 0;
    return (Math.abs(val) / maxVal) * chartH;
  };

  // Points for the orange dashed line (connecting tops of realizado bars)
  const linePoints: { x: number; y: number; pctLabel: string }[] = metrics.map((m, i) => {
    const groupX = paddingLeft + i * groupWidth;
    const barX = groupX + barPadding * 2 + barWidth; // center of realizado bar
    const bh = barHeight(m.realizado);
    const y = paddingTop + chartH - bh;
    const pctLabel = pct(m.realizado, m.prevYear);
    return { x: barX + barWidth / 2, y, pctLabel };
  });

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #d0d0d0',
        borderRadius: '4px',
        overflow: 'hidden',
        padding: '8px',
        position: 'relative',
      }}
    >
      {/* Month label top-right */}
      <div
        style={{
          position: 'absolute',
          top: '6px',
          right: '8px',
          fontSize: '11px',
          fontWeight: 600,
          color: '#1e2b6e',
        }}
      >
        {label}
      </div>

      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
        {/* Grid line at bottom */}
        <line
          x1={paddingLeft}
          y1={paddingTop + chartH}
          x2={W - paddingRight}
          y2={paddingTop + chartH}
          stroke="#e0e0e0"
          strokeWidth="1"
        />

        {metrics.map((m, i) => {
          const groupX = paddingLeft + i * groupWidth;
          const prevBH = barHeight(m.prevYear);
          const realBH = barHeight(m.realizado);
          const prevBarX = groupX + barPadding;
          const realBarX = groupX + barPadding * 2 + barWidth;

          return (
            <g key={i}>
              {/* Prev year bar (gray) */}
              <rect
                x={prevBarX}
                y={paddingTop + chartH - prevBH}
                width={barWidth}
                height={prevBH}
                fill="#9ca3af"
                rx="1"
              />
              {/* Realizado bar (dark blue) */}
              <rect
                x={realBarX}
                y={paddingTop + chartH - realBH}
                width={barWidth}
                height={realBH}
                fill="#1e3a8a"
                rx="1"
              />
              {/* Metric label below */}
              <text
                x={groupX + groupWidth / 2}
                y={paddingTop + chartH + 14}
                textAnchor="middle"
                fontSize="10"
                fill="#555"
              >
                {m.label}
              </text>
            </g>
          );
        })}

        {/* Orange dashed line connecting realizado bar tops */}
        {linePoints.length >= 2 && (
          <polyline
            points={linePoints.map((p) => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="#f97316"
            strokeWidth="1.5"
            strokeDasharray="4,3"
          />
        )}

        {/* Percentage labels above the line dots */}
        {linePoints.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="2.5" fill="#f97316" />
            <text
              x={p.x}
              y={p.y - 6}
              textAnchor="middle"
              fontSize="9"
              fill="#f97316"
              fontWeight="600"
            >
              {p.pctLabel}
            </text>
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          paddingTop: '2px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '10px', height: '8px', background: '#9ca3af', borderRadius: '1px' }} />
          <span style={{ fontSize: '9px', color: '#666' }}>2025</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '10px', height: '8px', background: '#1e3a8a', borderRadius: '1px' }} />
          <span style={{ fontSize: '9px', color: '#666' }}>2026</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <svg width="14" height="8">
            <line x1="0" y1="4" x2="14" y2="4" stroke="#f97316" strokeWidth="1.5" strokeDasharray="3,2" />
          </svg>
          <span style={{ fontSize: '9px', color: '#f97316' }}>Var%</span>
        </div>
      </div>
    </div>
  );
}

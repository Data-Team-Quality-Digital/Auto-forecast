'use client';

import { computeTotal, RFRow, formatBR } from '@/lib/rf-data';

interface TotalPanelProps {
  monthKeys: string[];
  buKey?: string;
}

const thStyle: React.CSSProperties = {
  padding: '4px 6px',
  fontSize: '11px',
  fontWeight: 600,
  color: '#444',
  textAlign: 'right',
  borderBottom: '1px solid #d0d0d0',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};

const tdBase: React.CSSProperties = {
  padding: '3px 5px',
  fontSize: '11px',
  borderBottom: '1px solid #e8e8e8',
  whiteSpace: 'nowrap',
};

const tdRight: React.CSSProperties = { ...tdBase, textAlign: 'right' };

const tdLabel: React.CSSProperties = {
  ...tdBase,
  textAlign: 'right',
  fontSize: '11px',
  color: '#555',
  fontWeight: 500,
};

function VarCell({ value, isPercent }: { value: number | null; isPercent?: boolean }) {
  if (value === null) return <td style={tdRight}>-</td>;
  const isNeg = value < 0;
  const isZero = value === 0;
  const color = isZero ? '#444' : isNeg ? '#ef4444' : '#22c55e';
  return (
    <td style={{ ...tdRight, color }}>
      {isNeg ? '-' : '+'}{formatBR(Math.abs(value), isPercent)}
    </td>
  );
}

export function TotalPanel({ monthKeys }: TotalPanelProps) {
  const rows: RFRow[] = computeTotal(monthKeys);

  return (
    <div style={{ background: '#fff', border: '1px solid #d0d0d0', borderRadius: '4px', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ background: '#1e2b6e', color: '#fff', fontWeight: 700, fontSize: '13px', textAlign: 'center', padding: '6px 8px' }}>
        Total trimestre
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'auto' }}>
        <thead>
          <tr style={{ background: '#e8e8e8' }}>
            <th style={{ ...thStyle, textAlign: 'left' }}>&nbsp;</th>
            <th style={thStyle}>2025</th>
            <th style={thStyle}>Orçado</th>
            <th style={thStyle}>Realizado</th>
            <th style={thStyle}>Var. x Orç</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
              <td style={tdLabel}>{row.label}</td>
              <td style={{ ...tdRight, color: '#666' }}>{row.prevYear === null ? '-' : formatBR(row.prevYear, row.isPercent)}</td>
              <td style={tdRight}>{row.orcado === null ? '-' : formatBR(row.orcado, row.isPercent)}</td>
              <td style={tdRight}>{row.realizado === null ? '-' : formatBR(row.realizado, row.isPercent)}</td>
              <VarCell value={row.varReal} isPercent={row.isPercent} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

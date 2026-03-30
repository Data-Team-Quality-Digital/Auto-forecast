'use client';

import { RF_TOTAL_DATA, RFRow, formatBR } from '@/lib/rf-data';

interface TotalPanelProps {
  monthKeys: string[];
  buKey?: string;
}

function VarCell({ value, isPercent }: { value: number | null; isPercent?: boolean }) {
  if (value === null) return <td style={tdRight}>-</td>;
  const isNeg = value < 0;
  const isZero = value === 0;
  const color = isZero ? '#444' : isNeg ? '#ef4444' : '#22c55e';
  const sign = isNeg ? '-' : '+';
  return (
    <td style={{ ...tdRight, color }}>
      {sign}{formatBR(Math.abs(value), isPercent)}
    </td>
  );
}

const tdBase: React.CSSProperties = {
  padding: '3px 6px',
  fontSize: '12px',
  borderBottom: '1px solid #e8e8e8',
  whiteSpace: 'nowrap',
};

const tdRight: React.CSSProperties = {
  ...tdBase,
  textAlign: 'right',
};

const tdLabel: React.CSSProperties = {
  ...tdBase,
  textAlign: 'right',
  fontSize: '11px',
  color: '#555',
  minWidth: '85px',
  fontWeight: 500,
};

export function TotalPanel({ monthKeys }: TotalPanelProps) {
  const selectedMonth = monthKeys[0] ?? 'jan';
  const rows: RFRow[] = RF_TOTAL_DATA[selectedMonth] ?? [];

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #d0d0d0',
        borderRadius: '4px',
        overflow: 'hidden',
        fontSize: '12px',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: '#1e2b6e',
          color: '#fff',
          fontWeight: 700,
          fontSize: '13px',
          textAlign: 'center',
          padding: '6px 8px',
        }}
      >
        Total trimestre
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
        <thead>
          <tr style={{ background: '#e8e8e8' }}>
            <th
              style={{
                padding: '4px 6px',
                fontSize: '11px',
                fontWeight: 600,
                color: '#444',
                textAlign: 'right',
                borderBottom: '1px solid #d0d0d0',
                width: '30%',
              }}
            >
              &nbsp;
            </th>
            <th
              style={{
                padding: '4px 6px',
                fontSize: '11px',
                fontWeight: 600,
                color: '#444',
                textAlign: 'right',
                borderBottom: '1px solid #d0d0d0',
                width: '17.5%',
              }}
            >
              2025
            </th>
            <th
              style={{
                padding: '4px 6px',
                fontSize: '11px',
                fontWeight: 600,
                color: '#444',
                textAlign: 'right',
                borderBottom: '1px solid #d0d0d0',
                width: '17.5%',
              }}
            >
              Orçado
            </th>
            <th
              style={{
                padding: '4px 6px',
                fontSize: '11px',
                fontWeight: 600,
                color: '#444',
                textAlign: 'right',
                borderBottom: '1px solid #d0d0d0',
                width: '17.5%',
              }}
            >
              Realizado
            </th>
            <th
              style={{
                padding: '4px 6px',
                fontSize: '11px',
                fontWeight: 600,
                color: '#444',
                textAlign: 'right',
                borderBottom: '1px solid #d0d0d0',
                width: '17.5%',
              }}
            >
              Var. real x orç
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
              <td style={tdLabel}>{row.label}</td>
              <td style={{ ...tdRight, color: '#666' }}>
                {row.prevYear === null ? '-' : formatBR(row.prevYear, row.isPercent)}
              </td>
              <td style={tdRight}>
                {row.orcado === null ? '-' : formatBR(row.orcado, row.isPercent)}
              </td>
              <td style={tdRight}>
                {row.realizado === null ? '-' : formatBR(row.realizado, row.isPercent)}
              </td>
              <VarCell value={row.varReal} isPercent={row.isPercent} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

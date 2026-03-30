'use client';

import { RF_TOTAL_DATA, RFRow, formatBR } from '@/lib/rf-data';

interface SummaryPanelProps {
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
    <td style={{ ...tdRight, color, fontSize: '10px' }}>
      {sign}{formatBR(Math.abs(value), isPercent)}
    </td>
  );
}

const tdBase: React.CSSProperties = {
  padding: '2px 4px',
  fontSize: '10px',
  borderBottom: '1px solid #ececec',
  whiteSpace: 'nowrap',
};

const tdRight: React.CSSProperties = {
  ...tdBase,
  textAlign: 'right',
};

const tdLabel: React.CSSProperties = {
  ...tdBase,
  textAlign: 'right',
  fontSize: '10px',
  color: '#555',
  fontWeight: 500,
};

export function SummaryPanel({ monthKeys }: SummaryPanelProps) {
  const selectedMonth = monthKeys[0] ?? 'jan';
  const rows: RFRow[] = RF_TOTAL_DATA[selectedMonth] ?? [];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        height: '100%',
      }}
    >
      {/* Período selecionado mini-table */}
      <div
        style={{
          background: '#fff',
          border: '1px solid #d0d0d0',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            background: '#1e2b6e',
            color: '#fff',
            fontWeight: 700,
            fontSize: '12px',
            textAlign: 'center',
            padding: '5px 8px',
          }}
        >
          Período selecionado
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <thead>
            <tr style={{ background: '#e8e8e8' }}>
              <th
                style={{
                  padding: '3px 4px',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: '#444',
                  textAlign: 'right',
                  borderBottom: '1px solid #d0d0d0',
                  width: '28%',
                }}
              >
                &nbsp;
              </th>
              <th
                style={{
                  padding: '3px 4px',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: '#444',
                  textAlign: 'right',
                  borderBottom: '1px solid #d0d0d0',
                  width: '18%',
                }}
              >
                2025
              </th>
              <th
                style={{
                  padding: '3px 4px',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: '#444',
                  textAlign: 'right',
                  borderBottom: '1px solid #d0d0d0',
                  width: '18%',
                }}
              >
                Orçado
              </th>
              <th
                style={{
                  padding: '3px 4px',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: '#444',
                  textAlign: 'right',
                  borderBottom: '1px solid #d0d0d0',
                  width: '18%',
                }}
              >
                Real.
              </th>
              <th
                style={{
                  padding: '3px 4px',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: '#444',
                  textAlign: 'right',
                  borderBottom: '1px solid #d0d0d0',
                  width: '18%',
                }}
              >
                Var.
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

      {/* Comparação section header */}
      <div
        style={{
          background: '#1e2b6e',
          color: '#fff',
          fontWeight: 700,
          fontSize: '12px',
          textAlign: 'center',
          padding: '5px 8px',
          borderRadius: '4px',
        }}
      >
        Comparação 2025 x 2026
      </div>
    </div>
  );
}

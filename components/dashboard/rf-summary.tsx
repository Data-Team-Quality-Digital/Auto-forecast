'use client';

import { computeTotal, RFRow, formatBR } from '@/lib/rf-data';

interface SummaryPanelProps {
  monthKeys: string[];
  buKey?: string;
}

const thStyle: React.CSSProperties = {
  padding: '3px 5px',
  fontSize: '11px',
  fontWeight: 600,
  color: '#444',
  textAlign: 'right',
  borderBottom: '1px solid #d0d0d0',
  whiteSpace: 'nowrap',
  background: '#e8e8e8',
};

const tdBase: React.CSSProperties = {
  padding: '2px 5px',
  fontSize: '11px',
  borderBottom: '1px solid #ececec',
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

function MiniTable({
  title,
  rows,
  columns,
}: {
  title: string;
  rows: RFRow[];
  columns: { header: string; getValue: (row: RFRow) => number | null; isVar?: boolean }[];
}) {
  return (
    <div style={{ background: '#fff', border: '1px solid #d0d0d0', borderRadius: '4px', overflow: 'hidden' }}>
      <div style={{ background: '#1e2b6e', color: '#fff', fontWeight: 700, fontSize: '11px', textAlign: 'center', padding: '5px 8px' }}>
        {title}
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
        <colgroup>
          <col style={{ width: '32%' }} />
          {columns.map((_, i) => (
            <col key={i} style={{ width: `${68 / columns.length}%` }} />
          ))}
        </colgroup>
        <thead>
          <tr>
            <th style={{ ...thStyle, textAlign: 'left' }}>&nbsp;</th>
            {columns.map((col) => (
              <th key={col.header} style={thStyle}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
              <td style={tdLabel}>{row.label}</td>
              {columns.map((col) => {
                const val = col.getValue(row);
                if (col.isVar) {
                  return <VarCell key={col.header} value={val} isPercent={row.isPercent} />;
                }
                return (
                  <td key={col.header} style={{ ...tdRight, color: col.header === '2025' ? '#666' : undefined }}>
                    {val === null ? '-' : formatBR(val, row.isPercent)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SummaryPanel({ monthKeys }: SummaryPanelProps) {
  const rows: RFRow[] = computeTotal(monthKeys);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {/* Período selecionado */}
      <MiniTable
        title="Período selecionado"
        rows={rows}
        columns={[
          { header: '2025',    getValue: (r) => r.prevYear },
          { header: 'Orçado',  getValue: (r) => r.orcado },
          { header: 'Real.',   getValue: (r) => r.realizado },
          { header: 'Var.',    getValue: (r) => r.varReal, isVar: true },
        ]}
      />

      {/* Comparação 2025 x 2026 */}
      <MiniTable
        title="Comparação 2025 x 2026"
        rows={rows}
        columns={[
          { header: '2025', getValue: (r) => r.prevYear },
          { header: '2026', getValue: (r) => r.realizado ?? r.orcado },
        ]}
      />
    </div>
  );
}

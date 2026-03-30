'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { RFSidebar } from '@/components/dashboard/rf-sidebar';

// ── Constants ──────────────────────────────────────────────────────────────────
const DRE_BUS = ['TODOS', '4AT', 'DIGITAL', 'E-COMMERCE', 'GRC', 'GRCT', 'GROWTH', 'IA', 'ITO', 'SINATRA', 'STRATEGY'];
const DRE_GRUPOS = ['TODOS', 'RECEITA BRUTA', 'IMPOSTOS/DEVOL.', 'CUSTOS'];
const MONTH_LABELS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

const BU_FILTER_MAP: Record<string, string> = {
  'TODOS': '',
  '4AT': '4AT',
  'DIGITAL': 'DIG',
  'E-COMMERCE': 'ECOM',
  'GRC': 'GRCN',
  'GRCT': 'GRCT',
  'GROWTH': 'GRO',
  'IA': 'IA',
  'ITO': 'ITO',
  'SINATRA': 'SIN',
  'STRATEGY': 'STRAT',
};

// ── Data Types ─────────────────────────────────────────────────────────────────
type DetailRow = {
  subgrupo: string;
  cResultado: string;
  contaContabil: string;
  cliFor: string;
  values: number[]; // jan → dez (12 months)
};

type DREGroup = {
  id: string;
  label: string;
  isNegative: boolean;
  rows: DetailRow[];
};

// ── Mock Data ──────────────────────────────────────────────────────────────────
const ALL_GROUPS: DREGroup[] = [
  {
    id: 'rec-bruta',
    label: 'RECEITA BRUTA',
    isNegative: false,
    rows: [
      { subgrupo: 'SERVIÇOS', cResultado: 'CR-ECOM-001', contaContabil: '3.1.1.001', cliFor: 'ECOM-D-CHILLIBEANS',  values: [246500, 198300, 312400, 287600, 264100, 295000, 278900, 241300, 308700, 269300, 241000, 296000] },
      { subgrupo: 'SERVIÇOS', cResultado: 'CR-ECOM-001', contaContabil: '3.1.1.001', cliFor: 'ECOM-D-RIACHUELO',    values: [198700, 212400, 189600, 225300, 201800, 218400, 196500, 215700, 203100, 198400, 207800, 223600] },
      { subgrupo: 'SERVIÇOS', cResultado: 'CR-ECOM-002', contaContabil: '3.1.1.002', cliFor: 'ECOM-D-PANDORA',      values: [156200, 163800, 148900, 172100, 159300, 168700, 153200, 165400, 157800, 161200, 169300, 175100] },
      { subgrupo: 'SERVIÇOS', cResultado: 'CR-GRCT-001', contaContabil: '3.1.1.003', cliFor: 'GRCT-GLOBAL',         values: [134600, 128900, 141200, 137800, 129500, 142600, 135200, 127400, 138900, 132700, 126800, 145300] },
      { subgrupo: 'SERVIÇOS', cResultado: 'CR-GRCT-002', contaContabil: '3.1.1.004', cliFor: 'GRCT-LATAM',          values: [62100,  58900,  65400,  63200,  59800,  66100,  61800,  58200,  64700,  61300,  57900,  67300]  },
      { subgrupo: 'PRODUTOS', cResultado: 'CR-DIG-001',  contaContabil: '3.1.2.001', cliFor: 'DIG-CLOUD-PLATFORM',  values: [89300,  94700,  86200,  98600,  91400,  96300,  88700,  93500,  90100,  87600,  95200,  101400] },
      { subgrupo: 'PRODUTOS', cResultado: 'CR-ITO-001',  contaContabil: '3.1.2.002', cliFor: 'ITO-INFRA-MGMT',      values: [72400,  68900,  75600,  71200,  69800,  74500,  70100,  68400,  73200,  69500,  67800,  76200]  },
    ],
  },
  {
    id: 'impostos',
    label: 'IMPOSTOS/DEVOLUÇÕES',
    isNegative: true,
    rows: [
      { subgrupo: 'IMPOSTOS S/ VENDA', cResultado: 'CR-ECOM-001', contaContabil: '3.2.1.001', cliFor: 'ECOM-D-CHILLIBEANS', values: [-32700, -26300, -41400, -38100, -35000, -39100, -36900, -31900, -40900, -35600, -31900, -39200] },
      { subgrupo: 'IMPOSTOS S/ VENDA', cResultado: 'CR-ECOM-001', contaContabil: '3.2.1.001', cliFor: 'ECOM-D-RIACHUELO',   values: [-26300, -28100, -25100, -29800, -26700, -28900, -26000, -28500, -26900, -26200, -27500, -29600] },
      { subgrupo: 'DEVOLUÇÕES',        cResultado: 'CR-ECOM-002', contaContabil: '3.2.2.001', cliFor: 'ECOM-D-PANDORA',     values: [-8900,  -9300,  -8500,  -9800,  -9100,  -9600,  -8700,  -9400,  -9000,  -9200,  -9600,  -9900]  },
      { subgrupo: 'IMPOSTOS S/ VENDA', cResultado: 'CR-GRCT-001', contaContabil: '3.2.1.002', cliFor: 'GRCT-GLOBAL',        values: [-17800, -17000, -18700, -18200, -17100, -18900, -17900, -16800, -18400, -17500, -16700, -19200] },
      { subgrupo: 'IMPOSTOS S/ VENDA', cResultado: 'CR-GRCT-002', contaContabil: '3.2.1.003', cliFor: 'GRCT-LATAM',         values: [-8200,  -7800,  -8600,  -8300,  -7900,  -8700,  -8100,  -7700,  -8500,  -8100,  -7600,  -8900]  },
    ],
  },
  {
    id: 'custos',
    label: 'CUSTOS',
    isNegative: true,
    rows: [
      { subgrupo: 'PESSOAL',      cResultado: 'CR-ECOM-001', contaContabil: '4.1.1.001', cliFor: 'ECOM-D-CHILLIBEANS',  values: [-48200, -41300, -52600, -49800, -44100, -53200, -47900, -40200, -51800, -46300, -40100, -54200] },
      { subgrupo: 'PESSOAL',      cResultado: 'CR-GRCT-001', contaContabil: '4.1.1.002', cliFor: 'GRCT-GLOBAL',         values: [-28400, -27100, -29800, -28900, -27300, -30100, -28600, -26800, -29500, -27900, -26600, -30600] },
      { subgrupo: 'PESSOAL',      cResultado: 'CR-GRCT-002', contaContabil: '4.1.1.003', cliFor: 'GRCT-LATAM',          values: [-12100, -11500, -12800, -12400, -11700, -13000, -12200, -11300, -12600, -11900, -11200, -13300] },
      { subgrupo: 'FORNECEDORES', cResultado: 'CR-DIG-001',  contaContabil: '4.1.2.001', cliFor: 'DIG-CLOUD-PLATFORM',  values: [-15600, -14800, -16500, -15900, -14900, -16800, -15400, -14600, -16100, -15200, -14500, -17000] },
      { subgrupo: 'FORNECEDORES', cResultado: 'CR-ITO-001',  contaContabil: '4.1.2.002', cliFor: 'ITO-INFRA-MGMT',      values: [-9800,  -9200,  -10400, -9900,  -9400,  -10600, -9700,  -9100,  -10200, -9600,  -9000,  -10800] },
    ],
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
function formatBR(v: number): string {
  return Math.abs(v).toLocaleString('pt-BR', { maximumFractionDigits: 0 });
}

function displayVal(v: number, isNegative: boolean): string {
  if (v === 0) return '-';
  if (isNegative) return `(${formatBR(v)})`;
  return v < 0 ? `(${formatBR(v)})` : formatBR(v);
}

function sumValues(rows: DetailRow[]): number[] {
  return MONTH_LABELS.map((_, i) => rows.reduce((s, r) => s + (r.values[i] ?? 0), 0));
}

function rowTotal(values: number[]): number {
  return values.reduce((a, b) => a + b, 0);
}

function thStyle(align: 'left' | 'right', minWidth: number): React.CSSProperties {
  return { padding: '8px 10px', textAlign: align, fontWeight: 600, whiteSpace: 'nowrap', minWidth: `${minWidth}px`, fontSize: '11px' };
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function DrePage() {
  const [selectedBU, setSelectedBU] = useState('TODOS');
  const [selectedGrupo, setSelectedGrupo] = useState('TODOS');
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['rec-bruta']));

  const toggleGroup = (id: string) =>
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const buToken = BU_FILTER_MAP[selectedBU] ?? '';

  const filteredGroups = ALL_GROUPS
    .filter(g => {
      if (selectedGrupo === 'TODOS') return true;
      if (selectedGrupo === 'IMPOSTOS/DEVOL.') return g.label.startsWith('IMPOSTOS');
      return g.label === selectedGrupo;
    })
    .map(g => ({
      ...g,
      rows: buToken
        ? g.rows.filter(r => r.cliFor.includes(buToken) || r.cResultado.includes(buToken))
        : g.rows,
    }))
    .filter(g => g.rows.length > 0);

  const grandTotals = MONTH_LABELS.map((_, i) =>
    filteredGroups.reduce((sum, g) => sum + g.rows.reduce((s, r) => s + (r.values[i] ?? 0), 0), 0),
  );

  const pillStyle = (selected: boolean): React.CSSProperties => ({
    padding: '2px 9px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: 500,
    cursor: 'pointer',
    border: `1px solid ${selected ? '#1a2459' : '#e2e5ef'}`,
    lineHeight: '18px',
    whiteSpace: 'nowrap',
    background: selected ? '#1a2459' : '#f5f7fa',
    color: selected ? '#fff' : '#555',
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      <RFSidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f4f6fb', minWidth: 0, minHeight: '100vh' }}>

        {/* Header */}
        <header style={{ background: '#fff', padding: '0 20px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e8eaf0', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '17px', fontWeight: 600, color: '#1a2459', margin: 0, letterSpacing: '-0.2px' }}>
              Grid detalhada
            </h1>
            <span style={{ fontSize: '12px', fontWeight: 500, color: '#8892b0', background: '#f0f2f8', padding: '2px 10px', borderRadius: '20px' }}>
              DRE
            </span>
          </div>
          <Link
            href="/dashboard"
            style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #e2e5ef', background: '#fff', fontSize: '12px', fontWeight: 500, color: '#444', cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            ← voltar
          </Link>
        </header>

        {/* Filter Bar */}
        <div style={{ background: '#fff', borderBottom: '1px solid #e0e0e0', padding: '6px 16px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', minHeight: '42px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', flex: 1 }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px', marginRight: '2px' }}>Filtros</span>
            <span style={{ fontSize: '11px', color: '#777', marginRight: '2px' }}>BU</span>
            {DRE_BUS.map(bu => (
              <button key={bu} style={pillStyle(bu === selectedBU)} onClick={() => setSelectedBU(bu)}>{bu}</button>
            ))}
          </div>
          <div style={{ width: '1px', height: '22px', background: '#ddd', flexShrink: 0 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', color: '#777', marginRight: '2px' }}>Grupo</span>
            {DRE_GRUPOS.map(g => (
              <button key={g} style={pillStyle(g === selectedGrupo)} onClick={() => setSelectedGrupo(g)}>{g}</button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div style={{ padding: '12px', flex: 1 }}>
          <div style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', background: '#fff' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                <thead>
                  <tr style={{ background: '#1a2459', color: '#fff' }}>
                    <th style={thStyle('left', 140)}>SUBGRUPO</th>
                    <th style={thStyle('left', 130)}>C.RESULTADO</th>
                    <th style={thStyle('left', 120)}>CONTA CONTÁBIL</th>
                    <th style={thStyle('left', 170)}>CLI/FOR</th>
                    {MONTH_LABELS.map(m => <th key={m} style={thStyle('right', 72)}>{m}</th>)}
                    <th style={thStyle('right', 90)}>Total Geral</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGroups.map(group => {
                    const isExp = expanded.has(group.id);
                    const grpTotals = sumValues(group.rows);
                    const grpTotal = rowTotal(grpTotals);
                    const negColor = '#1e40af';
                    const posColor = '#1a2459';
                    const valColor = group.isNegative ? negColor : posColor;

                    return (
                      <React.Fragment key={group.id}>
                        {/* Group header row */}
                        <tr style={{ background: '#e8ecf8', cursor: 'pointer' }} onClick={() => toggleGroup(group.id)}>
                          <td colSpan={4} style={{ padding: '7px 10px', fontWeight: 700, color: posColor, whiteSpace: 'nowrap' }}>
                            <span style={{ marginRight: '6px', fontSize: '9px', display: 'inline-block', width: '10px' }}>
                              {isExp ? '▼' : '▶'}
                            </span>
                            {group.label}
                          </td>
                          {grpTotals.map((v, i) => (
                            <td key={i} style={{ padding: '7px 10px', textAlign: 'right', fontWeight: 700, color: valColor, whiteSpace: 'nowrap' }}>
                              {displayVal(v, group.isNegative)}
                            </td>
                          ))}
                          <td style={{ padding: '7px 10px', textAlign: 'right', fontWeight: 700, color: valColor, whiteSpace: 'nowrap' }}>
                            {displayVal(grpTotal, group.isNegative)}
                          </td>
                        </tr>

                        {/* Detail rows */}
                        {isExp && group.rows.map((row, ri) => {
                          const rTotal = rowTotal(row.values);
                          return (
                            <tr key={ri} style={{ background: ri % 2 === 0 ? '#fff' : '#fafbff', borderBottom: '1px solid #f0f2fa' }}>
                              <td style={{ padding: '5px 10px 5px 26px', color: '#444', whiteSpace: 'nowrap' }}>{row.subgrupo}</td>
                              <td style={{ padding: '5px 10px', color: '#444', whiteSpace: 'nowrap' }}>{row.cResultado}</td>
                              <td style={{ padding: '5px 10px', color: '#555', whiteSpace: 'nowrap', fontFamily: 'monospace', fontSize: '10.5px' }}>{row.contaContabil}</td>
                              <td style={{ padding: '5px 10px', color: '#444', whiteSpace: 'nowrap' }}>{row.cliFor}</td>
                              {row.values.map((v, i) => (
                                <td key={i} style={{ padding: '5px 10px', textAlign: 'right', color: group.isNegative ? negColor : v < 0 ? '#dc2626' : '#333', whiteSpace: 'nowrap' }}>
                                  {displayVal(v, group.isNegative)}
                                </td>
                              ))}
                              <td style={{ padding: '5px 10px', textAlign: 'right', fontWeight: 600, color: group.isNegative ? negColor : rTotal < 0 ? '#dc2626' : '#333', whiteSpace: 'nowrap' }}>
                                {displayVal(rTotal, group.isNegative)}
                              </td>
                            </tr>
                          );
                        })}

                        {/* Subtotal row */}
                        {isExp && (
                          <tr style={{ background: '#f0f2fa', borderTop: '1px solid #dce1f0', borderBottom: '2px solid #c5cce8' }}>
                            <td colSpan={4} style={{ padding: '6px 10px', fontWeight: 700, color: posColor, whiteSpace: 'nowrap' }}>
                              {group.label} Total
                            </td>
                            {grpTotals.map((v, i) => (
                              <td key={i} style={{ padding: '6px 10px', textAlign: 'right', fontWeight: 700, color: valColor, whiteSpace: 'nowrap' }}>
                                {displayVal(v, group.isNegative)}
                              </td>
                            ))}
                            <td style={{ padding: '6px 10px', textAlign: 'right', fontWeight: 700, color: valColor, whiteSpace: 'nowrap' }}>
                              {displayVal(grpTotal, group.isNegative)}
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}

                  {/* Total Geral row */}
                  <tr style={{ background: '#1a2459', color: '#fff' }}>
                    <td colSpan={4} style={{ padding: '8px 10px', fontWeight: 700, whiteSpace: 'nowrap' }}>Total Geral</td>
                    {grandTotals.map((v, i) => (
                      <td key={i} style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 700, whiteSpace: 'nowrap' }}>
                        {v === 0 ? '-' : v < 0 ? `(${formatBR(v)})` : formatBR(v)}
                      </td>
                    ))}
                    <td style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 700, whiteSpace: 'nowrap' }}>
                      {rowTotal(grandTotals) === 0 ? '-' : rowTotal(grandTotals) < 0 ? `(${formatBR(rowTotal(grandTotals))})` : formatBR(rowTotal(grandTotals))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

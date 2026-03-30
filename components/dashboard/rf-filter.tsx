'use client';

import { RF_BUS, RF_MONTHS } from '@/lib/constants';

interface RFFilterBarProps {
  selectedMonth: string;
  selectedBU: string;
  onMonthChange: (month: string) => void;
  onBUChange: (bu: string) => void;
}

const pillBase: React.CSSProperties = {
  padding: '2px 9px',
  borderRadius: '12px',
  fontSize: '11px',
  fontWeight: 500,
  cursor: 'pointer',
  border: '1px solid transparent',
  lineHeight: '18px',
  whiteSpace: 'nowrap',
  transition: 'background 0.1s, color 0.1s',
};

const pillSelected: React.CSSProperties = {
  ...pillBase,
  background: '#1a2459',
  color: '#ffffff',
  border: '1px solid #1a2459',
};

const pillUnselected: React.CSSProperties = {
  ...pillBase,
  background: '#f5f7fa',
  color: '#555',
  border: '1px solid #e2e5ef',
};

export function RFFilterBar({ selectedMonth, selectedBU, onMonthChange, onBUChange }: RFFilterBarProps) {
  return (
    <div
      style={{
        background: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
        padding: '6px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap',
        minHeight: '42px',
      }}
    >
      {/* Left side: Filtros + months */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', flex: 1 }}>
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px', marginRight: '2px' }}>
          Filtros
        </span>
        <span style={{ fontSize: '11px', color: '#777', marginRight: '2px' }}>Mês</span>
        {RF_MONTHS.map((m) => (
          <button
            key={m.key}
            style={m.key === selectedMonth ? pillSelected : pillUnselected}
            onClick={() => onMonthChange(m.key)}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div style={{ width: '1px', height: '22px', background: '#ddd', flexShrink: 0 }} />

      {/* Right side: BU pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '11px', color: '#777', marginRight: '2px' }}>BU</span>
        {RF_BUS.map((bu) => (
          <button
            key={bu}
            style={bu === selectedBU ? pillSelected : pillUnselected}
            onClick={() => onBUChange(bu)}
          >
            {bu}
          </button>
        ))}
      </div>
    </div>
  );
}

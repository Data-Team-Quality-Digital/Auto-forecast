'use client';

import Link from 'next/link';

export function RFHeader() {
  return (
    <header
      style={{
        background: '#fff',
        padding: '0 20px',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #e8eaf0',
        flexShrink: 0,
      }}
    >
      {/* Left: title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <h1
          style={{
            fontSize: '17px',
            fontWeight: 600,
            color: '#1a2459',
            margin: 0,
            letterSpacing: '-0.2px',
          }}
        >
          Rolling Forecast
        </h1>
        <span
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: '#8892b0',
            background: '#f0f2f8',
            padding: '2px 10px',
            borderRadius: '20px',
          }}
        >
          trimestral
        </span>
      </div>

      {/* Right: actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          style={{
            padding: '6px 14px',
            borderRadius: '8px',
            border: '1px solid #e2e5ef',
            background: '#fff',
            fontSize: '12px',
            fontWeight: 500,
            color: '#444',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Grid DRE
        </button>

        <button
          style={{
            padding: '6px 14px',
            borderRadius: '8px',
            border: 'none',
            background: '#1a2459',
            color: '#fff',
            fontSize: '12px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Adicinais
        </button>

        {/* Divider */}
        <div style={{ width: '1px', height: '24px', background: '#e2e5ef', margin: '0 4px' }} />

        {/* Notification */}
        <button
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            border: '1px solid #e2e5ef',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#667',
            position: 'relative',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span
            style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#4f6ef7',
              border: '1.5px solid #fff',
            }}
          />
        </button>

        {/* Avatar */}
        <div
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4f6ef7 0%, #7c3aed 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 700,
            color: '#fff',
            flexShrink: 0,
          }}
        >
          RF
        </div>
      </div>
    </header>
  );
}

'use client';

export function RFHeader() {
  return (
    <header
      style={{
        background: 'linear-gradient(135deg, #c8cbd6 0%, #dce0e8 100%)',
        padding: '0 24px',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #b0b4c0',
        flexShrink: 0,
      }}
    >
      <h1
        style={{
          fontSize: '28px',
          fontWeight: 300,
          color: '#2a2a2a',
          margin: 0,
          letterSpacing: '-0.5px',
          fontFamily: 'inherit',
        }}
      >
        Rolling Forecast{' '}
        <span style={{ color: '#555', fontWeight: 300 }}>| trimestral</span>
      </h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          style={{
            padding: '6px 16px',
            borderRadius: '6px',
            border: '1px solid #999',
            background: 'rgba(255,255,255,0.75)',
            fontSize: '13px',
            cursor: 'pointer',
            fontWeight: 500,
            color: '#333',
            letterSpacing: '0.1px',
          }}
        >
          Grid DRE
        </button>

        <button
          style={{
            padding: '6px 16px',
            borderRadius: '6px',
            border: 'none',
            background: '#1e2b6e',
            color: 'white',
            fontSize: '13px',
            cursor: 'pointer',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            letterSpacing: '0.1px',
          }}
        >
          <span style={{ fontSize: '17px', lineHeight: 1, marginTop: '-1px' }}>+</span>
          Adicinais
        </button>

        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <span style={{ color: 'white', fontSize: '13px', fontWeight: 700 }}>Q</span>
        </div>
      </div>
    </header>
  );
}

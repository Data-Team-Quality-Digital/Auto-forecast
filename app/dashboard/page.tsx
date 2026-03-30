'use client';

import { useState } from 'react';
import { RFHeader } from '@/components/dashboard/rf-header';
import { RFFilterBar } from '@/components/dashboard/rf-filter';
import { RFSidebar } from '@/components/dashboard/rf-sidebar';
import { MonthPanel } from '@/components/dashboard/rf-month-panel';
import { TotalPanel } from '@/components/dashboard/rf-total-panel';
import { MonthChart } from '@/components/dashboard/rf-chart';
import { SummaryPanel } from '@/components/dashboard/rf-summary';
import { getQuarterMonths } from '@/lib/rf-data';

export default function DashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState<string>('out');
  const [selectedBU, setSelectedBU] = useState<string>('GRCT');

  const quarterMonths = getQuarterMonths(selectedMonth);

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      {/* Sidebar — always visible, narrow */}
      <RFSidebar />

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: '#f4f6fb',
          minWidth: 0,
          minHeight: '100vh',
        }}
      >
        <RFHeader />

        <RFFilterBar
          selectedMonth={selectedMonth}
          selectedBU={selectedBU}
          onMonthChange={setSelectedMonth}
          onBUChange={setSelectedBU}
        />

        <div style={{ padding: '12px', flex: 1 }}>
          {/* Row 1: 3 monthly tables + total */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '10px' }}>
            {quarterMonths.map((m) => (
              <div key={m} style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                <MonthPanel monthKey={m} buKey={selectedBU} />
              </div>
            ))}
            <div style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
              <TotalPanel monthKeys={quarterMonths} buKey={selectedBU} />
            </div>
          </div>

          {/* Row 2: 3 bar charts + summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '10px', marginTop: '10px' }}>
            {quarterMonths.map((m) => (
              <div key={m} style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                <MonthChart monthKey={m} />
              </div>
            ))}
            <div style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
              <SummaryPanel monthKeys={quarterMonths} buKey={selectedBU} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

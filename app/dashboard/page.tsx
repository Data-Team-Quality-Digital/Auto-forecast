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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const quarterMonths = getQuarterMonths(selectedMonth);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f0f2f5',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <RFSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <RFHeader onMenuClick={() => setSidebarOpen(true)} />

      <RFFilterBar
        selectedMonth={selectedMonth}
        selectedBU={selectedBU}
        onMonthChange={setSelectedMonth}
        onBUChange={setSelectedBU}
      />

      <div style={{ padding: '8px', flex: 1 }}>
        {/* Row 1: 3 monthly tables + total */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '6px' }}>
          {quarterMonths.map((m) => (
            <MonthPanel key={m} monthKey={m} buKey={selectedBU} />
          ))}
          <TotalPanel monthKeys={quarterMonths} buKey={selectedBU} />
        </div>

        {/* Row 2: 3 bar charts + summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '6px', marginTop: '6px' }}>
          {quarterMonths.map((m) => (
            <MonthChart key={m} monthKey={m} />
          ))}
          <SummaryPanel monthKeys={quarterMonths} buKey={selectedBU} />
        </div>
      </div>
    </div>
  );
}

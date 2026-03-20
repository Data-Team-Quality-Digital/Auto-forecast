'use client';

import { useState } from 'react';
import { FilterBar } from '@/components/dashboard/filter-bar';
import { InsightsPanel } from '@/components/dashboard/insights-panel';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { TrendChart } from '@/components/dashboard/trend-chart';
import { AppShell } from '@/components/layout/app-shell';
import { ButtonLink } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { defaultFilters, dashboardInsights, kpis, regionalVariance, trendSeries } from '@/lib/mock-data';
import { MonthKey } from '@/lib/types';

export default function DashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState<MonthKey>(defaultFilters.month);
  const [selectedUnit, setSelectedUnit] = useState(defaultFilters.businessUnit);

  return (
    <AppShell>
      <div className="space-y-8">
        <PageHeader
          title="Executive Dashboard"
          subtitle={`${selectedUnit} • ${selectedMonth.toUpperCase()} scenario comparison active`}
          actions={
            <>
              <ButtonLink href="/dre" variant="secondary">DRE Grid</ButtonLink>
              <ButtonLink href="/inputs">Additional Inputs</ButtonLink>
            </>
          }
        />
        <FilterBar
          selectedMonth={selectedMonth}
          selectedUnit={selectedUnit}
          onMonthChange={setSelectedMonth}
          onUnitChange={setSelectedUnit}
        />
        <div className="grid gap-6 xl:grid-cols-4">
          {kpis.map((item) => (
            <KpiCard key={item.title} item={item} />
          ))}
        </div>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_360px]">
          <TrendChart series={trendSeries} />
          <InsightsPanel insights={dashboardInsights} regionalVariance={regionalVariance} />
        </div>
      </div>
    </AppShell>
  );
}

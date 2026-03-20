import { DreTable } from '@/components/dre/dre-table';
import { AppShell } from '@/components/layout/app-shell';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { dreGroups } from '@/lib/mock-data';

export default function DrePage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <PageHeader
          title="DRE Grid"
          subtitle="Detailed revenue and expenditure analysis by business segment with actual vs planned comparisons."
          actions={
            <>
              <span className="rounded-full bg-emerald-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Actuals</span>
              <span className="rounded-full bg-sky-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Planned</span>
              <ButtonLink href="/dashboard" variant="secondary">Back to Dashboard</ButtonLink>
            </>
          }
        />
        <DreTable groups={dreGroups} />
        <div className="grid gap-6 xl:grid-cols-3">
          <Card className="border-l-4 border-l-success">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Variance Summary</p>
            <p className="mt-3 text-4xl font-bold text-ink">+14.2%</p>
            <p className="mt-2 text-sm text-emerald-700">↗ Actual vs. planned revenue</p>
          </Card>
          <Card className="border-l-4 border-l-accent">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Cost Efficiency</p>
            <p className="mt-3 text-4xl font-bold text-ink">92.4</p>
            <p className="mt-2 text-sm text-sky-600">Infrastructure utilization ratio</p>
          </Card>
          <Card className="bg-brand text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-100">Q4 Forecast</p>
            <p className="mt-3 text-4xl font-bold">$2.4M</p>
            <p className="mt-2 text-sm text-indigo-100">Projected revenue based on current trend.</p>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

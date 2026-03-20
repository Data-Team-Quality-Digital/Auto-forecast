import { AppShell } from '@/components/layout/app-shell';
import { OperationalTable } from '@/components/operational/operational-table';
import { PageHeader } from '@/components/ui/page-header';

export default function OperationalPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <PageHeader
          title="Operational Planning"
          subtitle="Resource allocation and capacity forecasting per employee and cost center, with actuals locked for prior months."
        />
        <OperationalTable />
      </div>
    </AppShell>
  );
}

import { InputRecords } from '@/components/inputs/input-records';
import { AppShell } from '@/components/layout/app-shell';
import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';

export default function InputsPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <PageHeader
          title="Additional Inputs"
          subtitle="Refine projections with granular project-level inputs. Changes are reflected immediately in the shared planning state."
          actions={<div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">System synced: all calculations updated</div>}
        />
        <InputRecords />
        <Card className="border-l-4 border-l-success bg-white">
          <h3 className="text-lg font-bold text-ink">Data input guidance</h3>
          <p className="mt-2 text-sm leading-6 text-muted">Rows entered here are stored in local application state and designed to map cleanly to a future API contract for forecast versioning, validation, and audit controls.</p>
        </Card>
      </div>
    </AppShell>
  );
}

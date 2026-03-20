import { Card } from '@/components/ui/card';
import { KPI } from '@/lib/types';
import { cn } from '@/lib/utils';

const toneMap = {
  success: 'border-l-4 border-l-success',
  danger: 'border-l-4 border-l-danger',
  brand: 'border-l-4 border-l-accent',
  neutral: 'border-l-4 border-l-slate-300',
};

export function KpiCard({ item }: { item: KPI }) {
  return (
    <Card className={cn('space-y-4 p-5', toneMap[item.tone])}>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{item.title}</p>
        <p className="mt-3 text-4xl font-bold text-ink">{item.value}</p>
      </div>
      <div className="space-y-2 text-sm text-slate-500">
        <div className="flex items-center justify-between"><span>Baseline</span><span>{item.baseline}</span></div>
        <div className="flex items-center justify-between"><span>Optimistic</span><span>{item.optimistic}</span></div>
        <div className="flex items-center justify-between font-semibold text-ink"><span>Variance</span><span>{item.delta}</span></div>
      </div>
      <div className="h-10 rounded-full bg-gradient-to-r from-slate-100 via-slate-50 to-indigo-50" />
    </Card>
  );
}

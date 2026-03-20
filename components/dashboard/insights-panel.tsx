import { Card } from '@/components/ui/card';

export function InsightsPanel({ insights, regionalVariance }: { insights: Array<{ title: string; description: string }>; regionalVariance: Array<{ region: string; baseline: string; optimistic: string }> }) {
  return (
    <div className="space-y-6">
      <Card className="space-y-5">
        <h3 className="text-lg font-bold uppercase tracking-[0.18em] text-brand">Scenario insights</h3>
        {insights.map((item) => (
          <div key={item.title} className="rounded-2xl bg-indigo-50 p-4">
            <p className="font-semibold text-brand">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
          </div>
        ))}
      </Card>
      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold uppercase tracking-[0.18em] text-brand">Regional variance</h3>
          <span className="text-slate-400">•••</span>
        </div>
        {regionalVariance.map((item) => (
          <div key={item.region} className="grid grid-cols-[1fr_auto] gap-3 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
            <div>
              <p className="text-sm font-semibold text-ink">BU: {item.region}</p>
            </div>
            <div className="text-right text-sm">
              <p className="font-semibold text-success">{item.baseline} vs Base</p>
              <p className="text-slate-500">{item.optimistic} vs Opt</p>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

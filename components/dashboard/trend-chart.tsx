import { Card } from '@/components/ui/card';
import { MONTHS } from '@/lib/constants';
import { TrendSeries } from '@/lib/types';

export function TrendChart({ series }: { series: TrendSeries[] }) {
  const max = Math.max(...series.flatMap((item) => item.values));

  return (
    <Card className="h-full">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ink">Scenario Performance Trends</h2>
          <p className="mt-2 text-sm text-muted">Comparative analysis across multiple strategic horizons.</p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          {series.map((item) => (
            <span key={item.label} className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              {item.label}
            </span>
          ))}
        </div>
      </div>
      <div className="grid h-[320px] grid-cols-12 items-end gap-4">
        {MONTHS.map((month, monthIndex) => (
          <div key={month.key} className="flex h-full flex-col justify-end gap-3">
            <div className="flex h-full items-end justify-center gap-1">
              {series.map((item) => (
                <div
                  key={item.label}
                  className="w-full rounded-t-xl"
                  style={{
                    height: `${(item.values[monthIndex] / max) * 100}%`,
                    backgroundColor: item.color,
                    opacity: item.label === 'Baseline' ? 0.65 : 1,
                  }}
                />
              ))}
            </div>
            <span className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{month.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

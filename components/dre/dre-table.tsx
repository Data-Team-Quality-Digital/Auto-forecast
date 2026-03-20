import { Fragment } from 'react';
import { Card } from '@/components/ui/card';
import { MONTHS } from '@/lib/constants';
import { DREGroup } from '@/lib/types';
import { cn, formatCompactCurrency } from '@/lib/utils';

const toneMap = {
  success: 'border-l-success',
  danger: 'border-l-danger',
  brand: 'border-l-accent',
};

export function DreTable({ groups }: { groups: DREGroup[] }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="min-w-[1100px] w-full border-separate border-spacing-0">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            <tr>
              <th className="px-6 py-5">Account &amp; Classification</th>
              {MONTHS.map((month) => (
                <th key={month.key} className="px-4 py-5 text-center">{month.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <Fragment key={group.account}>
                <tr key={group.account} className="bg-white">
                  <td colSpan={13} className="px-6 py-4">
                    <div className={cn('border-l-4 pl-4 font-bold text-brand', toneMap[group.tone])}>{group.account}</div>
                  </td>
                </tr>
                {group.rows.map((row) => (
                  <tr key={`${group.account}-${row.client}`} className="border-t border-slate-100 align-top">
                    <td className="px-6 py-5">
                      <p className="font-semibold text-ink">Client: {row.client}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{row.classification}</p>
                    </td>
                    {MONTHS.map((month) => (
                      <td key={month.key} className="px-4 py-5 text-center text-sm">
                        <p className="font-semibold text-emerald-700">{formatCompactCurrency(row.values[month.key].actual)}</p>
                        <p className="mt-1 text-sky-500">{formatCompactCurrency(row.values[month.key].planned)}</p>
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
            <tr className="bg-slate-50">
              <td className="px-6 py-5 text-base font-bold uppercase tracking-[0.18em] text-brand">Gross Margin</td>
              {MONTHS.map((month, index) => (
                <td key={month.key} className="px-4 py-5 text-center text-lg font-bold text-emerald-700">
                  {(85.2 - index * 0.5).toFixed(1)}%
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}

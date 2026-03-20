'use client';

import { Card } from '@/components/ui/card';
import { MONTHS } from '@/lib/constants';
import { useForecast } from '@/lib/forecast-context';
import { formatCurrency, getCurrentMonthKey, isEditableMonth } from '@/lib/utils';

export function OperationalTable() {
  const { employeeForecasts, updateEmployeeValue } = useForecast();
  const currentMonth = getCurrentMonthKey();

  return (
    <div className="grid gap-6 xl:grid-cols-[1.75fr_0.95fr]">
      <Card className="overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-brand">Unit: Digital Solutions</h2>
            <p className="mt-2 text-sm text-muted">Cost center 4020-DIG · Actual data is locked through {currentMonth.toUpperCase()}.</p>
          </div>
          <div className="flex gap-3 text-xs font-semibold uppercase tracking-[0.18em]">
            <span className="rounded-full bg-emerald-100 px-3 py-2 text-emerald-700">Actual Data</span>
            <span className="rounded-full bg-sky-100 px-3 py-2 text-sky-700">Forecast Data</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[1100px] w-full text-left">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.18em] text-slate-500">
              <tr>
                <th className="px-6 py-4">Employee / Category</th>
                {MONTHS.map((month) => (
                  <th key={month.key} className="px-4 py-4 text-center">{month.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employeeForecasts.map((plan) => (
                <tr key={plan.employee} className="border-t border-slate-100 align-top">
                  <td className="px-6 py-5">
                    <p className="font-semibold text-ink">{plan.employee}</p>
                    <p className="mt-1 text-sm text-slate-500">{plan.role}</p>
                  </td>
                  {MONTHS.map((month) => {
                    const editable = isEditableMonth(month.key);
                    return (
                      <td key={month.key} className="px-4 py-5 text-center">
                        <input
                          type="number"
                          value={plan.values[month.key]}
                          readOnly={!editable}
                          onChange={(event) => updateEmployeeValue(plan.employee, month.key, Number(event.target.value))}
                          className={`w-24 rounded-xl border px-3 py-2 text-center text-sm outline-none ${editable ? 'border-sky-200 bg-sky-50 text-ink' : 'border-slate-200 bg-slate-100 text-slate-400'}`}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr className="bg-slate-50 font-bold text-brand">
                <td className="px-6 py-5 uppercase tracking-[0.18em]">Unit Total (USD)</td>
                {MONTHS.map((month) => {
                  const total = employeeForecasts.reduce((sum, plan) => sum + plan.values[month.key], 0);
                  return (
                    <td key={month.key} className="px-4 py-5 text-center text-base">{formatCurrency(total)}</td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <div className="space-y-6">
        <Card>
          <h3 className="text-lg font-bold uppercase tracking-[0.18em] text-slate-500">Scenario intelligence</h3>
          <div className="mt-4 rounded-2xl bg-slate-50 p-4">
            <p className="font-semibold text-ink">Efficiency Alert</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Digital Solutions unit shows 15% higher labor cost vs Q1 average due to seniority adjustments in Oct–Nov.</p>
          </div>
        </Card>
        <Card>
          <h3 className="text-lg font-bold uppercase tracking-[0.18em] text-slate-500">Audit trail</h3>
          <ul className="mt-4 space-y-4 text-sm text-slate-600">
            <li><span className="font-semibold text-brand">Forecast Updated</span> · Marcus Smith · 4h ago</li>
            <li><span className="font-semibold text-brand">Actuals Imported</span> · System · 6h ago</li>
            <li><span className="font-semibold text-brand">Scenario Created</span> · Jane Doe · 2 days ago</li>
          </ul>
        </Card>
        <Card className="bg-brand text-white">
          <p className="text-sm uppercase tracking-[0.18em] text-indigo-100">Integration Status</p>
          <p className="mt-2 text-2xl font-bold">ERP Connectivity</p>
          <p className="mt-2 text-sm text-indigo-100">Ready for sync when backend services are connected.</p>
        </Card>
      </div>
    </div>
  );
}

'use client';

import { FormEvent, useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BUSINESS_UNITS, MONTHS } from '@/lib/constants';
import { useForecast } from '@/lib/forecast-context';
import { MonthKey } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

const initialForm = {
  month: 'oct' as MonthKey,
  businessUnit: BUSINESS_UNITS[0],
  client: '',
  project: '',
  revenue: 0,
  cost: 0,
};

export function InputRecords() {
  const { records, addRecord } = useForecast();
  const [form, setForm] = useState(initialForm);
  const [filter, setFilter] = useState('');

  const filteredRecords = useMemo(
    () => records.filter((record) => record.project.toLowerCase().includes(filter.toLowerCase())),
    [filter, records],
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.client || !form.project) {
      return;
    }

    addRecord(form);
    setForm(initialForm);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <Card>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-bold text-ink">Bulk Data Import</h2>
              <p className="mt-2 text-sm text-muted">Upload CSV or XLSX for mass updates when backend ingestion is available.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary">Download Template</Button>
              <Button>Choose File</Button>
            </div>
          </div>
        </Card>
        <Card className="bg-brand text-white">
          <h2 className="text-2xl font-bold">Quick Entry</h2>
          <p className="mt-2 text-sm text-indigo-100">Append a new record manually and update forecast inputs immediately.</p>
          <form className="mt-5 grid gap-3" onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-3">
              <select value={form.month} onChange={(e) => setForm((current) => ({ ...current, month: e.target.value as MonthKey }))} className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm outline-none">
                {MONTHS.map((month) => (
                  <option key={month.key} value={month.key} className="text-ink">{month.label}</option>
                ))}
              </select>
              <select value={form.businessUnit} onChange={(e) => setForm((current) => ({ ...current, businessUnit: e.target.value }))} className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm outline-none">
                {BUSINESS_UNITS.map((unit) => (
                  <option key={unit} value={unit} className="text-ink">{unit}</option>
                ))}
              </select>
            </div>
            <input value={form.client} onChange={(e) => setForm((current) => ({ ...current, client: e.target.value }))} placeholder="Client" className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm outline-none placeholder:text-indigo-100" />
            <input value={form.project} onChange={(e) => setForm((current) => ({ ...current, project: e.target.value }))} placeholder="Project" className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm outline-none placeholder:text-indigo-100" />
            <div className="grid grid-cols-2 gap-3">
              <input type="number" value={form.revenue} onChange={(e) => setForm((current) => ({ ...current, revenue: Number(e.target.value) }))} placeholder="Revenue" className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm outline-none placeholder:text-indigo-100" />
              <input type="number" value={form.cost} onChange={(e) => setForm((current) => ({ ...current, cost: Number(e.target.value) }))} placeholder="Cost" className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm outline-none placeholder:text-indigo-100" />
            </div>
            <Button type="submit" className="bg-white text-brand hover:bg-indigo-50">+ New Row</Button>
          </form>
        </Card>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-ink">Input Grid</h2>
            <p className="mt-1 text-sm text-muted">{records.length} total records</p>
          </div>
          <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter project..." className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none" />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-left">
            <thead className="text-xs uppercase tracking-[0.18em] text-slate-500">
              <tr>
                <th className="px-6 py-4">Month</th>
                <th className="px-6 py-4">Business Unit</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Project</th>
                <th className="px-6 py-4">Revenue</th>
                <th className="px-6 py-4">Cost</th>
                <th className="px-6 py-4">Margin</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => {
                const margin = record.revenue ? ((record.revenue - record.cost) / record.revenue) * 100 : 0;
                return (
                  <tr key={record.id} className="border-t border-slate-100 text-sm">
                    <td className="px-6 py-4 font-medium capitalize text-ink">{record.month} 2024</td>
                    <td className="px-6 py-4 text-slate-600">{record.businessUnit}</td>
                    <td className="px-6 py-4 text-slate-600">{record.client}</td>
                    <td className="px-6 py-4 text-slate-600">{record.project}</td>
                    <td className="px-6 py-4 font-semibold text-ink">{formatCurrency(record.revenue)}</td>
                    <td className="px-6 py-4 text-slate-600">{formatCurrency(record.cost)}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${margin >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                        {margin.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

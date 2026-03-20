'use client';

import { BUSINESS_UNITS, MONTHS } from '@/lib/constants';
import { MonthKey } from '@/lib/types';

type FilterBarProps = {
  selectedMonth: MonthKey;
  selectedUnit: string;
  onMonthChange: (month: MonthKey) => void;
  onUnitChange: (unit: string) => void;
};

export function FilterBar({ selectedMonth, selectedUnit, onMonthChange, onUnitChange }: FilterBarProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:max-w-2xl">
      <label className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-soft">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Month</span>
        <select
          value={selectedMonth}
          onChange={(event) => onMonthChange(event.target.value as MonthKey)}
          className="w-full border-none bg-transparent text-sm font-medium text-ink outline-none"
        >
          {MONTHS.map((month) => (
            <option key={month.key} value={month.key}>
              {month.label}
            </option>
          ))}
        </select>
      </label>
      <label className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-soft">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Business Unit</span>
        <select
          value={selectedUnit}
          onChange={(event) => onUnitChange(event.target.value)}
          className="w-full border-none bg-transparent text-sm font-medium text-ink outline-none"
        >
          {BUSINESS_UNITS.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

import { MONTHS } from '@/lib/constants';
import { MonthKey } from '@/lib/types';

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCompactCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

export function getCurrentMonthKey(): MonthKey {
  return MONTHS[new Date().getMonth()].key;
}

export function isEditableMonth(month: MonthKey) {
  return MONTHS.find(({ key }) => key === month)!.index >= new Date().getMonth();
}

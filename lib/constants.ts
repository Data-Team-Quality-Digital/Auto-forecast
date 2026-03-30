import { MonthOption } from '@/lib/types';

export const MONTHS: MonthOption[] = [
  { key: 'jan', label: 'Jan', index: 0 },
  { key: 'feb', label: 'Feb', index: 1 },
  { key: 'mar', label: 'Mar', index: 2 },
  { key: 'apr', label: 'Apr', index: 3 },
  { key: 'may', label: 'May', index: 4 },
  { key: 'jun', label: 'Jun', index: 5 },
  { key: 'jul', label: 'Jul', index: 6 },
  { key: 'aug', label: 'Aug', index: 7 },
  { key: 'sep', label: 'Sep', index: 8 },
  { key: 'oct', label: 'Oct', index: 9 },
  { key: 'nov', label: 'Nov', index: 10 },
  { key: 'dec', label: 'Dec', index: 11 },
];

export const BUSINESS_UNITS = [
  'Global Operations',
  'Digital Solutions',
  'Cloud Infrastructure',
  'Strategy & Advisory',
];

// Rolling Forecast constants
export const RF_MONTHS = [
  { key: 'jan', label: 'jan/26', prevLabel: 'jan/25' },
  { key: 'fev', label: 'fev/26', prevLabel: 'fev/25' },
  { key: 'mar', label: 'mar/26', prevLabel: 'mar/25' },
  { key: 'abr', label: 'abr/26', prevLabel: 'abr/25' },
  { key: 'mai', label: 'mai/26', prevLabel: 'mai/25' },
  { key: 'jun', label: 'jun/26', prevLabel: 'jun/25' },
  { key: 'jul', label: 'jul/26', prevLabel: 'jul/25' },
  { key: 'ago', label: 'ago/26', prevLabel: 'ago/25' },
  { key: 'set', label: 'set/26', prevLabel: 'set/25' },
  { key: 'out', label: 'out/26', prevLabel: 'out/25' },
  { key: 'nov', label: 'nov/26', prevLabel: 'nov/25' },
  { key: 'dez', label: 'dez/26', prevLabel: 'dez/25' },
];

export const RF_BUS = ['4AT', 'DIG', 'ECOM', 'ECOM/DRV', 'GRCN', 'GRCT', 'GRO', 'IA', 'ITO', 'SIN', 'STRAT'];

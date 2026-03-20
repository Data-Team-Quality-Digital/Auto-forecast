export type MonthKey =
  | 'jan'
  | 'feb'
  | 'mar'
  | 'apr'
  | 'may'
  | 'jun'
  | 'jul'
  | 'aug'
  | 'sep'
  | 'oct'
  | 'nov'
  | 'dec';

export type MonthOption = {
  key: MonthKey;
  label: string;
  index: number;
};

export type KPI = {
  title: string;
  value: string;
  baseline: string;
  optimistic: string;
  delta: string;
  tone: 'success' | 'danger' | 'brand' | 'neutral';
};

export type TrendSeries = {
  label: string;
  color: string;
  values: number[];
};

export type DREMonthValue = {
  planned: number;
  actual: number;
};

export type DREClientRow = {
  client: string;
  classification: string;
  values: Record<MonthKey, DREMonthValue>;
};

export type DREGroup = {
  account: string;
  tone: 'success' | 'danger' | 'brand';
  rows: DREClientRow[];
};

export type InputRecord = {
  id: string;
  month: MonthKey;
  businessUnit: string;
  client: string;
  project: string;
  revenue: number;
  cost: number;
};

export type EmployeePlan = {
  employee: string;
  role: string;
  costCenter: string;
  unit: string;
  values: Record<MonthKey, number>;
};

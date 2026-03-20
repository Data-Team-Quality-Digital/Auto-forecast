import { BUSINESS_UNITS, MONTHS } from '@/lib/constants';
import { DREGroup, EmployeePlan, InputRecord, KPI, MonthKey, TrendSeries } from '@/lib/types';

const monthNumbers = [420, 480, 520, 590, 630, 670, 710, 760, 800, 850, 910, 980];

export const kpis: KPI[] = [
  {
    title: 'Revenue',
    value: '$4,852,000',
    baseline: '$4,600,000',
    optimistic: '$5,120,000',
    delta: '+5.4%',
    tone: 'success',
  },
  {
    title: 'Cost',
    value: '$2,140,500',
    baseline: '$2,000,000',
    optimistic: '$1,950,000',
    delta: '+7.0%',
    tone: 'danger',
  },
  {
    title: 'Margin',
    value: '55.8%',
    baseline: '56.5%',
    optimistic: '61.0%',
    delta: '-0.7%',
    tone: 'brand',
  },
  {
    title: 'People Cost',
    value: '$845,000',
    baseline: '$850,000',
    optimistic: '$820,000',
    delta: '-0.6%',
    tone: 'neutral',
  },
];

export const trendSeries: TrendSeries[] = [
  { label: 'Actual', color: '#312E81', values: [220, 205, 235, 260, 218, 280, 246, 266, 301, 312, 330, 352] },
  { label: 'Baseline', color: '#C7D2FE', values: [180, 212, 190, 248, 225, 251, 279, 286, 292, 305, 315, 340] },
  { label: 'Optimistic', color: '#93C5FD', values: [245, 226, 203, 271, 236, 264, 288, 309, 321, 336, 354, 371] },
];

function buildMonthValues(multiplier: number) {
  return MONTHS.reduce((acc, month, index) => {
    const planned = Math.round(monthNumbers[index] * multiplier * 1000);
    const actual = Math.round(planned * (0.93 + index * 0.005));
    acc[month.key] = { planned, actual };
    return acc;
  }, {} as Record<MonthKey, { planned: number; actual: number }>);
}

export const dreGroups: DREGroup[] = [
  {
    account: 'Operating Revenue',
    tone: 'success',
    rows: [
      { client: 'Apex Global', classification: 'SaaS Subscription', values: buildMonthValues(0.31) },
      { client: 'Orion Systems', classification: 'Professional Services', values: buildMonthValues(0.12) },
      { client: 'Helix Health', classification: 'Managed Services', values: buildMonthValues(0.18) },
    ],
  },
  {
    account: 'Direct Expenses',
    tone: 'danger',
    rows: [
      { client: 'Cloud Infrastructure', classification: 'AWS / Azure Hub', values: buildMonthValues(0.05) },
      { client: 'Delivery Team', classification: 'Partner Contractors', values: buildMonthValues(0.08) },
    ],
  },
];

export const dashboardInsights = [
  {
    title: 'Baseline alignment',
    description: 'Actuals are trending 5% above baseline. Re-evaluate forecast assumptions for Q3.',
  },
  {
    title: 'Optimistic gap',
    description: 'Infrastructure constraints are preventing attainment of optimistic revenue targets in EMEA.',
  },
];

export const regionalVariance = [
  { region: 'North America', baseline: '+$120k', optimistic: '+$40k' },
  { region: 'EMEA Region', baseline: '-$85k', optimistic: '-$210k' },
  { region: 'APAC Emerging', baseline: '+$30k', optimistic: '+$12k' },
];

export const inputRecords: InputRecord[] = [
  {
    id: '1',
    month: 'oct',
    businessUnit: 'Digital Solutions',
    client: 'Astra Corp',
    project: 'System Migration',
    revenue: 145000,
    cost: 92400,
  },
  {
    id: '2',
    month: 'oct',
    businessUnit: 'Strategy & Advisory',
    client: 'Vertex Inc',
    project: 'Q4 Roadmapping',
    revenue: 88500,
    cost: 42000,
  },
  {
    id: '3',
    month: 'nov',
    businessUnit: 'Digital Solutions',
    client: 'Lumina Tech',
    project: 'UI Refresh v2',
    revenue: 12200,
    cost: 14500,
  },
  {
    id: '4',
    month: 'dec',
    businessUnit: 'Cloud Infrastructure',
    client: 'Stellaris',
    project: 'Backend Scalability',
    revenue: 210000,
    cost: 165000,
  },
];

function buildEmployeeValues(base: number) {
  return MONTHS.reduce((acc, month, index) => {
    acc[month.key] = base + index * 300 + (index > 5 ? 600 : 0);
    return acc;
  }, {} as Record<MonthKey, number>);
}

export const employeePlans: EmployeePlan[] = [
  {
    employee: 'Jane Doe',
    role: 'Senior Architect',
    costCenter: '4020-DIG',
    unit: 'Digital Solutions',
    values: buildEmployeeValues(12500),
  },
  {
    employee: 'Marcus Smith',
    role: 'Lead Developer',
    costCenter: '4020-DIG',
    unit: 'Digital Solutions',
    values: buildEmployeeValues(9800),
  },
  {
    employee: 'Priya Raman',
    role: 'Cloud Engineer',
    costCenter: '1010-ITO',
    unit: 'Cloud Infrastructure',
    values: buildEmployeeValues(11100),
  },
];

export const defaultFilters = {
  month: 'mar' as MonthKey,
  businessUnit: BUSINESS_UNITS[0],
};

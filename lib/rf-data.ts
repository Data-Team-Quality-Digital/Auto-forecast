export type RFRow = {
  label: string;
  prevYear: number | null;
  orcado: number | null;
  realizado: number | null;
  varReal: number | null;
  isPercent?: boolean;
};

export type RFMonthData = {
  rows: RFRow[];
};

const makeRows = (
  rol: [number | null, number | null, number | null, number | null],
  ctotal: [number | null, number | null, number | null, number | null],
  pessoas: [number | null, number | null, number | null, number | null],
  fornec: [number | null, number | null, number | null, number | null],
  mb: [number | null, number | null, number | null, number | null],
  mbPct: [number | null, number | null, number | null, number | null],
  cindir: [number | null, number | null, number | null, number | null],
): RFRow[] => [
  { label: 'ROL (R$)', prevYear: rol[0], orcado: rol[1], realizado: rol[2], varReal: rol[3] },
  { label: 'C. Total (R$)', prevYear: ctotal[0], orcado: ctotal[1], realizado: ctotal[2], varReal: ctotal[3] },
  { label: 'Pessoas (R$)', prevYear: pessoas[0], orcado: pessoas[1], realizado: pessoas[2], varReal: pessoas[3] },
  { label: 'Fornec. (R$)', prevYear: fornec[0], orcado: fornec[1], realizado: fornec[2], varReal: fornec[3] },
  { label: 'MB (R$)', prevYear: mb[0], orcado: mb[1], realizado: mb[2], varReal: mb[3] },
  { label: 'MB (%)', prevYear: mbPct[0], orcado: mbPct[1], realizado: mbPct[2], varReal: mbPct[3], isPercent: true },
  { label: 'C. Indir./ROL', prevYear: cindir[0], orcado: cindir[1], realizado: cindir[2], varReal: cindir[3], isPercent: true },
];

// Q1
const janData = makeRows(
  [2846532, 860569, 265574, -594994],
  [1620806, 651395, 254306, -397089],
  [46528, 125214, 178331, 53117],
  [1574277, 526181, 75975, -450206],
  [1225726, 209173, 11268, -197906],
  [43.06, 24.31, 4.24, -20.06],
  [0, 0, 0, 0],
);

const fevData = makeRows(
  [2171544, 1326093, 22888, -1303205],
  [1184199, 791308, 26359, -764950],
  [51852, null, null, null],
  [1132347, 791308, 26359, -764950],
  [987346, 534784, -3471, -538255],
  [45.47, 40.33, -15.17, -55.49],
  [0, 0, 0, 0],
);

const marData = makeRows(
  [255044, 568930, null, null],
  [179620, 335331, 26222, -309109],
  [46617, null, 137090, 137090],
  [133003, 335331, 163312, -172019],
  [75424, 233599, -221192, -454791],
  [29.57, 41.06, 113.45, 72.39],
  [0, 0, 0, 0],
);

const totalQ1 = makeRows(
  [5273120, 2755591, 93492, -2662099],
  [2984624, 1778034, 306887, -1471148],
  [144997, 125214, 41241, -83973],
  [2839627, 1652820, 265646, -1387174],
  [2288496, 977556, -213395, -1190952],
  [43.40, 35.48, -228.25, -263.73],
  [0, 0, 0, 0],
);

// Q2
const abrData = makeRows(
  [2650000, 920000, 310000, -610000],
  [1500000, 700000, 280000, -420000],
  [52000, 130000, 160000, 30000],
  [1448000, 570000, 120000, -450000],
  [1150000, 220000, 30000, -190000],
  [43.40, 23.91, 9.68, -20.23],
  [0, 0, 0, 0],
);

const maiData = makeRows(
  [2200000, 1350000, 25000, -1325000],
  [1200000, 800000, 28000, -772000],
  [53000, null, null, null],
  [1147000, 800000, 28000, -772000],
  [1000000, 550000, -3000, -553000],
  [45.45, 40.74, -12.00, -52.74],
  [0, 0, 0, 0],
);

const junData = makeRows(
  [260000, 580000, null, null],
  [180000, 340000, 27000, -313000],
  [47000, null, 140000, 140000],
  [133000, 340000, 165000, -175000],
  [80000, 240000, -225000, -465000],
  [30.77, 41.38, 100.00, 58.62],
  [0, 0, 0, 0],
);

const totalQ2 = makeRows(
  [5110000, 2850000, 95000, -2755000],
  [2880000, 1840000, 335000, -1505000],
  [152000, 130000, 300000, 170000],
  [2728000, 1710000, 313000, -1397000],
  [2230000, 1010000, -198000, -1208000],
  [43.64, 35.44, -208.42, -243.86],
  [0, 0, 0, 0],
);

// Q3
const julData = makeRows(
  [2700000, 880000, 295000, -585000],
  [1560000, 670000, 265000, -405000],
  [50000, 128000, 172000, 44000],
  [1510000, 542000, 93000, -449000],
  [1140000, 210000, 30000, -180000],
  [42.22, 23.86, 10.17, -21.69],
  [0, 0, 0, 0],
);

const agoData = makeRows(
  [2100000, 1300000, 20000, -1280000],
  [1150000, 770000, 24000, -746000],
  [49000, null, null, null],
  [1101000, 770000, 24000, -746000],
  [950000, 530000, -4000, -534000],
  [45.24, 40.77, -20.00, -60.77],
  [0, 0, 0, 0],
);

const setData = makeRows(
  [250000, 555000, null, null],
  [175000, 325000, 25000, -300000],
  [44000, null, 135000, 135000],
  [131000, 325000, 160000, -165000],
  [75000, 230000, -218000, -448000],
  [30.00, 41.44, 100.00, 58.56],
  [0, 0, 0, 0],
);

const totalQ3 = makeRows(
  [5050000, 2735000, 90000, -2645000],
  [2885000, 1765000, 314000, -1451000],
  [143000, 128000, 307000, 179000],
  [2742000, 1637000, 277000, -1360000],
  [2165000, 970000, -192000, -1162000],
  [42.87, 35.47, -213.33, -248.80],
  [0, 0, 0, 0],
);

// Q4
const outData = makeRows(
  [269324, 787369, 32225, -755144],
  [1344, 477316, 99374, -377942],
  [51723, null, null, null],
  [-50379, 477316, 99374, -377942],
  [267979, 310053, -67149, -377202],
  [99.50, 39.38, -208.38, -247.76],
  [0, 0, 0, 0],
);

const novData = makeRows(
  [230951, 846944, 32225, -814719],
  [100774, 516040, 99703, -416336],
  [48498, null, null, null],
  [52276, 516040, 99703, -416336],
  [130177, 330904, -67478, -398382],
  [56.37, 39.07, -209.40, -248.47],
  [0, 0, 0, 0],
);

const dezData = makeRows(
  [266694, 1120285, 32225, -1088060],
  [309269, 693712, 99647, -594065],
  [50426, null, null, null],
  [258843, 693712, 99647, -594065],
  [-42575, 426573, -67422, -493995],
  [-15.96, 38.08, -209.22, -247.30],
  [0, 0, 0, 0],
);

const totalQ4 = makeRows(
  [766968, 2754597, 96675, -2657923],
  [411387, 1687068, 298724, -1388343],
  [150647, null, null, null],
  [260740, 1687068, 298724, -1388343],
  [355581, 1067530, -202050, -1269579],
  [46.36, 38.75, -209.00, -247.75],
  [0, 0, 0, 0],
);

export const RF_DATA: Record<string, RFRow[]> = {
  jan: janData,
  fev: fevData,
  mar: marData,
  abr: abrData,
  mai: maiData,
  jun: junData,
  jul: julData,
  ago: agoData,
  set: setData,
  out: outData,
  nov: novData,
  dez: dezData,
};

export const RF_TOTAL_DATA: Record<string, RFRow[]> = {
  // Q1 total (jan/fev/mar)
  jan: totalQ1,
  fev: totalQ1,
  mar: totalQ1,
  // Q2 total (abr/mai/jun)
  abr: totalQ2,
  mai: totalQ2,
  jun: totalQ2,
  // Q3 total (jul/ago/set)
  jul: totalQ3,
  ago: totalQ3,
  set: totalQ3,
  // Q4 total (out/nov/dez)
  out: totalQ4,
  nov: totalQ4,
  dez: totalQ4,
};

export function getQuarterMonths(selectedMonth: string): string[] {
  const quarters: Record<string, string[]> = {
    jan: ['jan', 'fev', 'mar'],
    fev: ['jan', 'fev', 'mar'],
    mar: ['jan', 'fev', 'mar'],
    abr: ['abr', 'mai', 'jun'],
    mai: ['abr', 'mai', 'jun'],
    jun: ['abr', 'mai', 'jun'],
    jul: ['jul', 'ago', 'set'],
    ago: ['jul', 'ago', 'set'],
    set: ['jul', 'ago', 'set'],
    out: ['out', 'nov', 'dez'],
    nov: ['out', 'nov', 'dez'],
    dez: ['out', 'nov', 'dez'],
  };
  return quarters[selectedMonth] ?? ['jan', 'fev', 'mar'];
}

export function formatBR(value: number | null, isPercent?: boolean): string {
  if (value === null) return '-';
  if (isPercent) {
    return value.toFixed(2).replace('.', ',') + '%';
  }
  return Math.abs(value).toLocaleString('pt-BR', { maximumFractionDigits: 0 });
}

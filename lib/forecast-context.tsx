'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { employeePlans, inputRecords } from '@/lib/mock-data';
import { EmployeePlan, InputRecord, MonthKey } from '@/lib/types';

export type ForecastContextValue = {
  records: InputRecord[];
  addRecord: (record: Omit<InputRecord, 'id'>) => void;
  employeeForecasts: EmployeePlan[];
  updateEmployeeValue: (employee: string, month: MonthKey, value: number) => void;
};

const ForecastContext = createContext<ForecastContextValue | null>(null);

export function ForecastProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<InputRecord[]>(inputRecords);
  const [employeeForecasts, setEmployeeForecasts] = useState<EmployeePlan[]>(employeePlans);

  const value = useMemo<ForecastContextValue>(
    () => ({
      records,
      addRecord: (record) => {
        setRecords((current) => [
          { ...record, id: `${Date.now()}-${current.length + 1}` },
          ...current,
        ]);
      },
      employeeForecasts,
      updateEmployeeValue: (employee, month, value) => {
        setEmployeeForecasts((current) =>
          current.map((plan) =>
            plan.employee === employee
              ? { ...plan, values: { ...plan.values, [month]: value } }
              : plan,
          ),
        );
      },
    }),
    [employeeForecasts, records],
  );

  return <ForecastContext.Provider value={value}>{children}</ForecastContext.Provider>;
}

export function useForecast() {
  const context = useContext(ForecastContext);

  if (!context) {
    throw new Error('useForecast must be used within ForecastProvider');
  }

  return context;
}

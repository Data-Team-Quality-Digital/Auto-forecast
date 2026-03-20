import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { ForecastProvider } from '@/lib/forecast-context';

export const metadata: Metadata = {
  title: 'Financial Architect',
  description: 'Production-ready SaaS financial planning interface built with Next.js App Router.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ForecastProvider>{children}</ForecastProvider>
      </body>
    </html>
  );
}

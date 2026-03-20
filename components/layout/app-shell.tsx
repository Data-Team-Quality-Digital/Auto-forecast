'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { BellIcon, DashboardIcon, InputIcon, PeopleIcon, RefreshIcon, TableIcon } from '@/components/ui/icons';
import { Button, ButtonLink } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
  { href: '/dre', label: 'DRE Grid', icon: TableIcon },
  { href: '/inputs', label: 'Additional Inputs', icon: InputIcon },
  { href: '/operational', label: 'Operational Planning', icon: PeopleIcon },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto min-h-screen max-w-[1500px] p-2 md:p-5">
      <div className="grid min-h-[calc(100vh-1rem)] grid-cols-1 overflow-hidden rounded-[32px] border border-white/10 bg-slate-100 shadow-soft lg:grid-cols-[270px_minmax(0,1fr)]">
        <aside className="flex flex-col border-r border-slate-200 bg-slate-50 px-6 py-7">
          <div>
            <p className="text-[2rem] font-bold leading-8 text-brand">Financial Architect</p>
            <p className="mt-2 text-xs uppercase tracking-[0.22em] text-slate-500">Enterprise Planning</p>
          </div>

          <nav className="mt-10 space-y-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all',
                    active
                      ? 'bg-white text-brand shadow-soft ring-1 ring-indigo-100'
                      : 'text-slate-500 hover:bg-white hover:text-ink',
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-4 pt-6">
            <Button className="w-full">New Scenario</Button>
            <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
              <div className="flex items-center justify-between">
                <span>Settings</span>
                <span>⚙️</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Support</span>
                <span>?</span>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-soft">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-semibold text-brand">MC</div>
              <div>
                <p className="text-sm font-semibold text-ink">Marcus Chen</p>
                <p className="text-xs text-muted">Senior Planner</p>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-col bg-[#F7F8FC]">
          <header className="flex flex-col gap-4 border-b border-slate-200 bg-white/85 px-6 py-4 backdrop-blur xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-indigo-50 px-3 py-2 font-semibold text-brand">Business Unit</span>
              <span className="rounded-full bg-slate-100 px-3 py-2 text-slate-600">Month Filter</span>
              <span className="rounded-full bg-slate-100 px-3 py-2 text-slate-600">Compare: Baseline vs Optimistic</span>
            </div>
            <div className="flex items-center gap-2 self-end xl:self-auto">
              <Button variant="ghost" aria-label="Notifications"><BellIcon className="h-5 w-5" /></Button>
              <Button variant="ghost" aria-label="Refresh"><RefreshIcon className="h-5 w-5" /></Button>
              <Button variant="secondary">Save</Button>
              <ButtonLink href="/dashboard">Export</ButtonLink>
            </div>
          </header>
          <main className="flex-1 overflow-auto px-6 py-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

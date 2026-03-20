import Link from 'next/link';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  asChild?: false;
  children: ReactNode;
};

export function Button({ className, variant = 'primary', children, ...props }: ButtonProps) {
  const styles = {
    primary: 'bg-brand text-white hover:bg-indigo-900',
    secondary: 'border border-line bg-white text-ink hover:bg-slate-50',
    ghost: 'text-muted hover:bg-slate-100',
  }[variant];

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-colors',
        styles,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({ href, children, className, variant = 'primary' }: { href: string; children: ReactNode; className?: string; variant?: 'primary' | 'secondary' | 'ghost' }) {
  const styles = {
    primary: 'bg-brand text-white hover:bg-indigo-900',
    secondary: 'border border-line bg-white text-ink hover:bg-slate-50',
    ghost: 'text-muted hover:bg-slate-100',
  }[variant];

  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-colors',
        styles,
        className,
      )}
    >
      {children}
    </Link>
  );
}

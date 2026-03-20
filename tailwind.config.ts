import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#101828',
        muted: '#667085',
        panel: '#F8FAFC',
        line: '#E4E7EC',
        brand: '#312E81',
        accent: '#2563EB',
        success: '#16A34A',
        danger: '#DC2626',
      },
      boxShadow: {
        soft: '0 20px 40px -24px rgba(15, 23, 42, 0.35)',
      },
      backgroundImage: {
        grid: 'radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.18) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
};

export default config;

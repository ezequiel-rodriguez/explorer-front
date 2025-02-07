import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gray-700': 'var(--gray-700)',
        'gray-500': 'var(--gray-500)',
        'gray-600': 'var(--gray-600)',

        'brand-purple': 'var(--brand-purple)',
        'brand-green': 'var(--brand-green)',
        'brand-pink': 'var(--brand-pink)',
        'brand-pink-dark': 'var(--brand-pink-dark)',
        'brand-orange': 'var(--brand-orange)',
        'brand-cyan': 'var(--brand-cyan)',
        'brand-yellow': 'var(--brand-yellow)',
        'brand-lime': 'var(--brand-lime)',
        'brand-red': 'var(--brand-red)',

        'white-100': 'var(--white-100)',
        'white-400': 'var(--white-400)',
        success: 'var(--success)',

        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      backgroundColor: {
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        'btn-secondary': 'var(--btn-secondary)',
        success: 'var(--bg-success)',
        fail: 'var(--bg-fail)',
        pending: 'var(--bg-pending)',
      },
      textColor: {
        success: 'var(--text-success)',
        fail: 'var(--text-fail)',
        pending: 'var(--text-pending)',
      },
      height: {
        '25': '100px',
        '13': '52px',
        '50': '200px',
      },
      boxShadow: {
        line: 'inset 0 -1px 0 0 #3a3a3a',
      },
      borderColor: {
        line: 'var(--border)',
      },
    },
  },
  plugins: [],
} satisfies Config;

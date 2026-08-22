import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-outfit)', 'Outfit', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        arabic: ['var(--font-bukra)', '29LT Bukra', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
        heading: ['var(--font-outfit)', 'Outfit', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        canvas: 'var(--canvas)',

        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          alt: 'var(--primary-alt)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          alt: 'var(--accent-alt)',
          foreground: 'var(--accent-foreground)',
          soft: 'var(--accent-soft)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
          soft: 'var(--destructive-soft)',
        },
        success: {
          DEFAULT: 'var(--success)',
          foreground: 'var(--success-foreground)',
          soft: 'var(--success-soft)',
          money: '#00b894',
        },
        warning: {
          DEFAULT: 'var(--warning)',
          foreground: 'var(--warning-foreground)',
          soft: 'var(--warning-soft)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          deep: 'var(--ink-deep)',
        },
        border: {
          DEFAULT: 'var(--border)',
          subtle: 'var(--border-subtle)',
        },
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        card: 'var(--radius-card)',
        xl: 'var(--radius-xl)',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 4px 14px rgba(7, 107, 154, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)',
        topbar: '0 4px 20px rgba(7, 18, 33, 0.18)',
        floating: '0 2px 10px rgba(6, 182, 212, 0.20)',
        ticket: '0 30px 45px rgba(3, 15, 29, 0.45), 0 4px 12px rgba(3, 15, 29, 0.30)',
      },
      backgroundImage: {
        'gradient-sunset': 'linear-gradient(135deg, #f43f5e 0%, #f97316 50%, #facc15 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #076b9a 0%, #06b6d4 50%, #2dd4bf 100%)',
        'gradient-ocean-dark': 'linear-gradient(135deg, #071221 0%, #075985 60%, #06b6d4 100%)',
        'gradient-horizon': 'linear-gradient(180deg, #0d1e34 0%, #071221 100%)',
      },
      keyframes: {
        'hi-rise': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'hi-float-ticket': {
          '0%, 100%': { transform: 'rotate(2.5deg) translateY(0)' },
          '50%': { transform: 'rotate(2.5deg) translateY(-8px)' },
        },
        'hi-stamp-in': {
          '0%': { opacity: '0', transform: 'rotate(-10deg) scale(1.9)' },
          '60%': { opacity: '1', transform: 'rotate(-10deg) scale(0.94)' },
          '100%': { opacity: '1', transform: 'rotate(-10deg) scale(1)' },
        },
        'hi-ticker-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'hi-rise': 'hi-rise 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both',
        'hi-float': 'hi-float-ticket 8s ease-in-out infinite',
        'hi-stamp': 'hi-stamp-in 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) 1.2s both',
        'hi-ticker': 'hi-ticker-scroll 120s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;

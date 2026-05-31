import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#050507',
          900: '#0A0A0F',
          800: '#101018',
          700: '#16161F',
          600: '#1E1E2A',
          500: '#2A2A38',
        },
        brand: {
          blue:   '#1F8BF5',
          teal:   '#0FC2C0',
          green:  '#4FD15A',
          lime:   '#B6DA3D',
          yellow: '#F5C518',
          orange: '#F58D2A',
          red:    '#EE4D3F',
        },
        fg: {
          DEFAULT: '#E8E8EE',
          muted:   '#9AA0AE',
          subtle:  '#5E6472',
          faint:   '#3A3F4C',
        },
      },
      fontFamily: {
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space)', 'var(--font-inter)', 'sans-serif'],
        mono:    ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'gradient-brand':
          'linear-gradient(90deg, #1F8BF5 0%, #0FC2C0 22%, #4FD15A 42%, #F5C518 62%, #F58D2A 82%, #EE4D3F 100%)',
        'gradient-brand-soft':
          'linear-gradient(90deg, rgba(31,139,245,0.85) 0%, rgba(15,194,192,0.85) 22%, rgba(79,209,90,0.85) 42%, rgba(245,197,24,0.85) 62%, rgba(245,141,42,0.85) 82%, rgba(238,77,63,0.85) 100%)',
        'radial-fade':
          'radial-gradient(ellipse at top, rgba(31,139,245,0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(238,77,63,0.10) 0%, transparent 60%)',
        'grid-faint':
          'linear-gradient(rgba(232,232,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(232,232,238,0.04) 1px, transparent 1px)',
      },
      animation: {
        'gradient-x':       'gradient-x 8s ease infinite',
        'float':            'float 6s ease-in-out infinite',
        'pulse-glow':       'pulse-glow 3s ease-in-out infinite',
        'fade-up':          'fade-up 0.8s ease-out forwards',
        'shimmer':          'shimmer 2.5s linear infinite',
        'orbit-slow':       'orbit 20s linear infinite',
        'blink':            'blink 1s steps(2) infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%':       { 'background-position': '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':       { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%':       { opacity: '1', transform: 'scale(1.05)' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { 'background-position': '-200% 0' },
          '100%': { 'background-position': '200% 0' },
        },
        orbit: {
          '0%':   { transform: 'rotate(0deg) translateX(60px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(60px) rotate(-360deg)' },
        },
        blink: {
          '50%': { opacity: '0' },
        },
      },
      boxShadow: {
        'glow-blue':  '0 0 40px rgba(31,139,245,0.35)',
        'glow-brand': '0 0 60px rgba(15,194,192,0.25), 0 0 30px rgba(238,77,63,0.20)',
      },
    },
  },
  plugins: [],
};

export default config;

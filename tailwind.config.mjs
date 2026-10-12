/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Фон / поверхности
        canvas: {
          50:  '#FAFBFE',
          100: '#F4F6FB',
          200: '#E8ECF4',
          300: '#D0D7E5',
        },
        // Текст
        ink: {
          300: '#B4BDD0',
          400: '#8892A6',
          500: '#5A6580',
          600: '#3D4762',
          700: '#232C42',
          800: '#141B2E',
          900: '#0A0F1E',
          950: '#050810',
        },
        // Электрик-синий — основной бренд
        volt: {
          50:  '#EBF1FF',
          100: '#D6E3FF',
          200: '#ADC7FF',
          300: '#85AAFF',
          400: '#3D7EFF',
          500: '#0B5FFF',
          600: '#0047CC',
          700: '#0038A3',
          800: '#002A7A',
          900: '#001D52',
        },
        // Циан — неон / свечение
        cyan: {
          50:  '#E6FBFF',
          400: '#33E0FF',
          500: '#00D4FF',
          600: '#00A8CC',
        },
        // Spark — тёплый акцент (использовать точечно!)
        spark: {
          50:  '#FFF8EB',
          400: '#FFC24D',
          500: '#FFB020',
          600: '#E59400',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        '8xl': ['6rem',   { lineHeight: '1',    letterSpacing: '-0.03em' }],
      },
      boxShadow: {
        'soft':        '0 1px 2px 0 rgb(10 15 30 / 0.04), 0 4px 12px -2px rgb(10 15 30 / 0.06)',
        'card':        '0 1px 3px 0 rgb(10 15 30 / 0.04), 0 10px 30px -6px rgb(10 15 30 / 0.08)',
        'card-hover':  '0 2px 6px 0 rgb(10 15 30 / 0.06), 0 20px 45px -12px rgb(11 95 255 / 0.18)',
        'glow':        '0 0 0 1px rgb(11 95 255 / 0.08), 0 8px 24px -6px rgb(11 95 255 / 0.35)',
        'spark':       '0 8px 24px -6px rgb(255 176 32 / 0.45)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float':      'float 6s ease-in-out infinite',
        'marquee':    'marquee 40s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

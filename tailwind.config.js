/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme.js';
import animate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '2rem',
        lg: '3rem',
        xl: '4rem',
      },
      screens: { '2xl': '1440px' },
    },
    extend: {
      colors: {
        bg: {
          0: '#050505',
          1: '#0D0D0D',
          2: '#151515',
          3: '#1E1E1E',
        },
        gold: {
          DEFAULT: '#D4AF37',
          50:  '#FBF6E6',
          100: '#F6EDC8',
          200: '#EEDC8D',
          300: '#E6CA56',
          400: '#DDBB3A',
          500: '#D4AF37',
          600: '#B8860B',
          700: '#8E6600',
          800: '#6B4E00',
          900: '#4C3600',
        },
        bronze: '#B8860B',
        soft: '#DADADA',
        muted: '#8A8A8A',
        ink: '#0A0A0A',
      },
      fontFamily: {
        display: ['var(--font-space)', 'Space Grotesk', ...defaultTheme.fontFamily.sans],
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
      },
      letterSpacing: {
        wider: '0.12em',
        widest: '0.25em',
      },
      boxShadow: {
        'gold-glow': '0 0 40px -8px rgba(212, 175, 55, 0.45)',
        'gold-glow-lg': '0 0 80px -12px rgba(212, 175, 55, 0.55)',
        'card': '0 10px 40px -18px rgba(0, 0, 0, 0.8)',
        'deep': '0 30px 80px -30px rgba(0, 0, 0, 0.9)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
        'gold-gradient-radial': 'radial-gradient(ellipse at top, rgba(212,175,55,0.22), transparent 60%)',
        'hero-fade': 'linear-gradient(180deg, #050505 0%, #0D0805 55%, #0B0B0B 100%)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      animation: {
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [animate],
};

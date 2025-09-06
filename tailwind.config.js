/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        'eco-green': '#237A57',
        'eco-accent': '#FFD166',
        'eco-terra': '#DFA47F',
        'eco-bg': '#FAFBF9',
        'eco-text': '#1F2937',
        'eco-light': '#E8F6EF',
        'eco-gradient-start': '#E8F6EF',
        'eco-gradient-end': '#F2F8F4'
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Inter', 'system-ui', 'sans-serif']
      },
      fontWeight: {
        'light': '300',
        'normal': '400',
        'medium': '450',
        'semibold': '500',
        'bold': '600',
        'extrabold': '700'
      },
      borderRadius: {
        'card': 'var(--card-radius)',
        'xs': '3px',
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px'
      },
      spacing: {
        'container': 'clamp(12px, 3vw, 32px)',
        'grid-gap': 'clamp(12px, 2vw, 24px)'
      },
      animation: {
        'count-up': 'countUp 2s ease-out',
        'leaf-grow': 'leafGrow 3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'slide-fade-up': 'slideFadeUp 480ms var(--delay, 0ms) both'
      },
      keyframes: {
        countUp: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        leafGrow: {
          '0%': { transform: 'scale(0) rotate(-10deg)', opacity: '0' },
          '50%': { transform: 'scale(1.1) rotate(5deg)', opacity: '0.8' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        },
        slideFadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      backdropBlur: {
        'xs': '2px'
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'eco': '0 4px 20px 0 rgba(35, 122, 87, 0.15)',
        'lift': '0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      },
      transitionTimingFunction: {
        'eco': 'cubic-bezier(0.2, 0.9, 0.3, 1)'
      }
    },
  },
  plugins: [],
}

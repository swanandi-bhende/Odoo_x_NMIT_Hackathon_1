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
        'terracotta': '#DFA47F',
        'mustard': '#FFD166',
        'neutral-bg': '#FAFBF9'
      },
      borderRadius: {
        'card': 'var(--card-radius, 6px)'
      },
      spacing: {
        'sidebar': 'var(--sidebar-width, 260px)',
        'sidebar-collapsed': 'var(--sidebar-width-collapsed, 72px)',
      },
      animation: {
        'slide-fade-up': 'slideFadeUp 480ms ease-out forwards',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite'
      },
      keyframes: {
        slideFadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' }
        }
      },
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(220px, 1fr))'
      }
    },
  },
  plugins: [],
};

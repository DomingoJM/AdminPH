/** Tailwind theme tuned to the provided palette */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F4C81', // Azul Zafiro
          50: '#F0F6FA',
          100: '#DCEAF4',
          500: '#0F4C81',
          600: '#0C3D67',
          900: '#051E33'
        },
        secondary: {
          DEFAULT: '#FF6B35', // Naranja Coral
          50: '#FFF4F0',
          500: '#FF6B35',
          600: '#E55825'
        },
        accent: {
          DEFAULT: '#00A86B', // Verde Esmeralda
          50: '#F0FAF5',
          500: '#00A86B',
          600: '#008C59'
        },
        surface: '#FFFFFF',
        background: '#F8FAFC',
        text: {
          DEFAULT: '#1E293B',
          muted: '#64748B'
        }
      },
      borderRadius: {
        'md': '12px',
        'lg': '16px',
      },
    },
  },
  plugins: [],
}

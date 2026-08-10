/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          light: 'var(--color-primary-light)'
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          light: 'var(--color-accent-light)'
        },
        surface: 'var(--color-surface)',
        ink: 'var(--color-text)'
      },
      fontFamily: {
        sans: [
          'Poppins',
          'Noto Sans Devanagari',
          'ui-sans-serif',
          'system-ui',
          'sans-serif'
        ]
      },
      borderRadius: {
        card: '1rem'
      },
      boxShadow: {
        card: '0 2px 10px rgba(9, 37, 66, 0.08)',
        'card-hover': '0 8px 24px rgba(9, 37, 66, 0.14)'
      }
    }
  },
  plugins: []
};

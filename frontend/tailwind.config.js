/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deepblue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          500: '#3b82f6',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1E3A8A', // Primary Deep Blue
          950: '#172554',
        },
        brandorange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          500: '#F97316', // Accent Orange
          600: '#ea580c',
          700: '#c2410c',
        },
        bglight: '#F8FAFC', // Light Gray Background
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'saas-sm': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)',
        'saas-md': '0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.07)',
        'saas-lg': '0 10px 25px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.05)',
        'saas-hover': '0 20px 30px -10px rgba(30, 58, 138, 0.12)',
      }
    },
  },
  plugins: [],
}

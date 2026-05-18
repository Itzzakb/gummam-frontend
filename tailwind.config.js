/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        heading: ['"Merriweather Sans"', 'sans-serif'],
      },
      colors: {
        primary: {
          blue: 'var(--color-primary-blue)',
          red: 'var(--color-primary-red)',
          orange: 'var(--color-primary-orange)',
        },
        dark: 'var(--color-text-dark)',
        light: 'var(--color-bg-light)',
      }
    },
  },
  plugins: [],
}

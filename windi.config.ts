import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      colors: {
        primary: '#FBBF24',
        secondary: '',
        tertiary: '',
        'primary-alt': '#D1D5DB',
        'secondary-alt': '',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1366px',
      },
    }
  }
})
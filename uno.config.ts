import { defineConfig, presetUno, transformerDirectives } from 'unocss';

export default defineConfig({
  theme: {
    colors: {
      primary: '#FBBF24',
      secondary: '',
      tertiary: '',
      'primary-alt': '#D1D5DB',
      'secondary-alt': '',
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1366px',
    },
  },
  presets: [presetUno()],
  transformers: [transformerDirectives()],
});

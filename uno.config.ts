import {
  defineConfig,
  presetUno,
  presetAttributify,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  presets: [presetUno(), presetAttributify()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
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
  shortcuts: {
    btn: 'w-full text-center py-4 inline-block text-sm border-transparent rounded-md bg-yellow-300 transition ease cursor-pointer hover:bg-yellow-500 active:bg-yellow-500',
    'btn--outline':
      'flex justify-center border !bg-transparent rounded-md border-yellow-400 text-yellow-500 hover:(!bg-yellow-500 !border-transparent !text-white)',
    'header-actions': 'flex items-center justify-between md:justify-end',
    'header-actions__link': 'flex relative transition ease',
    'header-actions__icon': 'text-4xl',
    'header-actions__indicator-wrapper':
      'absolute bottom-2 -right-[6px] flex justify-center items-center w-[20px] h-[20px] text-white bg-dark-300 rounded-full',
    'header-actions__indicator': 'text-xs leading-4 font-medium not-italic',

    'input-group': 'py-3 pt-2 first:mb-4',
    'input-error': 'border-red-500',
    'auth-form__wrapper': 'bg-white p-6 max-w-[26rem] mx-auto mb-4',
    'auth-form__title': 'text-base mb-4 text-yellow-500',
    'auth-form__footer': 'py-3 mb-4 mt-2',
    form__group: 'mb-4 md:mb-10',
    'form__btn-group': 'mb-0 md:(mb-10 w-[25%])',
    form__label: 'mb-6 text-dark-800',
    form__required: 'ml-1 text-red-500',

    // Block
    'b-header': 'text-center pb-16 md:pb-[6.25rem]',
    'b-title': 'text-3xl font-semibold text-yellow-400 md:text-5xl',
    'b-content': 'flex flex-col gap-8 lg:flex-row',
    'b-left': 'flex-[0_0_100%] md:flex-[0_0_65%]',
    'b-right': 'flex-[0_0_100%] md:flex-[0_0_35%]',
    'b-subtitle': 'text-lg text-yellow-400 mt-0 mb-6 font-bold md:mb-3',
    'b-link-wrapper': 'flex justify-between items-center',
  },
});

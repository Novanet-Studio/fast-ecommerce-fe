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
      color: {
        1: '#feeed7',
        2: '#e36d65',
        3: '#f4f4f4',
        4: '#282932',
        5: '#161824',
        6: '#0c6dce',
        7: '#c0c0c0',
      },
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
    'border-color-1': 'border-[#feeed7]',
    'border-color-2': 'border-[#e36d65]',
    'border-color-3': 'border-[#f4f4f4]',
    'border-color-4': 'border-[#282932]',
    'border-color-5': 'border-[#161824]',
    'border-color-6': 'border-[#0c6dce]',
    'border-color-7': 'border-[#c0c0c0]',
    btn: 'w-full text-center text-color-2 font-bold py-4 inline-block text-sm border-transparent rounded-md bg-color-1 transition ease cursor-pointer hover:(bg-opacity-80) active:( bg-opacity-80)',
    'btn--outline':
      'flex justify-center border !bg-transparent rounded-md border-color-2 text-color-2 hover:(!bg-color-2 !border-transparent !text-white)',
    'header-actions': 'flex items-center justify-between',
    'header-actions__link': 'flex relative transition ease',
    'header-actions__icon': 'text-4xl text-[2.45rem]',
    'header-actions__indicator-wrapper':
      'absolute bottom-0 -right-[3px] flex justify-center items-center w-[20px] h-[20px] text-white bg-color-2 rounded-full',
    'header-actions__indicator': 'text-xs leading-4 font-medium not-italic',

    'input-group': 'py-3 pt-2 first:mb-4',
    'input-error': 'border-red-500',
    'auth-form__wrapper': 'bg-white p-6 max-w-[26rem] mx-auto mb-4',
    'auth-form__title': 'text-base mb-4 text-color-2',
    'auth-form__footer': 'py-3 mb-4 mt-2',
    form__group: 'mb-4 md:mb-10',
    'form__btn-group': 'mb-0 md:(mb-10 w-[25%])',
    form__label: 'mb-6 text-dark-800',
    form__required: 'ml-1 text-red-500',

    // Block
    'b-header': 'text-center pb-16 md:pb-[6.25rem]',
    'b-title': 'text-3xl font-semibold text-color-2 md:text-5xl',
    'b-content': 'flex flex-col gap-8 lg:(flex-row mx-32)',
    'b-left': 'flex-[0_0_100%] md:flex-[0_0_65%]',
    'b-right': 'flex-[0_0_100%] md:flex-[0_0_35%]',
    'b-subtitle': 'text-lg text-color-2 mt-0 mb-6 font-bold md:mb-3',
    'b-link-wrapper': 'flex justify-between items-center',
  },
});

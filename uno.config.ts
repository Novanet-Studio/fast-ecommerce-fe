import {
  defineConfig,
  presetUno,
  presetAttributify,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import presetIcons from '@unocss/preset-icons';
import * as theme from './config/theme.json';

let fontPrimary, fontPrimaryType, fontSecondary, fontSecondaryType;
let fontBase = Number(theme.fonts.font_size.base.replace('px', ''));
let fontScale = Number(theme.fonts.font_size.scale);

let h6 = fontBase / fontBase;
let h5 = h6 * fontScale;
let h4 = h5 * fontScale;
let h3 = h4 * fontScale;
let h2 = h3 * fontScale;
let h1 = h2 * fontScale;

if (theme.fonts.font_family.primary) {
  fontPrimary = theme.fonts.font_family.primary
    .replace(/\+/g, ' ')
    .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, '');
  fontPrimaryType = theme.fonts.font_family.primary_type;
}
if (theme.fonts.font_family.secondary) {
  fontSecondary = theme.fonts.font_family.secondary
    .replace(/\+/g, ' ')
    .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, '');
  fontSecondaryType = theme.fonts.font_family.secondary_type;
}

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetIcons()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      color: {
        1: theme.colors.default.theme_color.color_1,
        2: theme.colors.default.theme_color.color_2,
        3: theme.colors.default.theme_color.color_3,
        4: theme.colors.default.theme_color.color_4,
        5: theme.colors.default.theme_color.color_5,
        6: theme.colors.default.theme_color.color_6,
        7: theme.colors.default.theme_color.color_7,
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
  preflights: [
    {
      getCSS: () => `
        html {
          font-size: ${fontBase}px;
        }

        h1 {
          font-size: ${h1}rem;
        }

        h2 {
          font-size: ${h2}rem;
        }

        h3 {
          font-size: ${h3}rem;
        }

        h4 {
          font-size: ${h4}rem;
        }

        h5 {
          font-size: ${h5}rem;
        }

        h6 {
          font-size: ${h6}rem;
        }
      `,
    },
  ],
});

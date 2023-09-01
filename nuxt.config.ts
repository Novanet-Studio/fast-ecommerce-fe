import gql from '@rollup/plugin-graphql';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  app: {
    head: {
      titleTemplate: (title) => `${title} - TeM`,
      htmlAttrs: {
        lang: 'es',
      },
      script: [
        {
          type: 'module',
          src: 'https://sandbox.web.squarecdn.com/v1/square.js',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'page' },
  },

  modules: [
    'nuxt-swiper',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/strapi',
    '@unocss/nuxt',
    '@kevinmarrec/nuxt-pwa',
    '@nuxt/image-edge',
    '@sidebase/nuxt-pdf',
  ],

  css: ['@unocss/reset/tailwind.css'],

  pinia: {
    autoImports: ['defineStore'],
  },

  imports: {
    dirs: ['stores'],
  },

  runtimeConfig: {
    sengrid: {
      apiKey: process.env.SENDGRID_API_KEY,
      senderEmail: process.env.SENDGRID_SENDER_MAIL,
      receiverEmail: process.env.SENDGRID_RECEIVER_MAIL,
    },
    square: {
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
    },
    public: {
      square: {
        applicationId: process.env.SQUARE_APPLICATION_ID,
        locationId: process.env.SQUARE_LOCATION_ID,
      },
      paypal: {
        clientId: process.env.PAYPAL_CLIENT_ID,
      },
    },
  },

  pwa: {
    meta: {
      title: 'Tienda en mano',
      name: 'Tienda en mano Aplicación web',
      author: 'Novanet Studio <info@novanet.studio>',
      description: 'Tienda en online para vender tus productos online',
      theme_color: '#fcd34d',
      lang: 'es',
    },
    manifest: {
      name: 'Tienda en mano Aplicación web',
      short_name: 'Tienda en mano',
      description: 'Tienda en online para vender tus productos online',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#fcd34d',
    },
    icon: { source: 'static/favicon.png' },
    /*workbox: {
      enabled: true,
    },*/
  },

  image: {
    // The screen sizes predefined by `@nuxt/image`:
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536,
    },
  },

  vite: {
    plugins: [gql()],
  },

  nitro: {
    preset: 'netlify-edge',
  },
});

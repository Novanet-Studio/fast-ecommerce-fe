// import { defineNuxtConfig } from 'nuxt';
import { resolve } from 'path';
import gql from '@rollup/plugin-graphql';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          type: 'module',
          src: 'https://sandbox.web.squarecdn.com/v1/square.js',
        },
      ],
    },
  },
  modules: [
    // Modules
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/strapi',
    'nuxt-windicss',
    '@kevinmarrec/nuxt-pwa',
    '@nuxt/image-edge',

    // Custom
    '~/modules/shared/module',
    '~/modules/product/module',
    '~/modules/auth/module',
    '~/modules/addresses/module',
    '~/modules/checkout/module',
    '~/modules/shipping/module',
    '~/modules/shopping-cart/module',
    '~/modules/wishlist/module',
    '~/modules/invoices/module',
    '~/modules/payment/module',
  ],

  css: [
    'virtual:windi.css',
    'virtual:windi-devtools',
    '~/static/fontawesome/css/fontawesome.css',
    '~/static/fontawesome/css/brands.css',
    '~/static/fontawesome/css/regular.css',
    '~/static/fontawesome/css/solid.css',
    '~/static/Linearicons/Font/demo-files/demo.css',
  ],

  dir: {
    assets: resolve(__dirname, './modules/shared/assets'),
  },

  runtimeConfig: {
    public: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_KEY_AUTH_DOMAIN,
      FIREBASE_DATABASE_URL: process.env.FIREBASE_KEY_DATABASE_URL,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_ID: process.env.FIREBASE_ID,
      FIREBASE_MEASURENT_ID: process.env.FIREBASE_MEASURENT_ID,
      SQUARE_APPLICATION_ID: process.env.SQUARE_APPLICATION_ID,
      SQUARE_LOCATION_ID: process.env.SQUARE_LOCATION_ID,
      PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    },
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ['nuxt-windicss', resolve(__dirname, './types/app.d.ts')],
      },
    },
  },

  vite: {
    plugins: [gql()],
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
    dir: "modules/shared/assets/img",
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/novanet-studio/image/upload/',
    },
  },
});

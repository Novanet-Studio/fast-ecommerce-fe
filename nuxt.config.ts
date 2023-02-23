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

  build: {
    transpile: [
      '@fortawesome/vue-fontawesome',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/free-brands-svg-icons',
    ],
  },

  modules: [
    // Modules
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/strapi',
    'nuxt-windicss',
    '@kevinmarrec/nuxt-pwa',
    '@nuxt/image-edge',
    '@sidebase/nuxt-pdf',
    'nuxt-lodash',
  ],

  css: [
    'virtual:windi.css',
    'virtual:windi-devtools',
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/static/Linearicons/Font/demo-files/demo.css',
    '~/assets/styles/index.css',
    '~/assets/styles/components.css',
    '~/assets/styles/pages.css',
  ],

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
        types: ['nuxt-windicss'],
      },
    },
  },

  vite: {
    plugins: [gql()],
  },

  lodash: {
    prefix: '_',
    upperAfterPrefix: false,
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
    dir: 'assets/img',
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
});

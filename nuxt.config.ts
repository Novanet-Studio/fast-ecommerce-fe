import { defineNuxtConfig } from 'nuxt';
import { resolve } from 'path';
import gql from '@rollup/plugin-graphql';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    // Modules
    '@nuxtjs/strapi',

    // Custom
    '~/modules/shared/module',
    '~/modules/home/module',
    '~/modules/product/module',
    '~/modules/auth/module',
    '~/modules/addresses/module',
    '~/modules/checkout/module',
    '~/modules/shipping/module',
    '~/modules/shopping-cart/module',
    '~/modules/wishlist/module',
    // '~/modules/compare/module',
    // '~/modules/edit-compare/module',
  ],

  dir: {
    assets: resolve(__dirname, './modules/shared/assets'),
    public: resolve(__dirname, './modules/shared/public'),
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
    },
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        types: [resolve(__dirname, './types/app.d.ts')],
      },
    },
  },

  vite: {
    plugins: [gql()],
  },
});

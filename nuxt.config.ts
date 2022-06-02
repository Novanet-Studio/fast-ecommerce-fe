import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['~/modules/product/module', '~/modules/shared/module'],

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
});

import path from 'path';
import { defineNuxtModule, extendPages, addComponentsDir } from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'payment-module',
    configKey: 'payment-module',
  },
  setup() {
    addComponentsDir({
      path: path.resolve(__dirname, './components'),
    });

    extendPages((pages) => {
      pages.push({
        path: '/payment',
        file: path.resolve(__dirname, './pages/Payment.vue'),
      });
    });
  },
});

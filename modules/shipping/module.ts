import path from 'path';
import { defineNuxtModule, extendPages, addComponentsDir } from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'shipping-module',
    configKey: 'shipping-module',
  },
  setup() {
    addComponentsDir({
      path: path.resolve(__dirname, './components'),
    });

    extendPages((pages) => {
      pages.push({
        path: '/shipping',
        file: path.resolve(__dirname, './pages/Shipping.vue'),
      });
    });
  },
});

import path from 'path';
import { defineNuxtModule, extendPages, addComponentsDir } from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'shopping-cart-module',
    configKey: 'shopping-cart-module',
  },
  setup() {
    addComponentsDir({
      path: path.resolve(__dirname, './components'),
    });

    extendPages((pages) => {
      pages.push({
        path: '/shopping-cart',
        file: path.resolve(__dirname, './pages/ShoppingCart.vue'),
      });
    });
  },
});

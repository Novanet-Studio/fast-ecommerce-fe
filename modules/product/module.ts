import path from 'path';
import { defineNuxtModule, extendPages, addComponentsDir } from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'product-module',
    configKey: 'product-module',
  },
  setup() {
    addComponentsDir({
      path: path.resolve(__dirname, './components'),
    });

    extendPages((pages) => {
      pages.push({
        name: 'Product',
        path: '/product',
        file: path.resolve(__dirname, './pages/Product.vue'),
        children: [
          {
            path: ':id',
            file: path.resolve(__dirname, './pages/_id.vue'),
          },
        ],
      });
    });
  },
});

import {
  defineNuxtModule,
  extendPages,
  addComponentsDir,
  createResolver,
} from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'shopping-cart-module',
    configKey: 'shopping-cart-module',
  },
  setup() {
    const { resolve } = createResolver(import.meta.url);

    addComponentsDir({
      path: resolve('./components'),
    });

    extendPages((pages) => {
      pages.push({
        path: '/shopping-cart',
        file: resolve('./pages/ShoppingCart.vue'),
      });
    });
  },
});

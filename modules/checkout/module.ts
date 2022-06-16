import {
  defineNuxtModule,
  extendPages,
  addComponentsDir,
  createResolver,
} from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'checkout-module',
    configKey: 'checkout-module',
  },
  setup() {
    const { resolve } = createResolver(import.meta.url);

    addComponentsDir({
      path: resolve('./components'),
    });

    extendPages((pages) => {
      pages.push({
        path: '/checkout',
        file: resolve('./pages/Checkout.vue'),
      });
    });
  },
});

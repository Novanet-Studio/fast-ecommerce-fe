import {
  defineNuxtModule,
  extendPages,
  addComponentsDir,
  createResolver,
} from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'payment-module',
    configKey: 'payment-module',
  },
  setup() {
    const { resolve } = createResolver(import.meta.url);

    addComponentsDir({
      path: resolve('./components'),
    });

    extendPages((pages) => {
      pages.push({
        path: '/payment',
        file: resolve('./pages/Payment.vue'),
      });
    });
  },
});

import {
  defineNuxtModule,
  extendPages,
  addComponentsDir,
  createResolver,
} from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'product-module',
    configKey: 'product-module',
  },
  setup() {
    const { resolve } = createResolver(import.meta.url);

    addComponentsDir({
      path: resolve('./components'),
    });

    extendPages((pages) => {
      pages.push({
        path: '/product/:id',
        file: resolve('./pages/_id.vue'),
      });
    });
  },
});

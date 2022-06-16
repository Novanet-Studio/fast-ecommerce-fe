import {
  defineNuxtModule,
  extendPages,
  addComponentsDir,
  createResolver,
} from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'invoices-module',
    configKey: 'invoices-module',
  },
  setup() {
    const { resolve } = createResolver(import.meta.url);

    addComponentsDir({
      path: resolve('./components'),
    });

    extendPages((pages) => {
      pages.push({
        path: '/invoices',
        file: resolve('./pages/Invoices.vue'),
      });

      pages.push({
        path: '/invoice/:id',
        file: resolve('./pages/_id.vue'),
      });
    });
  },
});

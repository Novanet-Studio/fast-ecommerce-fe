import {
  defineNuxtModule,
  extendPages,
  addComponentsDir,
  createResolver,
} from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'addresses-module',
    configKey: 'addresses-module',
  },
  setup() {
    const { resolve } = createResolver(import.meta.url);

    addComponentsDir({
      path: resolve('./components'),
    });

    extendPages((pages) => {
      pages.push({
        path: '/addresses',
        file: resolve('./pages/Addresses.vue'),
      });
      pages.push({
        path: '/edit-address',
        file: resolve('./pages/EditAddress.vue'),
      });
    });
  },
});

import path from 'path';
import { defineNuxtModule, extendPages, addComponentsDir } from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'edit-address-module',
    configKey: 'edit-address-module',
  },
  setup() {
    addComponentsDir({
      path: path.resolve(__dirname, './components'),
    });

    extendPages((pages) => {
      pages.push({
        path: '/edit-address',
        file: path.resolve(__dirname, './pages/EditAddress.vue'),
      });
    });
  },
});

import path from 'path';
import { defineNuxtModule, extendPages, addComponentsDir } from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'addresses-module',
    configKey: 'addresses-module',
  },
  setup() {
    addComponentsDir({
      path: path.resolve(__dirname, './components'),
    });

    extendPages((pages) => {
      pages.push({
        path: '/addresses',
        file: path.resolve(__dirname, './pages/Addresses.vue'),
      });
    });
  },
});

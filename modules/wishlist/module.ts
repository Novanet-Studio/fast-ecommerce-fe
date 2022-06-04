import path from 'path';
import { defineNuxtModule, extendPages, addComponentsDir } from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'wishlit-module',
    configKey: 'wishlit-module',
  },
  setup() {
    addComponentsDir({
      path: path.resolve(__dirname, './components'),
    });

    extendPages((pages) => {
      pages.push({
        path: '/wishlist',
        file: path.join(__dirname, './pages/WishList.vue'),
      });
    });
  },
});

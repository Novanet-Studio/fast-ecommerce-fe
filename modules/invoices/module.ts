import path from 'path';
import { defineNuxtModule, extendPages, addComponentsDir } from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'invoices-module',
    configKey: 'invoices-module',
  },
  setup() {
    addComponentsDir({
      path: path.resolve(__dirname, './components'),
    });

    extendPages((pages) => {
      pages.push({
        path: '/invoices',
        file: path.resolve(__dirname, './pages/Invoices.vue'),
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

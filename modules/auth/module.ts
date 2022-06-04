import path from 'path';
import { defineNuxtModule, extendPages, addComponentsDir } from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'auth-module',
    configKey: 'auth-module',
  },
  setup() {
    addComponentsDir({
      path: path.resolve(__dirname, './components'),
    });

    extendPages((pages) => {
      pages.push(
        ...[
          {
            path: '/login',
            file: path.resolve(__dirname, './pages/Login.vue'),
          },
          {
            path: '/register',
            file: path.resolve(__dirname, './pages/Register.vue'),
          },
        ]
      );
    });
  },
});

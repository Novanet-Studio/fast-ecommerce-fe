import {
  defineNuxtModule,
  extendPages,
  addComponentsDir,
  createResolver,
} from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'auth-module',
    configKey: 'auth-module',
  },
  setup() {
    const { resolve } = createResolver(import.meta.url);

    addComponentsDir({
      path: resolve('./components'),
    });

    extendPages((pages) => {
      pages.push(
        ...[
          {
            path: '/login',
            file: resolve('./pages/Login.vue'),
          },
          {
            path: '/register',
            file: resolve('./pages/Register.vue'),
          },
        ]
      );
    });
  },
});

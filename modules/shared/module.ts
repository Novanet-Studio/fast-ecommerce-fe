import {
  defineNuxtModule,
  addComponentsDir,
  addPlugin,
  createResolver,
} from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'shared-module',
    configKey: 'shared-module',
  },
  setup() {
    const { resolve } = createResolver(import.meta.url);

    const componentsPathList = [
      './components/common',
      './components/footer',
      './components/header',
      './components/carousel',
      './components/thumbnail',
      './components/information',
      './components',
    ];

    componentsPathList.forEach((componentPath) => {
      addComponentsDir({
        path: resolve(componentPath),
      });
    });

    // Register plugins
    addPlugin(resolve('./plugins/helpers.ts'));

    // Global Store
    addPlugin(resolve('./plugins/store.ts'));
  },
});

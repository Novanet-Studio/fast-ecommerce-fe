import path from 'path';
import { defineNuxtModule, addComponentsDir, addPlugin } from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'shared-module',
    configKey: 'shared-module',
  },
  setup(options, nuxt) {
    const componentsPathList = [
      './components/common',
      './components/footer',
      './components/header',
      './components/mobile',
      './components/thumbnail',
      './components/information',
      './components',
    ];

    const cssPathList = [
      './assets/fonts/Linearicons/Font/demo-files/demo.css',
      './assets/fonts/fontawesome/css/fontawesome.css',
      './assets/fonts/fontawesome/css/brands.css',
      './assets/fonts/fontawesome/css/regular.css',
      './assets/fonts/fontawesome/css/solid.css',
      './assets/scss/style.scss',
    ];

    componentsPathList.forEach((componentPath) => {
      addComponentsDir({
        path: path.resolve(__dirname, componentPath),
      });
    });

    cssPathList.forEach((cssPath) => {
      nuxt.options.css.push(path.resolve(__dirname, cssPath));
    });

    // Register pinia alias
    nuxt.options.alias.pinia = 'pinia/dist/pinia.mjs';

    // Register plugins
    addPlugin(path.resolve(__dirname, './plugins/pinia.ts'));
    addPlugin(path.resolve(__dirname, './plugins/firebase.ts'));
    addPlugin(path.resolve(__dirname, './plugins/vue-notification.ts'));
    addPlugin(path.resolve(__dirname, './plugins/helpers.ts'));
  },
});

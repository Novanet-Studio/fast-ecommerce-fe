import path from 'path';
import { defineNuxtModule, addComponentsDir, addPlugin } from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'shared-module',
    configKey: 'shared-module',
  },
  setup(options, nuxt) {
    nuxt.options.css.push(path.resolve(__dirname, './assets/scss/main.scss'));
    addComponentsDir({
      path: path.resolve(__dirname, './components'),
    });

    addPlugin(path.resolve(__dirname, './plugins/firebase.ts'));
  },
});

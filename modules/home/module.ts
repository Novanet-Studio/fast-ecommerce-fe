import path from 'path';
import { defineNuxtModule, addComponentsDir } from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'home-module',
    configKey: 'home-module',
  },
  setup() {
    addComponentsDir({
      path: path.resolve(__dirname, './components'),
    });
  },
});

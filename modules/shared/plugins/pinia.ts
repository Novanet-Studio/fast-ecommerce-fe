import { createPinia, setActivePinia } from 'pinia';
import { createNuxtPersistedState } from 'pinia-plugin-persistedstate';

export default defineNuxtPlugin((plugin) => {
  const pinia = createPinia();
  pinia.use(createNuxtPersistedState(useCookie));
  plugin.vueApp.use(pinia);
  setActivePinia(pinia);
});

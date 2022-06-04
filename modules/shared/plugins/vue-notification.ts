import Notification, { notify } from '@kyvg/vue3-notification';

export default defineNuxtPlugin((plugin) => {
  plugin.vueApp.use(Notification);
  return {
    provide: {
      notify,
    },
  };
});

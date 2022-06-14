import { handleAsync } from '../helpers';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      helpers: {
        handleAsync,
      },
    },
  };
});

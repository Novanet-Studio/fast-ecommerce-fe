import accountLinks from '~/data/account-links.json';

export const useGlobalStore = defineStore('ecommerce-global', () => {
  const links = ref(accountLinks.data);

  return {
    links,
  };
});

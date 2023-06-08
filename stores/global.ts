import accountLinks from '~/data/account-links.json';

type Currency = '$' | '€' | 'Bs';

export const useGlobalStore = defineStore('ecommerce-global', () => {
  const links = ref(accountLinks.data);
  const currency = ref<Currency>('$');

  return {
    currency,
    links,
  };
});

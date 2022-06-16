import { defineStore } from 'pinia';

export const useInvoice = defineStore('invoice', {
  state: () => ({
    invoice: null as Record<string, unknown> | any,
  }),
});

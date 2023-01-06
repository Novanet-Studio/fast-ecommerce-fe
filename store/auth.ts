import { defineStore } from 'pinia';

export const useAuth = defineStore('auth', {
  state: () => ({
    token: '',
    user: {
      id: '',
      email: '',
      username: '',
      customerId: '',
    },
    authenticated: false,
  }),
  persist: true,
});

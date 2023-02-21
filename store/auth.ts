import { defineStore } from 'pinia';
import { register as registerQuery } from '~/graphql';
import { HttpsCallable } from '~/types';
import { login as loginQuery } from '~/graphql';

type RegisterPaylod = {
  email: string;
  username: string;
  password: string;
  customerId: string;
};

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
  actions: {
    async login(user: string, password: string): Promise<boolean> {
      const { $notify } = useNuxtApp();
      const { setToken } = useStrapiAuth();
      const graphql = useStrapiGraphQL();

      const { data } = await graphql<LoginResponse>(loginQuery, {
        identifier: user,
        password,
      });

      if (!data) {
        $notify({
          group: 'all',
          title: 'Error!',
          text: 'Usuario o Contraseña inválidos',
        });
        return false;
      }

      setToken(data.login.jwt);
      this.authenticated = true;
      Object.assign(this.user, data.login.user);

      $notify({
        group: 'all',
        title: 'Success!',
        text: `Inicio de sesión con éxito!`,
      });

      return true;
    },
    async register(body: RegisterPaylod): Promise<boolean> {
      const { $notify } = useNuxtApp();
      const { setToken } = useStrapiAuth();
      const graphql = useStrapiGraphQL();

      const { data } = await graphql<RegisterResponse>(registerQuery, body);

      if (!data) {
        $notify({
          group: 'all',
          title: 'Oops',
          text: 'El usuario o email ya existen',
        });
        return false;
      }

      setToken(data.register.jwt);
      this.authenticated = true;
      Object.assign(this.user, data.register.user);

      $notify({
        group: 'all',
        title: 'Hey!',
        text: 'Te has registrado exitosamente!',
      });

      return true;
    },
    async createCustomer(user: string, email: string) {
      const { $httpsCallable } = useNuxtApp();
      const customerId = $httpsCallable(HttpsCallable.CreateCustomer);
      const idempotencyKey = crypto.randomUUID();
      const data = {
        idempotencyKey,
        givenName: user,
        emailAddress: email,
      };

      return customerId(data);
    },
  },
  persist: true,
});

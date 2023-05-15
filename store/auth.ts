import { defineStore } from 'pinia';
import { register as registerQuery } from '~/graphql';
import { HttpsCallable } from '~/types';
import { login as loginQuery } from '~/graphql';

type RegisterPayload = {
  email: string;
  username: string;
  password: string;
  customerId: string;
};

interface AuthState {
  token: string;
  user: User;
  authenticated: boolean;
}

const initialState = {
  token: '',
  user: {
    id: '',
    email: '',
    username: '',
    customerId: '',
  },
  authenticated: false,
};

export const useAuth = defineStore('auth', {
  state: () => initialState as AuthState,
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
      this.token = data.login.jwt;
      Object.assign(this.user, data.login.user);

      $notify({
        group: 'all',
        title: 'Success!',
        text: `Inicio de sesión con éxito!`,
      });

      return true;
    },
    async register(body: RegisterPayload): Promise<boolean> {
      const { $notify } = useNuxtApp();
      const { setToken } = useStrapiAuth();
      const graphql = useStrapiGraphQL();

      const { data } = await graphql<RegisterRequest>(registerQuery, body);

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
      const httpsCallable = $httpsCallable as HttpsCallableHelper;
      const customerId = httpsCallable<HttpsCallable.CreateCustomer, any>(
        HttpsCallable.CreateCustomer
      );
      const idempotencyKey = crypto.randomUUID();
      const data = {
        idempotencyKey,
        givenName: user,
        emailAddress: email,
      };

      return customerId(data);
    },
    reset() {
      const { logout } = useStrapiAuth();

      this.token = '';
      this.user.id = '';
      this.user.email = '';
      this.user.username = '';
      this.user.customerId = '';
      this.authenticated = false;
      Object.assign(this.user, initialState.user);
      logout();
    },
  },
  persist: true,
});

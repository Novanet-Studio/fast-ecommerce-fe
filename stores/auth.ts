import { LoginQuery, RegisterQuery } from '~/graphql/mutations';
import type { StrapiUser } from '@nuxtjs/strapi/dist/runtime/types';

type User = StrapiUser & {
  customerId: string;
};

export const useAuthStore = defineStore(
  'ecommerce-auth',
  () => {
    const { $notify, $httpsCallable } = useNuxtApp();
    const { setToken } = useStrapiAuth();
    const graphql = useStrapiGraphQL();

    const token = ref('');
    const user = reactive<User>({
      id: 0,
      customerId: '',
    });

    const authenticated = ref(false);

    async function login(
      identifier: string,
      password: string
    ): Promise<boolean> {
      const { data } = await graphql<LoginRequest>(LoginQuery, {
        identifier,
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
      authenticated.value = true;
      token.value = data.login.jwt;
      Object.assign(user, data.login.user);

      $notify({
        group: 'all',
        title: 'Success!',
        text: `Inicio de sesión con éxito!`,
      });

      return true;
    }

    async function register(user: Partial<User>): Promise<boolean> {
      const { data } = await graphql<RegisterRequest>(RegisterQuery, user);

      if (!data) {
        $notify({
          group: 'all',
          title: 'Oops',
          text: 'El usuario o email ya existen',
        });
        return false;
      }

      setToken(data.register.jwt);
      authenticated.value = true;
      Object.assign(user, data.register.user);

      $notify({
        group: 'all',
        title: 'Hey!',
        text: 'Te has registrado exitosamente!',
      });

      return true;
    }

    async function createCustomer(user: string, email: string) {
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
    }

    return {
      token,
      user,
      authenticated,
      login,
      register,
      createCustomer,
    };
  },
  { persist: true }
);

import config from '~/config/config.json';
import { LoginQuery, RegisterQuery } from '~/graphql/mutations';
import type { StrapiUser } from '@nuxtjs/strapi/dist/runtime/types';

type User = StrapiUser & {
  customerId: string;
};

export const useAuthStore = defineStore(
  config.store.auth,
  () => {
    const { $notify } = useNuxtApp();
    const { setToken } = useStrapiAuth();
    const graphql = useStrapiGraphQL();

    const cart = useCartStore();
    const product = useProductStore();
    const router = useRouter();

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
      const idempotencyKey = crypto.randomUUID();
      const data = {
        idempotencyKey,
        givenName: user,
        emailAddress: email,
      };

      const { data: result } = await useFetch('/api/create-customer', {
        method: 'post',
        body: data,
      });

      return result;
    }

    function logout() {
      $reset();
      cart.$reset();
      product.$reset();
      router.push({
        path: '/',
        force: true,
      });
    }

    function $reset() {
      token.value = '';
      authenticated.value = false;
      Object.assign(user, { id: 0, customerId: '' });
    }

    return {
      token,
      user,
      authenticated,
      login,
      register,
      createCustomer,
      $reset,
      logout,
    };
  },
  { persist: true }
);

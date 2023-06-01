import { CreateAddress, UpdateAddress } from '~/graphql/mutations';
import { GetAddressByIdAndType } from '~/graphql/queries';

interface GetAddressParams {
  userId: number;
  type: AddressType;
}

interface Result {
  hasBilling: Ref<boolean>;
  hasShipping: Ref<boolean>;
  isLoading: Ref<boolean>;
}

type Data = Record<string, string>;

const defaultState = {
  email: '',
  name: '',
  lastName: '',
  address: '',
  home: '',
  country: '',
  city: '',
  zipCode: '',
  phone: '',
  saveInformation: false,
};

export const useCheckoutStore = defineStore(
  'ecommerce-checkout',
  () => {
    const info = reactive(defaultState);
    const fullName = computed(() => `${info.name} ${info.lastName}`);
    const fullAddress = computed(
      () => `${info.address}, ${info.city}, ${info.zipCode}`
    );
    const shippingAddress = computed(
      () =>
        `${info.address} ${info.home}, ${info.city}. Zip Code: ${info.zipCode}. ${info.country}`
    );

    const graphql = useStrapiGraphQL();
    const authStore = useAuthStore();
    const { $notify } = useNuxtApp();
    const router = useRouter();

    const shippingInfo = (payload: ShippingInfo) => {
      Object.assign(info, payload);
    };

    // TODO: improve types
    async function getAddress({
      userId: id,
      type,
    }: GetAddressParams): Promise<any> {
      if (type === AddressType.None) return null;

      const { data } = await graphql<any>(GetAddressByIdAndType, {
        id,
        type,
      });

      if (!data?.addresses?.data?.length) return null;

      const [address] = data.addresses.data;

      return address;
    }

    function checkAddressType(): Result {
      const hasBilling = ref(false);
      const hasShipping = ref(false);
      const isLoading = ref(false);

      const id = Number(authStore.user.id);

      const checkBillingAndShipping = async () => {
        const data = [
          getAddress({ userId: id, type: AddressType.Billing }),
          getAddress({ userId: id, type: AddressType.Shipping }),
        ];

        const [billing, shipping] = await Promise.all(data);

        hasBilling.value = !!billing;
        hasShipping.value = !!shipping;
      };

      onMounted(async () => {
        if (!id) return;

        await checkBillingAndShipping();
      });

      return {
        hasBilling,
        hasShipping,
        isLoading,
      };
    }

    async function createAddress(data: Data) {
      await graphql<any>(CreateAddress, data);

      $notify({
        group: 'all',
        title: 'Éxito',
        text: 'Dirección creada con éxito',
      });

      router.push('/addresses');
    }

    async function updateAddress(existId: string, data: Data) {
      if (!existId) {
        $notify({
          group: 'all',
          title: 'Error',
          text: 'Hubo un error',
        });
        return;
      }

      const body = {
        id: existId,
        data: {
          user_id: data.userId,
          address: data.address,
          type: data.type,
        },
      };

      const {
        data: {
          updateAddress: { data: result },
        },
      } = await graphql<any>(UpdateAddress, body);

      if (!result) {
        $notify({
          group: 'all',
          title: 'Error',
          text: 'Hubo un error',
        });
        return;
      }

      $notify({
        group: 'all',
        title: 'Éxito!',
        text: 'La dirección se ha actualizado!',
      });

      router.push('/addresses');
    }

    return {
      ...toRefs(info),
      fullName,
      fullAddress,
      shippingAddress,
      shippingInfo,
      getAddress,
      checkAddressType,
      createAddress,
      updateAddress,
    };
  },
  {
    persist: true,
  }
);

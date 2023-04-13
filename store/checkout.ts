import { defineStore } from 'pinia';
import {
  createAdress as CreateAddress,
  updateAddress as UpdateAddress,
  getAddressByIdAndType as GetAddressByIdAndType,
} from '~/graphql';
import { AddressType } from '~/types';

interface ShippingInfo {
  email?: string;
  name?: string;
  lastName?: string;
  address?: string;
  home?: string;
  country?: string;
  city?: string;
  zipCode?: string;
  phone?: string;
}

interface CheckoutStore extends ShippingInfo {
  saveInformation: boolean;
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

export const useCheckout = defineStore('checkout', {
  state: (): CheckoutStore => ({
    ...defaultState,
  }),
  getters: {
    fullName(): string {
      return `${this.name} ${this.lastName}`;
    },
    fullAddress(): string {
      return `${this.address}, ${this.city}, ${this.zipCode}`;
    },
    shippingAddress(): string {
      return `${this.address} ${this.home}, ${this.city}. Zip Code: ${this.zipCode}. ${this.country}`;
    },
  },
  actions: {
    shippingInfo(info: ShippingInfo) {
      this.email = info.email;
      this.name = info.name;
      this.lastName = info.lastName;
      this.address = info.address;
      this.home = info.home;
      this.country = info.country;
      this.city = info.city;
      this.zipCode = info.zipCode;
      this.phone = info.phone;
    },
    async createAddress(data: Data) {
      const { $notify } = useNuxtApp();
      const router = useRouter();
      const graphql = useStrapiGraphQL();
      await graphql<AddressResponse>(CreateAddress, data);

      $notify({
        group: 'all',
        title: 'Éxito',
        text: 'Dirección creada con éxito',
      });

      router.push('/addresses');
    },
    async updateAddress(existId: string, data: Data) {
      const { $notify } = useNuxtApp();
      const graphql = useStrapiGraphQL();
      const router = useRouter();

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
      } = await graphql<UpdateAddressResponse>(UpdateAddress, body);

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

      // const addId = payload.addId;
      // const data = payload.data;
      // const response = await Repository.put(
      //   `${baseUrl}/addresses/${addId}`,
      //   data
      // )
      //   .then((response) => {
      //     return response;
      //   })
      //   .catch((error) => ({ error: JSON.stringify(error) }));

      // return response;
    },
    async getAddress({
      userId,
      type,
    }: {
      userId: number;
      type: AddressType;
    }): Promise<Address | null> {
      const graphql = useStrapiGraphQL();
      if (type === AddressType.None) return null;

      const id = userId;
      const body = {
        id,
        type,
      };

      const { data } = await graphql<AddressResponse>(
        GetAddressByIdAndType,
        body
      );

      if (!data?.addresses?.data?.length) return null;

      const [address] = data.addresses.data;

      return address;
    },
    checkAddressType(): Result {
      const hasBilling = ref(false);
      const hasShipping = ref(false);
      const isLoading = ref(false);

      const graphql = useStrapiGraphQL();

      const { $store } = useNuxtApp();
      const auth = $store.auth();

      const id = Number(auth.user.id);

      const checkBilling = async () => {
        try {
          const data = {
            id,
            type: AddressType.Billing,
          };

          const response = await graphql<AddressResponse>(
            GetAddressByIdAndType,
            data
          );

          if (!response?.data?.addresses?.data?.length) {
            hasBilling.value = false;
            return;
          }

          hasBilling.value = true;
        } catch (error) {
          hasBilling.value = false;
          console.log('An error occurred while checkBilling: ', error);
        }
      };

      const checkShipping = async () => {
        try {
          const data = {
            id,
            type: AddressType.Shipping,
          };

          const response = await graphql<AddressResponse>(
            GetAddressByIdAndType,
            data
          );

          if (!response?.data?.addresses?.data?.length) {
            hasShipping.value = false;
            return;
          }

          hasShipping.value = true;
        } catch (error) {
          hasShipping.value = false;
          console.log('An error occurred while checkShipping: ', error);
        }
      };

      onMounted(async () => {
        if (!id) return;

        await checkBilling();
        await checkShipping();
      });

      return {
        hasBilling,
        hasShipping,
        isLoading,
      };
    },
    reset() {
      this.email = '';
      this.name = '';
      this.lastName = '';
      this.address = '';
      this.home = '';
      this.country = '';
      this.city = '';
      this.zipCode = '';
      this.phone = '';
      this.saveInformation = false;
    },
  },
  persist: true,
});

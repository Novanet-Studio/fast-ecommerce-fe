import { defineStore } from 'pinia';
import {
  createAdress as CreateAddress,
  updateAddress as UpdateAddress,
  getAddressByIdAndType as GetAddressByIdAndType,
} from '~/graphql';
import { AddressType } from '~/types';

type ShippingInfo = {
  email?: string;
  name?: string;
  lastName?: string;
  address?: string;
  home?: string;
  city?: string;
  zipCode?: string;
  phone?: string;
};

export const useCheckout = defineStore('checkout', {
  state: () =>
    ({
      email: '',
      name: '',
      lastName: '',
      address: '',
      home: '',
      city: '',
      zipCode: '',
      phone: '',
    } as ShippingInfo),
  getters: {
    fullName(): string {
      return `${this.name} ${this.lastName}`;
    },
    fullAddress(): string {
      return `${this.address}, ${this.city}, ${this.zipCode}`;
    },
  },
  actions: {
    shippingInfo(info: ShippingInfo) {
      this.email = info.email;
      this.name = info.name;
      this.lastName = info.lastName;
      this.address = info.address;
      this.home = info.home;
      this.city = info.city;
      this.zipCode = info.zipCode;
    },
    async createAddress(data: Record<string, string>) {
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
    async updateAddress(existId: string, data: Record<string, string>) {
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

      if (!data.addresses.data.length) return null;

      const [address] = data.addresses.data;

      return address;
    },
  },
});

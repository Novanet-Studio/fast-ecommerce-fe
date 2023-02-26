import { getAddressByIdAndType as GetAddressByIdAndType } from '~/graphql';
import type { Ref } from 'vue';
import { AddressType } from '~/types';

interface Result {
  hasBilling: Ref<boolean>;
  hasShipping: Ref<boolean>;
  isLoading: Ref<boolean>;
}

export default function useCheckAddressType(): Result {
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

      console.log(response);

      if (!response.data.addresses.data.length) {
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

      if (!response.data.addresses.data.length) {
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
}

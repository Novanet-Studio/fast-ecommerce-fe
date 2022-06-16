<template>
  <div>
    <!-- ps-section__content -->
    <div class="p-5">
      <div class="flex flex-col gap-10 lg:(flex-row gap-5)">
        <div class="max-w-full flex-[0_0_100%] md:(max-w-[50%] flex-[0_0_50%])">
          <figure>
            <figcaption class="mb-8 pb-3 text-xl font-semibold text-[#e36d65] border-b-[1px] border-b-[#e36d65]">
              Dirección de facturación
            </figcaption>
            <template v-if="hasBilling">
              <div>
                <p class="mb-4 text-[#e36d65] text-sm">
                  ¿Deseas actualizar tu dirección de facturación?
                </p>
                <nuxt-link to="/edit-address?add=billing">
                  <a class="text-base text-yellow-400 transition ease hover:text-yellow-500">Actualizar</a>
                </nuxt-link>
              </div>
            </template>
            <template v-else>
              <div>
                <p class="mb-4 text-[#e36d65] text-sm">
                  No has registrado ningun dirección de facturación
                </p>
                <nuxt-link to="/edit-address?add=billing">
                  <a class="text-base text-yellow-400 transition ease hover:text-yellow-500">Agregar</a>
                </nuxt-link>
              </div>
            </template>
          </figure>
        </div>
        <div class="max-w-full flex[0_0_100%] md:(max-w-[50%] flex-[0_0_50%])">
          <figure>
            <figcaption class="mb-8 pb-3 text-xl font-semibold text-[#e36d65] border-b-[1px] border-b-[#e36d65]">
              Dirección de envío
            </figcaption>
            <template v-if="hasShipping">
              <div>
                <p class="mb-4 text-[#e36d65] text-sm">
                  ¿Deseas actualizar tu dirección de envío?
                </p>
                <nuxt-link to="/edit-address?add=shipping">
                  <a class="text-base text-yellow-400 transition ease hover:text-yellow-500">Actualizar</a>
                </nuxt-link>
              </div>
            </template>
            <template v-else>
              <div>
                <p class="mb-4 text-[#e36d65] text-sm">
                  No has registrado ningun dirección de envío
                </p>
                <nuxt-link to="/edit-address?add=shipping">
                  <a class="text-base text-yellow-400 transition ease hover:text-yellow-500">Agregar</a>
                </nuxt-link>
              </div>
            </template>
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GetAddressByIdAndType } from '../queries';
import { AddressType } from '~/modules/shared/shared-types';

const { $store } = useNuxtApp();
const graphql = useStrapiGraphQL();
const auth = $store.auth();

const hasBilling = ref<boolean>(false);
const hasShipping = ref<boolean>(false);

const checkBilling = async () => {
  const data = {
    id: auth.user.id,
    type: AddressType.Billing,
  };

  const response = await graphql<AddressResponse>(GetAddressByIdAndType, data);

  if (!response.data.addresses.data.length) {
    hasBilling.value = false;
    return;
  }

  hasBilling.value = true;
}

const checkShipping = async () => {
  const data = {
    id: auth.user.id,
    type: AddressType.Shipping,
  };

  const response = await graphql<AddressResponse>(GetAddressByIdAndType, data);

  if (!response.data.addresses.data.length) {
    hasShipping.value = false;
    return;
  }

  hasShipping.value = true;
}

onMounted(async () => {
  await checkBilling();
  await checkShipping();
})
</script>
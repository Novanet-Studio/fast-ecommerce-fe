<template>
  <section class="edit-address" v-if="type">
    <div class="edit-address__wrapper">
      <header class="edit-address__header">
        <h3 class="edit-address__title">Direcciones</h3>
      </header>
      <div class="edit-address__content">
        <edit-address-form :type="type" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { AddressType } from '~/types';

definePageMeta({
  middleware: 'authentication',
  layout: 'layout-account',
});

const route = useRoute();

const type = computed(() => {
  const type = route.fullPath.split('?')[1];
  const addressType = type.split('=')[1] as AddressType;

  if ([AddressType.Billing, AddressType.Shipping].includes(addressType)) {
    return addressType;
  }

  return type as AddressType.None;
});
</script>

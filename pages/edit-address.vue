<script lang="ts" setup>
definePageMeta({
  layout: 'account',
  middleware: 'authentication',
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

<template>
  <section class="edit-address" v-if="type">
    <div class="edit-address__wrapper">
      <header class="edit-address__header">
        <h3 class="edit-address__title">Direcciones</h3>
      </header>
      <div class="edit-address__content bg-white">
        <edit-address-form :type="type" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.edit-address {
  @apply w-full lg:ml-8;
}

.edit-address__wrapper {
  @apply w-full;
}

.edit-address__header {
  @apply mb-8 pb-3 border-b border-b-light-800;
}

.edit-address__title {
  @apply text-2xl font-semibold text-color-2;
}

.edit-address__content {
  @apply p-5;
}
</style>

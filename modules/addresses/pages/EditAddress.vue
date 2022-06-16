<template>
  <section v-if="type" class="w-full lg:ml-8">
    <edit-address-content :type="type" />
  </section>
</template>

<script lang="ts" setup>
import { AddressType } from '~~/modules/shared/shared-types';

definePageMeta({
  middleware: 'authentication',
  layout: 'layout-account',
  pageTransition: {
    name: 'zoom',
  },
});

const route = useRoute();
// const router = useRouter();
// const breadCrumb = ref([
//   {
//     text: 'Home',
//     url: '/'
//   },
//   {
//     text: 'Edit Address'
//   }
// ]);

const type = computed(() => {
  const type = route.fullPath.split('?')[1];
  const addressType = type.split('=')[1] as AddressType;

  if ([AddressType.Billing, AddressType.Shipping].includes(addressType)) {
    return addressType;
  }

  return type as AddressType.None;
});
</script>

<template>
  <div class="flex p-4 gap-4 w-full">
    <div
      class="max-w-full p-6 relative rounded-xl flex flex-col w-full md:(flex-row)"
    >
      <thumbnail-default />
      <section class="mt-10 md:(my-4 ml-8 w-full)">
        <product-information-default :product="product" />
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { injectKeys } from '~/config/constants';
const product = inject(injectKeys.productDetail);
</script>

<template>
  <div class="w-full">
    <!-- ps-section__header -->
    <div class="mb-8 pb-3 border-b border-b-light-800">
      <h3 class="text-2xl font-semibold text-yellow-400">Dirección</h3>
    </div>
    <!-- ps-section__content -->
    <div class="p-5">
      <edit-address-form :type="type" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ type: AddressType }>();
</script>

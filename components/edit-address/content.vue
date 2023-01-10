<template>
  <div class="edit-address__wrapper">
    <header class="edit-address__header">
      <h3 class="edit-address__title">Dirección</h3>
    </header>
    <div class="edit-address__content">
      <edit-address-form :type="type" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ type: AddressType }>();
</script>

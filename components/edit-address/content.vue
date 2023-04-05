<template>
  <div class="edit-address__wrapper">
    <header class="edit-address__header">
      <h3 class="edit-address__title">Direcciones</h3>
    </header>
    <div class="edit-address__content">
      <edit-address-form :type="type" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AddressType } from '~/types';

defineProps<{ type: AddressType }>();
</script>

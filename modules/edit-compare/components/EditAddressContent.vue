<template>
  <div class="ps-page__content">
    <div class="ps-section--account-setting">
      <div class="ps-section__header">
        <h3>Direccion</h3>
      </div>
      <div class="ps-section__content">
        <FormEditAddress :type="type" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  type: string;
}

defineProps<Props>();
</script>

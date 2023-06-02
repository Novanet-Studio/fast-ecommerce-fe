<template>
  <div class="product-quick-view">
    <thumbnail-quick-view />
    <product-information-quick-view />
  </div>
</template>

<style scoped>
.product-quick-view {
  @apply mb-0 flex flex-col flex-wrap justify-center items-start lg:(flex-nowrap flex-row);
}
</style>

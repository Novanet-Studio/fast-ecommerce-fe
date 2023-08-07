<template>
  <section class="wishlist">
    <div class="wishlist__center">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.wishlist {
  @apply mt-4 max-w-sm sm:(max-w-lg mb-24) md:max-w-2xl lg:(px-7 mt-0 max-w-full);
}

.wishlist__center {
  @apply w-full px-3 mx-auto;
}
</style>

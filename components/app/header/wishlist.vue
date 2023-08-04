<script lang="ts" setup>
const wishlistStore = useWishlistStore();
const total = computed(() => wishlistStore?.total ?? 0);
</script>

<template>
  <nuxt-link class="header-actions__link mx-5" to="/wishlist">
    <div class="i-ph-heart-light header-actions__icon" />
    <span class="header-actions__indicator-wrapper" v-if="total">
      <i class="header-actions__indicator">{{ total }}</i>
    </span>
  </nuxt-link>
</template>

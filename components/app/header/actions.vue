<template>
  <div class="header-actions">
    <nuxt-link class="header-actions__link mx-5" to="/wishlist">
      <ph-heart weight="light" class="header-actions__icon" />
      <span class="header-actions__indicator-wrapper" v-if="total">
        <i class="header-actions__indicator">{{ total }}</i>
      </span>
    </nuxt-link>
    <mini-cart />
    <app-header-user-area />
  </div>
</template>

<script lang="ts" setup>
import { PhHeart } from '@phosphor-icons/vue';
const { $store } = useNuxtApp();
const wishlistStore = $store.wishlist();
const total = computed(() => wishlistStore?.total ?? 0);
</script>

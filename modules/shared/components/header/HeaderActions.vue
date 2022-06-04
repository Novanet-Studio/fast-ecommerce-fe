<template>
  <div class="header__actions">
    <nuxt-link to="/wishlist">
      <a class="header__extra">
        <i class="icon-heart"></i>
        <span>
          <i>{{ wishListTotal ?? 0 }}</i>
        </span>
      </a>
    </nuxt-link>
    <mini-cart />
    <header-user-area />
  </div>
</template>

<script lang="ts" setup>
import { useWishList } from '~/store/wishlist';
const wishlistStore = useWishList();
const wishListTotal = computed(() => wishlistStore.total); 
</script>
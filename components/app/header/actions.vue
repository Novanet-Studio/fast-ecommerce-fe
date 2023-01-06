<template>
  <div class="flex items-center justify-between md:justify-end">
    <nuxt-link to="/wishlist" class="mx-5">
      <a class="inline-block relative w-[30px] h-[42px] transition ease">
        <i class="icon-heart text-3xl"></i>
        <span
          class="absolute bottom-2 -right-[6px] flex justify-center items-center w-[20px] h-[20px] text-white bg-dark-300 rounded-full"
        >
          <i class="text-xs leading-4 font-medium not-italic">{{
            wishListTotal ?? 0
          }}</i>
        </span>
      </a>
    </nuxt-link>
    <mini-cart />
    <app-header-user-area />
  </div>
</template>

<script lang="ts" setup>
const { $store } = useNuxtApp();
const wishlistStore = $store.wishlist();
const wishListTotal = computed(() => wishlistStore.total);
</script>

<template>
  <aside class="flex flex-col">
    <div class="flex flex-row flex-nowrap justify-between items-start pb-5">
      <div class="flex items-center">
        <h3 class="relative text-color-2 text-2xl mt-0 mb-2 font-bold">
          Bienvenido {{ auth.user.username }}!
        </h3>
      </div>
    </div>
    <div>
      <account-links />
    </div>
  </aside>
</template>

<script lang="ts" setup>
const auth = useAuthStore();
</script>

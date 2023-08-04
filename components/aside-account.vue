<script setup>
const auth = useAuthStore();
</script>

<template>
  <aside class="aside">
    <div class="aside__header-wrapper">
      <div class="aside__header">
        <h3 class="aside__title">Bienvenido {{ auth.user.username }}!</h3>
      </div>
    </div>
    <div>
      <account-links />
    </div>
  </aside>
</template>

<style scoped>
.aside {
  @apply flex flex-col;
}

.aside__header-wrapper {
  @apply flex flex-row flex-nowrap justify-between items-start pb-5;
}

.aside__header {
  @apply flex items-center;
}

.asider__title {
  @apply relative text-color-2 text-2xl mt-0 mb-2 font-bold;
}
</style>

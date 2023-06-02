<template>
  <div class="skeleton">
    <div class="skeleton__header"></div>
    <div class="skeleton__wrapper">
      <div class="skeleton-card" v-for="i in items" :key="i">
        <div class="skeleton-card__first-line"></div>
        <div class="skeleton-card__second-line"></div>
        <div class="skeleton-card__third-line"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ items?: number }>(), {
  items: 2,
});
</script>

<style scoped>
.skeleton {
  @apply animate-pulse my-8 flex flex-col;
}

.skeleton__header {
  @apply w-full h-12 bg-gray-200;
}

.skeleton__wrapper {
  @apply flex gap-8 px-4;
}

.skeleton-card {
  @apply w-60 h-110 mt-8 flex flex-col items-center p-4;
}

.skeleton-card__first-line {
  @apply w-full h-84 bg-gray-200;
}

.skeleton-card__second-line {
  @apply self-start w-28 h-4 bg-gray-200 mt-4;
}

.skeleton-card__third-line {
  @apply w-10 h-4 bg-gray-200 mt-4 self-start;
}
</style>

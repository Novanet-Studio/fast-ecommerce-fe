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
type Props = {
  items?: number;
};

withDefaults(defineProps<Props>(), {
  items: 2,
});
</script>

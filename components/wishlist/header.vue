<script setup>
const props = defineProps({
  noArticles: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const element = props.noArticles ? 'h3' : 'h1';
const classes = computed(() => {
  return {
    header: props.noArticles && 'wishlist__center',
    heading: props.noArticles ? 'wishlist__subtitle' : 'wishlist__title',
  };
});
</script>

<template>
  <header class="wishlist__header" :class="classes.header">
    <component :is="element" v-bind="{ class: classes.heading }">
      <slot />
    </component>
  </header>
</template>

<style scoped>
.wishlist__center {
  @apply w-full px-3 mx-auto;
}

.wishlist__header {
  @apply pb-12 text-left lg:pb-24;
}

.wishlist__title {
  @apply text-3xl font-semibold text-color-2 lg:text-5xl;
}

.wishlist__subtitle {
  @apply text-xl text-color-2 mb-2 font-bold lg:text-2xl;
}
</style>

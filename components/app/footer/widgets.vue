<template>
  <div class="widgets">
    <aside class="widgets__wrapper">
      <h3 class="widgets__title">Contáctanos</h3>
      <ul class="widgets__list">
        <li
          v-for="(item, index) in appConfig.footer.widgets"
          :key="index"
          class="widgets__item"
        >
          <a class="widgets__link" :href="item.link">
            <component :is="item.icon" v-bind="{ class: 'lg:text-3xl' }" />
          </a>
          {{ item.text }}
        </li>
      </ul>
    </aside>
  </div>
</template>

<script lang="ts" setup>
const appConfig = useAppConfig();
</script>

<style scoped>
.widgets {
  @apply pb-7 mx-4 lg:container lg:mx-auto;
}

.widgets__wrapper {
  @apply max-w-full w-full relative pb-5 mb-5;
}

.widgets__title {
  @apply text-xl mb-[10px] font-bold text-yellow-400;
}

.widgets__list {
  @apply mt-7;
}

.widgets__item {
  @apply relative inline-block mr-[20px] align-top;
}

.widgets__link {
  @apply text-yellow-400 inline-block text-lg;
}
</style>

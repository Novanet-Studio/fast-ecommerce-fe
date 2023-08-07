<script setup>
const appConfig = useAppConfig();
</script>

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
            <component
              :is="item.icon"
              v-bind="{ class: 'lg:text-3xl text-color-2' }"
            />
          </a>
          {{ item.text }}
        </li>
      </ul>
    </aside>
  </div>
</template>

<style scoped>
.widgets {
  @apply pb-7 lg:(mx-4 mx-auto);
}

.widgets__wrapper {
  @apply max-w-full w-full relative pb-5 mb-5;
}

.widgets__title {
  @apply text-3xl pb-4 font-bold text-color-2;
}

.widgets__list {
  @apply mt-7 w-full;
}

.widgets__item {
  @apply relative inline-flex items-center mr-[20px] gap-1 md:mr-2;
}

.widgets__link {
  @apply flex text-lg;
}
</style>

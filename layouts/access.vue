<template>
  <div class="access">
    <div class="access__wrapper">
      <header class="access__header">
        <nuxt-link class="access__link" to="/">
          <img
            class="filter filter-drop-shadow"
            src="/img/novanet-logo.png"
            alt="Project logo"
          />
        </nuxt-link>
      </header>
      <nuxt-page />
      <app-notify />
    </div>
    <div class="mt-20"><app-footer-copyright /></div>
  </div>
</template>

<style scoped>
.access {
  @apply flex flex-col px-4 bg-light-500 w-full min-h-screen overflow-hidden relative;
}

.access__wrapper {
  @apply w-full mt-12 flex-1 md:(max-w-xl mx-auto);
}

.access__header {
  @apply p-6 flex justify-center;
}

.access__link {
  @apply cursor-pointer;
}
</style>

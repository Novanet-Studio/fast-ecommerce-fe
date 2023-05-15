<template>
  <div class="access">
    <div class="access__wrapper">
      <header class="access__header">
        <nuxt-link class="access__link" to="/">
          <img src="~/assets/img/logo.png" alt="Project logo" />
        </nuxt-link>
      </header>
      <nuxt-page />
      <notify />
    </div>
  </div>
</template>

<style scoped>
.access {
  @apply bg-light-500 w-full min-h-screen overflow-hidden;
}

.access__wrapper {
  @apply w-full mt-12 md:(max-w-xl mx-auto);
}

.access__header {
  @apply p-6 flex justify-center;
}

.access__link {
  @apply cursor-pointer;
}
</style>

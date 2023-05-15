<template>
  <div>
    <client-only>
      <div class="default">
        <div class="default__wrapper">
          <div class="default__container">
            <div class="default__content">
              <app-header />
              <!-- <navigation-list /> -->
              <main class="default__main">
                <nuxt-page />
              </main>
              <app-footer />
              <notify />
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<style scoped>
.default {
  @apply flex relative;
}
.default__container {
  @apply flex flex-1 max-w-full transition animate-ease-[cubic-bezier(0.4,0,0.2,1)];
}

.default__wrapper {
  @apply flex-auto backface-hidden flex flex-col min-h-screen max-w-full relative;
}
.default__content {
  @apply flex-auto max-w-full relative;
}
.default__main {
  @apply lg:container lg:mx-auto;
}
</style>

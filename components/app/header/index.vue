<template>
  <header>
    <div class="header__wrapper">
      <div class="header__container">
        <div class="header__brand">
          <nuxt-link class="header__link" to="/">
            <img src="~/assets/img/logo.png" alt="Fast ecommerce logo" />
          </nuxt-link>
        </div>
        <div class="header__content">
          <app-header-actions />
        </div>
      </div>
    </div>
    <app-header-navigation />
  </header>
</template>

<style scoped>
.header__wrapper {
  @apply px-4 py-8 bg-color-1 border-b border-color-1 md:px-6;
}

.header__container {
  @apply flex items-center justify-between flex-nowrap gap-4 md:gap-0 lg:(mx-auto px-24);
}

.header__brand {
  @apply flex items-center flex-basis-[35%] md:flex-basis-[auto];
}

.header__link {
  @apply cursor-pointer;
}

.header__content {
  @apply lg:w-[15%];
}
</style>

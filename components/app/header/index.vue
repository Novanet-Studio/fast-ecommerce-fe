<template>
  <header>
    <div class="header__wrapper">
      <div class="header__container">
        <div class="header__brand">
          <nuxt-link class="header__link" to="/">
            <img src="~/assets/img/logo.png" alt="Fastecommerce logo" />
          </nuxt-link>
        </div>
        <div class="header__content">
          <app-header-actions />
        </div>
      </div>
    </div>
    <!-- <app-navigation /> -->
  </header>
</template>

<script lang="ts" setup>
const appConfig = useAppConfig();
</script>

<style scoped>
.header__wrapper {
  @apply px-6 py-8 bg-yellow-200 border-b border-b-yellow-300;
}

.header__container {
  @apply flex items-center justify-between flex-nowrap lg:container lg:mx-auto gap-4 md:gap-0;
}

.header__brand {
  @apply flex items-center flex-basis-[35%] md:flex-basis-[auto];
}

.header__link {
  @apply cursor-pointer;
}

.header__content {
  @apply flex flex-col justify-center flex-basis-[55%] sm:max-w-60 md:(max-w-[23.125rem] flex-basis-[auto]) lg:max-w-80;
}
</style>

<template>
  <header>
    <div class="px-6 py-8 bg-yellow-200 border-b border-b-yellow-300">
      <div
        class="flex items-center justify-between flex-nowrap lg:container lg:mx-auto gap-4 md:gap-0"
      >
        <div class="flex items-center flex-basis-[35%] md:flex-basis-[auto]">
          <nuxt-link class="cursor-pointer" to="/">
            <img src="~/assets/img/logo.png" alt="martfury" />
          </nuxt-link>
        </div>
        <!-- <div class=""> -->
        <!-- Search goes here -->
        <!-- </div> -->
        <div
          class="flex flex-col justify-center flex-basis-[55%] sm:max-w-60 md:(max-w-[23.125rem] flex-basis-[auto])"
        >
          <!-- <header-actions /> -->
          <app-header-actions />
        </div>
      </div>
    </div>
    <app-navigation />
  </header>
</template>

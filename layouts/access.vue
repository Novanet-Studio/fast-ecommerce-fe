<template>
  <div class="bg-light-500 w-full min-h-screen overflow-hidden">
    <div class="w-full mt-12 md:(max-w-xl mx-auto)">
      <header class="p-6 flex justify-center">
        <nuxt-link class="cursor-pointer" to="/">
          <img src="~/assets/img/logo.png" alt="martfury" />
        </nuxt-link>
      </header>
      <nuxt-page />
      <notify />
    </div>
  </div>
</template>

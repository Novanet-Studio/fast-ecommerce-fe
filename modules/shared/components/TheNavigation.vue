<template>
  <nav class="relative flex flex-wrap items-center justify-between px-4 py-2 bg-yellow-100">
    <div class="flex flex-col items-center justify-between w-full lg:container lg:mx-auto">
      <button class="lg:hidden" type="button" aria-expanded="false" aria-label="Toggle navigation"
        @click="isOpen = !isOpen">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list"
          viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
        </svg>
      </button>
      <div class="w-full text-center justify-center mt-4 flex-[1_0_100%] lg:(flex justify-start)"
        :class="[isOpen ? 'flex' : 'hidden']">
        <the-menu />
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
const isOpen = ref(false);
</script>

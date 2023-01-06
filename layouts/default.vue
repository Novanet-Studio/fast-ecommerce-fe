<template>
  <div>
    <client-only>
      <div class="flex relative">
        <div
          class="flex-auto backface-hidden flex flex-col min-h-screen max-w-full relative"
        >
          <div
            class="flex flex[1_0_auto] max-w-full transition animate-ease-[cubic-bezier(0.4,0,0.2,1)]"
          >
            <div class="flex-auto max-w-full relative">
              <app-header />
              <!-- <navigation-list /> -->
              <main class="lg:container lg:mx-auto">
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

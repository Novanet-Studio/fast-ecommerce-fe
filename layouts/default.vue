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

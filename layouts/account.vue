<template>
  <client-only>
    <div class="account">
      <div class="account__wrapper">
        <div class="account__main">
          <div class="account__main-wrapper">
            <app-header />
            <section class="account__section">
              <div class="account__section-wrapper">
                <div class="account__section-container">
                  <div class="account__aside">
                    <div>
                      <aside-account />
                    </div>
                  </div>
                  <div class="account__content">
                    <nuxt-page />
                  </div>
                </div>
              </div>
            </section>
            <app-footer />
            <app-notify />
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<style scoped>
.account {
  @apply flex relative bg-color-3;
}

.account__wrapper {
  @apply flex-auto backface-hidden flex flex-col min-h-screen max-w-full relative;
}

.account__main {
  @apply flex flex-[1_0_auto] max-w-full transition animate-ease-[cubic-bezier(0.4,0,0.2,1)];
}

.account__main-wrapper {
  @apply flex-auto max-w-full relative;
}

.account__section {
  @apply pt-12 min-h-screen;
}

.account__section-wrapper {
  @apply max-w-sm p-3 mx-auto flex sm:max-w-lg md:max-w-2xl lg:(px-52 max-w-full);
}

.account__section-container {
  @apply pt-12 min-h-screen;
}

.account__section-container {
  @apply flex flex-wrap flex-auto -m-3;
}

.account__aside {
  @apply flex-[0_0_100%] mb-8 md:h-auto lg:(flex-[0_0_30.333333%] mb-8);
}

.account__content {
  @apply flex-[0_0_100%] flex lg:flex-[0_0_66.666666%];
}
</style>

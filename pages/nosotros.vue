<template>
  <section>
    <nuxt-img src="/img/home/1.jpg" w-full />
    <div class="content-wrapper">
      <div class="wrapper-container">
        <div class="item-container">
          <h4 class="title">Nosotros</h4>
          <p class="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
            provident repellendus nihil officiis voluptatem quae, qui, obcaecati
            natus quasi beatae ipsa unde inventore doloremque atque harum illum
            odio. Reprehenderit repellat doloribus, explicabo soluta inventore
            consectetur corporis autem voluptatum, obcaecati enim aliquam iste
            neque pariatur! Dolore neque nesciunt placeat harum autem.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.content-wrapper {
  @apply py-32 bg-color-3;
}

.wrapper-container {
  @apply w-full py-3 mx-auto lg:max-w-[1230px];
}

.item-container {
  @apply max-w-[820px] mx-auto mb-12;
}

.title {
  @apply mb-[65px] text-4xl text-color-2 font-400;
}

.content {
  @apply text-xl leading-[1.6em] mb-4 text-[#666];
}
</style>

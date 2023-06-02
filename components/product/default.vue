<template>
  <div class="product h-full">
    <div class="product__thumbnail">
      <product-thumbnail-image :id="product.id" :image="product.image[0]" />
      <product-actions
        :id="product.id"
        :price="product.price"
        @quick-view="handleQuickView"
      />
    </div>
    <div class="product__container">
      <div class="product__content">
        <product-title :id="product.id">{{ product.name }}</product-title>
        <product-price class="!my-1">{{ product.price }}</product-price>
      </div>
    </div>
    <product-modal v-model="state.quickView">
      <!-- <product-quick-view :product="product" /> -->
    </product-modal>
  </div>
</template>
<script lang="ts" setup>
defineProps<{ product: Product }>();

const state = reactive({
  modal: false,
  preload: false,
  isImageLoaded: false,
  quickView: false,
});

const handleQuickView = (open: boolean) => (state.quickView = open);
</script>

<style scoped>
.product {
  @apply box-border lg:p-[20px_20px_0] max-w-[168px] relative block box-border border border-transparent transition ease hover:(border border-gray-300) lg:max-w-[250px];
}

.product__thumbnail {
  @apply relative overflow-hidden;
}

.product__thumbnail:hover > ul {
  transform: translate(-50%, 0);
}

.product-modal {
  @apply p-4 relative lg:p-6;
}

.product-modal__icon {
  @apply absolute top-3 right-4 cursor-pointer;
}
</style>

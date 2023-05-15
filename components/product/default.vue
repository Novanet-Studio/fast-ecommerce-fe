<template>
  <div class="product h-full">
    <div class="product__thumbnail h-2/3">
      <product-thumbnail-image :product="product" />
      <product-actions :product="product" @quick-view="handleQuickView" />
    </div>
    <div class="product__container">
      <div class="product__content">
        <product-title :product="product" />
        <product-price class="!my-1" :product="product" />
      </div>
    </div>
    <modal v-model="state.quickView">
      <div class="product-modal">
        <a class="product-modal__icon" @click="state.quickView = false">
          <ph-x weight="light" />
        </a>
        <product-quick-view :product="product" />
      </div>
    </modal>
  </div>
</template>
<script lang="ts" setup>
import { PhX } from '@phosphor-icons/vue';
defineProps<{ product: ProductsMapped }>();

const state = reactive({
  rating: 5,
  modal: false,
  preload: false,
  isImageLoaded: false,
  quickView: false,
});

const handleQuickView = (open: boolean) => (state.quickView = open);
</script>

<style scoped>
.product {
  @apply box-border p-[20px_20px_0] relative block box-border border border-transparent max-w-[250px] transition ease hover:(border border-gray-300);
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

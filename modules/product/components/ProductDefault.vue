<template >
  <!-- ps-product -->
  <div
    class="box-border p-[20px_20px_0] relative block box-border border border-transparent max-w-[250px] transition ease hover:(border border-gray-300)">
    <!-- ps-product__thumbnail -->
    <div class="relative overflow-hidden header-wrapper">
      <product-thumbnail-image :product="product" />
      <!-- <div v-if="isSale === true" class="ps-product__badge">Sale</div> -->
      <product-actions :product="product" @quick-view="handleQuickView" />
    </div>
    <div class="ps-product__container">
      <div class="ps-product__content">
        <product-title :product="product" />
        <product-price :product="product" />
      </div>
      <!-- <div class="ps-product__content hover hidden">
        <product-title :product="product" />
        <product-price :product="product" />
      </div> -->
    </div>
    <modal v-model="state.quickView">
      <div class="p-4 relative lg:p-8">
        <a class="absolute top-3 right-4 cursor-pointer" @click="state.quickView = false"><i
            class="icon icon-cross"></i></a>
        <product-quick-view :product="product" />
      </div>
    </modal>
  </div>
</template>
<script lang="ts" setup>
defineProps<{ product: Product; }>();
// const isSale = computed(() => !!props.product.attributes.sale_price);
const state = reactive({
  rating: 5,
  modal: false,
  preload: false,
  isImageLoaded: false,
  quickView: false,
});

const handleQuickView = (open: boolean) => state.quickView = open;
</script>

<style lang="scss">
.header-wrapper:hover>ul {
  transform: translate(-50%, 0);
}
</style>

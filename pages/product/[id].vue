<script lang="ts" setup>
import { injectKeys } from '~/config/constants';
import { GetProductById } from '~/graphql/queries';

definePageMeta({
  pageTransition: {
    name: 'page',
  },
});

const { $notify } = useNuxtApp();
const graphql = useStrapiGraphQL();
const route = useRoute();

const id = route.params.id as string;
const isLoading = ref(false);
const product = ref<Product>();

const loadProductById = async () => {
  try {
    isLoading.value = true;

    const { data } = await graphql<ProductRequest>(GetProductById, {
      id,
    });

    product.value = mapperData(data.products.data[0]);
  } catch (error) {
    $notify({
      group: 'all',
      title: 'Error',
      text: 'Hubo un problema al intentar cargar el producto',
    });
  } finally {
    isLoading.value = false;
  }
};

provide(injectKeys.productDetail, product as Ref<Product>);

onMounted(() => {
  loadProductById();
});
</script>

<template>
  <div class="wrapper">
    <transition name="page">
      <product-detail v-if="product" />
    </transition>
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex justify-center w-full min-h-full md:justify-start lg:(mt-12);
}
</style>

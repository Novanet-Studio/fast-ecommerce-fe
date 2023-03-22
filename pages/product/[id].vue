<template>
  <div class="flex w-full min-h-full mt-12">
    <div class="product2">
      <product-detail-fullwidth v-if="state.product" :product="state.product" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getProductById as GetProductById } from '~/graphql';

definePageMeta({
  pageTransition: {
    name: 'page',
  },
});

type State = {
  productId: string;
  pageLoading: boolean;
  product: ProductsMapped | null;
};

const { $store, $notify } = useNuxtApp();
const graphql = useStrapiGraphQL();
const route = useRoute();
const global = $store.global();

const state = reactive<State>({
  productId: route.params.id as string,
  pageLoading: true,
  product: null,
});

const loadProductById = async () => {
  try {
    state.pageLoading = true;

    const { data } = await graphql<ProductsResponse>(GetProductById, {
      id: state.productId,
    });

    state.product = mapperData(data.products.data[0]);
  } catch (error) {
    $notify({
      group: 'all',
      title: 'Error',
      text: 'Hubo un problema al intentar cargar el producto',
    });
  } finally {
    state.pageLoading = false;
  }
};

onMounted(() => {
  loadProductById();
  global.appDrawer = false;
});
</script>

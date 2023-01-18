<template>
  <div>
    <!-- <bread-crumb :items="state.breadCrumb" layout="fullwidth" /> -->
    <div class="product">
      <div class="product__container">
        <div class="product__page-container">
          <div class="product__page-left">
            <product-detail-fullwidth
              v-if="state.product"
              :product="state.product"
            />
          </div>
          <div class="product__page-right"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getProductById as GetProductById } from '~/graphql';

definePageMeta({
  pageTransition: {
    name: 'zoom',
  },
});

type State = {
  productId: string;
  pageLoading: boolean;
  product: Product | null;
};

const { $store, $notify } = useNuxtApp();
const graphql = useStrapiGraphQL();
const route = useRoute();
const global = $store.global();

const state = reactive<State>({
  productId: route.params.id as string,
  // breadCrumb: null,
  pageLoading: true,
  product: null,
});

// state.breadCrumb = [
//   {
//     text: 'Volver',
//     url: '/',
//   },
// ];

const loadProductById = async () => {
  try {
    state.pageLoading = true;

    const { data } = await graphql<ProductsResponse>(GetProductById, {
      id: state.productId,
    });

    state.product = data.products.data[0];
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

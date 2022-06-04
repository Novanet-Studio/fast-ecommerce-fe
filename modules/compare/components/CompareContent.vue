<template>
  <div class="ps-compare ps-section--shopping">
    <div class="container">
      <div class="ps-section__header">
        <h1>Compare Product</h1>
      </div>
      <div class="ps-section__content">
        <div class="table-responsive" id="table-compare">
          <table class="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Vendor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="product.compareItems">
                <tr v-for="productItem in product.compareItems" :key="productItem.id">
                  <td width="400px">
                    <product-shopping-cart :product="productItem" />
                  </td>
                  <td>{{ productItem.price }}</td>
                  <td>{{ productItem.vendor }}</td>
                  <td>
                    <button class="btn btn--error" @click.prevent="handleRemoveItemFromCompareList(productItem)">
                      Remove
                    </button>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <div></div>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCompare } from "~/store/compare";
import { useProduct } from "~/store/product";

const { $notify } = useNuxtApp();
const compare = useCompare();
const product = useProduct();

const handleRemoveItemFromCompareList = (product) => {
  compare.removeItemFromCompare(product);
  loadCompareProducts();
  $notify({
    group: 'all',
    title: 'Remove Item!',
    text: `${product.title} has been removed from your wishlist!`
  });
}

const loadCompareProducts = async () => {
  if (!compare) return;

  const itemsId = compare.items.map((item) => item.id);
  if (!itemsId.length) return;

  await product.getCompareProducts(itemsId);
}
</script>

<style lang="scss" scoped>
#table-compare {
  tbody {
    tr {
      td {
        width: 100px;

        &:first-child {
          width: 400px;
        }
      }
    }
  }
}
</style>

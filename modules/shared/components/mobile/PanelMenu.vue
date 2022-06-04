<template>
  <div class="ps-panel--sidebar">
    <div class="ps-panel__header">
      <h3>Menu</h3>
      <a href="#" class="ps-panel__close" @click.prevent="handleClosePanel">
        <i class="icon icon-cross"></i>
      </a>
    </div>
    <br>
    <ul class="menu--mobile">
      <li>
        <nuxt-link to="/" @click="handleClosePanel">
          Inicio
        </nuxt-link>
      </li>
    </ul>
    <!-- <v-list class="menu--mobile">
      <v-list-item>
        <v-list-item-content>
          <nuxt-link to="/" @click="handleClosePanel">
            Inicio
          </nuxt-link>
        </v-list-item-content>
      </v-list-item>
      <template v-for="categoria in categories">
        <v-list-group v-if="categoria.attributes.name != 'Inicio'" no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <nuxt-link to="/" @click="handleClosePanel">
                {{ categoria.attributes.name }}
              </nuxt-link>
            </v-list-item-content>
          </template>
          <v-list> 
            <template v-for="producto in products">
              <div v-if="categoria.id == producto.attributes.category.data.id">
                <template>
                  <v-list-item-content>
                    <nuxt-link :to="`/product/${producto.id}`" @click="handleClosePanel" class="productCart">
                      {{ producto.attributes.name }}
                    </nuxt-link>
                  </v-list-item-content>
                </template>
              </div>
            </template>
          </v-list>
        </v-list-group>
      </template>
    </v-list> -->
  </div>
</template>

<script lang="ts" setup>
import { useApp } from '~/store/app';

const app = useApp();

const handleClosePanel = () => {
  app.currentDrawerContent = null;
  app.appDrawer = false;
}

const loadCategories = () => console.log('loading categories');
const loadProducts = () => console.log('Loading products');

onMounted(() => {
  loadCategories();
  loadProducts();
})
</script>

<style lang="scss" scoped>
.productCart {
  margin-left: 35px !important;
}
</style>

<template>
  <div class="lg:ml-8">
    <div class="address">
      <div class="address__content">
        <figure>
          <figcaption class="address__figcaption">
            Dirección de facturación
          </figcaption>
          <template v-if="hasBilling">
            <div>
              <p class="address__text">
                ¿Deseas actualizar tu dirección de facturación?
              </p>
              <nuxt-link class="address__link" to="/edit-address?add=billing">
                Actualizar
              </nuxt-link>
            </div>
          </template>
          <template v-else>
            <div>
              <p class="address__text">
                No has registrado ningun dirección de facturación
              </p>
              <nuxt-link class="address__link" to="/edit-address?add=billing">
                Agregar
              </nuxt-link>
            </div>
          </template>
        </figure>
      </div>
      <div class="address__content">
        <figure>
          <figcaption class="address__figcaption">
            Dirección de envío
          </figcaption>
          <template v-if="hasShipping">
            <div>
              <p class="address__text">
                ¿Deseas actualizar tu dirección de envío?
              </p>
              <nuxt-link class="address__link" to="/edit-address?add=shipping">
                Actualizar
              </nuxt-link>
            </div>
          </template>
          <template v-else>
            <div>
              <p class="address__text">
                No has registrado ningun dirección de envío
              </p>
              <nuxt-link class="address__link" to="/edit-address?add=shipping">
                Agregar
              </nuxt-link>
            </div>
          </template>
        </figure>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'layout-account',
  middleware: 'authentication',
});

const { $store } = useNuxtApp();
const checkout = $store.checkout();
const { hasBilling, hasShipping } = checkout.checkAddressType();
</script>

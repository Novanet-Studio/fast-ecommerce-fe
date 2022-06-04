<template>
  <div class="ps-checkout ps-section--shopping">
    <div class="container">
      <div class="ps-section__header">
        <h1>Shipping Information</h1>
      </div>
      <div class="ps-section__content">
        <div class="row">
          <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12">
            <div class="ps-block--shipping">
              <div class="ps-block__panel">
                <figure>
                  <small>Contact</small>
                  <p>{{ email }}</p>
                  <nuxt-link to="/checkout">
                    <a>Change</a>
                  </nuxt-link>
                </figure>
                <figure>
                  <small>Ship to</small>
                  <p>
                    {{ fullAddress }}
                  </p>
                  <nuxt-link to="/checkout">
                    <a>Change</a>
                  </nuxt-link>
                </figure>
              </div>
              <!-- <h4>Shipping Method</h4>
              <div class="ps-block__panel">
                <figure>
                  <small>
                    International Shipping
                  </small>
                  <strong>$20.00</strong>
                </figure>
              </div> -->
              <div class="ps-block__footer">
                <nuxt-link to="/checkout">
                  <a>
                    <i class="icon-arrow-left mr-2"></i>
                    Regresar
                  </a>
                </nuxt-link>
                <nuxt-link to="/payment" class="ps-btn">
                  Continuar para el pago
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
            <order-summary :shipping="false" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCheckout } from '~/store/checkout';

const checkout = useCheckout();

const email = computed(() => checkout.email);
const fullAddress = computed(() => `${checkout.address}, ${checkout.city}, ${checkout.zipCode}`);
</script>


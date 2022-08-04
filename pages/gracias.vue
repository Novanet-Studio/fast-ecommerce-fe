<template lang="html">
  <div class="ps-page--single">
    <bread-crumb :breadcrumb="breadCrumb" />
    <div class="ps-page--404">
      <div class="container">
        <div class="ps-section__content">
          <figure>
            <img src="~/static/img/gracias.jpg" alt="" />
            <h3>¡Gracias por contactarnos!</h3>
            <p>
              Le responderemos a la brevedad posible.
              <nuxt-link to="/" class="gracias-link">
                Regresar al inicio
              </nuxt-link>
            </p>
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "~/components/elements/BreadCrumb";

export default {
  name: "page-404",
  components: {
    BreadCrumb,
  },
  transition: "zoom",
  data: () => {
    return {
      breadCrumb: [
        {
          text: "Inicio",
          url: "/",
        },
        {
          text: "Gracias",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>

</style>

<template lang="html">
  <div class="ps-contact-form">
    <div class="container">
      <form
        class="ps-form--contact-us"
        name="contacto"
        v-on:submit.prevent="handleSubmit"
        action="/gracias/"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <h3>Envíanos un mensaje</h3>
        <input type="hidden" name="form-name" value="contacto" />
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
            <div class="form-group">
              <input
                class="form-control"
                type="text"
                name="nombre"
                v-model="formData.usuario"
                placeholder="Nombre y Apellido *"
              />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
            <div class="form-group">
              <input
                class="form-control"
                type="email"
                name="email"
                v-model="formData.email"
                placeholder="Email *"
              />
            </div>
          </div>
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
            <div class="form-group">
              <input
                class="form-control"
                type="text"
                name="nombre"
                v-model="formData.asunto"
                placeholder="Asunto *"
              />
            </div>
          </div>
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
            <div class="form-group">
              <textarea
                class="form-control"
                rows="5"
                name="mensaje"
                v-model="formData.mensaje"
                placeholder="Mensaje"
              />
            </div>
          </div>
        </div>
        <div class="form-group submit">
          <input class="ps-btn" type="submit" value="Enviar" />
          <input type="hidden" name="form-name" value="inicio" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactForm",
  data() {
    return {
      formData: {},
    };
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&");
    },
    handleSubmit(e) {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: this.encode({
          "form-name": e.target.getAttribute("name"),
          ...this.formData,
        }),
      })
        .then(() => this.$router.push("/contacto"))
        .catch((error) => alert(error));
    },
  },
};
</script>

<style lang="scss" scoped></style>

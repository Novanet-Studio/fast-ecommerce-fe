<template lang="html">
  <div class="ps-form__billing-info">
    <h3 class="ps-form__heading">
      Información de contacto
    </h3>
    <form action>
      <div class="form-group">
        <label>Email<sup style="color: red">*</sup></label>
        <v-text-field
          v-model="email"
          placeholder="Email"
          outlined
          height="50"
        />
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label>Nombre</label>
            <v-text-field
              v-model="name"
              class="info-input"
              placeholder="Nombre"
              outlined
              height="50"
            />
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <label>Apellido</label>
            <v-text-field
              v-model="lastName"
              placeholder="Apellido"
              outlined
              height="50"
            />
          </div>
        </div>
      </div>
      <h3 class="ps-form__heading">
        Informacion de envio
      </h3>
      <div class="form-group">
        <label>Dirección</label>
        <v-text-field
          v-model="address"
          placeholder="Dirección"
          outlined
          height="50"
        />
      </div>
      <div class="form-group">
        <label>Apartamento</label>
        <v-text-field
          v-model="home"
          placeholder="Apartamento, casa, etc."
          outlined
          height="50"
        />
      </div>
      <div class="form-group">
        <label> Pais<sup style="color: red">*</sup></label>
        <select
          class="form-control"
          v-model="country"
          placeholder="Pais"
          outlined
          height="50"
        >
          <option class="form-control" selected disabled
            >-- selecciona un pais --</option
          >
          <option
            class="form-control"
            v-for="country in countries"
            :value="country.code"
          >
            {{ country.name }}
          </option>
        </select>
      </div>
      <br />
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label>Ciudad</label>
            <v-text-field
              v-model="city"
              placeholder="Ciudad"
              outlined
              height="50"
            />
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <label>Codigo Postal</label>
            <v-text-field
              v-model="zipCode"
              placeholder="Codigo Postal"
              outlined
              height="50"
            />
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <label>Numero de contacto</label>
            <v-text-field
              v-model="phone"
              placeholder="Numero de contacto"
              outlined
              height="50"
            />
          </div>
        </div>
      </div>
      <!-- <div class="form-group">
                <v-checkbox
                    color="success"
                    label="Guardar esta información"
                />
            </div> -->
      <div class="ps-form__submit">
        <!-- <nuxt-link to="/account/shopping-cart">
                    <i class="icon-arrow-left mr-1"></i>
                    Regresar al carrito de compra
                </nuxt-link> -->
        <div class="ps-block__footer">
          <button class="ps-btn" @click.prevent="handleToShipping">
            Continuar
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { email, required } from "vuelidate/lib/validators";
import countries from "~/static/data/countries.json";

export default {
  name: "FormCheckoutInformation",
  computed: {
    user() {
      return this.$cookies.get("auth").user;
    },
  },
  data() {
    return {
      name: null,
      lastName: null,
      email: null,
      address: null,
      home: null,
      city: null,
      zipCode: null,
      country: null,
      phone: null,
      countries,
    };
  },
  validations: {
    email: { required, email },
    lastName: { required },
    name: { required },
    address: { required },
    home: { required },
    city: { required },
    zipCode: { required },
    phone: { required },
    country: { required },
  },
  async mounted() {
    this.formInfoCookie();
    this.hasShipping();
  },

  methods: {
    async handleToShipping() {
      if (this.$v.$invalid) {
        this.$notify({
          group: "all",
          title: "¡Error!",
          text: "Por favor, rellene los campos obligatorios",
        });
        return;
      }

      const data = {
        email: this.email,
        name: this.name,
        lastName: this.lastName,
        address: this.address,
        home: this.home,
        city: this.city,
        zipCode: this.zipCode,
        phone: this.phone,
        home: this.home,
        country: this.country,
      };
      this.$store.dispatch("checkout/shippingInfo", data);
      this.$router.push("/account/shipping");
    },

    async formInfoCookie() {
      const data = this.$cookies.get("shippingInfo");
      if (typeof data !== "undefined") {
        if (data.hasOwnProperty("email")) {
          // this.address = data.address;
          // this.city = data.city;
          this.email = data.email;
          // this.home = data.home;
          this.lastName = data.lastName;
          this.name = data.name;
          // this.zipCode = data.zipCode;
          // this.phone = data.phone;
          // this.home = data.aptm;
        }
        console.log("==> ship", data);
      } else {
        console.log("llamar funcion en strapi para la direccion");
        // this.hasShipping()
      }
    },
    async hasShipping() {
      const type = "shipping";
      const userId = this.user.id;

      const data = {
        userId: userId,
        type: type,
      };

      await this.$store
        .dispatch("checkout/getAddress", data)
        .then((res) => {
          if (res.length > 0) {
            const data = res[0].attributes.address;
            this.address = `${data.direccion}`;
            this.city = data.estado;
            this.zipCode = data.zipcode;
            this.phone = data.telefono;
            this.home = data.aptm;
            this.country = data.pais;
          }
        })
        .catch((error) => {
          console.log("error address", error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.form-group {
  margin-bottom: 1rem;
}
</style>

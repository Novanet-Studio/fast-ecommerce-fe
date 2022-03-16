<template lang="html">
    <div class="ps-form__billing-info">
        <h3 class="ps-form__heading">
            Contact information
        </h3>
        <div class="form-group">
            <label>Email or numero telefonico<sup>*</sup></label>
            <v-text-field
                placeholder="Email or numero telefonico"
                outlined
                height="50"
            />
        </div>
        <div class="form-group">
            <v-checkbox
                color="success"
                label="Quiero recibir más ofertas?"
            />
        </div>
        <h3 class="ps-form__heading">
            Informacion de envio
        </h3>
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <label>Nombre</label>
                    <v-text-field
                        placeholder="Nombre"
                        outlined
                        height="50"
                    />
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <label>Apellido </label>
                    <v-text-field
                        placeholder="Apellido"
                        outlined
                        height="50"
                    />
                </div>
            </div>
        </div>
        <div class="form-group">
            <label>Dirección</label>
            <v-text-field placeholder="Dirección" outlined height="50" />
        </div>
        <div class="form-group">
            <label>Apartamento</label>
            <v-text-field
                placeholder="Apartamento, casa, etc. (opcional)"
                outlined
                height="50"
            />
        </div>
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <label>Ciudad</label>
                    <v-text-field placeholder="Ciudad" outlined height="50" />
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <label>Codigo Postal</label>
                    <v-text-field
                        placeholder="Codigo Postal"
                        outlined
                        height="50"
                    />
                </div>
            </div>
        </div>
        <div class="form-group">
            <v-checkbox
                color="success"
                label="Guardar esta información"
            />
        </div>
        <div class="ps-form__submit">
            <nuxt-link to="/account/shopping-cart">
                <i class="icon-arrow-left mr-1"></i>
                Regresar al carrito de compra
            </nuxt-link>
            <div class="ps-block__footer">
                <button class="ps-btn" @click="handleToShipping">
                    Continuar comprando
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FormCheckoutInformation',
    methods: {
        handleToShipping() {
            this.$router.push('/account/shipping');
        }
    }
};
</script>

<style lang="scss" scoped></style>

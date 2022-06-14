<template lang="html">

    <div class="ps-section--account-setting">
        <div class="ps-section__content">
            <div class="row">
                <div class="col-md-6 col-12">
                    <figure class="ps-block--address">
                        <figcaption>
                            Billing address
                        </figcaption>
                        <div class="ps-block__content" v-if="userHasBilling === false">
                            <p >
                                No has registrado ningun billing address
                            </p>
                            <nuxt-link
                                to="/account/edit-address?add=bill"
                            >
                                <a>Agregar</a>
                            </nuxt-link>
                        </div>
                        <div class="ps-block__content" v-if="userHasBilling  === true">
                            <p >
                                ¿Deseas actualizar tu billing Address?
                            </p>
                            <nuxt-link
                                to="/account/edit-address?add=bill"
                            >
                                <a>Actualizar</a>
                            </nuxt-link>
                        </div>
                    </figure>
                </div>
                <div class="col-md-6 col-12">
                    <figure class="ps-block--address">
                        <figcaption>
                            Shipping address
                        </figcaption>
                        <div class="ps-block__content" v-if="userHasShipping === false">
                            <p >
                                No has registrado ningun shipping address
                            </p>
                            <nuxt-link
                                to="/account/edit-address?add=shipp"
                            >
                                <a>Agregar</a>
                            </nuxt-link>
                        </div>
                        <div class="ps-block__content" v-if="userHasShipping  === true">
                            <p >
                                ¿Deseas actualizar tu shipping Address?
                            </p>
                            <nuxt-link
                                to="/account/edit-address?add=shipp"
                            >
                                <a>Actualizar</a>
                            </nuxt-link>
                        </div>
                    </figure>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Addresses',
    data(){
        return {
            userHasBilling: false,
            userHasShipping: false
        }

    },
    computed: {
        user(){
            return this.$cookies.get('auth').user;
        },
    },
    mounted(){
        console.log(this.user)
        this.hasBilling();
        this.hasShipping();
    },
    methods: {
        async hasBilling(){
            const type = 'billing';
            const userId = this.user.id;

            const data = {
                userId: userId,
                type: type
            }

            await this.$store.dispatch('checkout/getAddress', data ).then(res => {
                console.log(res)
                if(res.length > 0){
                    this.userHasBilling = true;
                }
            }).catch(error => {
                console.log('error address', error)
            })
        },
        async hasShipping(){
            const type = 'shipping';
            const userId = this.user.id;

            const data = {
                userId: userId,
                type: type
            }

            await this.$store.dispatch('checkout/getAddress', data ).then(res => {
                console.log(res)
                if(res.length > 0){
                    this.userHasShipping = true;
                }
            }).catch(error => {
                console.log('error address', error)
            })
        }
    }

};
</script>

<style lang="scss" scoped></style>

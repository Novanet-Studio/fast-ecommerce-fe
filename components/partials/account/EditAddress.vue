<template lang="html">
    <div class="ps-page__content">
        <div class="ps-section--account-setting">
            <div class="ps-section__header">
                <h3>Direccion</h3>
            </div>
            <div class="ps-section__content">
                <FormEditAddress :tipo="tipo" />
            </div>
        </div>
    </div>
</template>

<script>
import AsideAccount from './modules/AsideAccount';
import FormEditAddress from '~/components/partials/account/modules/FormEditAddress';

export default {
    name: 'EditAddress',
    props: ['tipo'], 
    components: { AsideAccount, FormEditAddress },


};
</script>

<style lang="scss" scoped></style>

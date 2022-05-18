<template lang="html">
    <section class="ps-page--my-account">
        <bread-crumb :breadcrumb="breadCrumb" />
        <div class="ps-my-account">
            <div class="container">
                <div class="ps-form--account">
                    <ul class="ps-tab-list">
                        <li class="active">
                            <nuxt-link to="/account/login">
                                Iniciar Sesión
                            </nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/account/register">
                                Registrarse
                            </nuxt-link>
                        </li>
                    </ul>
                    <div class="ps-tab active">
                        <login />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import Login from '~/components/partials/account/Login';
import HeaderMobile from '~/components/shared/mobile/HeaderMobile';

export default {
    components: {
        HeaderMobile,
        Login,
        BreadCrumb
    },
    transition: 'zoom',
    data: () => {
        return {
            breadCrumb: [
                {
                    text: 'Inicio',
                    url: '/'
                },
                {
                    text: 'Acceso'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped>
.ps-tab-list {
    padding-left: 0;
}
</style>

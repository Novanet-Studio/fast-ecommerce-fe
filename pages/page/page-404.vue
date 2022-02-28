<template lang="html">
    <div class="ps-page--single">
        <bread-crumb :breadcrumb="breadCrumb" />
        <div class="ps-page--404">
            <div class="container">
                <div class="ps-section__content">
                    <figure>
                        <img src="~/static/img/404.jpg" alt="" />
                        <h3>Ohh! Page not found</h3>
                        <p>
                            It seems we can't find what you're looking
                            for. Perhaps searching can help or go back
                            to
                            <nuxt-link to="/">
                                Homepage
                            </nuxt-link>
                        </p>
                    </figure>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BreadCrumb from '~/components/elements/BreadCrumb';

export default {
    name: 'page-404',
    components: {
        BreadCrumb
    },
    transition: 'zoom',
    data: () => {
        return {
            breadCrumb: [
                {
                    text: 'Home',
                    url: '/'
                },
                {
                    text: 'Page 404'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>

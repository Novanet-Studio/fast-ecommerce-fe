<template lang="html">
    <div class="ps-page--blog">
        <div class="container">
            <div class="ps-page__header">
                <h1>Our Press</h1>
                <bread-crumb2 :breadcrumb="breadCrumb" />
            </div>
            <blog-grid />
        </div>
    </div>
</template>

<script>
import BreadCrumb2 from '~/components/elements/BreadCrumb2';
import BlogGrid from '~/components/partials/blog/BlogGrid';
import HeaderMobile from '~/components/shared/mobile/HeaderMobile';

export default {
    transition: 'zoom',
    components: {
        BlogGrid,
        BreadCrumb2
    },

    data: () => {
        return {
            breadCrumb: [
                {
                    text: 'Home',
                    url: '/'
                },
                {
                    text: 'Blog'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>

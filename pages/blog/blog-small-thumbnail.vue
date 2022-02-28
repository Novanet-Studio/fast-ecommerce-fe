<template lang="html">
    <div class="ps-page--blog">
        <div class="container">
            <div class="ps-page__header">
                <h1>Our Press</h1>
                <bread-crumb2 :breadcrumb="breadCrumb" />
            </div>
            <blog-small-thumbnail />
        </div>
    </div>
</template>

<script>
import BreadCrumb2 from '~/components/elements/BreadCrumb2';
import BlogSmallThumbnail from '~/components/partials/blog/BlogSmallThumbnail';

export default {
    transition: 'zoom',
    components: {
        BlogSmallThumbnail,
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
                    text: 'Our Press'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>

<template lang="html">
    <div class="ps-page--404">
        <div class="container">
            <div class="ps-section__content">
                <figure v-if="error.statusCode === 404">
                    <img src="~/static/img/404.jpg" alt="" />
                    <h3>Ohh! Page not found</h3>
                    <p>
                        It seems we can't find what you're looking for.
                        <br />
                        Go back to
                        <a class="ps-highlight" href="/">Homepage</a>
                    </p>
                </figure>
                <figure v-else>
                    <p>
                        It seems we can't find what you're looking for.
                        <br />
                        Go back to
                        <a class="ps-highlight" href="/">Homepage</a>
                    </p>
                </figure>
            </div>
        </div>
    </div>
</template>
<script>
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import FooterDefault from '~/components/shared/footers/FooterDefault';
export default {
    components: { FooterDefault, HeaderDefault },
    layout: 'empty',
    props: {
        error: {
            type: Object,
            default: null
        }
    },
    head() {
        const title =
            this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
        return {
            title
        };
    },

    data() {
        return {
            pageNotFound: '404 Not Found',
            otherError: 'An error occurred'
        };
    }
};
</script>

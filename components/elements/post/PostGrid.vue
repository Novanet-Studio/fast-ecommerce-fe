<template lang="html">
    <article class="ps-post">
        <div class="ps-post__thumbnail">
            <nuxt-link :to="`/post/${post.id}`" class="ps-post__overlay" />
            <img :src="post.thumbnail" :alt="post.title" />
        </div>
        <div class="ps-post__content">
            <div class="ps-post__meta">
                <nuxt-link
                    v-for="category in post.categories"
                    to="/blog"
                    :key="category.id"
                >
                    {{ category.text }}
                </nuxt-link>
            </div>
            <nuxt-link :to="`/post/${post.id}`" class="ps-post__title">
                {{ post.title }}
            </nuxt-link>
            <p>
                December 17, 2019 by
                <nuxt-link to="/blog">
                    drfurion
                </nuxt-link>
            </p>
        </div>
    </article>
</template>
<script>
export default {
    props: {
        post: {
            type: Object,
            default: {}
        }
    }
};
</script>

<template lang="html">
    <article class="ps-post ps-post--small-thumbnail">
        <div class="ps-post__thumbnail">
            <nuxt-link
                :to="`/blog/${post.id}`"
                class="ps-post__overlay"
            ></nuxt-link>
            <img :src="post.thumbnail" :alt="post.title" />
            <div v-if="post.badge" class="ps-post__badge">
                <i class="{post.badge}"></i>
            </div>
        </div>
        <div class="ps-post__content">
            <div class="ps-post__top">
                <div class="ps-post__meta">
                    <nuxt-link
                        v-for="category in post.categories"
                        to="/blog"
                        :key="category.id"
                    >
                        {{ category.text }}
                    </nuxt-link>
                </div>
                <nuxt-link :to="`/blog/${post.id}`" class="ps-post__title">
                    {{ post.title }}
                </nuxt-link>
                <div class="ps-post__desc">
                    <p>
                        Lorem ipsum dolor sit amet, dolor siterim consectetur
                        adipiscing elit. Phasellus duio faucibus est sed…
                    </p>
                </div>
            </div>
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

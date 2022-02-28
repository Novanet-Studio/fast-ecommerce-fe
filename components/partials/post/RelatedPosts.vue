<template>
    <div class="ps-related-posts">
        <h3>Related Posts</h3>
        <div class="row">
            <div
                v-for="post in posts"
                class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12"
                :key="post.id"
            >
                <post-grid :post="post" />
            </div>
        </div>
    </div>
</template>

<script>
import { relatedPosts } from '~/static/data/posts';
import PostGrid from '../../elements/post/PostGrid';

export default {
    name: 'RelatedPosts',
    components: { PostGrid },
    data() {
        return {
            posts: relatedPosts
        };
    }
};
</script>

<style scoped></style>

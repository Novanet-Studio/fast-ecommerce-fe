<template lang="html">
    <div class="ps-blog">
        <div class="ps-blog__header">
            <BlogLinks />
        </div>
        <div class="ps-blog__content">
            <div className="ps-box--posts">
                <post-horizontal
                    v-for="post in blogListPosts"
                    :post="post"
                    :key="post.id"
                />
                <PostHorizontal />
            </div>
            <pagination />
        </div>
    </div>
</template>

<script>
import Pagination from '../../elements/Pagination';
import BlogLinks from './modules/BlogLinks';
import { posts } from '~/static/data/blog-grid.json';
import PostHorizontal from '../../elements/post/PostHorizontal';

export default {
    name: 'BlogList',
    components: { PostHorizontal, BlogLinks, Pagination },
    data() {
        return {
            blogListPosts: posts
        };
    }
};
</script>

<style lang="scss" scoped></style>

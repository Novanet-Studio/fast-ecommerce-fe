<template lang="html">
    <div class="ps-blog">
        <div class="ps-blog__header">
            <BlogLinks />
        </div>
        <div class="ps-blog__content">
            <div class="row">
                <div
                    v-for="post in blogGridPosts"
                    class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12"
                    :key="post.id"
                >
                    <PostGrid :post="post" />
                </div>
            </div>
            <Pagination />
        </div>
    </div>
</template>

<script>
import Pagination from '../../elements/Pagination';
import BlogLinks from './modules/BlogLinks';
import { posts } from '~/static/data/blog-grid.json';
import PostGrid from '../../elements/post/PostGrid';

export default {
    name: 'BlogGrid',
    components: { PostGrid, BlogLinks, Pagination },
    data() {
        return {
            blogGridPosts: posts
        };
    }
};
</script>

<style lang="scss" scoped></style>

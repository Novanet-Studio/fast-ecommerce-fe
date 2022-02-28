<template lang="html">
    <div class="ps-blog--sidebar">
        <div class="ps-blog__left">
            <PostSmallThumbnail
                v-for="post in blogPosts"
                :post="post"
                :key="post.id"
            />
            <Pagination />
        </div>
        <div class="ps-blog__right">
            <Sidebar />
        </div>
    </div>
</template>

<script>
import Pagination from '../../elements/Pagination';
import Sidebar from './modules/Sidebar';
import PostHorizontal from '../../elements/post/PostHorizontal';
import PostSmallThumbnail from '../../elements/post/PostSmallThumbnail';
import { posts } from '~/static/data/blog-grid.json';
export default {
    name: 'BlogSmallThumbnail',
    components: { PostSmallThumbnail, PostHorizontal, Sidebar, Pagination },
    data() {
        return {
            blogPosts: posts
        };
    }
};
</script>

<style lang="scss" scoped></style>

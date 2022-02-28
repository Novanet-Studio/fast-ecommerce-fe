<template lang="html">
    <div class="ps-page--blog">
        <div class="container">
            <div class="ps-blog--sidebar reverse">
                <div class="ps-blog__left">
                    <post-detail-sidebar />
                </div>
                <div class="ps-blog__right">
                    <sidebar-post />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import PostComments from '~/components/partials/post/PostComments';
import RelatedPosts from '~/components/partials/post/RelatedPosts';
import PostDetailDefault from '~/components/partials/post/PostDetailDefault';
import PostDetailSidebar from '~/components/partials/post/PostDetailSidebar';

export default {
    name: 'post-detail-4',
    components: {
        PostDetailSidebar,
        PostDetailDefault,
        RelatedPosts,
        PostComments,
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
                    text: 'Blog Detail'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>

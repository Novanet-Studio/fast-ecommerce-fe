<template lang="pug">
    .ps-blog__sidebar
        aside.widget.widget--blog.widget--search
            form(action="blog-sidebar.html" class="ps-form--widget-search" @submit.prevent)
                button: i.icon.feather.icon-search
                input.form-control(type="text" placeholder="Search...")
        aside.widget.widget--blog.widget--categories
            h3.widget__title Categories
            ul.ps-list--plus.ps-list--line-effect
                li(v-for="category, index in widgetCategories" :to="category.url" :key="index")
                    nuxt-link(to='/blog') {{ category.text }}
        aside.widget.widget--blog.widget--recent-post
            h3.widget__title Recent Posts
            .widget__content
                PostSidebar(v-for="post in newPosts" :key="post.id" :post="post")
        aside.widget.widget--blog.widget--tags
            h3.widget__title Tags
            .widget__content
                nuxt-link(v-for="tag, index in widgetTags" :to="tag.url" :key="index") {{ tag.text }}
</template>

<script>
import { mapGetters } from 'vuex';
import PostSidebar from '~/components/elements/post/PostSidebar';
export default {
    components: { PostSidebar },
    data: () => {
        return {
            widgetCategories: [
                {
                    text: 'All',
                    url: '/blog'
                },
                {
                    text: 'PC News',
                    url: '/blog'
                },
                {
                    text: 'Review',
                    url: '/blog'
                },
                {
                    text: 'Events',
                    url: '/blog'
                },
                {
                    text: 'Sales',
                    url: '/blog'
                },
                {
                    text: 'Giveaway Event',
                    url: '/blog'
                }
            ],
            widgetTags: [
                {
                    text: 'PC',
                    url: '/blog'
                },
                {
                    text: 'Laptop',
                    url: '/blog'
                },
                {
                    text: 'Ram',
                    url: '/blog'
                },
                {
                    text: 'VGA',
                    url: '/blog'
                },
                {
                    text: 'SSD',
                    url: '/blog'
                },
                {
                    text: 'Keyboard',
                    url: '/blog'
                },
                {
                    text: 'Camera',
                    url: '/blog'
                }
            ]
        };
    },
    computed: {
        ...mapGetters({
            newPosts: 'blog/getNewestPost'
        })
    }
};
</script>

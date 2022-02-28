<template lang="html">
    <div class="sidebar">
        <aside class="widget widget--blog widget--search">
            <form
                class="ps-form--widget-search"
                action="do_action"
                method="get"
            >
                <input
                    class="form-control"
                    type="text"
                    placeholder="Search..."
                />
                <button>
                    <i class="icon-magnifier"></i>
                </button>
            </form>
        </aside>
        <aside class="widget widget--blog widget--categories">
            <h3 class="widget__title">Categories</h3>
            <div class="widget__content">
                <ul>
                    <li v-for="category in blogCategories" :key="category.id">
                        <nuxt-link to="/blog">
                            {{ category.text }}
                        </nuxt-link>
                    </li>
                </ul>
            </div>
        </aside>
        <aside class="widget widget--blog widget--recent-post">
            <h3 class="widget__title">Recent Posts</h3>
            <div class="widget__content">
                <template v-if="recentPosts.length > 0">
                    <nuxt-link
                        v-for="post in recentPosts"
                        :to="`/post/${post.id}`"
                        :key="post.id"
                    >
                        {{ post.title }}
                    </nuxt-link>
                </template>
                <p v-else>No post.</p>
            </div>
        </aside>

        <aside class="widget widget--blog widget--recent-comments">
            <h3 class="widget__title">Recent Comments</h3>
            <div class="widget__content">
                <p>
                    <nuxt-link to="/blog">
                        <a class="author">drfurion</a>
                    </nuxt-link>
                    on
                    <nuxt-link to="/blog">
                        <a> Dashboard</a>
                    </nuxt-link>
                </p>
                <p>
                    <nuxt-link to="/blog">
                        <a class="author">logan</a>
                    </nuxt-link>
                    on
                    <nuxt-link to="/blog">
                        <a> Rayban Rounded Sunglass Brown Color</a>
                    </nuxt-link>
                </p>
                <p>
                    <nuxt-link to="/blog">
                        <a class="author">logan</a>
                    </nuxt-link>
                    on
                    <nuxt-link to="/blog">
                        <a> Sound Intone I65 Earphone White Version</a>
                    </nuxt-link>
                </p>
                <p>
                    <nuxt-link to="/blog">
                        <a class="author">logan</a>
                    </nuxt-link>
                    on
                    <nuxt-link to="/blog">
                        <a> Sleeve Linen Blend Caro Pane Shirt</a>
                    </nuxt-link>
                </p>
            </div>
        </aside>

        <aside class="widget widget--blog widget--tags">
            <h3 class="widget__title">Popular Tags</h3>
            <div class="widget__content">
                <nuxt-link
                    v-for="category in blogCategories"
                    to="/blog"
                    :key="category.id"
                >
                    {{ category.text }}
                </nuxt-link>
            </div>
        </aside>
    </div>
</template>

<script>
import blogGrid from '~/static/data/blog-grid.json';

export default {
    name: 'Sidebar',
    data() {
        return {
            blogCategories: blogGrid.categories,
            blogTags: blogGrid.categories,
            recentPosts: blogGrid.recentPosts
        };
    }
};
</script>

<style lang="scss" scoped></style>

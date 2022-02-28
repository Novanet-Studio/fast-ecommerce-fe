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
                <nuxt-link v-for="post in posts" to="/post/1" :key="post.id">
                    {{ post.title }}
                </nuxt-link>
            </div>
        </aside>
        <aside class="widget widget--blog widget--recent-comments">
            <h3 class="widget__title">Recent Comments</h3>
            <div class="widget__content">
                <p>
                    <nuxt-link to="/blog" class="author">
                        drfurion
                    </nuxt-link>
                    on
                    <nuxt-link to="/blog">
                        Dashboard
                    </nuxt-link>
                </p>
                <p>
                    <nuxt-link to="/blog" class="author">
                        logan
                    </nuxt-link>
                    on
                    <nuxt-link to="/blog">
                        Rayban Rounded Sunglass Brown Color
                    </nuxt-link>
                </p>
                <p>
                    <nuxt-link to="/blog" class="author">
                        logan
                    </nuxt-link>
                    on
                    <nuxt-link to="/blog">
                        Sound Intone I65 Earphone White Version
                    </nuxt-link>
                </p>
                <p>
                    <nuxt-link to="/blog" class="author">
                        logan
                    </nuxt-link>
                    on
                    <nuxt-link to="/blog">
                        Sleeve Linen Blend Caro Pane Shirt
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
                    key="category.id"
                >
                    {{ category.text }}
                </nuxt-link>
            </div>
        </aside>
    </div>
</template>

<script>
import blogData from '~/static/data/blog-grid.json';

export default {
    name: 'SidebarPost',
    computed: {
        blogCategories() {
            return blogData.blogCategories;
        },
        posts() {
            return blogData.posts;
        }
    }
};
</script>

<style lang="scss" scoped></style>

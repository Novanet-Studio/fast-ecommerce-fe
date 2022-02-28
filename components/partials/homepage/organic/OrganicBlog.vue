<template lang="html">
    <div class="ps-section--default ps-home-blog">
        <div class="container">
            <div class="ps-section__header">
                <h3>News</h3>
                <ul class="ps-section__links">
                    <li>
                        <nuxt-link to="/blog">
                            News
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/blog">
                            Review Products
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/blog">
                            Tips & Tricks
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/blog">
                            Promotions
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/blog">
                            Videos
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/blog">
                            See All
                        </nuxt-link>
                    </li>
                </ul>
            </div>
            <div class="ps-section__content">
                <div class="row">
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 ">
                        <div class="ps-post">
                            <div class="ps-post__thumbnail">
                                <a
                                    class="ps-post__overlay"
                                    href="blog-detail.html"
                                ></a>
                                <img
                                    src="~/static/img/blog/organic/1.jpg"
                                    alt="martfury"
                                />
                            </div>
                            <div class="ps-post__content">
                                <a class="ps-post__meta" href="#">
                                    Tips & Tricks
                                </a>
                                <a class="ps-post__title" href="#">
                                    How To Make A Fresh Juice Blended For Your
                                    Family?
                                </a>
                                <p>
                                    December 17, 2017 by<a href="#">
                                        drfurion</a
                                    >
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 ">
                        <div class="ps-post">
                            <div class="ps-post__thumbnail">
                                <div class="ps-post__badge">
                                    <i class="icon-volume-high"></i>
                                </div>
                                <a
                                    class="ps-post__overlay"
                                    href="blog-detail.html"
                                ></a>
                                <img
                                    src="~/static/img/blog/organic/2.jpg"
                                    alt="martfury"
                                />
                            </div>
                            <div class="ps-post__content">
                                <a class="ps-post__meta" href="#">
                                    Review Product
                                </a>
                                <a class="ps-post__title" href="#">
                                    Fresh Eggs From Caroline’s Farm
                                </a>
                                <p>
                                    December 17, 2017 by<a href="#">
                                        drfurion</a
                                    >
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 ">
                        <div class="ps-post">
                            <div class="ps-post__thumbnail">
                                <div class="ps-post__badge">
                                    <i class="icon-volume-high"></i>
                                </div>
                                <div class="ps-post__badge">
                                    <i class="icon-volume-high"></i>
                                </div>
                                <a
                                    class="ps-post__overlay"
                                    href="blog-detail.html"
                                ></a>
                                <img
                                    src="~/static/img/blog/organic/3.jpg"
                                    alt="martfury"
                                />
                            </div>
                            <div class="ps-post__content">
                                <a class="ps-post__meta" href="#">
                                    News
                                </a>
                                <a class="ps-post__title" href="#">
                                    Discover Fresh Organic Farms In Switzeland
                                    Villages
                                </a>
                                <p>
                                    December 17, 2017 by<a href="#">
                                        drfurion</a
                                    >
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OrganicBlog'
};
</script>

<style lang="scss" scoped></style>

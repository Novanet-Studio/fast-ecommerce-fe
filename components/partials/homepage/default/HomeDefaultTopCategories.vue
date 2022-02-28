<template lang="html">
    <div class="ps-top-categories">
        <div class="ps-container">
            <h3>{{ $t('autopart.topCategories') }}</h3>
            <div class="row">
                <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div class="ps-block--category">
                        <nuxt-link to="/shop">
                            <a class="ps-block__overlay"></a>
                        </nuxt-link>
                        <img
                            src="~/static/img/categories/1.jpg"
                            alt="martfury"
                        />
                        <p>Electronics</p>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div class="ps-block--category">
                        <nuxt-link to="/shop">
                            <a class="ps-block__overlay"></a>
                        </nuxt-link>
                        <img
                            src="~/static/img/categories/2.jpg"
                            alt="martfury"
                        />
                        <p>Clothings</p>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div class="ps-block--category">
                        <nuxt-link to="/shop">
                            <a class="ps-block__overlay"></a>
                        </nuxt-link>
                        <img
                            src="~/static/img/categories/3.jpg"
                            alt="martfury"
                        />
                        <p>Computers</p>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div class="ps-block--category">
                        <nuxt-link to="/shop">
                            <a class="ps-block__overlay"></a>
                        </nuxt-link>
                        <img
                            src="~/static/img/categories/4.jpg"
                            alt="martfury"
                        />
                        <p>Home & Kitchen</p>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div class="ps-block--category">
                        <nuxt-link to="/shop">
                            <a class="ps-block__overlay"></a>
                        </nuxt-link>
                        <img
                            src="~/static/img/categories/5.jpg"
                            alt="martfury"
                        />
                        <p>Health & Beauty</p>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div class="ps-block--category">
                        <nuxt-link to="/shop">
                            <a class="ps-block__overlay"></a>
                        </nuxt-link>
                        <img
                            src="~/static/img/categories/6.jpg"
                            alt="martfury"
                        />
                        <p>Health & Beauty</p>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div class="ps-block--category">
                        <nuxt-link to="/shop">
                            <a class="ps-block__overlay"></a>
                        </nuxt-link>
                        <img
                            src="~/static/img/categories/7.jpg"
                            alt="martfury"
                        />
                        <p>Jewelry & Watch</p>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div class="ps-block--category">
                        <nuxt-link to="/shop">
                            <a class="ps-block__overlay"></a>
                        </nuxt-link>
                        <img
                            src="~/static/img/categories/8.jpg"
                            alt="martfury"
                        />
                        <p>Technology Toys</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomeDefaultTopCategories'
};
</script>

<style lang="scss" scoped></style>

<template lang="html">
    <section class="ps-store-list">
        <div class="container">
            <div class="ps-section__header">
                <h3>Store list</h3>
            </div>
            <div class="ps-section__content">
                <div class="ps-section__search row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <button>
                                <i class="icon-magnifier"></i>
                            </button>
                            <input
                                class="form-control"
                                type="text"
                                placeholder="Search vendor..."
                            />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 ">
                        <article class="ps-block--store-2">
                            <div
                                class="ps-block__content bg--cover"
                                :style="{
                                    background:
                                        'url(/img/vendor/store/default-store-banner.png)'
                                }"
                            >
                                <figure>
                                    <h4>Global Office</h4>
                                    <div class="ps-block__rating">
                                        <Rating />
                                    </div>
                                    <p>
                                        325 Orchard Str, <br />
                                        New York, United States (US)
                                    </p>
                                    <p>
                                        <i class="icon-telephone"></i> (+053)
                                        77-637-3300
                                    </p>
                                </figure>
                            </div>
                            <div class="ps-block__author">
                                <a class="ps-block__user" href="#">
                                    <img
                                        src="/static/img/vendor/store/vendor-150x150.jpg"
                                        alt="martfury"
                                    />
                                </a>
                                <a class="ps-btn" href="store-detail.html">
                                    Visit Store
                                </a>
                            </div>
                        </article>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 ">
                        <article class="ps-block--store-2">
                            <div
                                class="ps-block__content bg--cover"
                                :style="{
                                    background:
                                        'url(/img/vendor/store/default-store-banner.png)'
                                }"
                            >
                                <figure>
                                    <h4>Young Shop</h4>
                                    <div class="ps-block__rating">
                                        <Rating />
                                    </div>
                                    <p>
                                        325 Orchard Str, <br />
                                        New York, United States (US)
                                    </p>
                                    <p>
                                        <i class="icon-telephone"></i> (+053)
                                        77-637-3300
                                    </p>
                                </figure>
                            </div>
                            <div class="ps-block__author">
                                <a class="ps-block__user" href="#">
                                    <img
                                        src="/static/img/vendor/store/vendor-150x150.jpg"
                                        alt="martfury"
                                    />
                                </a>
                                <a class="ps-btn" href="store-detail.html">
                                    Visit Store
                                </a>
                            </div>
                        </article>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 ">
                        <article class="ps-block--store-2">
                            <div
                                class="ps-block__content bg--cover"
                                :style="{
                                    background:
                                        'url(/img/vendor/store/default-store-banner.png)'
                                }"
                            >
                                <figure>
                                    <h4>Robert’s Store</h4>
                                    <div class="ps-block__rating">
                                        <Rating />
                                    </div>
                                    <p>
                                        325 Orchard Str, <br />
                                        New York, United States (US)
                                    </p>
                                    <p>
                                        <i class="icon-telephone"></i> (+053)
                                        77-637-3300
                                    </p>
                                </figure>
                            </div>
                            <div class="ps-block__author">
                                <a class="ps-block__user" href="#">
                                    <img
                                        src="/static/img/vendor/store/vendor-150x150.jpg"
                                        alt="martfury"
                                    />
                                </a>
                                <a class="ps-btn" href="store-detail.html">
                                    Visit Store
                                </a>
                            </div>
                        </article>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 ">
                        <article class="ps-block--store-2">
                            <div
                                class="ps-block__content bg--cover"
                                style="{{"
                                :style="{
                                    background:
                                        'url(/img/vendor/store/default-store-banner.png)'
                                }"
                            >
                                <figure>
                                    <h4>Go Pro</h4>
                                    <div class="ps-block__rating">
                                        <Rating />
                                    </div>
                                    <p>
                                        325 Orchard Str, <br />
                                        New York, United States (US)
                                    </p>
                                    <p>
                                        <i class="icon-telephone"></i> (+053)
                                        77-637-3300
                                    </p>
                                </figure>
                            </div>
                            <div class="ps-block__author">
                                <a class="ps-block__user" href="#">
                                    <img
                                        src="/static/img/vendor/store/vendor-150x150.jpg"
                                        alt="martfury"
                                    />
                                </a>
                                <a class="ps-btn" href="store-detail.html">
                                    Visit Store
                                </a>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'StoreList2'
};
</script>

<style lang="scss" scoped></style>

<template lang="html">
    <section class="ps-store-list">
        <div class="container">
            <div class="ps-section__header">
                <h3>Store list</h3>
            </div>
            <div class="ps-section__wrapper">
                <div class="ps-section__left">
                    <aside class="widget widget--vendor">
                        <h3 class="widget-title">Search</h3>
                        <input
                            class="form-control"
                            type="text"
                            placeholder="Search..."
                        />
                    </aside>
                    <aside class="widget widget--vendor">
                        <h3 class="widget-title">Filter by Category</h3>
                        <div class="form-group">
                            <select class="form-control">
                                <option key="0">Category</option>
                                <option key="1">Lighting</option>
                                <option key="2">Exterior</option>
                                <option key="3">Custom Grilles</option>
                                <option key="4">Wheels & Tires</option>
                                <option key="5">Performance</option>
                            </select>
                        </div>
                    </aside>
                    <aside class="widget widget--vendor">
                        <h3 class="widget-title">Filter by Location</h3>
                        <div class="form-group">
                            <select class="form-control">
                                <option key="0">Choose Location</option>
                                <option key="1">Chooose Location</option>
                                <option key="2">Exterior</option>
                                <option key="3">Custom Grilles</option>
                                <option key="4">Wheels & Tires</option>
                                <option key="5">Performance</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control">
                                <option key="1">Chooose State</option>
                                <option key="2">Exterior</option>
                                <option key="3">Custom Grilles</option>
                                <option key="4">Wheels & Tires</option>
                                <option key="5">Performance</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <input
                                class="form-control"
                                type="text"
                                placeholder="Search by City"
                            />
                        </div>
                        <div class="form-group">
                            <input
                                class="form-control"
                                type="text"
                                placeholder="Search by ZIP"
                            />
                        </div>
                    </aside>
                </div>
                <div class="ps-section__right">
                    <section class="ps-store-box">
                        <div class="ps-section__header">
                            <p>Showing 1 -8 of 22 results</p>
                            <select
                                class="form-control"
                                :style="{ maxWidth: 200 }"
                            >
                                <option key="0">Sort by</option>
                                <option key="1"
                                    >Sort by Newest: old to news</option
                                >
                                <option key="2"
                                    >Sort by Newest: New to old</option
                                >
                                <option key="3"
                                    >Sort by average rating: low to
                                    hight</option
                                >
                            </select>
                        </div>
                        <div class="ps-section__content">
                            <div class="row">
                                <div
                                    class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 "
                                >
                                    <article class="ps-block--store">
                                        <div
                                            class="ps-block__thumbnail bg--cover"
                                            :style="{
                                                background:
                                                    'url(/img/vendor/store/1.jpg)'
                                            }"
                                        ></div>
                                        <div class="ps-block__content">
                                            <div class="ps-block__author">
                                                <a
                                                    class="ps-block__user"
                                                    href="#"
                                                >
                                                    <img
                                                        src="/img/vendor/store/user/3.jpg"
                                                        alt="martfury"
                                                    />
                                                </a>
                                                <a class="ps-btn" href="#">
                                                    Visit Store
                                                </a>
                                            </div>
                                            <h4>GoPro</h4>
                                            <Rating />
                                            <p>
                                                325 Orchard, Buenos Aires,
                                                Formosa Argentina
                                            </p>
                                            <ul class="ps-block__contact">
                                                <li>
                                                    <i
                                                        class="icon-envelope"
                                                    ></i>
                                                    <a
                                                        href="mailto:contact@xhome.com"
                                                    >
                                                        contact@xhome.com
                                                    </a>
                                                </li>
                                                <li>
                                                    <i
                                                        class="icon-telephone"
                                                    ></i>
                                                    (+093) 77-637-3300
                                                </li>
                                            </ul>
                                            <div class="ps-block__inquiry">
                                                <a href="#">
                                                    <i
                                                        class="icon-question-circle"
                                                    ></i>
                                                    inquiry
                                                </a>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                                <div
                                    class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 "
                                >
                                    <article class="ps-block--store">
                                        <div
                                            class="ps-block__thumbnail bg--cover"
                                            :style="{
                                                background:
                                                    'url(/img/vendor/store/2.jpg)'
                                            }"
                                        ></div>
                                        <div class="ps-block__content">
                                            <div class="ps-block__author">
                                                <a
                                                    class="ps-block__user"
                                                    href="#"
                                                >
                                                    <img
                                                        src="/img/vendor/store/user/4.jpg"
                                                        alt="martfury"
                                                    />
                                                </a>
                                                <a class="ps-btn" href="#">
                                                    Visit Store
                                                </a>
                                            </div>
                                            <h4>Robert's Store</h4>
                                            <Rating />
                                            <p>
                                                325 Orchard, Buenos Aires,
                                                Formosa Argentina
                                            </p>
                                            <ul class="ps-block__contact">
                                                <li>
                                                    <i
                                                        class="icon-envelope"
                                                    ></i>
                                                    <a
                                                        href="mailto:contact@xhome.com"
                                                    >
                                                        contact@xhome.com
                                                    </a>
                                                </li>
                                                <li>
                                                    <i
                                                        class="icon-telephone"
                                                    ></i>
                                                    (+093) 77-637-3300
                                                </li>
                                            </ul>
                                            <div class="ps-block__inquiry">
                                                <a href="#">
                                                    <i
                                                        class="icon-question-circle"
                                                    ></i>
                                                    inquiry
                                                </a>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                                <div
                                    class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 "
                                >
                                    <article class="ps-block--store">
                                        <div
                                            class="ps-block__thumbnail bg--cover"
                                            :style="{
                                                background:
                                                    'url(/img/vendor/store/3.jpg)'
                                            }"
                                        ></div>
                                        <div class="ps-block__content">
                                            <div class="ps-block__author">
                                                <a
                                                    class="ps-block__user"
                                                    href="#"
                                                >
                                                    <img
                                                        src="/img/vendor/store/user/5.jpg"
                                                        alt="martfury"
                                                    />
                                                </a>
                                                <a class="ps-btn" href="#">
                                                    Visit Store
                                                </a>
                                            </div>
                                            <h4>Youngshop</h4>
                                            <Rating />
                                            <p>
                                                325 Orchard, Buenos Aires,
                                                Formosa Argentina
                                            </p>
                                            <ul class="ps-block__contact">
                                                <li>
                                                    <i
                                                        class="icon-envelope"
                                                    ></i>
                                                    <a
                                                        href="mailto:contact@xhome.com"
                                                    >
                                                        contact@xhome.com
                                                    </a>
                                                </li>
                                                <li>
                                                    <i
                                                        class="icon-telephone"
                                                    ></i>
                                                    (+093) 77-637-3300
                                                </li>
                                            </ul>
                                            <div class="ps-block__inquiry">
                                                <a href="#">
                                                    <i
                                                        class="icon-question-circle"
                                                    ></i>
                                                    inquiry
                                                </a>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                                <div
                                    class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 "
                                >
                                    <article class="ps-block--store">
                                        <div
                                            class="ps-block__thumbnail bg--cover"
                                            :style="{
                                                background:
                                                    'url(/img/vendor/store/1.jpg)'
                                            }"
                                        ></div>
                                        <div class="ps-block__content">
                                            <div class="ps-block__author">
                                                <a
                                                    class="ps-block__user"
                                                    href="#"
                                                >
                                                    <img
                                                        src="/img/vendor/store/user/5.jpg"
                                                        alt="martfury"
                                                    />
                                                </a>
                                                <a class="ps-btn" href="#">
                                                    Visit Store
                                                </a>
                                            </div>
                                            <h4>Global Offical</h4>
                                            <Rating />
                                            <p>
                                                325 Orchard, Buenos Aires,
                                                Formosa Argentina
                                            </p>
                                            <ul class="ps-block__contact">
                                                <li>
                                                    <i
                                                        class="icon-envelope"
                                                    ></i>
                                                    <a
                                                        href="mailto:contact@xhome.com"
                                                    >
                                                        contact@xhome.com
                                                    </a>
                                                </li>
                                                <li>
                                                    <i
                                                        class="icon-telephone"
                                                    ></i>
                                                    (+093) 77-637-3300
                                                </li>
                                            </ul>
                                            <div class="ps-block__inquiry">
                                                <a href="#">
                                                    <i
                                                        class="icon-question-circle"
                                                    ></i>
                                                    inquiry
                                                </a>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </div>
                            <div class="ps-pagination">
                                <ul class="pagination">
                                    <li class="active">
                                        <a href="#">1</a>
                                    </li>
                                    <li>
                                        <a href="#">2</a>
                                    </li>
                                    <li>
                                        <a href="#">3</a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            Next Page<i
                                                class="icon-chevron-right"
                                            ></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Rating from '../../elements/Rating';
export default {
    name: 'StoreList',
    components: { Rating }
};
</script>

<style lang="scss" scoped></style>

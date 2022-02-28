<template lang="html">
    <footer class="ps-footer ps-footer--2 ps-footer--technology">
        <div class="container">
            <div class="ps-footer__content">
                <div class="row">
                    <div class="col-xl-8">
                        <div class="row">
                            <div class="col-md-4 col-sm-6">
                                <aside class="widget widget_footer">
                                    <h4 class="widget-title">
                                        Quick links
                                    </h4>
                                    <ul class="ps-list--link">
                                        <li>
                                            <nuxt-link to="/page/blank">
                                                <a>Policy</a>
                                            </nuxt-link>
                                        </li>
                                        <li>
                                            <nuxt-link to="/page/blank">
                                                <a>Term & Condition</a>
                                            </nuxt-link>
                                        </li>
                                        <li>
                                            <nuxt-link to="/page/blank">
                                                <a>Shipping</a>
                                            </nuxt-link>
                                        </li>
                                        <li>
                                            <nuxt-link to="/page/blank">
                                                <a>Return</a>
                                            </nuxt-link>
                                        </li>
                                        <li>
                                            <nuxt-link to="/page/faqs">
                                                <a>FAQs</a>
                                            </nuxt-link>
                                        </li>
                                    </ul>
                                </aside>
                            </div>
                            <div class="col-md-4 col-sm-6">
                                <aside class="widget widget_footer">
                                    <h4 class="widget-title">Company</h4>
                                    <ul class="ps-list--link">
                                        <li>
                                            <nuxt-link to="/page/about-us">
                                                <a>About Us</a>
                                            </nuxt-link>
                                        </li>
                                        <li>
                                            <nuxt-link to="/product/affiliate">
                                                <a>Affilate</a>
                                            </nuxt-link>
                                        </li>
                                        <li>
                                            <nuxt-link to="/page/blank">
                                                <a>Career</a>
                                            </nuxt-link>
                                        </li>
                                        <li>
                                            <nuxt-link to="/page/contact-us">
                                                <a>Contact</a>
                                            </nuxt-link>
                                        </li>
                                    </ul>
                                </aside>
                            </div>
                            <div class="col-md-4 col-sm-6">
                                <aside class="widget widget_footer">
                                    <h4 class="widget-title">Bussiness</h4>
                                    <ul class="ps-list--link">
                                        <li>
                                            <nuxt-link to="/blog">
                                                <a>Our Press</a>
                                            </nuxt-link>
                                        </li>
                                        <li>
                                            <nuxt-link to="/account/checkout">
                                                <a>Checkout</a>
                                            </nuxt-link>
                                        </li>
                                        <li>
                                            <nuxt-link to="/account/login">
                                                <a>My account</a>
                                            </nuxt-link>
                                        </li>
                                        <li>
                                            <nuxt-link to="/shop">
                                                <a>Shop</a>
                                            </nuxt-link>
                                        </li>
                                    </ul>
                                </aside>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-4 col-md-6">
                        <aside class="widget widget_newletters">
                            <h4 class="widget-title">Newsletter</h4>
                            <form
                                class="ps-form--newletter"
                                action="#"
                                method="get"
                            >
                                <div class="form-group--nest">
                                    <input
                                        class="form-control"
                                        type="text"
                                        placeholder="Email Address"
                                    />
                                    <button class="ps-btn">
                                        Subscribe
                                    </button>
                                </div>
                                <ul class="ps-list--social">
                                    <li>
                                        <a class="facebook" href="#">
                                            <i class="fa fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="twitter" href="#">
                                            <i class="fa fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="google-plus" href="#">
                                            <i class="fa fa-google-plus"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="instagram" href="#">
                                            <i class="fa fa-instagram"></i>
                                        </a>
                                    </li>
                                </ul>
                            </form>
                        </aside>
                    </div>
                </div>
            </div>
            <div class="ps-footer__copyright">
                <p>© 2020 Martfury. All Rights Reserved</p>
                <p>
                    <span>We Using Safe Payment For:</span>
                    <nuxt-link to="/page/blank">
                        <a>
                            <img
                                src="~/static/img/payment-method/1.jpg"
                                alt="martfury"
                            />
                        </a>
                    </nuxt-link>
                    <nuxt-link to="/page/blank">
                        <a>
                            <img
                                src="~/static/img/payment-method/2.jpg"
                                alt="martfury"
                            />
                        </a>
                    </nuxt-link>
                    <nuxt-link to="/page/blank">
                        <a>
                            <img
                                src="~/static/img/payment-method/3.jpg"
                                alt="martfury"
                            />
                        </a>
                    </nuxt-link>
                    <nuxt-link to="/page/blank">
                        <a>
                            <img
                                src="~/static/img/payment-method/4.jpg"
                                alt="martfury"
                            />
                        </a>
                    </nuxt-link>
                    <nuxt-link to="/page/blank">
                        <a>
                            <img
                                src="~/static/img/payment-method/5.jpg"
                                alt="martfury"
                            />
                        </a>
                    </nuxt-link>
                </p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'FooterAutopart'
};
</script>

<style lang="scss" scoped></style>
